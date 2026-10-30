import { isEvent, mergeEvents } from "./events.js";

export function getBrowserStorage(resolve = () => globalThis.localStorage) {
  try {
    const storage = resolve();
    if (!storage) throw new Error();
    return { storage, error: "" };
  } catch {
    return {
      storage: null,
      error:
        "O armazenamento deste navegador está indisponível. Você pode consultar o conteúdo, mas precisa habilitar o armazenamento para guardar seu progresso.",
    };
  }
}

export function createLocalLog(storage, scope) {
  const key = `vet-estudos:v1:${scope}`;
  const eventPrefix = `${key}:event:`;
  const read = () => {
    try {
      if (!storage) throw new Error();
      const raw = storage.getItem(key);
      const legacy = raw ? JSON.parse(raw) : { events: [] };
      if (!Array.isArray(legacy.events) || !legacy.events.every(isEvent))
        throw new Error();
      const events = [...legacy.events];
      for (let i = 0; i < storage.length; i++) {
        const entryKey = storage.key(i);
        if (!entryKey?.startsWith(eventPrefix)) continue;
        const event = JSON.parse(storage.getItem(entryKey));
        if (!isEvent(event)) throw new Error();
        events.push(event);
      }
      return { events: mergeEvents(events), pending: [] };
    } catch {
      throw new Error(
        "Não foi possível ler os estudos armazenados neste navegador. Verifique o armazenamento e preserve uma cópia antes de limpar os dados.",
      );
    }
  };
  const write = (data) => {
    if (!Array.isArray(data.events) || !data.events.every(isEvent))
      throw new Error("Registro de estudo inválido.");
    read();
    try {
      // One key per immutable event avoids whole-document overwrites between tabs.
      for (const event of data.events) {
        const entryKey = eventPrefix + event.id;
        const previous = storage.getItem(entryKey);
        if (!previous) storage.setItem(entryKey, JSON.stringify(event));
      }
    } catch {
      throw new Error(
        "O navegador não conseguiu guardar esta alteração. Libere espaço ou habilite o armazenamento e tente novamente.",
      );
    }
    return read();
  };
  return {
    key,
    eventPrefix,
    read,
    write,
    append(event) {
      if (!isEvent(event)) throw new Error("Registro de estudo inválido.");
      return write({ events: [event] });
    },
  };
}

export const BACKUP_COURSE = "administracao-aspectos-legais-v1";
export function makeBackup(events) {
  return {
    format: "vet-estudos-progress",
    version: 1,
    course: BACKUP_COURSE,
    exportedAt: new Date().toISOString(),
    events: mergeEvents(events),
  };
}

export function importBackup(log, data, knownItems) {
  if (
    data?.format !== "vet-estudos-progress" ||
    data.version !== 1 ||
    data.course !== BACKUP_COURSE ||
    !Array.isArray(data.events) ||
    !data.events.every(isEvent)
  )
    throw new Error("Este arquivo não é um backup válido desta disciplina.");
  if (data.events.length > 100000)
    throw new Error("O backup excede o limite de registros.");
  const current = log.read();
  const merged = mergeEvents(current.events, data.events);
  const sessions = new Map(
    merged
      .filter((e) => e.type === "session_start")
      .map((e) => [e.itemId, e.payload]),
  );
  for (const e of data.events) {
    if (e.type === "answer") {
      const session = sessions.get(e.payload.sessionId);
      if (!session || !session.questionIds.includes(e.itemId))
        throw new Error("O backup contém uma resposta sem sessão válida.");
    }
    if (e.type === "session_finish" && !sessions.has(e.itemId))
      throw new Error("O backup contém uma sessão inválida.");
    if (!knownItems) continue;
    if (e.type === "lesson_read" && !knownItems.lessons.includes(e.itemId))
      throw new Error("O backup contém uma leitura de outro curso.");
    if (e.type === "review" && !knownItems.cards.includes(e.itemId))
      throw new Error("O backup contém um cartão de outro curso.");
    if (e.type === "answer" && !knownItems.questions.includes(e.itemId))
      throw new Error("O backup contém uma questão de outro curso.");
    if (
      e.type === "session_start" &&
      (!e.payload.questionIds.every((id) =>
        knownItems.questions.includes(id),
      ) ||
        (knownItems.modules &&
          !e.payload.moduleIds.every((id) => knownItems.modules.includes(id))))
    )
      throw new Error("O backup contém uma sessão inválida.");
  }
  return log.write({ events: merged });
}

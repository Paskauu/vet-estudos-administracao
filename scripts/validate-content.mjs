import { readFile, readdir, access } from "node:fs/promises";
import { resolve } from "node:path";
const errors = [],
  ids = new Set();
const files = (await readdir("src/content"))
  .filter((n) => /^m\d\d\.json$/.test(n))
  .sort();
if (files.length !== 8)
  errors.push(`Esperados 8 módulos; encontrados ${files.length}.`);
const counts = {
  modules: files.length,
  lessons: 0,
  blocks: 0,
  cards: 0,
  questions: 0,
  references: 0,
  pages: 0,
};
for (const file of files) {
  const m = JSON.parse(await readFile(resolve("src/content", file), "utf8"));
  const unique = (item) => {
    if (!item.id || ids.has(item.id))
      errors.push(`${file}: ID ausente ou repetido: ${item.id}`);
    ids.add(item.id);
  };
  unique(m);
  counts.pages += m.source.pages;
  try {
    await access(resolve("1.0 - Material para consulta", m.source.filename));
  } catch {
    errors.push(`${file}: PDF não encontrado.`);
  }
  const refs = (item, label) => {
    if (!item.refs?.length) errors.push(`${file} ${label}: sem referência.`);
    for (const r of item.refs || []) {
      counts.references++;
      if (
        !Number.isInteger(r.page) ||
        r.page < 1 ||
        r.page > m.source.pages ||
        !r.section?.trim()
      )
        errors.push(`${file} ${label}: referência inválida.`);
    }
  };
  if (
    !m.title ||
    !m.description ||
    m.lessons.length < 5 ||
    m.flashcards.length < 15 ||
    m.questions.length < 20
  )
    errors.push(`${file}: cobertura mínima não atendida.`);
  for (const l of m.lessons) {
    unique(l);
    counts.lessons++;
    if (!l.title || !l.intro || !l.blocks.length)
      errors.push(`${file} ${l.id}: lição incompleta.`);
    for (const b of l.blocks) {
      counts.blocks++;
      if (!b.title || !b.text) errors.push(`${file}: bloco incompleto.`);
      refs(b, l.id);
    }
  }
  for (const c of m.flashcards) {
    unique(c);
    counts.cards++;
    if (!c.front || !c.back) errors.push(`${file}: flashcard incompleto.`);
    refs(c, c.id);
  }
  for (const q of m.questions) {
    unique(q);
    counts.questions++;
    if (
      !q.prompt ||
      !q.explanation ||
      q.choices?.length !== 4 ||
      new Set(q.choices).size !== 4 ||
      !Number.isInteger(q.answer) ||
      q.answer < 0 ||
      q.answer > 3
    )
      errors.push(`${file}: questão inválida ${q.id}.`);
    refs(q, q.id);
  }
}
if (errors.length) {
  console.error(errors.join("\n"));
  process.exitCode = 1;
} else console.log("Conteúdo validado:", JSON.stringify(counts));

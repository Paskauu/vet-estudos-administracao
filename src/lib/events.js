const TYPES = new Set([
  "lesson_read",
  "review",
  "answer",
  "session_start",
  "session_finish",
]);
const safeId = (value) =>
  typeof value === "string" &&
  /^[a-z0-9][a-z0-9:-]{0,149}$/i.test(value) &&
  !["constructor", "prototype", "__proto__"].includes(value);
const validDate = (value) =>
  typeof value === "string" && Number.isFinite(Date.parse(value));
const uniqueIds = (value, limit) =>
  Array.isArray(value) &&
  value.length > 0 &&
  value.length <= limit &&
  value.every(safeId) &&
  new Set(value).size === value.length;

export function isEvent(e) {
  if (!(
    e &&
    safeId(e.id) &&
    TYPES.has(e.type) &&
    safeId(e.itemId) &&
    e.payload &&
    typeof e.payload === "object" &&
    !Array.isArray(e.payload) &&
    validDate(e.at)
  ))
    return false;
  const p = e.payload;
  if (p.moduleId !== undefined && !safeId(p.moduleId)) return false;
  if (e.type === "lesson_read")
    return p.read === undefined || typeof p.read === "boolean";
  if (e.type === "review")
    return (
      ["again", "hard", "good", "easy"].includes(p.rating) &&
      Number.isFinite(p.intervalDays) &&
      p.intervalDays > 0 &&
      p.intervalDays <= 3650 &&
      validDate(p.dueAt)
    );
  if (e.type === "answer")
    return (
      safeId(p.sessionId) &&
      Number.isInteger(p.choice) &&
      p.choice >= 0 &&
      p.choice < 4 &&
      typeof p.correct === "boolean"
    );
  if (e.type === "session_start")
    return (
      uniqueIds(p.questionIds, 1000) &&
      uniqueIds(p.moduleIds, 8) &&
      ["practice", "exam"].includes(p.mode)
    );
  return true;
}

export function mergeEvents(...lists) {
  const unique = new Map();
  for (const e of lists.flat().filter(isEvent)) {
    const current = unique.get(e.id);
    if (!current || JSON.stringify(e) < JSON.stringify(current))
      unique.set(e.id, e);
  }
  return [...unique.values()].sort(
    (a, b) => a.at.localeCompare(b.at) || a.id.localeCompare(b.id),
  );
}

export function reduceProgress(input) {
  const events = mergeEvents(input);
  const dictionary = () => Object.create(null);
  const result = {
    readLessons: dictionary(),
    reviews: dictionary(),
    latestAnswers: dictionary(),
    sessions: dictionary(),
    answered: 0,
    correct: 0,
    attempts: [],
    activity: dictionary(),
  };
  for (const e of events) {
    if (e.type === "session_start")
      result.sessions[e.itemId] = {
        id: e.itemId,
        questionIds: e.payload.questionIds,
        moduleIds: e.payload.moduleIds,
        mode: e.payload.mode,
        startedAt: e.at,
        answers: dictionary(),
        completed: false,
      };
  }
  const attempts = new Map();
  for (const e of events) {
    const date = e.at.slice(0, 10);
    result.activity[date] = (result.activity[date] || 0) + 1;
    if (e.type === "lesson_read")
      result.readLessons[e.itemId] = e.payload.read !== false;
    if (e.type === "review")
      result.reviews[e.itemId] = { ...e.payload, at: e.at };
    if (
      e.type === "answer" &&
      Number.isInteger(e.payload.choice) &&
      e.payload.choice >= 0 &&
      e.payload.choice <= 3
    ) {
      const answer = { ...e.payload, questionId: e.itemId, at: e.at };
      const key = `${e.payload.sessionId || e.id}:${e.itemId}`;
      attempts.set(key, answer);
      result.latestAnswers[e.itemId] = answer;
      if (result.sessions[e.payload.sessionId])
        result.sessions[e.payload.sessionId].answers[e.itemId] =
          e.payload.choice;
    }
    if (e.type === "session_finish" && result.sessions[e.itemId]) {
      result.sessions[e.itemId].completed = true;
      result.sessions[e.itemId].finishedAt = e.at;
    }
  }
  result.attempts = [...attempts.values()];
  result.answered = result.attempts.length;
  result.correct = result.attempts.filter((a) => a.correct === true).length;
  return result;
}

const DAY = 86400000;

export function shuffle(items, rng = Math.random) {
  const result = [...items];
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.min(i, Math.max(0, Math.floor(rng() * (i + 1))));
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
}

export function selectQuestions(bank, moduleIds, count, rng = Math.random) {
  if (!moduleIds?.length) throw new Error("Selecione pelo menos um módulo.");
  if (!Number.isInteger(count) || count < 1)
    throw new Error("Escolha uma quantidade válida.");
  const pool = [
    ...new Map(
      bank.filter((q) => moduleIds.includes(q.moduleId)).map((q) => [q.id, q]),
    ).values(),
  ];
  const size = Math.min(count, pool.length);
  const groups = shuffle([...new Set(pool.map((q) => q.moduleId))], rng);
  const first = groups.slice(0, size).map(
    (id) =>
      shuffle(
        pool.filter((q) => q.moduleId === id),
        rng,
      )[0],
  );
  const selected = new Set(first.map((q) => q.id));
  return shuffle(
    [
      ...first,
      ...shuffle(
        pool.filter((q) => !selected.has(q.id)),
        rng,
      ).slice(0, size - first.length),
    ],
    rng,
  );
}

export function scoreSession(questions, answers) {
  const answered = questions.filter(
    (q) =>
      Number.isInteger(answers[q.id]) &&
      answers[q.id] >= 0 &&
      answers[q.id] < 4,
  );
  const correct = answered.filter((q) => answers[q.id] === q.answer).length;
  return {
    total: questions.length,
    answered: answered.length,
    correct,
    percent: questions.length
      ? Math.round((correct / questions.length) * 100)
      : 0,
  };
}

export function nextReview(rating, previous, now = new Date().toISOString()) {
  const rawPrior = Number(previous?.intervalDays);
  const prior =
    Number.isFinite(rawPrior) && rawPrior > 0 ? Math.min(rawPrior, 3650) : 0;
  const intervals = {
    again: 10 / 1440,
    hard: Math.max(1, Math.round(prior * 1.2)),
    good: prior >= 1 ? Math.round(prior * 2) : 1,
    easy: prior >= 1 ? Math.round(prior * 3) : 4,
  };
  if (!(rating in intervals)) throw new Error("Escolha uma avaliação válida.");
  const intervalDays = Math.min(3650, intervals[rating]);
  return {
    rating,
    intervalDays,
    dueAt: new Date(new Date(now).getTime() + intervalDays * DAY).toISOString(),
  };
}

export const percent = (part, total) =>
  total ? Math.round((part / total) * 100) : 0;
export const readableDate = (value) =>
  new Date(value).toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "short",
  });

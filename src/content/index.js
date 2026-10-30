const files = import.meta.glob(["./m*.json", "./e*.json"], { eager: true, import: "default" });
export const modules = Object.values(files).map((m) => ({
  ...m,
  courseId: m.courseId || "administracao",
  category: m.category || (m.order <= 6 ? "Administração" : "Aspectos legais"),
})).sort((a, b) => a.courseId.localeCompare(b.courseId) || a.order - b.order);
export const questions = modules.flatMap((m) =>
  m.questions.map((q) => ({ ...q, moduleId: m.id })),
);
export const flashcards = modules.flatMap((m) =>
  m.flashcards.map((c) => ({ ...c, moduleId: m.id })),
);
export const allLessons = modules.flatMap((m) =>
  m.lessons.map((l) => ({ ...l, moduleId: m.id })),
);
export const moduleById = Object.assign(
  Object.create(null),
  Object.fromEntries(modules.map((m) => [m.id, m])),
);
export const questionById = Object.assign(
  Object.create(null),
  Object.fromEntries(questions.map((q) => [q.id, q])),
);

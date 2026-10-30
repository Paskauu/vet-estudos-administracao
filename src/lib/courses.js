import { courseById } from "../content/courses.js";

export function courseCatalog(allModules, courseId) {
  const modules = allModules.filter((m) => m.courseId === courseId);
  const flatten = (key) => modules.flatMap((m) => m[key].map((item) => ({ ...item, moduleId: m.id })));
  return { modules, questions: flatten("questions"), flashcards: flatten("flashcards"), allLessons: flatten("lessons") };
}

export function courseEvents(events, modules) {
  const ids = (key) => new Set(modules.flatMap((m) => m[key].map((item) => item.id)));
  const moduleIds = new Set(modules.map((m) => m.id));
  const lessons = ids("lessons"), cards = ids("flashcards"), questions = ids("questions");
  const isCourseSession = (e) => e.payload.moduleIds.every((id) => moduleIds.has(id)) && e.payload.questionIds.every((id) => questions.has(id));
  const sessions = new Set(events.filter((e) => e.type === "session_start" && isCourseSession(e)).map((e) => e.itemId));
  return events.filter((e) => {
    if (e.type === "lesson_read") return lessons.has(e.itemId);
    if (e.type === "review") return cards.has(e.itemId);
    if (e.type === "session_start") return isCourseSession(e);
    if (e.type === "answer") return questions.has(e.itemId) && sessions.has(e.payload.sessionId);
    return sessions.has(e.itemId);
  });
}

export function resolveStudyRoute(hash, moduleById, sessions = {}) {
  const parts = hash.replace(/^#\/?/, "").split("/");
  const explicit = Object.hasOwn(courseById, parts[0]) ? parts.shift() : null;
  const [page = "inicio", id = ""] = parts;
  const moduleId = page === "sessao" ? sessions[id]?.moduleIds?.[0] : id;
  const module = Object.hasOwn(moduleById, moduleId) ? moduleById[moduleId] : null;
  return { courseId: explicit || module?.courseId || "administracao", page: page || "inicio", id };
}

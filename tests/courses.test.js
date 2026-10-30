import test from "node:test";
import assert from "node:assert/strict";
import { reduceProgress } from "../src/lib/events.js";
import { createLocalLog, importBackup, makeBackup } from "../src/lib/storage.js";

import * as helpers from "../src/lib/courses.js";
const catalog = [
  { id: "m01", courseId: "administracao", lessons: [{ id: "m01-l01" }], flashcards: [{ id: "m01-f01" }], questions: [{ id: "m01-q01" }] },
  { id: "e01", courseId: "epidemiologia", lessons: [{ id: "e01-l01" }], flashcards: [{ id: "e01-f01" }], questions: [{ id: "e01-q01" }] },
];
const event = (id, type, itemId, payload = {}) => ({ id, type, itemId, payload, at: "2026-10-30T12:00:00.000Z" });
const start = (id, mod, q) => event(id, "session_start", id, { moduleIds: [mod], questionIds: [q], mode: "exam" });
const memory = () => {
  const map = new Map();
  return { get length() { return map.size; }, key: (i) => [...map.keys()][i] ?? null, getItem: (k) => map.get(k) ?? null, setItem: (k, v) => map.set(k, v) };
};
const known = {
  modules: ["m01", "e01"], lessons: ["m01-l01", "e01-l01"], cards: ["m01-f01", "e01-f01"], questions: ["m01-q01", "e01-q01"],
  moduleCourses: { m01: "administracao", e01: "epidemiologia" }, questionModules: { "m01-q01": "m01", "e01-q01": "e01" },
};

test("course catalog never offers modules or cards from the other discipline", () => {
  assert.equal(typeof helpers.courseCatalog, "function");
  const result = helpers.courseCatalog(catalog, "epidemiologia");
  assert.deepEqual(result.modules.map((m) => m.id), ["e01"]);
  assert.deepEqual(result.flashcards.map((c) => c.id), ["e01-f01"]);
  assert.equal(result.questions[0].moduleId, "e01");
});

test("unrated and legacy flashcard reviews stay within their discipline", () => {
  const input = [
    event("admin-card", "review", "m01-f01", { moduleId: "m01" }),
    event("epi-card", "review", "e01-f01", { moduleId: "e01" }),
    event("old-admin-card", "review", "m01-f01", {
      moduleId: "m01", rating: "easy", intervalDays: 4, dueAt: "2026-11-03T12:00:00.000Z",
    }),
  ];
  for (const [module, card] of [[catalog[0], "m01-f01"], [catalog[1], "e01-f01"]]) {
    const events = helpers.courseEvents(input, [module]);
    assert.ok(events.every((e) => e.itemId === card));
    const progress = reduceProgress(events);
    assert.deepEqual(Object.keys(progress.reviews), [card]);
  }
});

test("course progress keeps interrupted sessions, answers and readings isolated", () => {
  assert.equal(typeof helpers.courseEvents, "function");
  const input = [start("admin-session", "m01", "m01-q01"), start("epi-session", "e01", "e01-q01"), event("a", "lesson_read", "m01-l01"), event("b", "lesson_read", "e01-l01"), event("c", "answer", "m01-q01", { sessionId: "admin-session", choice: 0, correct: false, moduleId: "m01" }), event("d", "answer", "e01-q01", { sessionId: "epi-session", choice: 1, correct: true, moduleId: "e01" }), event("f", "session_finish", "admin-session")];
  const p = reduceProgress(helpers.courseEvents(input, catalog.filter((m) => m.id === "e01")));
  assert.deepEqual(Object.keys(p.readLessons), ["e01-l01"]);
  assert.deepEqual(Object.keys(p.sessions), ["epi-session"]);
  assert.equal(p.sessions["epi-session"].answers["e01-q01"], 1);
  assert.equal(p.sessions["epi-session"].completed, false);
  assert.equal(p.answered, 1);
  assert.equal(p.correct, 1);
  assert.equal(input.length, 7);
});

test("new routes retain discipline while old module and session links infer it", () => {
  assert.equal(typeof helpers.resolveStudyRoute, "function");
  const byId = Object.fromEntries(catalog.map((m) => [m.id, m]));
  assert.deepEqual(helpers.resolveStudyRoute("#/epidemiologia/flashcards/e01", byId), { courseId: "epidemiologia", page: "flashcards", id: "e01" });
  assert.deepEqual(helpers.resolveStudyRoute("#/modulo/m01", byId), { courseId: "administracao", page: "modulo", id: "m01" });
  assert.deepEqual(helpers.resolveStudyRoute("#/sessao/s1", byId, { s1: { moduleIds: ["e01"] } }), { courseId: "epidemiologia", page: "sessao", id: "s1" });
  assert.equal(helpers.resolveStudyRoute("#/modulo/constructor", byId).courseId, "administracao");
});

test("legacy administration backup merges with new discipline without losing either", () => {
  const log = createLocalLog(memory(), "guest");
  log.append(event("epi-read", "lesson_read", "e01-l01"));
  const old = { ...makeBackup([event("admin-read", "lesson_read", "m01-l01")]), course: "administracao-aspectos-legais-v1" };
  importBackup(log, old, known);
  const exported = makeBackup(log.read().events);
  assert.equal(exported.course, "vet-estudos-disciplinas-v1");
  const restored = createLocalLog(memory(), "guest");
  importBackup(restored, exported, known);
  importBackup(restored, exported, known);
  assert.deepEqual(restored.read().events.map((e) => e.itemId).sort(), ["e01-l01", "m01-l01"]);
});

test("backup rejects mixed-discipline sessions and unselected question modules before writing", () => {
  const log = createLocalLog(memory(), "guest");
  log.append(event("read", "lesson_read", "e01-l01"));
  const mixed = event("mixed", "session_start", "s1", { moduleIds: ["m01", "e01"], questionIds: ["m01-q01", "e01-q01"], mode: "exam" });
  assert.throws(() => importBackup(log, makeBackup([mixed]), known), /disciplina|sessão/);
  const mismatch = start("bad", "m01", "e01-q01");
  assert.throws(() => importBackup(log, makeBackup([mismatch]), known), /sessão|módulo/);
  assert.equal(log.read().events.length, 1);
});

test("a colliding session ID cannot leak another discipline into course progress", () => {
  const admin = { ...start("a", "m01", "m01-q01"), itemId: "same-session" };
  const epi = { ...start("z", "e01", "e01-q01"), itemId: "same-session" };
  const filtered = helpers.courseEvents([admin, epi], [catalog[0]]);
  const p = reduceProgress(filtered);
  assert.deepEqual(p.sessions["same-session"].moduleIds, ["m01"]);
  assert.deepEqual(p.sessions["same-session"].questionIds, ["m01-q01"]);
});

test("conflicting imported session IDs are rejected without changing current progress", () => {
  const log = createLocalLog(memory(), "guest");
  const first = { ...start("a", "m01", "m01-q01"), itemId: "same-session" };
  log.append(first);
  const conflict = { ...start("z", "e01", "e01-q01"), itemId: "same-session" };
  assert.throws(() => importBackup(log, makeBackup([conflict]), known), /sessão/);
  assert.equal(log.read().events.length, 1);
  const identical = { ...first, id: "repeat-start" };
  assert.doesNotThrow(() => importBackup(log, makeBackup([identical]), known));
});

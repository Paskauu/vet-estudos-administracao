import test from "node:test";
import assert from "node:assert/strict";
import { mergeEvents, reduceProgress } from "../src/lib/events.js";
import {
  createLocalLog,
  importBackup,
  makeBackup,
} from "../src/lib/storage.js";
import * as storageHelpers from "../src/lib/storage.js";

const event = (
  id,
  type,
  itemId,
  payload = {},
  at = "2026-10-30T12:00:00.000Z",
) => ({ id, type, itemId, payload, at });
const memory = () => {
  const m = new Map();
  return {
    get length() {
      return m.size;
    },
    key: (i) => [...m.keys()][i] ?? null,
    getItem: (k) => m.get(k) ?? null,
    setItem: (k, v) => m.set(k, v),
  };
};

test("merge is deterministic and idempotent across two devices", () => {
  const a = event("a", "lesson_read", "m01-l01");
  const b = event("b", "lesson_read", "m02-l01");
  assert.deepEqual(mergeEvents([b, a], [a]), [a, b]);
  assert.deepEqual(mergeEvents([a], [b]), mergeEvents([b], [a]));
});
test("session can resume and answer survives equal timestamp ordering", () => {
  const events = [
    event("z", "session_start", "session-1", {
      questionIds: ["q1", "q2"],
      moduleIds: ["m01"],
      mode: "exam",
    }),
    event("a", "answer", "q1", {
      sessionId: "session-1",
      choice: 2,
      correct: true,
      moduleId: "m01",
    }),
    event("b", "lesson_read", "m01-l01"),
  ];
  const p = reduceProgress(events);
  assert.equal(p.sessions["session-1"].answers.q1, 2);
  assert.equal(p.sessions["session-1"].completed, false);
  assert.equal(p.readLessons["m01-l01"], true);
  assert.equal(p.correct, 1);
  assert.equal(p.answered, 1);
});
test("local and separate accounts never share logs", () => {
  const storage = memory();
  const guest = createLocalLog(storage, "guest");
  guest.append(event("a", "lesson_read", "m01-l01"));
  assert.equal(createLocalLog(storage, "user:alice").read().events.length, 0);
  createLocalLog(storage, "user:alice").append(
    event("b", "lesson_read", "m02-l01"),
  );
  assert.equal(createLocalLog(storage, "user:bob").read().events.length, 0);
  assert.equal(guest.read().events.length, 1);
});
test("backup transfers progress and merges repeated imports without losing local study", () => {
  const origin = createLocalLog(memory(), "guest");
  origin.append(event("a", "lesson_read", "l1"));
  const target = createLocalLog(memory(), "guest");
  target.append(event("b", "lesson_read", "l2"));
  const backup = makeBackup(origin.read().events);
  importBackup(target, backup);
  importBackup(target, backup);
  assert.deepEqual(
    target.read().events.map((e) => e.id),
    ["a", "b"],
  );
});
test("invalid or wrong-course backups cannot overwrite existing progress", () => {
  const log = createLocalLog(memory(), "guest");
  log.append(event("a", "lesson_read", "l1"));
  assert.throws(
    () => importBackup(log, { ...makeBackup([]), course: "other" }),
    /válido/,
  );
  assert.equal(log.read().events.length, 1);
  assert.throws(
    () =>
      importBackup(log, makeBackup([event("b", "lesson_read", "bad")]), {
        lessons: ["l1"],
        cards: [],
        questions: [],
      }),
    /outro curso/,
  );
  assert.equal(log.read().events.length, 1);
});
test("corrupted storage is reported and never silently overwritten", () => {
  const storage = memory();
  storage.setItem("vet-estudos:v1:guest", "invalid JSON");
  assert.throws(() => createLocalLog(storage, "guest").read(), /armazenados/);
});

test("hostile session keys and malformed review payloads are rejected before import writes", () => {
  const log = createLocalLog(memory(), "guest");
  const known = {
    lessons: [],
    cards: ["f1"],
    questions: ["q1"],
    modules: ["m01"],
  };
  const poison = event("a", "answer", "q1", {
    sessionId: "__proto__",
    choice: 0,
    correct: false,
    moduleId: "m01",
  });
  assert.throws(
    () => importBackup(log, { ...makeBackup([]), events: [poison] }, known),
    /válido|inválid/,
  );
  const badReview = event("b", "review", "f1", {
    rating: "good",
    intervalDays: 1e308,
    dueAt: "bad-date",
  });
  assert.throws(
    () => importBackup(log, { ...makeBackup([]), events: [badReview] }, known),
    /válido|inválid/,
  );
  assert.equal(log.read().events.length, 0);
});
test("orphaned session answers and duplicated session questions cannot be imported", () => {
  const log = createLocalLog(memory(), "guest");
  const known = { lessons: [], cards: [], questions: ["q1"], modules: ["m01"] };
  const orphan = event("a", "answer", "q1", {
    sessionId: "missing",
    choice: 0,
    correct: false,
    moduleId: "m01",
  });
  assert.throws(() => importBackup(log, makeBackup([orphan]), known), /sessão/);
  const duplicate = event("b", "session_start", "s1", {
    questionIds: ["q1", "q1"],
    moduleIds: ["m01"],
    mode: "exam",
  });
  assert.throws(
    () => importBackup(log, { ...makeBackup([]), events: [duplicate] }, known),
    /válido|inválid/,
  );
  assert.equal(log.read().events.length, 0);
});
test("blocked browser storage is detected without preventing content from mounting", () => {
  const result = storageHelpers.getBrowserStorage(() => {
    throw new Error("SecurityError");
  });
  assert.equal(result.storage, null);
  assert.match(result.error, /armazenamento/);
  assert.throws(
    () =>
      createLocalLog(result.storage, "guest").append(
        event("a", "lesson_read", "l1"),
      ),
    /armazenamento|armazenados/,
  );
});
test("interleaved writes from two tabs preserve each event independently", () => {
  const storage = memory();
  const a = createLocalLog(storage, "guest"),
    b = createLocalLog(storage, "guest");
  const original = storage.setItem;
  let injected = false;
  storage.setItem = (key, value) => {
    if (!injected) {
      injected = true;
      b.append(event("b", "lesson_read", "l2"));
    }
    original(key, value);
  };
  a.append(event("a", "lesson_read", "l1"));
  assert.deepEqual(
    a.read().events.map((e) => e.id),
    ["a", "b"],
  );
});
test("prototype-shaped routes cannot resolve to modules or questions", () => {
  const result = reduceProgress([event("x", "lesson_read", "constructor")]);
  assert.equal(Object.hasOwn(result.readLessons, "constructor"), false);
});

import test from "node:test";
import assert from "node:assert/strict";
import { selectQuestions, scoreSession } from "../src/lib/study.js";

const bank = [
  { id: "a", moduleId: "m01", answer: 1 },
  { id: "b", moduleId: "m02", answer: 2 },
  { id: "c", moduleId: "m02", answer: 0 },
  { id: "d", moduleId: "m03", answer: 3 },
];
test("multi-module selection limits count to available and never duplicates", () => {
  const selected = selectQuestions(bank, ["m01", "m02"], 99, () => 0.5);
  assert.equal(selected.length, 3);
  assert.equal(new Set(selected.map((q) => q.id)).size, 3);
  assert.ok(selected.every((q) => ["m01", "m02"].includes(q.moduleId)));
});
test("selection includes each chosen module when count permits", () => {
  const selected = selectQuestions(bank, ["m01", "m02", "m03"], 3, () => 0);
  assert.equal(new Set(selected.map((q) => q.moduleId)).size, 3);
});
test("empty modules and invalid count fail clearly", () => {
  assert.throws(() => selectQuestions(bank, [], 5), /módulo/);
  assert.throws(() => selectQuestions(bank, ["m01"], 0), /quantidade/);
});
test("score counts unanswered as unanswered and uses full session denominator", () => {
  assert.deepEqual(scoreSession(bank, { a: 1, b: 0 }), {
    total: 4,
    answered: 2,
    correct: 1,
    percent: 25,
  });
  assert.equal(scoreSession([], {}).percent, 0);
});

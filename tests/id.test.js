import test from "node:test";
import assert from "node:assert/strict";
import { createId } from "../src/lib/id.js";

test("records can receive a UUID on HTTP/IP where randomUUID is unavailable", () => {
  const insecureCrypto = {
    getRandomValues(bytes) {
      for (let i = 0; i < bytes.length; i++) bytes[i] = i;
      return bytes;
    },
  };
  assert.match(
    createId(insecureCrypto),
    /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/,
  );
});
test("fallback study IDs stay distinct without a cryptography API", () => {
  const ids = new Set(Array.from({ length: 1000 }, () => createId(null)));
  assert.equal(ids.size, 1000);
});

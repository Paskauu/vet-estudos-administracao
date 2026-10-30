import test from "node:test";
import assert from "node:assert/strict";
import { mkdtemp, mkdir, writeFile, readFile, rm } from "node:fs/promises";
import { tmpdir } from "node:os";
import { resolve } from "node:path";
import { spawnSync } from "node:child_process";

test("source preparation uses the new folder and preserves prepared administration PDFs", async () => {
  const root = await mkdtemp(resolve(tmpdir(), "vet-sources-"));
  try {
    await mkdir(resolve(root, "src/content"), { recursive: true });
    await mkdir(resolve(root, "public/fontes"), { recursive: true });
    const source = resolve(root, "1.0 - Material para consulta/2.0 - Epidemiologia Veterinária e Saneamento Ambiental");
    await mkdir(source, { recursive: true });
    await writeFile(resolve(root, "src/content/m01.json"), JSON.stringify({ id: "m01", source: { filename: "old.pdf" } }));
    await writeFile(resolve(root, "src/content/e01.json"), JSON.stringify({ id: "e01", courseId: "epidemiologia", source: { filename: "new.pdf" } }));
    await writeFile(resolve(source, "new.pdf"), "new-source");
    await writeFile(resolve(root, "public/fontes/m01.pdf"), "already-prepared");
    const result = spawnSync(process.execPath, [resolve("scripts/prepare-sources.mjs")], { cwd: root, encoding: "utf8" });
    assert.equal(result.status, 0, result.stderr);
    assert.equal(await readFile(resolve(root, "public/fontes/e01.pdf"), "utf8"), "new-source");
    assert.equal(await readFile(resolve(root, "public/fontes/m01.pdf"), "utf8"), "already-prepared");
  } finally {
    await rm(root, { recursive: true, force: true });
  }
});

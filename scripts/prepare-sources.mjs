import { mkdir, copyFile, readdir, readFile, access } from "node:fs/promises";
import { resolve } from "node:path";
import { courseById } from "../src/content/courses.js";
const content = resolve("src/content");
await mkdir("public/fontes", { recursive: true });
for (const filename of (await readdir(content)).filter((n) =>
  /^[me]\d\d\.json$/.test(n),
)) {
  const module = JSON.parse(await readFile(resolve(content, filename), "utf8"));
  const courseId = module.courseId || "administracao";
  const target = resolve("public/fontes", `${module.id}.pdf`);
  // Existing administration PDFs are already prepared; no rereading is needed.
  if (courseId === "administracao") {
    try { await access(target); continue; } catch { /* Clean checkouts need a copy. */ }
  }
  const course = courseById[courseId];
  if (!course) throw new Error(`Disciplina inválida em ${filename}.`);
  await copyFile(resolve("1.0 - Material para consulta", course.sourceDirectory, module.source.filename), target);
}
console.log("PDFs originais preparados com nomes estáveis.");

import { mkdir, copyFile, readdir, readFile } from "node:fs/promises";
import { resolve } from "node:path";
const content = resolve("src/content");
await mkdir("public/fontes", { recursive: true });
for (const filename of (await readdir(content)).filter((n) =>
  /^m\d\d\.json$/.test(n),
)) {
  const module = JSON.parse(await readFile(resolve(content, filename), "utf8"));
  await copyFile(
    resolve("1.0 - Material para consulta", module.source.filename),
    resolve("public/fontes", `${module.id}.pdf`),
  );
}
console.log("PDFs originais preparados com nomes estáveis.");

import { createServer } from "node:http";
import { createReadStream } from "node:fs";
import { stat } from "node:fs/promises";
import { resolve, sep, extname } from "node:path";

const root = resolve("dist");
const port = Number(process.argv[2]) || 4178;
const types = {
  ".html": "text/html; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".svg": "image/svg+xml",
  ".pdf": "application/pdf",
  ".png": "image/png",
  ".jpg": "image/jpeg",
};
const server = createServer(async (req, res) => {
  if (!["GET", "HEAD"].includes(req.method)) {
    res.writeHead(405);
    res.end();
    return;
  }
  try {
    const pathname = decodeURIComponent(
      new URL(req.url, "http://localhost").pathname,
    );
    const path = resolve(
      root,
      `.${pathname === "/" ? "/index.html" : pathname}`,
    );
    if (!path.startsWith(root + sep)) {
      res.writeHead(403);
      res.end();
      return;
    }
    const info = await stat(path);
    if (!info.isFile()) throw new Error();
    let start = 0,
      end = info.size - 1,
      status = 200;
    if (req.headers.range) {
      const match = /^bytes=(\d*)-(\d*)$/.exec(req.headers.range);
      if (match) {
        if (match[1]) {
          start = Number(match[1]);
          end = match[2] ? Math.min(end, Number(match[2])) : end;
        } else if (match[2]) start = Math.max(0, info.size - Number(match[2]));
        else start = info.size;
      }
      if (!match || start > end || start >= info.size || start < 0) {
        res.writeHead(416, { "Content-Range": `bytes */${info.size}` });
        res.end();
        return;
      }
      status = 206;
    }
    const headers = {
      "Content-Type": types[extname(path)] || "application/octet-stream",
      "Content-Length": end - start + 1,
      "Accept-Ranges": "bytes",
      "X-Content-Type-Options": "nosniff",
      "Cache-Control":
        extname(path) === ".html" ? "no-cache" : "public, max-age=3600",
    };
    if (status === 206)
      headers["Content-Range"] = `bytes ${start}-${end}/${info.size}`;
    res.writeHead(status, headers);
    if (req.method === "HEAD") {
      res.end();
      return;
    }
    createReadStream(path, { start, end })
      .on("error", () => res.destroy())
      .pipe(res);
  } catch {
    res.writeHead(404, { "Content-Type": "text/plain; charset=utf-8" });
    res.end("Arquivo não encontrado.");
  }
});
server.on("error", (error) => {
  if (error.code === "EADDRINUSE")
    console.log(
      `A porta ${port} já está em uso. Se este site já estiver aberto, basta usar o navegador.`,
    );
  else console.error(error.message);
  process.exitCode = 1;
});
server.listen(port, "0.0.0.0", () =>
  console.log(
    `Vet Estudos: http://localhost:${port}/ (na rede local, use o IP deste computador).`,
  ),
);

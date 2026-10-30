import { defineConfig } from "vite";
export default defineConfig({
  base: process.env.VITE_BASE_PATH || "./",
  build: { target: "es2020" },
  server: { port: 5173, strictPort: true },
});

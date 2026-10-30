import { defineConfig } from "vite";
export default defineConfig({
  base: process.env.VITE_BASE_PATH || "./",
  build: {
    target: "es2020",
    rolldownOptions: {
      output: {
        codeSplitting: {
          groups: [
            { name: "conteudo-administracao", test: /[/\\]src[/\\]content[/\\]m\d\d\.json/ },
            { name: "conteudo-epidemiologia", test: /[/\\]src[/\\]content[/\\]e\d\d\.json/ },
          ],
        },
      },
    },
  },
  server: { port: 5173, strictPort: true },
});

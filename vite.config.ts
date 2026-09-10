import { defineConfig } from "vite";
import tailwindcss from "@tailwindcss/vite";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import viteReact from "@vitejs/plugin-react";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  plugins: [
    // Tailwind v4: precisa do plugin para processar @import "tailwindcss" source(none)
    // e @source "../src". Sem ele o CSS sai envolto em @media source(none){...} (invalido).
    tailwindcss(),
    tanstackStart({
      spa: {
        enabled: true,
      },
      // Sem isto, o build emite so a casca do SPA e o conteudo aparece apenas
      // depois que o JavaScript roda. O Google ate renderiza JS, mas os robos
      // das LLMs (GPTBot, ClaudeBot, PerplexityBot) nao — eles veem pagina em
      // branco. Prerender grava o HTML ja montado de cada rota.
      prerender: {
        enabled: true,
        crawlLinks: true,
        failOnError: true,
      },
      // O sitemap do plugin fica de fora: ele perde a home (a rota "/" e
      // consumida para gerar a casca do SPA) e trata cada ancora como pagina.
      // Quem escreve o sitemap e o scripts/postbuild.mjs, a partir das paginas
      // que o prerender realmente gravou em disco.
      sitemap: { enabled: false },
      pages: [{ path: "/" }, { path: "/produtos" }],
    }),
    viteReact(),
  ],
});

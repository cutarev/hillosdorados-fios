// Pos-build: deixa a pasta de saida pronta para qualquer host estatico.
//
// O TanStack Start em modo SPA emite apenas `_shell.html` — nenhum host serve
// esse nome como pagina inicial. Sem um `index.html`, a raiz do site responde
// 404 em GitHub Pages, Netlify, Vercel, Cloudflare Pages e nginx; so funciona
// em Apache com `DirectoryIndex _shell.html`. Este script copia o shell para os
// nomes que cada host espera e escreve as regras de fallback de SPA.

import { copyFile, readdir, readFile, stat, writeFile } from "node:fs/promises";
import { existsSync } from "node:fs";
import path from "node:path";

const CANDIDATES = ["dist/client", "dist"];
const SHELL = "_shell.html";

// Pasta publica da hospedagem cPanel. Trocar aqui (ou exportar CPANEL_DEPLOY_PATH
// antes do build) se o site passar a morar em outro dominio/subdominio.
const CPANEL_DEPLOY_PATH = process.env.CPANEL_DEPLOY_PATH ?? "/home2/joaol109/public_html";

// Dominio do site. Lido de src/data/site.ts para nao existir uma segunda copia
// que possa ficar desatualizada — aquele arquivo e a fonte da verdade.
async function readSiteUrl() {
  const source = await readFile("src/data/site.ts", "utf8");
  const match = /export const SITE_URL = "([^"]+)"/.exec(source);
  if (!match) {
    console.error("[postbuild] SITE_URL nao encontrado em src/data/site.ts");
    process.exit(1);
  }
  return match[1].replace(/\/$/, "");
}

const outDir = CANDIDATES.find((dir) => existsSync(path.join(dir, SHELL)));

if (!outDir) {
  console.error(
    `[postbuild] ${SHELL} nao encontrado em ${CANDIDATES.join(" nem ")}. ` +
      "Confirme que o modo SPA esta ligado em vite.config.ts: tanstackStart({ spa: { enabled: true } })",
  );
  process.exit(1);
}

const shellPath = path.join(outDir, SHELL);

// index.html: se o prerender ja gravou a home renderizada, ela e melhor que a
// casca — nao sobrescrever. A copia so entra se o prerender estiver desligado.
const indexPath = path.join(outDir, "index.html");
if (!existsSync(indexPath)) {
  await copyFile(shellPath, indexPath);
}

// 404.html e a casca do SPA — e assim que o plugin preve. Ja tentamos servir
// aqui a tela de 404 ja renderizada: nao funciona, porque o roteador hidrata
// com os dados da rota /404 numa URL que e outra, e estoura "Invariant failed".
// Com a casca, o roteador monta a tela de 404 no cliente, como deve ser.
await copyFile(shellPath, path.join(outDir, "404.html"));

// Netlify e Cloudflare Pages. Todas as rotas reais do site sao arquivos estaticos
// gerados pelo prerender, entao o que sobra e realmente inexistente: devolver 404
// de verdade, e nao 200 com a home (o "soft 404" que o Google penaliza).
await writeFile(path.join(outDir, "_redirects"), "/*    /404.html   404\n");

// Apache (hospedagem compartilhada / cPanel): pagina de erro e cache dos assets.
await writeFile(
  path.join(outDir, ".htaccess"),
  `# Site estatico prerenderizado — gerado por scripts/postbuild.mjs
DirectoryIndex index.html

# Cada rota do site e um arquivo HTML de verdade, gerado pelo prerender.
# O que nao existe recebe 404 com status 404 mesmo; o 404.html carrega o
# roteador, que monta a pagina de "nao encontrada" do site.
ErrorDocument 404 /404.html

<IfModule mod_headers.c>
  <FilesMatch "\\.html$">
    Header set Cache-Control "no-cache, no-store, must-revalidate"
  </FilesMatch>
  # Assets tem hash no nome, entao podem ser cacheados para sempre
  <FilesMatch "\\.(?:js|css|woff2|woff|svg|png|jpg|jpeg|webp|gif|ico)$">
    Header set Cache-Control "public, max-age=31536000, immutable"
  </FilesMatch>
</IfModule>

<IfModule mod_deflate.c>
  AddOutputFilterByType DEFLATE text/html text/css application/javascript application/json image/svg+xml
</IfModule>
`,
);

// .cpanel.yml: o cPanel se recusa a fazer deploy de um repositorio que nao tenha
// este arquivo na branch em uso. Ele e gerado aqui, e nao na raiz do projeto,
// porque quem o cPanel puxa e a branch `stable-website` — que contem o site ja
// construido. Um .cpanel.yml na `main` copiaria codigo-fonte para o ar.
await writeFile(
  path.join(outDir, ".cpanel.yml"),
  `---
# Gerado por scripts/postbuild.mjs — nao edite direto na branch de deploy.
# Copia o site construido para a pasta publica da hospedagem.
deployment:
  tasks:
    - export DEPLOYPATH=${CPANEL_DEPLOY_PATH}
    - /bin/mkdir -p "$DEPLOYPATH"
    # -rltD em vez de -a: -a inclui -p -o -g, que copiariam permissao, dono e
    # grupo da pasta do repositorio (0700, grupo do usuario) para a public_html.
    # O Apache precisa que ela seja 0750 com grupo nobody; com 0700 ele perde
    # acesso e o site inteiro passa a responder 403.
    # --chmod fixa permissao previsivel em tudo que e copiado.
    # Sem --delete: o que ja existia na pasta publica e preservado; os assets
    # tem hash no nome, entao versoes antigas apenas acumulam.
    - /usr/bin/rsync -rltD --chmod=D755,F644 --exclude '.git' --exclude '.cpanel.yml' ./ "$DEPLOYPATH/"
    # Rede de seguranca: devolve a public_html a permissao que o Apache espera,
    # mesmo que algo antes tenha mexido nela.
    - /bin/chmod 750 "$DEPLOYPATH"
`,
);

// Sitemap, gerado a partir do que o prerender realmente gravou: cada
// index.html em disco e uma pagina de verdade. Assim uma rota nova entra no
// sitemap sozinha, sem ninguem precisar lembrar de atualizar uma lista.
const siteUrl = await readSiteUrl();

async function collectRoutes(dir, prefix = "") {
  const routes = [];
  for (const entry of (await readdir(dir)).sort()) {
    const full = path.join(dir, entry);
    if (entry === "index.html") {
      routes.push(prefix === "" ? "/" : prefix);
      // /404 fica de fora: e rota tecnica, nao pagina do site.
    } else if (!entry.startsWith(".") && entry !== "assets" && entry !== "404") {
      const info = await stat(full);
      if (info.isDirectory()) routes.push(...(await collectRoutes(full, `${prefix}/${entry}`)));
    }
  }
  return routes;
}

const routes = await collectRoutes(outDir);
const today = new Date().toISOString().slice(0, 10);
await writeFile(
  path.join(outDir, "sitemap.xml"),
  `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${routes
  .map(
    (route) => `  <url>
    <loc>${siteUrl}${route}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>${route === "/" ? "1.0" : "0.8"}</priority>
  </url>`,
  )
  .join("\n")}
</urlset>
`,
);

// robots.txt sai de public/ sem saber o dominio; a linha Sitemap entra aqui,
// ja com o valor de SITE_URL.
const robotsPath = path.join(outDir, "robots.txt");
const robots = await readFile(robotsPath, "utf8");
await writeFile(robotsPath, `${robots.trimEnd()}\n\nSitemap: ${siteUrl}/sitemap.xml\n`);

// llms.txt: convencao emergente (llmstxt.org) — um resumo curto, em markdown,
// apontando para as paginas de verdade. Nenhum provedor de LLM se comprometeu
// a honrar o formato, entao trate como aposta barata: o conteudo que conta
// continua sendo o HTML prerenderizado e o JSON-LD dentro dele.
await writeFile(
  path.join(outDir, "llms.txt"),
  `# Hillosdorados

> Fornecedora brasileira de fios de nylon termodegradaveis para malharia.
> Os fios sao vendidos por quilo, em cone, e nao ha venda pela internet: o site
> serve para pedir cotacao por WhatsApp ou e-mail.

## Paginas

- [Inicio](${siteUrl}/): apresentacao, tabela de especificacoes tecnicas e canais de contato.
- [Produtos](${siteUrl}/produtos): as tres bitolas oferecidas, com ficha de cada uma.

## Observacoes

- Aplicacao: exclusivamente malharia.
- "Termodegradavel" descreve o comportamento do fio no processo produtivo, e nao
  uma certificacao ambiental.
- Dados estruturados schema.org (Organization e ItemList) estao embutidos no HTML
  das paginas acima.
- Sitemap: ${siteUrl}/sitemap.xml
`,
);

const files = (await readdir(outDir)).sort();
console.log(`[postbuild] ${outDir} pronto para deploy: ${files.join(", ")}`);

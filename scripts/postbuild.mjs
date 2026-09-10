// Pos-build: deixa a pasta de saida pronta para qualquer host estatico.
//
// O TanStack Start em modo SPA emite apenas `_shell.html` — nenhum host serve
// esse nome como pagina inicial. Sem um `index.html`, a raiz do site responde
// 404 em GitHub Pages, Netlify, Vercel, Cloudflare Pages e nginx; so funciona
// em Apache com `DirectoryIndex _shell.html`. Este script copia o shell para os
// nomes que cada host espera e escreve as regras de fallback de SPA.

import { copyFile, readdir, writeFile } from "node:fs/promises";
import { existsSync } from "node:fs";
import path from "node:path";

const CANDIDATES = ["dist/client", "dist"];
const SHELL = "_shell.html";

// Pasta publica da hospedagem cPanel. Trocar aqui (ou exportar CPANEL_DEPLOY_PATH
// antes do build) se o site passar a morar em outro dominio/subdominio.
const CPANEL_DEPLOY_PATH = process.env.CPANEL_DEPLOY_PATH ?? "/home2/joaol109/public_html";

const outDir = CANDIDATES.find((dir) => existsSync(path.join(dir, SHELL)));

if (!outDir) {
  console.error(
    `[postbuild] ${SHELL} nao encontrado em ${CANDIDATES.join(" nem ")}. ` +
      "Confirme que o modo SPA esta ligado em vite.config.ts: tanstackStart({ spa: { enabled: true } })",
  );
  process.exit(1);
}

const shellPath = path.join(outDir, SHELL);

// index.html: pagina inicial em todo host estatico.
// 404.html: fallback de rotas em GitHub Pages e afins, que servem esse arquivo
// para caminhos desconhecidos — e o roteador do lado do cliente assume dali.
for (const name of ["index.html", "404.html"]) {
  await copyFile(shellPath, path.join(outDir, name));
}

// Netlify e Cloudflare Pages: toda rota nao-arquivo cai no index.html (200, nao redirect).
await writeFile(path.join(outDir, "_redirects"), "/*    /index.html   200\n");

// Apache (hospedagem compartilhada / cPanel): mesmo fallback + cache dos assets.
await writeFile(
  path.join(outDir, ".htaccess"),
  `# SPA estatica — gerado por scripts/postbuild.mjs
DirectoryIndex index.html

RewriteEngine On

# Rotas inexistentes caem no index.html para o roteador do cliente resolver
RewriteCond %{REQUEST_FILENAME} !-f
RewriteCond %{REQUEST_FILENAME} !-d
RewriteRule ^ index.html [L]

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
    # Sem --delete: arquivos que ja existiam na pasta publica sao preservados.
    # Os assets tem hash no nome, entao versoes antigas apenas acumulam.
    - /usr/bin/rsync -a --exclude '.git' --exclude '.cpanel.yml' ./ "$DEPLOYPATH/"
`,
);

const files = (await readdir(outDir)).sort();
console.log(`[postbuild] ${outDir} pronto para deploy: ${files.join(", ")}`);

# Checklist de deploy — Hillosdorados Fios

Site estático (SPA). Não há backend, banco nem variáveis de ambiente: o build gera
uma pasta de arquivos e qualquer host estático serve.

> **Onde ficam os dados editáveis:** `src/data/site.ts` (contato, domínio, textos
> institucionais) e `src/data/products.ts` (os três produtos). Nada de conteúdo
> precisa ser procurado dentro das páginas.

---

## 1. Bloqueadores — resolver antes de publicar

- [ ] **Número de WhatsApp real.** `src/data/site.ts` está com o placeholder
      `5511999999999`. Todo botão de WhatsApp do site usa esse número. Formato:
      código do país + DDD + número, só dígitos (ex.: `5511987654321`).
      O número exibido em tela é formatado sozinho a partir dele.
- [ ] **E-mail real.** Também em `src/data/site.ts`. Confirmar que a caixa existe
      e é monitorada.
- [ ] **Domínio final** em `SITE_URL` (`src/data/site.ts`). Ele monta as URLs
      absolutas de `og:image` e da tag canônica — com o valor errado, o preview de
      link no WhatsApp não carrega a imagem.
- [ ] **Testar os dois canais no celular** depois do deploy.

## 2. Já resolvido (não precisa refazer)

- Favicon, logo do topo, ícone de iOS e imagem de preview de link, todos a partir
  de `public/logo.svg`.
- `og:image` (`public/og.jpg`, 1200×630), `og:url`, `og:site_name`, `og:locale` e
  tag canônica.
- Rodapé com ano dinâmico e contatos visíveis em texto.
- Página de erro do servidor traduzida para português.

## 3. Pendências de conteúdo

Estão listadas em `~/Documentos/hillosdorados-pendencias.md`, para levantar com o
dono do site: unidade correta da bitola, razão social, CNPJ, endereço, prazos,
pedido mínimo e afins.

## 4. Build

```sh
npm ci          # instala exatamente o que está no package-lock.json
npm run build   # gera dist/client/ pronto para subir
npm run preview # confere o resultado localmente antes de publicar
```

O build termina imprimindo o conteúdo da pasta. Deve conter:

```
.cpanel.yml  .htaccess  _redirects  _shell.html  404.html  index.html
apple-touch-icon.png  assets/  favicon.ico  favicon.svg  logo.svg  og.jpg  robots.txt
```

> **Se `index.html` não estiver na lista, não faça o deploy.** O TanStack Start em
> modo SPA emite só `_shell.html`, e nenhum host serve esse nome como página
> inicial. `scripts/postbuild.mjs` resolve isso; se ele falhar, o build sai com
> erro em vez de publicar algo quebrado.

## 5. Publicar na HostGator (cPanel + Git) — caminho principal

### Como as peças se encaixam

A hospedagem compartilhada **não tem Node.js**, então ela não consegue rodar o
build. Quem constrói é o GitHub Actions:

```
push na main  →  GitHub Actions roda npm ci + npm run build
              →  publica a pasta pronta na branch stable-website
              →  cPanel puxa a stable-website e copia para public_html
```

Por isso o cPanel precisa estar na branch **`stable-website`**, e não na `main`.
A `main` só tem código-fonte — publicá-la colocaria arquivos `.tsx` no ar.

### Sobre o `.cpanel.yml`

O cPanel se recusa a fazer deploy sem esse arquivo na branch em uso. Ele é gerado
automaticamente pelo `scripts/postbuild.mjs` dentro da pasta de build, então ele
já chega na `stable-website` junto com o site. **Não crie um `.cpanel.yml` na
`main`** — isso faria o cPanel publicar código-fonte.

O caminho de destino é `/home2/joaol109/public_html`. Para mudar (subdomínio,
outro domínio), edite `CPANEL_DEPLOY_PATH` em `scripts/postbuild.mjs` ou exporte
a variável antes do build.

### Passo a passo

- [ ] **1.** `git push origin main`
- [ ] **2.** Em **Actions** no GitHub, esperar o workflow "Build e Deploy para
      stable-website" ficar verde (≈ 1–2 min). Ele cria a branch `stable-website`
      na primeira execução.
- [ ] **3.** No cPanel → **Git™ Version Control** → _Manage_ no repositório →
      trocar a branch em uso de `main` para `stable-website`.
      Se a interface não oferecer a troca, faça por SSH:

      ```sh
              cd /home2/joaol109/repositories/hillosdorados-fios
              git fetch origin
              git checkout -B stable-website origin/stable-website
              git status          # precisa dizer "nothing to commit, working tree clean"
              ```

- [ ] **4.** Aba **Pull or Deploy** → **Update from Remote** (puxa o que o Actions
      publicou)
- [ ] **5.** **Deploy HEAD Commit** (roda o `.cpanel.yml` e copia para `public_html`)

A partir daí, cada atualização é: push na `main` → esperar o Actions → _Update from
Remote_ → _Deploy HEAD Commit_. Os dois últimos cliques são manuais; o cPanel só
faz deploy automático em repositórios hospedados nele mesmo.

### "The system cannot deploy"

O cPanel mostra essa caixa com as duas exigências sempre que o deploy é bloqueado,
sem dizer qual delas falhou:

1. **`.cpanel.yml` válido existe** — resolvido acima, desde que a branch em uso
   seja a `stable-website`.
2. **Nenhuma alteração não commitada na branch em uso** — o cPanel mantém um clone
   próprio em `/home2/joaol109/repositories/hillosdorados-fios`. Se qualquer
   arquivo ali tiver sido alterado fora do Git (edição pelo Gerenciador de
   Arquivos, um deploy anterior que escreveu dentro da pasta, mudança de
   permissão), o Git vê "changes not staged" e o cPanel trava — ele se recusa a
   sobrescrever trabalho que possa ser seu. Para conferir e limpar, por SSH:

   ```sh
   cd /home2/joaol109/repositories/hillosdorados-fios
   git status                       # mostra o que está sujo
   git checkout -- .                # descarta alterações em arquivos versionados
   git clean -fd                    # remove arquivos que não são do repositório
   ```

   Rode `git status` antes de descartar: se houver algo que você queira manter,
   copie para fora primeiro. Esses comandos apagam alterações locais.

## 6. Alternativas de publicação

### Netlify / Cloudflare Pages / Vercel

Dispensa a branch intermediária e o cPanel.

- [ ] Conectar o repositório pelo painel do serviço
- [ ] Build command: `npm run build` · Publish directory: `dist/client` · Node: `22`
- [ ] O `_redirects` gerado no build já cuida do fallback de rotas

### Upload manual por FTP

- [ ] `npm run build`
- [ ] Subir **todo o conteúdo** de `dist/client/` para `public_html`
- [ ] Ligar a exibição de arquivos ocultos no cliente de FTP, senão o `.htaccess`
      fica para trás e as rotas quebram

## 7. Domínio e HTTPS

- [ ] Apontar o DNS para a hospedagem
- [ ] Emitir o certificado HTTPS (na HostGator, AutoSSL no cPanel)
- [ ] Forçar redirect de `http://` para `https://`
- [ ] Definir uma versão só como oficial — `www` **ou** raiz — e redirecionar a outra
- [ ] Conferir que `SITE_URL` em `src/data/site.ts` bate com a versão escolhida

## 8. Verificação pós-deploy

- [ ] `https://SEU_DOMINIO/` carrega a home com o hero e as 3 fotos
- [ ] `https://SEU_DOMINIO/produtos` carrega **digitando a URL direto no navegador**
      — é isso que valida o fallback de SPA do host
- [ ] Recarregar (F5) dentro de `/produtos` continua funcionando
- [ ] `/qualquer-coisa` mostra a página 404 do site
- [ ] Botão e número do WhatsApp abrem a conversa certa
- [ ] Botão e endereço de e-mail abrem o cliente com o assunto preenchido
- [ ] Ícone do cone aparece na aba do navegador
- [ ] Colar o link no WhatsApp e ver se o preview mostra a imagem com o logo
- [ ] Abrir no celular: nenhuma das páginas deve rolar para os lados
- [ ] Console do navegador (F12) sem erros em vermelho

## 9. Se der errado

- **Raiz dá 404:** falta `index.html` na pasta publicada — ver seção 4.
- **Home funciona, `/produtos` dá 404 ao recarregar:** o host não está aplicando o
  fallback. Apache/HostGator → conferir se o `.htaccess` subiu e se `AllowOverride`
  está habilitado. Netlify/CF → conferir o `_redirects`.
- **Página em branco com 404 nos assets:** o site está numa subpasta. Configurar
  `base` no `vite.config.ts`.
- **Preview de link sem imagem:** `SITE_URL` não bate com o domínio real.
- **Rollback:** `git revert <commit>` na `main`, esperar o Actions e repetir
  _Update from Remote_ + _Deploy HEAD Commit_.

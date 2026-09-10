# Checklist de deploy — Hillosdorados Fios

Site estático (SPA). Não há backend, banco nem variáveis de ambiente: o build
gera uma pasta de arquivos e qualquer host estático serve.

---

## 1. Bloqueadores — resolver antes de publicar

Sem estes itens o site vai ao ar quebrado no que ele existe para fazer: gerar contato.

- [ ] **Número de WhatsApp real.** Hoje `src/data/products.ts:5` tem o placeholder
      `5511999999999`. Todo botão de WhatsApp da home e da página de produtos aponta
      para esse número. Formato: código do país + DDD + número, só dígitos
      (ex.: `5511987654321`).
- [ ] **E-mail real.** `src/data/products.ts:6` está como `contato@hillosdorados.com.br`.
      Confirmar que a caixa existe e é monitorada — se o domínio ainda não tem e-mail,
      trocar por um endereço que funcione.
- [ ] **Testar os dois canais no celular** depois do deploy: abrir `wa.me` e o `mailto:`
      e confirmar que caem na conta certa.

## 2. Antes do primeiro deploy — recomendado

- [ ] **`og:image`.** Não existe hoje. As páginas declaram
      `twitter:card: summary_large_image`, então link compartilhado no WhatsApp e no
      Instagram sai como um card grande e **vazio**. Adicionar uma imagem 1200×630 em
      `public/og.jpg` e a meta `{ property: "og:image", content: "https://SEU_DOMINIO/og.jpg" }`
      em `src/routes/__root.tsx`.
- [ ] **URL canônica** — também ausente. Depois de fechar o domínio, adicionar
      `{ rel: "canonical", href: "https://SEU_DOMINIO/" }` nos `links` do `__root.tsx`.
- [ ] **`public/robots.txt`** já libera todos os buscadores. Se quiser indexação mais
      rápida, acrescentar a linha `Sitemap: https://SEU_DOMINIO/sitemap.xml` e criar o
      arquivo (são só 2 URLs: `/` e `/produtos`).
- [ ] **Peso das imagens.** `src/assets/` soma ~500 KB em JPG (hero com 198 KB).
      Aceitável, mas converter para WebP corta ~60% e o hero é a primeira coisa que
      carrega no celular.
- [ ] **`twitter:site` está como `@Hillosdorados`** em `src/routes/__root.tsx`.
      Se esse perfil não existir, remover a meta.

## 3. Desvincular da Lovable — o que sobrou fora do código

O código já está limpo (ver commit "Remove todo o acoplamento com a Lovable").
Estes passos são no GitHub e só você pode fazer:

- [ ] **Remover o GitHub App da Lovable do repositório:**
      `github.com/settings/installations` → Lovable → _Configure_ → tirar
      `hillosdorados-fios` da lista de repositórios (ou _Uninstall_, se não usar em
      outro projeto). Enquanto o app estiver instalado, ele mantém permissão de
      escrita e pode voltar a commitar na `main`.
- [ ] **Arquivar ou apagar o projeto no painel da Lovable**, para não haver um editor
      publicando por cima do repositório.
- [ ] **Conferir os colaboradores e webhooks:** Settings → Collaborators e
      Settings → Webhooks. Remover o que for da Lovable.
- [ ] Os commits antigos assinados por `gpt-engineer-app[bot]` continuam no histórico.
      Isso é registro do passado e **não** é vínculo ativo — não reescreva o histórico
      só por causa disso.

## 4. Build

```sh
npm ci          # instala exatamente o que está no package-lock.json
npm run build   # gera dist/client/ pronto para subir
npm run preview # confere o resultado localmente antes de publicar
```

O build termina imprimindo o conteúdo da pasta. Deve conter:

```
index.html  404.html  _shell.html  _redirects  .htaccess  assets/  favicon.ico  robots.txt
```

> **Se `index.html` não estiver na lista, não faça o deploy.** É exatamente esse o
> problema que derrubava a raiz do site antes: o TanStack Start em modo SPA emite só
> `_shell.html`, e nenhum host serve esse nome como página inicial. `scripts/postbuild.mjs`
> resolve isso; se ele falhar, o build sai com erro em vez de publicar algo quebrado.

## 5. Publicar

### Caminho A — CI já configurado (branch `stable-website`)

É o que o repositório faz hoje: `.github/workflows/deploy.yml` roda a cada push na
`main` e joga a pasta pronta na branch `stable-website`.

- [ ] `git push origin main`
- [ ] Acompanhar em **Actions** → "Build e Deploy para stable-website" (verde ≈ 1–2 min)
- [ ] Confirmar que a branch `stable-website` recebeu `index.html` na raiz
- [ ] Apontar a hospedagem para essa branch: - **GitHub Pages:** Settings → Pages → Source: _Deploy from a branch_ →
      branch `stable-website`, pasta `/ (root)`. - **Hospedagem Apache/cPanel:** puxar a `stable-website` por Git Version Control
      ou baixar o ZIP e subir o conteúdo para `public_html/`. O `.htaccess` já vai junto.

### Caminho B — Netlify / Cloudflare Pages / Vercel

Mais simples que o caminho A e dispensa a branch intermediária.

- [ ] Conectar o repositório pelo painel do serviço
- [ ] Build command: `npm run build`
- [ ] Publish directory: `dist/client`
- [ ] Node version: `22`
- [ ] O `_redirects` gerado no build já cuida do fallback de rotas — nada a configurar

### Caminho C — upload manual (FTP)

- [ ] `npm run build`
- [ ] Subir **todo o conteúdo** de `dist/client/` (incluindo os ocultos `.htaccess`)
      para a raiz pública do servidor
- [ ] Muitos clientes de FTP escondem arquivos que começam com ponto — ligar a exibição
      de ocultos, senão as rotas quebram

## 6. Domínio e HTTPS

- [ ] Apontar o DNS para o host (registro `A` ou `CNAME`, conforme o serviço)
- [ ] Emitir o certificado HTTPS (automático em Pages, Netlify, Cloudflare e Vercel)
- [ ] Forçar redirect de `http://` para `https://`
- [ ] Definir uma versão só como oficial — `www` **ou** raiz — e redirecionar a outra

## 7. Verificação pós-deploy

Testar no domínio final, **um a um**:

- [ ] `https://SEU_DOMINIO/` carrega a home com o hero e as 3 fotos de produto
- [ ] `https://SEU_DOMINIO/produtos` carrega **digitando a URL direto no navegador**
      (não só clicando no menu) — é isso que valida o fallback de SPA do host
- [ ] Recarregar (F5) dentro de `/produtos` continua funcionando
- [ ] Uma URL inexistente, ex. `/qualquer-coisa`, mostra a página 404 do site
- [ ] Botão **WhatsApp** abre a conversa com o número certo
- [ ] Botão **E-mail** abre o cliente de e-mail com o assunto preenchido
- [ ] Nos cards da home, "Detalhes do produto" leva à âncora certa em `/produtos`
- [ ] Layout no celular: menu, hero e cards (o menu do topo some abaixo de `md` — é
      intencional, mas confira se a navegação ainda faz sentido no telefone)
- [ ] Console do navegador (F12) sem erros em vermelho
- [ ] Colar o link no WhatsApp e ver como sai o preview

## 8. Se der errado

- **Raiz dá 404:** falta `index.html` na pasta publicada — ver seção 4.
- **Home funciona, `/produtos` dá 404 ao recarregar:** o host não está aplicando o
  fallback de SPA. Apache → conferir se o `.htaccess` subiu e se `AllowOverride` está
  ligado. Netlify/CF → conferir o `_redirects`. GitHub Pages → é o `404.html` que faz
  esse papel.
- **Página em branco com erro de MIME ou 404 nos assets:** o site está numa subpasta.
  Configurar `base` no `vite.config.ts`.
- **Rollback:** `git revert <commit>` na `main` e deixar o CI republicar. No caminho A
  também dá para reverter direto a branch `stable-website`.

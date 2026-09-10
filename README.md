# Hillosdorados Fios

Site institucional da Hillosdorados — fios de nylon termodegradáveis para malharia.
O site **não vende online**: ele é uma ponte de contato, levando o visitante para
WhatsApp ou e-mail para cotação.

## Stack

- [TanStack Start](https://tanstack.com/start) em modo SPA (React 19 + TanStack Router)
- Vite 8 + Tailwind CSS v4
- shadcn/ui (Radix) para os componentes de UI
- TypeScript em modo `strict`

## Rodando localmente

Requer Node.js LTS (>= 20).

```sh
git clone https://github.com/cutarev/hillosdorados-fios.git
cd hillosdorados-fios
npm ci
npm run dev
```

O site sobe em `http://localhost:3000`.

## Scripts

| Comando            | O que faz                                        |
| ------------------ | ------------------------------------------------ |
| `npm run dev`      | Servidor de desenvolvimento com hot reload       |
| `npm run build`    | Build de produção para `dist/`                   |
| `npm run preview`  | Serve o build de produção localmente             |
| `npm run lint`     | ESLint                                           |
| `npm run format`   | Prettier                                         |

## Estrutura

```
src/
  routes/          páginas (index.tsx = home, produtos.tsx = catálogo)
  data/products.ts catálogo, número de WhatsApp e e-mail de contato
  components/ui/   componentes shadcn/ui
  assets/          imagens dos produtos e do hero
  styles.css       design system (tokens de cor em oklch + Tailwind v4)
```

Para alterar produtos, preço de contato ou canais de atendimento, edite
`src/data/products.ts` — as duas páginas leem dali.

## Deploy

Ver [DEPLOY.md](./DEPLOY.md).

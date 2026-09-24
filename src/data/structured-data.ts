// Dados estruturados (JSON-LD). Sao lidos pelo Google para montar resultados
// ricos e pelos robos das LLMs para entender o que a empresa vende sem ter que
// adivinhar a partir do texto solto da pagina.
//
// Tudo aqui e montado a partir de site.ts e products.ts: nao ha um segundo
// lugar para atualizar quando o contato ou o catalogo mudar.

import { PRODUCTS } from "./products";
import { BRAND_NAME, EMAIL, SITE_DESCRIPTION, SITE_URL, WHATSAPP_NUMBER } from "./site";

const absolute = (pathname: string) =>
  pathname.startsWith("http") ? pathname : `${SITE_URL}${pathname}`;

export function organizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: BRAND_NAME,
    url: `${SITE_URL}/`,
    logo: absolute("/logo.svg"),
    image: absolute("/og.jpg"),
    description: SITE_DESCRIPTION,
    email: EMAIL,
    telephone: `+${WHATSAPP_NUMBER}`,
    areaServed: "BR",
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "sales",
      email: EMAIL,
      telephone: `+${WHATSAPP_NUMBER}`,
      availableLanguage: ["Portuguese"],
    },
  };
}

// Lista simples, sem `@type: Product`: o preco so e passado por WhatsApp, e o
// Google reprova Product sem offers/review/aggregateRating ("itens invalidos"
// no Search Console). Se um dia o site publicar preco, volta a ser Product com
// `offers` de verdade.
export function productListSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: `Linha de produtos ${BRAND_NAME}`,
    itemListElement: PRODUCTS.map((product, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: `${product.name} ${product.color.toLowerCase()}`,
      url: `${SITE_URL}/produtos#${product.slug}`,
    })),
  };
}

export function jsonLdScript(schema: object) {
  return {
    type: "application/ld+json",
    // JSON.stringify ja escapa aspas; "</" e quebrado para nao fechar a tag cedo.
    children: JSON.stringify(schema).replace(/</g, "\\u003c"),
  };
}

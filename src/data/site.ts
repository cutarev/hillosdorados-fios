// Dados da empresa exibidos no site.
//
// Este e o unico arquivo que precisa ser editado para trocar contato, dominio
// ou textos institucionais.

// Formato: codigo do pais + DDD + numero, so digitos. O numero exibido na tela
// e formatado a partir daqui por formatWhatsApp().
export const WHATSAPP_NUMBER = "5511982408464";

export const EMAIL = "hillosdorados@gmail.com";

// Dominio do site. Usado nas URLs absolutas de og:image, og:url e canonical, e
// lido pelo scripts/postbuild.mjs para montar sitemap.xml e llms.txt.
export const SITE_URL = "https://hillosdorados.com.br";

export const BRAND_NAME = "Hillosdorados";
export const TAGLINE = "Fios de nylon termodegradáveis para malharia";

// Descricao usada nas metas quando a pagina nao define a sua.
export const SITE_DESCRIPTION =
  "Fios de nylon termodegradáveis para malharia. Cones vendidos por quilo, cotação direta por WhatsApp ou e-mail.";

// Formata o numero para leitura humana: 5511982408464 -> +55 (11) 98240-8464.
// Se o numero nao tiver o formato brasileiro esperado, devolve como esta —
// assim trocar por um numero de outro formato nao quebra a exibicao.
export function formatWhatsApp(raw: string = WHATSAPP_NUMBER): string {
  const match = /^55(\d{2})(\d{4,5})(\d{4})$/.exec(raw);
  if (!match) return raw;
  const [, ddd, prefix, suffix] = match;
  return `+55 (${ddd}) ${prefix}-${suffix}`;
}

export const WHATSAPP_LINK = `https://wa.me/${WHATSAPP_NUMBER}`;
export const EMAIL_LINK = `mailto:${EMAIL}`;

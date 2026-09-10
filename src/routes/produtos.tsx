import { createFileRoute, Link } from "@tanstack/react-router";
import { PRODUCTS } from "../data/products";
import { EMAIL, WHATSAPP_NUMBER } from "../data/site";
import { jsonLdScript, productListSchema } from "../data/structured-data";
import { BrandMark } from "../components/brand-mark";
import { SiteFooter } from "../components/site-footer";

export const Route = createFileRoute("/produtos")({
  head: () => ({
    meta: [
      { title: "Produtos | Fios de Nylon Termodegradáveis — Hillosdorados" },
      {
        name: "description",
        content:
          "Linha de fios de nylon termodegradáveis para malharia: bitolas 30mm e 50mm, cones em tubete colorido, venda por quilo.",
      },
      {
        property: "og:title",
        content: "Produtos | Fios de Nylon Termodegradáveis — Hillosdorados",
      },
      {
        property: "og:description",
        content:
          "Linha de fios de nylon termodegradáveis para malharia: bitolas 30mm e 50mm, cones em tubete colorido, venda por quilo.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    scripts: [jsonLdScript(productListSchema())],
  }),
  component: Produtos,
});

function Produtos() {
  return (
    <div className="min-h-screen bg-paper-white text-industrial-black font-sans">
      <nav className="sticky top-0 z-50 bg-industrial-black text-paper-white">
        <div className="max-w-7xl mx-auto flex justify-between items-center px-8 h-16">
          <BrandMark />
          <div className="hidden md:flex gap-10 text-[11px] uppercase tracking-[0.2em] font-semibold">
            <Link to="/" className="hover:text-gold-primary transition-colors">
              Início
            </Link>
            <Link to="/produtos" className="text-gold-primary">
              Produtos
            </Link>
            <Link to="/" hash="contato" className="hover:text-gold-primary transition-colors">
              Contato
            </Link>
          </div>
        </div>
      </nav>

      <header className="bg-industrial-black text-paper-white">
        <div className="max-w-7xl mx-auto px-8 py-20">
          <span className="text-gold-primary text-[11px] font-bold tracking-[0.25em] uppercase">
            Linha de produtos
          </span>
          <h1 className="font-display text-3xl sm:text-4xl md:text-5xl mt-5 max-w-3xl leading-[1.1] break-words">
            Fios de nylon termodegradáveis em cone
          </h1>
          <p className="text-paper-white/70 mt-6 max-w-xl leading-relaxed">
            Fornecimento para malharias. Cones com tubete identificado por cor. Comercialização por
            quilo.
          </p>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-8 py-20 space-y-24">
        {PRODUCTS.map((p, i) => (
          <article key={p.slug} id={p.slug} className="grid md:grid-cols-2 gap-12 items-start">
            <img
              src={p.image}
              alt={p.alt}
              width={1024}
              height={1024}
              loading={i === 0 ? "eager" : "lazy"}
              className={`w-full aspect-square object-cover bg-industrial-black ${
                i % 2 === 1 ? "md:order-2" : ""
              }`}
            />
            <div>
              <span className="text-gold-primary text-[11px] font-bold tracking-[0.25em]">
                {p.index}
              </span>
              <h2 className="font-display text-3xl mt-2 mb-5">{p.name}</h2>
              <p className="text-industrial-black/70 leading-relaxed mb-8">{p.detail}</p>

              <dl className="text-sm border-t border-industrial-black/10">
                {[
                  ["Composição", "Nylon"],
                  ["Tipo", "Termodegradável"],
                  ["Bitola", p.gauge],
                  ["Cor do fio", p.color],
                  ["Tubete", p.tube],
                  ["Apresentação", "Cone"],
                  ["Aplicação", p.application],
                  ["Unidade de venda", "Quilo"],
                ].map(([label, value]) => (
                  <div
                    key={label}
                    className="flex justify-between py-3 border-b border-industrial-black/10"
                  >
                    <dt className="text-industrial-black/60">{label}</dt>
                    <dd className="font-medium">{value}</dd>
                  </div>
                ))}
              </dl>

              <div className="flex flex-wrap gap-4 mt-8">
                <a
                  href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
                    `Olá, gostaria de cotação do ${p.name}.`,
                  )}`}
                  className="bg-industrial-black text-paper-white px-8 py-4 uppercase text-[11px] tracking-[0.2em] font-bold hover:bg-gold-primary hover:text-industrial-black transition"
                >
                  Cotar por WhatsApp
                </a>
                <a
                  href={`mailto:${EMAIL}?subject=${encodeURIComponent(`Cotação — ${p.name}`)}`}
                  className="border border-industrial-black px-8 py-4 uppercase text-[11px] tracking-[0.2em] font-bold hover:bg-industrial-black hover:text-paper-white transition"
                >
                  Cotar por e-mail
                </a>
              </div>
            </div>
          </article>
        ))}
      </main>

      <SiteFooter />
    </div>
  );
}

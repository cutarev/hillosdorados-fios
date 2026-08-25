import { createFileRoute } from "@tanstack/react-router";
import heroThread from "../assets/hero-thread.jpg";
import product01 from "../assets/product-01.jpg";
import product02 from "../assets/product-02.jpg";
import product03 from "../assets/product-03.jpg";

// Placeholders de contato — substitua pelos dados reais da empresa
const WHATSAPP_NUMBER = "5511999999999";
const EMAIL = "contato@hillosdorados.com.br";

const PRODUCTS = [
  {
    index: "01",
    name: "Fio 50mm",
    tube: "Tubete vermelho",
    spec: "Nylon termodegradável • branco",
    image: product01,
    alt: "Cone de fio de nylon branco 50mm em tubete vermelho",
  },
  {
    index: "02",
    name: "Fio 30mm",
    tube: "Tubete roxo",
    spec: "Nylon termodegradável • branco",
    image: product02,
    alt: "Cone de fio de nylon branco 30mm em tubete roxo",
  },
  {
    index: "03",
    name: "Fio 50mm Preto",
    tube: "Tubete vermelho",
    spec: "Nylon termodegradável • preto",
    image: product03,
    alt: "Cone de fio de nylon preto 50mm em tubete vermelho",
  },
];

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Hillosdorados | Fios de Nylon Termodegradáveis para Malharia" },
      {
        name: "description",
        content:
          "Fios de nylon termodegradáveis para malharias. Três bitolas em cone, vendidos por quilo. Cotação direta por WhatsApp ou e-mail.",
      },
      {
        property: "og:title",
        content: "Hillosdorados | Fios de Nylon Termodegradáveis para Malharia",
      },
      {
        property: "og:description",
        content:
          "Fios de nylon termodegradáveis para malharias. Três bitolas em cone, vendidos por quilo. Cotação direta por WhatsApp ou e-mail.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <div className="min-h-screen bg-paper-white text-industrial-black font-sans">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-industrial-black text-paper-white">
        <div className="max-w-7xl mx-auto flex justify-between items-center px-8 h-16">
          <div className="font-display text-lg font-bold tracking-[0.35em]">
            HILLOSDORADOS
          </div>
          <div className="hidden md:flex gap-10 text-[11px] uppercase tracking-[0.2em] font-semibold">
            <a href="#produtos" className="hover:text-gold-primary transition-colors">
              Produtos
            </a>
            <a href="#especificacoes" className="hover:text-gold-primary transition-colors">
              Especificações
            </a>
            <a href="#contato" className="hover:text-gold-primary transition-colors">
              Contato
            </a>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <header className="bg-industrial-black text-paper-white">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2">
          <div className="px-8 py-24 flex flex-col justify-center">
            <span className="text-gold-primary text-[11px] font-bold tracking-[0.25em] uppercase mb-6">
              Fios de nylon para malharia
            </span>
            <h1 className="font-display text-4xl md:text-6xl leading-[1.05] mb-8">
              Fio de nylon termodegradável, em cone, vendido por quilo.
            </h1>
            <p className="text-base text-paper-white/70 max-w-md leading-relaxed mb-10">
              Três bitolas disponíveis para malharias. Fornecimento direto,
              repasse por quilo, cotação por WhatsApp ou e-mail.
            </p>
            <div className="flex flex-wrap gap-4">
              <a
                href="#produtos"
                className="bg-gold-primary text-industrial-black px-8 py-4 uppercase text-[11px] tracking-[0.2em] font-bold hover:brightness-110 transition"
              >
                Ver os fios
              </a>
              <a
                href="#contato"
                className="border border-paper-white/30 px-8 py-4 uppercase text-[11px] tracking-[0.2em] font-bold hover:border-gold-primary hover:text-gold-primary transition"
              >
                Solicitar cotação
              </a>
            </div>
          </div>
          <div className="relative min-h-[420px]">
            <img
              src={heroThread}
              alt="Cones de fio de nylon em tubetes vermelhos e roxos em prateleira de malharia"
              width={1280}
              height={1600}
              className="absolute inset-0 w-full h-full object-cover"
            />
          </div>
        </div>
      </header>

      {/* Products */}
      <section id="produtos" className="py-24 bg-paper-white">
        <div className="max-w-7xl mx-auto px-8">
          <div className="mb-14 border-b border-industrial-black/10 pb-6 flex items-end justify-between flex-wrap gap-4">
            <h2 className="font-display text-3xl">Linha de produtos</h2>
            <p className="text-xs uppercase tracking-[0.2em] text-industrial-black/50">
              3 fios • venda por quilo
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-10">
            {PRODUCTS.map((p) => (
              <article
                key={p.index}
                className="border border-industrial-black/10 bg-paper-white group"
              >
                <img
                  src={p.image}
                  alt={p.alt}
                  width={1024}
                  height={1024}
                  loading="lazy"
                  className="w-full aspect-square object-cover bg-industrial-black"
                />
                <div className="p-8">
                  <span className="text-gold-primary text-[11px] font-bold tracking-[0.25em]">
                    {p.index}
                  </span>
                  <h3 className="font-display text-2xl mt-2 mb-4">{p.name}</h3>
                  <dl className="text-sm text-industrial-black/70 space-y-2 mb-8">
                    <div className="flex justify-between border-b border-industrial-black/10 pb-2">
                      <dt>Composição</dt>
                      <dd className="font-medium text-industrial-black">Nylon</dd>
                    </div>
                    <div className="flex justify-between border-b border-industrial-black/10 pb-2">
                      <dt>Tubete</dt>
                      <dd className="font-medium text-industrial-black">{p.tube}</dd>
                    </div>
                    <div className="flex justify-between border-b border-industrial-black/10 pb-2">
                      <dt>Apresentação</dt>
                      <dd className="font-medium text-industrial-black">Cone</dd>
                    </div>
                    <div className="flex justify-between">
                      <dt>Venda</dt>
                      <dd className="font-medium text-industrial-black">Por quilo</dd>
                    </div>
                  </dl>
                  <p className="text-xs uppercase tracking-[0.15em] text-industrial-black/50 mb-6">
                    {p.spec}
                  </p>
                  <a
                    href="#contato"
                    className="inline-block w-full text-center bg-industrial-black text-paper-white py-3 text-[11px] uppercase tracking-[0.2em] font-bold group-hover:bg-gold-primary group-hover:text-industrial-black transition"
                  >
                    Solicitar cotação
                  </a>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Specs */}
      <section id="especificacoes" className="py-24 bg-industrial-black text-paper-white">
        <div className="max-w-7xl mx-auto px-8 grid md:grid-cols-2 gap-16">
          <div>
            <span className="text-gold-primary text-[11px] font-bold tracking-[0.25em] uppercase">
              Especificações
            </span>
            <h2 className="font-display text-3xl mt-4 mb-6">
              Aplicação exclusiva em malharia
            </h2>
            <p className="text-paper-white/70 leading-relaxed">
              Os fios da Hillosdorados são fios de nylon termodegradáveis
              destinados exclusivamente a malharias. São fornecidos em cone e
              comercializados por quilo.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-px bg-white/10 border border-white/10">
            {[
              ["Material", "Nylon"],
              ["Tipo", "Termodegradável"],
              ["Bitolas", "30mm e 50mm"],
              ["Cores", "Branco e preto"],
              ["Embalagem", "Cone"],
              ["Unidade de venda", "Quilo"],
            ].map(([label, value]) => (
              <div key={label} className="bg-industrial-black p-6">
                <p className="text-[10px] uppercase tracking-[0.2em] text-paper-white/40">
                  {label}
                </p>
                <p className="font-display text-xl mt-2 text-gold-primary">{value}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact */}
      <section id="contato" className="py-24 bg-paper-white">
        <div className="max-w-3xl mx-auto px-8 text-center">
          <h2 className="font-display text-3xl mb-4">Cotação e pedidos</h2>
          <p className="text-industrial-black/60 mb-10">
            Informe a bitola, a cor e a quantidade em quilos. Respondemos por
            WhatsApp ou e-mail.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href={`https://wa.me/${WHATSAPP_NUMBER}`}
              className="bg-industrial-black text-paper-white px-10 py-4 font-bold uppercase text-[11px] tracking-[0.2em] hover:bg-gold-primary hover:text-industrial-black transition"
            >
              WhatsApp
            </a>
            <a
              href={`mailto:${EMAIL}`}
              className="border border-industrial-black px-10 py-4 font-bold uppercase text-[11px] tracking-[0.2em] hover:bg-industrial-black hover:text-paper-white transition"
            >
              E-mail
            </a>
          </div>
        </div>
      </section>

      <footer className="bg-industrial-black text-paper-white/50 py-10">
        <div className="max-w-7xl mx-auto px-8 flex flex-wrap justify-between gap-4 text-[10px] uppercase tracking-[0.25em]">
          <span className="text-gold-primary">Hillosdorados</span>
          <span>Fios de nylon termodegradáveis para malharia</span>
          <span>Brasil • 2026</span>
        </div>
      </footer>
    </div>
  );
}

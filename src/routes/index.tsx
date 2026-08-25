import { createFileRoute } from "@tanstack/react-router";
import heroThread from "../assets/hero-thread.jpg";
import product01 from "../assets/product-01.jpg";
import product02 from "../assets/product-02.jpg";
import product03 from "../assets/product-03.jpg";

// Placeholders de contato — substitua pelos dados reais da empresa
const WHATSAPP_NUMBER = "5511999999999";
const EMAIL = "contato@hillosdorados.com.br";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Hillosdorados | Fios de Nylon Termodegradáveis" },
      {
        name: "description",
        content:
          "Fios de nylon termodegradáveis Hillosdorados. Três linhas de fibras para indústria têxtil consciente. Solicite cotação por WhatsApp ou e-mail.",
      },
      {
        property: "og:title",
        content: "Hillosdorados | Fios de Nylon Termodegradáveis",
      },
      {
        property: "og:description",
        content:
          "Fios de nylon termodegradáveis Hillosdorados. Três linhas de fibras para indústria têxtil consciente. Solicite cotação por WhatsApp ou e-mail.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <div className="min-h-screen bg-paper-white text-industrial-black font-sans selection:bg-gold-primary/30">
      {/* Navigation */}
      <nav className="flex justify-between items-center px-8 py-6 border-b border-industrial-black/5">
        <div className="font-display text-2xl font-bold tracking-widest text-gold-primary italic">
          HILLOSDORADOS
        </div>
        <div className="hidden md:flex gap-8 text-xs uppercase tracking-widest font-semibold">
          <a
            href="#produtos"
            className="hover:text-gold-primary transition-colors"
          >
            Produtos
          </a>
          <a
            href="#sustentabilidade"
            className="hover:text-gold-primary transition-colors"
          >
            Tecnologia
          </a>
          <a
            href="#contato"
            className="hover:text-gold-primary transition-colors text-gold-primary"
          >
            Solicitar Catálogo
          </a>
        </div>
      </nav>

      {/* Hero Section */}
      <header className="relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-8 pt-20 pb-32 grid md:grid-cols-2 gap-16 items-center">
          <div>
            <span className="inline-block px-3 py-1 bg-gold-primary/10 text-gold-primary text-[10px] font-bold tracking-[0.2em] uppercase mb-6">
              Inovação Têxtil Brasileira
            </span>
            <h1 className="font-display text-5xl md:text-7xl leading-[1.1] mb-8">
              A Excelência em <span className="text-gold-primary">Fios</span>{" "}
              Termodegradáveis
            </h1>
            <p className="text-lg text-industrial-black/70 max-w-md leading-relaxed mb-10">
              Fundindo a durabilidade do nylon com o compromisso ambiental. A
              Hillosdorados fornece a base para a indústria têxtil consciente.
            </p>
            <div className="flex flex-wrap gap-4">
              <a
                href="#contato"
                className="bg-industrial-black text-white px-8 py-4 hover:bg-gold-primary transition-all duration-300 uppercase text-xs tracking-widest font-bold"
              >
                Falar com Especialista
              </a>
            </div>
          </div>
          <div className="relative">
            <img
              src={heroThread}
              alt="Carretel premium de fio de nylon dourado da Hillosdorados"
              width={800}
              height={1008}
              className="w-full aspect-[4/5] object-cover shadow-2xl shadow-gold-primary/10"
            />
            <div className="absolute -bottom-6 -left-6 bg-gold-primary p-8 hidden lg:block">
              <p className="text-white font-display text-2xl">100%</p>
              <p className="text-white/80 text-[10px] uppercase tracking-tighter">
                Termodegradável
              </p>
            </div>
          </div>
        </div>
      </header>

      {/* Products Section */}
      <section id="produtos" className="bg-industrial-black py-32 text-paper-white">
        <div className="max-w-7xl mx-auto px-8">
          <div className="mb-20 text-center">
            <h2 className="font-display text-4xl mb-4">Nossa Coleção de Fibras</h2>
            <div className="w-24 h-px bg-gold-primary mx-auto"></div>
          </div>

          <div className="grid md:grid-cols-3 gap-px bg-white/10 border border-white/10">
            {/* Product 1 */}
            <div className="bg-industrial-black p-12 hover:bg-white/5 transition-colors group">
              <span className="text-gold-primary font-display text-lg mb-6 block">
                01. Fio 50mm
              </span>
              <h3 className="text-2xl mb-4">Versatilidade Industrial</h3>
              <p className="text-sm text-paper-white/60 leading-relaxed mb-8">
                Fio padrão de 50mm, ideal para costuras de alta resistência e
                aplicações industriais gerais. Termodegradável e consistente.
              </p>
              <img
                src={product01}
                alt="Close técnico da textura do fio de nylon 50mm branco"
                width={816}
                height={816}
                loading="lazy"
                className="w-full aspect-square object-cover mb-8"
              />
              <a
                href="#contato"
                className="inline-flex items-center text-xs tracking-widest uppercase font-bold group-hover:text-gold-primary"
              >
                Solicitar Orçamento →
              </a>
            </div>

            {/* Product 2 */}
            <div className="bg-industrial-black p-12 hover:bg-white/5 transition-colors group border-x border-white/10">
              <span className="text-gold-primary font-display text-lg mb-6 block">
                02. Fio 30mm
              </span>
              <h3 className="text-2xl mb-4">Precisão Delicada</h3>
              <p className="text-sm text-paper-white/60 leading-relaxed mb-8">
                Fio fino de 30mm, perfeito para trabalhos delicados,
                acabamentos de precisão e aplicações que exigem leveza.
              </p>
              <img
                src={product02}
                alt="Textura suave do fio de nylon 30mm em tons dourados"
                width={816}
                height={816}
                loading="lazy"
                className="w-full aspect-square object-cover mb-8"
              />
              <a
                href="#contato"
                className="inline-flex items-center text-xs tracking-widest uppercase font-bold group-hover:text-gold-primary"
              >
                Solicitar Orçamento →
              </a>
            </div>

            {/* Product 3 */}
            <div className="bg-industrial-black p-12 hover:bg-white/5 transition-colors group">
              <span className="text-gold-primary font-display text-lg mb-6 block">
                03. Fio 50mm Preto
              </span>
              <h3 className="text-2xl mb-4">Performance Técnica</h3>
              <p className="text-sm text-paper-white/60 leading-relaxed mb-8">
                Fio de 50mm na cor preta, desenvolvido para aplicações técnicas,
                estéticas escuras e acabamentos que exigem discrição.
              </p>
              <img
                src={product03}
                alt="Fio de nylon 50mm preto trançado com detalhes dourados"
                width={816}
                height={816}
                loading="lazy"
                className="w-full aspect-square object-cover mb-8"
              />
              <a
                href="#contato"
                className="inline-flex items-center text-xs tracking-widest uppercase font-bold group-hover:text-gold-primary"
              >
                Solicitar Orçamento →
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Technology / Trust Section */}
      <section id="sustentabilidade" className="py-32 bg-paper-white">
        <div className="max-w-7xl mx-auto px-8 grid md:grid-cols-2 gap-16 items-center">
          <div>
            <span className="text-gold-primary text-xs font-bold tracking-[0.2em] uppercase mb-4 block">
              Tecnologia
            </span>
            <h2 className="font-display text-4xl mb-6">
              Fios que Suportam o Futuro
            </h2>
            <p className="text-lg text-industrial-black/70 leading-relaxed mb-8">
              Nossos fios de nylon termodegradável combinam resistência mecânica
              com degradação controlada. Eles mantêm a performance esperada
              durante o uso e, ao final do ciclo, se desintegram de forma mais
              consciente — reduzindo o impacto ambiental da cadeia têxtil.
            </p>
            <div className="grid grid-cols-3 gap-8">
              <div>
                <p className="font-display text-3xl text-gold-primary">3</p>
                <p className="text-[10px] uppercase tracking-widest text-industrial-black/50 mt-1">
                  Linhas de fio
                </p>
              </div>
              <div>
                <p className="font-display text-3xl text-gold-primary">100%</p>
                <p className="text-[10px] uppercase tracking-widest text-industrial-black/50 mt-1">
                  Termodegradável
                </p>
              </div>
              <div>
                <p className="font-display text-3xl text-gold-primary">B2B</p>
                <p className="text-[10px] uppercase tracking-widest text-industrial-black/50 mt-1">
                  Atendimento
                </p>
              </div>
            </div>
          </div>
          <div className="bg-gold-light/30 p-12 border border-industrial-black/5">
            <blockquote className="font-display text-2xl leading-relaxed text-industrial-black">
              "A durabilidade no uso e a responsabilidade no descarte podem
              caminhar juntas."
            </blockquote>
            <p className="mt-6 text-sm text-industrial-black/60">
              — Hillosdorados
            </p>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contato" className="py-32 bg-paper-white border-t border-industrial-black/5">
        <div className="max-w-4xl mx-auto px-8 text-center">
          <h2 className="font-display text-4xl mb-6">Inicie seu Projeto</h2>
          <p className="text-industrial-black/60 mb-12 max-w-md mx-auto">
            Estamos prontos para atender sua demanda industrial ou de pequena
            escala. Entre em contato para catálogos, amostras e cotações.
          </p>

          <div className="flex flex-col md:flex-row gap-6 justify-center">
            <a
              href={`https://wa.me/${WHATSAPP_NUMBER}`}
              className="flex items-center justify-center gap-3 bg-[#25D366] text-white px-10 py-5 font-bold uppercase text-xs tracking-widest hover:brightness-110 transition-all shadow-xl shadow-green-500/20"
            >
              WhatsApp Direto
            </a>
            <a
              href={`mailto:${EMAIL}`}
              className="flex items-center justify-center gap-3 border-2 border-industrial-black text-industrial-black px-10 py-5 font-bold uppercase text-xs tracking-widest hover:bg-industrial-black hover:text-white transition-all"
            >
              Enviar E-mail
            </a>
          </div>

          <p className="mt-8 text-xs text-industrial-black/40">
            *Substitua os placeholders de WhatsApp e e-mail no topo do arquivo{" "}
            <code className="text-gold-primary">src/routes/index.tsx</code>.
          </p>

          <div className="mt-20 pt-10 border-t border-industrial-black/5">
            <p className="text-[10px] uppercase tracking-[0.3em] text-industrial-black/40">
              Hillosdorados • Brasil • 2026
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}

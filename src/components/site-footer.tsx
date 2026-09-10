import { EMAIL, EMAIL_LINK, TAGLINE, WHATSAPP_LINK, formatWhatsApp } from "../data/site";

export function SiteFooter() {
  // Calculado na renderizacao para o rodape nao envelhecer sozinho na virada do ano.
  const year = new Date().getFullYear();

  return (
    <footer className="bg-industrial-black text-paper-white/50 py-12">
      <div className="max-w-7xl mx-auto px-8 grid gap-8 md:grid-cols-3">
        <div>
          <p className="text-gold-primary text-[10px] uppercase tracking-[0.25em]">Hillosdorados</p>
          <p className="mt-3 text-sm leading-relaxed text-paper-white/60">{TAGLINE}</p>
        </div>

        <div>
          <p className="text-[10px] uppercase tracking-[0.25em] text-paper-white/40">Contato</p>
          <ul className="mt-3 space-y-2 text-sm">
            <li>
              <a
                href={WHATSAPP_LINK}
                className="text-paper-white/80 hover:text-gold-primary transition-colors"
              >
                {formatWhatsApp()}
              </a>
            </li>
            <li>
              <a
                href={EMAIL_LINK}
                className="text-paper-white/80 hover:text-gold-primary transition-colors break-words"
              >
                {EMAIL}
              </a>
            </li>
          </ul>
        </div>

        <div className="md:text-right">
          <p className="text-[10px] uppercase tracking-[0.25em] text-paper-white/40">
            Brasil • {year}
          </p>
        </div>
      </div>
    </footer>
  );
}

import { Link } from "@tanstack/react-router";

import { BRAND_NAME } from "../data/site";

// Marca do topo: cone de fio + nome. Sempre leva de volta para a home.
export function BrandMark() {
  return (
    <Link to="/" className="flex items-center gap-3">
      <img
        src="/logo.svg"
        alt=""
        aria-hidden="true"
        width={32}
        height={32}
        className="h-8 w-8 shrink-0"
      />
      <span className="font-display text-lg font-bold tracking-[0.35em]">
        {BRAND_NAME.toUpperCase()}
      </span>
    </Link>
  );
}

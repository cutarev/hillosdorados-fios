import product01 from "../assets/product-01.jpg";
import product02 from "../assets/product-02.jpg";
import product03 from "../assets/product-03.jpg";

export type Product = {
  index: string;
  slug: string;
  name: string;
  tube: string;
  color: string;
  gauge: string;
  spec: string;
  image: string;
  alt: string;
  detail: string;
  application: string;
};

export const PRODUCTS: Product[] = [
  {
    index: "01",
    slug: "fio-50mm",
    name: "Nylon D122 0.10mm",
    tube: "Tubete vermelho",
    color: "Natural",
    gauge: "D122 0.10mm",
    spec: "Nylon termo-solúvel • natural",
    image: product01,
    alt: "Cone de nylon monofilamento natural D122 0.10mm em tubete vermelho",
    detail:
      "Nylon monofilamento termo-solúvel D122 0.10mm, na cor natural, em cone com tubete vermelho. Fornecido por quilo.",
    application: "Malharia",
  },
  {
    index: "02",
    slug: "fio-30mm",
    name: "Nylon D90 0.09mm",
    tube: "Tubete roxo",
    color: "Natural",
    gauge: "D90 0.09mm",
    spec: "Nylon termo-solúvel • natural",
    image: product02,
    alt: "Cone de nylon monofilamento natural D90 0.09mm em tubete roxo",
    detail:
      "Nylon monofilamento termo-solúvel D90 0.09mm, na cor natural, em cone com tubete roxo. Fornecido por quilo.",
    application: "Malharia",
  },
  {
    index: "03",
    slug: "fio-50mm-preto",
    name: "Nylon D122 0.10mm",
    tube: "Tubete vermelho",
    color: "Preto",
    gauge: "D122 0.10mm",
    spec: "Nylon termo-solúvel • preto",
    image: product03,
    alt: "Cone de nylon monofilamento preto D122 0.10mm em tubete vermelho",
    detail:
      "Nylon monofilamento termo-solúvel D122 0.10mm, na cor preta, em cone com tubete vermelho. Fornecido por quilo.",
    application: "Malharia",
  },
];

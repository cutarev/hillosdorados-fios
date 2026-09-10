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
    name: "Fio 50mm",
    tube: "Tubete vermelho",
    color: "Branco",
    gauge: "50mm",
    spec: "Nylon termodegradável • branco",
    image: product01,
    alt: "Cone de fio de nylon branco 50mm em tubete vermelho",
    detail:
      "Fio de nylon termodegradável na bitola 50mm, em cone com tubete vermelho. Fornecido por quilo.",
    application: "Malharia",
  },
  {
    index: "02",
    slug: "fio-30mm",
    name: "Fio 30mm",
    tube: "Tubete roxo",
    color: "Branco",
    gauge: "30mm",
    spec: "Nylon termodegradável • branco",
    image: product02,
    alt: "Cone de fio de nylon branco 30mm em tubete roxo",
    detail:
      "Fio de nylon termodegradável na bitola 30mm, em cone com tubete roxo. Fornecido por quilo.",
    application: "Malharia",
  },
  {
    index: "03",
    slug: "fio-50mm-preto",
    name: "Fio 50mm Preto",
    tube: "Tubete vermelho",
    color: "Preto",
    gauge: "50mm",
    spec: "Nylon termodegradável • preto",
    image: product03,
    alt: "Cone de fio de nylon preto 50mm em tubete vermelho",
    detail:
      "Fio de nylon termodegradável na bitola 50mm, na cor preta, em cone com tubete vermelho. Fornecido por quilo.",
    application: "Malharia",
  },
];

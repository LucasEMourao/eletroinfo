import type { BusinessProfile } from "@/domain";

export const business: BusinessProfile = {
  name: "Eletroinfo Regis",
  tagline: "Tecnologia com confiança",
  description:
    "Assistência técnica especializada em conserto e manutenção de equipamentos eletrônicos. Mais de 15 anos de experiência atendendo as principais marcas do mercado com garantia, agilidade e transparência.",
  phone: {
    ddd: "38",
    number: "3221-7875",
    raw: "553832217875",
  },
  whatsappPhone: {
    ddd: "38",
    number: "98852-5941",
    raw: "5538988525941",
  },
  email: "contato@eletroinforegis.com.br",
  address: {
    street: "Rua Corrêa Machado",
    number: "969b",
    complement: "",
    neighborhood: "Centro",
    city: "Montes Claros",
    state: "MG",
    zipCode: "39400-058",
  },
  openingHours: {
    weekdays: "Seg a Sex: 8h às 18h",
    saturday: "Sáb: 8h às 13h",
    sunday: "Dom: Fechado",
  },
  socialMedia: {
    instagram: "https://instagram.com/eletroinforegis",
    facebook: "https://facebook.com/eletroinforegis",
  },
  foundedYear: 2009,
  siteUrl: "https://eletroinforegis.com.br",
};

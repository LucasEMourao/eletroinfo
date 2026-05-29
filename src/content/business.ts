import type { BusinessProfile } from "@/domain";

export const business: BusinessProfile = {
  name: "Eletroinfo Regis",
  tagline: "Tecnologia com confiança",
  description:
    "Assistência técnica especializada em conserto e manutenção de equipamentos eletrônicos. Mais de 15 anos de experiência atendendo as principais marcas do mercado com garantia, agilidade e transparência.",
  phone: {
    ddd: "11",
    number: "3456-7890",
    raw: "551134567890",
  },
  whatsappPhone: {
    ddd: "11",
    number: "99876-5432",
    raw: "5511998765432",
  },
  email: "contato@eletroinforegis.com.br",
  address: {
    street: "Rua dos Eletrônicos",
    number: "1234",
    complement: "Loja 2",
    neighborhood: "Centro",
    city: "São Paulo",
    state: "SP",
    zipCode: "01234-567",
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

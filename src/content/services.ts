import type { Service } from "@/domain";

export const services: Service[] = [
  {
    id: "srv-01",
    title: "Conserto de TV",
    slug: "conserto-de-tv",
    shortDescription:
      "Reparo de TVs LED, LCD, OLED e Smart TV de todas as marcas.",
    longDescription:
      "Realizamos o conserto completo de televisores de todas as tecnologias: LED, LCD, OLED, QLED e Smart TVs. Diagnóstico preciso com equipamentos profissionais, troca de placas, substituição de telas, reparo de backlight e atualização de software. Trabalhamos com as principais marcas do mercado e oferecemos garantia em todos os serviços.",
    icon: "📺",
    category: "conserto",
  },
  {
    id: "srv-03",
    title: "Conserto de Notebook",
    slug: "conserto-de-notebook",
    shortDescription:
      "Reparo de notebooks, ultrabooks e Macbooks com agilidade.",
    longDescription:
      "Manutenção completa de notebooks, ultrabooks e Macbooks. Troca de tela, teclado, bateria, HD/SSD, memória RAM, limpeza interna, troca de pasta térmica e reparo de placa-mãe. Diagnóstico rápido e orçamento sem compromisso. Atendemos Dell, HP, Lenovo, Acer, Apple e outras marcas.",
    icon: "💻",
    category: "conserto",
  },
  {
    id: "srv-04",
    title: "Instalação de Antena",
    slug: "instalacao-de-antena",
    shortDescription:
      "Instalação e configuração de antenas digitais e parabólicas.",
    longDescription:
      "Serviço de instalação profissional de antenas digitais (UHF), parabólicas e antenas para TV a cabo. Inclui posicionamento ideal, fixação segura, passagem de cabos e configuração completa dos canais. Também realizamos manutenção e reposicionamento de antenas existentes para melhorar o sinal.",
    icon: "📡",
    category: "instalacao",
  },
  {
    id: "srv-06",
    title: "Assistência em Áudio e Som",
    slug: "assistencia-em-audio-e-som",
    shortDescription:
      "Reparo de caixas de som, soundbars, receivers e equipamentos de áudio.",
    longDescription:
      "Serviço especializado em equipamentos de áudio: caixas de som Bluetooth, soundbars, receivers, amplificadores, home theaters e equipamentos de som profissional. Diagnóstico de problemas de áudio, troca de alto-falantes, reparo de conectores e placas. Restauramos a qualidade sonora dos seus equipamentos.",
    icon: "🔊",
    category: "assistencia",
  },
  {
    id: "srv-07",
    title: "Conserto de Micro-ondas",
    slug: "conserto-de-micro-ondas",
    shortDescription:
      "Reparo de micro-ondas de todas as marcas e modelos.",
    longDescription:
      "Manutenção e reparo de fornos micro-ondas residenciais e industriais. Troca de magnetron, reparo de painel e teclado, substituição de motor do prato giratório, fusíveis e componentes elétricos. Serviço rápido com peças de qualidade e garantia. Atendemos todas as marcas.",
    icon: "🍳",
    category: "conserto",
  },
];

import type { Metadata } from "next";
import { Container } from "@/presentation/components/ui/Container";
import { Section } from "@/presentation/components/ui/Section";
import { Card } from "@/presentation/components/ui/Card";
import { Button } from "@/presentation/components/ui/Button";
import { Breadcrumbs } from "@/presentation/components/seo/Breadcrumbs";
import { business } from "@/content";
import { generateGenericWhatsAppLink } from "@/application";
import { SITE_URL } from "@/shared";

export const metadata: Metadata = {
  title: "Sobre Nós",
  description: `Conheça a história da ${business.name}. Mais de ${new Date().getFullYear() - business.foundedYear} anos de experiência em assistência técnica eletrônica em ${business.address.city}.`,
  openGraph: {
    title: `Sobre Nós | ${business.name}`,
    description: `Conheça a história e os diferenciais da ${business.name}. Assistência técnica de confiança.`,
    url: `${SITE_URL}/sobre`,
    type: "website",
  },
};

const differentials = [
  {
    icon: "🏆",
    title: "Experiência",
    description: `Mais de ${new Date().getFullYear() - business.foundedYear} anos atendendo clientes com excelência e profissionalismo.`,
  },
  {
    icon: "✅",
    title: "Garantia",
    description:
      "Todos os serviços possuem garantia. Trabalhamos com peças de qualidade e procedimentos certificados.",
  },
  {
    icon: "⚡",
    title: "Agilidade",
    description:
      "Diagnóstico rápido e orçamento sem compromisso. Priorizamos a velocidade sem comprometer a qualidade.",
  },
  {
    icon: "🤝",
    title: "Transparência",
    description:
      "Orçamento detalhado antes de qualquer serviço. Você sabe exatamente o que será feito e quanto vai custar.",
  },
  {
    icon: "🔧",
    title: "Equipamentos Profissionais",
    description:
      "Utilizamos ferramentas e equipamentos de diagnóstico de última geração para garantir precisão.",
  },
  {
    icon: "📱",
    title: "Multimarcas",
    description:
      "Atendemos todas as principais marcas do mercado: Samsung, LG, Sony, Apple, Dell, HP e muitas outras.",
  },
];

export default function SobrePage() {
  const whatsappLink = generateGenericWhatsAppLink(
    business.whatsappPhone.raw
  );
  const yearsOfExperience =
    new Date().getFullYear() - business.foundedYear;

  return (
    <>
      <Section background="white">
        <Container>
          <Breadcrumbs
            items={[
              { label: "Início", href: "/" },
              { label: "Sobre Nós" },
            ]}
          />

          <div className="mx-auto max-w-3xl text-center">
            <h1 className="text-3xl font-bold text-primary-800 sm:text-4xl lg:text-5xl">
              Sobre a {business.name}
            </h1>
            <p className="mt-4 text-lg text-muted sm:text-xl">
              {business.tagline}
            </p>
          </div>
        </Container>
      </Section>

      <Section background="alt">
        <Container>
          <div className="mx-auto max-w-3xl">
            <h2 className="text-2xl font-bold text-primary-800 sm:text-3xl">
              Nossa História
            </h2>
            <div className="mt-6 space-y-4 text-muted leading-relaxed sm:text-lg">
              <p>
                Fundada em {business.foundedYear}, a{" "}
                <strong className="text-foreground">{business.name}</strong> nasceu
                com a missão de oferecer serviços de assistência técnica eletrônica
                de qualidade na região de {business.address.city}.
              </p>
              <p>
                Com mais de{" "}
                <strong className="text-foreground">
                  {yearsOfExperience} anos de experiência
                </strong>
                , construímos uma reputação sólida baseada em competência técnica,
                atendimento humanizado e preços justos.
              </p>
              <p>
                Hoje somos referência em conserto e manutenção de equipamentos
                eletrônicos, atendendo desde TVs e celulares até notebooks e
                eletrodomésticos. Nossa equipe é constantemente atualizada com as
                mais recentes tecnologias do mercado.
              </p>
            </div>
          </div>
        </Container>
      </Section>

      <Section background="white">
        <Container>
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-2xl font-bold text-primary-800 sm:text-3xl">
              Missão e Valores
            </h2>
            <p className="mt-3 text-muted sm:text-lg">
              Nossa missão é democratizar o acesso a reparos eletrônicos de
              qualidade, prolongando a vida útil dos seus equipamentos com
              responsabilidade e sustentabilidade.
            </p>
          </div>
        </Container>
      </Section>

      <Section background="alt">
        <Container>
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-2xl font-bold text-primary-800 sm:text-3xl">
              Nossos Diferenciais
            </h2>
            <p className="mt-3 text-muted sm:text-lg">
              O que nos torna a melhor escolha para cuidar dos seus eletrônicos
            </p>
          </div>

          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {differentials.map((diff) => (
              <Card key={diff.title}>
                <div className="mb-3 text-3xl">{diff.icon}</div>
                <h3 className="text-lg font-semibold text-primary-800">
                  {diff.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">
                  {diff.description}
                </p>
              </Card>
            ))}
          </div>
        </Container>
      </Section>

      <Section background="dark">
        <Container>
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-2xl font-bold text-white sm:text-3xl">
              Precisa de assistência técnica?
            </h2>
            <p className="mt-3 text-primary-100 sm:text-lg">
              Entre em contato pelo WhatsApp e receba um orçamento sem
              compromisso. Estamos prontos para ajudar!
            </p>
            <div className="mt-8 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
              <Button
                variant="whatsapp"
                size="lg"
                href={whatsappLink.url}
                target="_blank"
                rel="noopener noreferrer"
              >
                💬 Falar no WhatsApp
              </Button>
              <Button variant="secondary" size="lg" href="/#contato" className="border-white text-white hover:bg-white/10">
                Enviar Mensagem
              </Button>
            </div>
          </div>
        </Container>
      </Section>
    </>
  );
}

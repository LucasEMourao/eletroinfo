import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/presentation/components/ui/Container";
import { Section } from "@/presentation/components/ui/Section";
import { Card } from "@/presentation/components/ui/Card";
import { Badge } from "@/presentation/components/ui/Badge";
import { Button } from "@/presentation/components/ui/Button";
import { Breadcrumbs } from "@/presentation/components/seo/Breadcrumbs";
import { services, business } from "@/content";
import { generateGenericWhatsAppLink } from "@/application";
import { SITE_URL } from "@/shared";

export const metadata: Metadata = {
  title: "Serviços",
  description: `Conheça todos os serviços de assistência técnica da ${business.name}: conserto de TV, celular, notebook, instalação de antena e muito mais.`,
  openGraph: {
    title: `Nossos Serviços | ${business.name}`,
    description: `Serviços de assistência técnica eletrônica: conserto, manutenção e instalação. ${business.name} — qualidade e garantia.`,
    url: `${SITE_URL}/servicos`,
    type: "website",
  },
};

export default function ServicosPage() {
  const whatsappLink = generateGenericWhatsAppLink(
    business.whatsappPhone.raw
  );

  return (
    <>
      <Section background="white">
        <Container>
          <Breadcrumbs
            items={[
              { label: "Início", href: "/" },
              { label: "Serviços" },
            ]}
          />

          <div className="mx-auto max-w-3xl text-center">
            <h1 className="text-3xl font-bold text-primary-800 sm:text-4xl lg:text-5xl">
              Nossos Serviços
            </h1>
            <p className="mt-4 text-lg text-muted sm:text-xl">
              Soluções completas em assistência técnica eletrônica para todas as
              suas necessidades
            </p>
          </div>
        </Container>
      </Section>

      <Section background="alt">
        <Container>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((service) => (
              <Link
                key={service.id}
                href={`/servicos/${service.slug}`}
                className="group block"
              >
                <Card className="h-full transition-all duration-300 group-hover:-translate-y-1">
                  <div className="mb-3 text-3xl">{service.icon}</div>
                  <Badge>{service.category}</Badge>
                  <h2 className="mt-3 text-lg font-semibold text-primary-800 group-hover:text-accent-600 transition-colors">
                    {service.title}
                  </h2>
                  <p className="mt-2 text-sm leading-relaxed text-muted">
                    {service.shortDescription}
                  </p>
                  <span className="mt-4 inline-flex items-center text-sm font-medium text-accent-600 group-hover:text-accent-500 transition-colors">
                    Saiba mais
                    <svg
                      className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={2}
                      stroke="currentColor"
                      aria-hidden="true"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
                      />
                    </svg>
                  </span>
                </Card>
              </Link>
            ))}
          </div>
        </Container>
      </Section>

      <Section background="dark">
        <Container>
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-2xl font-bold text-white sm:text-3xl">
              Não encontrou o que procura?
            </h2>
            <p className="mt-3 text-primary-100 sm:text-lg">
              Entre em contato conosco! Atendemos diversos tipos de
              equipamentos eletrônicos.
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
              <Button variant="secondary" size="lg" href="/contato" className="border-white text-white hover:bg-white/10">
                Enviar Mensagem
              </Button>
            </div>
          </div>
        </Container>
      </Section>
    </>
  );
}

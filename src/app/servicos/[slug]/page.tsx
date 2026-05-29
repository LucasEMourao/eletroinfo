import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Container } from "@/presentation/components/ui/Container";
import { Section } from "@/presentation/components/ui/Section";
import { Card } from "@/presentation/components/ui/Card";
import { Badge } from "@/presentation/components/ui/Badge";
import { Button } from "@/presentation/components/ui/Button";
import { Breadcrumbs } from "@/presentation/components/seo/Breadcrumbs";
import { services, business } from "@/content";
import { generateServiceWhatsAppLink } from "@/application";
import { SITE_URL } from "@/shared";

type Props = {
  params: Promise<{ slug: string }>;
};

function findService(slug: string) {
  return services.find((s) => s.slug === slug);
}

function getRelatedServices(currentSlug: string, category: string) {
  return services
    .filter((s) => s.slug !== currentSlug && s.category === category)
    .slice(0, 3);
}

export async function generateStaticParams() {
  return services.map((service) => ({
    slug: service.slug,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const service = findService(slug);

  if (!service) {
    return {
      title: "Serviço não encontrado",
    };
  }

  return {
    title: service.title,
    description: service.shortDescription,
    openGraph: {
      title: `${service.title} | ${business.name}`,
      description: service.shortDescription,
      url: `${SITE_URL}/servicos/${service.slug}`,
      type: "website",
    },
  };
}

export default async function ServicoDetailPage({ params }: Props) {
  const { slug } = await params;
  const service = findService(slug);

  if (!service) {
    notFound();
  }

  const whatsappLink = generateServiceWhatsAppLink(
    business.whatsappPhone.raw,
    service.title
  );
  const relatedServices = getRelatedServices(service.slug, service.category);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: service.title,
    description: service.longDescription,
    provider: {
      "@type": "LocalBusiness",
      name: business.name,
      url: SITE_URL,
    },
    url: `${SITE_URL}/servicos/${service.slug}`,
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <Section background="white">
        <Container>
          <Breadcrumbs
            items={[
              { label: "Início", href: "/" },
              { label: "Serviços", href: "/servicos" },
              { label: service.title },
            ]}
          />

          <div className="mx-auto max-w-3xl">
            <div className="mb-4 text-5xl">{service.icon}</div>
            <Badge>{service.category}</Badge>
            <h1 className="mt-3 text-3xl font-bold text-primary-800 sm:text-4xl lg:text-5xl">
              {service.title}
            </h1>
            <p className="mt-4 text-lg text-muted sm:text-xl">
              {service.shortDescription}
            </p>
          </div>
        </Container>
      </Section>

      <Section background="alt">
        <Container>
          <div className="mx-auto max-w-3xl">
            <h2 className="text-2xl font-bold text-primary-800 sm:text-3xl">
              Sobre este serviço
            </h2>
            <p className="mt-4 text-muted leading-relaxed sm:text-lg">
              {service.longDescription}
            </p>
          </div>
        </Container>
      </Section>

      {/* WhatsApp CTA */}
      <Section background="dark">
        <Container>
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-2xl font-bold text-white sm:text-3xl">
              Precisa de {service.title}?
            </h2>
            <p className="mt-3 text-primary-100 sm:text-lg">
              Solicite um orçamento sem compromisso pelo WhatsApp. Resposta
              rápida e atendimento personalizado.
            </p>
            <div className="mt-8 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
              <Button
                variant="whatsapp"
                size="lg"
                href={whatsappLink.url}
                target="_blank"
                rel="noopener noreferrer"
              >
                💬 Solicitar Orçamento
              </Button>
              <Button variant="secondary" size="lg" href="/#contato" className="border-white text-white hover:bg-white/10">
                Enviar Mensagem
              </Button>
            </div>
          </div>
        </Container>
      </Section>

      {/* Related Services */}
      {relatedServices.length > 0 && (
        <Section background="white">
          <Container>
            <div className="mx-auto max-w-2xl text-center">
              <h2 className="text-2xl font-bold text-primary-800 sm:text-3xl">
                Serviços Relacionados
              </h2>
              <p className="mt-3 text-muted sm:text-lg">
                Outros serviços que podem interessar
              </p>
            </div>

            <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {relatedServices.map((related) => (
                <Link
                  key={related.id}
                  href={`/servicos/${related.slug}`}
                  className="group block"
                >
                  <Card className="h-full transition-all duration-300 group-hover:-translate-y-1">
                    <div className="mb-3 text-3xl">{related.icon}</div>
                    <Badge>{related.category}</Badge>
                    <h3 className="mt-3 text-lg font-semibold text-primary-800 group-hover:text-accent-600 transition-colors">
                      {related.title}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-muted">
                      {related.shortDescription}
                    </p>
                  </Card>
                </Link>
              ))}
            </div>
          </Container>
        </Section>
      )}
    </>
  );
}

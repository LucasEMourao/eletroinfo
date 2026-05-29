import Link from "next/link";
import { Container } from "@/presentation/components/ui/Container";
import { Section } from "@/presentation/components/ui/Section";
import { Card } from "@/presentation/components/ui/Card";
import { Badge } from "@/presentation/components/ui/Badge";
import { services } from "@/content";

export function ServicesList() {
  return (
    <Section background="white" id="servicos">
      <Container>
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-2xl font-bold text-primary-800 sm:text-3xl lg:text-4xl">
            Nossos Serviços
          </h2>
          <p className="mt-3 text-muted sm:text-lg">
            Soluções completas para seus equipamentos eletrônicos
          </p>
        </div>

        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service) => (
            <Link
              key={service.id}
              href={`/servicos/${service.slug}`}
              className="group block"
            >
              <Card className="h-full transition-all duration-300 group-hover:-translate-y-1">
                <div className="mb-3 text-3xl">{service.icon}</div>
                <Badge>{service.category}</Badge>
                <h3 className="mt-3 text-lg font-semibold text-primary-800 group-hover:text-accent-600 transition-colors">
                  {service.title}
                </h3>
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
  );
}

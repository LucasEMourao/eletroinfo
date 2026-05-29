import type { Metadata } from "next";
import { Container } from "@/presentation/components/ui/Container";
import { Section } from "@/presentation/components/ui/Section";
import { Card } from "@/presentation/components/ui/Card";
import { Button } from "@/presentation/components/ui/Button";
import { Breadcrumbs } from "@/presentation/components/seo/Breadcrumbs";
import { ContactForm } from "@/presentation/components/forms/ContactForm";
import { business } from "@/content";
import { generateGenericWhatsAppLink } from "@/application";
import { formatPhoneDisplay, SITE_URL } from "@/shared";

export const metadata: Metadata = {
  title: "Contato",
  description: `Entre em contato com a ${business.name}. Telefone, WhatsApp, e-mail e endereço. Orçamento sem compromisso para assistência técnica eletrônica.`,
  openGraph: {
    title: `Contato | ${business.name}`,
    description: `Fale conosco: telefone, WhatsApp, e-mail ou formulário de contato. ${business.name} — assistência técnica de confiança.`,
    url: `${SITE_URL}/contato`,
    type: "website",
  },
};

export default function ContatoPage() {
  const whatsappLink = generateGenericWhatsAppLink(
    business.whatsappPhone.raw
  );
  const fullAddress = `${business.address.street}, ${business.address.number}${business.address.complement ? ` - ${business.address.complement}` : ""}, ${business.address.neighborhood}, ${business.address.city} - ${business.address.state}, ${business.address.zipCode}`;

  return (
    <>
      <Section background="white">
        <Container>
          <Breadcrumbs
            items={[
              { label: "Início", href: "/" },
              { label: "Contato" },
            ]}
          />

          <div className="mx-auto max-w-3xl text-center">
            <h1 className="text-3xl font-bold text-primary-800 sm:text-4xl lg:text-5xl">
              Entre em Contato
            </h1>
            <p className="mt-4 text-lg text-muted sm:text-xl">
              Estamos prontos para atender você. Escolha a melhor forma de
              contato.
            </p>
          </div>
        </Container>
      </Section>

      <Section background="alt">
        <Container>
          <div className="grid gap-8 lg:grid-cols-2">
            {/* Contact Form */}
            <div>
              <h2 className="text-2xl font-bold text-primary-800 sm:text-3xl">
                Envie sua Mensagem
              </h2>
              <p className="mt-2 text-muted">
                Preencha o formulário abaixo e entraremos em contato o mais
                rápido possível.
              </p>
              <div className="mt-6">
                <ContactForm />
              </div>
            </div>

            {/* Contact Info & Map */}
            <div className="space-y-6">
              {/* WhatsApp CTA */}
              <Card className="bg-whatsapp/5 border-whatsapp/20">
                <h3 className="text-lg font-semibold text-primary-800">
                  💬 WhatsApp
                </h3>
                <p className="mt-1 text-sm text-muted">
                  Atendimento rápido pelo WhatsApp
                </p>
                <div className="mt-3">
                  <Button
                    variant="whatsapp"
                    size="md"
                    href={whatsappLink.url}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Falar no WhatsApp
                  </Button>
                </div>
              </Card>

              {/* Phone */}
              <Card>
                <h3 className="text-lg font-semibold text-primary-800">
                  📞 Telefone
                </h3>
                <a
                  href={`tel:+${business.phone.raw}`}
                  className="mt-1 block text-accent-600 font-medium hover:text-accent-500 transition-colors"
                >
                  {formatPhoneDisplay(business.phone.raw)}
                </a>
                <a
                  href={`tel:+${business.whatsappPhone.raw}`}
                  className="mt-1 block text-accent-600 font-medium hover:text-accent-500 transition-colors"
                >
                  {formatPhoneDisplay(business.whatsappPhone.raw)}
                </a>
              </Card>

              {/* Email */}
              <Card>
                <h3 className="text-lg font-semibold text-primary-800">
                  ✉️ E-mail
                </h3>
                <a
                  href={`mailto:${business.email}`}
                  className="mt-1 block text-accent-600 font-medium hover:text-accent-500 transition-colors break-all"
                >
                  {business.email}
                </a>
              </Card>

              {/* Address */}
              <Card>
                <h3 className="text-lg font-semibold text-primary-800">
                  📍 Endereço
                </h3>
                <p className="mt-1 text-muted text-sm leading-relaxed">
                  {fullAddress}
                </p>
              </Card>

              {/* Opening Hours */}
              <Card>
                <h3 className="text-lg font-semibold text-primary-800">
                  🕐 Horário de Funcionamento
                </h3>
                <ul className="mt-2 space-y-1 text-sm text-muted">
                  <li>{business.openingHours.weekdays}</li>
                  <li>{business.openingHours.saturday}</li>
                  <li>{business.openingHours.sunday}</li>
                </ul>
              </Card>
            </div>
          </div>
        </Container>
      </Section>

      {/* Google Maps Embed */}
      <Section background="white">
        <Container>
          <h2 className="mb-6 text-2xl font-bold text-primary-800 text-center sm:text-3xl">
            Como Chegar
          </h2>
          <div className="overflow-hidden rounded-xl border border-border">
            <iframe
              title={`Localização da ${business.name}`}
              src={`https://www.google.com/maps/embed/v1/place?key=AIzaSyBFw0Qbyq9zTFTd-tUY6dZWTgaQzuU17R8&q=${encodeURIComponent(fullAddress)}`}
              width="100%"
              height="400"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </Container>
      </Section>
    </>
  );
}

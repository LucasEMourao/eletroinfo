import { Container } from "@/presentation/components/ui/Container";
import { Section } from "@/presentation/components/ui/Section";
import { ContactForm } from "@/presentation/components/forms/ContactForm";
import { business } from "@/content";

export function ContactSection() {
  return (
    <Section background="white" id="contato">
      <Container>
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-8">
          <div>
            <h2 className="text-3xl font-bold text-primary-800 sm:text-4xl">
              Fale Conosco
            </h2>
            <p className="mt-4 text-lg text-muted">
              Tem alguma dúvida ou precisa de um orçamento? Preencha o
              formulário ou entre em contato pelos nossos canais de
              atendimento.
            </p>

            <dl className="mt-8 space-y-6">
              <div className="flex gap-4">
                <dt className="flex h-10 w-10 flex-none items-center justify-center rounded-lg bg-primary-100 text-primary-700">
                  <svg
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-2.896-1.596-5.273-3.973-6.869-6.869l1.293-.97c.362-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z"
                    />
                  </svg>
                </dt>
                <dd>
                  <p className="font-semibold text-primary-900">Telefone</p>
                  <p className="mt-1 text-muted">
                    ({business.phone.ddd}) {business.phone.number}
                  </p>
                  <p className="mt-1 text-muted">
                    WhatsApp: ({business.whatsappPhone.ddd}){" "}
                    {business.whatsappPhone.number}
                  </p>
                </dd>
              </div>

              <div className="flex gap-4">
                <dt className="flex h-10 w-10 flex-none items-center justify-center rounded-lg bg-primary-100 text-primary-700">
                  <svg
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75"
                    />
                  </svg>
                </dt>
                <dd>
                  <p className="font-semibold text-primary-900">E-mail</p>
                  <p className="mt-1 text-muted">{business.email}</p>
                </dd>
              </div>

              <div className="flex gap-4">
                <dt className="flex h-10 w-10 flex-none items-center justify-center rounded-lg bg-primary-100 text-primary-700">
                  <svg
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z"
                    />
                  </svg>
                </dt>
                <dd>
                  <p className="font-semibold text-primary-900">Endereço</p>
                  <p className="mt-1 text-muted">
                    {business.address.street}, {business.address.number}{" "}
                    {business.address.complement &&
                      `- ${business.address.complement}`}
                    <br />
                    {business.address.neighborhood} - {business.address.city}/
                    {business.address.state}
                  </p>
                </dd>
              </div>

              <div className="flex gap-4">
                <dt className="flex h-10 w-10 flex-none items-center justify-center rounded-lg bg-primary-100 text-primary-700">
                  <svg
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </dt>
                <dd>
                  <p className="font-semibold text-primary-900">
                    Horário de Funcionamento
                  </p>
                  <p className="mt-1 text-muted">
                    {business.openingHours.weekdays}
                    <br />
                    {business.openingHours.saturday}
                  </p>
                </dd>
              </div>
            </dl>
          </div>

          <div className="rounded-2xl border border-border bg-white p-6 shadow-xl sm:p-8">
            <h3 className="mb-6 text-xl font-bold text-primary-800">
              Envie uma mensagem
            </h3>
            <ContactForm />
          </div>
        </div>
      </Container>
    </Section>
  );
}

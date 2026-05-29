import { Container } from "@/presentation/components/ui/Container";
import { Section } from "@/presentation/components/ui/Section";
import { business } from "@/content";

const trustItems = [
  {
    icon: "🏆",
    value: `+${new Date().getFullYear() - business.foundedYear}`,
    label: "Anos de experiência",
  },
  {
    icon: "🛡️",
    value: "Garantia",
    label: "Em todos os serviços",
  },
  {
    icon: "⚡",
    value: "Rápido",
    label: "Diagnóstico em até 24h",
  },
  {
    icon: "💰",
    value: "Justo",
    label: "Orçamento sem compromisso",
  },
];

export function TrustSection() {
  return (
    <Section background="dark" id="diferenciais">
      <Container>
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-2xl font-bold text-white sm:text-3xl lg:text-4xl">
            Por que escolher a{" "}
            <span className="text-accent-400">Eletroinfo Regis</span>?
          </h2>
          <p className="mt-3 text-primary-100/70 sm:text-lg">
            Confiança e qualidade que você pode contar
          </p>
        </div>

        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {trustItems.map((item) => (
            <div
              key={item.label}
              className="rounded-xl bg-primary-700/50 p-6 text-center backdrop-blur-sm transition-all duration-300 hover:bg-primary-700"
            >
              <div className="text-4xl">{item.icon}</div>
              <div className="mt-3 text-2xl font-bold text-accent-400">
                {item.value}
              </div>
              <p className="mt-1 text-sm text-primary-100/80">{item.label}</p>
            </div>
          ))}
        </div>
      </Container>
    </Section>
  );
}

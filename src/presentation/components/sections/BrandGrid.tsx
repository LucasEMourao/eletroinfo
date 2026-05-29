import { Container } from "@/presentation/components/ui/Container";
import { Section } from "@/presentation/components/ui/Section";
import { brands } from "@/content";

export function BrandGrid() {
  return (
    <Section background="alt" id="marcas">
      <Container>
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-2xl font-bold text-primary-800 sm:text-3xl lg:text-4xl">
            Marcas Atendidas
          </h2>
          <p className="mt-3 text-muted sm:text-lg">
            Trabalhamos com as principais marcas do mercado
          </p>
        </div>

        <div className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
          {brands.map((brand) => (
            <div
              key={brand.id}
              className="flex items-center justify-center rounded-xl border border-border bg-white p-6 transition-all duration-300 hover:shadow-md hover:scale-105 hover:border-accent-400"
            >
              <span className="text-lg font-bold text-gray-700 sm:text-xl">
                {brand.name}
              </span>
            </div>
          ))}
        </div>
      </Container>
    </Section>
  );
}

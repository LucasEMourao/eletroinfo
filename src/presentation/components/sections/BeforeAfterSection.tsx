import { Container } from "@/presentation/components/ui/Container";
import { Section } from "@/presentation/components/ui/Section";
import { BeforeAfterSlider } from "@/presentation/components/ui/BeforeAfterSlider";

export function BeforeAfterSection() {
  return (
    <Section background="alt">
      <Container>
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-2xl font-bold text-primary-800 sm:text-3xl lg:text-4xl">
            Qualidade que você pode ver
          </h2>
          <p className="mt-3 text-muted sm:text-lg">
            Arraste o controle deslizante para comparar o antes e o depois dos nossos reparos.
          </p>
        </div>
        
        <div className="mt-10 mx-auto max-w-4xl">
          <BeforeAfterSlider
            beforeImage="/images/before-repair.png"
            afterImage="/images/after-repair.png"
            beforeLabel="Tela Quebrada"
            afterLabel="Tela Nova"
          />
        </div>
      </Container>
    </Section>
  );
}

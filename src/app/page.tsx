import type { Metadata } from "next";
import { Hero } from "@/presentation/components/sections/Hero";
import { ServicesList } from "@/presentation/components/sections/ServicesList";
import { BrandGrid } from "@/presentation/components/sections/BrandGrid";
import { TrustSection } from "@/presentation/components/sections/TrustSection";
import { BeforeAfterSection } from "@/presentation/components/sections/BeforeAfterSection";
import { ContactSection } from "@/presentation/components/sections/ContactSection";

export const metadata: Metadata = {
  title: "Eletroinfo Regis — Assistência Técnica Eletrônica",
  description:
    "Assistência técnica especializada em conserto de TVs, celulares, notebooks e mais. Atendemos Samsung, LG, Sony, Apple e outras marcas com garantia.",
  openGraph: {
    title: "Eletroinfo Regis — Assistência Técnica Eletrônica",
    description:
      "Assistência técnica especializada em conserto de eletrônicos com garantia e qualidade.",
    type: "website",
  },
};

export default function Home() {
  return (
    <>
      <Hero />
      <ServicesList />
      <BeforeAfterSection />
      <BrandGrid />
      <TrustSection />
      <ContactSection />
    </>
  );
}

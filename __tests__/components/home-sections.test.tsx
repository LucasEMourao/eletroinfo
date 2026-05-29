import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { Hero } from "@/presentation/components/sections/Hero";
import { ServicesList } from "@/presentation/components/sections/ServicesList";
import { BrandGrid } from "@/presentation/components/sections/BrandGrid";
import { TrustSection } from "@/presentation/components/sections/TrustSection";
import { services, brands } from "@/content";

vi.mock("next/link", () => ({
  default: ({
    children,
    href,
    ...props
  }: {
    children: React.ReactNode;
    href: string;
    [key: string]: unknown;
  }) => (
    <a href={href} {...props}>
      {children}
    </a>
  ),
}));

describe("Hero section", () => {
  it("should render the H1 headline", () => {
    render(<Hero />);
    const heading = screen.getByRole("heading", { level: 1 });
    expect(heading).toBeInTheDocument();
    expect(heading).toHaveTextContent(/resolve/i);
  });

  it("should have a WhatsApp CTA", () => {
    render(<Hero />);
    const whatsappLink = screen.getByRole("link", { name: /whatsapp/i });
    expect(whatsappLink).toHaveAttribute(
      "href",
      expect.stringContaining("wa.me")
    );
  });

  it("should have a services CTA", () => {
    render(<Hero />);
    const servicesLink = screen.getByRole("link", { name: /serviços/i });
    expect(servicesLink).toHaveAttribute("href", "/servicos");
  });
});

describe("ServicesList section", () => {
  it("should render all services", () => {
    render(<ServicesList />);
    for (const service of services) {
      expect(screen.getByText(service.title)).toBeInTheDocument();
    }
  });

  it("should render service links to detail pages", () => {
    render(<ServicesList />);
    for (const service of services) {
      const link = screen.getByRole("link", { name: new RegExp(service.title) });
      expect(link).toHaveAttribute("href", `/servicos/${service.slug}`);
    }
  });

  it("should render the section heading", () => {
    render(<ServicesList />);
    expect(
      screen.getByRole("heading", { name: /nossos serviços/i })
    ).toBeInTheDocument();
  });
});

describe("BrandGrid section", () => {
  it("should render all brands", () => {
    render(<BrandGrid />);
    for (const brand of brands) {
      expect(screen.getByText(brand.name)).toBeInTheDocument();
    }
  });

  it("should render the section heading", () => {
    render(<BrandGrid />);
    expect(
      screen.getByRole("heading", { name: /marcas atendidas/i })
    ).toBeInTheDocument();
  });
});

describe("TrustSection", () => {
  it("should render the section heading", () => {
    render(<TrustSection />);
    expect(
      screen.getByRole("heading", { name: /por que escolher/i })
    ).toBeInTheDocument();
  });

  it("should render trust items", () => {
    render(<TrustSection />);
    expect(screen.getByText(/Garantia/i)).toBeInTheDocument();
    expect(screen.getByText(/Diagnóstico/i)).toBeInTheDocument();
    expect(screen.getByText(/Orçamento/i)).toBeInTheDocument();
  });
});

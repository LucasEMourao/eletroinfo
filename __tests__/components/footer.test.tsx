import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { Footer } from "@/presentation/components/layout/Footer";

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

describe("Footer component", () => {
  it("should render business name", () => {
    render(<Footer />);
    expect(screen.getByText(/Eletroinfo Regis/i)).toBeInTheDocument();
  });

  it("should render contact phone", () => {
    render(<Footer />);
    expect(screen.getByText(/99876-5432/)).toBeInTheDocument();
  });

  it("should render address", () => {
    render(<Footer />);
    expect(screen.getByText(/Rua dos Eletrônicos/i)).toBeInTheDocument();
  });

  it("should render opening hours", () => {
    render(<Footer />);
    expect(screen.getByText(/Seg a Sex/i)).toBeInTheDocument();
  });

  it("should render navigation links", () => {
    render(<Footer />);
    const servicosLinks = screen.getAllByRole("link", { name: /serviços/i });
    expect(servicosLinks.length).toBeGreaterThanOrEqual(1);

    const sobreLinks = screen.getAllByRole("link", { name: /sobre/i });
    expect(sobreLinks.length).toBeGreaterThanOrEqual(1);

    // "Contato" appears as both link and heading - use getAllBy
    const contatoLinks = screen.getAllByRole("link", { name: /contato/i });
    expect(contatoLinks.length).toBeGreaterThanOrEqual(1);
  });

  it("should render copyright", () => {
    render(<Footer />);
    expect(screen.getByText(/©/)).toBeInTheDocument();
  });
});

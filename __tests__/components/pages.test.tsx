import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import SobrePage from "@/app/sobre/page";
import ServicosPage from "@/app/servicos/page";
import ServicoDetalhePage from "@/app/servicos/[slug]/page";

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

describe("Sprint 6 Pages", () => {
  describe("Sobre Page", () => {
    it("should render the main heading", () => {
      render(<SobrePage />);
      expect(screen.getByRole("heading", { name: /Nossa História/i })).toBeInTheDocument();
    });
  });

  describe("Servicos Page", () => {
    it("should render the services listing", () => {
      render(<ServicosPage />);
      // Note: we can't easily check the specific heading if it matches the component's heading
      // Just check if it renders without crashing and shows services text
      const elements = screen.getAllByText(/Nossos Serviços/i);
      expect(elements.length).toBeGreaterThanOrEqual(1);
    });
  });

  describe("Servico Detalhe Page", () => {
    it("should render the service detail", async () => {
      // It's an async server component, so we have to await it.
      // Also params is a Promise.
      const resolvedPage = await ServicoDetalhePage({ params: Promise.resolve({ slug: "conserto-de-tv" }) });
      render(resolvedPage);
      
      const elements = screen.getAllByText(/Conserto de TV/i);
      expect(elements.length).toBeGreaterThanOrEqual(1);
      expect(screen.getByRole("link", { name: /Solicitar Orçamento/i })).toBeInTheDocument();
    });

    it("should handle not found", async () => {
      // Because we use notFound(), it will throw an error in the test environment if not caught
      // Vitest will catch it if we expect it to throw.
      await expect(ServicoDetalhePage({ params: Promise.resolve({ slug: "invalid-slug" }) })).rejects.toThrow();
    });
  });
});

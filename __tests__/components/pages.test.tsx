import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import SobrePage from "@/app/sobre/page";
import ContatoPage from "@/app/contato/page";
import ServicosPage from "@/app/servicos/page";
import ServicoDetailPage from "@/app/servicos/[slug]/page";
import { services } from "@/content";

// Mock next/link
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

// Mock next/navigation
vi.mock("next/navigation", () => ({
  notFound: vi.fn().mockImplementation(() => {
    throw new Error("NEXT_NOT_FOUND");
  }),
}));

describe("Pages Rendering", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe("SobrePage", () => {
    it("renders the correct heading and layout elements", () => {
      render(<SobrePage />);
      expect(screen.getByRole("heading", { name: /Sobre a Eletroinfo Regis/i })).toBeInTheDocument();
      expect(screen.getByText("Nossa História")).toBeInTheDocument();
      expect(screen.getByText("Nossos Diferenciais")).toBeInTheDocument();
      expect(screen.getByText("Missão e Valores")).toBeInTheDocument();
    });
  });

  describe("ContatoPage", () => {
    it("renders contact page options and forms", () => {
      render(<ContatoPage />);
      expect(screen.getByRole("heading", { name: /Entre em Contato/i })).toBeInTheDocument();
      expect(screen.getByRole("heading", { name: /Envie sua Mensagem/i })).toBeInTheDocument();
      // Address card info
      expect(screen.getByText(/Como Chegar/i)).toBeInTheDocument();
      // Form fields rendered via ContactForm
      expect(screen.getByLabelText(/Nome \*/)).toBeInTheDocument();
    });
  });

  describe("ServicosPage", () => {
    it("renders services list page with all services", () => {
      render(<ServicosPage />);
      expect(screen.getByRole("heading", { name: /Nossos Serviços/i })).toBeInTheDocument();
      for (const service of services) {
        expect(screen.getByText(service.title)).toBeInTheDocument();
      }
    });
  });

  describe("ServicoDetailPage", () => {
    it("renders the detail page for a valid service slug", async () => {
      const tvService = services[0];
      const pageEl = await ServicoDetailPage({
        params: Promise.resolve({ slug: tvService.slug }),
      });
      render(pageEl);

      expect(screen.getByRole("heading", { name: tvService.title })).toBeInTheDocument();
      expect(screen.getByText(tvService.shortDescription)).toBeInTheDocument();
      expect(screen.getByText(tvService.longDescription)).toBeInTheDocument();
      expect(screen.getByText("Serviços Relacionados")).toBeInTheDocument();
    });

    it("triggers notFound when service is not found", async () => {
      await expect(
        ServicoDetailPage({
          params: Promise.resolve({ slug: "non-existent-service" }),
        })
      ).rejects.toThrow("NEXT_NOT_FOUND");
    });
  });
});

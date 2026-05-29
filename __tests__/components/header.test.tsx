import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Header } from "@/presentation/components/layout/Header";

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

describe("Header component", () => {
  it("should render the logo/business name", () => {
    render(<Header />);
    const logos = screen.getAllByText(/Eletroinfo/i);
    expect(logos.length).toBeGreaterThanOrEqual(1);
  });

  it("should render desktop navigation links", () => {
    render(<Header />);
    // Multiple Início/Serviços links exist (desktop + mobile), just check they exist
    const links = screen.getAllByRole("link", { name: /início/i });
    expect(links.length).toBeGreaterThanOrEqual(1);

    const servicosLinks = screen.getAllByRole("link", { name: /serviços/i });
    expect(servicosLinks.length).toBeGreaterThanOrEqual(1);

    const sobreLinks = screen.getAllByRole("link", { name: /sobre/i });
    expect(sobreLinks.length).toBeGreaterThanOrEqual(1);

    const contatoLinks = screen.getAllByRole("link", { name: /contato/i });
    expect(contatoLinks.length).toBeGreaterThanOrEqual(1);
  });

  it("should render the mobile menu open button", () => {
    render(<Header />);
    const menuButton = screen.getByRole("button", { name: /abrir menu/i });
    expect(menuButton).toBeInTheDocument();
  });

  it("should toggle mobile menu on button click", async () => {
    const user = userEvent.setup();
    render(<Header />);

    const openButton = screen.getByRole("button", { name: /abrir menu/i });

    // Menu should be hidden initially
    const nav = screen.getByTestId("mobile-nav");
    expect(nav).toHaveClass("translate-x-full");

    // Click to open
    await user.click(openButton);
    expect(nav).not.toHaveClass("translate-x-full");

    // Click to close
    const closeButton = screen.getByRole("button", { name: /fechar menu/i });
    await user.click(closeButton);
    expect(nav).toHaveClass("translate-x-full");
  });
});

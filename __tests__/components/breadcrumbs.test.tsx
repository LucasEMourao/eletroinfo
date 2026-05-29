import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { Breadcrumbs } from "@/presentation/components/seo/Breadcrumbs";

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

describe("Breadcrumbs", () => {
  it("renders all breadcrumb items", () => {
    render(
      <Breadcrumbs
        items={[
          { label: "Início", href: "/" },
          { label: "Serviços", href: "/servicos" },
          { label: "Conserto de TV" },
        ]}
      />
    );

    expect(screen.getByText("Início")).toBeInTheDocument();
    expect(screen.getByText("Serviços")).toBeInTheDocument();
    expect(screen.getByText("Conserto de TV")).toBeInTheDocument();
  });

  it("renders links for non-last items with href", () => {
    render(
      <Breadcrumbs
        items={[
          { label: "Início", href: "/" },
          { label: "Serviços", href: "/servicos" },
          { label: "Conserto de TV" },
        ]}
      />
    );

    const homeLink = screen.getByText("Início");
    expect(homeLink.closest("a")).toHaveAttribute("href", "/");

    const servicosLink = screen.getByText("Serviços");
    expect(servicosLink.closest("a")).toHaveAttribute("href", "/servicos");
  });

  it("renders last item as text, not a link", () => {
    render(
      <Breadcrumbs
        items={[
          { label: "Início", href: "/" },
          { label: "Conserto de TV" },
        ]}
      />
    );

    const lastItem = screen.getByText("Conserto de TV");
    expect(lastItem.tagName).toBe("SPAN");
    expect(lastItem).toHaveAttribute("aria-current", "page");
  });

  it("renders navigation landmark", () => {
    render(
      <Breadcrumbs
        items={[
          { label: "Início", href: "/" },
          { label: "Sobre" },
        ]}
      />
    );

    expect(screen.getByRole("navigation", { name: "Breadcrumb" })).toBeInTheDocument();
  });

  it("renders JSON-LD structured data", () => {
    const { container } = render(
      <Breadcrumbs
        items={[
          { label: "Início", href: "/" },
          { label: "Serviços" },
        ]}
      />
    );

    const script = container.querySelector('script[type="application/ld+json"]');
    expect(script).toBeInTheDocument();

    const jsonLd = JSON.parse(script!.textContent!);
    expect(jsonLd["@type"]).toBe("BreadcrumbList");
    expect(jsonLd.itemListElement).toHaveLength(2);
    expect(jsonLd.itemListElement[0].position).toBe(1);
    expect(jsonLd.itemListElement[0].name).toBe("Início");
  });

  it("renders chevron separators between items", () => {
    const { container } = render(
      <Breadcrumbs
        items={[
          { label: "Início", href: "/" },
          { label: "Serviços", href: "/servicos" },
          { label: "Conserto de TV" },
        ]}
      />
    );

    // SVG separators (there should be 2 for 3 items)
    const svgs = container.querySelectorAll('svg[aria-hidden="true"]');
    expect(svgs).toHaveLength(2);
  });
});

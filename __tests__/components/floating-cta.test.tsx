import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { FloatingCTA } from "@/presentation/components/layout/FloatingCTA";

describe("FloatingCTA component", () => {
  it("should render a WhatsApp link", () => {
    render(<FloatingCTA />);
    const link = screen.getByRole("link", { name: /whatsapp/i });
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute("href", expect.stringContaining("wa.me"));
  });

  it("should have target=_blank for external link", () => {
    render(<FloatingCTA />);
    const link = screen.getByRole("link", { name: /whatsapp/i });
    expect(link).toHaveAttribute("target", "_blank");
  });

  it("should have fixed positioning", () => {
    render(<FloatingCTA />);
    const link = screen.getByRole("link", { name: /whatsapp/i });
    expect(link.className).toContain("fixed");
  });

  it("should NOT have any hidden class (visible on all viewports)", () => {
    render(<FloatingCTA />);
    const link = screen.getByRole("link", { name: /whatsapp/i });
    expect(link.className).not.toContain("hidden");
    expect(link.className).not.toContain("lg:hidden");
  });
});

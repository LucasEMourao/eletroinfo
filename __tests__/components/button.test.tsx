import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { Button } from "@/presentation/components/ui/Button";

describe("Button component", () => {
  it("should render children text", () => {
    render(<Button>Click me</Button>);
    expect(screen.getByRole("button")).toHaveTextContent("Click me");
  });

  it("should apply primary variant by default", () => {
    render(<Button>Primary</Button>);
    const button = screen.getByRole("button");
    expect(button.className).toContain("bg-primary");
  });

  it("should apply accent variant", () => {
    render(<Button variant="accent">Accent</Button>);
    const button = screen.getByRole("button");
    expect(button.className).toContain("bg-accent");
  });

  it("should apply whatsapp variant", () => {
    render(<Button variant="whatsapp">WhatsApp</Button>);
    const button = screen.getByRole("button");
    expect(button.className).toContain("bg-whatsapp");
  });

  it("should apply secondary variant", () => {
    render(<Button variant="secondary">Secondary</Button>);
    const button = screen.getByRole("button");
    expect(button.className).toContain("border");
  });

  it("should render as a link when href is provided", () => {
    render(<Button href="/test">Link</Button>);
    const link = screen.getByRole("link");
    expect(link).toHaveAttribute("href", "/test");
    expect(link).toHaveTextContent("Link");
  });

  it("should apply size classes", () => {
    render(<Button size="lg">Large</Button>);
    const button = screen.getByRole("button");
    expect(button.className).toContain("px-8");
  });

  it("should forward aria-label", () => {
    render(<Button aria-label="Send message">📩</Button>);
    const button = screen.getByRole("button", { name: "Send message" });
    expect(button).toBeInTheDocument();
  });
});

import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { Container } from "@/presentation/components/ui/Container";
import { Section } from "@/presentation/components/ui/Section";
import { Badge } from "@/presentation/components/ui/Badge";
import { Card } from "@/presentation/components/ui/Card";

describe("Container component", () => {
  it("should render children", () => {
    render(<Container><p>Content</p></Container>);
    expect(screen.getByText("Content")).toBeInTheDocument();
  });

  it("should apply max-width class", () => {
    const { container } = render(<Container>Content</Container>);
    expect(container.firstChild).toHaveClass("mx-auto");
  });
});

describe("Section component", () => {
  it("should render children", () => {
    render(<Section><p>Section content</p></Section>);
    expect(screen.getByText("Section content")).toBeInTheDocument();
  });

  it("should render as a section element", () => {
    const { container } = render(<Section>Content</Section>);
    expect(container.querySelector("section")).toBeTruthy();
  });

  it("should apply alt background when specified", () => {
    const { container } = render(<Section background="alt">Alt</Section>);
    const section = container.querySelector("section");
    expect(section?.className).toContain("bg-off-white");
  });

  it("should apply dark background when specified", () => {
    const { container } = render(<Section background="dark">Dark</Section>);
    const section = container.querySelector("section");
    expect(section?.className).toContain("bg-primary-800");
  });
});

describe("Badge component", () => {
  it("should render text content", () => {
    render(<Badge>Conserto</Badge>);
    expect(screen.getByText("Conserto")).toBeInTheDocument();
  });
});

describe("Card component", () => {
  it("should render children", () => {
    render(<Card><p>Card content</p></Card>);
    expect(screen.getByText("Card content")).toBeInTheDocument();
  });

  it("should have hover styles class", () => {
    const { container } = render(<Card>Hover me</Card>);
    expect(container.firstChild).toHaveClass("transition-shadow");
  });
});

import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";

function SmokeComponent() {
  return <h1>Eletroinfo Regis</h1>;
}

describe("Testing Library smoke test", () => {
  it("should render a React component", () => {
    render(<SmokeComponent />);
    expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent(
      "Eletroinfo Regis"
    );
  });

  it("should find elements by text", () => {
    render(<SmokeComponent />);
    expect(screen.getByText("Eletroinfo Regis")).toBeInTheDocument();
  });
});

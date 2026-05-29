import { describe, it, expect } from "vitest";

describe("Vitest smoke test", () => {
  it("should run a basic assertion", () => {
    expect(1 + 1).toBe(2);
  });

  it("should handle string operations", () => {
    const slug = "conserto-de-tv"
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "");
    expect(slug).toBe("conserto-de-tv");
  });
});

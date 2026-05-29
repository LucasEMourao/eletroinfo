import { describe, it, expect } from "vitest";
import { generateSlug, generateUniqueSlug } from "@/application/slug";

describe("generateSlug", () => {
  it("should convert a simple title to a slug", () => {
    expect(generateSlug("Conserto de TV")).toBe("conserto-de-tv");
  });

  it("should remove accents and diacritics", () => {
    expect(generateSlug("Manutenção Elétrica")).toBe("manutencao-eletrica");
  });

  it("should handle multiple spaces", () => {
    expect(generateSlug("Conserto   de   TV")).toBe("conserto-de-tv");
  });

  it("should remove special characters", () => {
    expect(generateSlug("Serviço (especial) #1!")).toBe("servico-especial-1");
  });

  it("should trim leading and trailing hyphens", () => {
    expect(generateSlug("  Conserto de TV  ")).toBe("conserto-de-tv");
  });

  it("should handle empty string", () => {
    expect(generateSlug("")).toBe("");
  });
});

describe("generateUniqueSlug", () => {
  it("should generate unique slugs for an array of titles", () => {
    const titles = [
      "Conserto de TV",
      "Conserto de Celular",
      "Instalação de Antena",
    ];
    const slugs = generateUniqueSlug(titles);

    expect(slugs).toEqual([
      "conserto-de-tv",
      "conserto-de-celular",
      "instalacao-de-antena",
    ]);
  });

  it("should handle duplicate titles by appending index", () => {
    const titles = ["Conserto de TV", "Conserto de TV"];
    const slugs = generateUniqueSlug(titles);

    expect(slugs[0]).toBe("conserto-de-tv");
    expect(slugs[1]).toBe("conserto-de-tv-2");
    expect(new Set(slugs).size).toBe(slugs.length);
  });

  it("should ensure all slugs are unique", () => {
    const titles = [
      "Conserto de TV",
      "Conserto de Celular",
      "Instalação de Antena",
      "Manutenção Elétrica",
      "Assistência Técnica",
      "Conserto de Notebook",
    ];
    const slugs = generateUniqueSlug(titles);
    const uniqueSlugs = new Set(slugs);
    expect(uniqueSlugs.size).toBe(slugs.length);
  });

  it("should not contain special characters in any slug", () => {
    const titles = [
      "Serviço Técnico (Premium)",
      "Manutenção & Reparo",
      "Conserto de TV/Monitor",
    ];
    const slugs = generateUniqueSlug(titles);

    for (const slug of slugs) {
      expect(slug).toMatch(/^[a-z0-9-]+$/);
    }
  });
});

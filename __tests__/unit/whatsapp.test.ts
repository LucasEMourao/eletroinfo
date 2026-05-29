import { describe, it, expect } from "vitest";
import { generateWhatsAppLink, generateServiceWhatsAppLink } from "@/application/whatsapp";

describe("generateWhatsAppLink", () => {
  it("should generate a valid wa.me URL", () => {
    const link = generateWhatsAppLink({
      phone: "5511999999999",
      message: "Olá!",
    });
    expect(link.url).toContain("https://wa.me/5511999999999");
  });

  it("should encode the message in the URL", () => {
    const link = generateWhatsAppLink({
      phone: "5511999999999",
      message: "Olá! Gostaria de saber mais.",
    });
    expect(link.url).toContain("text=");
    expect(link.url).toContain(encodeURIComponent("Olá! Gostaria de saber mais."));
  });

  it("should strip non-numeric characters from phone", () => {
    const link = generateWhatsAppLink({
      phone: "+55 (11) 99999-9999",
      message: "Olá!",
    });
    expect(link.url).toContain("https://wa.me/5511999999999");
  });

  it("should preserve the original intent", () => {
    const intent = { phone: "5511999999999", message: "Teste" };
    const link = generateWhatsAppLink(intent);
    expect(link.intent).toEqual(intent);
  });
});

describe("generateServiceWhatsAppLink", () => {
  it("should include the service name in the message", () => {
    const link = generateServiceWhatsAppLink(
      "5511999999999",
      "Conserto de TV"
    );
    expect(link.url).toContain(encodeURIComponent("Conserto de TV"));
  });

  it("should generate a friendly pre-filled message", () => {
    const link = generateServiceWhatsAppLink(
      "5511999999999",
      "Instalação de Antena"
    );
    expect(link.intent.message).toContain("Instalação de Antena");
    expect(link.intent.message.length).toBeGreaterThan(0);
  });
});

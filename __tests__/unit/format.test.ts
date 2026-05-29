import { describe, it, expect } from "vitest";
import { formatPhone, formatPhoneDisplay } from "@/shared/format";

describe("formatPhone", () => {
  it("should strip all non-numeric characters", () => {
    expect(formatPhone("+55 (11) 99999-9999")).toBe("5511999999999");
  });

  it("should handle already clean numbers", () => {
    expect(formatPhone("5511999999999")).toBe("5511999999999");
  });

  it("should handle empty string", () => {
    expect(formatPhone("")).toBe("");
  });
});

describe("formatPhoneDisplay", () => {
  it("should format a Brazilian phone number for display", () => {
    const result = formatPhoneDisplay("5511999999999");
    expect(result).toBe("(11) 99999-9999");
  });

  it("should handle phone without country code", () => {
    const result = formatPhoneDisplay("11999999999");
    expect(result).toBe("(11) 99999-9999");
  });
});

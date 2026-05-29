import { describe, it, expect } from "vitest";
import { business } from "@/content/business";
import { services } from "@/content/services";
import { brands } from "@/content/brands";
import type { BusinessProfile, Service, Brand } from "@/domain";

describe("Business content", () => {
  it("should have all required fields", () => {
    const biz: BusinessProfile = business;
    expect(biz.name).toBeTruthy();
    expect(biz.tagline).toBeTruthy();
    expect(biz.description).toBeTruthy();
    expect(biz.phone.raw).toBeTruthy();
    expect(biz.whatsappPhone.raw).toBeTruthy();
    expect(biz.email).toContain("@");
    expect(biz.address.city).toBeTruthy();
    expect(biz.address.state).toBeTruthy();
    expect(biz.openingHours.weekdays).toBeTruthy();
    expect(biz.siteUrl).toContain("http");
  });

  it("should have a valid founded year", () => {
    expect(business.foundedYear).toBeGreaterThan(1990);
    expect(business.foundedYear).toBeLessThanOrEqual(new Date().getFullYear());
  });
});

describe("Services content", () => {
  it("should have at least 6 services", () => {
    expect(services.length).toBeGreaterThanOrEqual(6);
  });

  it("should have all required fields on every service", () => {
    for (const service of services) {
      const s: Service = service;
      expect(s.id).toBeTruthy();
      expect(s.title).toBeTruthy();
      expect(s.slug).toBeTruthy();
      expect(s.shortDescription).toBeTruthy();
      expect(s.longDescription).toBeTruthy();
      expect(s.icon).toBeTruthy();
      expect(s.category).toBeTruthy();
    }
  });

  it("should have unique slugs", () => {
    const slugs = services.map((s) => s.slug);
    expect(new Set(slugs).size).toBe(slugs.length);
  });

  it("should have unique ids", () => {
    const ids = services.map((s) => s.id);
    expect(new Set(ids).size).toBe(ids.length);
  });

  it("should have slugs with only valid characters", () => {
    for (const service of services) {
      expect(service.slug).toMatch(/^[a-z0-9-]+$/);
    }
  });
});

describe("Brands content", () => {
  it("should have at least 8 brands", () => {
    expect(brands.length).toBeGreaterThanOrEqual(8);
  });

  it("should have all required fields on every brand", () => {
    for (const brand of brands) {
      const b: Brand = brand;
      expect(b.id).toBeTruthy();
      expect(b.name).toBeTruthy();
      expect(b.slug).toBeTruthy();
    }
  });

  it("should have unique ids", () => {
    const ids = brands.map((b) => b.id);
    expect(new Set(ids).size).toBe(ids.length);
  });
});

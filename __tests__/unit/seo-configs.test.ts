import { describe, it, expect } from "vitest";
import sitemap from "@/app/sitemap";
import robots from "@/app/robots";
import { services } from "@/content";
import { SITE_URL } from "@/shared";

describe("SEO Configs Generator", () => {
  describe("sitemap()", () => {
    it("generates correct static routes", () => {
      const results = sitemap();
      
      const urls = results.map((item) => item.url);
      expect(urls).toContain(`${SITE_URL}`);
      expect(urls).toContain(`${SITE_URL}/sobre`);
      expect(urls).toContain(`${SITE_URL}/contato`);
      expect(urls).toContain(`${SITE_URL}/servicos`);
    });

    it("generates dynamic routes for all services in content", () => {
      const results = sitemap();
      const urls = results.map((item) => item.url);

      for (const service of services) {
        expect(urls).toContain(`${SITE_URL}/servicos/${service.slug}`);
      }
    });

    it("assigns appropriate change frequencies and priorities", () => {
      const results = sitemap();
      
      const home = results.find((item) => item.url === `${SITE_URL}`);
      expect(home?.priority).toBe(1.0);
      expect(home?.changeFrequency).toBe("monthly");

      const servicesList = results.find((item) => item.url === `${SITE_URL}/servicos`);
      expect(servicesList?.priority).toBe(0.8);

      const dynamicService = results.find((item) => item.url.includes("/servicos/"));
      expect(dynamicService?.priority).toBe(0.6);
      expect(dynamicService?.changeFrequency).toBe("weekly");
    });
  });

  describe("robots()", () => {
    it("returns correct user-agent rules and points to sitemap", () => {
      const config = robots();
      
      expect(config.rules).toBeDefined();
      expect(config.rules).toEqual(
        expect.objectContaining({
          userAgent: "*",
          allow: "/",
          disallow: "/api/",
        })
      );
      expect(config.sitemap).toBe(`${SITE_URL}/sitemap.xml`);
    });
  });
});

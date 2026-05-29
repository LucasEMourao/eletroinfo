import type { MetadataRoute } from "next";
import { services } from "@/content";
import { SITE_URL } from "@/shared";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = ["", "/sobre", "/contato", "/servicos"];

  const staticPaths = routes.map((route) => ({
    url: `${SITE_URL}${route}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: route === "" ? 1.0 : 0.8,
  }));

  const dynamicPaths = services.map((service) => ({
    url: `${SITE_URL}/servicos/${service.slug}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.6,
  }));

  return [...staticPaths, ...dynamicPaths];
}

import type { MetadataRoute } from "next";
import { services } from "@/content";
import { SITE_URL } from "@/shared";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = ["", "/sobre", "/contato", "/servicos"].map((route) => ({
    url: `${SITE_URL}${route}`,
    lastModified: new Date(),
    changeFrequency: (route === "" ? "weekly" : "monthly") as
      | "weekly"
      | "monthly",
    priority: route === "" ? 1 : 0.8,
  }));

  const dynamicRoutes = services.map((service) => ({
    url: `${SITE_URL}/servicos/${service.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.9,
  }));

  return [...staticRoutes, ...dynamicRoutes];
}

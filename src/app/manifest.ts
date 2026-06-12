import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Eletrônica Fernandes — Assistência Técnica Eletrônica",
    short_name: "Fernandes",
    description:
      "Assistência técnica especializada em conserto de eletrônicos.",
    start_url: "/",
    display: "standalone",
    background_color: "#ffffff",
    theme_color: "#145BC9",
    icons: [
      {
        src: "/favicon.ico",
        sizes: "any",
        type: "image/x-icon",
      },
      {
        src: "/android-chrome-192x192.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: "/android-chrome-512x512.png",
        sizes: "512x512",
        type: "image/png",
      },
    ],
  };
}

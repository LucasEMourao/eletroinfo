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
    theme_color: "#1a365d",
    icons: [
      {
        src: "/favicon.ico",
        sizes: "any",
        type: "image/x-icon",
      },
    ],
  };
}

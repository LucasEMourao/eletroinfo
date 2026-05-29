import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import { GoogleTagManager } from "@next/third-parties/google";
import { Header } from "@/presentation/components/layout/Header";
import { Footer } from "@/presentation/components/layout/Footer";
import { FloatingCTA } from "@/presentation/components/layout/FloatingCTA";
import { business } from "@/content";
import { SITE_URL, GTM_ID, formatPhoneDisplay } from "@/shared";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const viewport: Viewport = {
  themeColor: "#1a365d",
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL ?? "https://eletroinfo.com.br"
  ),
  title: {
    default: "Eletroinfo Regis — Assistência Técnica Eletrônica",
    template: "%s | Eletroinfo Regis",
  },
  description:
    "Assistência técnica especializada em conserto de eletrônicos. Atendemos as principais marcas com garantia e qualidade.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: business.name,
    image: `${SITE_URL}/icon.png`,
    url: SITE_URL,
    telephone: formatPhoneDisplay(business.phone.raw),
    address: {
      "@type": "PostalAddress",
      streetAddress: `${business.address.street}, ${business.address.number}`,
      addressLocality: business.address.city,
      addressRegion: business.address.state,
      postalCode: business.address.zipCode,
      addressCountry: "BR",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: -23.5505,
      longitude: -46.6333,
    },
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        opens: "08:00",
        closes: "18:00",
      },
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: "Saturday",
        opens: "08:00",
        closes: "13:00",
      },
    ],
  };

  return (
    <html lang="pt-BR" className={`${inter.variable} antialiased`}>
      <body className="min-h-dvh flex flex-col bg-background text-foreground font-sans">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
        <FloatingCTA />
        {GTM_ID && <GoogleTagManager gtmId={GTM_ID} />}
      </body>
    </html>
  );
}

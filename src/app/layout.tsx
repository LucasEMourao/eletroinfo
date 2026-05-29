import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import { Header } from "@/presentation/components/layout/Header";
import { Footer } from "@/presentation/components/layout/Footer";
import { FloatingCTA } from "@/presentation/components/layout/FloatingCTA";
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
  return (
    <html lang="pt-BR" className={`${inter.variable} antialiased`}>
      <body className="min-h-dvh flex flex-col bg-background text-foreground font-sans">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
        <FloatingCTA />
      </body>
    </html>
  );
}

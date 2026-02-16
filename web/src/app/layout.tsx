import type { Metadata, Viewport } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import "./globals.css";

const siteUrl = "https://echelon.qyrn.dev";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#0a0a0f",
};

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Échelon — Veille Cybersécurité",
    template: "%s | Échelon",
  },
  description:
    "Digest hebdomadaire des meilleures ressources cybersécurité : vulnérabilités, outils, tutoriels, bug bounty et actualités du secteur.",
  keywords: [
    "cybersécurité",
    "veille",
    "sécurité informatique",
    "vulnérabilités",
    "CVE",
    "bug bounty",
    "pentest",
    "hacking",
    "infosec",
    "security digest",
  ],
  authors: [{ name: "Qyrn" }],
  creator: "Qyrn",
  icons: { icon: "/favicon.ico" },
  openGraph: {
    type: "website",
    locale: "fr_FR",
    url: siteUrl,
    siteName: "Échelon",
    title: "Échelon — Veille Cybersécurité",
    description:
      "Digest hebdomadaire des meilleures ressources cybersécurité : vulnérabilités, outils, tutoriels, bug bounty et actualités.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Échelon — Veille Cybersécurité",
    description:
      "Digest hebdomadaire des meilleures ressources cybersécurité : vulnérabilités, outils, tutoriels, bug bounty et actualités.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr" className="dark">
      <body className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 mx-auto w-full max-w-5xl px-4 sm:px-6 py-6 sm:py-8">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}

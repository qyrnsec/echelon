import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import "./globals.css";

export const metadata: Metadata = {
  title: "ECHELON — Veille Cybersécurité",
  description: "Digest hebdomadaire des meilleures ressources cybersécurité",
  icons: { icon: "/favicon.ico" },
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
        <main className="flex-1 mx-auto w-full max-w-5xl px-6 py-8">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}

import type { Metadata } from "next";
import { Cormorant_Garamond, Forum, Inter } from "next/font/google";
import "./globals.css";

const cormorantGaramond = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin", "cyrillic"],
  weight: ["500", "600", "700"],
});

// Client wanted "Le Grand Capital" for the logo wordmark, but it's a paid
// font ($8+ on MyFonts) we don't have a license for. Client then sent a
// CSS snippet naming "Cinzel" (Roman-inscriptional capitals) — Cinzel
// itself has no Cyrillic glyphs, so it silently falls back and never
// actually renders "ГЛИБОКО". Forum is the closest free match that
// shares Cinzel's wide, classical Roman-capitals look with real
// Cyrillic support.
const forum = Forum({
  variable: "--font-logo-face",
  subsets: ["latin", "cyrillic"],
  weight: "400",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin", "cyrillic"],
  weight: ["400", "500", "600"],
});

const SITE_URL = "https://gluboko.vercel.app";
const TITLE = "ГЛИБОКО — озонування та хімчистка меблів на виїзд у Києві";
const DESCRIPTION =
  "Преміальний сервіс озонування приміщень та хімчистки меблів з виїздом по Києву та Київській області. Безпечно, швидко, ефективно.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: TITLE,
    template: "%s — ГЛИБОКО",
  },
  description: DESCRIPTION,
  keywords: [
    "озонування приміщень",
    "хімчистка меблів",
    "хімчистка дивана Київ",
    "озонування квартири",
    "дезінфекція приміщень Київ",
  ],
  authors: [{ name: "ГЛИБОКО" }],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "uk_UA",
    url: SITE_URL,
    siteName: "ГЛИБОКО",
    title: TITLE,
    description: DESCRIPTION,
    images: [{ url: "/images/og-image.jpg", width: 1200, height: 630, alt: "ГЛИБОКО — озонування та хімчистка меблів" }],
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESCRIPTION,
    images: ["/images/og-image.jpg"],
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="uk" className={`${cormorantGaramond.variable} ${forum.variable} ${inter.variable} h-full antialiased`}>
      <body className="flex min-h-full flex-col font-sans">{children}</body>
    </html>
  );
}

import type { Metadata } from "next";
import { Inter, Unbounded } from "next/font/google";
import "./globals.css";

const unbounded = Unbounded({
  variable: "--font-unbounded",
  subsets: ["latin", "cyrillic"],
  weight: ["500", "600", "700", "800"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin", "cyrillic"],
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
    <html lang="uk" className={`${unbounded.variable} ${inter.variable} h-full antialiased`}>
      <body className="flex min-h-full flex-col font-sans">{children}</body>
    </html>
  );
}

import type { Metadata, Viewport } from "next";
import { Caveat, Manrope, Unbounded } from "next/font/google";
import "./globals.css";

const manrope = Manrope({
  subsets: ["cyrillic", "latin"],
  variable: "--font-manrope",
  display: "swap",
});

const unbounded = Unbounded({
  subsets: ["cyrillic", "latin"],
  variable: "--font-unbounded",
  display: "swap",
});

const caveat = Caveat({
  subsets: ["cyrillic", "latin"],
  variable: "--font-caveat",
  display: "swap",
});

export const metadata: Metadata = {
  title: "7 ИСКР — фестиваль юного кино",
  description:
    "Фестиваль детских AI-фильмов Documentolog × Jedai Academy: 29 авторов, шесть команд и семь премьерных слотов.",
  openGraph: {
    title: "7 ИСКР — фестиваль юного кино",
    description:
      "29 юных авторов. Шесть команд. Семь премьерных слотов. AI Film Festival 2026.",
    type: "website",
    locale: "ru_RU",
  },
};

export const viewport: Viewport = {
  themeColor: "#F4F0E7",
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="ru"
      className={`${manrope.variable} ${unbounded.variable} ${caveat.variable}`}
    >
      <body>{children}</body>
    </html>
  );
}

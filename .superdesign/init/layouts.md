# Shared Layouts

## RootLayout

- Source: `app/layout.tsx`
- Description: Russian-language Next.js root layout with Manrope and Unbounded,
  festival metadata, Open Graph data, theme color, and viewport configuration.

```tsx
import type { Metadata, Viewport } from "next";
import { Manrope, Unbounded } from "next/font/google";
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

export const metadata: Metadata = {
  title: "7 ИСКР — фестиваль AI-вселенных",
  description:
    "Финальный фестиваль детского AI-интенсива Documentolog × Jedai Academy: семь команд, семь фильмов и семь новых миров.",
  openGraph: {
    title: "7 ИСКР — фестиваль AI-вселенных",
    description:
      "Семь команд. Семь фильмов. Семь новых миров. AI Film Festival 2026.",
    type: "website",
    locale: "ru_RU",
  },
};

export const viewport: Viewport = {
  themeColor: "#070816",
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ru" className={`${manrope.variable} ${unbounded.variable}`}>
      <body>{children}</body>
    </html>
  );
}
```

The page-level fixed navigation and footer are rendered by
`src/components/FestivalPage.tsx`.

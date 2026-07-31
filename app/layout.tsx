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
  title: "8 ИСКР — Documentolog AI summer camp",
  description:
    "Documentolog AI summer camp × Jedai Academy: 29+ авторов, 8 премьерных слотов. AI Film Festival 2026. 27-31 июля.",
  manifest: "/manifest.json",
  openGraph: {
    title: "8 ИСКР — Documentolog AI summer camp",
    description:
      "29+ юных авторов. Восемь премьерных слотов. AI Film Festival 2026. 27-31 июля.",
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
      <head>
        <link rel="manifest" href="/manifest.json" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-title" content="8 ИСКР" />
      </head>
      <body>
        {children}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              if ("serviceWorker" in navigator) {
                window.addEventListener("load", function() {
                  navigator.serviceWorker.register("/sw.js");
                });
              }
            `,
          }}
        />
      </body>
    </html>
  );
}

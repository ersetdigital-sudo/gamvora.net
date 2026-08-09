import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { site } from "@/lib/site";

const inter = localFont({
  src: [
    { path: "../public/fonts/inter-regular.ttf", weight: "400" },
    { path: "../public/fonts/inter-medium.ttf", weight: "500" },
    { path: "../public/fonts/inter-semibold.ttf", weight: "600" },
    { path: "../public/fonts/inter-bold.ttf", weight: "700" },
    { path: "../public/fonts/inter-extrabold.ttf", weight: "800" },
  ],
  variable: "--font-inter",
  display: "swap",
});

const spaceGrotesk = localFont({
  src: [
    { path: "../public/fonts/manrope-wght--medium.ttf", weight: "500" },
    { path: "../public/fonts/manrope-wght--semibold.ttf", weight: "600" },
    { path: "../public/fonts/manrope-wght--bold.ttf", weight: "700" },
  ],
  variable: "--font-space-grotesk",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: "GAMVORA — Top Up Game Simpan & Praktis",
    template: "%s — GAMVORA",
  },
  description: site.description,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    siteName: site.name,
    locale: site.locale,
    title: "GAMVORA — Top Up Game Simpan & Praktis",
    description: site.description,
    url: site.url,
    images: [{ url: site.ogImage, width: 1200, height: 630, alt: "GAMVORA — Top Up Game Simpan & Praktis" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "GAMVORA — Top Up Game Simpan & Praktis",
    description: site.description,
    images: [site.ogImage],
  },
  robots: { index: true, follow: true },
  icons: { icon: "/favicon.svg" },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": `${site.url}/#org`,
        name: site.name,
        url: site.url,
        description: site.description,
      },
      {
        "@type": "WebSite",
        "@id": `${site.url}/#site`,
        url: site.url,
        name: site.name,
        inLanguage: "id-ID",
        publisher: { "@id": `${site.url}/#org` },
      },
      {
        "@type": "ItemList",
        name: "Game yang tersedia di GAMVORA",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Top Up Mobile Legends", url: `${site.url}/top-up/mobile-legends` },
          { "@type": "ListItem", position: 2, name: "Top Up Free Fire", url: `${site.url}/top-up/free-fire` },
          { "@type": "ListItem", position: 3, name: "Top Up PUBG Mobile", url: `${site.url}/top-up/pubg-mobile` },
          { "@type": "ListItem", position: 4, name: "Top Up Call of Duty: Mobile", url: `${site.url}/top-up/call-of-duty-mobile` },
          { "@type": "ListItem", position: 5, name: "Top Up Magic Chess: Go Go", url: `${site.url}/top-up/magic-chess-go-go` },
        ],
      },
    ],
  };

  return (
    <html lang="id" className={`${inter.variable} ${spaceGrotesk.variable} h-full antialiased`}>
      <head>
        <link rel="icon" href="/favicon.svg?v=2" type="image/svg+xml" />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      </head>
      <body className="min-h-full flex flex-col">
        <meta name="theme-color" content={site.themeColor} />
        {children}
      </body>
    </html>
  );
}

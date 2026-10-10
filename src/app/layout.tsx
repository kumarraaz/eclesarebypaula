import type { Metadata, Viewport } from "next";

import { SiteFooter } from "@/components/layout/SiteFooter";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { JsonLd } from "@/components/seo/JsonLd";
import { RevealObserver } from "@/components/ui/RevealObserver";
import { site, siteUrl } from "@/content/site";
import { cormorant, dmSans } from "@/lib/fonts";

import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: `${site.wordmark} ${site.wordmarkSuffix} — Wedding Planner in Spain`,
    template: `%s | ${site.wordmark} ${site.wordmarkSuffix}`,
  },
  description: site.shortDescription,
  applicationName: `${site.wordmark} ${site.wordmarkSuffix}`,
  authors: [{ name: site.legalName.value }],
  creator: site.legalName.value,
  // Icons come from src/app/{favicon.ico,icon.png,apple-icon.png} via Next's
  // file conventions, so they stay correct under a basePath.
  formatDetection: { telephone: false },
};

export const viewport: Viewport = {
  themeColor: "#F7F4EE",
  colorScheme: "light",
};

/**
 * Marks the document as JavaScript-capable before first paint. globals.css
 * only hides reveal targets under `.js`, so the page stays fully readable
 * when scripting is unavailable.
 */
const jsBootstrap = `document.documentElement.classList.add('js');`;

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      data-scroll-behavior="smooth"
      className={`${cormorant.variable} ${dmSans.variable}`}
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: jsBootstrap }} />
        <JsonLd />
      </head>
      <body className="min-h-dvh antialiased">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-[2px] focus:bg-charcoal focus:px-5 focus:py-3 focus:font-sans focus:text-xs focus:uppercase focus:tracking-[0.16em] focus:text-ivory"
        >
          Skip to content
        </a>
        <SiteHeader />
        <main id="main">{children}</main>
        <SiteFooter />
        <RevealObserver />
      </body>
    </html>
  );
}

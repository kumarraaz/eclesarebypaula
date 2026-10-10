import type { Metadata } from "next";

import { site, siteUrl } from "@/content/site";

const defaultOgImage = {
  url: "/images/og-image.webp",
  width: 1200,
  height: 630,
  alt: "A candlelit wedding table in Spain, set with ivory linen and cream roses at sunset.",
};

type SeoInput = {
  title: string;
  description: string;
  /** Path with a leading slash, e.g. "/weddings/spanish-weddings". */
  path: string;
  /** Override the social share image. */
  image?: { url: string; width: number; height: number; alt: string };
  /** Reserved for the second locale; see src/content/README.md. */
  locale?: "en" | "es";
  noIndex?: boolean;
};

const localeTag = { en: "en_GB", es: "es_ES" } as const;

export function buildMetadata({
  title,
  description,
  path,
  image = defaultOgImage,
  locale = "en",
  noIndex = false,
}: SeoInput): Metadata {
  const url = `${siteUrl}${path === "/" ? "" : path}`;
  const fullTitle =
    path === "/"
      ? `${site.wordmark} ${site.wordmarkSuffix} — ${title}`
      : `${title} | ${site.wordmark} ${site.wordmarkSuffix}`;

  return {
    title: fullTitle,
    description,
    alternates: { canonical: url },
    openGraph: {
      type: "website",
      siteName: `${site.wordmark} ${site.wordmarkSuffix}`,
      title: fullTitle,
      description,
      url,
      locale: localeTag[locale],
      images: [image],
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
      images: [image.url],
    },
    ...(noIndex ? { robots: { index: false, follow: true } } : {}),
  };
}

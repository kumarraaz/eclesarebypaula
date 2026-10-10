import type { ImageKey } from "@/lib/images";

/**
 * Every locale provides the same shaped dictionary. English is the only
 * locale implemented today; see src/content/README.md for how to add `es`.
 */
export type Locale = "en" | "es";

export type Cta = {
  label: string;
  href: string;
};

export type WeddingStyleId = "spanish" | "french-inspired" | "indian";

export type WeddingStyle = {
  id: WeddingStyleId;
  slug: string;
  /** Short label used in navigation and footers. */
  navLabel: string;
  /** Full title used on the style's own page. */
  title: string;
  /** One-line summary used on cards. */
  summary: string;
  /** Longer introduction used at the top of the style page. */
  intro: string;
  eyebrow: string;
  ctaLabel: string;
  /** Tailwind token name for the 1px accent rule and label colour. */
  accent: "spanish" | "french" | "indian";
  /** Card / hero image. `null` means no suitable photograph has been
   *  supplied yet and a labelled slot is rendered instead. */
  image: ImageKey | null;
  /** Shown inside the slot so it is obvious what photography is needed. */
  imageBrief: string;
  /** Bullet points describing what the style covers. */
  highlights: string[];
  /** Short notes shown as a two-column editorial list on the style page. */
  considerations: { title: string; body: string }[];
  seo: {
    title: string;
    description: string;
  };
};

export type Service = {
  number: string;
  title: string;
  summary: string;
  includes: string[];
};

export type ProcessStep = {
  number: string;
  title: string;
  body: string;
};

export type PortfolioItem = {
  slug: string;
  title: string;
  destination: string;
  style: string;
  description: string;
  image: ImageKey | null;
  imageBrief: string;
  /** Crop shape for the grid. Pick the one closest to the source photo so it
   *  is not stretched or heavily cropped. */
  ratio: "portrait" | "tall" | "square" | "landscape";
  /** True until a real client project replaces this entry. Drives the
   *  "demonstration content" label — set to false and the label disappears. */
  placeholder: boolean;
};

export type Testimonial = {
  quote: string;
  attribution: string;
  context?: string;
};

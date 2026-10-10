import type { PortfolioItem, Testimonial } from "./types";

/**
 * ──────────────────────────────────────────────────────────────────────
 * DEMONSTRATION CONTENT
 *
 * Every entry below is marked `placeholder: true`. These are layout
 * examples only — no real couple, venue or completed project is described.
 * They render with a visible "Sample layout" label.
 *
 * To publish a real project: replace the fields, set `placeholder: false`,
 * add the photography to /public/images and re-run `python3 scripts/images.py`.
 * ──────────────────────────────────────────────────────────────────────
 */
export const portfolio: PortfolioItem[] = [
  {
    slug: "coastal-finca",
    title: "Coastal finca, late September",
    destination: "Destination to be confirmed",
    style: "Spanish",
    description:
      "An example of how a full-day celebration is presented — ceremony, aperitivo and a single long table under the trees.",
    image: "portfolio_01",
    imageBrief: "Full-day Spanish finca wedding, ceremony through to dinner.",
    ratio: "tall",
    placeholder: true,
  },
  {
    slug: "walled-garden",
    title: "Walled garden dinner",
    destination: "Destination to be confirmed",
    style: "French-inspired",
    description:
      "A quieter palette: ivory linen, low candlelight and florals kept deliberately restrained.",
    image: "portfolio_02",
    imageBrief: "Garden or terrace dinner, ivory and muted green palette.",
    ratio: "portrait",
    placeholder: true,
  },
  {
    slug: "three-day-celebration",
    title: "Three-day celebration",
    destination: "Destination to be confirmed",
    style: "Indian",
    description:
      "How a multi-day wedding is presented — each function shown in sequence with its own setting and detail.",
    image: null,
    imageBrief:
      "Mehndi, sangeet and ceremony at a Spanish venue. Mandap, attire and ceremony detail.",
    ratio: "portrait",
    placeholder: true,
  },
  {
    slug: "courtyard-ceremony",
    title: "Courtyard ceremony",
    destination: "Destination to be confirmed",
    style: "Spanish",
    description:
      "A smaller celebration in a historic courtyard, built around the hour the light drops.",
    image: "portfolio_04",
    imageBrief: "Intimate courtyard ceremony, stone architecture, candlelight.",
    ratio: "square",
    placeholder: true,
  },
  {
    slug: "multicultural-weekend",
    title: "Multicultural weekend",
    destination: "Destination to be confirmed",
    style: "Multicultural",
    description:
      "Two sets of traditions across one weekend, planned as a single schedule.",
    image: "portfolio_05",
    imageBrief:
      "Two ceremonies in different styles at one venue across a weekend.",
    ratio: "landscape",
    placeholder: true,
  },
];

/**
 * Testimonials are published ONLY from verified client reviews.
 * This array is intentionally empty — the section renders nothing while it is.
 * Add real, attributable quotes here and the section appears automatically.
 * Never populate this with invented or illustrative copy.
 */
export const testimonials: Testimonial[] = [];

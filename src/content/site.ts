/**
 * Brand, navigation and contact configuration.
 *
 * ──────────────────────────────────────────────────────────────────────
 * PLACEHOLDERS
 * Anything with `pending: true` has NOT been confirmed by the client and is
 * rendered on the page in a visibly provisional style. Replace the value and
 * set `pending: false` to publish it.
 * ──────────────────────────────────────────────────────────────────────
 */

export type PendingValue = {
  value: string;
  pending: boolean;
};

const pending = (value: string): PendingValue => ({ value, pending: true });
const confirmed = (value: string): PendingValue => ({
  value,
  pending: false,
});

/**
 * Canonical origin. Set NEXT_PUBLIC_SITE_URL in the hosting environment
 * (e.g. https://www.eclesare.com) before going live — the fallback below uses
 * the reserved `.example` TLD on purpose so a placeholder can never be mistaken
 * for a real address.
 */
export const siteUrl = (
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://eclesare.example"
).replace(/\/$/, "");

export const siteUrlIsPlaceholder = !process.env.NEXT_PUBLIC_SITE_URL;

export const site = {
  /** Wordmark, set in Cormorant Garamond with wide tracking. */
  wordmark: "Eclesare",
  wordmarkSuffix: "by Paula",
  legalName: confirmed("Eclesare by Paula"),
  discipline: "Wedding Planning & Design",
  shortDescription:
    "Wedding planning and design for couples marrying in Spain — Spanish, French-inspired and Indian celebrations, planned around your story.",

  contact: {
    email: pending("hello@your-domain.com"),
    phone: pending("+34 000 000 000"),
    /** Service base. Confirm before publishing. */
    base: pending("Spain"),
    /** Where the studio actually works. Keep this honest — it feeds the
     *  service-area wording in the SEO copy. */
    serviceAreas: pending("Mainland Spain and the Balearic Islands"),
    instagram: pending("https://instagram.com/your-handle"),
    instagramHandle: pending("@your-handle"),
  },

  nav: [
    { label: "Weddings", href: "/weddings" },
    { label: "Services", href: "/services" },
    { label: "Portfolio", href: "/portfolio" },
    { label: "About", href: "/about" },
    { label: "Contact", href: "/contact" },
  ],

  enquireCta: { label: "Enquire", href: "/contact" },

  legalLinks: [
    { label: "Privacy policy", href: "/privacy" },
    { label: "Cookie preferences", href: "/privacy#cookies" },
  ],
} as const;

export type Site = typeof site;

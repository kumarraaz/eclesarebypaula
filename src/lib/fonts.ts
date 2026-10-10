import localFont from "next/font/local";

/**
 * Fonts are self-hosted rather than loaded from fonts.googleapis.com.
 *
 * Reasons, in order of importance for this project:
 *  1. No third-party request from an EU visitor's browser. Embedding Google
 *     Fonts has been found to breach GDPR in several EU rulings; self-hosting
 *     removes the question entirely.
 *  2. One less DNS lookup and TLS handshake on the critical path — meaningfully
 *     better LCP on mobile.
 *  3. The site keeps working if Google Fonts is unreachable.
 *
 * Both are variable fonts, latin subset, under the SIL Open Font License
 * (licence text sits alongside the files in src/fonts/).
 */

export const cormorant = localFont({
  src: [
    {
      path: "../fonts/cormorant-garamond-variable-latin.woff2",
      weight: "300 700",
      style: "normal",
    },
    {
      path: "../fonts/cormorant-garamond-variable-latin-italic.woff2",
      weight: "300 700",
      style: "italic",
    },
  ],
  variable: "--font-cormorant",
  display: "swap",
  preload: true,
  fallback: ["Georgia", "Times New Roman", "serif"],
  adjustFontFallback: "Times New Roman",
});

export const dmSans = localFont({
  src: [
    {
      path: "../fonts/dm-sans-variable-latin.woff2",
      weight: "100 1000",
      style: "normal",
    },
    {
      path: "../fonts/dm-sans-variable-latin-italic.woff2",
      weight: "100 1000",
      style: "italic",
    },
  ],
  variable: "--font-dm-sans",
  display: "swap",
  preload: true,
  fallback: ["system-ui", "Segoe UI", "Helvetica Neue", "Arial", "sans-serif"],
  adjustFontFallback: "Arial",
});

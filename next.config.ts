import type { NextConfig } from "next";

/**
 * Two build modes:
 *
 *  - default (`npm run build`)      → server build, works on Vercel/Node with
 *                                     full next/image optimisation.
 *  - `NEXT_EXPORT=true npm run build` → fully static `out/` directory that can be
 *                                     dropped on any static host (Netlify, S3,
 *                                     cPanel, GitHub Pages). Image optimisation
 *                                     is disabled because it needs a server;
 *                                     all source images are already pre-sized
 *                                     and served as WebP.
 */
const isStaticExport = process.env.NEXT_EXPORT === "true";

/**
 * Optional sub-path prefix, e.g. NEXT_BASE_PATH=/site. Only needed when the
 * export is served from a subdirectory — the shareable preview uses it so that
 * no path segment sits at the host root (some hosts reserve root-level names
 * beginning with an underscore, which Next's `_next/` directory would hit).
 * A normal deploy leaves it unset.
 */
const basePath = process.env.NEXT_BASE_PATH ?? "";

const nextConfig: NextConfig = {
  // `trailingSlash` makes the export emit `about/index.html` rather than
  // `about.html`, so plain static hosts (which do no extension fallback)
  // resolve `/about/` without rewrite rules.
  ...(isStaticExport
    ? { output: "export" as const, trailingSlash: true }
    : {}),
  ...(basePath ? { basePath, assetPrefix: basePath } : {}),
  // Exposed so <img src> and next/image with `unoptimized` can prefix
  // /public assets themselves — neither does it automatically.
  env: { NEXT_PUBLIC_BASE_PATH: basePath },
  images: {
    unoptimized: isStaticExport,
    formats: ["image/avif", "image/webp"],
  },
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;

import type { MetadataRoute } from "next";

import { siteUrl } from "@/content/site";
import { weddingStyles } from "@/content/weddings";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const staticRoutes: { path: string; priority: number; changeFrequency: "monthly" | "yearly" }[] =
    [
      { path: "/", priority: 1, changeFrequency: "monthly" },
      { path: "/weddings", priority: 0.9, changeFrequency: "monthly" },
      { path: "/services", priority: 0.8, changeFrequency: "monthly" },
      { path: "/portfolio", priority: 0.8, changeFrequency: "monthly" },
      { path: "/about", priority: 0.6, changeFrequency: "yearly" },
      { path: "/contact", priority: 0.9, changeFrequency: "yearly" },
    ];

  return [
    ...staticRoutes.map((route) => ({
      url: `${siteUrl}${route.path === "/" ? "" : route.path}`,
      lastModified: now,
      changeFrequency: route.changeFrequency,
      priority: route.priority,
    })),
    ...weddingStyles.map((style) => ({
      url: `${siteUrl}/weddings/${style.slug}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.85,
    })),
  ];
}

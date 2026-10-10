import { site, siteUrl } from "@/content/site";
import { weddingStyles } from "@/content/weddings";

/**
 * Organisation + website structured data.
 *
 * Only confirmed values are emitted. Anything still marked `pending` in
 * src/content/site.ts (email, phone, address, service areas, Instagram) is
 * deliberately left out rather than published as a machine-readable claim —
 * incorrect structured data is worse than none, and Google penalises it.
 *
 * Once those values are real, they appear here automatically.
 */
export function JsonLd() {
  const { contact } = site;

  const graph: Record<string, unknown>[] = [
    {
      "@type": "ProfessionalService",
      "@id": `${siteUrl}/#organisation`,
      name: `${site.wordmark} ${site.wordmarkSuffix}`,
      description: site.shortDescription,
      url: siteUrl,
      image: `${siteUrl}/images/og-image.webp`,
      knowsAbout: [
        "Destination wedding planning",
        "Spanish weddings",
        "French-inspired weddings",
        "Indian destination weddings",
        "Multicultural weddings",
      ],
      ...(contact.email.pending ? {} : { email: contact.email.value }),
      ...(contact.phone.pending ? {} : { telephone: contact.phone.value }),
      ...(contact.instagram.pending ? {} : { sameAs: [contact.instagram.value] }),
      ...(contact.serviceAreas.pending
        ? {}
        : { areaServed: contact.serviceAreas.value }),
      hasOfferCatalog: {
        "@type": "OfferCatalog",
        name: "Wedding experiences",
        itemListElement: weddingStyles.map((style) => ({
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: style.title,
            description: style.summary,
            url: `${siteUrl}/weddings/${style.slug}`,
          },
        })),
      },
    },
    {
      "@type": "WebSite",
      "@id": `${siteUrl}/#website`,
      url: siteUrl,
      name: `${site.wordmark} ${site.wordmarkSuffix}`,
      inLanguage: "en",
      publisher: { "@id": `${siteUrl}/#organisation` },
    },
  ];

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify({ "@context": "https://schema.org", "@graph": graph }),
      }}
    />
  );
}

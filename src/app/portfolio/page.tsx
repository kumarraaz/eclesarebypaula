import type { Metadata } from "next";

import { PageHeader } from "@/components/layout/PageHeader";
import { FinalCta } from "@/components/sections/FinalCta";
import { PortfolioGrid } from "@/components/sections/Portfolio";
import { Container, Section } from "@/components/ui/primitives";
import { copy } from "@/content/copy";
import { portfolio } from "@/content/portfolio";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Portfolio — Weddings in Spain",
  description:
    "A look at how each wedding is presented: the setting, the style and the thinking behind it. Spanish, French-inspired, Indian and multicultural celebrations.",
  path: "/portfolio",
});

export default function PortfolioPage() {
  const { portfolio: p } = copy;
  const anyPlaceholder = portfolio.some((item) => item.placeholder);

  return (
    <>
      <PageHeader
        align="split"
        eyebrow={p.eyebrow}
        title={p.headline}
        lede={p.body}
      />

      <Section spacing="loose" className="bg-ivory">
        <Container>
          {anyPlaceholder && (
            <p
              data-reveal
              className="mb-16 max-w-[64ch] border-l border-olive/30 pl-6 text-[0.9rem] leading-relaxed text-charcoal/60"
            >
              <strong className="font-normal text-charcoal/80">
                Demonstration content.
              </strong>{" "}
              Every entry below shows how a completed wedding will be laid out —
              the title, destination, style and description are layout examples.
              No real couple, venue, supplier or completed project is described
              here. They are replaced one by one as client work becomes
              publishable.
            </p>
          )}

          <PortfolioGrid items={portfolio} />
        </Container>
      </Section>

      <FinalCta />
    </>
  );
}

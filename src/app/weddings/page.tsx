import type { Metadata } from "next";

import { PageHeader } from "@/components/layout/PageHeader";
import { FinalCta } from "@/components/sections/FinalCta";
import { StyleCard } from "@/components/sections/WeddingStyles";
import {
  ButtonLink,
  Container,
  RuledEyebrow,
  Section,
  SectionHeading,
} from "@/components/ui/primitives";
import { copy } from "@/content/copy";
import { weddingStyles } from "@/content/weddings";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Wedding Experiences",
  description:
    "Spanish, French-inspired and Indian weddings planned in Spain — each with its own suppliers, schedule and visual language, and often combined into one multicultural celebration.",
  path: "/weddings",
});

export default function WeddingsPage() {
  const { weddingsIndex } = copy;

  return (
    <>
      <PageHeader
        align="split"
        eyebrow={weddingsIndex.eyebrow}
        title={weddingsIndex.headline}
        lede={weddingsIndex.body}
      />

      <Section spacing="loose" className="bg-ivory">
        <Container>
          <div className="grid gap-x-8 gap-y-16 sm:grid-cols-2 lg:grid-cols-3">
            {weddingStyles.map((style, index) => (
              <StyleCard key={style.id} style={style} index={index} />
            ))}
          </div>
        </Container>
      </Section>

      <Section
        spacing="default"
        labelledBy="multicultural-heading"
        className="border-t border-charcoal/10 bg-sand-light"
      >
        <Container>
          <div data-reveal className="grid gap-10 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-5">
              <RuledEyebrow>Multicultural weddings</RuledEyebrow>
              <SectionHeading
                id="multicultural-heading"
                size="small"
                className="mt-7 max-w-[14ch]"
              >
                {weddingsIndex.multicultural.headline}
              </SectionHeading>
            </div>
            <div className="lg:col-span-6 lg:col-start-7">
              <p className="max-w-[54ch] text-[1.0125rem] leading-[1.8] text-charcoal-muted">
                {weddingsIndex.multicultural.body}
              </p>
              <ButtonLink
                href={weddingsIndex.multicultural.cta.href}
                variant="outline"
                className="mt-9"
              >
                {weddingsIndex.multicultural.cta.label}
              </ButtonLink>
            </div>
          </div>
        </Container>
      </Section>

      <FinalCta />
    </>
  );
}

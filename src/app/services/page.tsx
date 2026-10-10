import type { Metadata } from "next";

import { PageHeader } from "@/components/layout/PageHeader";
import { FinalCta } from "@/components/sections/FinalCta";
import { ProcessSection } from "@/components/sections/Process";
import { ServiceList } from "@/components/sections/Services";
import { Container, Section } from "@/components/ui/primitives";
import { copy } from "@/content/copy";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Services — Wedding Planning & Design",
  description:
    "Full wedding planning, design and styling, multi-day celebrations and guest experience for destination weddings in Spain.",
  path: "/services",
});

export default function ServicesPage() {
  const { services: s } = copy;

  return (
    <>
      <PageHeader
        align="split"
        eyebrow={s.eyebrow}
        title={s.headline}
        lede={s.body}
      />

      <Section spacing="loose" className="bg-ivory">
        <Container>
          <ServiceList />
          <p
            data-reveal
            className="mt-14 max-w-[58ch] border-l border-olive/30 pl-6 text-[0.95rem] leading-relaxed text-charcoal/65"
          >
            {s.note}
          </p>
        </Container>
      </Section>

      <ProcessSection />
      <FinalCta />
    </>
  );
}

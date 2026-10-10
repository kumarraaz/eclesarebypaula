import type { Metadata } from "next";

import { PageHeader } from "@/components/layout/PageHeader";
import { FinalCta } from "@/components/sections/FinalCta";
import { EditorialImage } from "@/components/ui/media";
import {
  ButtonLink,
  Container,
  PlaceholderTag,
  RuledEyebrow,
  Section,
  SectionHeading,
  revealDelay,
} from "@/components/ui/primitives";
import { copy } from "@/content/copy";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "About — Wedding Planning in Spain",
  description:
    "How we work: personal attention to what each family needs, and the precision that makes a destination wedding in Spain run without friction.",
  path: "/about",
});

/** Fields the client still has to supply. Rendered as an explicit list so
 *  nothing is invented in the meantime. */
const founderFields = [
  { label: "Name", value: "To be confirmed" },
  { label: "Role", value: "Founder & lead planner" },
  { label: "Based in", value: "To be confirmed" },
  { label: "Languages", value: "To be confirmed" },
  { label: "Experience", value: "To be confirmed" },
];

export default function AboutPage() {
  const { about } = copy;

  return (
    <>
      <PageHeader
        align="split"
        eyebrow={about.eyebrow}
        title={about.headline}
        lede={about.body[0]}
      />

      <Section spacing="loose" className="bg-ivory">
        <Container>
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
            <div data-reveal className="lg:col-span-5">
              <div className="group">
                <EditorialImage
                  image="about_founder"
                  alt="A wedding planner finishing a place setting at a candlelit table."
                  ratio="portrait"
                  sizes="(min-width: 1024px) 40vw, 100vw"
                  priority
                />
              </div>
              <p className="mt-5 text-[0.8rem] leading-relaxed text-charcoal/50">
                Placeholder portrait — replace with a photograph of the founder.
              </p>

              <dl className="mt-10 border-t border-charcoal/12">
                {founderFields.map((field) => (
                  <div
                    key={field.label}
                    className="flex items-baseline justify-between gap-6 border-b border-charcoal/12 py-4"
                  >
                    <dt className="eyebrow text-olive">{field.label}</dt>
                    <dd className="text-right font-display text-[1.25rem] text-charcoal/75">
                      {field.value}
                    </dd>
                  </div>
                ))}
              </dl>
              <div className="mt-6">
                <PlaceholderTag>
                  Founder biography awaiting client input
                </PlaceholderTag>
              </div>
            </div>

            <div
              data-reveal
              style={revealDelay(120)}
              className="lg:col-span-6 lg:col-start-7"
            >
              {about.body.slice(1).map((paragraph) => (
                <p
                  key={paragraph}
                  className="max-w-[54ch] text-[1.0625rem] leading-[1.85] text-charcoal-muted [&:not(:first-child)]:mt-7"
                >
                  {paragraph}
                </p>
              ))}

              <div className="mt-14">
                <RuledEyebrow>{about.philosophyHeadline}</RuledEyebrow>
                <div className="mt-8">
                  {about.philosophy.map((item) => (
                    <div
                      key={item.title}
                      className="border-t border-charcoal/12 py-7 last:border-b"
                    >
                      <h2 className="font-display text-[1.5rem] leading-tight text-charcoal">
                        {item.title}
                      </h2>
                      <p className="mt-3 max-w-[50ch] text-[0.95rem] leading-relaxed text-charcoal-muted">
                        {item.body}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              <ButtonLink href={about.cta.href} className="mt-10">
                {about.cta.label}
              </ButtonLink>
            </div>
          </div>
        </Container>
      </Section>

      {/* Space reserved for genuine proof. Nothing is claimed until it exists. */}
      <Section
        spacing="default"
        labelledBy="trust-heading"
        className="border-t border-charcoal/10 bg-sand-light"
      >
        <Container>
          <div data-reveal className="grid gap-10 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-4">
              <RuledEyebrow>Credentials</RuledEyebrow>
              <SectionHeading
                id="trust-heading"
                size="small"
                className="mt-7 max-w-[14ch]"
              >
                Proof, once there is proof.
              </SectionHeading>
            </div>
            <div className="lg:col-span-7 lg:col-start-6">
              <p className="max-w-[56ch] text-[0.98rem] leading-relaxed text-charcoal-muted">
                This section is reserved for things that can be verified: client
                reviews with names attached, venues actually worked with,
                professional memberships and press. Nothing appears here until
                it is real.
              </p>
              <div className="mt-7">
                <PlaceholderTag>
                  Reserved — no claims published yet
                </PlaceholderTag>
              </div>
            </div>
          </div>
        </Container>
      </Section>

      <FinalCta />
    </>
  );
}

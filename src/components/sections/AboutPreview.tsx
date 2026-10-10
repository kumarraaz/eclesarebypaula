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

export function AboutPreview() {
  const { about } = copy.home;
  const { about: aboutCopy } = copy;

  return (
    <Section
      id="about"
      labelledBy="about-heading"
      spacing="loose"
      className="bg-ivory"
    >
      <Container>
        <div className="grid gap-12 lg:grid-cols-12 lg:items-center lg:gap-16">
          <div data-reveal className="lg:col-span-5">
            <div className="group relative">
              <EditorialImage
                image="about_founder"
                alt="A wedding planner in black finishing a place setting on a candlelit table."
                ratio="portrait"
                sizes="(min-width: 1024px) 40vw, 100vw"
              />
            </div>
            <p className="mt-5 text-[0.8rem] leading-relaxed text-charcoal/50">
              Placeholder portrait. Replace with a photograph of the founder —
              see <code className="font-mono">src/content/README.md</code>.
            </p>
          </div>

          <div
            data-reveal
            style={revealDelay(120)}
            className="lg:col-span-6 lg:col-start-7"
          >
            <RuledEyebrow>{about.eyebrow}</RuledEyebrow>
            <SectionHeading id="about-heading" className="mt-7 max-w-[14ch]">
              {about.headline}
            </SectionHeading>

            {aboutCopy.body.map((paragraph) => (
              <p
                key={paragraph}
                className="mt-7 max-w-[52ch] text-[1.0125rem] leading-[1.8] text-charcoal-muted"
              >
                {paragraph}
              </p>
            ))}

            <dl className="mt-10 grid gap-6 border-t border-charcoal/12 pt-8 sm:grid-cols-2">
              <div>
                <dt className="eyebrow text-olive">Founder</dt>
                <dd className="mt-2 font-display text-[1.4rem] text-charcoal/80">
                  Name to be confirmed
                </dd>
              </div>
              <div>
                <dt className="eyebrow text-olive">Languages</dt>
                <dd className="mt-2 font-display text-[1.4rem] text-charcoal/80">
                  To be confirmed
                </dd>
              </div>
            </dl>

            <div className="mt-6">
              <PlaceholderTag>
                Founder details awaiting client input
              </PlaceholderTag>
            </div>

            <ButtonLink href={about.cta.href} variant="outline" className="mt-9">
              {about.cta.label}
            </ButtonLink>
          </div>
        </div>
      </Container>
    </Section>
  );
}

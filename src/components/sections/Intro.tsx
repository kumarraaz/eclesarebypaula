import { EditorialImage } from "@/components/ui/media";
import {
  Container,
  RuledEyebrow,
  Section,
  SectionHeading,
  revealDelay,
} from "@/components/ui/primitives";
import { copy } from "@/content/copy";

const { intro } = copy.home;

export function Intro() {
  return (
    <Section spacing="loose" labelledBy="intro-heading" className="bg-ivory">
      <Container>
        <div className="grid items-center gap-12 lg:grid-cols-12 lg:gap-16">
          {/* Image sits first on desktop, second on mobile — the words should
              land before the picture on a phone. */}
          <div
            data-reveal
            className="order-2 lg:order-1 lg:col-span-5 xl:col-span-5"
          >
            <div className="group relative">
              <EditorialImage
                image="intro_long_table"
                alt={intro.imageAlt}
                ratio="tall"
                sizes="(min-width: 1024px) 40vw, 100vw"
              />
              {/* Thin offset rule — structure without a card or a shadow. */}
              <div
                aria-hidden="true"
                className="absolute -bottom-5 -right-5 -z-10 hidden h-full w-full border border-sand sm:block"
              />
            </div>
          </div>

          <div
            data-reveal
            style={revealDelay(120)}
            className="order-1 lg:order-2 lg:col-span-6 lg:col-start-7"
          >
            <RuledEyebrow>{intro.eyebrow}</RuledEyebrow>
            <SectionHeading id="intro-heading" className="mt-7 max-w-[15ch]">
              {intro.headline}
            </SectionHeading>
            {intro.body.map((paragraph) => (
              <p
                key={paragraph}
                className="mt-8 max-w-[52ch] text-[1.0625rem] leading-[1.8] text-charcoal-muted sm:text-lg"
              >
                {paragraph}
              </p>
            ))}
            <p className="mt-10 max-w-[46ch] border-l border-sand pl-6 font-display text-[1.4rem] italic leading-snug text-charcoal/80 sm:text-[1.6rem]">
              {intro.aside}
            </p>
          </div>
        </div>
      </Container>
    </Section>
  );
}

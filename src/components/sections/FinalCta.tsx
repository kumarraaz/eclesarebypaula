import {
  ButtonLink,
  Container,
  Section,
  SectionHeading,
} from "@/components/ui/primitives";
import { copy } from "@/content/copy";

export function FinalCta() {
  const { finalCta } = copy.home;

  return (
    <Section
      labelledBy="final-cta-heading"
      spacing="loose"
      className="border-t border-charcoal/10 bg-sand"
    >
      <Container>
        <div data-reveal className="mx-auto max-w-3xl text-center">
          <span
            aria-hidden="true"
            className="mx-auto block h-10 w-px bg-olive/40"
          />
          <SectionHeading
            id="final-cta-heading"
            size="large"
            className="mt-10 text-charcoal"
          >
            {finalCta.headline}
          </SectionHeading>
          <p className="mx-auto mt-7 max-w-[46ch] text-[1.0625rem] leading-relaxed text-charcoal/70 sm:text-lg">
            {finalCta.body}
          </p>
          <ButtonLink href={finalCta.cta.href} className="mt-10">
            {finalCta.cta.label}
          </ButtonLink>
        </div>
      </Container>
    </Section>
  );
}

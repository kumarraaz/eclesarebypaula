import {
  Container,
  RuledEyebrow,
  Section,
  SectionHeading,
} from "@/components/ui/primitives";
import { testimonials } from "@/content/portfolio";

/**
 * Renders nothing while `testimonials` is empty — which it is, and must stay,
 * until real attributable client reviews exist. No illustrative quotes, no
 * "example" testimonials, no invented names.
 *
 * Add entries to src/content/portfolio.ts and this section appears.
 */
export function TestimonialsSection() {
  if (testimonials.length === 0) return null;

  return (
    <Section
      labelledBy="testimonials-heading"
      spacing="loose"
      className="border-t border-charcoal/10 bg-sand-light"
    >
      <Container width="narrow">
        <RuledEyebrow className="justify-center">In their words</RuledEyebrow>
        <SectionHeading
          id="testimonials-heading"
          size="small"
          className="mt-7 text-center"
        >
          What couples say
        </SectionHeading>

        <div className="mt-14 flex flex-col gap-14">
          {testimonials.map((testimonial) => (
            <figure key={testimonial.attribution} data-reveal>
              <blockquote className="text-center font-display text-[1.6rem] italic leading-snug text-charcoal/85 sm:text-[1.9rem]">
                {testimonial.quote}
              </blockquote>
              <figcaption className="eyebrow mt-6 text-center text-olive">
                {testimonial.attribution}
                {testimonial.context ? ` · ${testimonial.context}` : ""}
              </figcaption>
            </figure>
          ))}
        </div>
      </Container>
    </Section>
  );
}

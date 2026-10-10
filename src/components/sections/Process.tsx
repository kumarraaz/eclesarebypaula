import { EditorialImage } from "@/components/ui/media";
import {
  Container,
  RuledEyebrow,
  Section,
  SectionHeading,
  revealDelay,
} from "@/components/ui/primitives";
import { copy } from "@/content/copy";
import { processSteps } from "@/content/services";

export function ProcessSection({ withImage = true }: { withImage?: boolean }) {
  const { process } = copy.home;

  return (
    <Section
      id="process"
      labelledBy="process-heading"
      spacing="loose"
      className="border-t border-charcoal/10 bg-sand-light"
    >
      <Container>
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <div data-reveal className="lg:sticky lg:top-32">
              <RuledEyebrow>{process.eyebrow}</RuledEyebrow>
              <SectionHeading
                id="process-heading"
                className="mt-7 max-w-[13ch]"
              >
                {process.headline}
              </SectionHeading>
              <p className="mt-7 max-w-[40ch] text-[0.98rem] leading-relaxed text-charcoal-muted">
                {process.body}
              </p>

              {withImage && (
                <div className="group mt-12 hidden lg:block">
                  <EditorialImage
                    image="process_design_plan"
                    alt="A wedding design plan open on a table, showing a hand-drawn layout beside a photograph of the finished room."
                    ratio="landscape"
                    sizes="(min-width: 1024px) 38vw, 100vw"
                  />
                </div>
              )}
            </div>
          </div>

          <ol className="lg:col-span-6 lg:col-start-7">
            {processSteps.map((step, index) => (
              <li
                key={step.number}
                data-reveal
                style={revealDelay(index * 80)}
                className="border-t border-charcoal/12 py-9 last:border-b lg:py-11"
              >
                <div className="flex gap-6 sm:gap-8">
                  <span
                    aria-hidden="true"
                    className="font-display text-[2rem] leading-none text-olive/60 sm:text-[2.4rem]"
                  >
                    {step.number}
                  </span>
                  <div>
                    <h3 className="font-display text-[1.7rem] leading-tight text-charcoal sm:text-[1.9rem]">
                      <span className="sr-only">{`Step ${step.number}: `}</span>
                      {step.title}
                    </h3>
                    <p className="mt-4 max-w-[46ch] text-[0.95rem] leading-relaxed text-charcoal-muted">
                      {step.body}
                    </p>
                  </div>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </Container>
    </Section>
  );
}

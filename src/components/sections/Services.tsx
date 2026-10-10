import {
  Container,
  RuledEyebrow,
  Section,
  SectionHeading,
  TextLink,
  revealDelay,
} from "@/components/ui/primitives";
import { copy } from "@/content/copy";
import { services } from "@/content/services";

export function ServiceList({ withIncludes = true }: { withIncludes?: boolean }) {
  return (
    <div className="grid gap-x-12 gap-y-px sm:grid-cols-2">
      {services.map((service, index) => (
        <div
          key={service.number}
          data-reveal
          style={revealDelay((index % 2) * 90)}
          className="border-t border-charcoal/12 py-9 lg:py-11"
        >
          <div className="flex items-baseline gap-5">
            <span className="eyebrow text-olive">{service.number}</span>
            <h3 className="font-display text-[1.7rem] leading-tight text-charcoal sm:text-[1.9rem]">
              {service.title}
            </h3>
          </div>
          <p className="mt-4 max-w-[44ch] pl-[3.1rem] text-[0.95rem] leading-relaxed text-charcoal-muted">
            {service.summary}
          </p>
          {withIncludes && (
            <ul className="mt-6 flex flex-col gap-2.5 pl-[3.1rem]">
              {service.includes.map((item) => (
                <li
                  key={item}
                  className="flex items-start gap-3 text-[0.9rem] leading-relaxed text-charcoal/70"
                >
                  <span
                    aria-hidden="true"
                    className="mt-[0.7em] h-px w-3 shrink-0 bg-olive/50"
                  />
                  {item}
                </li>
              ))}
            </ul>
          )}
        </div>
      ))}
    </div>
  );
}

export function ServicesSection() {
  const { services: s } = copy.home;

  return (
    <Section
      id="services"
      labelledBy="services-heading"
      spacing="loose"
      className="bg-ivory"
    >
      <Container>
        <div data-reveal className="grid gap-8 lg:grid-cols-12 lg:gap-12">
          <div className="lg:col-span-5">
            <RuledEyebrow>{s.eyebrow}</RuledEyebrow>
            <SectionHeading id="services-heading" className="mt-7 max-w-[12ch]">
              {s.headline}
            </SectionHeading>
            <p className="mt-7 max-w-[38ch] text-[0.98rem] leading-relaxed text-charcoal-muted">
              {s.body}
            </p>
            <TextLink href={s.cta.href} className="mt-8">
              {s.cta.label}
            </TextLink>
          </div>

          <div className="lg:col-span-6 lg:col-start-7">
            <ServiceList withIncludes={false} />
          </div>
        </div>
      </Container>
    </Section>
  );
}

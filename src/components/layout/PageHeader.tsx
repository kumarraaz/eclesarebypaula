import type { ReactNode } from "react";

import {
  Container,
  RuledEyebrow,
  SectionHeading,
  revealDelay,
} from "@/components/ui/primitives";

/**
 * Standard opening block for every inner page. Top padding clears the fixed
 * header; the h1 is capped in measure so it keeps an editorial ragged edge.
 */
export function PageHeader({
  eyebrow,
  title,
  lede,
  children,
  align = "left",
}: {
  eyebrow: string;
  title: string;
  lede?: string;
  children?: ReactNode;
  align?: "left" | "split";
}) {
  return (
    <section className="border-b border-charcoal/10 bg-ivory pb-16 pt-32 sm:pb-20 sm:pt-40 lg:pb-24 lg:pt-48">
      <Container>
        {align === "split" ? (
          <div className="grid gap-8 lg:grid-cols-12 lg:items-end lg:gap-12">
            <div data-reveal className="lg:col-span-7">
              <RuledEyebrow>{eyebrow}</RuledEyebrow>
              <SectionHeading as="h1" size="large" className="mt-7 max-w-[16ch]">
                {title}
              </SectionHeading>
            </div>
            {lede && (
              <p
                data-reveal
                style={revealDelay(120)}
                className="max-w-[48ch] text-[1.0125rem] leading-[1.8] text-charcoal-muted lg:col-span-4 lg:col-start-9"
              >
                {lede}
              </p>
            )}
          </div>
        ) : (
          <div data-reveal className="max-w-[60rem]">
            <RuledEyebrow>{eyebrow}</RuledEyebrow>
            <SectionHeading as="h1" size="large" className="mt-7 max-w-[16ch]">
              {title}
            </SectionHeading>
            {lede && (
              <p className="mt-8 max-w-[56ch] text-[1.0625rem] leading-[1.8] text-charcoal-muted sm:text-lg">
                {lede}
              </p>
            )}
          </div>
        )}
        {children}
      </Container>
    </section>
  );
}

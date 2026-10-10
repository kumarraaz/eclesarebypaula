import Link from "next/link";

import { MediaFrame } from "@/components/ui/media";
import {
  Container,
  Eyebrow,
  RuledEyebrow,
  Section,
  SectionHeading,
  revealDelay,
} from "@/components/ui/primitives";
import { copy } from "@/content/copy";
import { weddingStyles } from "@/content/weddings";
import type { WeddingStyle } from "@/content/types";

const accentRule = {
  spanish: "bg-[var(--color-accent-spanish)]",
  french: "bg-[var(--color-accent-french)]",
  indian: "bg-[var(--color-accent-indian)]",
} as const;

export function StyleCard({
  style,
  index = 0,
}: {
  style: WeddingStyle;
  index?: number;
}) {
  return (
    <article
      data-reveal
      style={revealDelay(index * 110)}
      className="group flex flex-col"
    >
      <Link
        href={`/weddings/${style.slug}`}
        className="flex flex-1 flex-col focus-visible:outline-offset-8"
      >
        <MediaFrame
          image={style.image}
          alt={`${style.title} — ${style.imageBrief}`}
          brief={style.imageBrief}
          ratio="tall"
          sizes="(min-width: 1024px) 31vw, (min-width: 640px) 48vw, 100vw"
        />

        <div className="flex flex-1 flex-col pt-7">
          <span
            aria-hidden="true"
            className={`h-px w-10 ${accentRule[style.accent]}`}
          />
          <Eyebrow accent={style.accent} className="mt-5">
            {style.eyebrow}
          </Eyebrow>
          <h3 className="mt-3 font-display text-[1.95rem] leading-tight text-charcoal transition-colors duration-300 group-hover:text-olive sm:text-[2.15rem]">
            {style.title}
          </h3>
          <p className="mt-4 flex-1 max-w-[42ch] text-[0.95rem] leading-relaxed text-charcoal-muted">
            {style.summary}
          </p>
          <span className="mt-7 inline-flex items-center gap-2 font-sans text-[0.72rem] uppercase tracking-[0.16em] text-charcoal underline decoration-1 decoration-charcoal/25 underline-offset-[7px] transition-colors duration-300 group-hover:text-olive group-hover:decoration-olive">
            {style.ctaLabel}
            <span
              aria-hidden="true"
              className="inline-block transition-transform duration-300 group-hover:translate-x-1"
            >
              →
            </span>
          </span>
        </div>
      </Link>
    </article>
  );
}

export function WeddingStylesSection() {
  const { styles } = copy.home;

  return (
    <Section
      id="weddings"
      labelledBy="styles-heading"
      spacing="loose"
      className="border-t border-charcoal/10 bg-sand-light"
    >
      <Container>
        <div
          data-reveal
          className="grid gap-8 lg:grid-cols-12 lg:items-end lg:gap-12"
        >
          <div className="lg:col-span-7">
            <RuledEyebrow>{styles.eyebrow}</RuledEyebrow>
            <SectionHeading id="styles-heading" className="mt-7 max-w-[16ch]">
              {styles.headline}
            </SectionHeading>
          </div>
          <p className="max-w-[46ch] text-[0.98rem] leading-relaxed text-charcoal-muted lg:col-span-4 lg:col-start-9">
            {styles.body}
          </p>
        </div>

        <div className="mt-16 grid gap-x-8 gap-y-16 sm:grid-cols-2 lg:mt-20 lg:grid-cols-3">
          {weddingStyles.map((style, index) => (
            <StyleCard key={style.id} style={style} index={index} />
          ))}
        </div>
      </Container>
    </Section>
  );
}

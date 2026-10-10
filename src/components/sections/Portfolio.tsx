import { MediaFrame } from "@/components/ui/media";
import {
  Container,
  PlaceholderTag,
  RuledEyebrow,
  Section,
  SectionHeading,
  TextLink,
  revealDelay,
} from "@/components/ui/primitives";
import { copy } from "@/content/copy";
import { portfolio } from "@/content/portfolio";
import type { PortfolioItem } from "@/content/types";

function Card({
  item,
  sizes,
  delay = 0,
}: {
  item: PortfolioItem;
  sizes: string;
  delay?: number;
}) {
  return (
    <article data-reveal style={revealDelay(delay)} className="group">
      <MediaFrame
        image={item.image}
        alt={`${item.title} — ${item.imageBrief}`}
        brief={item.imageBrief}
        ratio={item.ratio}
        sizes={sizes}
      />

      <div className="pt-6">
        <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
          <p className="eyebrow text-olive">{item.style}</p>
          <span aria-hidden="true" className="h-px w-5 bg-charcoal/20" />
          <p className="eyebrow text-charcoal/45">{item.destination}</p>
        </div>

        <h3 className="mt-4 font-display text-[1.65rem] leading-tight text-charcoal sm:text-[1.85rem]">
          {item.title}
        </h3>
        <p className="mt-3 max-w-[44ch] text-[0.93rem] leading-relaxed text-charcoal-muted">
          {item.description}
        </p>

        {item.placeholder ? (
          <div className="mt-6">
            <PlaceholderTag>Sample layout — not a real project</PlaceholderTag>
          </div>
        ) : (
          <TextLink href={`/portfolio/${item.slug}`} className="mt-6">
            View celebration
          </TextLink>
        )}
      </div>
    </article>
  );
}

/**
 * Deliberately asymmetric: rows alternate which side carries the large frame,
 * and the smaller frame is pushed down so the grid never reads as a table of
 * equal boxes. Collapses to a single column below `lg`.
 */
export function PortfolioGrid({ items }: { items: PortfolioItem[] }) {
  const rows: PortfolioItem[][] = [];
  for (let i = 0; i < items.length; i += 2) {
    rows.push(items.slice(i, i + 2));
  }

  return (
    <div className="flex flex-col gap-16 lg:gap-24">
      {rows.map((row, rowIndex) => {
        const leftLarge = rowIndex % 2 === 0;

        if (row.length === 1) {
          return (
            <div key={rowIndex} className="lg:grid lg:grid-cols-12">
              <div className="lg:col-span-7 lg:col-start-4">
                <Card
                  item={row[0]}
                  sizes="(min-width: 1024px) 56vw, 100vw"
                  delay={0}
                />
              </div>
            </div>
          );
        }

        return (
          <div
            key={rowIndex}
            className="grid gap-12 lg:grid-cols-12 lg:items-start lg:gap-10"
          >
            <div
              className={
                leftLarge ? "lg:col-span-7" : "lg:col-span-4 lg:pt-24"
              }
            >
              <Card
                item={row[0]}
                sizes={
                  leftLarge
                    ? "(min-width: 1024px) 56vw, 100vw"
                    : "(min-width: 1024px) 32vw, 100vw"
                }
              />
            </div>
            <div
              className={
                leftLarge
                  ? "lg:col-span-4 lg:col-start-9 lg:pt-24"
                  : "lg:col-span-7 lg:col-start-6"
              }
            >
              <Card
                item={row[1]}
                sizes={
                  leftLarge
                    ? "(min-width: 1024px) 32vw, 100vw"
                    : "(min-width: 1024px) 56vw, 100vw"
                }
                delay={110}
              />
            </div>
          </div>
        );
      })}
    </div>
  );
}

export function PortfolioSection() {
  const { portfolio: p } = copy.home;
  const featured = portfolio.slice(0, 3);
  const anyPlaceholder = featured.some((item) => item.placeholder);

  return (
    <Section
      id="portfolio"
      labelledBy="portfolio-heading"
      spacing="loose"
      className="bg-ivory"
    >
      <Container>
        <div
          data-reveal
          className="grid gap-8 lg:grid-cols-12 lg:items-end lg:gap-12"
        >
          <div className="lg:col-span-7">
            <RuledEyebrow>{p.eyebrow}</RuledEyebrow>
            <SectionHeading id="portfolio-heading" className="mt-7 max-w-[14ch]">
              {p.headline}
            </SectionHeading>
          </div>
          <div className="lg:col-span-4 lg:col-start-9">
            <p className="max-w-[44ch] text-[0.98rem] leading-relaxed text-charcoal-muted">
              {p.body}
            </p>
            <TextLink href={p.cta.href} className="mt-7">
              {p.cta.label}
            </TextLink>
          </div>
        </div>

        {anyPlaceholder && (
          <p className="mt-10 max-w-[62ch] border-l border-olive/30 pl-5 text-[0.85rem] leading-relaxed text-charcoal/55">
            The entries below show how completed weddings will be presented.
            They are layout examples — no real couple, venue or project is
            described. They are replaced as soon as client work is ready to
            publish.
          </p>
        )}

        <div className="mt-16 lg:mt-20">
          <PortfolioGrid items={featured} />
        </div>
      </Container>
    </Section>
  );
}

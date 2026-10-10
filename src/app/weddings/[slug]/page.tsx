import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { FinalCta } from "@/components/sections/FinalCta";
import { ProcessSection } from "@/components/sections/Process";
import { MediaFrame } from "@/components/ui/media";
import {
  Container,
  Eyebrow,
  RuledEyebrow,
  Section,
  SectionHeading,
  revealDelay,
} from "@/components/ui/primitives";
import { getWeddingStyle, weddingStyles } from "@/content/weddings";
import { buildMetadata } from "@/lib/seo";

type Params = { slug: string };

export function generateStaticParams(): Params[] {
  return weddingStyles.map((style) => ({ slug: style.slug }));
}

export const dynamicParams = false;

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { slug } = await params;
  const style = getWeddingStyle(slug);
  if (!style) return {};

  return buildMetadata({
    title: style.seo.title,
    description: style.seo.description,
    path: `/weddings/${style.slug}`,
  });
}

const accentRule = {
  spanish: "bg-[var(--color-accent-spanish)]",
  french: "bg-[var(--color-accent-french)]",
  indian: "bg-[var(--color-accent-indian)]",
} as const;

export default async function WeddingStylePage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { slug } = await params;
  const style = getWeddingStyle(slug);
  if (!style) notFound();

  const others = weddingStyles.filter((item) => item.id !== style.id);

  return (
    <>
      {/* Opening: image and words side by side rather than a banner. */}
      <section className="bg-ivory pt-28 sm:pt-32 lg:pt-36">
        <Container>
          <div className="grid gap-12 lg:grid-cols-12 lg:items-center lg:gap-16">
            <div data-reveal className="lg:col-span-6 lg:order-2">
              <div className="group">
                <MediaFrame
                  image={style.image}
                  alt={`${style.title} — ${style.imageBrief}`}
                  brief={style.imageBrief}
                  ratio="portrait"
                  sizes="(min-width: 1024px) 48vw, 100vw"
                  priority
                />
              </div>
            </div>

            <div
              data-reveal
              style={revealDelay(100)}
              className="lg:col-span-5 lg:order-1"
            >
              <nav aria-label="Breadcrumb" className="mb-8">
                <ol className="flex items-center gap-2 text-[0.7rem] uppercase tracking-[0.16em] text-charcoal/45">
                  <li>
                    <Link href="/weddings" className="hover:text-olive">
                      Weddings
                    </Link>
                  </li>
                  <li aria-hidden="true">/</li>
                  <li aria-current="page" className="text-charcoal/70">
                    {style.navLabel}
                  </li>
                </ol>
              </nav>

              <span
                aria-hidden="true"
                className={`block h-px w-10 ${accentRule[style.accent]}`}
              />
              <Eyebrow accent={style.accent} className="mt-5">
                {style.eyebrow}
              </Eyebrow>
              <SectionHeading
                as="h1"
                size="large"
                className="mt-4 max-w-[12ch]"
              >
                {style.title}
              </SectionHeading>
              <p className="mt-8 max-w-[50ch] text-[1.0625rem] leading-[1.8] text-charcoal-muted">
                {style.intro}
              </p>
            </div>
          </div>
        </Container>
      </section>

      {/* What it covers */}
      <Section spacing="loose" labelledBy="covers-heading" className="bg-ivory">
        <Container>
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
            <div data-reveal className="lg:col-span-4">
              <RuledEyebrow accent={style.accent}>What it covers</RuledEyebrow>
              <SectionHeading
                id="covers-heading"
                size="small"
                className="mt-7 max-w-[12ch]"
              >
                {style.summary}
              </SectionHeading>
            </div>

            <ul
              data-reveal
              style={revealDelay(120)}
              className="lg:col-span-7 lg:col-start-6"
            >
              {style.highlights.map((item) => (
                <li
                  key={item}
                  className="flex items-start gap-5 border-t border-charcoal/12 py-5 text-[1.0125rem] leading-relaxed text-charcoal/80 last:border-b"
                >
                  <span
                    aria-hidden="true"
                    className={`mt-[0.85em] h-px w-4 shrink-0 ${accentRule[style.accent]}`}
                  />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </Container>
      </Section>

      {/* Practical considerations */}
      <Section
        spacing="loose"
        labelledBy="considerations-heading"
        className="border-t border-charcoal/10 bg-sand-light"
      >
        <Container>
          <div data-reveal>
            <RuledEyebrow accent={style.accent}>
              What we plan around
            </RuledEyebrow>
            <SectionHeading
              id="considerations-heading"
              className="mt-7 max-w-[16ch]"
            >
              The things that decide whether it works.
            </SectionHeading>
          </div>

          <div className="mt-14 grid gap-x-14 gap-y-10 sm:grid-cols-2">
            {style.considerations.map((item, index) => (
              <div
                key={item.title}
                data-reveal
                style={revealDelay((index % 2) * 90)}
                className="border-t border-charcoal/12 pt-7"
              >
                <h3 className="font-display text-[1.5rem] leading-tight text-charcoal">
                  {item.title}
                </h3>
                <p className="mt-4 max-w-[46ch] text-[0.95rem] leading-relaxed text-charcoal-muted">
                  {item.body}
                </p>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      <ProcessSection withImage={false} />

      {/* Cross-links to the other two styles */}
      <Section spacing="default" className="bg-ivory">
        <Container>
          <p className="eyebrow text-olive">Also explore</p>
          <div className="mt-8 grid gap-10 sm:grid-cols-2">
            {others.map((other) => (
              <Link
                key={other.id}
                href={`/weddings/${other.slug}`}
                className="group flex items-center justify-between gap-6 border-t border-charcoal/12 pt-7"
              >
                <span>
                  <span className="font-display text-[1.7rem] leading-tight text-charcoal transition-colors group-hover:text-olive">
                    {other.title}
                  </span>
                  <span className="mt-2 block max-w-[38ch] text-[0.9rem] leading-relaxed text-charcoal-muted">
                    {other.summary}
                  </span>
                </span>
                <span
                  aria-hidden="true"
                  className="shrink-0 text-olive transition-transform duration-300 group-hover:translate-x-1"
                >
                  →
                </span>
              </Link>
            ))}
          </div>
        </Container>
      </Section>

      <FinalCta />
    </>
  );
}

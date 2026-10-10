import Link from "next/link";

import { asset } from "@/lib/asset";
import { images } from "@/lib/images";
import { copy } from "@/content/copy";

const { hero } = copy.home;

/**
 * The hero is the LCP element, so it uses a plain <picture> rather than
 * next/image: this is genuine art direction (a different crop on narrow
 * screens), which next/image cannot express, and it keeps the largest asset
 * out of the JS-driven image pipeline.
 */
export function Hero() {
  const wide = images.hero_mediterranean_reception;
  const tall = images.hero_mobile;

  return (
    <section className="relative isolate flex min-h-[88svh] flex-col justify-end overflow-hidden bg-charcoal lg:min-h-[94svh]">
      <picture>
        <source media="(min-width: 768px)" srcSet={asset(wide.src)} />
        <img
          src={asset(tall.src)}
          alt={hero.imageAlt}
          width={tall.width}
          height={tall.height}
          fetchPriority="high"
          decoding="async"
          className="absolute inset-0 -z-10 h-full w-full object-cover"
        />
      </picture>

      {/* Layered gradients rather than one flat scrim: keeps the sunset
          legible while guaranteeing AA contrast behind the text block.
          The horizontal pass only runs on wider screens, where the copy sits
          to the left of the composition. */}
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-gradient-to-t from-charcoal/95 via-charcoal/65 to-charcoal/35 md:from-charcoal/90 md:via-charcoal/40 md:to-charcoal/25"
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 hidden bg-gradient-to-r from-charcoal/75 via-charcoal/25 to-transparent md:block"
      />

      <div className="mx-auto w-full max-w-[96rem] px-6 pb-16 pt-32 sm:px-8 sm:pb-20 lg:px-12 lg:pb-24">
        <div className="max-w-[46rem]">
          <p
            className="eyebrow animate-[fadeUp_1s_cubic-bezier(0.22,1,0.36,1)_both] text-ivory/75"
            style={{ animationDelay: "120ms" }}
          >
            {hero.eyebrow}
          </p>

          <h1 className="mt-6 animate-[fadeUp_1s_cubic-bezier(0.22,1,0.36,1)_both] font-display text-[2.75rem] leading-[1.03] text-ivory sm:text-[4rem] lg:text-[5rem]"
            style={{ animationDelay: "240ms" }}
          >
            {hero.headline[0]}
            <span className="block italic text-ivory/90">
              {hero.headline[1]}
            </span>
          </h1>

          <p
            className="mt-7 max-w-[44ch] animate-[fadeUp_1s_cubic-bezier(0.22,1,0.36,1)_both] text-[1.0625rem] leading-relaxed text-ivory/85 sm:text-lg"
            style={{ animationDelay: "380ms" }}
          >
            {hero.body}
          </p>

          <div
            className="mt-10 flex animate-[fadeUp_1s_cubic-bezier(0.22,1,0.36,1)_both] flex-col items-start gap-5 sm:flex-row sm:items-center sm:gap-8"
            style={{ animationDelay: "500ms" }}
          >
            <Link
              href={hero.primaryCta.href}
              className="inline-flex items-center justify-center rounded-[2px] bg-ivory px-9 py-4 font-sans text-[0.78rem] uppercase tracking-[0.16em] text-charcoal transition-colors duration-300 hover:bg-sand"
            >
              {hero.primaryCta.label}
            </Link>
            <Link
              href={hero.secondaryCta.href}
              className="group/link inline-flex items-center gap-2 font-sans text-[0.78rem] uppercase tracking-[0.16em] text-ivory underline decoration-1 decoration-ivory/40 underline-offset-[7px] transition-colors duration-300 hover:decoration-ivory"
            >
              {hero.secondaryCta.label}
              <span
                aria-hidden="true"
                className="inline-block transition-transform duration-300 group-hover/link:translate-x-1"
              >
                →
              </span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

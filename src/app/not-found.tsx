import Link from "next/link";

import {
  ButtonLink,
  Container,
  RuledEyebrow,
  SectionHeading,
} from "@/components/ui/primitives";
import { copy } from "@/content/copy";
import { site } from "@/content/site";

export default function NotFound() {
  const { notFound } = copy;

  return (
    <section className="flex min-h-[70svh] items-center bg-ivory pb-24 pt-40">
      <Container>
        <div className="max-w-[52rem]">
          <RuledEyebrow>404</RuledEyebrow>
          <SectionHeading as="h1" size="large" className="mt-7 max-w-[14ch]">
            {notFound.headline}
          </SectionHeading>
          <p className="mt-8 max-w-[48ch] text-[1.0625rem] leading-relaxed text-charcoal-muted">
            {notFound.body}
          </p>

          <div className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-4">
            <ButtonLink href={notFound.cta.href}>{notFound.cta.label}</ButtonLink>
            <nav aria-label="Suggested pages">
              <ul className="flex flex-wrap gap-x-6 gap-y-2">
                {site.nav.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className="font-sans text-[0.78rem] uppercase tracking-[0.16em] text-charcoal/65 underline decoration-1 underline-offset-[7px] transition-colors hover:text-olive"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
        </div>
      </Container>
    </section>
  );
}

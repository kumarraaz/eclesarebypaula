import Link from "next/link";

import { PendingText } from "@/components/ui/primitives";
import { site } from "@/content/site";
import { weddingStyles } from "@/content/weddings";

const year = new Date().getFullYear();

function ColumnHeading({ children }: { children: React.ReactNode }) {
  return <h2 className="eyebrow text-olive">{children}</h2>;
}

const linkClass =
  "font-sans text-sm text-charcoal-muted transition-colors duration-300 hover:text-olive";

export function SiteFooter() {
  const { contact } = site;

  return (
    <footer className="border-t border-charcoal/10 bg-sand-light">
      <div className="mx-auto w-full max-w-[82rem] px-6 py-16 sm:px-8 lg:px-12 lg:py-20">
        <div className="grid gap-12 md:grid-cols-12 md:gap-8">
          {/* Brand */}
          <div className="md:col-span-5 lg:col-span-4">
            <Link href="/" className="inline-flex flex-col leading-none">
              <span className="font-display text-[1.5rem] uppercase tracking-[0.34em] text-charcoal">
                {site.wordmark}
              </span>
              <span className="mt-1 pl-[0.2em] font-sans text-[0.5rem] uppercase tracking-[0.42em] text-olive">
                {site.wordmarkSuffix}
              </span>
            </Link>
            <p className="mt-6 max-w-[38ch] text-sm leading-relaxed text-charcoal-muted">
              {site.shortDescription}
            </p>
            <p className="eyebrow mt-6 text-charcoal/45">{site.discipline}</p>
          </div>

          {/* Navigation */}
          <nav
            aria-label="Footer"
            className="md:col-span-3 lg:col-span-2 lg:col-start-6"
          >
            <ColumnHeading>Explore</ColumnHeading>
            <ul className="mt-5 flex flex-col gap-3">
              {site.nav.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className={linkClass}>
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Wedding categories */}
          <div className="md:col-span-4 lg:col-span-3">
            <ColumnHeading>Weddings</ColumnHeading>
            <ul className="mt-5 flex flex-col gap-3">
              {weddingStyles.map((style) => (
                <li key={style.slug}>
                  <Link href={`/weddings/${style.slug}`} className={linkClass}>
                    {style.navLabel}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div className="md:col-span-5 lg:col-span-3">
            <ColumnHeading>Contact</ColumnHeading>
            <ul className="mt-5 flex flex-col gap-3 text-sm text-charcoal-muted">
              <li>
                <PendingText {...contact.email} />
              </li>
              <li>
                <PendingText {...contact.phone} />
              </li>
              <li>
                <PendingText {...contact.serviceAreas} />
              </li>
              <li className="pt-2">
                <PendingText
                  value={`Instagram ${contact.instagramHandle.value}`}
                  pending={contact.instagramHandle.pending}
                />
              </li>
            </ul>
            <Link
              href={site.enquireCta.href}
              className="mt-7 inline-flex items-center gap-2 font-sans text-[0.75rem] uppercase tracking-[0.16em] text-charcoal underline decoration-1 underline-offset-[7px] transition-colors hover:text-olive"
            >
              Make an enquiry
              <span aria-hidden="true">→</span>
            </Link>
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-4 border-t border-charcoal/10 pt-7 text-xs text-charcoal/55 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {year} {site.legalName.value}. All rights reserved.
          </p>
          <ul className="flex flex-wrap items-center gap-x-6 gap-y-2">
            {site.legalLinks.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="transition-colors hover:text-olive"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Visible only to whoever is building the site out. */}
        <p className="mt-6 text-[0.6875rem] leading-relaxed text-charcoal/40">
          Contact details, Instagram and service areas shown with a dotted
          underline are placeholders. Replace them in{" "}
          <code className="font-mono">src/content/site.ts</code> before launch.
        </p>
      </div>
    </footer>
  );
}

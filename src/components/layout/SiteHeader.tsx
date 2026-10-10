"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";

import { site } from "@/content/site";
import { weddingStyles } from "@/content/weddings";

function Wordmark({ tone }: { tone: "light" | "dark" }) {
  return (
    <Link
      href="/"
      className="group/mark inline-flex flex-col leading-none"
      aria-label={`${site.wordmark} ${site.wordmarkSuffix} — home`}
    >
      <span
        className={`font-display text-[1.45rem] uppercase tracking-[0.34em] transition-colors duration-300 sm:text-[1.6rem] ${
          tone === "light" ? "text-ivory" : "text-charcoal"
        }`}
      >
        {site.wordmark}
      </span>
      <span
        className={`mt-1 pl-[0.2em] font-sans text-[0.5rem] uppercase tracking-[0.42em] transition-colors duration-300 ${
          tone === "light" ? "text-ivory/70" : "text-olive"
        }`}
      >
        {site.wordmarkSuffix}
      </span>
    </Link>
  );
}

export function SiteHeader() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);

  // The homepage hero sits behind the header; every other page does not.
  const overlay = pathname === "/" && !scrolled && !menuOpen;
  const tone: "light" | "dark" = overlay ? "light" : "dark";

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 32);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Escape to close, focus trap, and scroll lock while the panel is open.
  useEffect(() => {
    if (!menuOpen) return;

    const { body } = document;
    const previousOverflow = body.style.overflow;
    body.style.overflow = "hidden";

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setMenuOpen(false);
        toggleRef.current?.focus();
        return;
      }
      if (event.key !== "Tab" || !panelRef.current) return;

      const focusable = panelRef.current.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled])',
      );
      if (focusable.length === 0) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", onKeyDown);
    panelRef.current?.querySelector<HTMLElement>("a[href]")?.focus();

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      body.style.overflow = previousOverflow;
    };
  }, [menuOpen]);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-[background-color,border-color,padding] duration-500 ${
        overlay
          ? "border-b border-transparent bg-transparent py-6 lg:py-8"
          : "border-b border-charcoal/10 bg-ivory/95 py-4 backdrop-blur-sm lg:py-5"
      }`}
    >
      <div className="mx-auto flex w-full max-w-[96rem] items-center justify-between gap-6 px-6 sm:px-8 lg:px-12">
        <Wordmark tone={tone} />

        <nav
          aria-label="Primary"
          className="hidden items-center gap-9 lg:flex xl:gap-11"
        >
          {site.nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              aria-current={isActive(item.href) ? "page" : undefined}
              className={`relative font-sans text-[0.78rem] uppercase tracking-[0.17em] transition-colors duration-300 ${
                tone === "light"
                  ? "text-ivory/85 hover:text-ivory"
                  : "text-charcoal/80 hover:text-olive"
              } ${
                isActive(item.href)
                  ? tone === "light"
                    ? "text-ivory"
                    : "text-olive"
                  : ""
              }`}
            >
              {item.label}
              <span
                aria-hidden="true"
                className={`absolute -bottom-2 left-0 h-px w-full origin-left scale-x-0 transition-transform duration-300 ${
                  tone === "light" ? "bg-ivory" : "bg-olive"
                } ${isActive(item.href) ? "scale-x-100" : ""}`}
              />
            </Link>
          ))}
          <Link
            href={site.enquireCta.href}
            className={`rounded-[2px] border px-6 py-3 font-sans text-[0.72rem] uppercase tracking-[0.18em] transition-colors duration-300 ${
              tone === "light"
                ? "border-ivory/55 text-ivory hover:bg-ivory hover:text-charcoal"
                : "border-charcoal/30 text-charcoal hover:border-charcoal hover:bg-charcoal hover:text-ivory"
            }`}
          >
            {site.enquireCta.label}
          </Link>
        </nav>

        <button
          ref={toggleRef}
          type="button"
          onClick={() => setMenuOpen((open) => !open)}
          aria-expanded={menuOpen}
          aria-controls="mobile-menu"
          className={`-mr-2 inline-flex items-center gap-3 p-2 font-sans text-[0.72rem] uppercase tracking-[0.18em] transition-colors duration-300 lg:hidden ${
            tone === "light" ? "text-ivory" : "text-charcoal"
          }`}
        >
          <span>{menuOpen ? "Close" : "Menu"}</span>
          <span aria-hidden="true" className="flex w-5 flex-col gap-[5px]">
            <span
              className={`h-px w-full transition-transform duration-300 ${
                tone === "light" ? "bg-ivory" : "bg-charcoal"
              } ${menuOpen ? "translate-y-[3px] rotate-45" : ""}`}
            />
            <span
              className={`h-px w-full transition-transform duration-300 ${
                tone === "light" ? "bg-ivory" : "bg-charcoal"
              } ${menuOpen ? "-translate-y-[3px] -rotate-45" : ""}`}
            />
          </span>
        </button>
      </div>

      {/* Mobile panel */}
      <div
        id="mobile-menu"
        ref={panelRef}
        hidden={!menuOpen}
        className="absolute inset-x-0 top-full max-h-[calc(100dvh-4.5rem)] min-h-[calc(100dvh-4.5rem)] overflow-y-auto border-t border-charcoal/10 bg-ivory lg:hidden"
      >
        <nav
          aria-label="Mobile"
          className="px-6 py-10 sm:px-8"
          onClick={(event) => {
            // Any link inside the panel closes it; the route change itself
            // keeps this component mounted, so it has to be explicit.
            if ((event.target as HTMLElement).closest("a")) setMenuOpen(false);
          }}
        >
          <ul className="flex flex-col">
            {site.nav.map((item, index) => (
              <li key={item.href} className="border-b border-charcoal/10">
                <Link
                  href={item.href}
                  aria-current={isActive(item.href) ? "page" : undefined}
                  className="flex items-baseline gap-4 py-5 font-display text-[2rem] text-charcoal transition-colors duration-200 hover:text-olive"
                >
                  <span className="eyebrow w-7 shrink-0 text-olive/70">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>

          <p className="eyebrow mt-10 text-olive">Wedding styles</p>
          <ul className="mt-4 flex flex-col gap-3">
            {weddingStyles.map((style) => (
              <li key={style.slug}>
                <Link
                  href={`/weddings/${style.slug}`}
                  className="font-sans text-sm text-charcoal-muted transition-colors hover:text-olive"
                >
                  {style.navLabel}
                </Link>
              </li>
            ))}
          </ul>

          <Link
            href={site.enquireCta.href}
            className="mt-10 inline-flex w-full items-center justify-center rounded-[2px] bg-charcoal px-8 py-4 font-sans text-[0.78rem] uppercase tracking-[0.16em] text-ivory transition-colors hover:bg-olive"
          >
            {site.enquireCta.label}
          </Link>
        </nav>
      </div>
    </header>
  );
}

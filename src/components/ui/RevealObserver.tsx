"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

/**
 * Single IntersectionObserver for every `[data-reveal]` element on the page.
 *
 * Mounted once in the root layout so section components can stay server
 * components and simply add the attribute. Re-scans on route change.
 *
 * If JavaScript never runs, `.js` is never added to <html> and the CSS in
 * globals.css leaves everything visible — the page degrades to no animation
 * rather than to blank sections.
 */
export function RevealObserver() {
  const pathname = usePathname();

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    const targets = Array.from(
      document.querySelectorAll<HTMLElement>("[data-reveal]"),
    );

    if (prefersReducedMotion || !("IntersectionObserver" in window)) {
      targets.forEach((el) => el.classList.add("is-revealed"));
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-revealed");
            observer.unobserve(entry.target);
          }
        });
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.08 },
    );

    targets.forEach((el) => {
      // Anything already in view on load reveals immediately, without a flash.
      const rect = el.getBoundingClientRect();
      if (rect.top < window.innerHeight * 0.92) {
        el.classList.add("is-revealed");
      } else {
        observer.observe(el);
      }
    });

    return () => observer.disconnect();
  }, [pathname]);

  return null;
}

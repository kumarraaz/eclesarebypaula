import Link from "next/link";
import type { CSSProperties, ElementType, ReactNode } from "react";

/* ------------------------------------------------------------------ */
/* Layout                                                              */
/* ------------------------------------------------------------------ */

export function Container({
  children,
  className = "",
  width = "default",
}: {
  children: ReactNode;
  className?: string;
  width?: "default" | "wide" | "narrow";
}) {
  const max = {
    narrow: "max-w-3xl",
    default: "max-w-[82rem]",
    wide: "max-w-[96rem]",
  }[width];

  return (
    <div className={`mx-auto w-full ${max} px-6 sm:px-8 lg:px-12 ${className}`}>
      {children}
    </div>
  );
}

export function Section({
  children,
  className = "",
  id,
  as: Tag = "section",
  spacing = "default",
  labelledBy,
}: {
  children: ReactNode;
  className?: string;
  id?: string;
  as?: ElementType;
  spacing?: "default" | "tight" | "loose";
  labelledBy?: string;
}) {
  const pad = {
    tight: "py-16 md:py-20",
    default: "py-20 md:py-28 lg:py-32",
    loose: "py-24 md:py-36 lg:py-44",
  }[spacing];

  return (
    <Tag id={id} aria-labelledby={labelledBy} className={`${pad} ${className}`}>
      {children}
    </Tag>
  );
}

/* ------------------------------------------------------------------ */
/* Scroll reveal                                                       */
/*                                                                     */
/* Content is visible by default; globals.css only hides it once the   */
/* bootstrap script has added `.js` to <html>. RevealObserver then adds */
/* `.is-revealed`. Reduced motion short-circuits the whole thing.      */
/* ------------------------------------------------------------------ */

export function revealDelay(ms: number): CSSProperties {
  return { "--reveal-delay": `${ms}ms` } as CSSProperties;
}

/* ------------------------------------------------------------------ */
/* Typography                                                          */
/* ------------------------------------------------------------------ */

const accentText = {
  olive: "text-olive",
  spanish: "text-[var(--color-accent-spanish)]",
  french: "text-[var(--color-accent-french)]",
  indian: "text-[var(--color-accent-indian)]",
} as const;

export type Accent = keyof typeof accentText;

export function Eyebrow({
  children,
  accent = "olive",
  className = "",
  as: Tag = "p",
}: {
  children: ReactNode;
  accent?: Accent;
  className?: string;
  as?: ElementType;
}) {
  return (
    <Tag className={`eyebrow ${accentText[accent]} ${className}`}>
      {children}
    </Tag>
  );
}

/** Eyebrow preceded by a short rule — the recurring section marker. */
export function RuledEyebrow({
  children,
  accent = "olive",
  className = "",
}: {
  children: ReactNode;
  accent?: Accent;
  className?: string;
}) {
  const rule = {
    olive: "bg-olive",
    spanish: "bg-[var(--color-accent-spanish)]",
    french: "bg-[var(--color-accent-french)]",
    indian: "bg-[var(--color-accent-indian)]",
  }[accent];

  return (
    <p className={`flex items-center gap-4 ${className}`}>
      <span aria-hidden="true" className={`h-px w-8 shrink-0 ${rule}`} />
      <span className={`eyebrow ${accentText[accent]}`}>{children}</span>
    </p>
  );
}

export function SectionHeading({
  children,
  className = "",
  id,
  as: Tag = "h2",
  size = "default",
}: {
  children: ReactNode;
  className?: string;
  id?: string;
  as?: ElementType;
  size?: "default" | "large" | "small";
}) {
  const scale = {
    small: "text-[1.9rem] sm:text-[2.2rem] lg:text-[2.6rem]",
    default: "text-[2.3rem] sm:text-[2.9rem] lg:text-[3.4rem]",
    large: "text-[2.7rem] sm:text-[3.6rem] lg:text-[4.4rem]",
  }[size];

  return (
    <Tag id={id} className={`${scale} ${className}`}>
      {children}
    </Tag>
  );
}

export function Lede({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <p
      className={`text-[1.0625rem] leading-[1.75] text-charcoal-muted sm:text-lg ${className}`}
    >
      {children}
    </p>
  );
}

/* ------------------------------------------------------------------ */
/* Buttons & links                                                     */
/* ------------------------------------------------------------------ */

const buttonBase =
  "inline-flex items-center justify-center rounded-[2px] font-sans text-[0.78rem] uppercase tracking-[0.16em] transition-colors duration-300 focus-visible:outline-2";

const buttonVariants = {
  primary:
    "bg-charcoal px-8 py-4 text-ivory hover:bg-olive border border-charcoal hover:border-olive",
  outline:
    "border border-charcoal/35 px-8 py-4 text-charcoal hover:border-charcoal hover:bg-charcoal hover:text-ivory",
  light:
    "border border-ivory/60 px-8 py-4 text-ivory hover:bg-ivory hover:text-charcoal",
} as const;

export function ButtonLink({
  href,
  children,
  variant = "primary",
  className = "",
}: {
  href: string;
  children: ReactNode;
  variant?: keyof typeof buttonVariants;
  className?: string;
}) {
  return (
    <Link
      href={href}
      className={`${buttonBase} ${buttonVariants[variant]} ${className}`}
    >
      {children}
    </Link>
  );
}

/** Understated text link with an animated underline. */
export function TextLink({
  href,
  children,
  tone = "dark",
  className = "",
}: {
  href: string;
  children: ReactNode;
  tone?: "dark" | "light";
  className?: string;
}) {
  const colour =
    tone === "light"
      ? "text-ivory decoration-ivory/40 hover:decoration-ivory"
      : "text-charcoal decoration-charcoal/30 hover:decoration-olive hover:text-olive";

  return (
    <Link
      href={href}
      className={`group/link inline-flex items-center gap-2 font-sans text-[0.78rem] uppercase tracking-[0.16em] underline decoration-1 underline-offset-[7px] transition-colors duration-300 ${colour} ${className}`}
    >
      {children}
      <span
        aria-hidden="true"
        className="inline-block transition-transform duration-300 group-hover/link:translate-x-1"
      >
        →
      </span>
    </Link>
  );
}

/* ------------------------------------------------------------------ */
/* Placeholder markers                                                 */
/* ------------------------------------------------------------------ */

/**
 * Renders an unconfirmed value (contact details, service areas) in a visibly
 * provisional style so it can never be mistaken for a published fact.
 */
export function PendingText({
  value,
  pending,
  className = "",
}: {
  value: string;
  pending: boolean;
  className?: string;
}) {
  if (!pending) return <span className={className}>{value}</span>;

  return (
    <span
      title="Placeholder — set the real value in src/content/site.ts"
      className={`underline decoration-dotted decoration-from-font underline-offset-4 opacity-70 ${className}`}
    >
      {value}
    </span>
  );
}

/** Small uppercase tag marking demonstration content. */
export function PlaceholderTag({ children }: { children: ReactNode }) {
  return (
    <span className="eyebrow inline-flex items-center gap-2 border border-olive/35 px-2.5 py-1 text-[0.5625rem] text-olive">
      <span aria-hidden="true" className="h-1 w-1 rounded-full bg-olive" />
      {children}
    </span>
  );
}

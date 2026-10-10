# Eclesare by Paula — wedding planning & design

Marketing site for a boutique wedding planner working in Spain, covering
Spanish, French-inspired and Indian celebrations.

Next.js 16 (App Router) · TypeScript · Tailwind CSS v4 · no UI libraries.

---

## Quick start

```bash
npm install
cp .env.example .env.local   # then fill it in
npm run dev                  # http://localhost:3000
```

| Script | What it does |
| --- | --- |
| `npm run dev` | Dev server |
| `npm run build` | Production build (server target — Vercel, Node) |
| `npm run build:static` | Fully static `out/` directory for any static host |
| `npm run lint` | ESLint |
| `npm run typecheck` | `tsc --noEmit` |
| `npm run verify` | Lint + typecheck + build, in one go |
| `python3 scripts/images.py` | Regenerate the image manifest after adding photos |
| `node scripts/shoot.mjs <url> <dir>` | Screenshot every route, report console errors, overflow and missing alt text |

---

## Pages

| Route | Purpose |
| --- | --- |
| `/` | Hero, approach, three wedding styles, services, portfolio, process, about, CTA |
| `/weddings` | Overview of the three styles plus multicultural weddings |
| `/weddings/spanish-weddings` | Style page |
| `/weddings/french-inspired-weddings` | Style page |
| `/weddings/indian-weddings` | Style page |
| `/services` | Four services in detail, plus the planning process |
| `/portfolio` | Asymmetric editorial grid (demonstration content) |
| `/about` | Founder and approach (placeholders), reserved credentials block |
| `/contact` | Enquiry form |
| `/privacy` | Privacy policy template (`noindex`) |
| `/sitemap.xml`, `/robots.txt` | Generated from `src/content` |

All 15 routes prerender to static HTML.

---

## Where things live

```
src/
  app/                 routes, metadata, sitemap, robots
  components/
    layout/            header, footer, page header
    sections/          homepage + reusable page sections
    form/              enquiry form
    ui/                primitives, media, scroll-reveal observer
    seo/               JSON-LD
  content/             ALL copy and data — see content/README.md
  lib/
    fonts.ts           self-hosted variable fonts
    images.ts          GENERATED — do not edit
    seo.ts             metadata helper
  fonts/               woff2 files + OFL licences
public/images/         photography + generated crops
scripts/
  images.py            regenerates src/lib/images.ts
  shoot.mjs            visual / accessibility QA pass
```

**No marketing copy is hard-coded in components.** Everything is in
`src/content/`, which is what makes the Spanish translation tractable later.

---

## Design system

Five brand colours, defined once as Tailwind v4 tokens in
`src/app/globals.css`:

| Token | Hex | Use |
| --- | --- | --- |
| `ivory` | `#F7F4EE` | Page background |
| `sand` | `#E7DDCD` | Final CTA band |
| `olive` | `#737A61` | Accents, eyebrows, links |
| `charcoal` | `#30312C` | Text, primary buttons |
| `white` | `#FFFFFF` | Form fields |

Three derived tints (`sand-light`, `olive-light`, `charcoal-muted`) are mixes
of those five, used only for hairlines, hovers and muted text.

Three **cultural accents** give each wedding style its own identity without
breaking the palette. They are used only for 1px rules and small-caps labels —
never as fills:

| Token | Hex | Style |
| --- | --- | --- |
| `--color-accent-spanish` | `#8A7D5C` | Spanish |
| `--color-accent-french` | `#7D8A86` | French-inspired |
| `--color-accent-indian` | `#A46A42` | Indian |

Type: **Cormorant Garamond** (display, 300 weight) and **DM Sans** (body, nav,
small-caps labels). Both self-hosted as variable fonts — no request leaves the
visitor's browser for a font, which is both faster and avoids the GDPR
question around Google Fonts in the EU.

Conventions: 2px corner radius maximum, no drop shadows, hairline rules
instead of cards, generous vertical rhythm, asymmetric 12-column grids.

---

## Motion

Scroll reveal is one shared `IntersectionObserver`
(`src/components/ui/RevealObserver.tsx`) that watches every `[data-reveal]`
element. Sections stay server components and just add the attribute.

Two things matter here:

- **It degrades safely.** `globals.css` only hides reveal targets under
  `html.js`, which an inline bootstrap script adds. If JavaScript fails or is
  disabled, the page renders fully visible rather than blank.
- **`prefers-reduced-motion: reduce` disables everything**, including the hero
  entrance and smooth scrolling.

---

## Accessibility

- Skip link, semantic landmarks, one `h1` per page, ordered headings
- Mobile menu: `aria-expanded`/`aria-controls`, focus trap, Escape to close,
  scroll lock, closes on navigation
- Form: real `<label>`s, `aria-invalid`, `aria-describedby`, an error summary
  with `role="alert"`, focus moved to the first invalid field, status region
  for success and failure
- Visible 2px olive focus ring on every interactive element
- Verified at 1440px and 390px: no console errors, no horizontal overflow, no
  image without `alt`

---

## Deployment

### Vercel (recommended)

Push the repo, import it, set `NEXT_PUBLIC_SITE_URL`,
`NEXT_PUBLIC_FORM_ENDPOINT` and `NEXT_PUBLIC_CONTACT_EMAIL`. Image
optimisation and the API-route form option both work.

### Any static host (Netlify, Cloudflare Pages, S3, shared hosting)

```bash
NEXT_PUBLIC_SITE_URL=https://www.your-domain.com npm run build:static
```

Upload `out/`. Image optimisation is off in this mode — all images are already
pre-sized WebP, so the cost is small — and the API-route form option is not
available (use Formspree or Web3Forms, see INTEGRATIONS.md).

---

## Before going live

See `INTEGRATIONS.md`. The short version:

1. Connect the enquiry form — it currently delivers nothing by design.
2. Set `NEXT_PUBLIC_SITE_URL`, or every canonical URL will be wrong.
3. Fill in contact details in `src/content/site.ts`.
4. Complete the privacy policy and add the legally required *Aviso legal*.
5. Replace the portfolio placeholders with real projects.
6. Supply Indian wedding photography.
7. Replace the supplied AI-generated imagery with real wedding photographs.

---

## What this site deliberately does not do

No invented testimonials, awards, venues, couples or completed projects.
The testimonials component exists and renders nothing while
`src/content/portfolio.ts` has an empty `testimonials` array — add real,
attributable reviews and it appears. Unconfirmed contact details render with a
dotted underline and are excluded from the structured data.

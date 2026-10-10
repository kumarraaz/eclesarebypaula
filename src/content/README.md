# Content

All editable text, navigation and project data lives in this folder. Nothing in
`src/components` contains hard-coded marketing copy, so the site can be edited
(and later translated) without touching React.

| File | What it holds |
| --- | --- |
| `site.ts` | Brand wordmark, navigation, contact details, legal links, canonical URL |
| `copy.ts` | All page copy, grouped by page |
| `weddings.ts` | The three wedding styles and their dedicated pages |
| `services.ts` | The four services and the four process steps |
| `portfolio.ts` | Portfolio entries and the (empty) testimonials array |
| `types.ts` | Shared types |

## Placeholders

Three mechanisms mark content that has not been confirmed:

1. **`pending: true`** in `site.ts` — contact details, Instagram, service areas.
   These render in a visibly provisional style with a dotted underline.
   Replace the value, set `pending: false`.
2. **`placeholder: true`** in `portfolio.ts` — every portfolio entry is
   demonstration layout content and renders with a "Sample layout" label.
   Set to `false` once a real project replaces it.
3. **`image: null`** — no suitable photograph has been supplied. A labelled
   image slot renders instead, showing the `imageBrief` so it is obvious what
   photography is needed. Currently used for Indian wedding imagery.

Nothing on this site invents a client, a venue, a review, an award or a
completed project.

## Adding photography

1. Drop the file into `public/images/` as `.webp` (or convert it first).
2. Run `python3 scripts/images.py` — this regenerates `src/lib/images.ts` with
   dimensions and blur placeholders.
3. Reference the new key from `weddings.ts` or `portfolio.ts`. Keys are the
   filename with hyphens replaced by underscores.

## Adding Spanish

The site is structured for a second locale but does not implement one yet.
Deliberately — machine-translating wedding terminology produces copy that reads
badly to Spanish couples.

When Spanish copy is written:

1. Add `src/content/es/` mirroring `copy.ts`, `weddings.ts`, `services.ts`.
2. Add a `getCopy(locale)` accessor in `src/content/index.ts`.
3. Move `src/app/(site)` routes under `src/app/[locale]/` and add a
   `generateStaticParams` returning `['en', 'es']`.
4. Add `alternates.languages` to the metadata helper in `src/lib/seo.ts` — the
   helper already accepts a locale argument.

Slugs should be translated too (`/bodas/bodas-espanolas`, not
`/es/spanish-weddings`), which is why routes are driven by the `slug` field in
`weddings.ts` rather than by folder names.

# Integrations

Everything the site needs in order to actually function in production, and
what currently does not work.

---

## 1. The enquiry form — REQUIRED before launch

**Current state: the form does not deliver anything.** It validates, shows
proper errors, and then tells the visitor in plain words that their message
was not sent. That is deliberate — a form that silently swallows enquiries is
worse than no form.

The form POSTs `application/json` to whatever URL is in
`NEXT_PUBLIC_FORM_ENDPOINT`:

```json
{
  "name": "…",
  "email": "…",
  "destination": "…",
  "timing": "…",
  "guests": "…",
  "weddingStyle": "…",
  "budget": "…",
  "message": "…",
  "consent": true,
  "source": "https://…/contact"
}
```

Any 2xx response is treated as success. Anything else shows the error state.

### Option A — Formspree (no code, ~5 minutes)

1. Create a form at formspree.io and copy the endpoint
   (`https://formspree.io/f/xxxxxxxx`).
2. Set `NEXT_PUBLIC_FORM_ENDPOINT` to it.
3. Done. Formspree accepts this JSON shape as-is and emails it on.

Free tier is capped at 50 submissions/month — fine for a wedding planner.

### Option B — Resend via a Next.js API route (recommended for control)

Works on Vercel/Node hosting, not on a static export.

1. `npm install resend`
2. Create `src/app/api/enquiry/route.ts`:

```ts
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
  const data = await request.json();

  // Re-validate server side. Never trust the browser.
  if (!data?.email || !data?.name || !data?.message || data?.consent !== true) {
    return Response.json({ error: "Invalid submission" }, { status: 400 });
  }

  await resend.emails.send({
    from: "Website <enquiries@your-domain.com>",
    to: ["hello@your-domain.com"],
    replyTo: data.email,
    subject: `Wedding enquiry — ${data.name}`,
    text: Object.entries(data)
      .map(([key, value]) => `${key}: ${value}`)
      .join("\n"),
  });

  return Response.json({ ok: true });
}
```

3. Set `RESEND_API_KEY` (server-side secret, no `NEXT_PUBLIC_` prefix) and
   `NEXT_PUBLIC_FORM_ENDPOINT=/api/enquiry`.
4. Verify the sending domain in Resend, or delivery will go to spam.

### Option C — Web3Forms (static-export friendly, no server)

1. Get an access key at web3forms.com.
2. Set `NEXT_PUBLIC_FORM_ENDPOINT=https://api.web3forms.com/submit`.
3. Add the key to the POST body in
   `src/components/form/EnquiryForm.tsx` (`access_key: "…"`).

Note: the key is visible in the page source. That is how Web3Forms works and
it is fine, but it means the endpoint can be spammed. The form already has a
honeypot field; add their hCaptcha option if spam becomes a problem.

### Spam protection already in place

A hidden `company` honeypot field. Bots fill it, humans don't; filled
submissions are silently dropped. No CAPTCHA, because CAPTCHAs cost real
enquiries. Revisit only if spam actually arrives.

---

## 2. Canonical domain — REQUIRED before launch

Set `NEXT_PUBLIC_SITE_URL` to the live origin (no trailing slash). Without it,
canonical tags, Open Graph URLs, `sitemap.xml` and `robots.txt` all point at
`https://eclesare.example`, which does not resolve. **Search engines will
index the wrong URLs if this is missed.**

---

## 3. Analytics — optional, has legal consequences in Spain

Nothing is installed, and the site currently sets **no cookies at all**. That
is why there is no cookie banner.

Adding Google Analytics changes that: under Spanish/EU law it needs a consent
banner with genuine opt-in before any script loads, and the privacy policy has
to name it. If analytics are wanted without that overhead, use a cookieless
tool (Plausible, Fathom, Umami, Vercel Analytics) — still declare it in the
privacy policy, but no banner is required.

---

## 4. Privacy policy — REQUIRED before launch

`/privacy` is a template with four sections flagged "Needs completing". Spanish
law also requires an *Aviso legal* with the legal entity name, registered
address and NIF/CIF. Have it checked by someone qualified — this file is not
legal advice.

The page is `noindex` so it can't be indexed in its unfinished state. Remove
`noIndex: true` from `src/app/privacy/page.tsx` once it is real.

---

## 5. Photography

The Indian weddings section and one portfolio entry render labelled image
slots because no Indian wedding photography was supplied. Everything else uses
crops of the four images provided.

**Those four images appear to be AI-generated.** For a luxury wedding planner
this is a credibility risk: couples and venues recognise it, and competitors
use real work. Replace them with real photographs from actual weddings — with
the photographer's permission and credit — as a priority.

To add images: drop `.webp` files into `public/images/`, run
`python3 scripts/images.py`, then reference the new keys from
`src/content/weddings.ts` / `src/content/portfolio.ts`.

---

## 6. Contact details

Email, phone, Instagram and service areas are placeholders and render with a
dotted underline. Set them in `src/content/site.ts` and flip `pending` to
`false`. Until then they are also excluded from the structured data, so no
false information is published to search engines.

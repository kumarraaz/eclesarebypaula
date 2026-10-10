/**
 * All page copy, in one place, so it can be reviewed, edited and eventually
 * translated without touching components. English only for now — see
 * src/content/README.md for adding Spanish.
 */

export const copy = {
  home: {
    hero: {
      eyebrow: "Wedding planning & design · Spain",
      headline: ["Different cultures.", "One beautiful celebration."],
      body: "We create thoughtful, beautifully considered weddings in Spain, shaped around your story, traditions and the way you want to celebrate.",
      primaryCta: { label: "Plan your wedding", href: "/contact" },
      secondaryCta: { label: "Explore our work", href: "/portfolio" },
      imageAlt:
        "Candlelit wedding table set with ivory linen, cream roses and crystal glassware, guests gathered beyond at sunset.",
    },
    intro: {
      eyebrow: "Our approach",
      headline: "A celebration that feels like you.",
      body: [
        "Every couple brings a different story. Our role is to bring together the people, traditions, setting and details that make your wedding feel personal, effortless and entirely your own.",
      ],
      aside:
        "We work with couples marrying in Spain — many of them travelling from somewhere else, most of them bringing two cultures to one table.",
      imageAlt:
        "A long wedding table laid with candles, pale roses and greenery in evening light.",
    },
    styles: {
      eyebrow: "Wedding experiences",
      headline: "Three traditions. One standard of care.",
      body: "Each celebration is planned on its own terms — its own suppliers, schedule and visual language — with the same attention behind it.",
    },
    services: {
      eyebrow: "Services",
      headline: "Considered in every detail.",
      body: "Engaged across the whole wedding, or for the parts where it counts most.",
      cta: { label: "See what’s included", href: "/services" },
    },
    portfolio: {
      eyebrow: "Portfolio",
      headline: "Real celebrations. Personal stories.",
      body: "A look at how each wedding is presented — setting, style and the detail behind it.",
      cta: { label: "View the portfolio", href: "/portfolio" },
    },
    process: {
      eyebrow: "The process",
      headline: "A clear path to your wedding day.",
      body: "Four stages, each with a clear end point, so you always know what has been decided and what comes next.",
    },
    about: {
      eyebrow: "About",
      headline: "Personal by nature. Precise by design.",
      cta: { label: "Get to know us", href: "/about" },
    },
    finalCta: {
      headline: "Your story deserves a thoughtful beginning.",
      body: "Tell us a little about your celebration. Let’s start with a conversation.",
      cta: { label: "Enquire about your wedding", href: "/contact" },
    },
  },

  weddingsIndex: {
    eyebrow: "Wedding experiences",
    headline: "Three traditions, planned on their own terms.",
    body: "Three distinct wedding traditions, each planned with suppliers, timings and a visual language of its own — and often combined into a single celebration.",
    multicultural: {
      headline: "Two traditions, one weekend",
      body: "Many of the couples we work with are bringing together two cultures. That usually means more than one ceremony, more than one set of expectations and two families who both need to feel at home. We plan those weddings as one connected schedule rather than two events sharing a venue.",
      cta: { label: "Talk to us about a multicultural wedding", href: "/contact" },
    },
  },

  services: {
    eyebrow: "Services",
    headline: "Considered in every detail.",
    body: "Four areas of work. Most couples engage us across all of them; some only for the parts where they want specialist help. We will tell you honestly which you need.",
    note: "Scope and pricing are agreed after an initial conversation — they depend on guest numbers, the number of events and how much of the planning you want to keep.",
  },

  portfolio: {
    eyebrow: "Portfolio",
    headline: "Real celebrations. Personal stories.",
    body: "Each wedding is presented with the setting, the style and the thinking behind it.",
  },

  about: {
    eyebrow: "About",
    headline: "Personal by nature. Precise by design.",
    body: [
      "Good wedding planning is two things at once. It is personal — listening properly, understanding what each family needs, noticing what is not being said. And it is precise — schedules that hold, contracts that are read, suppliers who arrive when they said they would.",
      "We think the second is what makes the first possible. When the logistics are genuinely handled, there is room for the day to feel like yours.",
    ],
    philosophyHeadline: "How we work",
    philosophy: [
      {
        title: "We plan for the guests too",
        body: "A wedding works when the people in it know where to be and feel looked after. Guest logistics are part of the design, not an administrative afterthought.",
      },
      {
        title: "We say what things cost",
        body: "A budget framework early, and honest answers about what is and is not achievable within it. No surprises in the final month.",
      },
      {
        title: "We do not have a house style",
        body: "The design comes from you, the venue and the season — not from a signature look applied to every couple.",
      },
    ],
    cta: { label: "Start a conversation", href: "/contact" },
  },

  contact: {
    eyebrow: "Enquire",
    headline: "Let’s start with a conversation.",
    body: "Tell us a little about your celebration — the more you can share, the more useful our first reply will be. We respond to every enquiry personally.",
    formTitle: "Wedding enquiry",
    responseNote:
      "We read every enquiry ourselves. If your date or location is not something we can serve well, we will tell you and point you somewhere better.",
  },

  privacy: {
    eyebrow: "Legal",
    headline: "Privacy policy",
    body: "This page is a template. It must be reviewed and completed by the business owner — and ideally checked against Spanish and EU data protection law (GDPR / LOPDGDD) — before the site goes live.",
  },

  notFound: {
    headline: "This page has moved on.",
    body: "The page you were looking for isn’t here. Try the main navigation, or get in touch and we’ll point you the right way.",
    cta: { label: "Back to the homepage", href: "/" },
  },
} as const;

export type Copy = typeof copy;

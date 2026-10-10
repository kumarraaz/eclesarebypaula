import type { WeddingStyle } from "./types";

export const weddingStyles: WeddingStyle[] = [
  {
    id: "spanish",
    slug: "spanish-weddings",
    navLabel: "Spanish weddings",
    title: "Spanish weddings",
    eyebrow: "Mediterranean",
    summary:
      "Celebrate the beauty of Spain through meaningful traditions, extraordinary settings and unforgettable gatherings.",
    intro:
      "A wedding in Spain is unhurried. Ceremonies held in the late afternoon, a long aperitivo under the olive trees, dinner that runs into the night. We plan around that rhythm rather than against it — choosing the setting first, then shaping the day so it feels generous and easy for everyone in it.",
    ctaLabel: "Explore Spanish weddings",
    accent: "spanish",
    image: "style_spanish",
    imageBrief:
      "Finca or coastal venue, olive trees, long-table dinner in warm late light.",
    highlights: [
      "Fincas, cortijos, coastal estates and historic courtyards",
      "Outdoor ceremonies timed to the light",
      "Long-table dinners and late, generous evenings",
      "Regional food, wine and music, chosen with intent",
      "Local suppliers who know the venue and the region",
    ],
    considerations: [
      {
        title: "Setting first",
        body: "The venue shapes everything that follows — the timings, the menu, how guests move through the day. We shortlist against how you want the day to feel, not against a list of features.",
      },
      {
        title: "Legal and symbolic ceremonies",
        body: "Civil, religious and symbolic ceremonies each carry different paperwork and lead times in Spain. We set out what each route involves early, so the choice is made on preference rather than deadline.",
      },
      {
        title: "Heat, light and timing",
        body: "A summer schedule in Andalusia is not a summer schedule in Girona. Ceremony times, shade, water and the dinner hour are planned around the actual conditions of your date and region.",
      },
      {
        title: "Guests from elsewhere",
        body: "Most of our couples bring guests in from other countries. Travel, transfers and a clear itinerary are part of the plan from the beginning, not an afterthought.",
      },
    ],
    seo: {
      title: "Spanish Weddings — Destination Wedding Planning in Spain",
      description:
        "Wedding planning and design for Spanish celebrations — fincas, olive groves and coastal venues, long-table dinners and ceremonies shaped around the Mediterranean light.",
    },
  },
  {
    id: "french-inspired",
    slug: "french-inspired-weddings",
    navLabel: "French-inspired weddings",
    title: "French-inspired weddings",
    eyebrow: "Garden romance",
    summary:
      "Timeless romance, thoughtful details and an effortlessly elegant atmosphere inspired by French wedding aesthetics.",
    intro:
      "A quieter register: restrained florals, soft ivory and muted green, a garden table set with real care. This is an aesthetic direction rather than a location — we bring that sensibility to venues in Spain, where walled gardens, formal terraces and stone architecture make it feel entirely at home.",
    ctaLabel: "Explore French-inspired weddings",
    accent: "french",
    image: "style_french",
    imageBrief:
      "Walled garden or formal terrace, restrained ivory and green florals, candlelit outdoor dining.",
    highlights: [
      "Walled gardens, formal terraces and historic architecture",
      "Restrained floral design in ivory, cream and muted green",
      "Considered tablescapes, linen, glassware and stationery",
      "Candlelit outdoor dining and long, slow evenings",
      "A consistent palette carried from invitation to final table",
    ],
    considerations: [
      {
        title: "An aesthetic, not a country",
        body: "These weddings take place at venues in Spain. We draw on a French visual language — proportion, restraint, a narrow palette — rather than relocating the celebration.",
      },
      {
        title: "Restraint takes more planning",
        body: "A pared-back room only works when every element agrees. Linen, glassware, candle height, flower variety and print stock are specified together, not sourced piecemeal.",
      },
      {
        title: "Light as material",
        body: "Candlelight, low ambient lighting and the hour the sun drops do more for the atmosphere than any installation. We plan the evening around them.",
      },
      {
        title: "Seasonal flowers",
        body: "A muted palette depends on what is genuinely in season. We build the floral direction around the month you marry so it reads natural rather than imported.",
      },
    ],
    seo: {
      title: "French-Inspired Weddings in Spain — Planning & Design",
      description:
        "French-inspired wedding planning and design at venues in Spain. Restrained florals, muted ivory and green palettes, candlelit garden dining and considered detail.",
    },
  },
  {
    id: "indian",
    slug: "indian-weddings",
    navLabel: "Indian weddings",
    title: "Indian weddings",
    eyebrow: "Multi-day celebration",
    summary:
      "Honour your traditions with thoughtfully coordinated ceremonies, vibrant celebrations and a seamless destination wedding experience.",
    intro:
      "An Indian wedding in Spain is several events, several hundred people and several days — and it only feels effortless when the logistics behind it are exact. We plan the full arc, from the first welcome evening to the farewell brunch, working with specialist suppliers and venues that can genuinely accommodate the scale, the catering and the ceremony requirements.",
    ctaLabel: "Explore Indian weddings",
    accent: "indian",
    // No Indian wedding photography has been supplied yet — a labelled slot
    // is rendered until the client provides images. See src/content/README.md.
    image: null,
    imageBrief:
      "Mandap at a Spanish venue, ceremony detail, haldi or sangeet in daylight, couple in wedding attire.",
    highlights: [
      "Mandap design and ceremony coordination",
      "Multi-day schedules — mehndi, sangeet, ceremony, reception",
      "Specialist catering, including fully vegetarian and Jain menus",
      "Venues able to hold large guest numbers and open flame",
      "Priest, musician and entertainment coordination",
      "Accommodation and transport across every event",
    ],
    considerations: [
      {
        title: "Venue capability comes first",
        body: "Not every Spanish venue can host a ceremonial fire, a 400-person dinner or a production kitchen. We shortlist on what the venue can actually deliver before anything else is discussed.",
      },
      {
        title: "Catering is the long lead",
        body: "Authentic catering at destination scale needs early commitment — specialist teams, equipment and ingredients are booked well ahead of the rest of the supplier list.",
      },
      {
        title: "Several events, one schedule",
        body: "Each function has its own setup, suppliers, dress and guest list. They are planned as one connected timeline so nothing collides and no guest is left guessing.",
      },
      {
        title: "Traditions led by you",
        body: "We do not assume which rituals matter to your families. You tell us what is non-negotiable and we build the day around it.",
      },
    ],
    seo: {
      title: "Indian Destination Weddings in Spain — Planning & Coordination",
      description:
        "Indian destination wedding planning in Spain. Mandap and ceremony coordination, multi-day celebrations, specialist catering and full guest logistics.",
    },
  },
];

export const getWeddingStyle = (slug: string) =>
  weddingStyles.find((style) => style.slug === slug);

import type { ProcessStep, Service } from "./types";

export const services: Service[] = [
  {
    number: "01",
    title: "Full Wedding Planning",
    summary:
      "End-to-end planning from the first conversation to the last guest leaving.",
    includes: [
      "Venue research and shortlisting",
      "Budget framework and ongoing management",
      "Supplier sourcing, negotiation and contracts",
      "Planning schedule and production timeline",
      "On-the-day coordination and execution",
    ],
  },
  {
    number: "02",
    title: "Wedding Design & Styling",
    summary:
      "A single visual direction, carried consistently from invitation to final table.",
    includes: [
      "Creative direction and concept development",
      "Floral design briefs and sign-off",
      "Tablescapes, linen, glassware and tableware",
      "Stationery coordination",
      "Lighting design and atmosphere",
    ],
  },
  {
    number: "03",
    title: "Multi-Day Celebrations",
    summary:
      "Several events planned as one connected schedule rather than separate days.",
    includes: [
      "Welcome dinners and pre-wedding gatherings",
      "Cultural and religious ceremonies",
      "Reception production",
      "Farewell brunches and send-offs",
      "Cross-event supplier and timing coordination",
    ],
  },
  {
    number: "04",
    title: "Guest Experience",
    summary:
      "The part guests actually remember — knowing where to be and feeling looked after.",
    includes: [
      "Accommodation guidance and room blocks",
      "Transport and transfer coordination",
      "Guest communication and itineraries",
      "Destination information and recommendations",
      "Arrival and departure logistics",
    ],
  },
];

export const processSteps: ProcessStep[] = [
  {
    number: "01",
    title: "Discover",
    body: "We start with a conversation. Your story, who is coming, which traditions matter, what you want the day to feel like, and what you would rather avoid. This is also where the budget becomes a real number rather than a hope.",
  },
  {
    number: "02",
    title: "Design",
    body: "A creative direction, a venue shortlist and a budget framework you can actually make decisions against. You see the whole shape of the wedding before anything is committed.",
  },
  {
    number: "03",
    title: "Plan",
    body: "Suppliers sourced and contracted, schedules built, guest logistics arranged, details resolved. You approve; we handle the chasing, the paperwork and the hundred small decisions in between.",
  },
  {
    number: "04",
    title: "Celebrate",
    body: "We run the day. Setup, timings, suppliers, the moments that need protecting and the problems you never hear about. Your only job is to be present at your own wedding.",
  },
];

import type { Metadata } from "next";

import { PageHeader } from "@/components/layout/PageHeader";
import {
  Container,
  PendingText,
  PlaceholderTag,
  Section,
} from "@/components/ui/primitives";
import { copy } from "@/content/copy";
import { site } from "@/content/site";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Privacy Policy",
  description:
    "How enquiry data is collected, used and stored, and what cookies this website sets.",
  path: "/privacy",
  noIndex: true,
});

const sections = [
  {
    id: "who",
    title: "Who we are",
    body: [
      "This website is operated by the business named below. The legal entity name, registered address and tax identifier must be completed before the site is published — Spanish law requires them to be stated.",
    ],
    todo: true,
  },
  {
    id: "what",
    title: "What we collect",
    body: [
      "When you submit the enquiry form we collect the name, email address and any other details you choose to include: destination, date or season, guest count, wedding style, budget range and your message.",
      "We collect this so we can reply to your enquiry and, if you go on to work with us, plan your wedding. We do not sell it, and we do not use it for marketing unless you separately ask us to.",
    ],
  },
  {
    id: "basis",
    title: "Legal basis and retention",
    body: [
      "Under the GDPR the basis for processing enquiry data is your consent, given when you tick the consent box, and our legitimate interest in responding to a direct approach.",
      "State here how long enquiry data is kept — a defined period, for example 24 months from last contact, is expected. This has to be decided by the business owner.",
    ],
    todo: true,
  },
  {
    id: "rights",
    title: "Your rights",
    body: [
      "You can ask for a copy of the data held about you, ask for it to be corrected or deleted, withdraw consent, or object to its processing. Contact us using the details below.",
      "If you are not satisfied with our response you can complain to the Spanish data protection authority, the Agencia Española de Protección de Datos (AEPD).",
    ],
  },
  {
    id: "processors",
    title: "Who else sees it",
    body: [
      "List every third party that processes enquiry data: the form provider, the email host, the website host and any analytics provider. Each needs naming, with its country of processing. Fonts are self-hosted, so no font request leaves this site.",
    ],
    todo: true,
  },
  {
    id: "cookies",
    title: "Cookies",
    body: [
      "This website sets no analytics, advertising or tracking cookies as built. If an analytics tool or an embedded map, video or booking widget is added later, a consent banner becomes legally required in Spain — and this section has to be updated to describe each cookie, its purpose and its lifetime.",
    ],
    todo: true,
  },
];

export default function PrivacyPage() {
  const { privacy } = copy;

  return (
    <>
      <PageHeader eyebrow={privacy.eyebrow} title={privacy.headline} />

      <Section spacing="default" className="bg-ivory">
        <Container width="narrow">
          <div
            data-reveal
            className="border-l-2 border-[#9b4a3a]/50 bg-[#9b4a3a]/5 px-6 py-5"
          >
            <p className="eyebrow text-[#9b4a3a]">Template — not legal advice</p>
            <p className="mt-3 text-[0.92rem] leading-relaxed text-charcoal/75">
              {privacy.body}
            </p>
          </div>

          <div className="mt-14">
            {sections.map((section) => (
              <section
                key={section.id}
                id={section.id}
                data-reveal
                className="scroll-mt-32 border-t border-charcoal/12 py-9"
              >
                <h2 className="font-display text-[1.65rem] leading-tight text-charcoal">
                  {section.title}
                </h2>
                {section.body.map((paragraph) => (
                  <p
                    key={paragraph}
                    className="mt-4 text-[0.98rem] leading-[1.8] text-charcoal-muted"
                  >
                    {paragraph}
                  </p>
                ))}
                {section.todo && (
                  <div className="mt-5">
                    <PlaceholderTag>Needs completing before launch</PlaceholderTag>
                  </div>
                )}
              </section>
            ))}

            <section className="border-t border-charcoal/12 py-9">
              <h2 className="font-display text-[1.65rem] leading-tight text-charcoal">
                Contact
              </h2>
              <p className="mt-4 text-[0.98rem] leading-[1.8] text-charcoal-muted">
                Data protection enquiries:{" "}
                <PendingText {...site.contact.email} />
              </p>
            </section>
          </div>
        </Container>
      </Section>
    </>
  );
}

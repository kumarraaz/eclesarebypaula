import type { Metadata } from "next";

import { EnquiryForm } from "@/components/form/EnquiryForm";
import { PageHeader } from "@/components/layout/PageHeader";
import {
  Container,
  PendingText,
  Section,
  revealDelay,
} from "@/components/ui/primitives";
import { copy } from "@/content/copy";
import { site } from "@/content/site";
import { weddingStyles } from "@/content/weddings";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Enquire — Wedding Planning in Spain",
  description:
    "Start a conversation about your wedding in Spain. Tell us the destination, the season, who’s coming and what matters most — we reply to every enquiry personally.",
  path: "/contact",
});

export default function ContactPage() {
  const { contact } = copy;
  const { contact: details } = site;

  return (
    <>
      <PageHeader
        align="split"
        eyebrow={contact.eyebrow}
        title={contact.headline}
        lede={contact.body}
      />

      <Section spacing="default" className="bg-ivory">
        <Container>
          <div className="grid gap-14 lg:grid-cols-12 lg:gap-16">
            <div data-reveal className="lg:col-span-7">
              <h2 className="sr-only">{contact.formTitle}</h2>
              <EnquiryForm />
            </div>

            <aside
              data-reveal
              style={revealDelay(120)}
              className="lg:col-span-4 lg:col-start-9"
            >
              <div className="border-t border-charcoal/12 pt-7">
                <h2 className="eyebrow text-olive">Direct</h2>
                <ul className="mt-5 flex flex-col gap-3 text-[0.95rem] text-charcoal-muted">
                  <li>
                    <PendingText {...details.email} />
                  </li>
                  <li>
                    <PendingText {...details.phone} />
                  </li>
                  <li>
                    <PendingText {...details.instagramHandle} />
                  </li>
                </ul>
              </div>

              <div className="mt-10 border-t border-charcoal/12 pt-7">
                <h2 className="eyebrow text-olive">Where we work</h2>
                <p className="mt-5 text-[0.95rem] leading-relaxed text-charcoal-muted">
                  <PendingText {...details.serviceAreas} />
                </p>
              </div>

              <div className="mt-10 border-t border-charcoal/12 pt-7">
                <h2 className="eyebrow text-olive">Wedding styles</h2>
                <ul className="mt-5 flex flex-col gap-2.5">
                  {weddingStyles.map((style) => (
                    <li
                      key={style.id}
                      className="text-[0.95rem] text-charcoal-muted"
                    >
                      {style.navLabel}
                    </li>
                  ))}
                  <li className="text-[0.95rem] text-charcoal-muted">
                    Multicultural celebrations
                  </li>
                </ul>
              </div>

              <p className="mt-10 border-l border-olive/30 pl-5 text-[0.88rem] leading-relaxed text-charcoal/60">
                {contact.responseNote}
              </p>
            </aside>
          </div>
        </Container>
      </Section>
    </>
  );
}

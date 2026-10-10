import type { Metadata } from "next";

import { AboutPreview } from "@/components/sections/AboutPreview";
import { FinalCta } from "@/components/sections/FinalCta";
import { Hero } from "@/components/sections/Hero";
import { Intro } from "@/components/sections/Intro";
import { PortfolioSection } from "@/components/sections/Portfolio";
import { ProcessSection } from "@/components/sections/Process";
import { ServicesSection } from "@/components/sections/Services";
import { TestimonialsSection } from "@/components/sections/Testimonials";
import { WeddingStylesSection } from "@/components/sections/WeddingStyles";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Wedding Planner in Spain",
  description:
    "Boutique wedding planning and design in Spain for Spanish, French-inspired and Indian celebrations. Destination weddings shaped around your story and traditions.",
  path: "/",
});

export default function HomePage() {
  return (
    <>
      <Hero />
      <Intro />
      <WeddingStylesSection />
      <ServicesSection />
      <PortfolioSection />
      <ProcessSection />
      <AboutPreview />
      <TestimonialsSection />
      <FinalCta />
    </>
  );
}

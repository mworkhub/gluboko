import type { Metadata } from "next";
import { AboutHero } from "@/components/about/AboutHero";
import { MissionSection } from "@/components/about/MissionSection";
import { StatsRow } from "@/components/about/StatsRow";
import { AboutTestimonials } from "@/components/about/AboutTestimonials";
import { TrustBanner } from "@/components/about/TrustBanner";
import { CtaBar } from "@/components/layout/CtaBar";
import { FALLBACK_CONTACT, getSiteSetting } from "@/lib/settings";
import type { ContactSettings } from "@/lib/types";

export const metadata: Metadata = {
  title: "Про нас",
  description:
    "«Глибоко» — преміальний сервіс озонування та хімчистки меблів у Києві та Київській області. Дізнайтесь більше про нашу місію та підхід до роботи.",
};

export default async function ProNasPage() {
  const contact = await getSiteSetting<ContactSettings>("contact");
  const resolvedContact = contact ?? FALLBACK_CONTACT;

  return (
    <>
      <AboutHero />
      <MissionSection />
      <StatsRow />
      <AboutTestimonials />
      <TrustBanner />
      <CtaBar contact={resolvedContact} />
    </>
  );
}

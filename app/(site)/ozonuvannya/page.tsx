import type { Metadata } from "next";
import { ServiceHero } from "@/components/service/ServiceHero";
import { ServiceTypeGrid } from "@/components/service/ServiceTypeGrid";
import { SafetyBanner } from "@/components/service/SafetyBanner";
import { WhereUsedStrip } from "@/components/service/WhereUsedStrip";
import { ConsultationBanner } from "@/components/service/ConsultationBanner";
import { AdvantagesStrip } from "@/components/home/AdvantagesStrip";
import { CtaBar } from "@/components/layout/CtaBar";
import { FALLBACK_ADVANTAGES, FALLBACK_CONTACT, getSiteSetting } from "@/lib/settings";
import type { AdvantagesSettings, ContactSettings } from "@/lib/types";

export const metadata: Metadata = {
  title: "Озонування приміщень та авто у Києві",
  description:
    "Озонування квартир, будинків, авто, офісів, готелів та складів. Усуває до 99% бактерій, вірусів, алергенів і запахів. Виїзд по Києву та області.",
};

export default async function OzonuvannyaPage() {
  const [contact, advantages] = await Promise.all([
    getSiteSetting<ContactSettings>("contact"),
    getSiteSetting<AdvantagesSettings>("advantages"),
  ]);
  const resolvedContact = contact ?? FALLBACK_CONTACT;

  return (
    <>
      <ServiceHero category="ozone" />
      <ServiceTypeGrid category="ozone" />
      <SafetyBanner />
      <WhereUsedStrip />
      <AdvantagesStrip advantages={advantages ?? FALLBACK_ADVANTAGES} />
      <ConsultationBanner category="ozone" contact={resolvedContact} />
      <CtaBar category="ozone" contact={resolvedContact} />
    </>
  );
}

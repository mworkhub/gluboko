import type { Metadata } from "next";
import { ServiceHero } from "@/components/service/ServiceHero";
import { ServiceTypeGrid } from "@/components/service/ServiceTypeGrid";
import { InfoBanner } from "@/components/service/InfoBanner";
import { ConsultationBanner } from "@/components/service/ConsultationBanner";
import { AdvantagesStrip } from "@/components/home/AdvantagesStrip";
import { CtaBar } from "@/components/layout/CtaBar";
import { FALLBACK_ADVANTAGES, FALLBACK_CONTACT, getSiteSetting } from "@/lib/settings";
import type { AdvantagesSettings, ContactSettings } from "@/lib/types";

export const metadata: Metadata = {
  title: "Хімчистка меблів на виїзд у Києві",
  description:
    "Хімчистка м'яких меблів, килимів, дитячих крісел і ліжечок, матраців та стільців з виїздом. Гіпоалергенні засоби, безпечно для дітей і тварин.",
};

export default async function HimchistkaMebliviPage() {
  const [contact, advantages] = await Promise.all([
    getSiteSetting<ContactSettings>("contact"),
    getSiteSetting<AdvantagesSettings>("advantages"),
  ]);
  const resolvedContact = contact ?? FALLBACK_CONTACT;

  return (
    <>
      <ServiceHero category="dry_cleaning" />
      <ServiceTypeGrid category="dry_cleaning" />
      <InfoBanner />
      <AdvantagesStrip advantages={advantages ?? FALLBACK_ADVANTAGES} />
      <ConsultationBanner category="dry_cleaning" contact={resolvedContact} />
      <CtaBar category="dry_cleaning" contact={resolvedContact} />
    </>
  );
}

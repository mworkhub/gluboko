import { Hero } from "@/components/home/Hero";
import { AdvantagesStrip } from "@/components/home/AdvantagesStrip";
import { QuoteBlock } from "@/components/home/QuoteBlock";
import { Reviews } from "@/components/home/Reviews";
import { CtaBar } from "@/components/layout/CtaBar";
import { FALLBACK_ABOUT, FALLBACK_ADVANTAGES, FALLBACK_CONTACT, getSiteSetting } from "@/lib/settings";
import type { AboutSettings, AdvantagesSettings, ContactSettings } from "@/lib/types";

export default async function Home() {
  const [about, advantages, contact] = await Promise.all([
    getSiteSetting<AboutSettings>("about"),
    getSiteSetting<AdvantagesSettings>("advantages"),
    getSiteSetting<ContactSettings>("contact"),
  ]);

  return (
    <>
      <Hero />
      <AdvantagesStrip advantages={advantages ?? FALLBACK_ADVANTAGES} />
      <QuoteBlock about={about ?? FALLBACK_ABOUT} />
      <Reviews />
      <div id="contacts" className="scroll-mt-24">
        <CtaBar contact={contact ?? FALLBACK_CONTACT} />
      </div>
    </>
  );
}

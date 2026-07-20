import { Hero } from "@/components/home/Hero";
import { AdvantagesStrip } from "@/components/home/AdvantagesStrip";
import { QuoteBlock } from "@/components/home/QuoteBlock";
import { Reviews } from "@/components/home/Reviews";
import { CtaBar } from "@/components/layout/CtaBar";
import { HOME_ADVANTAGES } from "@/content/home";
import { FALLBACK_ABOUT, FALLBACK_CONTACT, getSiteSetting } from "@/lib/settings";
import type { AboutSettings, ContactSettings } from "@/lib/types";

export default async function Home() {
  const [about, contact] = await Promise.all([
    getSiteSetting<AboutSettings>("about"),
    getSiteSetting<ContactSettings>("contact"),
  ]);

  return (
    <>
      <Hero />
      <AdvantagesStrip advantages={HOME_ADVANTAGES} />
      <QuoteBlock about={about ?? FALLBACK_ABOUT} />
      <Reviews />
      <div id="contacts" className="scroll-mt-24">
        <CtaBar contact={contact ?? FALLBACK_CONTACT} />
      </div>
    </>
  );
}

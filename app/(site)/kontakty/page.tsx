import type { Metadata } from "next";
import { BadgeCheck, Gift, Leaf, Phone, ShieldCheck, Wrench } from "lucide-react";
import { MessengerIcons } from "@/components/shared/BrandIcons";
import { MapIllustration } from "@/components/shared/MapIllustration";
import { KontaktyHero } from "@/components/shared/KontaktyHero";
import { BenefitsRow } from "@/components/shared/BenefitsRow";
import { GiftCtaButton } from "@/components/shared/GiftCtaButton";
import { CONTACT_BENEFITS, SAFETY_PRIORITY_POINTS } from "@/content/pages";
import { FALLBACK_CONTACT, getSiteSetting } from "@/lib/settings";
import type { ContactSettings } from "@/lib/types";

export const metadata: Metadata = {
  title: "Контакти",
  description: "Телефонуйте або пишіть нам — ми на зв'язку щодня. Виїзд по Києву та Київській області.",
};

const SAFETY_ICONS = { wrench: Wrench, "shield-check": ShieldCheck, leaf: Leaf, "badge-check": BadgeCheck } as const;

export default async function KontaktyPage() {
  const contact = (await getSiteSetting<ContactSettings>("contact")) ?? FALLBACK_CONTACT;

  return (
    <>
      <KontaktyHero />

      <section className="px-5 pb-16 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <BenefitsRow items={CONTACT_BENEFITS} />
        </div>
      </section>

      <section className="px-5 pb-16 lg:px-8">
        <div className="mx-auto grid max-w-6xl gap-6 lg:grid-cols-[1.2fr_1fr_1fr]">
          <div className="flex flex-col gap-6 rounded-2xl bg-mocha p-8 text-cream">
            <div className="flex items-center gap-3">
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-cream/25">
                <Phone className="h-4 w-4 text-gold-light" />
              </span>
              <div>
                <p className="text-xs font-semibold uppercase tracking-widest text-gold">Єдиний контакт</p>
                <p className="text-sm text-cream/70">Телефонуйте або пишіть нам</p>
              </div>
            </div>

            <a href={contact.phoneHref} className="font-display text-2xl text-cream whitespace-nowrap">
              {contact.phoneDisplay}
            </a>

            <div className="border-t border-cream/10 pt-6">
              <a
                href={contact.phoneHref}
                className="inline-flex w-fit items-center gap-2 rounded-full bg-gold px-5 py-3 text-xs font-bold uppercase tracking-wide text-ink transition-colors hover:bg-gold-light"
              >
                <Phone className="h-4 w-4" /> Подзвонити
              </a>
            </div>

            <div className="border-t border-cream/10 pt-6">
              <div className="mb-4 flex items-center gap-3 text-cream/50">
                <span className="h-px flex-1 bg-cream/15" />
                <span className="shrink-0 text-xs">Ми також у месенджерах</span>
                <span className="h-px flex-1 bg-cream/15" />
              </div>
              <MessengerIcons contact={contact} variant="ghost" className="justify-center" />
            </div>
          </div>

          <div className="rounded-2xl border border-ink/8 bg-white p-8">
            <p className="text-xs font-semibold uppercase tracking-widest text-gold">Ми працюємо для вас</p>
            <div className="mt-4 flex flex-col gap-3 text-sm text-ink">
              <p>{contact.hours}</p>
              <p>Без вихідних</p>
              <p>Зона обслуговування: {contact.city}</p>
            </div>
          </div>

          <MapIllustration className="min-h-[260px]" />
        </div>
      </section>

      <section className="px-5 pb-16 lg:px-8">
        <div className="mx-auto max-w-6xl rounded-2xl border border-ink/8 bg-cream-deep/50 p-7 lg:p-9">
          <div className="flex items-start gap-4">
            <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-white">
              <ShieldCheck className="h-5 w-5 text-gold" strokeWidth={1.5} />
            </span>
            <div>
              <h2 className="font-display text-lg text-ink">Ваша безпека — наш пріоритет</h2>
              <p className="mt-1 max-w-2xl text-sm leading-relaxed text-slate">
                Використовуємо професійне обладнання та дотримуємось усіх норм безпеки. Після процедури приміщення
                повністю безпечне для людей і тварин.
              </p>
            </div>
          </div>

          <div className="mt-7 grid grid-cols-2 gap-x-6 gap-y-5 sm:grid-cols-4">
            {SAFETY_PRIORITY_POINTS.map((point) => {
              const Icon = SAFETY_ICONS[point.icon];
              return (
                <div key={point.title} className="flex items-center gap-2.5">
                  <Icon className="h-4 w-4 shrink-0 text-gold" strokeWidth={1.5} />
                  <p className="text-xs font-semibold text-ink">{point.title}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="px-5 pb-16 lg:px-8">
        <div className="mx-auto flex max-w-6xl flex-col items-center gap-5 rounded-2xl bg-mocha px-7 py-8 text-center lg:flex-row lg:justify-between lg:text-left">
          <div className="flex items-center gap-4">
            <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-gold/15">
              <Gift className="h-5 w-5 text-gold" strokeWidth={1.5} />
            </span>
            <div>
              <p className="font-display text-base text-cream">Подарунок для нових клієнтів!</p>
              <p className="text-sm text-cream/70">
                Залиште заявку зараз і отримайте приємний бонус до першого замовлення.
              </p>
            </div>
          </div>
          <GiftCtaButton />
        </div>
      </section>
    </>
  );
}

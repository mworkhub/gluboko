"use client";

import { motion } from "motion/react";
import { Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { MessengerIcons } from "@/components/shared/BrandIcons";
import { useLeadModal } from "@/components/forms/lead-modal-context";
import type { ServiceCategory } from "@/content/services";
import type { ContactSettings } from "@/lib/types";

export function ConsultationBanner({
  category,
  contact,
}: {
  category?: ServiceCategory;
  contact: ContactSettings;
}) {
  const { open } = useLeadModal();

  return (
    <section className="px-5 pb-16 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: 18 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.5 }}
        className="mx-auto grid max-w-6xl gap-8 rounded-2xl border border-ink/8 bg-white-warm p-8 lg:grid-cols-2 lg:p-10"
      >
        <div>
          <h3 className="font-display text-xl text-ink lg:text-2xl">Не знайшли потрібний об&rsquo;єкт?</h3>
          <p className="mt-3 max-w-sm text-sm leading-relaxed text-slate">
            Напишіть нам — ми підберемо рішення саме для Вашого випадку!
          </p>
          <Button className="mt-6" onClick={() => open(category)}>
            Консультація безкоштовно
          </Button>
        </div>

        <div className="flex flex-col gap-4 border-t border-ink/8 pt-6 lg:border-l lg:border-t-0 lg:pl-8 lg:pt-0">
          <p className="text-xs font-semibold uppercase tracking-widest text-gold">Або зв&rsquo;яжіться з нами</p>
          <p className="text-sm text-slate">Зателефонуйте нам прямо зараз</p>
          <a
            href={contact.phoneHref}
            className="font-sans text-3xl font-bold tracking-tight text-ink transition-colors hover:text-gold"
          >
            {contact.phoneDisplay}
          </a>
          <Button asChild variant="outline" size="sm" className="w-fit">
            <a href={contact.phoneHref}>
              <Phone className="h-4 w-4" /> Подзвонити
            </a>
          </Button>
          <div>
            <p className="mb-3 text-xs text-slate">Ми у месенджерах</p>
            <MessengerIcons contact={contact} size="sm" />
          </div>
        </div>
      </motion.div>
    </section>
  );
}

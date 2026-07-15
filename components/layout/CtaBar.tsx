"use client";

import { motion } from "motion/react";
import { Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLeadModal } from "@/components/forms/lead-modal-context";
import { MessengerIcons } from "@/components/shared/BrandIcons";
import type { ServiceCategory } from "@/content/services";
import type { ContactSettings } from "@/lib/types";

export function CtaBar({ category, contact }: { category?: ServiceCategory; contact: ContactSettings }) {
  const { open } = useLeadModal();

  return (
    <section className="px-5 pb-8 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="mx-auto flex max-w-7xl flex-col items-center gap-6 rounded-2xl bg-ink px-6 py-8 text-center lg:flex-row lg:justify-between lg:text-left"
      >
        <div className="flex items-center gap-4">
          <a
            href={contact.phoneHref}
            className="relative flex h-14 w-14 shrink-0 items-center justify-center rounded-full border border-cream/25 text-cream transition-colors hover:bg-cream/10"
            aria-label="Зателефонувати"
          >
            <motion.span
              className="absolute inset-0 rounded-full border border-gold/50"
              animate={{ scale: [1, 1.35, 1], opacity: [0.7, 0, 0.7] }}
              transition={{ duration: 2.2, repeat: Infinity, ease: "easeOut" }}
            />
            <Phone className="relative h-5 w-5" />
          </a>
          <div>
            <p className="font-display text-base text-cream">Залишились питання?</p>
            <a href={contact.phoneHref} className="block text-sm font-semibold text-gold-light hover:underline">
              {contact.phoneDisplay}
            </a>
            <p className="text-sm text-cream/70">Ми на зв&rsquo;язку та готові допомогти!</p>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <Button onClick={() => open(category)}>Замовити послугу</Button>
          <MessengerIcons contact={contact} className="hidden sm:flex" />
        </div>
      </motion.div>
    </section>
  );
}

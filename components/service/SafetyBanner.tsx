"use client";

import { motion } from "motion/react";
import { Atom, BadgeCheck, LeafyGreen, ShieldCheck, Sparkles, Wind } from "lucide-react";
import { OZONE_SAFETY_POINTS } from "@/content/services";

const ICONS = {
  atom: Atom,
  wind: Wind,
  "shield-check": ShieldCheck,
  "leafy-green": LeafyGreen,
  sparkles: Sparkles,
  "badge-check": BadgeCheck,
} satisfies Record<(typeof OZONE_SAFETY_POINTS)[number]["icon"], typeof Atom>;

export function SafetyBanner() {
  return (
    <section className="px-5 pb-16 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: 18 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.5 }}
        className="mx-auto max-w-6xl rounded-2xl border border-ink/8 bg-cream-deep/50 p-7 lg:p-9"
      >
        <h2 className="text-center font-display text-xl text-ink lg:text-2xl">
          Безпечно для людей, тварин і рослин
        </h2>

        <div className="mt-8 grid grid-cols-2 gap-x-6 gap-y-6 sm:grid-cols-3">
          {OZONE_SAFETY_POINTS.map((point, i) => {
            const Icon = ICONS[point.icon];
            return (
              <motion.div
                key={point.text}
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.45, ease: "easeOut", delay: (i % 3) * 0.08 }}
                className="flex items-start gap-3"
              >
                <Icon className="mt-0.5 h-5 w-5 shrink-0 text-gold" strokeWidth={1.5} />
                <p className="text-sm leading-relaxed text-ink">{point.text}</p>
              </motion.div>
            );
          })}
        </div>
      </motion.div>
    </section>
  );
}

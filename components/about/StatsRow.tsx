"use client";

import { motion } from "motion/react";
import { Award, BadgeCheck, MapPin, Users } from "lucide-react";
import { ABOUT_STATS } from "@/content/about";

const ICONS = {
  award: Award,
  users: Users,
  "map-pin": MapPin,
  "badge-check": BadgeCheck,
} satisfies Record<(typeof ABOUT_STATS)[number]["icon"], typeof Award>;

export function StatsRow() {
  return (
    <section className="px-5 pb-14 lg:px-8 lg:pb-20">
      <div className="mx-auto grid max-w-7xl grid-cols-2 gap-x-6 gap-y-9 lg:grid-cols-4 lg:gap-8">
        {ABOUT_STATS.map((s, i) => {
          const Icon = ICONS[s.icon];
          return (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, ease: "easeOut", delay: i * 0.08 }}
              className="flex flex-col items-center gap-2.5 text-center"
            >
              <Icon className="h-6 w-6 text-gold" strokeWidth={1.5} />
              <p className="text-balance font-display text-lg text-ink lg:text-xl">{s.value}</p>
              <p className="text-xs leading-snug text-slate">{s.label}</p>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}

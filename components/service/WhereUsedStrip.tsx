"use client";

import { motion } from "motion/react";
import { Baby, BedDouble, Briefcase, Car, Home, Hospital, Utensils, Warehouse } from "lucide-react";
import { OZONE_WHERE_USED } from "@/content/services";

const ICONS = {
  home: Home,
  briefcase: Briefcase,
  car: Car,
  "bed-double": BedDouble,
  warehouse: Warehouse,
  baby: Baby,
  hospital: Hospital,
  utensils: Utensils,
} satisfies Record<(typeof OZONE_WHERE_USED)[number]["icon"], typeof Home>;

export function WhereUsedStrip() {
  return (
    <section className="px-5 pb-16 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <p className="text-center text-xs font-semibold uppercase tracking-[0.2em] text-gold">
          Застосування
        </p>
        <h2 className="mt-3 text-center font-display text-xl text-ink lg:text-2xl">
          Де використовується озонування
        </h2>

        <div className="mt-10 grid grid-cols-2 gap-x-6 gap-y-8 sm:grid-cols-4">
          {OZONE_WHERE_USED.map((item, i) => {
            const Icon = ICONS[item.icon];
            return (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.45, ease: "easeOut", delay: (i % 4) * 0.07 }}
                className="flex flex-col items-center gap-2.5 text-center"
              >
                <span className="flex h-11 w-11 items-center justify-center rounded-full bg-ink/5">
                  <Icon className="h-5 w-5 text-ink" strokeWidth={1.5} />
                </span>
                <p className="text-xs font-semibold leading-snug text-ink">{item.title}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

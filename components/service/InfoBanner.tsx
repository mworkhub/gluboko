"use client";

import { motion } from "motion/react";
import { SprayCan } from "lucide-react";

export function InfoBanner() {
  return (
    <section className="px-5 pb-16 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: 18 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.5 }}
        className="mx-auto flex max-w-6xl items-center gap-5 rounded-2xl bg-cream-deep/60 p-7"
      >
        <motion.span
          initial={{ scale: 0, rotate: -30 }}
          whileInView={{ scale: 1, rotate: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ type: "spring", stiffness: 240, damping: 15, delay: 0.15 }}
          className="relative flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-white"
        >
          <motion.span
            className="absolute inset-0 rounded-full bg-gold/20"
            animate={{ scale: [1, 1.35, 1], opacity: [0.6, 0, 0.6] }}
            transition={{ duration: 2.4, repeat: Infinity, ease: "easeOut" }}
          />
          <SprayCan className="relative h-6 w-6 text-gold" strokeWidth={1.5} />
        </motion.span>
        <div>
          <p className="text-xs font-bold uppercase tracking-wide text-ink">
            Використовуємо безпечні та ефективні засоби
          </p>
          <p className="mt-1 text-sm leading-relaxed text-slate">
            Наші засоби гіпоалергенні, не містять агресивних хімікатів та безпечні для дітей і домашніх
            улюбленців.
          </p>
        </div>
      </motion.div>
    </section>
  );
}

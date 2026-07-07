"use client";

import { motion } from "motion/react";
import { OZONE_PROCESS_STEPS } from "@/content/services";

export function ProcessSteps() {
  return (
    <section className="px-5 pb-16 lg:px-8">
      <div className="mx-auto max-w-6xl rounded-2xl bg-cream-deep/60 p-8 lg:p-10">
        <h2 className="text-center font-display text-xl text-ink lg:text-2xl">
          Як проходить озонування?
        </h2>

        <div className="relative mt-10 grid gap-8 sm:grid-cols-3 lg:grid-cols-5">
          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
            className="absolute left-[10%] right-[10%] top-[22px] hidden origin-left border-t border-dashed border-gold/40 lg:block"
          />

          {OZONE_PROCESS_STEPS.map((step, i) => (
            <motion.div
              key={step.title}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, ease: "easeOut", delay: i * 0.12 }}
              className="relative flex flex-col items-center text-center"
            >
              <motion.span
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ type: "spring", stiffness: 260, damping: 15, delay: i * 0.12 + 0.15 }}
                className="flex h-11 w-11 items-center justify-center rounded-full border border-ink/15 bg-cream-deep font-display text-sm font-semibold text-ink"
              >
                {i + 1}
              </motion.span>
              <p className="mt-3 text-xs font-bold uppercase tracking-wide text-ink">{step.title}</p>
              <p className="mt-1 text-xs leading-relaxed text-slate">{step.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

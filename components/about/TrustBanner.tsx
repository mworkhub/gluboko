"use client";

import { motion } from "motion/react";
import { ABOUT_TRUST_BANNER } from "@/content/about";

export function TrustBanner() {
  return (
    <section className="px-5 pb-14 lg:px-8 lg:pb-20">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="relative mx-auto flex max-w-6xl flex-col items-center gap-8 overflow-hidden rounded-2xl bg-ink px-6 py-10 text-center sm:flex-row sm:justify-between sm:px-10 sm:text-left lg:py-12"
      >
        <motion.span
          className="pointer-events-none absolute -right-8 top-1/2 h-40 w-40 -translate-y-1/2 rounded-full bg-sphere-end/25 blur-2xl"
          animate={{ scale: [1, 1.15, 1], opacity: [0.5, 0.8, 0.5] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.span
          className="pointer-events-none absolute right-20 top-[20%] h-4 w-4 rounded-full bg-sphere-start/40 blur-[1px]"
          animate={{ y: [0, -10, 0], opacity: [0.4, 0.9, 0.4] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.span
          className="pointer-events-none absolute right-36 bottom-[22%] h-2.5 w-2.5 rounded-full bg-sphere-start/40 blur-[1px]"
          animate={{ y: [0, -8, 0], opacity: [0.4, 0.9, 0.4] }}
          transition={{ duration: 4.6, repeat: Infinity, ease: "easeInOut", delay: 0.6 }}
        />

        <div className="relative max-w-md">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gold-light">
            {ABOUT_TRUST_BANNER.eyebrow}
          </p>
          <p className="mt-3 text-sm leading-relaxed text-cream/75">{ABOUT_TRUST_BANNER.text}</p>
        </div>

        <div className="relative flex h-28 w-28 shrink-0 items-center justify-center rounded-full border border-cream/20 bg-white-warm/5 backdrop-blur-sm">
          <div className="text-center">
            <p className="font-display text-xl text-cream">{ABOUT_TRUST_BANNER.badge.value}</p>
            <p className="mt-0.5 text-[10px] uppercase leading-tight tracking-wide text-cream/70">
              {ABOUT_TRUST_BANNER.badge.label}
            </p>
          </div>
        </div>
      </motion.div>
    </section>
  );
}

"use client";

import { motion } from "motion/react";
import { Award, BadgeCheck, CalendarCheck, HeartHandshake, ShieldCheck, Star } from "lucide-react";
import type { AboutSettings } from "@/lib/types";

const ICONS = {
  award: Award,
  "shield-check": ShieldCheck,
  "calendar-check": CalendarCheck,
  "heart-handshake": HeartHandshake,
  star: Star,
  "badge-check": BadgeCheck,
} satisfies Record<string, typeof Award>;

const lineContainer = {
  hidden: {},
  show: { transition: { staggerChildren: 0.16, delayChildren: 0.05 } },
};

const line = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] as const } },
};

export function QuoteBlock({ about }: { about: AboutSettings }) {
  const quoteLines = about.quote.split("\n").filter(Boolean);

  return (
    <section id="about" className="scroll-mt-24 px-5 pb-20 lg:px-8">
      <motion.div
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-100px" }}
        variants={lineContainer}
        className="mx-auto max-w-3xl text-center"
      >
        <p className="text-balance font-display text-2xl leading-snug text-ink lg:text-3xl">
          {quoteLines.map((l, i) => (
            <motion.span key={i} variants={line} className="block">
              {l}
            </motion.span>
          ))}
        </p>
        <motion.p variants={line} className="mt-8 font-display text-sm italic text-slate">
          — {about.signature}
        </motion.p>
      </motion.div>

      <div className="mx-auto mt-14 grid max-w-7xl gap-8 border-t border-ink/8 pt-12 sm:grid-cols-2 lg:grid-cols-4">
        {about.trust_badges.map((b, i) => {
          const Icon = ICONS[b.icon as keyof typeof ICONS] ?? Award;
          return (
            <motion.div
              key={b.title}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, ease: "easeOut", delay: i * 0.08 }}
              whileHover={{ y: -3 }}
              className="flex flex-col items-center gap-3 text-center"
            >
              <motion.span
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ type: "spring", stiffness: 260, damping: 16, delay: i * 0.08 + 0.15 }}
              >
                <Icon className="h-6 w-6 text-gold" strokeWidth={1.5} />
              </motion.span>
              <p className="text-xs font-bold uppercase tracking-wide text-ink">{b.title}</p>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}

"use client";

import { motion } from "motion/react";
import { Clock, Gem, Heart, Leaf, Lock, Shield, Sparkles, Star } from "lucide-react";
import type { AdvantagesSettings } from "@/lib/types";

const ICONS = {
  gem: Gem,
  leaf: Leaf,
  clock: Clock,
  lock: Lock,
  shield: Shield,
  sparkles: Sparkles,
  heart: Heart,
  star: Star,
} satisfies Record<string, typeof Gem>;

export function AdvantagesStrip({ advantages }: { advantages: AdvantagesSettings }) {
  return (
    <section id="advantages" className="scroll-mt-24 px-5 pb-20 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="origin-left border-t border-ink/8"
        />

        <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {advantages.items.map((a, i) => {
            const Icon = ICONS[a.icon as keyof typeof ICONS] ?? Gem;
            return (
              <motion.div
                key={a.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.5, ease: "easeOut", delay: i * 0.1 }}
                whileHover={{ y: -3 }}
                className="text-center sm:text-left"
              >
                <motion.div
                  initial={{ scale: 0, rotate: -25 }}
                  whileInView={{ scale: 1, rotate: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ type: "spring", stiffness: 260, damping: 16, delay: i * 0.1 + 0.15 }}
                  className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-gold/10 sm:mx-0"
                >
                  <Icon className="h-6 w-6 text-gold" strokeWidth={1.5} />
                </motion.div>
                <h4 className="mt-4 text-xs font-bold uppercase tracking-wide text-ink">{a.title}</h4>
                <p className="mt-2 text-sm leading-relaxed text-slate">{a.desc}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

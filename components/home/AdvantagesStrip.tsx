"use client";

import { motion } from "motion/react";
import { Award, Clock, Gem, Heart, Leaf, Lock, Shield, Sparkles, Star } from "lucide-react";
import { SectionDivider } from "@/components/shared/SectionDivider";
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
  award: Award,
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

        <div className="mt-8 grid grid-cols-4 gap-x-2 gap-y-8 sm:mt-12 lg:gap-8">
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
                className="text-center lg:text-left"
              >
                <motion.div
                  initial={{ scale: 0, rotate: -25 }}
                  whileInView={{ scale: 1, rotate: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ type: "spring", stiffness: 260, damping: 16, delay: i * 0.1 + 0.15 }}
                  className="mx-auto flex h-9 w-9 items-center justify-center rounded-full bg-gold/10 sm:h-12 sm:w-12 lg:mx-0"
                >
                  <Icon className="h-[18px] w-[18px] text-gold sm:h-6 sm:w-6" strokeWidth={1.5} />
                </motion.div>
                <h4 className="mt-2.5 break-words text-[10px] font-bold uppercase leading-tight tracking-wide text-ink sm:mt-4 sm:text-xs sm:break-normal">
                  {a.title}
                </h4>
                <SectionDivider className="my-2 justify-center sm:my-3 lg:justify-start" lineClassName="w-5 sm:w-10" />
                <p className="break-words text-[10px] leading-snug text-slate sm:break-normal sm:text-sm sm:leading-relaxed">
                  {a.desc}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

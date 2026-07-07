"use client";

import { motion } from "motion/react";
import { BadgeCheck, Calendar, Leaf, MessageCircle, Shield, ShieldCheck, User, Wrench, Zap } from "lucide-react";

const ICONS = {
  zap: Zap,
  "message-circle": MessageCircle,
  calendar: Calendar,
  user: User,
  leaf: Leaf,
  wrench: Wrench,
  "shield-check": ShieldCheck,
  "badge-check": BadgeCheck,
  shield: Shield,
} satisfies Record<string, typeof Zap>;

type BenefitItem = { title: string; desc?: string; icon: keyof typeof ICONS };

export function BenefitsRow({ items, className }: { items: readonly BenefitItem[]; className?: string }) {
  return (
    <div
      className={`grid grid-cols-2 gap-x-6 gap-y-7 rounded-2xl border border-ink/8 bg-cream-deep/50 p-6 sm:grid-cols-4 lg:p-8 ${className ?? ""}`}
    >
      {items.map((item, i) => {
        const Icon = ICONS[item.icon];
        return (
          <motion.div
            key={item.title}
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.45, ease: "easeOut", delay: (i % 4) * 0.08 }}
            className="flex flex-col items-center gap-2 text-center sm:items-start sm:text-left"
          >
            <Icon className="h-5 w-5 shrink-0 text-gold" strokeWidth={1.5} />
            <p className="text-xs font-bold uppercase tracking-wide text-ink">{item.title}</p>
            {item.desc && <p className="text-xs leading-relaxed text-slate">{item.desc}</p>}
          </motion.div>
        );
      })}
    </div>
  );
}

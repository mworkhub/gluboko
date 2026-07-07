"use client";

import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { Atom, ChevronRight, Clock, Leaf, Shield, Sparkles, Truck } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import { CATEGORY_META, type ServiceCategory } from "@/content/services";
import { DRY_CLEANING_VISUAL, OZONE_VISUAL } from "@/content/media";
import { LogoMark } from "@/components/shared/LogoMark";

const FEATURE_ICONS = {
  shield: Shield,
  leaf: Leaf,
  clock: Clock,
  sparkles: Sparkles,
  atom: Atom,
  truck: Truck,
} as const;

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1, delayChildren: 0.05 } },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: "easeOut" as const } },
};

const PHOTO_POSITION = {
  ozone: "object-[50%_65%] lg:object-[68%_45%]",
  dry_cleaning: "object-[35%_60%] lg:object-[15%_48%]",
} as const;

export function ServiceHero({ category }: { category: ServiceCategory }) {
  const meta = CATEGORY_META[category];
  const visual = category === "ozone" ? OZONE_VISUAL : DRY_CLEANING_VISUAL;
  const sectionRef = useRef<HTMLElement>(null);
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start start", "end start"] });
  const photoY = useTransform(scrollYProgress, [0, 1], [-40, reduceMotion ? -40 : 40]);

  return (
    <section ref={sectionRef} className="relative isolate overflow-hidden">
      {/* Same full-bleed photo treatment as the homepage hero: a dedicated
          band on mobile, full-bleed behind the text on desktop. */}
      <motion.div
        style={{ y: photoY }}
        className="relative h-[52vh] min-h-[380px] w-full lg:absolute lg:inset-x-0 lg:-inset-y-16 lg:h-auto lg:min-h-0"
      >
        <Image
          src={visual.src}
          alt={visual.alt}
          fill
          priority
          sizes="100vw"
          className={`object-cover ${PHOTO_POSITION[category]}`}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-cream via-cream/5 to-transparent lg:hidden" />

        <motion.div
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.3, ease: "easeOut" }}
          className="absolute right-6 top-1/2 hidden -translate-y-1/2 lg:right-16 lg:block"
        >
          <LogoMark size="lg" className="h-32 w-32 lg:h-40 lg:w-40" />
        </motion.div>
      </motion.div>

      <div className="absolute inset-0 hidden bg-gradient-to-r from-cream from-15% via-cream/80 via-45% to-transparent lg:block" />
      <div className="absolute inset-0 hidden bg-gradient-to-t from-cream/45 via-transparent to-transparent lg:block" />

      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="relative mx-auto max-w-7xl px-5 pb-14 pt-10 lg:px-8 lg:pt-14"
      >
        <motion.nav variants={item} className="mb-8 flex items-center gap-1.5 text-xs text-slate">
          <Link href="/" className="hover:text-ink">
            Головна
          </Link>
          <ChevronRight className="h-3.5 w-3.5" />
          <span className="font-semibold text-ink">{meta.label}</span>
        </motion.nav>

        <div className="max-w-xl">
          <motion.h1 variants={item} className="font-display text-[clamp(2rem,4.5vw,3rem)] font-bold text-ink">
            {meta.title}
          </motion.h1>
          <motion.p variants={item} className="mt-3 text-lg text-slate">
            {meta.subtitle}
          </motion.p>
          <motion.p variants={item} className="mt-5 max-w-xl leading-relaxed text-slate">
            {meta.intro}
          </motion.p>
        </div>

        <motion.div variants={item} className="mt-10 rounded-2xl border border-ink/8 bg-cream/80 p-6 backdrop-blur-sm lg:p-8">
          <div className="grid grid-cols-2 gap-x-6 gap-y-7 sm:grid-cols-3 lg:grid-cols-5">
            {meta.features.map((f, i) => {
              const Icon = FEATURE_ICONS[f.icon];
              return (
                <motion.div
                  key={f.title}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, ease: "easeOut", delay: 0.35 + i * 0.08 }}
                  className="flex items-start gap-3"
                >
                  <motion.span
                    initial={{ scale: 0, rotate: -20 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ type: "spring", stiffness: 260, damping: 15, delay: 0.45 + i * 0.08 }}
                  >
                    <Icon className="mt-0.5 h-5 w-5 shrink-0 text-gold" strokeWidth={1.5} />
                  </motion.span>
                  <div>
                    <p className="text-xs font-bold uppercase tracking-wide text-ink">{f.title}</p>
                    <p className="mt-1 text-xs leading-relaxed text-slate">{f.desc}</p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}

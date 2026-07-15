"use client";

import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { Atom, ChevronRight, Clock, Leaf, Shield, Sparkles, Truck } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import { CATEGORY_META, type ServiceCategory } from "@/content/services";
import { DRY_CLEANING_VISUAL, OZONE_VISUAL } from "@/content/media";
import { SectionDivider } from "@/components/shared/SectionDivider";

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
  ozone: "object-[50%_65%] lg:object-[68%_92%]",
  dry_cleaning: "object-[68%_38%] lg:object-[15%_48%]",
} as const;

// Ozone's photo has an "О3 ОЗОНУВАННЯ" wordmark baked into the top of the
// frame that collides with the header nav — it needs a strong, near-opaque
// scrim there. Dry-cleaning's photo has no such conflict, and the same
// strong scrim over its higher-contrast image (dark glove vs light couch)
// reads as an ugly hard-edged patch, so it stays soft.
const TOP_SCRIM = {
  ozone: "bg-gradient-to-b from-cream from-0% via-cream/70 via-[16%] to-transparent to-[34%]",
  dry_cleaning: "",
} as const;

// Dry-cleaning's headline now sits on the right, over the lighter pillow —
// it no longer needs a scrim covering the vacuum on the left, so both the
// horizontal and vertical wash stay ozone-only.
const LEFT_SCRIM = {
  ozone: "bg-gradient-to-r from-cream from-2% via-cream/85 via-32% to-transparent to-60%",
  dry_cleaning: "",
} as const;

const BOTTOM_SCRIM = {
  ozone: "bg-gradient-to-t from-cream from-0% via-cream/45 via-[16%] to-transparent to-[36%]",
  dry_cleaning: "bg-gradient-to-t from-cream/25 via-transparent to-transparent",
} as const;

// Ozone's photo has enough color/contrast to take the same darkening scrim
// as the homepage hero; dry-cleaning's is naturally pale (cream pillow),
// so the same filter combined with the scrim above washed it out entirely.
const PHOTO_BRIGHTNESS = {
  ozone: "lg:brightness-90",
  dry_cleaning: "lg:brightness-110",
} as const;

const SAFETY_PILL = {
  ozone: { title: "Безпечно для дітей, тварин і рослин", desc: "Без хімії. Без запаху. Без залишків." },
  dry_cleaning: { title: "Безпечні сертифіковані засоби", desc: "Глибоке очищення без пошкодження тканин." },
} as const;

const TEXT_INDENT = {
  ozone: "",
  dry_cleaning: "",
} as const;

// Dry-cleaning's mobile photo has the vacuum head on the left, so the
// headline reads better pushed right onto the lighter pillow area rather
// than sitting over the busiest part of the image.
const HEADLINE_ALIGN = {
  ozone: "",
  dry_cleaning: "ml-auto max-w-[78%] text-right",
} as const;

const DESKTOP_HEADLINE_ALIGN = {
  ozone: "",
  dry_cleaning: "text-right",
} as const;

const DESKTOP_BLOCK_ALIGN = {
  ozone: "",
  dry_cleaning: "ml-auto",
} as const;

export function ServiceHero({ category }: { category: ServiceCategory }) {
  const meta = CATEGORY_META[category];
  const visual = category === "ozone" ? OZONE_VISUAL : DRY_CLEANING_VISUAL;
  const sectionRef = useRef<HTMLElement>(null);
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start start", "end start"] });
  const photoY = useTransform(scrollYProgress, [0, 1], [0, reduceMotion ? 0 : 40]);

  return (
    <section ref={sectionRef} className="relative isolate overflow-hidden">
      {/* Mobile: compact photo card, sized by aspect-ratio (not viewport height)
          so it hugs its content, with title + safety pill composited directly on
          top of it. Desktop: unchanged full-bleed photo behind the text. */}
      <motion.div
        style={{ y: photoY }}
        className="relative w-full lg:absolute lg:inset-x-0 lg:-inset-y-16 lg:aspect-auto lg:h-auto"
      >
        <Image
          src={visual.src}
          alt={visual.alt}
          fill
          priority
          sizes="100vw"
          className={`object-cover ${PHOTO_BRIGHTNESS[category]} ${PHOTO_POSITION[category]}`}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-cream/70 from-[3%] via-transparent via-55% to-cream/95 lg:hidden" />

        <div className="relative flex min-h-[420px] flex-col justify-between gap-6 p-4 pb-8 pt-24 lg:hidden">
          <motion.nav
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1, ease: "easeOut" }}
            className="flex items-center gap-1.5 text-xs text-slate"
          >
            <Link href="/" className="hover:text-ink">
              Головна
            </Link>
            <ChevronRight className="h-3.5 w-3.5" />
            <span className="font-semibold text-ink">{meta.label}</span>
          </motion.nav>

          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2, ease: "easeOut" }}
            className={HEADLINE_ALIGN[category]}
          >
            <h1 className="text-balance font-display text-[clamp(1.5rem,7vw,1.9rem)] font-bold leading-[1.08] text-ink">
              {meta.title}
            </h1>
            <p className="mt-1.5 text-sm font-medium text-ink/80">{meta.subtitle}</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3, ease: "easeOut" }}
            className={`flex items-start gap-2.5 rounded-xl border border-ink/8 bg-cream/90 p-3 shadow-sm backdrop-blur-sm ${TEXT_INDENT[category]}`}
          >
            <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-gold/10">
              <Shield className="h-4 w-4 text-gold" strokeWidth={1.5} />
            </span>
            <div>
              <p className="text-xs font-bold text-ink">{SAFETY_PILL[category].title}</p>
              <p className="mt-0.5 text-[11px] leading-snug text-slate">{SAFETY_PILL[category].desc}</p>
            </div>
          </motion.div>
        </div>
      </motion.div>

      <div className={`absolute inset-0 hidden lg:block ${LEFT_SCRIM[category]}`} />
      <div className={`absolute inset-0 hidden lg:block ${BOTTOM_SCRIM[category]}`} />
      <div className={`absolute inset-0 hidden lg:block ${TOP_SCRIM[category]}`} />

      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="relative mx-auto max-w-7xl px-5 pb-4 pt-4 lg:px-8 lg:pb-14 lg:pt-40"
      >
        <motion.nav
          variants={item}
          className={`mb-8 hidden items-center gap-1.5 text-xs text-slate lg:flex ${
            category === "dry_cleaning" ? "drop-shadow-[0_1px_4px_rgba(250,248,244,0.9)]" : ""
          }`}
        >
          <Link href="/" className="hover:text-ink">
            Головна
          </Link>
          <ChevronRight className="h-3.5 w-3.5" />
          <span className="font-semibold text-ink">{meta.label}</span>
        </motion.nav>

        <div className={`hidden max-w-xl lg:block ${DESKTOP_BLOCK_ALIGN[category]}`}>
          <div className={DESKTOP_HEADLINE_ALIGN[category]}>
            <motion.h1 variants={item} className="font-display text-[clamp(2rem,4.5vw,3rem)] font-bold text-ink">
              {meta.title}
            </motion.h1>
            <motion.p variants={item} className="mt-3 text-lg font-medium text-ink/75">
              {meta.subtitle}
            </motion.p>
          </div>
          <motion.div variants={item}>
            <SectionDivider className="my-5" lineClassName="w-40" />
          </motion.div>
          <motion.p variants={item} className="max-w-xl font-medium leading-relaxed text-ink/75">
            {meta.intro}
          </motion.p>
        </div>

        <motion.div variants={item} className="mt-10 hidden rounded-2xl border border-ink/8 bg-cream/80 p-6 backdrop-blur-sm sm:block lg:p-8">
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

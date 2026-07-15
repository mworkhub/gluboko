"use client";

import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { BadgeCheck, ChevronRight, Clock, Leaf, Shield } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import { SectionDivider } from "@/components/shared/SectionDivider";
import { ABOUT_FEATURES, ABOUT_INTRO } from "@/content/about";
import { HERO_IMAGE } from "@/content/media";

const FEATURE_ICONS = {
  shield: Shield,
  leaf: Leaf,
  "badge-check": BadgeCheck,
  clock: Clock,
} satisfies Record<(typeof ABOUT_FEATURES)[number]["icon"], typeof Shield>;

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1, delayChildren: 0.05 } },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: "easeOut" as const } },
};

export function AboutHero() {
  const sectionRef = useRef<HTMLElement>(null);
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start start", "end start"] });
  const photoY = useTransform(scrollYProgress, [0, 1], [0, reduceMotion ? 0 : 40]);

  return (
    <section ref={sectionRef} className="relative isolate overflow-hidden">
      {/* Mobile: compact photo card, sized by aspect-ratio, with the title
          composited directly on top of it. Desktop: full-bleed photo behind
          the (now transparent) header, same as Hero / ServiceHero / Kontakty. */}
      <motion.div
        style={{ y: photoY }}
        className="relative aspect-[4/3] w-full lg:absolute lg:inset-x-0 lg:-inset-y-16 lg:aspect-auto lg:h-auto"
      >
        <Image
          src={HERO_IMAGE.src}
          alt={HERO_IMAGE.alt}
          fill
          priority
          sizes="100vw"
          className="object-cover object-[62%_20%] lg:object-[78%_30%]"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-cream/70 from-[3%] via-transparent via-55% to-cream/95 lg:hidden" />

        <div className="absolute inset-0 flex flex-col justify-between p-4 pt-24 lg:hidden">
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
            <span className="font-semibold text-ink">Про нас</span>
          </motion.nav>

          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2, ease: "easeOut" }}
          >
            <h1 className="text-balance font-display text-[clamp(1.6rem,7.5vw,2.1rem)] font-bold uppercase leading-[1.1] text-ink">
              {ABOUT_INTRO.title}
            </h1>
          </motion.div>
        </div>

      </motion.div>

      <div className="absolute inset-0 hidden bg-gradient-to-r from-cream from-15% via-cream/80 via-45% to-transparent lg:block" />
      <div className="absolute inset-0 hidden bg-gradient-to-t from-cream/45 via-transparent to-transparent lg:block" />

      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="relative mx-auto max-w-7xl px-5 pb-10 pt-4 lg:px-8 lg:pb-16 lg:pt-40"
      >
        <motion.nav variants={item} className="mb-8 hidden items-center gap-1.5 text-xs text-slate lg:flex">
          <Link href="/" className="hover:text-ink">
            Головна
          </Link>
          <ChevronRight className="h-3.5 w-3.5" />
          <span className="font-semibold text-ink">Про нас</span>
        </motion.nav>

        <div className="hidden max-w-xl lg:block">
          <motion.h1
            variants={item}
            className="text-balance font-display text-[clamp(2rem,4.5vw,3rem)] font-bold uppercase leading-[1.1] text-ink"
          >
            {ABOUT_INTRO.title}
          </motion.h1>
          <motion.div variants={item}>
            <SectionDivider className="my-6" lineClassName="w-40" />
          </motion.div>
          <motion.p variants={item} className="max-w-lg leading-relaxed text-slate">
            {ABOUT_INTRO.text}
          </motion.p>
        </div>

        <motion.p variants={item} className="mt-3 max-w-xl text-sm leading-relaxed text-slate lg:hidden">
          {ABOUT_INTRO.text}
        </motion.p>

        <motion.div
          variants={item}
          className="mt-8 grid grid-cols-4 gap-3 rounded-2xl border border-ink/8 bg-cream-deep/50 p-5 sm:gap-6 sm:p-7 lg:mt-12"
        >
          {ABOUT_FEATURES.map((f) => {
            const Icon = FEATURE_ICONS[f.icon];
            return (
              <div key={f.title} className="flex flex-col items-center gap-2 text-center">
                <Icon className="h-6 w-6 shrink-0 text-gold" strokeWidth={1.5} />
                <p className="text-[11px] leading-snug text-ink sm:text-xs">{f.title}</p>
              </div>
            );
          })}
        </motion.div>
      </motion.div>
    </section>
  );
}

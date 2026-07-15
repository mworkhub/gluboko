"use client";

import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { ChevronRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import { SectionDivider } from "@/components/shared/SectionDivider";

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12, delayChildren: 0.05 } },
};

const item = {
  hidden: { opacity: 0, y: 22 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" as const } },
};

export function KontaktyHero() {
  const sectionRef = useRef<HTMLElement>(null);
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start start", "end start"] });
  const photoY = useTransform(scrollYProgress, [0, 1], [0, reduceMotion ? 0 : 40]);

  return (
    <section ref={sectionRef} className="relative isolate overflow-hidden">
      {/* Mobile: compact photo card, sized by aspect-ratio (not viewport height)
          so it hugs its content, with the title composited directly on top of it.
          Desktop: unchanged full-bleed photo behind the text. */}
      <motion.div
        style={{ y: photoY }}
        className="relative aspect-[4/3] w-full lg:absolute lg:inset-x-0 lg:-inset-y-16 lg:aspect-auto lg:h-auto"
      >
        <Image
          src="/images/kontakty-hero.jpg"
          alt="Затишна світла вітальня з кремовим диваном"
          fill
          priority
          sizes="100vw"
          className="object-cover object-[62%_30%] lg:object-[72%_38%] lg:brightness-90"
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
            <span className="font-semibold text-ink">Контакти</span>
          </motion.nav>

          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2, ease: "easeOut" }}
          >
            <h1 className="font-display text-[clamp(1.6rem,7.5vw,2.1rem)] font-bold uppercase text-ink">
              Контакти
            </h1>
            <p className="mt-1.5 font-display text-base italic text-gold">
              Ми завжди на зв&rsquo;язку та готові допомогти!
            </p>
          </motion.div>
        </div>

      </motion.div>

      <div className="absolute inset-0 hidden bg-gradient-to-r from-cream from-10% via-cream/75 via-38% to-transparent lg:block" />
      <div className="absolute inset-0 hidden bg-gradient-to-t from-cream/20 via-transparent to-transparent lg:block" />

      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="relative mx-auto max-w-7xl px-5 pb-16 pt-4 lg:px-8 lg:pt-40"
      >
        <motion.nav variants={item} className="mb-8 hidden items-center gap-1.5 text-xs text-slate lg:flex">
          <Link href="/" className="hover:text-ink">
            Головна
          </Link>
          <ChevronRight className="h-3.5 w-3.5" />
          <span className="font-semibold text-ink">Контакти</span>
        </motion.nav>

        <div className="hidden max-w-xl lg:block">
          <motion.h1
            variants={item}
            className="font-display text-[clamp(2rem,4.5vw,3rem)] font-bold uppercase text-ink"
          >
            Контакти
          </motion.h1>
          <motion.p variants={item} className="mt-3 font-display text-lg italic text-gold">
            Ми завжди на зв&rsquo;язку та готові допомогти!
          </motion.p>
          <motion.div variants={item}>
            <SectionDivider className="my-5" lineClassName="w-40" />
          </motion.div>
          <motion.p variants={item} className="max-w-xl leading-relaxed text-slate">
            Залишайте заявку або телефонуйте — наш спеціаліст проконсультує вас та підбере найкраще рішення для
            вашого простору.
          </motion.p>
        </div>

        <motion.p variants={item} className="max-w-xl text-sm leading-relaxed text-slate lg:hidden">
          Залишайте заявку або телефонуйте — наш спеціаліст проконсультує вас та підбере найкраще рішення для
          вашого простору.
        </motion.p>
      </motion.div>
    </section>
  );
}

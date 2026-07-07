"use client";

import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { ChevronRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import { LogoMark } from "@/components/shared/LogoMark";

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
          src="/images/kontakty-hero.jpg"
          alt="Затишна світла вітальня з кремовим диваном"
          fill
          priority
          sizes="100vw"
          className="object-cover object-[62%_30%] lg:object-[72%_38%]"
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
        className="relative mx-auto max-w-7xl px-5 pb-16 pt-10 lg:px-8 lg:pt-14"
      >
        <motion.nav variants={item} className="mb-8 flex items-center gap-1.5 text-xs text-slate">
          <Link href="/" className="hover:text-ink">
            Головна
          </Link>
          <ChevronRight className="h-3.5 w-3.5" />
          <span className="font-semibold text-ink">Контакти</span>
        </motion.nav>

        <div className="max-w-xl">
          <motion.h1
            variants={item}
            className="font-display text-[clamp(2rem,4.5vw,3rem)] font-bold uppercase text-ink"
          >
            Контакти
          </motion.h1>
          <motion.p variants={item} className="mt-3 font-display text-lg italic text-gold">
            Ми завжди на зв&rsquo;язку та готові допомогти!
          </motion.p>
          <motion.p variants={item} className="mt-5 max-w-xl leading-relaxed text-slate">
            Залишайте заявку або телефонуйте — наш спеціаліст проконсультує вас та підбере найкраще рішення для
            вашого простору.
          </motion.p>
        </div>
      </motion.div>
    </section>
  );
}

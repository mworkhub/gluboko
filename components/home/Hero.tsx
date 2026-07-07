"use client";

import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { MapPin } from "lucide-react";
import Image from "next/image";
import { useRef } from "react";
import { HERO_IMAGE } from "@/content/media";
import { ServiceHubCards } from "./ServiceHubCards";

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12, delayChildren: 0.05 } },
};

const item = {
  hidden: { opacity: 0, y: 22 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" as const } },
};

export function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start start", "end start"] });
  const photoY = useTransform(scrollYProgress, [0, 1], [-40, reduceMotion ? -40 : 40]);

  return (
    <section ref={sectionRef} className="relative isolate overflow-hidden">
      {/* Mobile: a dedicated photo band up top (the light, airy photo needs its own
          space to read as a photo — squeezed behind text on a narrow screen it just
          disappears into the cream palette). Desktop: unchanged full-bleed photo
          behind the text, per the original design direction. */}
      <motion.div
        style={{ y: photoY }}
        className="relative h-[52vh] min-h-[380px] w-full lg:absolute lg:inset-x-0 lg:-inset-y-16 lg:h-auto lg:min-h-0"
      >
        <Image
          src={HERO_IMAGE.src}
          alt={HERO_IMAGE.alt}
          fill
          priority
          sizes="100vw"
          className="object-cover object-[62%_20%] lg:object-[78%_30%]"
        />
        {/* mobile-only: fade the band's bottom edge into the page background */}
        <div className="absolute inset-0 bg-gradient-to-t from-cream via-cream/5 to-transparent lg:hidden" />
      </motion.div>

      {/* seamless scrim (desktop only): solid cream where text sits, fading out so
          the photo shows through on the right; the glass cards below carry their
          own contrast, so this stays light lower down */}
      <div className="absolute inset-0 hidden bg-gradient-to-r from-cream from-15% via-cream/80 via-45% to-transparent lg:block" />
      <div className="absolute inset-0 hidden bg-gradient-to-t from-cream/45 via-transparent to-transparent lg:block" />

      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="relative mx-auto max-w-7xl px-5 pb-16 pt-14 lg:px-8 lg:pt-20"
      >
        <div className="max-w-xl">
          <motion.p variants={item} className="text-xs font-semibold uppercase tracking-[0.2em] text-gold">
            Преміальний сервіс у Києві та Київській області
          </motion.p>
          <motion.h1
            variants={item}
            className="text-balance mt-4 font-display text-[clamp(2.1rem,4.6vw,3.5rem)] font-bold uppercase leading-[1.1] tracking-tight text-ink"
          >
            Чистота, яку відчуваєш з першого дотику
          </motion.h1>

          <motion.div variants={item} className="my-6 flex items-center gap-3 text-gold">
            <span className="h-px w-12 bg-gold/40" />
            <span className="text-xs">✦</span>
            <span className="h-px w-12 bg-gold/40" />
          </motion.div>

          <motion.p variants={item} className="max-w-md text-base leading-relaxed text-slate">
            Глибоке очищення. Безпека для вашої родини. Турбота про простір, який ви любите.
          </motion.p>

          <motion.div
            variants={item}
            className="mt-8 inline-flex items-start gap-3 rounded-xl bg-ink px-5 py-4 text-cream shadow-lg shadow-ink/10"
          >
            <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-gold-light" />
            <div>
              <p className="text-sm font-semibold uppercase tracking-wide text-cream">
                Київ та Київська область
              </p>
              <p className="text-sm text-cream/70">Працюємо для тих, хто цінує найвищу якість і свій час.</p>
            </div>
          </motion.div>
        </div>

        <motion.div variants={item} className="mt-14">
          <ServiceHubCards />
        </motion.div>
      </motion.div>
    </section>
  );
}

"use client";

import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { MapPin } from "lucide-react";
import Image from "next/image";
import { useRef } from "react";
import { SectionDivider } from "@/components/shared/SectionDivider";
import { HERO_IMAGE, HERO_IMAGE_DESKTOP } from "@/content/media";
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
  const photoY = useTransform(scrollYProgress, [0, 1], [0, reduceMotion ? 0 : 40]);
  const photoScale = useTransform(scrollYProgress, [0, 1], [1, reduceMotion ? 1 : 1.05]);

  return (
    <section ref={sectionRef} className="relative isolate overflow-hidden">
      {/* Mobile: compact photo card, sized by aspect-ratio (not viewport height)
          so it hugs its content, with the title + location composited directly on
          top of it. Desktop: unchanged full-bleed photo behind the text. */}
      <motion.div
        style={{ y: photoY, scale: photoScale }}
        className="relative w-full origin-center lg:absolute lg:inset-x-0 lg:-inset-y-24 lg:aspect-auto lg:h-auto"
      >
        <Image
          src={HERO_IMAGE.src}
          alt={HERO_IMAGE.alt}
          fill
          priority
          sizes="100vw"
          className="object-cover object-[100%_45%] brightness-110 lg:hidden"
        />
        <div className="absolute inset-0 hidden overflow-hidden lg:block">
          <div className="absolute left-[85%] top-0 h-full w-[1920px] -translate-x-[85%]">
            <Image
              src={HERO_IMAGE_DESKTOP.src}
              alt={HERO_IMAGE_DESKTOP.alt}
              fill
              priority
              sizes="100vw"
              className="object-cover object-[50%_22%] brightness-90"
            />
          </div>
        </div>
        {/* soft sunlight beam, breathing very slowly so the interior reads as sunlit */}
        <motion.div
          className="pointer-events-none absolute inset-0 hidden mix-blend-soft-light lg:block"
          style={{
            background:
              "linear-gradient(115deg, transparent 30%, rgba(255,253,252,0.65) 48%, rgba(201,164,100,0.35) 54%, transparent 68%)",
          }}
          animate={reduceMotion ? undefined : { opacity: [0.5, 0.85, 0.5] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        />
        <div className="absolute inset-x-0 top-0 h-72 bg-gradient-to-b from-white-warm/80 via-white-warm/40 to-transparent lg:hidden" />
        <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-cream to-transparent lg:hidden" />

        <div className="relative flex flex-col p-4 pb-6 pt-24 lg:hidden">
          <motion.h1
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.15, ease: "easeOut" }}
            className="text-balance font-display text-[clamp(1.5rem,7vw,1.9rem)] font-bold uppercase leading-[1.08] text-ink"
          >
            Створюємо здоровий мікроклімат
            <span className="block">Вашого простору</span>
          </motion.h1>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.22, ease: "easeOut" }}
          >
            <SectionDivider className="my-3" lineClassName="w-10" />
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.25, ease: "easeOut" }}
            className="max-w-[16rem] text-xs font-medium leading-relaxed text-ink/80"
          >
            Глибоке очищення. Безпека для Вашої родини. Турбота про простір, який Ви любите.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3, ease: "easeOut" }}
            className="mt-32 flex flex-col gap-3"
          >
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.28, ease: "easeOut" }}
              className="mb-1 flex w-fit items-center gap-1.5 self-start rounded-full bg-white-warm/90 px-3 py-2 shadow-sm shadow-ink/10 backdrop-blur-sm"
            >
              <MapPin className="h-3.5 w-3.5 shrink-0 text-gold" strokeWidth={1.5} />
              <span className="text-[11px] font-semibold text-ink">Київ та Київська область</span>
            </motion.div>
            <ServiceHubCards compact />
          </motion.div>
        </div>
      </motion.div>

      {/* seamless scrim (desktop only): solid cream where text sits, fading out so
          the photo shows through on the right; the glass cards below carry their
          own contrast, so this stays light lower down */}
      <div className="absolute inset-0 hidden bg-gradient-to-r from-cream from-12% via-cream/85 via-36% to-transparent to-52% lg:block" />
      <div className="absolute inset-0 hidden bg-gradient-to-t from-cream from-0% via-cream/50 via-[14%] to-transparent to-[38%] lg:block" />

      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="relative mx-auto max-w-7xl px-5 pb-0 pt-0 lg:px-8 lg:pb-6 lg:pt-44"
      >
        <div className="hidden max-w-xl lg:block">
          <motion.p variants={item} className="text-xs font-semibold uppercase tracking-[0.2em] text-gold">
            Преміальний сервіс у Києві та Київській області
          </motion.p>
          <motion.h1
            variants={item}
            className="text-balance mt-4 font-display text-[clamp(1.8rem,3.9vw,3rem)] font-bold uppercase leading-[1.12] tracking-tight text-ink"
          >
            Створюємо здоровий мікроклімат Вашого простору
          </motion.h1>

          <motion.div variants={item}>
            <SectionDivider className="my-6" lineClassName="w-40" />
          </motion.div>

          <motion.p variants={item} className="max-w-md text-base leading-relaxed text-[#525252]">
            Глибоке очищення. Безпека для Вашої родини. Турбота про простір, який Ви любите.
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

        <motion.div variants={item} className="hidden lg:mt-14 lg:block">
          <ServiceHubCards />
        </motion.div>
      </motion.div>
    </section>
  );
}

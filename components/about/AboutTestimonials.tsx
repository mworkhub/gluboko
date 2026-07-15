"use client";

import { motion } from "motion/react";
import { ChevronLeft, ChevronRight, Star } from "lucide-react";
import Image from "next/image";
import { useRef, useState } from "react";
import { SectionDivider } from "@/components/shared/SectionDivider";
import { ABOUT_TESTIMONIALS } from "@/content/about";

function TestimonialStars({ i }: { i: number }) {
  return (
    <div className="flex gap-1 text-gold">
      {Array.from({ length: 5 }).map((_, s) => (
        <motion.span
          key={s}
          initial={{ scale: 0, rotate: -90 }}
          whileInView={{ scale: 1, rotate: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ type: "spring", stiffness: 300, damping: 14, delay: i * 0.12 + s * 0.05 + 0.2 }}
        >
          <Star className="h-4 w-4 fill-current" />
        </motion.span>
      ))}
    </div>
  );
}

function TestimonialCard({ t, i }: { t: (typeof ABOUT_TESTIMONIALS)[number]; i: number }) {
  return (
    <div className="rounded-2xl border border-ink/8 bg-white-warm p-6 shadow-sm">
      <TestimonialStars i={i} />
      <p className="mt-4 text-sm leading-relaxed text-slate">{t.text}</p>
      <div className="mt-5 flex items-center gap-3">
        <span className="relative h-10 w-10 shrink-0 overflow-hidden rounded-full bg-cream-deep">
          <Image src={t.avatar} alt={t.name} fill sizes="40px" className="object-cover" />
        </span>
        <div>
          <p className="text-xs font-bold uppercase tracking-wide text-ink">{t.name}</p>
          <p className="text-xs text-slate">{t.city}</p>
        </div>
      </div>
    </div>
  );
}

function MobileTestimonialsCarousel() {
  const trackRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);

  const handleScroll = () => {
    const el = trackRef.current;
    if (!el) return;
    const idx = Math.round(el.scrollLeft / el.clientWidth);
    setActive(Math.min(ABOUT_TESTIMONIALS.length - 1, Math.max(0, idx)));
  };

  const scrollTo = (i: number) => {
    const el = trackRef.current;
    if (!el) return;
    el.scrollTo({ left: i * el.clientWidth, behavior: "smooth" });
  };

  return (
    <div className="relative sm:hidden">
      <button
        aria-label="Попередній відгук"
        onClick={() => scrollTo(Math.max(0, active - 1))}
        className="absolute left-0 top-[38%] z-10 flex h-9 w-9 -translate-x-3 -translate-y-1/2 items-center justify-center rounded-full border border-ink/10 bg-white-warm text-ink shadow-sm disabled:opacity-30"
        disabled={active === 0}
      >
        <ChevronLeft className="h-4 w-4" />
      </button>
      <button
        aria-label="Наступний відгук"
        onClick={() => scrollTo(Math.min(ABOUT_TESTIMONIALS.length - 1, active + 1))}
        className="absolute right-0 top-[38%] z-10 flex h-9 w-9 -translate-y-1/2 translate-x-3 items-center justify-center rounded-full border border-ink/10 bg-white-warm text-ink shadow-sm disabled:opacity-30"
        disabled={active === ABOUT_TESTIMONIALS.length - 1}
      >
        <ChevronRight className="h-4 w-4" />
      </button>

      <div
        ref={trackRef}
        onScroll={handleScroll}
        className="flex snap-x snap-mandatory gap-4 overflow-x-auto scroll-smooth pb-1 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {ABOUT_TESTIMONIALS.map((t, i) => (
          <div key={t.name} className="w-full shrink-0 snap-center">
            <TestimonialCard t={t} i={i} />
          </div>
        ))}
      </div>

      <div className="mt-5 flex items-center justify-center gap-2">
        {ABOUT_TESTIMONIALS.map((t, i) => (
          <button
            key={t.name}
            aria-label={`Відгук ${i + 1}`}
            onClick={() => scrollTo(i)}
            className={`h-1.5 rounded-full transition-all ${active === i ? "w-6 bg-gold" : "w-1.5 bg-ink/15"}`}
          />
        ))}
      </div>
    </div>
  );
}

export function AboutTestimonials() {
  return (
    <section className="px-5 pb-16 lg:px-8 lg:pb-24">
      <div className="mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.5 }}
          className="mx-auto max-w-xl text-center"
        >
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gold">Відгуки наших клієнтів</p>
          <h2 className="mt-3 font-display text-2xl text-ink lg:text-3xl">Нам довіряють найцінніше</h2>
          <SectionDivider className="my-5 justify-center" />
        </motion.div>

        <div className="mt-12">
          <MobileTestimonialsCarousel />
        </div>

        <div className="mt-12 hidden gap-6 sm:grid sm:grid-cols-3">
          {ABOUT_TESTIMONIALS.map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, ease: "easeOut", delay: i * 0.1 }}
              whileHover={{ y: -4 }}
            >
              <TestimonialCard t={t} i={i} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

"use client";

import { motion } from "motion/react";
import Image from "next/image";
import { SectionDivider } from "@/components/shared/SectionDivider";
import { ABOUT_MISSION } from "@/content/about";
import { OZONE_VISUAL } from "@/content/media";

export function MissionSection() {
  return (
    <section className="px-5 pb-14 lg:px-8 lg:pb-20">
      <motion.div
        initial={{ opacity: 0, y: 18 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.55, ease: "easeOut" }}
        className="mx-auto max-w-4xl"
      >
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gold">{ABOUT_MISSION.eyebrow}</p>
        <h2 className="text-balance mt-3 font-display text-2xl text-ink lg:text-3xl">{ABOUT_MISSION.title}</h2>
        <SectionDivider className="my-5" />
        <p className="max-w-xl leading-relaxed text-slate">{ABOUT_MISSION.text}</p>

        <div className="relative mt-8 aspect-[16/11] overflow-hidden rounded-2xl shadow-lg shadow-ink/10 lg:aspect-[16/8]">
          <Image
            src={OZONE_VISUAL.src}
            alt={OZONE_VISUAL.alt}
            fill
            sizes="(min-width: 1024px) 896px, 100vw"
            className="object-cover object-[50%_35%]"
          />
        </div>
      </motion.div>
    </section>
  );
}

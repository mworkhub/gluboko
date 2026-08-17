"use client";

import { motion } from "motion/react";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { SectionDivider } from "@/components/shared/SectionDivider";
import { CATEGORY_META } from "@/content/services";
import { DRY_CLEANING_CARD_VISUAL, DRY_CLEANING_VISUAL, OZONE_CARD_VISUAL, OZONE_VISUAL } from "@/content/media";

const CARDS = [
  {
    category: "ozone" as const,
    title: CATEGORY_META.ozone.label,
    desc: "Усуває бактерії, запахи та алергени. Дарує свіже та безпечне середовище.",
    visual: OZONE_VISUAL,
  },
  {
    category: "dry_cleaning" as const,
    title: CATEGORY_META.dry_cleaning.label,
    desc: "Професійний догляд за меблями. Чистота, що подовжує життя улюблених речей.",
    visual: DRY_CLEANING_VISUAL,
  },
];

export function ServiceHubCards({ compact = false }: { compact?: boolean }) {
  return (
    <div className={compact ? "flex flex-col gap-2" : "grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5"}>
      {CARDS.map((card, i) => (
        <motion.div
          key={card.category}
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, ease: "easeOut", delay: 0.3 + i * 0.1 }}
          whileHover={{ y: -4, scale: 1.015 }}
          className={
            compact
              ? "group relative flex items-stretch overflow-hidden rounded-[28px] bg-white-warm shadow-md shadow-ink/10"
              : "group relative aspect-[4/3] overflow-hidden rounded-2xl shadow-lg shadow-ink/10 sm:aspect-[12/7] lg:aspect-[16/8]"
          }
        >
          <Link href={`/${CATEGORY_META[card.category].slug}`} className="absolute inset-0 z-10" aria-label={card.title} />

          {compact ? (
            <div className="relative w-[42%] shrink-0 overflow-hidden">
              <Image
                src={card.category === "ozone" ? OZONE_CARD_VISUAL.src : DRY_CLEANING_CARD_VISUAL.src}
                alt={card.category === "ozone" ? OZONE_CARD_VISUAL.alt : DRY_CLEANING_CARD_VISUAL.alt}
                fill
                sizes="45vw"
                className={
                  card.category === "ozone"
                    ? "scale-[1.4] object-cover object-[20%_32%] transition-transform duration-700 group-hover:scale-[1.45]"
                    : "scale-[1.4] object-cover object-[18%_30%] transition-transform duration-700 group-hover:scale-[1.45]"
                }
              />
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-white-warm" />
            </div>
          ) : card.category === "ozone" ? (
            <Image
              src={OZONE_CARD_VISUAL.src}
              alt={OZONE_CARD_VISUAL.alt}
              fill
              sizes="(min-width: 640px) 50vw, 100vw"
              className="object-cover object-[50%_38%] transition-transform duration-700 group-hover:scale-105"
            />
          ) : (
            <Image
              src={DRY_CLEANING_CARD_VISUAL.src}
              alt={DRY_CLEANING_CARD_VISUAL.alt}
              fill
              sizes="(min-width: 640px) 50vw, 100vw"
              className="object-cover object-[50%_35%] transition-transform duration-700 group-hover:scale-105"
            />
          )}

          {compact ? (
            <div className="flex flex-1 items-center justify-between gap-2 px-5 py-4">
              <h3 className="font-display text-base font-bold uppercase tracking-wide text-ink">{card.title}</h3>
              <span className="pointer-events-none relative z-20 flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-ink text-cream transition-colors group-hover:bg-ink-light">
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </span>
            </div>
          ) : (
            <>
              {/* same darkening scrim as the hero photo, so the text stays readable —
                  kept short on the ozone card so it doesn't wash out the logo mark */}
              <div
                className={
                  card.category === "ozone"
                    ? "absolute inset-0 bg-gradient-to-t from-cream from-[5%] via-cream/70 via-[28%] to-transparent to-[52%]"
                    : "absolute inset-0 bg-gradient-to-t from-cream from-[10%] via-cream/70 via-[50%] to-transparent to-[85%]"
                }
              />

              <div className="absolute inset-x-0 bottom-0 px-4 pb-4 pt-6 text-center sm:px-5 sm:pb-5">
                <h3 className="font-display text-lg font-bold text-ink drop-shadow-[0_2px_10px_rgba(250,248,244,0.95)] sm:text-2xl lg:text-3xl">
                  {card.title}
                </h3>
                <SectionDivider className="my-1.5 justify-center drop-shadow-[0_1px_4px_rgba(250,248,244,0.9)]" lineClassName="w-12" />
                <p className="mx-auto max-w-[15rem] text-xs leading-snug text-ink/70 drop-shadow-[0_1px_6px_rgba(250,248,244,0.9)] lg:max-w-xs lg:text-base">
                  {card.desc}
                </p>

                <span className="pointer-events-none relative z-20 mx-auto mt-3 flex h-9 w-9 items-center justify-center rounded-full bg-ink text-cream transition-colors group-hover:bg-ink-light">
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                </span>
              </div>
            </>
          )}
        </motion.div>
      ))}
    </div>
  );
}

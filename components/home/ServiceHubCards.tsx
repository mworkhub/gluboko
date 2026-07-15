"use client";

import { motion } from "motion/react";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { LogoMark } from "@/components/shared/LogoMark";
import { SectionDivider } from "@/components/shared/SectionDivider";
import { CATEGORY_META } from "@/content/services";
import { DRY_CLEANING_VISUAL, OZONE_VISUAL } from "@/content/media";

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
              {card.category === "ozone" ? (
                <div className="absolute inset-0 bg-gradient-to-r from-sphere-start/25 via-white-warm/70 to-white-warm">
                  <motion.span
                    className="absolute left-[15%] top-[18%] h-2 w-2 rounded-full bg-sphere-start/50 blur-[1px]"
                    animate={{ y: [0, -6, 0], opacity: [0.6, 1, 0.6] }}
                    transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }}
                  />
                  <motion.span
                    className="absolute left-[70%] top-[60%] h-3 w-3 rounded-full bg-sphere-end/25 blur-[1px]"
                    animate={{ y: [0, -8, 0], opacity: [0.5, 0.9, 0.5] }}
                    transition={{ duration: 5.5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
                  />
                  <motion.span
                    className="absolute left-[80%] top-[20%] h-1.5 w-1.5 rounded-full bg-sphere-start/60"
                    animate={{ y: [0, -5, 0], opacity: [0.6, 1, 0.6] }}
                    transition={{ duration: 3.8, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                  />
                  <motion.div
                    className="flex h-full items-center justify-center"
                    animate={{ y: [0, -4, 0] }}
                    transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                  >
                    <LogoMark size="lg" className="h-16 w-16" />
                  </motion.div>
                </div>
              ) : (
                <>
                  <Image
                    src={card.visual.src}
                    alt={card.visual.alt}
                    fill
                    sizes="45vw"
                    className="object-cover object-[35%_60%] transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-white-warm" />
                </>
              )}
            </div>
          ) : card.category === "ozone" ? (
            <div className="absolute inset-0 bg-gradient-to-br from-sphere-start/20 via-white-warm to-sphere-start/10">
              <motion.span
                className="absolute left-[10%] top-[12%] h-3 w-3 rounded-full bg-sphere-start/50 blur-[1px]"
                animate={{ y: [0, -8, 0], opacity: [0.6, 1, 0.6] }}
                transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }}
              />
              <motion.span
                className="absolute left-[76%] top-[54%] h-4 w-4 rounded-full bg-sphere-end/25 blur-[1px]"
                animate={{ y: [0, -10, 0], opacity: [0.5, 0.9, 0.5] }}
                transition={{ duration: 5.5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
              />
              <motion.span
                className="absolute left-[85%] top-[16%] h-2 w-2 rounded-full bg-sphere-start/60"
                animate={{ y: [0, -6, 0], opacity: [0.6, 1, 0.6] }}
                transition={{ duration: 3.8, repeat: Infinity, ease: "easeInOut", delay: 1 }}
              />
              <motion.span
                className="absolute left-[18%] top-[62%] h-2.5 w-2.5 rounded-full bg-sphere-start/40 blur-[1px]"
                animate={{ y: [0, -7, 0], opacity: [0.5, 0.9, 0.5] }}
                transition={{ duration: 4.2, repeat: Infinity, ease: "easeInOut", delay: 1.5 }}
              />
              <motion.span
                className="absolute left-[45%] top-[22%] h-1.5 w-1.5 rounded-full bg-sphere-end/30"
                animate={{ y: [0, -9, 0], opacity: [0.5, 0.9, 0.5] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 0.3 }}
              />
              <motion.span
                className="absolute left-[60%] top-[75%] h-3 w-3 rounded-full bg-sphere-start/45 blur-[1px]"
                animate={{ y: [0, -8, 0], opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 4.8, repeat: Infinity, ease: "easeInOut", delay: 0.8 }}
              />
              <motion.span
                className="absolute left-[30%] top-[35%] h-2 w-2 rounded-full bg-sphere-end/20 blur-[1px]"
                animate={{ y: [0, -6, 0], opacity: [0.4, 0.8, 0.4] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 1.2 }}
              />
              <motion.span
                className="absolute left-[92%] top-[70%] h-2.5 w-2.5 rounded-full bg-sphere-start/50"
                animate={{ y: [0, -7, 0], opacity: [0.5, 0.9, 0.5] }}
                transition={{ duration: 4.6, repeat: Infinity, ease: "easeInOut", delay: 1.8 }}
              />
              <motion.div
                className="flex h-full items-center justify-center pb-20 sm:pb-24 lg:pb-28"
                animate={{ y: [0, -6, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              >
                <LogoMark size="lg" className="h-28 w-28 sm:h-32 sm:w-32 lg:h-24 lg:w-24" />
              </motion.div>
            </div>
          ) : (
            <Image
              src={card.visual.src}
              alt={card.visual.alt}
              fill
              sizes="(min-width: 640px) 50vw, 100vw"
              className="object-cover object-[35%_35%] transition-transform duration-700 group-hover:scale-105"
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

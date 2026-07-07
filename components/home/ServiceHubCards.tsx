"use client";

import { motion } from "motion/react";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useLeadModal } from "@/components/forms/lead-modal-context";
import { LogoMark } from "@/components/shared/LogoMark";
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

export function ServiceHubCards() {
  const { open } = useLeadModal();

  return (
    <div className="grid gap-4 sm:grid-cols-2 sm:gap-5">
      {CARDS.map((card, i) => (
        <motion.div
          key={card.category}
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, ease: "easeOut", delay: 0.3 + i * 0.1 }}
          whileHover={{ y: -4 }}
          className="group relative aspect-[8/5] overflow-hidden rounded-2xl shadow-lg shadow-ink/10 sm:aspect-[12/7]"
        >
          <Link href={`/${CATEGORY_META[card.category].slug}`} className="absolute inset-0 z-10" aria-label={card.title} />

          {card.category === "ozone" ? (
            <div className="absolute inset-0 bg-gradient-to-br from-white via-cream-deep/40 to-white">
              <motion.span
                className="absolute left-[16%] top-[14%] h-2.5 w-2.5 rounded-full bg-sphere-end/25 blur-[1px]"
                animate={{ y: [0, -8, 0], opacity: [0.6, 1, 0.6] }}
                transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }}
              />
              <motion.span
                className="absolute left-[76%] top-[54%] h-3 w-3 rounded-full bg-sphere-end/20 blur-[1px]"
                animate={{ y: [0, -10, 0], opacity: [0.5, 0.9, 0.5] }}
                transition={{ duration: 5.5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
              />
              <motion.span
                className="absolute left-[82%] top-[18%] h-1.5 w-1.5 rounded-full bg-sphere-end/30"
                animate={{ y: [0, -6, 0], opacity: [0.6, 1, 0.6] }}
                transition={{ duration: 3.8, repeat: Infinity, ease: "easeInOut", delay: 1 }}
              />
              <motion.span
                className="absolute left-[20%] top-[58%] h-2 w-2 rounded-full bg-sphere-end/20"
                animate={{ y: [0, -7, 0], opacity: [0.5, 0.9, 0.5] }}
                transition={{ duration: 4.2, repeat: Infinity, ease: "easeInOut", delay: 1.5 }}
              />
              <motion.div
                className="flex h-full items-center justify-center pb-6"
                animate={{ y: [0, -6, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              >
                <LogoMark size="lg" className="h-28 w-28 sm:h-32 sm:w-32" />
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

          {/* same darkening scrim as the hero photo, so the text stays readable */}
          <div className="absolute inset-0 bg-gradient-to-t from-cream from-[25%] via-cream/45 via-[45%] to-transparent to-[72%]" />

          <div className="absolute inset-x-0 bottom-0 px-4 pb-4 pt-6 text-center sm:px-5 sm:pb-5">
            <h3 className="font-display text-base text-ink sm:text-lg">{card.title}</h3>
            <div className="my-1.5 flex items-center justify-center gap-2.5 text-gold">
              <span className="h-px w-6 bg-gold/40" />
              <span className="text-[9px]">✦</span>
              <span className="h-px w-6 bg-gold/40" />
            </div>
            <p className="mx-auto hidden max-w-[15rem] text-xs leading-snug text-ink/70 sm:block">{card.desc}</p>

            <button
              type="button"
              onClick={(e) => {
                e.preventDefault();
                open(card.category);
              }}
              className="relative z-20 mx-auto mt-3 inline-flex items-center gap-2 rounded-full bg-ink px-4 py-2 text-[11px] font-semibold uppercase tracking-wide text-cream transition-colors hover:bg-ink-light"
            >
              Замовити {card.category === "ozone" ? "озонування" : "хімчистку"}
              <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
            </button>
          </div>
        </motion.div>
      ))}
    </div>
  );
}

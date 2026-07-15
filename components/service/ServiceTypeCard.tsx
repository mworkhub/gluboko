"use client";

import { motion } from "motion/react";
import {
  Armchair,
  Baby,
  Bed,
  BedDouble,
  BedSingle,
  Blinds,
  Briefcase,
  Bug,
  Car,
  CarFront,
  Cigarette,
  Clock,
  Droplets,
  Flame,
  Home,
  LayoutGrid,
  Package,
  PawPrint,
  ShieldAlert,
  Sofa,
  Sparkles,
  SprayCan,
  Tag,
  Utensils,
  Wind,
  ArrowRight,
} from "lucide-react";
import Image from "next/image";
import { useLeadModal } from "@/components/forms/lead-modal-context";
import { SectionDivider } from "@/components/shared/SectionDivider";
import type { Service } from "@/lib/types";

const ICONS = {
  home: Home,
  car: Car,
  briefcase: Briefcase,
  "bed-double": BedDouble,
  package: Package,
  sofa: Sofa,
  "layout-grid": LayoutGrid,
  baby: Baby,
  "bed-single": BedSingle,
  armchair: Armchair,
  sparkles: Sparkles,
  bed: Bed,
  blinds: Blinds,
  "car-front": CarFront,
  flame: Flame,
  droplets: Droplets,
  "shield-alert": ShieldAlert,
  cigarette: Cigarette,
  "paw-print": PawPrint,
  "spray-can": SprayCan,
  bug: Bug,
  utensils: Utensils,
  tag: Tag,
  wind: Wind,
} satisfies Record<string, typeof Home>;

const PRICE_PILL_DESKTOP =
  "inline-flex rounded-full border border-gold/50 bg-cream-deep/50 px-5 py-2.5 text-sm font-bold uppercase tracking-wide text-ink transition-colors group-hover:bg-cream-deep";
const PRICE_PILL_MOBILE =
  "whitespace-nowrap rounded-full border border-gold/50 bg-cream-deep/50 px-3 py-1.5 text-xs font-bold text-ink";

export function ServiceTypeCard({ service, index }: { service: Service; index: number }) {
  const { open } = useLeadModal();
  const Icon = ICONS[service.icon as keyof typeof ICONS] ?? Sparkles;
  const image = service.image_url;

  const handleOpen = () => open(service.category, service.title);

  return (
    <motion.div
      initial={{ opacity: 0, y: 22 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.5, ease: "easeOut", delay: (index % 3) * 0.08 }}
      whileHover={{ y: -4, scale: 1.015 }}
      whileTap={{ scale: 0.98 }}
      role="button"
      tabIndex={0}
      aria-label={`Замовити: ${service.title}`}
      onClick={handleOpen}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          handleOpen();
        }
      }}
      className="group flex cursor-pointer flex-row items-center gap-4 rounded-2xl border border-ink/8 bg-white-warm p-3 shadow-sm outline-none transition-shadow hover:shadow-lg focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 sm:flex-col sm:items-stretch sm:gap-0 sm:overflow-hidden sm:p-0"
    >
      <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-full bg-cream-deep sm:h-auto sm:w-full sm:shrink sm:aspect-[4/3] sm:rounded-none">
        {image && (
          <Image
            src={image}
            alt={service.title}
            fill
            sizes="(min-width: 1024px) 360px, 64px"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
        )}
        <span
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white-warm/40 to-transparent transition-transform duration-700 ease-out group-hover:translate-x-full"
        />
      </div>

      <div className="flex min-w-0 flex-1 flex-col sm:p-6">
        <motion.div
          initial={{ scale: 0, rotate: -20 }}
          whileInView={{ scale: 1, rotate: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ type: "spring", stiffness: 260, damping: 15, delay: (index % 3) * 0.08 + 0.2 }}
          className="mb-3 hidden h-10 w-10 items-center justify-center rounded-full bg-ink/5 sm:flex"
        >
          <Icon className="h-5 w-5 text-ink" strokeWidth={1.5} />
        </motion.div>
        <h3 className="font-display text-lg font-bold leading-snug text-ink sm:text-2xl">{service.title}</h3>
        <SectionDivider className="my-2 hidden sm:flex" lineClassName="w-10" />
        <p className="mt-1 line-clamp-2 text-xs leading-relaxed text-slate sm:mt-0 sm:line-clamp-none sm:flex-1 sm:text-sm">
          {service.description}
        </p>
        {service.meta && <p className="mt-3 hidden text-xs font-medium text-slate/70 sm:block">{service.meta}</p>}

        <div className="mt-5 hidden sm:block">
          {service.category === "dry_cleaning" ? (
            <span className={PRICE_PILL_DESKTOP}>Розрахувати</span>
          ) : service.price_from ? (
            <span className={PRICE_PILL_DESKTOP}>від {service.price_from} грн</span>
          ) : (
            <span className="flex h-10 w-10 items-center justify-center rounded-full bg-gold text-ink transition-colors group-hover:bg-gold-light">
              <ArrowRight className="h-4 w-4" />
            </span>
          )}
        </div>
      </div>

      <div className="flex shrink-0 flex-col items-end gap-1.5 sm:hidden">
        {service.category === "dry_cleaning" ? (
          <span className={PRICE_PILL_MOBILE}>Розрахувати</span>
        ) : service.price_from ? (
          <span className={PRICE_PILL_MOBILE}>від {service.price_from} грн</span>
        ) : (
          <span className="flex h-9 w-9 items-center justify-center rounded-full bg-gold text-ink">
            <ArrowRight className="h-4 w-4" />
          </span>
        )}
        {service.meta && (
          <span className="flex items-center gap-1 whitespace-nowrap text-[11px] text-slate/70">
            <Clock className="h-3 w-3" strokeWidth={1.5} />
            {service.meta}
          </span>
        )}
      </div>
    </motion.div>
  );
}

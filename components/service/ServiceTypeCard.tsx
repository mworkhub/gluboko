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
      whileHover={{ y: -4 }}
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
      className="group flex cursor-pointer flex-col overflow-hidden rounded-2xl border border-ink/8 bg-white shadow-sm outline-none transition-shadow hover:shadow-lg focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2"
    >
      <div className="relative aspect-[4/3] overflow-hidden bg-cream-deep">
        {image && (
          <Image
            src={image}
            alt={service.title}
            fill
            sizes="(min-width: 1024px) 360px, 90vw"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
        )}
        <span
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/40 to-transparent transition-transform duration-700 ease-out group-hover:translate-x-full"
        />
      </div>

      <div className="flex flex-1 flex-col p-6">
        <motion.div
          initial={{ scale: 0, rotate: -20 }}
          whileInView={{ scale: 1, rotate: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ type: "spring", stiffness: 260, damping: 15, delay: (index % 3) * 0.08 + 0.2 }}
          className="mb-3 flex h-10 w-10 items-center justify-center rounded-full bg-ink/5"
        >
          <Icon className="h-5 w-5 text-ink" strokeWidth={1.5} />
        </motion.div>
        <h3 className="font-display text-base leading-snug text-ink">{service.title}</h3>
        <p className="mt-2 flex-1 text-sm leading-relaxed text-slate">{service.description}</p>
        {service.meta && <p className="mt-3 text-xs font-medium text-slate/70">{service.meta}</p>}

        <div className="mt-5">
          {service.price_from ? (
            <span className="inline-flex rounded-full bg-sphere-end/10 px-4 py-2 text-xs font-bold uppercase tracking-wide text-sphere-end transition-colors group-hover:bg-sphere-end/20">
              від {service.price_from} грн
            </span>
          ) : (
            <span className="flex h-10 w-10 items-center justify-center rounded-full bg-gold text-ink transition-colors group-hover:bg-gold-light">
              <ArrowRight className="h-4 w-4" />
            </span>
          )}
        </div>
      </div>
    </motion.div>
  );
}

"use client";

import { motion } from "motion/react";
import { MapPin } from "lucide-react";
import { cn } from "@/lib/utils";

// A stylized, static illustration of Kyiv and its region — deliberately not a
// real map embed (no API key / third-party script needed). Good enough to
// convey "we work across Kyiv and the region" without pretending to be
// geographically precise.
export function MapIllustration({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "relative w-full overflow-hidden rounded-2xl border border-ink/8 bg-cream-deep/60",
        className ?? "aspect-[4/3]"
      )}
    >
      <svg viewBox="0 0 400 300" className="h-full w-full" aria-hidden="true">
        <defs>
          <linearGradient id="mapBg" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#f1ecdf" />
            <stop offset="100%" stopColor="#e8dfc9" />
          </linearGradient>
        </defs>
        <rect width="400" height="300" fill="url(#mapBg)" />

        {/* river */}
        <path
          d="M230 -10 C 210 60, 260 100, 235 160 S 200 260, 220 310"
          fill="none"
          stroke="#c9d8df"
          strokeWidth="14"
        />

        {/* roads */}
        <path d="M0 90 H400" stroke="#d8cdb2" strokeWidth="3" strokeDasharray="2 8" strokeLinecap="round" />
        <path d="M0 210 H400" stroke="#d8cdb2" strokeWidth="3" strokeDasharray="2 8" strokeLinecap="round" />
        <path d="M90 0 V300" stroke="#d8cdb2" strokeWidth="3" strokeDasharray="2 8" strokeLinecap="round" />
        <path d="M320 0 V300" stroke="#d8cdb2" strokeWidth="3" strokeDasharray="2 8" strokeLinecap="round" />

        {/* districts as soft blocks */}
        {[
          [40, 40, 34],
          [130, 30, 26],
          [300, 60, 30],
          [60, 180, 28],
          [300, 200, 26],
          [140, 230, 30],
        ].map(([cx, cy, r], i) => (
          <circle key={i} cx={cx} cy={cy} r={r} fill="#c9a063" opacity="0.12" />
        ))}

        {/* labels */}
        <text x="35" y="45" fontSize="10" fill="#5b6472" fontWeight="600">
          Ірпінь
        </text>
        <text x="290" y="55" fontSize="10" fill="#5b6472" fontWeight="600">
          Бровари
        </text>
        <text x="45" y="200" fontSize="10" fill="#5b6472" fontWeight="600">
          Вишневе
        </text>
        <text x="285" y="215" fontSize="10" fill="#5b6472" fontWeight="600">
          Бориспіль
        </text>
      </svg>

      <motion.div
        initial={{ scale: 0, y: -6 }}
        whileInView={{ scale: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ type: "spring", stiffness: 260, damping: 16, delay: 0.15 }}
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-[85%]"
      >
        <span className="relative flex flex-col items-center">
          <span className="flex h-11 w-11 items-center justify-center rounded-full bg-ink text-cream shadow-lg">
            <MapPin className="h-5 w-5" />
          </span>
          <span className="absolute inset-x-0 -bottom-1 mx-auto h-2 w-2 rotate-45 bg-ink" />
        </span>
        <p className="mt-3 whitespace-nowrap text-center text-xs font-bold uppercase tracking-wide text-ink">Київ</p>
      </motion.div>

      <div className="absolute bottom-4 right-4 rounded-xl bg-white-warm/90 px-4 py-3 text-right shadow-sm backdrop-blur">
        <p className="text-xs font-bold uppercase tracking-wide text-ink">Київ та область</p>
        <p className="text-[11px] text-slate">Виїзд по всіх районах</p>
      </div>
    </div>
  );
}

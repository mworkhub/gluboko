"use client";

import { motion, useReducedMotion } from "motion/react";
import Image from "next/image";
import { cn } from "@/lib/utils";

const SIZES = {
  sm: "h-11 w-11",
  md: "h-14 w-14",
  lg: "h-20 w-20",
} as const;

export function LogoMark({ size = "md", className }: { size?: keyof typeof SIZES; className?: string }) {
  const reduceMotion = useReducedMotion();

  return (
    <motion.span
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.7, ease: "easeOut" }}
      className={cn("relative inline-flex shrink-0 items-center justify-center", SIZES[size], className)}
    >
      {/* ambient glow */}
      <motion.span
        className="absolute inset-[-30%] rounded-full bg-gradient-to-br from-sphere-start/40 to-sphere-end/20 blur-md"
        animate={reduceMotion ? undefined : { opacity: [0.5, 0.85, 0.5], scale: [1, 1.08, 1] }}
        transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }}
      />

      <Image
        src="/images/logo-base.png"
        alt="ГЛИБОКО"
        fill
        sizes="80px"
        className="relative object-contain"
        priority
      />
      <motion.div
        className="absolute inset-0"
        style={{ transformOrigin: "50% 50%" }}
        animate={reduceMotion ? undefined : { rotate: 360 }}
        transition={{ duration: 14, repeat: Infinity, ease: "linear" }}
      >
        <Image src="/images/logo-spheres.png" alt="" fill sizes="80px" className="object-contain" />
      </motion.div>
    </motion.span>
  );
}

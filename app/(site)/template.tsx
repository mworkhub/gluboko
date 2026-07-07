"use client";

import { motion } from "motion/react";

// A template (unlike layout) remounts on every navigation, so this fade+rise
// plays each time you move between "/", "/ozonuvannya" and "/himchistka-mebliv".
export default function SiteTemplate({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  );
}

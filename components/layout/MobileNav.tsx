"use client";

import { AnimatePresence, motion } from "motion/react";
import { ArrowRight, X } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

type NavLink = { href: string; label: string };

export function MobileNav({
  isOpen,
  onClose,
  navLinks,
  serviceLinks,
  onOrder,
}: {
  isOpen: boolean;
  onClose: () => void;
  navLinks: NavLink[];
  serviceLinks: NavLink[];
  onOrder: () => void;
}) {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            className="fixed inset-0 z-40 bg-ink/50 lg:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />
          <motion.div
            className="fixed right-0 top-0 z-50 flex h-full w-[82%] max-w-sm flex-col bg-cream p-6 shadow-2xl lg:hidden"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", stiffness: 320, damping: 34 }}
          >
            <div className="flex items-center justify-between">
              <span className="font-logo text-lg tracking-[0.15em] text-ink">ГЛИБОКО</span>
              <button aria-label="Закрити меню" onClick={onClose} className="text-ink">
                <X className="h-6 w-6" />
              </button>
            </div>

            <nav className="mt-10 flex flex-col gap-1">
              {navLinks[0] && (
                <Link
                  key={navLinks[0].href}
                  href={navLinks[0].href}
                  onClick={onClose}
                  className="rounded-lg px-3 py-3 text-sm font-semibold uppercase tracking-wide text-ink/80 transition-colors hover:bg-white-warm hover:text-ink"
                >
                  {navLinks[0].label}
                </Link>
              )}

              <p className="mt-4 px-3 text-[11px] font-semibold uppercase tracking-widest text-slate">
                Послуги
              </p>
              <div className="flex flex-col gap-2">
                {serviceLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={onClose}
                    className="flex items-center justify-between rounded-xl border border-gold/30 bg-white-warm px-4 py-3.5 text-sm font-bold uppercase tracking-wide text-ink shadow-sm transition-colors hover:border-gold/60 hover:bg-gold/5"
                  >
                    {link.label}
                    <ArrowRight className="h-4 w-4 shrink-0 text-gold" />
                  </Link>
                ))}
              </div>

              <div className="mt-4 flex flex-col gap-1">
                {navLinks.slice(1).map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={onClose}
                    className="rounded-lg px-3 py-3 text-sm font-semibold uppercase tracking-wide text-ink/80 transition-colors hover:bg-white-warm hover:text-ink"
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            </nav>

            <Button size="lg" className="mt-auto w-full" onClick={onOrder}>
              Замовити послугу
            </Button>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

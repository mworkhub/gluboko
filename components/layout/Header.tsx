"use client";

import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "motion/react";
import { ChevronDown, Menu, Phone } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useLeadModal } from "@/components/forms/lead-modal-context";
import { LogoMark } from "@/components/shared/LogoMark";
import { CATEGORY_META } from "@/content/services";
import { cn } from "@/lib/utils";
import type { ContactSettings } from "@/lib/types";
import { MobileNav } from "./MobileNav";

const NAV_LINKS = [
  { href: "/", label: "Головна" },
  { href: "/#about", label: "Про нас" },
];

const TAIL_LINKS = [
  { href: "/#reviews", label: "Відгуки" },
  { href: "/kontakty", label: "Контакти" },
];

const SERVICE_LINKS = [
  { href: `/${CATEGORY_META.ozone.slug}`, label: CATEGORY_META.ozone.label },
  { href: `/${CATEGORY_META.dry_cleaning.slug}`, label: CATEGORY_META.dry_cleaning.label },
];

const underline = {
  rest: { scaleX: 0 },
  hover: { scaleX: 1 },
};

function NavLink({ href, label }: { href: string; label: string }) {
  return (
    <Link href={href} className="relative py-1">
      <motion.span
        initial="rest"
        whileHover="hover"
        animate="rest"
        className="relative inline-flex text-xs font-semibold uppercase tracking-wide text-ink/80 transition-colors hover:text-ink"
      >
        {label}
        <motion.span
          variants={underline}
          transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
          className="absolute -bottom-1 left-0 h-px w-full origin-left bg-gold"
        />
      </motion.span>
    </Link>
  );
}

export function Header({ contact }: { contact: ContactSettings }) {
  const [servicesOpen, setServicesOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { open } = useLeadModal();
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => setScrolled(latest > 24));

  return (
    <>
    <header
      className={cn(
        "sticky top-0 z-40 border-b border-ink/8 bg-cream/95 backdrop-blur transition-shadow duration-300",
        scrolled && "shadow-md shadow-ink/5"
      )}
    >
      <div
        className={cn(
          "mx-auto flex max-w-7xl items-center justify-between px-5 transition-[height] duration-300 ease-out lg:px-8",
          scrolled ? "h-16" : "h-20"
        )}
      >
        <Link href="/" className="flex items-center gap-3">
          <motion.div animate={{ scale: scrolled ? 0.82 : 1 }} transition={{ duration: 0.3, ease: "easeOut" }}>
            <LogoMark size="lg" />
          </motion.div>
          <motion.span
            initial={{ opacity: 0, x: -8 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.15, ease: "easeOut" }}
            className="flex flex-col leading-tight"
          >
            <span className="font-display text-lg tracking-wide text-ink">ГЛИБОКО</span>
            <span className="text-[10px] uppercase tracking-widest text-slate">
              Озонування · Хімчистка на виїзд
            </span>
          </motion.span>
        </Link>

        <nav className="hidden items-center gap-7 lg:flex">
          {NAV_LINKS.map((link) => (
            <NavLink key={link.href} href={link.href} label={link.label} />
          ))}

          <div
            className="relative"
            onMouseEnter={() => setServicesOpen(true)}
            onMouseLeave={() => setServicesOpen(false)}
          >
            <button className="flex items-center gap-1 text-xs font-semibold uppercase tracking-wide text-ink/80 transition-colors hover:text-ink">
              Послуги
              <motion.span animate={{ rotate: servicesOpen ? 180 : 0 }} transition={{ duration: 0.2 }}>
                <ChevronDown className="h-3.5 w-3.5" />
              </motion.span>
            </button>
            <AnimatePresence>
              {servicesOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 8, scale: 0.97 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 8, scale: 0.97 }}
                  transition={{ duration: 0.18, ease: [0.16, 1, 0.3, 1] }}
                  className="absolute left-1/2 top-full w-56 -translate-x-1/2 pt-3"
                >
                  <div className="overflow-hidden rounded-xl border border-ink/10 bg-white shadow-xl">
                    {SERVICE_LINKS.map((link) => (
                      <Link
                        key={link.href}
                        href={link.href}
                        className="block px-5 py-3 text-xs font-semibold uppercase tracking-wide text-ink/80 transition-colors hover:bg-cream hover:text-ink"
                      >
                        {link.label}
                      </Link>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {TAIL_LINKS.map((link) => (
            <NavLink key={link.href} href={link.href} label={link.label} />
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <Button className="hidden lg:inline-flex" onClick={() => open()}>
            Замовити послугу
          </Button>
          <a
            href={contact.phoneHref}
            aria-label="Зателефонувати"
            className="hidden h-11 w-11 items-center justify-center rounded-full border border-ink/15 text-ink transition-colors hover:border-ink hover:bg-ink hover:text-cream lg:flex"
          >
            <Phone className="h-4 w-4" />
          </a>
          <button
            className="flex h-11 w-11 items-center justify-center rounded-full text-ink lg:hidden"
            aria-label="Меню"
            onClick={() => setMobileOpen(true)}
          >
            <Menu className="h-6 w-6" />
          </button>
        </div>
      </div>
    </header>

    <MobileNav
      isOpen={mobileOpen}
      onClose={() => setMobileOpen(false)}
      navLinks={[...NAV_LINKS, ...TAIL_LINKS]}
      serviceLinks={SERVICE_LINKS}
      onOrder={() => {
        setMobileOpen(false);
        open();
      }}
    />
    </>
  );
}

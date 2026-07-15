"use client";

import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "motion/react";
import { ChevronDown, Menu } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useLeadModal } from "@/components/forms/lead-modal-context";
import { LogoDivider } from "@/components/shared/LogoDivider";
import { LogoMark } from "@/components/shared/LogoMark";
import { CATEGORY_META } from "@/content/services";
import { cn } from "@/lib/utils";
import { MobileNav } from "./MobileNav";

const NAV_LINKS = [
  { href: "/", label: "Головна" },
  { href: "/pro-nas", label: "Про нас" },
];

const TAIL_LINKS = [
  { href: "/#advantages", label: "Переваги" },
  { href: "/#reviews", label: "Відгуки" },
  { href: "/kontakty", label: "Контакти" },
];

const SERVICE_LINKS = [
  { href: `/${CATEGORY_META.ozone.slug}`, label: CATEGORY_META.ozone.label },
  { href: `/${CATEGORY_META.dry_cleaning.slug}`, label: CATEGORY_META.dry_cleaning.label },
];

// Pages whose hero has its own full-bleed photo (desktop only) get the
// transparent-over-hero header; everything else keeps the opaque cream bar.
const TRANSPARENT_ROUTES = new Set([
  "/",
  "/pro-nas",
  "/kontakty",
  `/${CATEGORY_META.ozone.slug}`,
  `/${CATEGORY_META.dry_cleaning.slug}`,
]);

const underline = {
  rest: { scaleX: 0 },
  hover: { scaleX: 1 },
};

function NavLink({ href, label, transparent }: { href: string; label: string; transparent?: boolean }) {
  return (
    <Link href={href} className="relative py-1">
      <motion.span
        initial="rest"
        whileHover="hover"
        animate="rest"
        className={cn(
          "relative inline-flex text-xs font-semibold uppercase tracking-wide text-ink/80 transition-colors hover:text-ink",
          transparent && "drop-shadow-[0_1px_5px_rgba(250,248,244,0.9)]"
        )}
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

function ServicesDropdown({
  servicesOpen,
  setServicesOpen,
  transparent,
}: {
  servicesOpen: boolean;
  setServicesOpen: (v: boolean) => void;
  transparent?: boolean;
}) {
  return (
    <div className="relative" onMouseEnter={() => setServicesOpen(true)} onMouseLeave={() => setServicesOpen(false)}>
      <button
        className={cn(
          "flex items-center gap-1 text-xs font-semibold uppercase tracking-wide text-ink/80 transition-colors hover:text-ink",
          transparent && "drop-shadow-[0_1px_5px_rgba(250,248,244,0.9)]"
        )}
      >
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
            <div className="overflow-hidden rounded-xl border border-ink/10 bg-white-warm shadow-xl">
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
  );
}

export function Header({ isTransparent }: { isTransparent?: boolean } = {}) {
  const [servicesOpen, setServicesOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { open } = useLeadModal();
  const { scrollY } = useScroll();
  const pathname = usePathname();

  useMotionValueEvent(scrollY, "change", (latest) => setScrolled(latest > 24));

  // Header is rendered once from the shared (site) layout, so route context
  // comes from the pathname rather than a prop threaded through every page;
  // isTransparent is still accepted so a page can force either mode.
  // Only the desktop layout goes transparent-over-hero — mobile keeps its
  // compact opaque bar, since the mobile hero composites its own text
  // directly onto the photo and doesn't need the header to do the same.
  const transparent = isTransparent ?? TRANSPARENT_ROUTES.has(pathname ?? "");

  return (
    <>
    <header
      className={cn(
        "top-0 z-40 border-b border-ink/8 transition-shadow duration-300",
        scrolled && "shadow-md shadow-ink/5",
        transparent
          ? "absolute inset-x-0 border-b-0 bg-transparent shadow-none"
          : "sticky bg-cream"
      )}
    >
      {/* Desktop: nav split left/right around a centered, stacked logo lockup. */}
      <div className="mx-auto hidden max-w-7xl grid-cols-3 items-center px-8 py-2 lg:grid">
        <nav className="flex items-center gap-7 justify-self-start">
          {NAV_LINKS.map((link) => (
            <NavLink key={link.href} href={link.href} label={link.label} transparent={transparent} />
          ))}
          <ServicesDropdown servicesOpen={servicesOpen} setServicesOpen={setServicesOpen} transparent={transparent} />
        </nav>

        <Link href="/" className="relative flex -translate-x-10 justify-self-center">
          <LogoMark size="lg" className="h-24 w-24 animate-logo-glow" />
          <span className="absolute left-1/2 top-full mt-1 -translate-x-1/2 whitespace-nowrap text-center">
            <span className="block font-logo text-3xl tracking-[0.6em] text-ink drop-shadow-[0_1px_8px_rgba(250,248,244,1)]" style={{ marginRight: "-0.6em" }}>
              ГЛИБОКО
            </span>
            <LogoDivider className="my-1" />
            <span className="block text-xs font-semibold uppercase tracking-widest text-ink/70 drop-shadow-[0_1px_5px_rgba(250,248,244,1)]">
              Озонування · Хімчистка на виїзд
            </span>
          </span>
        </Link>

        <div className="flex translate-x-4 items-center gap-6 justify-self-end">
          <nav className="flex items-center gap-7">
            {TAIL_LINKS.map((link) => (
              <NavLink key={link.href} href={link.href} label={link.label} transparent={transparent} />
            ))}
          </nav>
          <Button onClick={() => open()}>Замовити послугу</Button>
        </div>
      </div>

      {/* Mobile: compact left-aligned logo + hamburger. When transparent, sits
          directly on the hero photo like desktop, so text/icon get the same
          drop-shadow treatment for legibility instead of a background pill. */}
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-5 lg:hidden">
        <Link href="/" className="flex items-center gap-3">
          <LogoMark size="lg" className="animate-logo-glow" />
          <span className="flex flex-col items-center leading-tight">
            <span
              className={cn(
                "font-logo text-2xl tracking-[0.4em] text-ink",
                transparent && "drop-shadow-[0_1px_5px_rgba(250,248,244,0.9)]"
              )}
              style={{ marginRight: "-0.4em" }}
            >
              ГЛИБОКО
            </span>
            <LogoDivider className="my-1" />
            <span
              className={cn(
                "text-[10px] font-semibold uppercase tracking-widest text-slate",
                transparent && "drop-shadow-[0_1px_5px_rgba(250,248,244,0.9)]"
              )}
            >
              Озонування · Хімчистка на виїзд
            </span>
          </span>
        </Link>

        <button
          className={cn(
            "flex h-11 w-11 items-center justify-center rounded-full text-ink",
            transparent && "drop-shadow-[0_1px_4px_rgba(250,248,244,0.9)]"
          )}
          aria-label="Меню"
          onClick={() => setMobileOpen(true)}
        >
          <Menu className="h-6 w-6" />
        </button>
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

"use client";

import {
  Contact,
  LayoutDashboard,
  Sofa,
  Sparkles,
  Sliders,
  Info,
  Wrench,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { LogoMark } from "@/components/shared/LogoMark";
import { SignOutButton } from "@/components/admin/SignOutButton";
import { NavBadge } from "@/components/admin/NavBadge";
import { cn } from "@/lib/utils";
import type { NewLeadCounts } from "@/lib/leads";

function getLeadLinks(newCounts: NewLeadCounts) {
  return [
    { href: "/admin", label: "Дашборд", icon: LayoutDashboard, count: newCounts.ozone + newCounts.dry_cleaning },
    { href: "/admin/ozone", label: "Озонування", icon: Sparkles, count: newCounts.ozone },
    { href: "/admin/dry-cleaning", label: "Хімчистка меблів", icon: Sofa, count: newCounts.dry_cleaning },
  ];
}

const SITE_LINKS = [
  { href: "/admin/settings/contact", label: "Контакти", icon: Contact, count: 0 },
  { href: "/admin/settings/about", label: "Про нас", icon: Info, count: 0 },
  { href: "/admin/settings/advantages", label: "Переваги", icon: Sliders, count: 0 },
  { href: "/admin/services/ozone", label: "Послуги: Озонування", icon: Wrench, count: 0 },
  { href: "/admin/services/dry-cleaning", label: "Послуги: Хімчистка", icon: Wrench, count: 0 },
];

function NavGroup({
  title,
  links,
  pathname,
}: {
  title: string;
  links: { href: string; label: string; icon: typeof LayoutDashboard; count: number }[];
  pathname: string;
}) {
  return (
    <div>
      <p className="px-3 text-[11px] font-semibold uppercase tracking-widest text-slate/70">{title}</p>
      <nav className="mt-2 flex flex-col gap-0.5">
        {links.map((link) => {
          const active = link.href === "/admin" ? pathname === "/admin" : pathname.startsWith(link.href);
          return (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "flex items-center gap-2.5 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
                active ? "bg-ink text-cream" : "text-ink/75 hover:bg-ink/5 hover:text-ink"
              )}
            >
              <link.icon className="h-4 w-4 shrink-0" />
              {link.label}
              <NavBadge count={link.count} />
            </Link>
          );
        })}
      </nav>
    </div>
  );
}

export function AdminSidebar({ newCounts }: { newCounts: NewLeadCounts }) {
  const pathname = usePathname();

  return (
    <aside className="hidden w-64 shrink-0 flex-col gap-8 border-r border-ink/8 bg-white/60 p-5 lg:flex">
      <Link href="/admin" className="flex items-center gap-2.5 px-1">
        <LogoMark size="sm" />
        <span className="font-display text-sm text-ink">ГЛИБОКО</span>
      </Link>

      <div className="flex flex-1 flex-col gap-7">
        <NavGroup title="Ліди" links={getLeadLinks(newCounts)} pathname={pathname} />
        <NavGroup title="Управління сайтом" links={SITE_LINKS} pathname={pathname} />
      </div>

      <div className="border-t border-ink/8 pt-4">
        <SignOutButton />
      </div>
    </aside>
  );
}

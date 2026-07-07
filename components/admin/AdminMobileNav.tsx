"use client";

import { Contact, Info, LayoutDashboard, Sliders, Sofa, Sparkles, Wrench } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { LogoMark } from "@/components/shared/LogoMark";
import { NavBadge } from "@/components/admin/NavBadge";
import { cn } from "@/lib/utils";
import type { NewLeadCounts } from "@/lib/leads";

function getLinks(newCounts: NewLeadCounts) {
  return [
    { href: "/admin", label: "Дашборд", icon: LayoutDashboard, count: newCounts.ozone + newCounts.dry_cleaning },
    { href: "/admin/ozone", label: "Озонування", icon: Sparkles, count: newCounts.ozone },
    { href: "/admin/dry-cleaning", label: "Хімчистка", icon: Sofa, count: newCounts.dry_cleaning },
    { href: "/admin/settings/contact", label: "Контакти", icon: Contact, count: 0 },
    { href: "/admin/settings/about", label: "Про нас", icon: Info, count: 0 },
    { href: "/admin/settings/advantages", label: "Переваги", icon: Sliders, count: 0 },
    { href: "/admin/services/ozone", label: "Послуги: Озонування", icon: Wrench, count: 0 },
    { href: "/admin/services/dry-cleaning", label: "Послуги: Хімчистка", icon: Wrench, count: 0 },
  ];
}

export function AdminMobileNav({ newCounts }: { newCounts: NewLeadCounts }) {
  const pathname = usePathname();
  const links = getLinks(newCounts);

  return (
    <div className="border-b border-ink/8 bg-white/60 lg:hidden">
      <div className="flex items-center gap-2 px-5 py-4">
        <LogoMark size="sm" />
        <span className="font-display text-sm text-ink">ГЛИБОКО</span>
      </div>
      <nav className="flex gap-1 overflow-x-auto px-5 pb-3">
        {links.map((link) => {
          const active = link.href === "/admin" ? pathname === "/admin" : pathname.startsWith(link.href);
          return (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "flex shrink-0 items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-medium transition-colors",
                active ? "bg-ink text-cream" : "bg-ink/5 text-ink/70"
              )}
            >
              <link.icon className="h-3.5 w-3.5" />
              {link.label}
              <NavBadge count={link.count} />
            </Link>
          );
        })}
      </nav>
    </div>
  );
}

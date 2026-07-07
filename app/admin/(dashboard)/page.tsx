import Link from "next/link";
import { ArrowRight, Contact, Info, Sliders, Sofa, Sparkles, Wrench } from "lucide-react";
import { createAdminClient } from "@/lib/supabase/admin";
import { Card, CardContent } from "@/components/ui/card";
import { NavBadge } from "@/components/admin/NavBadge";
import type { Lead } from "@/lib/types";

export const dynamic = "force-dynamic";

async function getSummary(table: "ozone_leads" | "dry_cleaning_leads") {
  const supabase = createAdminClient();
  const { data, count } = await supabase
    .from(table)
    .select("status", { count: "exact" })
    .returns<Pick<Lead, "status">[]>();

  const newCount = (data ?? []).filter((l) => l.status === "new").length;
  return { total: count ?? 0, newCount };
}

export default async function AdminDashboardPage() {
  const [ozone, dryCleaning] = await Promise.all([
    getSummary("ozone_leads"),
    getSummary("dry_cleaning_leads"),
  ]);

  const leadCards = [
    {
      href: "/admin/ozone",
      label: "Озонування",
      icon: Sparkles,
      total: ozone.total,
      newCount: ozone.newCount,
    },
    {
      href: "/admin/dry-cleaning",
      label: "Хімчистка меблів",
      icon: Sofa,
      total: dryCleaning.total,
      newCount: dryCleaning.newCount,
    },
  ];

  const settingsCards = [
    { href: "/admin/settings/contact", label: "Контакти", desc: "Телефон, соцмережі, місто", icon: Contact },
    { href: "/admin/settings/about", label: "Про нас", desc: "Цитата та бейджі довіри", icon: Info },
    { href: "/admin/settings/advantages", label: "Переваги", desc: "4 картки переваг на головній", icon: Sliders },
    { href: "/admin/services/ozone", label: "Послуги: Озонування", desc: "Типи послуг, фото, ціни", icon: Wrench },
    {
      href: "/admin/services/dry-cleaning",
      label: "Послуги: Хімчистка",
      desc: "Типи послуг, фото, ціни",
      icon: Wrench,
    },
  ];

  return (
    <div>
      <h1 className="font-display text-2xl text-ink">Дашборд</h1>
      <p className="mt-1 text-sm text-slate">Загальна кількість заявок по напрямках</p>

      <div className="mt-6 grid gap-5 sm:grid-cols-2">
        {leadCards.map((c) => (
          <Link key={c.href} href={c.href} className="group">
            <Card className="flex items-center justify-between p-6 transition-shadow group-hover:shadow-lg">
              <div className="flex items-center gap-4">
                <span className="flex h-12 w-12 items-center justify-center rounded-full bg-ink/5">
                  <c.icon className="h-5 w-5 text-ink" strokeWidth={1.5} />
                </span>
                <div>
                  <p className="flex items-center gap-2 font-display text-base text-ink">
                    {c.label}
                    <NavBadge count={c.newCount} />
                  </p>
                  <p className="text-sm text-slate">
                    {c.total} всього ·{" "}
                    {c.newCount > 0 ? (
                      <span className="font-bold text-red-600">{c.newCount} нових</span>
                    ) : (
                      "0 нових"
                    )}
                  </p>
                </div>
              </div>
              <ArrowRight className="h-4 w-4 text-slate transition-transform group-hover:translate-x-0.5" />
            </Card>
          </Link>
        ))}
      </div>

      <p className="mt-10 text-xs font-semibold uppercase tracking-widest text-slate/70">
        Управління сайтом
      </p>
      <div className="mt-3 grid gap-5 sm:grid-cols-3">
        {settingsCards.map((c) => (
          <Link key={c.href} href={c.href} className="group">
            <Card className="p-6 transition-shadow group-hover:shadow-lg">
              <CardContent className="flex flex-col gap-3 p-0">
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-gold/15">
                  <c.icon className="h-5 w-5 text-ink" strokeWidth={1.5} />
                </span>
                <div>
                  <p className="font-display text-base text-ink">{c.label}</p>
                  <p className="mt-1 text-sm text-slate">{c.desc}</p>
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}

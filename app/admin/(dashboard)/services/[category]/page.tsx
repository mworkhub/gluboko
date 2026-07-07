import Link from "next/link";
import { notFound } from "next/navigation";
import { Plus } from "lucide-react";
import { createAdminClient } from "@/lib/supabase/admin";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { DeleteServiceButton } from "@/components/admin/DeleteServiceButton";
import { CATEGORY_FROM_SEGMENT, CATEGORY_LABEL } from "@/lib/service-category";
import type { Service } from "@/lib/types";

export const dynamic = "force-dynamic";

export default async function AdminServicesListPage({
  params,
}: {
  params: Promise<{ category: string }>;
}) {
  const { category: segment } = await params;
  const category = CATEGORY_FROM_SEGMENT[segment];
  if (!category) notFound();

  const supabase = createAdminClient();
  const { data } = await supabase
    .from("services")
    .select("*")
    .eq("category", category)
    .order("sort_order", { ascending: true })
    .returns<Service[]>();

  const services = data ?? [];

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="font-display text-2xl text-ink">Послуги: {CATEGORY_LABEL[category]}</h1>
          <p className="mt-1 text-sm text-slate">Типи послуг, що показуються на публічній сторінці напрямку</p>
        </div>
        <Button asChild size="sm">
          <Link href={`/admin/services/${segment}/new`}>
            <Plus className="h-4 w-4" /> Додати послугу
          </Link>
        </Button>
      </div>

      {services.length === 0 ? (
        <div className="mt-8 rounded-2xl border border-dashed border-ink/15 bg-white/60 p-12 text-center text-sm text-slate">
          Поки що немає послуг у цій категорії.
        </div>
      ) : (
        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service) => (
            <Card key={service.id} className="flex flex-col overflow-hidden">
              {service.image_url && (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={service.image_url} alt="" className="h-36 w-full object-cover" />
              )}
              <div className="flex flex-1 flex-col gap-2 p-5">
                <div className="flex items-start justify-between gap-2">
                  <h3 className="font-display text-base text-ink">{service.title}</h3>
                  <DeleteServiceButton id={service.id} category={category} title={service.title} />
                </div>
                <p className="line-clamp-2 text-sm text-slate">{service.description}</p>
                <div className="mt-auto flex flex-wrap items-center gap-2 pt-2">
                  {service.price_from != null && <Badge variant="gold">від {service.price_from} грн</Badge>}
                  {service.meta && <Badge variant="default">{service.meta}</Badge>}
                </div>
                <Button asChild variant="outline" size="sm" className="mt-3 w-full">
                  <Link href={`/admin/services/${segment}/${service.id}`}>Редагувати</Link>
                </Button>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}

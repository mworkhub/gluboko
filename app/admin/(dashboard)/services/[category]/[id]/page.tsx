import { notFound } from "next/navigation";
import { createAdminClient } from "@/lib/supabase/admin";
import { ServiceForm } from "@/components/admin/ServiceForm";
import { CATEGORY_FROM_SEGMENT } from "@/lib/service-category";
import type { Service } from "@/lib/types";

export const dynamic = "force-dynamic";

export default async function EditServicePage({
  params,
}: {
  params: Promise<{ category: string; id: string }>;
}) {
  const { category: segment, id } = await params;
  const category = CATEGORY_FROM_SEGMENT[segment];
  if (!category) notFound();

  const supabase = createAdminClient();
  const { data: service } = await supabase
    .from("services")
    .select("*")
    .eq("id", id)
    .eq("category", category)
    .single<Service>();

  if (!service) notFound();

  return (
    <div>
      <h1 className="font-display text-2xl text-ink">Редагувати послугу</h1>
      <div className="mt-6">
        <ServiceForm category={category} service={service} />
      </div>
    </div>
  );
}

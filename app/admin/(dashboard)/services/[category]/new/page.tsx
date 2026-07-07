import { notFound } from "next/navigation";
import { ServiceForm } from "@/components/admin/ServiceForm";
import { CATEGORY_FROM_SEGMENT, CATEGORY_LABEL } from "@/lib/service-category";

export const dynamic = "force-dynamic";

export default async function NewServicePage({
  params,
}: {
  params: Promise<{ category: string }>;
}) {
  const { category: segment } = await params;
  const category = CATEGORY_FROM_SEGMENT[segment];
  if (!category) notFound();

  return (
    <div>
      <h1 className="font-display text-2xl text-ink">Нова послуга: {CATEGORY_LABEL[category]}</h1>
      <div className="mt-6">
        <ServiceForm category={category} />
      </div>
    </div>
  );
}

import { createAdminClient } from "@/lib/supabase/admin";
import { LeadsTable } from "@/components/admin/LeadsTable";
import type { Lead } from "@/lib/types";

export const dynamic = "force-dynamic";

export default async function AdminDryCleaningLeadsPage() {
  const supabase = createAdminClient();
  const { data } = await supabase
    .from("dry_cleaning_leads")
    .select("*")
    .order("created_at", { ascending: false })
    .returns<Lead[]>();

  return (
    <div>
      <h1 className="font-display text-2xl text-ink">Заявки: Хімчистка меблів</h1>
      <p className="mt-1 text-sm text-slate">Усі заявки з напрямку хімчистки меблів</p>
      <div className="mt-8">
        <LeadsTable category="dry_cleaning" leads={data ?? []} />
      </div>
    </div>
  );
}

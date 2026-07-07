import { createAdminClient } from "@/lib/supabase/admin";
import { LeadsTable } from "@/components/admin/LeadsTable";
import type { Lead } from "@/lib/types";

export const dynamic = "force-dynamic";

export default async function AdminOzoneLeadsPage() {
  const supabase = createAdminClient();
  const { data } = await supabase
    .from("ozone_leads")
    .select("*")
    .order("created_at", { ascending: false })
    .returns<Lead[]>();

  return (
    <div>
      <h1 className="font-display text-2xl text-ink">Заявки: Озонування</h1>
      <p className="mt-1 text-sm text-slate">Усі заявки з напрямку озонування</p>
      <div className="mt-8">
        <LeadsTable category="ozone" leads={data ?? []} />
      </div>
    </div>
  );
}

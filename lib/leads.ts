import { createAdminClient } from "@/lib/supabase/admin";

export type NewLeadCounts = { ozone: number; dry_cleaning: number };

export async function getNewLeadCounts(): Promise<NewLeadCounts> {
  const supabase = createAdminClient();

  const [ozone, dryCleaning] = await Promise.all([
    supabase.from("ozone_leads").select("id", { count: "exact", head: true }).eq("status", "new"),
    supabase.from("dry_cleaning_leads").select("id", { count: "exact", head: true }).eq("status", "new"),
  ]);

  return { ozone: ozone.count ?? 0, dry_cleaning: dryCleaning.count ?? 0 };
}

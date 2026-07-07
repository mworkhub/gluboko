import { createAdminClient } from "@/lib/supabase/admin";
import type { DbServiceCategory } from "@/lib/service-category";
import type { Service } from "@/lib/types";

export async function getServicesByCategory(category: DbServiceCategory): Promise<Service[]> {
  const supabase = createAdminClient();
  const { data } = await supabase
    .from("services")
    .select("*")
    .eq("category", category)
    .order("sort_order", { ascending: true })
    .returns<Service[]>();

  return data ?? [];
}

"use server";

import { revalidatePath } from "next/cache";
import { createAdminClient } from "@/lib/supabase/admin";
import { createClient as createServerAuthClient } from "@/lib/supabase/server";
import { leadFormSchema, normalizePhone, type LeadFormValues } from "@/lib/validation/lead";
import { CATEGORY_META, type ServiceCategory } from "@/content/services";
import { formatLeadTelegramMessage, sendTelegramMessage } from "@/lib/telegram";

const TABLE: Record<ServiceCategory, "ozone_leads" | "dry_cleaning_leads"> = {
  ozone: "ozone_leads",
  dry_cleaning: "dry_cleaning_leads",
};

const ADMIN_PATH: Record<ServiceCategory, string> = {
  ozone: "/admin/ozone",
  dry_cleaning: "/admin/dry-cleaning",
};

const MIN_FILL_TIME_MS = 1500;

export async function submitLead(
  category: ServiceCategory,
  values: LeadFormValues,
  sourcePage: string
): Promise<{ ok: true } | { ok: false; error: string }> {
  const parsed = leadFormSchema.safeParse(values);
  if (!parsed.success) {
    return { ok: false, error: "Перевірте правильність заповнення форми." };
  }

  const data = parsed.data;

  // Honeypot: bots fill every field, including the hidden one.
  if (data.company) {
    return { ok: true };
  }

  // Time-trap: a human can't submit a form faster than this.
  if (Date.now() - data.startedAt < MIN_FILL_TIME_MS) {
    return { ok: true };
  }

  const supabase = createAdminClient();
  const { error } = await supabase.from(TABLE[category]).insert({
    name: data.name,
    phone: normalizePhone(data.phone),
    comment: data.comment || null,
    service_type: data.serviceType || null,
    source_page: sourcePage,
  });

  if (error) {
    console.error("submitLead insert failed", error);
    return { ok: false, error: "Не вдалося надіслати заявку. Спробуйте ще раз або зателефонуйте нам." };
  }

  await sendTelegramMessage(
    formatLeadTelegramMessage({
      categoryLabel: CATEGORY_META[category].label,
      name: data.name,
      phone: normalizePhone(data.phone),
      comment: data.comment,
      serviceType: data.serviceType,
      sourcePage,
    })
  );

  revalidatePath(ADMIN_PATH[category]);
  return { ok: true };
}

export async function updateLeadStatus(
  category: ServiceCategory,
  id: string,
  status: "new" | "in_progress" | "done" | "rejected"
) {
  const auth = await createServerAuthClient();
  const {
    data: { user },
  } = await auth.auth.getUser();
  if (!user) {
    throw new Error("Unauthorized");
  }

  const supabase = createAdminClient();
  const { error } = await supabase
    .from(TABLE[category])
    .update({ status })
    .eq("id", id);

  if (error) {
    throw new Error(error.message);
  }

  revalidatePath(ADMIN_PATH[category]);
}

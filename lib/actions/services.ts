"use server";

import { revalidatePath } from "next/cache";
import { createAdminClient } from "@/lib/supabase/admin";
import { createClient as createServerAuthClient } from "@/lib/supabase/server";
import { serviceFormSchema } from "@/lib/validation/services";
import { SEGMENT_FROM_CATEGORY, type DbServiceCategory } from "@/lib/service-category";

export type ServiceActionState = { ok: boolean; error?: string };

async function requireAdmin() {
  const auth = await createServerAuthClient();
  const {
    data: { user },
  } = await auth.auth.getUser();
  if (!user) {
    throw new Error("Unauthorized");
  }
}

function revalidateServiceRoutes(category: DbServiceCategory) {
  revalidatePath(`/admin/services/${SEGMENT_FROM_CATEGORY[category]}`);
  revalidatePath("/");
  revalidatePath("/ozonuvannya");
  revalidatePath("/himchistka-mebliv");
}

// Signed upload URL so the browser can PUT the file straight to Supabase
// Storage, bypassing our own server entirely. Server Actions on Vercel cap
// request bodies at ~4.5mb regardless of the `bodySizeLimit` config (that
// setting only controls Next.js's own check, not Vercel's platform ceiling),
// so routing large photos through a Server Action silently fails past a few
// MB. This is the standard workaround: the action only hands out a
// short-lived signed URL, never touches the file bytes itself.
export async function getServiceImageUploadUrl(
  category: DbServiceCategory,
  slug: string,
  ext: string
): Promise<{ path: string; token: string; publicUrl: string }> {
  await requireAdmin();

  const supabase = createAdminClient();
  const safeExt = ext.replace(/[^a-z0-9]/gi, "").toLowerCase() || "jpg";
  const path = `services/${category}/${slug}-${Date.now()}.${safeExt}`;

  const { data, error } = await supabase.storage.from("images").createSignedUploadUrl(path);
  if (error) {
    throw new Error(`Не вдалося підготувати завантаження: ${error.message}`);
  }

  const { data: publicUrlData } = supabase.storage.from("images").getPublicUrl(path);
  return { path, token: data.token, publicUrl: publicUrlData.publicUrl };
}

export async function createService(
  _prevState: ServiceActionState,
  formData: FormData
): Promise<ServiceActionState> {
  await requireAdmin();

  const parsed = serviceFormSchema.safeParse(Object.fromEntries(formData));
  if (!parsed.success) {
    return { ok: false, error: parsed.error.issues[0]?.message ?? "Перевірте поля форми." };
  }
  const data = parsed.data;

  const image_url = formData.get("image_url");
  if (typeof image_url !== "string" || !image_url) {
    return { ok: false, error: "Додайте фото послуги." };
  }

  const supabase = createAdminClient();
  const { error } = await supabase.from("services").insert({ ...data, image_url });
  if (error) {
    return {
      ok: false,
      error: error.code === "23505" ? "Послуга з таким slug вже існує в цій категорії." : error.message,
    };
  }

  revalidateServiceRoutes(data.category);
  return { ok: true };
}

export async function updateService(
  id: string,
  _prevState: ServiceActionState,
  formData: FormData
): Promise<ServiceActionState> {
  await requireAdmin();

  const parsed = serviceFormSchema.safeParse(Object.fromEntries(formData));
  if (!parsed.success) {
    return { ok: false, error: parsed.error.issues[0]?.message ?? "Перевірте поля форми." };
  }
  const data = parsed.data;

  const update: Record<string, unknown> = { ...data };
  const image_url = formData.get("image_url");
  if (typeof image_url === "string" && image_url) {
    update.image_url = image_url;
  }

  const supabase = createAdminClient();
  const { error } = await supabase.from("services").update(update).eq("id", id);
  if (error) {
    return {
      ok: false,
      error: error.code === "23505" ? "Послуга з таким slug вже існує в цій категорії." : error.message,
    };
  }

  revalidateServiceRoutes(data.category);
  revalidatePath(`/admin/services/${SEGMENT_FROM_CATEGORY[data.category]}/${id}`);
  return { ok: true };
}

export async function deleteService(id: string, category: DbServiceCategory) {
  await requireAdmin();

  const supabase = createAdminClient();
  const { error } = await supabase.from("services").delete().eq("id", id);
  if (error) {
    throw new Error(error.message);
  }

  revalidateServiceRoutes(category);
}

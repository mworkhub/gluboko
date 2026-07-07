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

async function uploadServiceImage(
  file: File,
  category: DbServiceCategory,
  slug: string
): Promise<string> {
  const supabase = createAdminClient();
  const ext = file.name.split(".").pop()?.toLowerCase() || "jpg";
  const path = `services/${category}/${slug}-${Date.now()}.${ext}`;

  const { error } = await supabase.storage.from("images").upload(path, file, {
    contentType: file.type || "image/jpeg",
    upsert: true,
  });
  if (error) {
    throw new Error(`Не вдалося завантажити фото: ${error.message}`);
  }

  const { data } = supabase.storage.from("images").getPublicUrl(path);
  return data.publicUrl;
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

  const file = formData.get("image");
  if (!(file instanceof File) || file.size === 0) {
    return { ok: false, error: "Додайте фото послуги." };
  }

  let image_url: string;
  try {
    image_url = await uploadServiceImage(file, data.category, data.slug);
  } catch (err) {
    return { ok: false, error: err instanceof Error ? err.message : "Не вдалося завантажити фото." };
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
  const file = formData.get("image");
  if (file instanceof File && file.size > 0) {
    try {
      update.image_url = await uploadServiceImage(file, data.category, data.slug);
    } catch (err) {
      return { ok: false, error: err instanceof Error ? err.message : "Не вдалося завантажити фото." };
    }
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

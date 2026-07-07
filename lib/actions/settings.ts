"use server";

import { revalidatePath } from "next/cache";
import { createAdminClient } from "@/lib/supabase/admin";
import { createClient as createServerAuthClient } from "@/lib/supabase/server";
import type { AboutSettings, AdvantagesSettings, ContactSettings } from "@/lib/types";

async function requireAdmin() {
  const auth = await createServerAuthClient();
  const {
    data: { user },
  } = await auth.auth.getUser();
  if (!user) {
    throw new Error("Unauthorized");
  }
}

async function updateSiteSetting(key: string, value: unknown) {
  await requireAdmin();

  const supabase = createAdminClient();
  const { error } = await supabase.from("site_settings").update({ value }).eq("key", key);
  if (error) {
    throw new Error(error.message);
  }

  // Contact/about/advantages content appears across the public site
  // (homepage sections + the shared contact footer bar), so revalidate
  // every public route rather than trying to track exactly which one
  // reads which key.
  revalidatePath("/");
  revalidatePath("/ozonuvannya");
  revalidatePath("/himchistka-mebliv");
  revalidatePath(`/admin/settings/${key}`);
}

export async function updateContactSettings(data: ContactSettings) {
  await updateSiteSetting("contact", data);
}

export async function updateAboutSettings(data: AboutSettings) {
  await updateSiteSetting("about", data);
}

export async function updateAdvantagesSettings(data: AdvantagesSettings) {
  await updateSiteSetting("advantages", data);
}

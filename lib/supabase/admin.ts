import { createClient as createSupabaseClient } from "@supabase/supabase-js";

/**
 * Service-role client — server-only, bypasses RLS. Used for lead inserts
 * from public forms and for admin dashboard reads/updates (the admin route
 * is already gated by middleware + Supabase Auth, so no RLS policy is
 * needed on top of it). Never import this file from client components.
 */
export function createAdminClient() {
  return createSupabaseClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    { auth: { autoRefreshToken: false, persistSession: false } }
  );
}

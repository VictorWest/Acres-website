import "server-only";
import { createClient } from "@supabase/supabase-js";

/**
 * Server-only Supabase client using the service_role key.
 * Bypasses Row Level Security — never import this from a Client Component
 * or expose its output directly to the browser without filtering.
 *
 * Used by API routes and the admin dashboard (both server-side) to read/write
 * registrant data, since the tables have no RLS policies for the anon key.
 */
export function createAdminClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!url || !serviceRoleKey) {
    throw new Error(
      "Missing NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY. Check .env.local against .env.example."
    );
  }

  return createClient(url, serviceRoleKey, {
    auth: { autoRefreshToken: false, persistSession: false },
  });
}

import "server-only";
import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";

/**
 * Auth-aware Supabase client for Server Components / Route Handlers, using the
 * public anon key + the request's cookies. Used for admin login session checks —
 * NOT for reading registrant data (which has no anon-key RLS policy; use
 * createAdminClient for that).
 */
export async function createServerSupabaseClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!url || !anonKey) {
    throw new Error(
      "Missing NEXT_PUBLIC_SUPABASE_URL or NEXT_PUBLIC_SUPABASE_ANON_KEY. Check .env.local against .env.example."
    );
  }

  const cookieStore = await cookies();

  return createServerClient(url, anonKey, {
    cookies: {
      getAll() {
        return cookieStore.getAll();
      },
      setAll(cookiesToSet) {
        try {
          cookiesToSet.forEach(({ name, value, options }) =>
            cookieStore.set(name, value, options)
          );
        } catch {
          // setAll called from a Server Component with no writable response —
          // safe to ignore as long as middleware also refreshes the session.
        }
      },
    },
  });
}

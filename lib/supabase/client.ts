import { createBrowserClient } from "@supabase/ssr";

/**
 * Browser Supabase client (anon key), used by the admin login form to call
 * supabase.auth.signInWithPassword / signOut.
 */
export function createBrowserSupabaseClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!url || !anonKey) {
    throw new Error(
      "Missing NEXT_PUBLIC_SUPABASE_URL or NEXT_PUBLIC_SUPABASE_ANON_KEY. Check .env.local against .env.example."
    );
  }

  return createBrowserClient(url, anonKey);
}

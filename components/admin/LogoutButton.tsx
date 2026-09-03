"use client";

import { useRouter } from "next/navigation";
import { createBrowserSupabaseClient } from "@/lib/supabase/client";
import { Button } from "@/components/ui/button";

export function LogoutButton() {
  const router = useRouter();
  return (
    <Button
      variant="outline"
      size="sm"
      onClick={async () => {
        const supabase = createBrowserSupabaseClient();
        await supabase.auth.signOut();
        router.push("/admin/login");
        router.refresh();
      }}
    >
      Sign out
    </Button>
  );
}

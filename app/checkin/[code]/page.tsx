import { createAdminClient } from "@/lib/supabase/admin";
import { CheckInPanel } from "@/components/checkin/CheckInPanel";
import { Card, CardContent } from "@/components/ui/card";

export const dynamic = "force-dynamic";

export default async function CheckInPage({
  params,
}: {
  params: Promise<{ code: string }>;
}) {
  const { code } = await params;
  const supabase = createAdminClient();

  const { data: attendee } = await supabase
    .from("attendees")
    .select("full_name, checked_in_at")
    .eq("unique_code", code)
    .maybeSingle();

  return (
    <main className="flex min-h-screen items-center justify-center bg-background p-6">
      <Card className="w-full max-w-sm">
        <CardContent className="flex flex-col items-center gap-4 py-6">
          <p className="text-xs font-semibold tracking-widest text-muted-foreground uppercase">
            ACRES 2026 · Gate check-in
          </p>
          {attendee ? (
            <CheckInPanel
              code={code}
              fullName={attendee.full_name}
              alreadyCheckedIn={Boolean(attendee.checked_in_at)}
            />
          ) : (
            <p className="text-destructive font-medium">
              This code was not found. Please check with the registration desk.
            </p>
          )}
        </CardContent>
      </Card>
    </main>
  );
}

import { NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase/admin";

export async function POST(
  _request: Request,
  { params }: { params: Promise<{ code: string }> }
) {
  const { code } = await params;
  const supabase = createAdminClient();

  const { data: attendee, error: lookupError } = await supabase
    .from("attendees")
    .select("id, full_name, checked_in_at")
    .eq("unique_code", code)
    .maybeSingle();

  if (lookupError || !attendee) {
    return NextResponse.json({ ok: false, error: "Code not found" }, { status: 404 });
  }

  if (attendee.checked_in_at) {
    return NextResponse.json({
      ok: true,
      alreadyCheckedIn: true,
      fullName: attendee.full_name,
      checkedInAt: attendee.checked_in_at,
    });
  }

  const checkedInAt = new Date().toISOString();
  const { error: updateError } = await supabase
    .from("attendees")
    .update({ checked_in_at: checkedInAt })
    .eq("id", attendee.id);

  if (updateError) {
    return NextResponse.json(
      { ok: false, error: "Could not confirm check-in" },
      { status: 500 }
    );
  }

  return NextResponse.json({
    ok: true,
    alreadyCheckedIn: false,
    fullName: attendee.full_name,
    checkedInAt,
  });
}

import { NextResponse } from "next/server";
import { vendorSchema } from "@/lib/validations";
import { createAdminClient } from "@/lib/supabase/admin";

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  const parsed = vendorSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { ok: false, error: parsed.error.issues[0]?.message ?? "Invalid input" },
      { status: 400 }
    );
  }
  const data = parsed.data;

  const supabase = createAdminClient();
  const { error } = await supabase.from("vendors").insert({
    business_name: data.businessName,
    items_sold: data.itemsSold,
    other_items: data.otherItems || null,
    contact_person: data.contactPerson,
    phone: data.phone,
    email: data.email,
    space_requirement: data.spaceRequirement || null,
    food_safety_permit: data.foodSafetyPermit || null,
    availability: data.availability || null,
  });

  if (error) {
    console.error("vendor insert failed", error);
    return NextResponse.json(
      { ok: false, error: "Could not save your registration. Please try again." },
      { status: 500 }
    );
  }

  return NextResponse.json({ ok: true });
}

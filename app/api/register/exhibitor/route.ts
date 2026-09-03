import { NextResponse } from "next/server";
import { exhibitorSchema } from "@/lib/validations";
import { createAdminClient } from "@/lib/supabase/admin";

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  const parsed = exhibitorSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { ok: false, error: parsed.error.issues[0]?.message ?? "Invalid input" },
      { status: 400 }
    );
  }
  const data = parsed.data;

  const supabase = createAdminClient();
  const { error } = await supabase.from("exhibitors").insert({
    company_name: data.companyName,
    nature_of_business: data.natureOfBusiness || null,
    contact_person: data.contactPerson,
    contact_title: data.contactTitle || null,
    email: data.email,
    phone: data.phone,
    company_address: data.companyAddress || null,
    products_services: data.productsServices || null,
    booth_tier: data.boothTier,
    sponsorship_tier: data.sponsorshipTier || null,
    representatives_count: data.representativesCount ?? null,
    special_requirements: data.specialRequirements || null,
  });

  if (error) {
    console.error("exhibitor insert failed", error);
    return NextResponse.json(
      { ok: false, error: "Could not save your registration. Please try again." },
      { status: 500 }
    );
  }

  return NextResponse.json({ ok: true });
}

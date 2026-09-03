import { NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase/admin";

const TABLES = {
  attendees: {
    table: "attendees",
    columns: ["full_name", "email", "phone", "country_city", "referral_source", "unique_code", "checked_in_at", "created_at"],
  },
  exhibitors: {
    table: "exhibitors",
    columns: [
      "company_name", "nature_of_business", "contact_person", "contact_title", "email", "phone",
      "company_address", "products_services", "booth_tier", "sponsorship_tier",
      "representatives_count", "special_requirements", "created_at",
    ],
  },
  vendors: {
    table: "vendors",
    columns: [
      "business_name", "items_sold", "other_items", "contact_person", "phone", "email",
      "space_requirement", "food_safety_permit", "availability", "created_at",
    ],
  },
} as const;

type ExportType = keyof typeof TABLES;

function toCsvValue(value: unknown): string {
  if (value === null || value === undefined) return "";
  const str = Array.isArray(value) ? value.join("; ") : String(value);
  if (/[",\n]/.test(str)) return `"${str.replace(/"/g, '""')}"`;
  return str;
}

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ type: string }> }
) {
  const { type } = await params;
  if (!(type in TABLES)) {
    return NextResponse.json({ ok: false, error: "Unknown export type" }, { status: 400 });
  }
  const { table, columns } = TABLES[type as ExportType];

  const supabase = createAdminClient();
  const { data, error } = await supabase
    .from(table)
    .select(columns.join(","))
    .order("created_at", { ascending: false });

  if (error) {
    return NextResponse.json({ ok: false, error: "Export failed" }, { status: 500 });
  }

  const rows = (data ?? []) as unknown as Record<string, unknown>[];
  const header = columns.join(",");
  const body = rows
    .map((row) => columns.map((col) => toCsvValue(row[col])).join(","))
    .join("\n");
  const csv = `${header}\n${body}`;

  return new NextResponse(csv, {
    headers: {
      "Content-Type": "text/csv; charset=utf-8",
      "Content-Disposition": `attachment; filename="acres-${type}.csv"`,
    },
  });
}

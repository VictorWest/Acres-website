import Link from "next/link";
import { createAdminClient } from "@/lib/supabase/admin";
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

// Auth-gated, always-fresh data — never prerender at build time.
export const dynamic = "force-dynamic";

async function getCounts() {
  const supabase = createAdminClient();
  const [attendees, exhibitors, vendors, checkedIn] = await Promise.all([
    supabase.from("attendees").select("*", { count: "exact", head: true }),
    supabase.from("exhibitors").select("*", { count: "exact", head: true }),
    supabase.from("vendors").select("*", { count: "exact", head: true }),
    supabase
      .from("attendees")
      .select("*", { count: "exact", head: true })
      .not("checked_in_at", "is", null),
  ]);
  return {
    attendees: attendees.count ?? 0,
    exhibitors: exhibitors.count ?? 0,
    vendors: vendors.count ?? 0,
    checkedIn: checkedIn.count ?? 0,
  };
}

export default async function AdminOverviewPage() {
  const counts = await getCounts();

  const cards = [
    { href: "/admin/attendees", label: "Attendees", value: counts.attendees },
    { href: "/admin/attendees", label: "Checked in", value: counts.checkedIn },
    { href: "/admin/exhibitors", label: "Exhibitors", value: counts.exhibitors },
    { href: "/admin/vendors", label: "Vendors", value: counts.vendors },
  ];

  return (
    <div>
      <h1 className="text-2xl font-bold">Overview</h1>
      <p className="mt-1 text-sm text-muted-foreground">
        Live registration counts for ACRES 2026.
      </p>
      <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-4">
        {cards.map((c) => (
          <Link key={c.label} href={c.href}>
            <Card className="transition-colors hover:bg-accent">
              <CardHeader>
                <CardDescription>{c.label}</CardDescription>
                <CardTitle className="text-3xl">{c.value}</CardTitle>
              </CardHeader>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}

import { createAdminClient } from "@/lib/supabase/admin";
import { ExportLink } from "@/components/admin/ExportLink";

export const dynamic = "force-dynamic";

export default async function AdminExhibitorsPage() {
  const supabase = createAdminClient();
  const { data: exhibitors } = await supabase
    .from("exhibitors")
    .select("company_name, contact_person, email, phone, booth_tier, sponsorship_tier, representatives_count, created_at")
    .order("created_at", { ascending: false });

  return (
    <div>
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Exhibitors</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            {exhibitors?.length ?? 0} registered
          </p>
        </div>
        <ExportLink type="exhibitors" />
      </div>

      <div className="mt-6 overflow-x-auto rounded-lg border">
        <table className="w-full text-sm">
          <thead className="border-b bg-muted/40 text-left">
            <tr>
              <th className="px-4 py-2 font-medium">Company</th>
              <th className="px-4 py-2 font-medium">Contact</th>
              <th className="px-4 py-2 font-medium">Email</th>
              <th className="px-4 py-2 font-medium">Phone</th>
              <th className="px-4 py-2 font-medium">Booth</th>
              <th className="px-4 py-2 font-medium">Sponsorship</th>
              <th className="px-4 py-2 font-medium">Reps</th>
              <th className="px-4 py-2 font-medium">Registered</th>
            </tr>
          </thead>
          <tbody>
            {(exhibitors ?? []).map((e, i) => (
              <tr key={i} className="border-b last:border-0">
                <td className="px-4 py-2">{e.company_name}</td>
                <td className="px-4 py-2">{e.contact_person}</td>
                <td className="px-4 py-2">{e.email}</td>
                <td className="px-4 py-2">{e.phone}</td>
                <td className="px-4 py-2">{e.booth_tier}</td>
                <td className="px-4 py-2">{e.sponsorship_tier || "—"}</td>
                <td className="px-4 py-2">{e.representatives_count ?? "—"}</td>
                <td className="px-4 py-2 text-muted-foreground">
                  {new Date(e.created_at).toLocaleString()}
                </td>
              </tr>
            ))}
            {(!exhibitors || exhibitors.length === 0) && (
              <tr>
                <td colSpan={8} className="px-4 py-8 text-center text-muted-foreground">
                  No exhibitors yet.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

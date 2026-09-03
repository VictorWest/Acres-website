import { createAdminClient } from "@/lib/supabase/admin";
import { ExportLink } from "@/components/admin/ExportLink";

export const dynamic = "force-dynamic";

export default async function AdminVendorsPage() {
  const supabase = createAdminClient();
  const { data: vendors } = await supabase
    .from("vendors")
    .select("business_name, items_sold, contact_person, phone, email, space_requirement, created_at")
    .order("created_at", { ascending: false });

  return (
    <div>
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Vendors</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            {vendors?.length ?? 0} registered
          </p>
        </div>
        <ExportLink type="vendors" />
      </div>

      <div className="mt-6 overflow-x-auto rounded-lg border">
        <table className="w-full text-sm">
          <thead className="border-b bg-muted/40 text-left">
            <tr>
              <th className="px-4 py-2 font-medium">Business</th>
              <th className="px-4 py-2 font-medium">Selling</th>
              <th className="px-4 py-2 font-medium">Contact</th>
              <th className="px-4 py-2 font-medium">Phone</th>
              <th className="px-4 py-2 font-medium">Email</th>
              <th className="px-4 py-2 font-medium">Space</th>
              <th className="px-4 py-2 font-medium">Registered</th>
            </tr>
          </thead>
          <tbody>
            {(vendors ?? []).map((v, i) => (
              <tr key={i} className="border-b last:border-0">
                <td className="px-4 py-2">{v.business_name}</td>
                <td className="px-4 py-2">{(v.items_sold ?? []).join(", ")}</td>
                <td className="px-4 py-2">{v.contact_person}</td>
                <td className="px-4 py-2">{v.phone}</td>
                <td className="px-4 py-2">{v.email}</td>
                <td className="px-4 py-2">{v.space_requirement || "—"}</td>
                <td className="px-4 py-2 text-muted-foreground">
                  {new Date(v.created_at).toLocaleString()}
                </td>
              </tr>
            ))}
            {(!vendors || vendors.length === 0) && (
              <tr>
                <td colSpan={7} className="px-4 py-8 text-center text-muted-foreground">
                  No vendors yet.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

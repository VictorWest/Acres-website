import { createAdminClient } from "@/lib/supabase/admin";
import { ExportLink } from "@/components/admin/ExportLink";

export const dynamic = "force-dynamic";

export default async function AdminAttendeesPage() {
  const supabase = createAdminClient();
  const { data: attendees } = await supabase
    .from("attendees")
    .select("full_name, email, phone, country_city, unique_code, checked_in_at, created_at")
    .order("created_at", { ascending: false });

  return (
    <div>
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Attendees</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            {attendees?.length ?? 0} registered
          </p>
        </div>
        <ExportLink type="attendees" />
      </div>

      <div className="mt-6 overflow-x-auto rounded-lg border">
        <table className="w-full text-sm">
          <thead className="border-b bg-muted/40 text-left">
            <tr>
              <th className="px-4 py-2 font-medium">Name</th>
              <th className="px-4 py-2 font-medium">Email</th>
              <th className="px-4 py-2 font-medium">Phone</th>
              <th className="px-4 py-2 font-medium">Code</th>
              <th className="px-4 py-2 font-medium">Checked in</th>
              <th className="px-4 py-2 font-medium">Registered</th>
            </tr>
          </thead>
          <tbody>
            {(attendees ?? []).map((a) => (
              <tr key={a.unique_code} className="border-b last:border-0">
                <td className="px-4 py-2">{a.full_name}</td>
                <td className="px-4 py-2">{a.email}</td>
                <td className="px-4 py-2">{a.phone}</td>
                <td className="px-4 py-2 font-mono text-xs">{a.unique_code}</td>
                <td className="px-4 py-2">
                  {a.checked_in_at ? (
                    <span className="text-green-600">Yes</span>
                  ) : (
                    <span className="text-muted-foreground">No</span>
                  )}
                </td>
                <td className="px-4 py-2 text-muted-foreground">
                  {new Date(a.created_at).toLocaleString()}
                </td>
              </tr>
            ))}
            {(!attendees || attendees.length === 0) && (
              <tr>
                <td colSpan={6} className="px-4 py-8 text-center text-muted-foreground">
                  No attendees yet.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

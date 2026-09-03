import Link from "next/link";
import { LogoutButton } from "@/components/admin/LogoutButton";

const links = [
  { href: "/admin", label: "Overview" },
  { href: "/admin/attendees", label: "Attendees" },
  { href: "/admin/exhibitors", label: "Exhibitors" },
  { href: "/admin/vendors", label: "Vendors" },
];

export default function AdminDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-background">
      <header className="border-b">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <div className="flex items-center gap-6">
            <span className="font-bold">ACRES Admin</span>
            <nav className="flex gap-4 text-sm text-muted-foreground">
              {links.map((l) => (
                <Link key={l.href} href={l.href} className="hover:text-foreground">
                  {l.label}
                </Link>
              ))}
            </nav>
          </div>
          <LogoutButton />
        </div>
      </header>
      <main className="mx-auto max-w-6xl px-6 py-10">{children}</main>
    </div>
  );
}

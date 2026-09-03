import { Download } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function ExportLink({ type }: { type: "attendees" | "exhibitors" | "vendors" }) {
  return (
    <a
      href={`/api/admin/export/${type}`}
      className={cn(buttonVariants({ variant: "outline", size: "sm" }))}
    >
      <Download />
      Export CSV
    </a>
  );
}

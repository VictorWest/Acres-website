import type { Metadata } from "next";
import { FormShell } from "@/components/forms/FormShell";
import { VendorForm } from "@/components/forms/VendorForm";

export const metadata: Metadata = {
  title: "Vendor Registration | ACRES 2026",
};

export default function VendorRegistrationPage() {
  return (
    <FormShell
      title="On-Site Vendor Registration"
      description="Food, Snacks & Refreshments · 12–14 November 2026 · Port Harcourt"
    >
      <VendorForm />
    </FormShell>
  );
}

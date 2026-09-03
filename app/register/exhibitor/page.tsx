import type { Metadata } from "next";
import { FormShell } from "@/components/forms/FormShell";
import { ExhibitorForm } from "@/components/forms/ExhibitorForm";

export const metadata: Metadata = {
  title: "Exhibitor Registration | ACRES 2026",
};

export default function ExhibitorRegistrationPage() {
  return (
    <FormShell
      title="Exhibitor Registration"
      description="12–14 November 2026 · Obi Wali International Conference Centre, Port Harcourt"
    >
      <ExhibitorForm />
    </FormShell>
  );
}

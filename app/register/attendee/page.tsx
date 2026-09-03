import type { Metadata } from "next";
import { FormShell } from "@/components/forms/FormShell";
import { AttendeeForm } from "@/components/forms/AttendeeForm";

export const metadata: Metadata = {
  title: "Attendee Registration | ACRES 2026",
};

export default function AttendeeRegistrationPage() {
  return (
    <FormShell
      title="Attendee / Delegate Registration"
      description="12–14 November 2026 · Obi Wali International Conference Centre, Port Harcourt"
    >
      <AttendeeForm />
    </FormShell>
  );
}

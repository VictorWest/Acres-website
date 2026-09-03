"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { CheckCircle2, Loader2 } from "lucide-react";

export function CheckInPanel({
  code,
  fullName,
  alreadyCheckedIn,
}: {
  code: string;
  fullName: string;
  alreadyCheckedIn: boolean;
}) {
  const [status, setStatus] = useState<"idle" | "loading" | "done">(
    alreadyCheckedIn ? "done" : "idle"
  );
  const [error, setError] = useState<string | null>(null);

  async function confirm() {
    setStatus("loading");
    setError(null);
    try {
      const res = await fetch(`/api/checkin/${code}`, { method: "POST" });
      const json = await res.json();
      if (!res.ok || !json.ok) {
        throw new Error(json.error ?? "Check-in failed");
      }
      setStatus("done");
    } catch (e) {
      setError(e instanceof Error ? e.message : "Something went wrong");
      setStatus("idle");
    }
  }

  if (status === "done") {
    return (
      <div className="flex flex-col items-center gap-3 text-center">
        <CheckCircle2 className="size-12 text-green-600" />
        <p className="text-lg font-semibold">{fullName} — checked in</p>
        {alreadyCheckedIn && (
          <p className="text-sm text-muted-foreground">
            (was already checked in before this scan)
          </p>
        )}
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center gap-4 text-center">
      <p className="text-lg font-semibold">{fullName}</p>
      <Button onClick={confirm} disabled={status === "loading"} size="lg">
        {status === "loading" && <Loader2 className="animate-spin" />}
        Confirm check-in
      </Button>
      {error && <p className="text-sm text-destructive">{error}</p>}
    </div>
  );
}

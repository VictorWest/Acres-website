"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";

import { attendeeSchema, type AttendeeInput } from "@/lib/validations";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { FieldError, SuccessNotice } from "@/components/forms/FormShell";

export function AttendeeForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<AttendeeInput>({ resolver: zodResolver(attendeeSchema) });
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [success, setSuccess] = useState<{ emailSent: boolean } | null>(null);

  async function onSubmit(values: AttendeeInput) {
    setSubmitError(null);
    try {
      const res = await fetch("/api/register/attendee", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
      const json = await res.json();
      if (!res.ok || !json.ok) {
        throw new Error(json.error ?? "Registration failed");
      }
      setSuccess({ emailSent: json.emailSent });
    } catch (e) {
      setSubmitError(e instanceof Error ? e.message : "Something went wrong");
    }
  }

  if (success) {
    return (
      <SuccessNotice heading="You're registered for ACRES 2026!">
        {success.emailSent ? (
          <>
            A confirmation email with your entry QR code and unique code is on
            its way to your inbox. Bring it to the gate for entry.
          </>
        ) : (
          <>
            Your registration was saved, but the confirmation email couldn&apos;t
            be sent right now. Please contact the organizers to confirm your
            entry code.
          </>
        )}
      </SuccessNotice>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5">
      <div>
        <Label htmlFor="fullName">Full Name</Label>
        <Input id="fullName" className="mt-1.5" {...register("fullName")} />
        <FieldError message={errors.fullName?.message} />
      </div>

      <div>
        <Label htmlFor="email">Email Address</Label>
        <Input id="email" type="email" className="mt-1.5" {...register("email")} />
        <FieldError message={errors.email?.message} />
      </div>

      <div>
        <Label htmlFor="phone">Phone Number</Label>
        <Input id="phone" type="tel" className="mt-1.5" {...register("phone")} />
        <FieldError message={errors.phone?.message} />
      </div>

      <div>
        <Label htmlFor="countryCity">Country / City</Label>
        <Input id="countryCity" className="mt-1.5" {...register("countryCity")} />
      </div>

      <div>
        <Label htmlFor="referralSource">How did you hear about ACRES?</Label>
        <Input id="referralSource" className="mt-1.5" {...register("referralSource")} />
      </div>

      <p className="text-xs text-muted-foreground">
        Attendee passes grant access to the exhibition floor and general summit
        sessions. Gala/Awards Night access is by separate invitation or ticket.
      </p>

      {submitError && <FieldError message={submitError} />}

      <Button type="submit" disabled={isSubmitting} size="lg" className="mt-2">
        {isSubmitting && <Loader2 className="animate-spin" />}
        Register
      </Button>
    </form>
  );
}

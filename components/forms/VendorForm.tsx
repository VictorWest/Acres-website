"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";

import { VENDOR_ITEMS, vendorSchema, type VendorInput } from "@/lib/validations";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { FieldError, SuccessNotice } from "@/components/forms/FormShell";
import { PaymentInfoBlock } from "@/components/forms/PaymentInfoBlock";

export function VendorForm() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<VendorInput>({
    resolver: zodResolver(vendorSchema),
    defaultValues: { itemsSold: [] },
  });
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const itemsSold = watch("itemsSold") ?? [];

  async function onSubmit(values: VendorInput) {
    setSubmitError(null);
    try {
      const res = await fetch("/api/register/vendor", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
      const json = await res.json();
      if (!res.ok || !json.ok) throw new Error(json.error ?? "Registration failed");
      setSuccess(true);
    } catch (e) {
      setSubmitError(e instanceof Error ? e.message : "Something went wrong");
    }
  }

  if (success) {
    return (
      <SuccessNotice heading="Vendor registration received">
        The ACRES team will assign your selling spot and reach out to confirm
        details ahead of 12–14 Nov 2026.
      </SuccessNotice>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5">
      <div>
        <Label>What will you be selling?</Label>
        <div className="mt-2 flex flex-col gap-2">
          {VENDOR_ITEMS.map((item) => (
            <label key={item} className="flex items-center gap-2 text-sm">
              <input
                type="checkbox"
                value={item}
                className="size-4 rounded border-input accent-primary"
                {...register("itemsSold")}
              />
              {item}
            </label>
          ))}
        </div>
        <FieldError message={errors.itemsSold?.message} />
      </div>

      {itemsSold.includes("Other") && (
        <div>
          <Label htmlFor="otherItems">Other Item(s) Being Sold</Label>
          <Input id="otherItems" className="mt-1.5" {...register("otherItems")} />
        </div>
      )}

      <div>
        <Label htmlFor="businessName">Vendor / Business Name</Label>
        <Input id="businessName" className="mt-1.5" {...register("businessName")} />
        <FieldError message={errors.businessName?.message} />
      </div>

      <div>
        <Label htmlFor="contactPerson">Contact Person</Label>
        <Input id="contactPerson" className="mt-1.5" {...register("contactPerson")} />
        <FieldError message={errors.contactPerson?.message} />
      </div>

      <div>
        <Label htmlFor="phone">Phone Number</Label>
        <Input id="phone" type="tel" className="mt-1.5" {...register("phone")} />
        <FieldError message={errors.phone?.message} />
      </div>

      <div>
        <Label htmlFor="email">Email Address</Label>
        <Input id="email" type="email" className="mt-1.5" {...register("email")} />
        <FieldError message={errors.email?.message} />
      </div>

      <div>
        <Label htmlFor="spaceRequirement">Space / Stall Requirement (e.g. table, canopy)</Label>
        <Input id="spaceRequirement" className="mt-1.5" {...register("spaceRequirement")} />
      </div>

      <div>
        <Label htmlFor="foodSafetyPermit">Health / Food Safety Permit (if applicable)</Label>
        <Input id="foodSafetyPermit" className="mt-1.5" {...register("foodSafetyPermit")} />
      </div>

      <div>
        <Label htmlFor="availability">Availability for 12–14 Nov 2026</Label>
        <Textarea id="availability" className="mt-1.5" {...register("availability")} />
      </div>

      <PaymentInfoBlock />

      <p className="text-xs text-muted-foreground">
        On-site vendors are assigned a fixed selling spot around the venue
        perimeter and must keep to the space allocated by the ACRES team.
      </p>

      {submitError && <FieldError message={submitError} />}

      <Button type="submit" disabled={isSubmitting} size="lg" className="mt-2">
        {isSubmitting && <Loader2 className="animate-spin" />}
        Submit Vendor Registration
      </Button>
    </form>
  );
}

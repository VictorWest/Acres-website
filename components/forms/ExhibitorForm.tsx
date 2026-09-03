"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";

import { BOOTH_TIERS, exhibitorSchema, type ExhibitorInput } from "@/lib/validations";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { FieldError, SuccessNotice } from "@/components/forms/FormShell";

const BOOTH_DESCRIPTIONS: Record<(typeof BOOTH_TIERS)[number], string> = {
  Bronze: "7ft × 6ft × 10ft — header branding, TV screen, reception counter, 2 spotlights, 1 chair, slat wall panel, carpet.",
  Gold: "7ft × 7ft × 10ft — adds gold-trim header branding, 2nd chair, brochure stand, 3 spotlights, decorative wall panel.",
  Diamond: "7ft × 9ft × 10ft — LED header branding, coffee table, brochure stand, 4 spotlights, gold-accent wall panel.",
  Platinum: "8ft × 10ft × 10ft — LED header branding, 3-seater sofa, 2 chairs, coffee table, brochure stand, 6 spotlights, premium gold-accent wall panel.",
};

export function ExhibitorForm() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<ExhibitorInput>({ resolver: zodResolver(exhibitorSchema) });
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const boothTier = watch("boothTier");

  async function onSubmit(values: ExhibitorInput) {
    setSubmitError(null);
    try {
      // valueAsNumber turns an empty optional field into NaN rather than
      // undefined — normalize before it hits the (strict) server-side schema.
      const payload = {
        ...values,
        representativesCount: Number.isNaN(values.representativesCount)
          ? undefined
          : values.representativesCount,
      };
      const res = await fetch("/api/register/exhibitor", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
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
      <SuccessNotice heading="Exhibitor registration received">
        A member of the ACRES team will confirm your booth location and reach
        out with next steps.
      </SuccessNotice>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5">
      <div>
        <Label htmlFor="companyName">Company Name</Label>
        <Input id="companyName" className="mt-1.5" {...register("companyName")} />
        <FieldError message={errors.companyName?.message} />
      </div>

      <div>
        <Label htmlFor="natureOfBusiness">Nature of Business</Label>
        <Input id="natureOfBusiness" className="mt-1.5" {...register("natureOfBusiness")} />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="contactPerson">Contact Person</Label>
          <Input id="contactPerson" className="mt-1.5" {...register("contactPerson")} />
          <FieldError message={errors.contactPerson?.message} />
        </div>
        <div>
          <Label htmlFor="contactTitle">Title</Label>
          <Input id="contactTitle" className="mt-1.5" {...register("contactTitle")} />
        </div>
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
        <Label htmlFor="companyAddress">Company Address</Label>
        <Input id="companyAddress" className="mt-1.5" {...register("companyAddress")} />
      </div>

      <div>
        <Label htmlFor="productsServices">Products / Services to be Exhibited</Label>
        <Textarea id="productsServices" className="mt-1.5" {...register("productsServices")} />
      </div>

      <div>
        <Label htmlFor="boothTier">Booth Selection</Label>
        <Select id="boothTier" className="mt-1.5" defaultValue="" {...register("boothTier")}>
          <option value="" disabled>
            Select a booth tier
          </option>
          {BOOTH_TIERS.map((tier) => (
            <option key={tier} value={tier}>
              {tier} Booth
            </option>
          ))}
        </Select>
        <FieldError message={errors.boothTier?.message} />
        {boothTier && (
          <p className="mt-1.5 text-xs text-muted-foreground">
            {BOOTH_DESCRIPTIONS[boothTier]}
          </p>
        )}
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="representativesCount">Number of Representatives</Label>
          <Input
            id="representativesCount"
            type="number"
            min={1}
            className="mt-1.5"
            {...register("representativesCount", { valueAsNumber: true })}
          />
        </div>
        <div>
          <Label htmlFor="sponsorshipTier">Sponsorship Tier (if applicable)</Label>
          <Input id="sponsorshipTier" className="mt-1.5" {...register("sponsorshipTier")} />
        </div>
      </div>

      <div>
        <Label htmlFor="specialRequirements">
          Special Requirements (electricity, internet, additional furniture, etc.)
        </Label>
        <Textarea id="specialRequirements" className="mt-1.5" {...register("specialRequirements")} />
      </div>

      <p className="text-xs text-muted-foreground">
        Exhibition space is allocated on a first-come, first-served basis within
        each booth tier. A member of the ACRES team will confirm your booth
        location.
      </p>

      {submitError && <FieldError message={submitError} />}

      <Button type="submit" disabled={isSubmitting} size="lg" className="mt-2">
        {isSubmitting && <Loader2 className="animate-spin" />}
        Submit Exhibitor Registration
      </Button>
    </form>
  );
}

import { z } from "zod";

export const attendeeSchema = z.object({
  fullName: z.string().trim().min(2, "Full name is required"),
  email: z.string().trim().email("Enter a valid email address"),
  phone: z.string().trim().min(7, "Enter a valid phone number"),
  countryCity: z.string().trim().optional().or(z.literal("")),
  referralSource: z.string().trim().optional().or(z.literal("")),
});
export type AttendeeInput = z.infer<typeof attendeeSchema>;

export const BOOTH_TIERS = ["Bronze", "Gold", "Diamond", "Platinum"] as const;

export const exhibitorSchema = z.object({
  companyName: z.string().trim().min(2, "Company name is required"),
  natureOfBusiness: z.string().trim().optional().or(z.literal("")),
  contactPerson: z.string().trim().min(2, "Contact person is required"),
  contactTitle: z.string().trim().optional().or(z.literal("")),
  email: z.string().trim().email("Enter a valid email address"),
  phone: z.string().trim().min(7, "Enter a valid phone number"),
  companyAddress: z.string().trim().optional().or(z.literal("")),
  productsServices: z.string().trim().optional().or(z.literal("")),
  boothTier: z.enum(BOOTH_TIERS, {
    message: "Select a booth tier",
  }),
  sponsorshipTier: z.string().trim().optional().or(z.literal("")),
  representativesCount: z.number().int().min(1).max(50).optional(),
  specialRequirements: z.string().trim().optional().or(z.literal("")),
});
export type ExhibitorInput = z.infer<typeof exhibitorSchema>;

export const VENDOR_ITEMS = ["Food / Meals", "Snacks", "Water / Beverages", "Other"] as const;

export const vendorSchema = z.object({
  businessName: z.string().trim().min(2, "Vendor / business name is required"),
  itemsSold: z.array(z.enum(VENDOR_ITEMS)).min(1, "Select at least one item"),
  otherItems: z.string().trim().optional().or(z.literal("")),
  contactPerson: z.string().trim().min(2, "Contact person is required"),
  phone: z.string().trim().min(7, "Enter a valid phone number"),
  email: z.string().trim().email("Enter a valid email address"),
  spaceRequirement: z.string().trim().optional().or(z.literal("")),
  foodSafetyPermit: z.string().trim().optional().or(z.literal("")),
  availability: z.string().trim().optional().or(z.literal("")),
});
export type VendorInput = z.infer<typeof vendorSchema>;

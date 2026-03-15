import { z } from "zod";
import { locales } from "@/lib/locales";

export const bookingSchema = z
  .object({
    fullName: z.string().min(3).max(120),
    email: z.string().email(),
    phone: z.string().min(6).max(32),
    country: z.string().min(2).max(80),
    preferredLanguage: z.enum(locales),
    experienceSlug: z.string().min(2),
    startDate: z.string().optional().or(z.literal("")),
    endDate: z.string().optional().or(z.literal("")),
    adults: z.coerce.number().int().min(1).max(12),
    children: z.coerce.number().int().min(0).max(10).default(0),
    addOns: z.array(z.string()).default([]),
    paymentMethod: z.enum(["pay_later", "stripe", "paypal", "bank_transfer", "cmi"]),
    specialRequests: z.string().max(1200).optional().or(z.literal(""))
  })
  .superRefine((data: any, ctx: any) => {
    if (data.startDate && data.endDate) {
      const start = new Date(data.startDate);
      const end = new Date(data.endDate);
      if (end <= start) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ["endDate"],
          message: "Check-out or end date must be after the start date."
        });
      }
    }
  });

export type BookingInput = z.infer<typeof bookingSchema>;

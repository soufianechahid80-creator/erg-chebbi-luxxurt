import { z } from "zod";
import { locales } from "@/lib/locales";

export const contactSchema = z.object({
  fullName: z.string().min(3).max(120),
  email: z.string().email(),
  phone: z.string().min(6).max(32).optional().or(z.literal("")),
  preferredLanguage: z.enum(locales),
  subject: z.string().min(3).max(150),
  message: z.string().min(10).max(2000)
});

export type ContactInput = z.infer<typeof contactSchema>;

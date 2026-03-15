import type { Locale } from "@/types/locale";

export interface Testimonial {
  id: string;
  verified: boolean;
  author: string;
  country: string;
  text: Record<Locale, string>;
}

export const testimonials: Testimonial[] = [
  // Add verified guest reviews here before public launch.
];

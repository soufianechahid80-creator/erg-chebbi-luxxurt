import type { Locale } from "./locale";

export type PricingModel = "per_person" | "per_booking" | "per_night_per_adult";

export type AddOnPricing = "flat" | "per_person" | "per_night";

export type ExperienceCategory = "camp" | "camel" | "quad" | "tour";

export type PaymentMethod =
  | "pay_later"
  | "stripe"
  | "paypal"
  | "bank_transfer"
  | "cmi";

export type BookingStatus = "new" | "pending" | "confirmed" | "cancelled";

export type PaymentStatus = "unpaid" | "pending" | "paid" | "refunded";

export interface AddOn {
  id: string;
  eligibleExperiences?: string[];
  eligibleCategories?: ExperienceCategory[];
  pricing: AddOnPricing;
  price: number;
  translations: Record<
    Locale,
    {
      label: string;
      description: string;
    }
  >;
}

export interface ExperienceTranslation {
  title: string;
  shortDescription: string;
  longDescription: string;
  badge: string;
  durationLabel: string;
  inclusions: string[];
  highlights: string[];
  idealFor: string;
  metaDescription: string;
}

export interface Experience {
  slug: string;
  category: ExperienceCategory;
  featured?: boolean;
  pricingModel: PricingModel;
  basePrice: number;
  childPrice?: number;
  includedGuests?: number;
  extraGuestPrice?: number;
  minGuests?: number;
  minNights?: number;
  heroMediaKey: string;
  featuredImageKey: string;
  galleryKeys: string[];
  translations: Record<Locale, ExperienceTranslation>;
  seasonalNote?: Record<Locale, string>;
  addons: string[];
}

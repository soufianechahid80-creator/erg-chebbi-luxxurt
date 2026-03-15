import type { BookingInput } from "@/lib/validators/booking";
import { getExperienceBySlug, getTranslatedExperience } from "@/content/experiences";
import { calculateBookingEstimate } from "@/lib/pricing";
import type { Locale } from "@/types/locale";

export function buildBookingPayload(input: BookingInput) {
  const locale = input.preferredLanguage as Locale;
  const experience = getExperienceBySlug(input.experienceSlug);

  if (!experience) {
    throw new Error("Experience not found");
  }

  const estimate = calculateBookingEstimate({
    experienceSlug: input.experienceSlug,
    adults: input.adults,
    children: input.children,
    startDate: input.startDate,
    endDate: input.endDate,
    selectedAddOns: input.addOns
  });

  const translated = getTranslatedExperience(experience, locale);

  return {
    full_name: input.fullName,
    email: input.email,
    phone: input.phone,
    country: input.country,
    preferred_language: input.preferredLanguage,
    experience_slug: experience.slug,
    experience_title: translated.title,
    category: experience.category,
    start_date: input.startDate || null,
    end_date: input.endDate || null,
    nights: estimate.nights,
    adults: input.adults,
    children: input.children,
    add_ons: estimate.selectedAddOnsDetailed.map((addon) => ({
      id: addon.id,
      label: addon.translations[locale]?.label ?? addon.translations.en.label,
      price: addon.price,
      pricing: addon.pricing
    })),
    payment_method: input.paymentMethod,
    estimated_total: estimate.total,
    currency: "EUR",
    special_requests: input.specialRequests || null,
    source: "website"
  };
}

export function bookingDatesLabel(startDate?: string, endDate?: string) {
  if (!startDate && !endDate) {
    return "Dates on request";
  }

  if (startDate && endDate) {
    return `${startDate} → ${endDate}`;
  }

  return startDate || endDate || "Dates on request";
}

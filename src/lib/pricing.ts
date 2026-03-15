import { addOns, getAddonById, getExperienceBySlug } from "@/content/experiences";

interface PricingInput {
  experienceSlug: string;
  adults: number;
  children: number;
  startDate?: string;
  endDate?: string;
  selectedAddOns?: string[];
}

export function calculateNights(startDate?: string, endDate?: string) {
  if (!startDate || !endDate) {
    return 0;
  }

  const start = new Date(startDate);
  const end = new Date(endDate);

  if (Number.isNaN(start.getTime()) || Number.isNaN(end.getTime())) {
    return 0;
  }

  const difference = end.getTime() - start.getTime();
  const nights = Math.ceil(difference / (1000 * 60 * 60 * 24));

  return Math.max(0, nights);
}

export function calculateBookingEstimate({
  experienceSlug,
  adults,
  children,
  startDate,
  endDate,
  selectedAddOns = []
}: PricingInput) {
  const experience = getExperienceBySlug(experienceSlug);

  if (!experience) {
    return {
      experience: null,
      nights: 0,
      subtotal: 0,
      addOnsTotal: 0,
      total: 0,
      selectedAddOnsDetailed: []
    };
  }

  const nights = calculateNights(startDate, endDate);
  const normalizedAdults = Math.max(1, adults || 1);
  const normalizedChildren = Math.max(0, children || 0);

  let subtotal = 0;

  if (experience.pricingModel === "per_person") {
    subtotal =
      normalizedAdults * experience.basePrice +
      normalizedChildren * (experience.childPrice ?? Math.round(experience.basePrice * 0.65));
  }

  if (experience.pricingModel === "per_night_per_adult") {
    const billableNights = Math.max(experience.minNights ?? 1, nights || (experience.minNights ?? 1));
    subtotal =
      billableNights *
      (normalizedAdults * experience.basePrice +
        normalizedChildren * (experience.childPrice ?? Math.round(experience.basePrice * 0.65)));
  }

  if (experience.pricingModel === "per_booking") {
    const includedGuests = experience.includedGuests ?? 4;
    const totalGuests = normalizedAdults + normalizedChildren;
    const extraGuests = Math.max(0, totalGuests - includedGuests);
    subtotal = experience.basePrice + extraGuests * (experience.extraGuestPrice ?? 0);
  }

  const selectedAddOnsDetailed = selectedAddOns
    .map((id) => getAddonById(id))
    .filter((item): item is NonNullable<typeof item> => Boolean(item))
    .filter((addon) => {
      const bySlug = addon.eligibleExperiences?.includes(experience.slug);
      const byCategory = addon.eligibleCategories?.includes(experience.category);
      return Boolean(bySlug || byCategory);
    });

  const addOnsTotal = selectedAddOnsDetailed.reduce((sum, addon) => {
    if (addon.pricing === "flat") {
      return sum + addon.price;
    }

    if (addon.pricing === "per_person") {
      return sum + addon.price * (normalizedAdults + normalizedChildren);
    }

    const billableNights = Math.max(1, nights || 1);
    return sum + addon.price * billableNights;
  }, 0);

  return {
    experience,
    nights,
    subtotal,
    addOnsTotal,
    total: subtotal + addOnsTotal,
    selectedAddOnsDetailed
  };
}

export function getDefaultAddOns() {
  return addOns;
}

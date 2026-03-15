"use client";

import { useMemo, useState } from "react";
import type { FormEvent } from "react";
import type { Locale } from "@/types/locale";
import { experiences, getAddOnsForExperience, getTranslatedExperience } from "@/content/experiences";
import { getDictionary } from "@/content/translations";
import { calculateBookingEstimate } from "@/lib/pricing";
import { formatCurrency } from "@/lib/utils";
import { Button } from "@/components/ui/Button";
import { Input, Select, Textarea } from "@/components/ui/Field";
import { Card } from "@/components/ui/Card";
import { PricingSummary } from "@/components/booking/PricingSummary";
import { BookingSuccess } from "@/components/booking/BookingSuccess";

interface BookingFormProps {
  locale: Locale;
  defaultExperienceSlug?: string;
}

type FormState = {
  fullName: string;
  email: string;
  phone: string;
  country: string;
  preferredLanguage: Locale;
  experienceSlug: string;
  startDate: string;
  endDate: string;
  adults: number;
  children: number;
  addOns: string[];
  paymentMethod: "pay_later" | "stripe" | "paypal" | "bank_transfer" | "cmi";
  specialRequests: string;
};

const initialState = (locale: Locale, defaultExperienceSlug?: string): FormState => ({
  fullName: "",
  email: "",
  phone: "",
  country: "",
  preferredLanguage: locale,
  experienceSlug: defaultExperienceSlug || experiences[0].slug,
  startDate: "",
  endDate: "",
  adults: 2,
  children: 0,
  addOns: [],
  paymentMethod: "pay_later",
  specialRequests: ""
});

export function BookingForm({ locale, defaultExperienceSlug }: BookingFormProps) {
  const dictionary = getDictionary(locale);
  const [form, setForm] = useState<FormState>(initialState(locale, defaultExperienceSlug));
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [message, setMessage] = useState("");

  const selectedExperience = useMemo(
    () => experiences.find((experience) => experience.slug === form.experienceSlug) ?? experiences[0],
    [form.experienceSlug]
  );

  const estimate = useMemo(
    () =>
      calculateBookingEstimate({
        experienceSlug: form.experienceSlug,
        adults: form.adults,
        children: form.children,
        startDate: form.startDate,
        endDate: form.endDate,
        selectedAddOns: form.addOns
      }),
    [form]
  );

  const addOns = getAddOnsForExperience(selectedExperience);
  const summaryLabel =
    selectedExperience.pricingModel === "per_booking"
      ? "Private booking price"
      : selectedExperience.pricingModel === "per_night_per_adult"
        ? "Stay subtotal"
        : "Experience subtotal";

  function toggleAddon(addonId: string) {
    setForm((current: FormState) => ({
      ...current,
      addOns: current.addOns.includes(addonId)
        ? current.addOns.filter((id: string) => id !== addonId)
        : [...current.addOns, addonId]
    }));
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitting(true);
    setMessage("");

    try {
      const response = await fetch("/api/bookings", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(form)
      });

      const result = (await response.json()) as { error?: string };

      if (!response.ok) {
        throw new Error(result.error || "Booking request failed");
      }

      setSuccess(true);

      const sessionId = typeof window !== "undefined" ? window.localStorage.getItem("ergchebbi_session_id") : null;
      if (sessionId) {
        void fetch("/api/tracking", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            sessionId,
            path: "/booking",
            eventType: "booking_submitted",
            locale
          })
        }).catch(() => null);
      }
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "Booking request failed");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="grid gap-8 lg:grid-cols-[1.15fr_.85fr]">
      <div>
        {success ? <BookingSuccess /> : null}
        {message ? (
          <div className="mb-6 rounded-2xl border border-rose-400/20 bg-rose-500/10 p-4 text-sm text-rose-100">
            {message}
          </div>
        ) : null}
        <Card>
          <form className="grid gap-6" onSubmit={handleSubmit}>
            <div className="grid gap-4 sm:grid-cols-2">
              <label className="grid gap-2 text-sm text-[#d7cbb6]">
                Full name
                <Input value={form.fullName} onChange={(e: any) => setForm({ ...form, fullName: e.target.value })} required />
              </label>
              <label className="grid gap-2 text-sm text-[#d7cbb6]">
                Email
                <Input type="email" value={form.email} onChange={(e: any) => setForm({ ...form, email: e.target.value })} required />
              </label>
              <label className="grid gap-2 text-sm text-[#d7cbb6]">
                Phone / WhatsApp
                <Input value={form.phone} onChange={(e: any) => setForm({ ...form, phone: e.target.value })} required />
              </label>
              <label className="grid gap-2 text-sm text-[#d7cbb6]">
                Country
                <Input value={form.country} onChange={(e: any) => setForm({ ...form, country: e.target.value })} required />
              </label>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <label className="grid gap-2 text-sm text-[#d7cbb6]">
                Preferred language
                <Select
                  value={form.preferredLanguage}
                  onChange={(e: any) => setForm({ ...form, preferredLanguage: e.target.value as Locale })}
                >
                  <option value="en">English</option>
                  <option value="fr">Français</option>
                  <option value="es">Español</option>
                  <option value="ar">العربية</option>
                </Select>
              </label>
              <label className="grid gap-2 text-sm text-[#d7cbb6]">
                Experience
                <Select
                  value={form.experienceSlug}
                  onChange={(e: any) =>
                    setForm({
                      ...form,
                      experienceSlug: e.target.value,
                      addOns: []
                    })
                  }
                >
                  {experiences.map((experience) => (
                    <option key={experience.slug} value={experience.slug}>
                      {getTranslatedExperience(experience, locale).title}
                    </option>
                  ))}
                </Select>
              </label>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <label className="grid gap-2 text-sm text-[#d7cbb6]">
                {selectedExperience.pricingModel === "per_night_per_adult" ? "Check-in" : "Preferred date"}
                <Input type="date" value={form.startDate} onChange={(e: any) => setForm({ ...form, startDate: e.target.value })} />
              </label>
              <label className="grid gap-2 text-sm text-[#d7cbb6]">
                {selectedExperience.pricingModel === "per_night_per_adult" ? "Check-out" : "End date (optional)"}
                <Input type="date" value={form.endDate} onChange={(e: any) => setForm({ ...form, endDate: e.target.value })} />
              </label>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <label className="grid gap-2 text-sm text-[#d7cbb6]">
                Adults
                <Input
                  type="number"
                  min={1}
                  max={12}
                  value={form.adults}
                  onChange={(e: any) => setForm({ ...form, adults: Number(e.target.value) })}
                  required
                />
              </label>
              <label className="grid gap-2 text-sm text-[#d7cbb6]">
                Children
                <Input
                  type="number"
                  min={0}
                  max={10}
                  value={form.children}
                  onChange={(e: any) => setForm({ ...form, children: Number(e.target.value) })}
                />
              </label>
            </div>

            {addOns.length ? (
              <div className="grid gap-3">
                <div className="text-sm text-[#d7cbb6]">Add-ons</div>
                <div className="grid gap-3">
                  {addOns.map((addon) => {
                    const translated = addon.translations[locale] || addon.translations.en;
                    const active = form.addOns.includes(addon.id);

                    return (
                      <button
                        type="button"
                        key={addon.id}
                        onClick={() => toggleAddon(addon.id)}
                        className={`rounded-2xl border p-4 text-left transition ${
                          active ? "border-dune/60 bg-dune/10" : "border-white/10 bg-white/[0.03]"
                        }`}
                      >
                        <div className="flex items-center justify-between gap-4">
                          <div>
                            <div className="text-sm font-medium text-ivory">{translated.label}</div>
                            <div className="mt-1 text-xs leading-6 text-[#cbbfa9]">{translated.description}</div>
                          </div>
                          <div className="text-sm text-sand">{formatCurrency(addon.price, "EUR", locale)}</div>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            ) : null}

            <label className="grid gap-2 text-sm text-[#d7cbb6]">
              Payment method
              <Select
                value={form.paymentMethod}
                onChange={(e: any) =>
                  setForm({ ...form, paymentMethod: e.target.value as FormState["paymentMethod"] })
                }
              >
                <option value="pay_later">Reserve now, confirm later</option>
                <option value="stripe">Credit card / Stripe</option>
                <option value="paypal">PayPal</option>
                <option value="bank_transfer">Bank transfer</option>
                <option value="cmi">CMI / local Morocco payment</option>
              </Select>
            </label>

            <label className="grid gap-2 text-sm text-[#d7cbb6]">
              Special requests
              <Textarea
                placeholder="Private dinner setup, transfer request, anniversary notes, preferred pickup time..."
                value={form.specialRequests}
                onChange={(e: any) => setForm({ ...form, specialRequests: e.target.value })}
              />
            </label>

            <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4 text-sm leading-7 text-[#d7cbb6]">
              {dictionary.bookingPage.reassurance}
            </div>

            <Button type="submit" disabled={submitting}>
              {submitting ? "Sending..." : dictionary.common.secureRequest}
            </Button>
          </form>
        </Card>
      </div>

      <PricingSummary
        locale={locale}
        nights={estimate.nights}
        subtotal={estimate.subtotal}
        addOnsTotal={estimate.addOnsTotal}
        total={estimate.total}
        summaryLabel={summaryLabel}
      />
    </div>
  );
}

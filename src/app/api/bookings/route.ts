import { NextResponse } from "next/server";
import { bookingSchema } from "@/lib/validators/booking";
import { buildBookingPayload, bookingDatesLabel } from "@/lib/booking";
import { calculateBookingEstimate } from "@/lib/pricing";
import { getSupabaseAdmin } from "@/lib/supabase/server";
import { createActivityLog } from "@/lib/admin-data";
import { sendBookingEmails } from "@/lib/emails/send-booking-emails";

export async function POST(request: Request) {
  try {
    const json = await request.json();
    const parsed = bookingSchema.safeParse(json);

    if (!parsed.success) {
      return NextResponse.json({ error: parsed.error.issues[0]?.message || "Invalid booking data" }, { status: 400 });
    }

    const supabase = getSupabaseAdmin();
    if (!supabase) {
      return NextResponse.json(
        { error: "Supabase is not configured yet. Add your environment variables first." },
        { status: 503 }
      );
    }

    const estimate = calculateBookingEstimate({
      experienceSlug: parsed.data.experienceSlug,
      adults: parsed.data.adults,
      children: parsed.data.children,
      startDate: parsed.data.startDate,
      endDate: parsed.data.endDate,
      selectedAddOns: parsed.data.addOns
    });

    if (!estimate.experience) {
      return NextResponse.json({ error: "Selected experience was not found." }, { status: 404 });
    }

    if (estimate.experience.category === "camp" && parsed.data.startDate && parsed.data.endDate) {
      const blockedDates = await supabase
        .from("availability_calendar")
        .select("available_date, reason")
        .eq("is_available", false)
        .gte("available_date", parsed.data.startDate)
        .lt("available_date", parsed.data.endDate);

      if ((blockedDates.data || []).length > 0) {
        return NextResponse.json(
          {
            error:
              "One or more selected camp dates are currently unavailable. Please adjust the stay dates and try again."
          },
          { status: 409 }
        );
      }
    }

    const payload = buildBookingPayload(parsed.data);
    const insert = await supabase.from("booking_requests").insert(payload).select("id").single();

    if (insert.error || !insert.data) {
      return NextResponse.json({ error: insert.error?.message || "Booking could not be stored." }, { status: 500 });
    }

    await Promise.allSettled([
      supabase.from("booking_status_history").insert({
        booking_id: insert.data.id,
        from_status: null,
        to_status: "new",
        changed_by: "system"
      }),
      createActivityLog({
        activityType: "booking_created",
        entityType: "booking",
        entityId: insert.data.id,
        message: `New booking request from ${payload.full_name} for ${payload.experience_title}.`,
        metadata: {
          amount: payload.estimated_total,
          paymentMethod: payload.payment_method
        }
      })
    ]);

    await sendBookingEmails({
      fullName: payload.full_name,
      email: payload.email,
      phone: payload.phone || "",
      country: payload.country || "",
      language: payload.preferred_language || "en",
      experienceTitle: payload.experience_title,
      datesLabel: bookingDatesLabel(parsed.data.startDate, parsed.data.endDate),
      guestsLabel: `${payload.adults} adults / ${payload.children} children`,
      paymentMethod: payload.payment_method || "pay_later",
      totalLabel: `€${Math.round(Number(payload.estimated_total || 0))}`,
      specialRequests: payload.special_requests || undefined
    });

    return NextResponse.json({
      success: true,
      bookingId: insert.data.id,
      total: estimate.total
    });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Booking request failed." },
      { status: 500 }
    );
  }
}

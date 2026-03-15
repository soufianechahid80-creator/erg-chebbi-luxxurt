import { Resend } from "resend";
import { customerBookingEmailTemplate } from "@/lib/emails/booking-customer";
import { ownerBookingEmailTemplate } from "@/lib/emails/booking-owner";
import { siteConfig } from "@/lib/site";

interface BookingEmailPayload {
  fullName: string;
  email: string;
  phone: string;
  country: string;
  language: string;
  experienceTitle: string;
  datesLabel: string;
  guestsLabel: string;
  paymentMethod: string;
  totalLabel: string;
  specialRequests?: string;
}

export async function sendBookingEmails(booking: BookingEmailPayload) {
  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.BOOKING_FROM_EMAIL || "Erg Chebbi Luxury <onboarding@resend.dev>";
  const replyTo = process.env.BOOKING_REPLY_TO || siteConfig.ownerEmail;
  const ownerEmail = process.env.OWNER_NOTIFICATION_EMAIL || siteConfig.ownerEmail;

  if (!apiKey) {
    return { sent: false, reason: "Missing RESEND_API_KEY" };
  }

  const resend = new Resend(apiKey);

  await Promise.allSettled([
    resend.emails.send({
      from,
      to: booking.email,
      reply_to: replyTo,
      subject: `Your booking request • ${booking.experienceTitle}`,
      html: customerBookingEmailTemplate({
        brandName: siteConfig.name,
        supportEmail: siteConfig.ownerEmail,
        whatsapp: siteConfig.whatsapp,
        booking
      })
    }),
    resend.emails.send({
      from,
      to: ownerEmail,
      reply_to: replyTo,
      subject: `New booking request • ${booking.experienceTitle}`,
      html: ownerBookingEmailTemplate({
        brandName: siteConfig.name,
        booking
      })
    })
  ]);

  return { sent: true };
}

import sql from "@/app/api/utils/sql";
import { sendEmail } from "@/app/api/utils/send-email";

function buildConfirmationEmail(booking) {
  return `
    <div style="max-width:600px;margin:0 auto;font-family:'Helvetica Neue',sans-serif;color:#1A1612;background:#FAF8F5;padding:40px 32px;">
      <div style="text-align:center;margin-bottom:32px;">
        <h1 style="font-size:24px;font-weight:400;letter-spacing:-0.02em;color:#0A0A0A;margin:0;">Erg Chebbi Luxury</h1>
        <p style="font-size:11px;letter-spacing:0.15em;text-transform:uppercase;color:#C8A45A;margin:4px 0 0;">Luxury Desert Experiences</p>
      </div>
      <div style="background:#fff;border-radius:8px;padding:32px;border:1px solid #E8E0D4;">
        <h2 style="font-size:20px;font-weight:400;color:#0A0A0A;margin:0 0 8px;">Booking Confirmed</h2>
        <p style="color:#6B6355;font-size:14px;line-height:1.6;margin:0 0 24px;">
          Thank you, ${booking.full_name}. Your booking has been received and is being processed.
        </p>
        <table style="width:100%;border-collapse:collapse;">
          <tr><td style="padding:10px 0;border-bottom:1px solid #E8E0D4;color:#6B6355;font-size:13px;">Experience</td><td style="padding:10px 0;border-bottom:1px solid #E8E0D4;text-align:right;font-weight:500;font-size:14px;">${booking.experience}</td></tr>
          <tr><td style="padding:10px 0;border-bottom:1px solid #E8E0D4;color:#6B6355;font-size:13px;">Check-in</td><td style="padding:10px 0;border-bottom:1px solid #E8E0D4;text-align:right;font-size:14px;">${booking.check_in || "N/A"}</td></tr>
          ${booking.check_out ? `<tr><td style="padding:10px 0;border-bottom:1px solid #E8E0D4;color:#6B6355;font-size:13px;">Check-out</td><td style="padding:10px 0;border-bottom:1px solid #E8E0D4;text-align:right;font-size:14px;">${booking.check_out}</td></tr>` : ""}
          <tr><td style="padding:10px 0;border-bottom:1px solid #E8E0D4;color:#6B6355;font-size:13px;">Guests</td><td style="padding:10px 0;border-bottom:1px solid #E8E0D4;text-align:right;font-size:14px;">${booking.adults} adults${booking.children > 0 ? `, ${booking.children} children` : ""}</td></tr>
          <tr><td style="padding:10px 0;color:#6B6355;font-size:13px;">Estimated Total</td><td style="padding:10px 0;text-align:right;font-size:18px;font-weight:500;color:#C8A45A;">€${booking.estimated_total}</td></tr>
        </table>
      </div>
      <p style="text-align:center;color:#9A9080;font-size:12px;margin-top:24px;line-height:1.6;">
        Our team will contact you within 24 hours to finalize your booking details.<br/>
        WhatsApp: +212 691 999 897 | Email: Soufianechahid30@gmail.com
      </p>
    </div>
  `;
}

function buildOwnerNotification(booking) {
  return `
    <div style="max-width:600px;margin:0 auto;font-family:'Helvetica Neue',sans-serif;color:#1A1612;background:#F8FAFC;padding:32px;">
      <h2 style="font-size:18px;font-weight:500;color:#0F172A;margin:0 0 16px;">New Booking Request</h2>
      <table style="width:100%;border-collapse:collapse;background:#fff;border-radius:8px;border:1px solid #E2E8F0;">
        <tr><td style="padding:12px 16px;border-bottom:1px solid #E2E8F0;color:#64748B;font-size:13px;">Name</td><td style="padding:12px 16px;border-bottom:1px solid #E2E8F0;font-weight:500;">${booking.full_name}</td></tr>
        <tr><td style="padding:12px 16px;border-bottom:1px solid #E2E8F0;color:#64748B;font-size:13px;">Email</td><td style="padding:12px 16px;border-bottom:1px solid #E2E8F0;">${booking.email}</td></tr>
        <tr><td style="padding:12px 16px;border-bottom:1px solid #E2E8F0;color:#64748B;font-size:13px;">Phone</td><td style="padding:12px 16px;border-bottom:1px solid #E2E8F0;">${booking.phone || "N/A"}</td></tr>
        <tr><td style="padding:12px 16px;border-bottom:1px solid #E2E8F0;color:#64748B;font-size:13px;">Experience</td><td style="padding:12px 16px;border-bottom:1px solid #E2E8F0;font-weight:500;">${booking.experience}</td></tr>
        <tr><td style="padding:12px 16px;border-bottom:1px solid #E2E8F0;color:#64748B;font-size:13px;">Dates</td><td style="padding:12px 16px;border-bottom:1px solid #E2E8F0;">${booking.check_in}${booking.check_out ? " → " + booking.check_out : ""}</td></tr>
        <tr><td style="padding:12px 16px;border-bottom:1px solid #E2E8F0;color:#64748B;font-size:13px;">Guests</td><td style="padding:12px 16px;border-bottom:1px solid #E2E8F0;">${booking.adults} adults, ${booking.children} children</td></tr>
        <tr><td style="padding:12px 16px;border-bottom:1px solid #E2E8F0;color:#64748B;font-size:13px;">Payment</td><td style="padding:12px 16px;border-bottom:1px solid #E2E8F0;">${booking.payment_method}</td></tr>
        <tr><td style="padding:12px 16px;color:#64748B;font-size:13px;">Total</td><td style="padding:12px 16px;font-weight:500;font-size:16px;color:#C8A45A;">€${booking.estimated_total}</td></tr>
      </table>
      ${booking.special_requests ? `<p style="margin-top:16px;color:#64748B;font-size:13px;">Special requests: ${booking.special_requests}</p>` : ""}
    </div>
  `;
}

export async function POST(request) {
  try {
    const body = await request.json();
    const {
      full_name,
      email,
      phone,
      country,
      preferred_language,
      experience,
      check_in,
      check_out,
      nights,
      adults,
      children,
      special_requests,
      payment_method,
      estimated_total,
    } = body;

    const result = await sql(
      `INSERT INTO booking_requests (full_name, email, phone, country, preferred_language, experience, check_in, check_out, nights, adults, children, special_requests, payment_method, estimated_total)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14)
       RETURNING id`,
      [
        full_name,
        email,
        phone,
        country,
        preferred_language,
        experience,
        check_in || null,
        check_out || null,
        nights || 0,
        adults || 1,
        children || 0,
        special_requests,
        payment_method,
        estimated_total || 0,
      ],
    );

    const bookingId = result[0]?.id;

    // Send confirmation emails (non-blocking)
    try {
      await sendEmail({
        to: email,
        from: process.env.BOOKING_FROM_EMAIL || "onboarding@resend.dev",
        subject: "Booking Confirmation — Erg Chebbi Luxury",
        html: buildConfirmationEmail({ ...body, id: bookingId }),
      });
    } catch (emailErr) {
      console.error("Customer email failed:", emailErr);
    }

    try {
      await sendEmail({
        to:
          process.env.OWNER_NOTIFICATION_EMAIL || "Soufianechahid30@gmail.com",
        from: process.env.BOOKING_FROM_EMAIL || "onboarding@resend.dev",
        subject: `New Booking: ${full_name} — ${experience}`,
        html: buildOwnerNotification({ ...body, id: bookingId }),
      });
    } catch (emailErr) {
      console.error("Owner email failed:", emailErr);
    }

    return Response.json({ id: bookingId, status: "pending" });
  } catch (error) {
    console.error("Booking error:", error);
    return Response.json(
      { error: "Failed to create booking" },
      { status: 500 },
    );
  }
}

export async function GET(request) {
  try {
    const url = new URL(request.url);
    const status = url.searchParams.get("status");
    const search = url.searchParams.get("search");

    let query = "SELECT * FROM booking_requests";
    const conditions = [];
    const values = [];
    let paramIndex = 1;

    if (status && status !== "all") {
      conditions.push(`booking_status = $${paramIndex}`);
      values.push(status);
      paramIndex++;
    }

    if (search) {
      conditions.push(
        `(LOWER(full_name) LIKE LOWER($${paramIndex}) OR LOWER(email) LIKE LOWER($${paramIndex}) OR LOWER(experience) LIKE LOWER($${paramIndex}))`,
      );
      values.push(`%${search}%`);
      paramIndex++;
    }

    if (conditions.length > 0) {
      query += " WHERE " + conditions.join(" AND ");
    }

    query += " ORDER BY created_at DESC";

    const rows = await sql(query, values);
    return Response.json(rows);
  } catch (error) {
    console.error("List bookings error:", error);
    return Response.json(
      { error: "Failed to fetch bookings" },
      { status: 500 },
    );
  }
}

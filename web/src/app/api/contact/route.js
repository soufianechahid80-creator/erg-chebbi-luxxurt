import sql from "@/app/api/utils/sql";
import { sendEmail } from "@/app/api/utils/send-email";

export async function POST(request) {
  try {
    const body = await request.json();
    const { full_name, email, phone, subject, message } = body;

    await sql(
      `INSERT INTO contact_messages (full_name, email, phone, subject, message) VALUES ($1, $2, $3, $4, $5)`,
      [full_name, email, phone || null, subject || null, message],
    );

    // Notify owner
    try {
      await sendEmail({
        to:
          process.env.OWNER_NOTIFICATION_EMAIL || "Soufianechahid30@gmail.com",
        from: process.env.BOOKING_FROM_EMAIL || "onboarding@resend.dev",
        subject: `New Contact: ${full_name} — ${subject || "General Inquiry"}`,
        html: `
          <div style="max-width:500px;font-family:sans-serif;padding:24px;">
            <h2 style="font-size:16px;font-weight:500;">New Contact Message</h2>
            <p><strong>Name:</strong> ${full_name}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Phone:</strong> ${phone || "N/A"}</p>
            <p><strong>Subject:</strong> ${subject || "N/A"}</p>
            <p><strong>Message:</strong></p>
            <p style="background:#f5f5f5;padding:12px;border-radius:6px;">${message}</p>
          </div>
        `,
      });
    } catch (emailErr) {
      console.error("Owner notification email failed:", emailErr);
    }

    return Response.json({ success: true });
  } catch (error) {
    console.error("Contact form error:", error);
    return Response.json({ error: "Failed to send message" }, { status: 500 });
  }
}

export async function GET() {
  try {
    const rows = await sql(
      `SELECT * FROM contact_messages ORDER BY created_at DESC`,
    );
    return Response.json(rows);
  } catch (error) {
    console.error("List contacts error:", error);
    return Response.json(
      { error: "Failed to fetch messages" },
      { status: 500 },
    );
  }
}

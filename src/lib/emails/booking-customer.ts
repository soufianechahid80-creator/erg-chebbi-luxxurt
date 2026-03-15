interface EmailInput {
  brandName: string;
  booking: {
    fullName: string;
    experienceTitle: string;
    datesLabel: string;
    guestsLabel: string;
    paymentMethod: string;
    totalLabel: string;
    specialRequests?: string;
  };
  supportEmail: string;
  whatsapp: string;
}

export function customerBookingEmailTemplate({
  brandName,
  booking,
  supportEmail,
  whatsapp
}: EmailInput) {
  return `
  <div style="font-family:Arial,Helvetica,sans-serif;background:#0b0a0f;padding:32px;color:#f7f1e6;">
    <div style="max-width:640px;margin:0 auto;background:#14131a;border:1px solid rgba(231,215,187,.12);border-radius:24px;overflow:hidden;">
      <div style="padding:28px 32px;background:linear-gradient(135deg,#1b1a20,#0d0c12);border-bottom:1px solid rgba(231,215,187,.08);">
        <div style="font-size:12px;letter-spacing:.16em;text-transform:uppercase;color:#caa86a;">${brandName}</div>
        <h1 style="margin:12px 0 0;font-size:28px;line-height:1.2;color:#fff;">Your desert booking request has been received</h1>
        <p style="margin:12px 0 0;color:#d6ccb8;line-height:1.7;">Thank you for choosing ${brandName}. We have recorded your request and will follow up with confirmation details as quickly as possible.</p>
      </div>
      <div style="padding:28px 32px;">
        <table style="width:100%;border-collapse:collapse;">
          <tr><td style="padding:12px 0;color:#caa86a;width:180px;">Guest</td><td style="padding:12px 0;color:#fff;">${booking.fullName}</td></tr>
          <tr><td style="padding:12px 0;color:#caa86a;">Experience</td><td style="padding:12px 0;color:#fff;">${booking.experienceTitle}</td></tr>
          <tr><td style="padding:12px 0;color:#caa86a;">Dates</td><td style="padding:12px 0;color:#fff;">${booking.datesLabel}</td></tr>
          <tr><td style="padding:12px 0;color:#caa86a;">Guests</td><td style="padding:12px 0;color:#fff;">${booking.guestsLabel}</td></tr>
          <tr><td style="padding:12px 0;color:#caa86a;">Payment preference</td><td style="padding:12px 0;color:#fff;">${booking.paymentMethod}</td></tr>
          <tr><td style="padding:12px 0;color:#caa86a;">Estimated total</td><td style="padding:12px 0;color:#fff;font-weight:bold;">${booking.totalLabel}</td></tr>
        </table>
        ${
          booking.specialRequests
            ? `<div style="margin-top:20px;padding:18px;border-radius:16px;background:#1b1921;color:#d6ccb8;">
                <strong style="display:block;color:#fff;margin-bottom:8px;">Special requests</strong>
                ${booking.specialRequests}
              </div>`
            : ""
        }
        <div style="margin-top:28px;padding:18px;border-radius:18px;background:rgba(202,168,106,.08);color:#e7d7bb;">
          <strong style="display:block;color:#fff;margin-bottom:8px;">Need to update your request?</strong>
          Reply to this email, write to ${supportEmail}, or message us on WhatsApp: ${whatsapp}
        </div>
      </div>
    </div>
  </div>
  `;
}

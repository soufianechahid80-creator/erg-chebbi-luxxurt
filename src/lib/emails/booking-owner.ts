interface OwnerEmailInput {
  brandName: string;
  booking: {
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
  };
}

export function ownerBookingEmailTemplate({ brandName, booking }: OwnerEmailInput) {
  return `
  <div style="font-family:Arial,Helvetica,sans-serif;background:#0b0a0f;padding:32px;color:#f7f1e6;">
    <div style="max-width:640px;margin:0 auto;background:#14131a;border:1px solid rgba(231,215,187,.12);border-radius:24px;overflow:hidden;">
      <div style="padding:28px 32px;background:linear-gradient(135deg,#1b1a20,#0d0c12);border-bottom:1px solid rgba(231,215,187,.08);">
        <div style="font-size:12px;letter-spacing:.16em;text-transform:uppercase;color:#caa86a;">${brandName}</div>
        <h1 style="margin:12px 0 0;font-size:28px;line-height:1.2;color:#fff;">New booking request received</h1>
      </div>
      <div style="padding:28px 32px;">
        <table style="width:100%;border-collapse:collapse;">
          <tr><td style="padding:10px 0;color:#caa86a;width:180px;">Guest</td><td style="padding:10px 0;color:#fff;">${booking.fullName}</td></tr>
          <tr><td style="padding:10px 0;color:#caa86a;">Email</td><td style="padding:10px 0;color:#fff;">${booking.email}</td></tr>
          <tr><td style="padding:10px 0;color:#caa86a;">Phone</td><td style="padding:10px 0;color:#fff;">${booking.phone}</td></tr>
          <tr><td style="padding:10px 0;color:#caa86a;">Country</td><td style="padding:10px 0;color:#fff;">${booking.country}</td></tr>
          <tr><td style="padding:10px 0;color:#caa86a;">Language</td><td style="padding:10px 0;color:#fff;">${booking.language}</td></tr>
          <tr><td style="padding:10px 0;color:#caa86a;">Experience</td><td style="padding:10px 0;color:#fff;">${booking.experienceTitle}</td></tr>
          <tr><td style="padding:10px 0;color:#caa86a;">Dates</td><td style="padding:10px 0;color:#fff;">${booking.datesLabel}</td></tr>
          <tr><td style="padding:10px 0;color:#caa86a;">Guests</td><td style="padding:10px 0;color:#fff;">${booking.guestsLabel}</td></tr>
          <tr><td style="padding:10px 0;color:#caa86a;">Payment</td><td style="padding:10px 0;color:#fff;">${booking.paymentMethod}</td></tr>
          <tr><td style="padding:10px 0;color:#caa86a;">Estimated total</td><td style="padding:10px 0;color:#fff;font-weight:bold;">${booking.totalLabel}</td></tr>
        </table>
        ${
          booking.specialRequests
            ? `<div style="margin-top:20px;padding:18px;border-radius:16px;background:#1b1921;color:#d6ccb8;">
                <strong style="display:block;color:#fff;margin-bottom:8px;">Special requests</strong>
                ${booking.specialRequests}
              </div>`
            : ""
        }
      </div>
    </div>
  </div>
  `;
}

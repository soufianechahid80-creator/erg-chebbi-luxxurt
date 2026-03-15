import { NextResponse } from "next/server";
import { getAdminSession } from "@/lib/auth";
import { getSupabaseAdmin } from "@/lib/supabase/server";

function csvEscape(value: string | number | null | undefined) {
  const safe = value == null ? "" : String(value);
  return `"${safe.replace(/"/g, '""')}"`;
}

export async function GET() {
  const session = getAdminSession();
  if (!session) {
    return new NextResponse("Unauthorized", { status: 401 });
  }

  const supabase = getSupabaseAdmin();
  if (!supabase) {
    return new NextResponse("Supabase is not configured", { status: 503 });
  }

  const result = await supabase
    .from("booking_requests")
    .select("created_at, full_name, email, phone, experience_title, start_date, end_date, adults, children, estimated_total, payment_method, status")
    .order("created_at", { ascending: false });

  const headers = [
    "created_at",
    "full_name",
    "email",
    "phone",
    "experience_title",
    "start_date",
    "end_date",
    "adults",
    "children",
    "estimated_total",
    "payment_method",
    "status"
  ];

  const lines = [headers.join(",")];
  for (const row of result.data || []) {
    lines.push(
      [
        row.created_at,
        row.full_name,
        row.email,
        row.phone,
        row.experience_title,
        row.start_date,
        row.end_date,
        row.adults,
        row.children,
        row.estimated_total,
        row.payment_method,
        row.status
      ]
        .map(csvEscape)
        .join(",")
    );
  }

  return new NextResponse(lines.join("\n"), {
    status: 200,
    headers: {
      "Content-Type": "text/csv; charset=utf-8",
      "Content-Disposition": 'attachment; filename="ergchebbi-bookings.csv"'
    }
  });
}

import sql from "@/app/api/utils/sql";

export async function GET() {
  try {
    const [bookings, contacts, visitors, revenue, recentBookings] =
      await sql.transaction([
        sql`SELECT COUNT(*) as total_count, 
            COUNT(CASE WHEN booking_status = 'pending' THEN 1 END) as pending_count,
            COUNT(CASE WHEN booking_status = 'confirmed' THEN 1 END) as confirmed_count,
            COUNT(CASE WHEN booking_status = 'cancelled' THEN 1 END) as cancelled_count
          FROM booking_requests`,
        sql`SELECT COUNT(*) as total_count,
            COUNT(CASE WHEN is_read = false THEN 1 END) as unread_count
          FROM contact_messages`,
        sql`SELECT COUNT(*) as total_count,
            COUNT(CASE WHEN created_at > NOW() - INTERVAL '24 hours' THEN 1 END) as today_count
          FROM visitor_sessions`,
        sql`SELECT COALESCE(SUM(estimated_total), 0) as total_revenue,
            COALESCE(SUM(CASE WHEN booking_status = 'confirmed' THEN estimated_total ELSE 0 END), 0) as confirmed_revenue
          FROM booking_requests`,
        sql`SELECT id, full_name, email, experience, check_in, estimated_total, booking_status, created_at
          FROM booking_requests ORDER BY created_at DESC LIMIT 10`,
      ]);

    return Response.json({
      bookings: bookings[0],
      contacts: contacts[0],
      visitors: visitors[0],
      revenue: revenue[0],
      recentBookings,
    });
  } catch (error) {
    console.error("Admin stats error:", error);
    return Response.json({ error: "Failed to fetch stats" }, { status: 500 });
  }
}

import { getSupabaseAdmin } from "@/lib/supabase/server";

export async function fetchDashboardMetrics() {
  const supabase = getSupabaseAdmin();

  if (!supabase) {
    return {
      bookingCount: 0,
      messageCount: 0,
      sessionCount: 0,
      revenue: 0,
      recentBookings: [],
      recentMessages: [],
      recentActivity: []
    };
  }

  const [
    bookingsResult,
    messagesResult,
    sessionsResult,
    recentBookingsResult,
    recentMessagesResult,
    recentActivityResult
  ] = await Promise.all([
    supabase.from("booking_requests").select("id", { count: "exact", head: true }),
    supabase.from("contact_messages").select("id", { count: "exact", head: true }),
    supabase.from("visitor_sessions").select("id", { count: "exact", head: true }),
    supabase
      .from("booking_requests")
      .select("id, full_name, email, phone, experience_title, estimated_total, status, created_at")
      .order("created_at", { ascending: false })
      .limit(8),
    supabase
      .from("contact_messages")
      .select("id, full_name, email, subject, message, created_at")
      .order("created_at", { ascending: false })
      .limit(6),
    supabase
      .from("admin_recent_activity")
      .select("id, message, created_at, activity_type")
      .order("created_at", { ascending: false })
      .limit(8)
  ]);

  const revenue = (recentBookingsResult.data || []).reduce(
    (sum: number, row: { estimated_total: number | null }) => sum + Number(row.estimated_total || 0),
    0
  );

  return {
    bookingCount: bookingsResult.count || 0,
    messageCount: messagesResult.count || 0,
    sessionCount: sessionsResult.count || 0,
    revenue,
    recentBookings: recentBookingsResult.data || [],
    recentMessages: recentMessagesResult.data || [],
    recentActivity: recentActivityResult.data || []
  };
}

export async function fetchBookings(params?: { status?: string; query?: string }) {
  const supabase = getSupabaseAdmin();
  if (!supabase) return [];

  let query = supabase
    .from("booking_requests")
    .select(
      "id, full_name, email, phone, experience_title, estimated_total, status, created_at, payment_method, start_date, end_date, adults, children"
    )
    .order("created_at", { ascending: false });

  if (params?.status && params.status !== "all") {
    query = query.eq("status", params.status);
  }

  if (params?.query) {
    query = query.or(
      `full_name.ilike.%${params.query}%,email.ilike.%${params.query}%,experience_title.ilike.%${params.query}%`
    );
  }

  const result = await query.limit(100);
  return result.data || [];
}

export async function fetchMessages() {
  const supabase = getSupabaseAdmin();
  if (!supabase) return [];

  const result = await supabase
    .from("contact_messages")
    .select("id, full_name, email, subject, message, created_at")
    .order("created_at", { ascending: false })
    .limit(100);

  return result.data || [];
}

export async function fetchAnalytics() {
  const supabase = getSupabaseAdmin();
  if (!supabase) {
    return {
      totalSessions: 0,
      pageViews: 0,
      conversions: 0,
      topPages: []
    };
  }

  const [sessionCount, pageViewCount, conversionCount, topPagesResult] = await Promise.all([
    supabase.from("visitor_sessions").select("id", { count: "exact", head: true }),
    supabase.from("page_events").select("id", { count: "exact", head: true }),
    supabase
      .from("page_events")
      .select("id", { count: "exact", head: true })
      .eq("event_type", "booking_submitted"),
    supabase.from("page_events").select("path").limit(500)
  ]);

  const pageCounts = new Map<string, number>();
  for (const row of topPagesResult.data || []) {
    pageCounts.set(row.path, (pageCounts.get(row.path) || 0) + 1);
  }

  const topPages = Array.from(pageCounts.entries())
    .map(([path, count]) => ({ path, count }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 8);

  return {
    totalSessions: sessionCount.count || 0,
    pageViews: pageViewCount.count || 0,
    conversions: conversionCount.count || 0,
    topPages
  };
}

export async function createActivityLog(input: {
  activityType: string;
  entityType: string;
  entityId?: string;
  message: string;
  metadata?: Record<string, unknown>;
}) {
  const supabase = getSupabaseAdmin();
  if (!supabase) return;

  await supabase.from("admin_recent_activity").insert({
    activity_type: input.activityType,
    entity_type: input.entityType,
    entity_id: input.entityId || null,
    message: input.message,
    metadata: input.metadata || {}
  });
}

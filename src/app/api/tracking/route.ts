import { NextResponse } from "next/server";
import { getSupabaseAdmin } from "@/lib/supabase/server";

export async function POST(request: Request) {
  try {
    const supabase = getSupabaseAdmin();
    if (!supabase) {
      return NextResponse.json({ success: true, skipped: true });
    }

    const body = (await request.json()) as {
      sessionId?: string;
      path?: string;
      referrer?: string;
      locale?: string;
      eventType?: string;
    };

    if (!body.sessionId || !body.path) {
      return NextResponse.json({ error: "sessionId and path are required" }, { status: 400 });
    }

    const existing = await supabase
      .from("visitor_sessions")
      .select("session_id, views")
      .eq("session_id", body.sessionId)
      .maybeSingle();

    if (existing.data) {
      await supabase
        .from("visitor_sessions")
        .update({
          current_path: body.path,
          referrer: body.referrer || null,
          locale: body.locale || null,
          views: (existing.data.views || 1) + 1,
          converted: body.eventType === "booking_submitted" ? true : undefined,
          last_seen_at: new Date().toISOString(),
          user_agent: request.headers.get("user-agent")
        })
        .eq("session_id", body.sessionId);
    } else {
      await supabase.from("visitor_sessions").insert({
        session_id: body.sessionId,
        landing_path: body.path,
        current_path: body.path,
        referrer: body.referrer || null,
        locale: body.locale || null,
        user_agent: request.headers.get("user-agent"),
        views: 1,
        converted: body.eventType === "booking_submitted"
      });
    }

    await supabase.from("page_events").insert({
      session_id: body.sessionId,
      path: body.path,
      event_type: body.eventType || "page_view",
      referrer: body.referrer || null,
      metadata: {}
    });

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ success: true });
  }
}

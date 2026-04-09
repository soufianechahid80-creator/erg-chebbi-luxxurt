import sql from "@/app/api/utils/sql";

export async function POST(request) {
  try {
    const body = await request.json();
    const { session_id, page_visited, referrer } = body;
    const userAgent = request.headers.get("user-agent") || "";

    await sql(
      `INSERT INTO visitor_sessions (session_id, page_visited, referrer, user_agent) VALUES ($1, $2, $3, $4)`,
      [session_id, page_visited, referrer || null, userAgent],
    );

    return Response.json({ success: true });
  } catch (error) {
    console.error("Visitor tracking error:", error);
    return Response.json({ error: "Failed to track visitor" }, { status: 500 });
  }
}

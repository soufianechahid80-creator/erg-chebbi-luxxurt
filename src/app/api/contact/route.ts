import { NextResponse } from "next/server";
import { contactSchema } from "@/lib/validators/contact";
import { getSupabaseAdmin } from "@/lib/supabase/server";
import { createActivityLog } from "@/lib/admin-data";

export async function POST(request: Request) {
  try {
    const json = await request.json();
    const parsed = contactSchema.safeParse(json);

    if (!parsed.success) {
      return NextResponse.json({ error: parsed.error.issues[0]?.message || "Invalid message data" }, { status: 400 });
    }

    const supabase = getSupabaseAdmin();
    if (!supabase) {
      return NextResponse.json(
        { error: "Supabase is not configured yet. Add your environment variables first." },
        { status: 503 }
      );
    }

    const insert = await supabase.from("contact_messages").insert({
      full_name: parsed.data.fullName,
      email: parsed.data.email,
      phone: parsed.data.phone || null,
      preferred_language: parsed.data.preferredLanguage,
      subject: parsed.data.subject,
      message: parsed.data.message,
      page_source: "contact"
    });

    if (insert.error) {
      return NextResponse.json({ error: insert.error.message }, { status: 500 });
    }

    await createActivityLog({
      activityType: "message_created",
      entityType: "contact_message",
      message: `New contact message from ${parsed.data.fullName}.`
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Message could not be stored." },
      { status: 500 }
    );
  }
}

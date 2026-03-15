import { NextResponse } from "next/server";
import { createAdminSession, getAdminAuthConfig, getAdminSessionCookieName } from "@/lib/auth";

export async function POST(request: Request) {
  const formData = await request.formData();
  const username = String(formData.get("username") || "");
  const password = String(formData.get("password") || "");

  const config = getAdminAuthConfig();

  if (username !== config.username || password !== config.password) {
    return NextResponse.redirect(new URL("/admin/login", request.url), { status: 302 });
  }

  const response = NextResponse.redirect(new URL("/admin", request.url), { status: 302 });

  response.cookies.set({
    name: getAdminSessionCookieName(),
    value: createAdminSession(username),
    httpOnly: true,
    sameSite: "lax",
    path: "/",
    secure: process.env.NODE_ENV === "production",
    maxAge: 60 * 60 * 24 * 7
  });

  return response;
}

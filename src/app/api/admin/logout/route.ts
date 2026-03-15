import { NextResponse } from "next/server";
import { getAdminSessionCookieName } from "@/lib/auth";

export async function POST(request: Request) {
  const response = NextResponse.redirect(new URL("/admin/login", request.url), { status: 302 });
  response.cookies.set({
    name: getAdminSessionCookieName(),
    value: "",
    httpOnly: true,
    sameSite: "lax",
    path: "/",
    secure: process.env.NODE_ENV === "production",
    maxAge: 0
  });
  return response;
}

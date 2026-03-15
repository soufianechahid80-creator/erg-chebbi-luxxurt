import { createHmac, timingSafeEqual } from "crypto";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

const SESSION_COOKIE = "ergchebbi_admin_session";
const DEFAULT_TTL_SECONDS = 60 * 60 * 24 * 7;

function getSecret() {
  return process.env.ADMIN_SESSION_SECRET || "change-me-long-random-secret";
}

function sign(payload: string) {
  return createHmac("sha256", getSecret()).update(payload).digest("base64url");
}

export function createAdminSession(username: string) {
  const payload = JSON.stringify({
    sub: username,
    exp: Math.floor(Date.now() / 1000) + DEFAULT_TTL_SECONDS
  });

  const encoded = Buffer.from(payload).toString("base64url");
  const signature = sign(encoded);

  return `${encoded}.${signature}`;
}

export function verifyAdminSession(session?: string | null) {
  if (!session) {
    return null;
  }

  const [encoded, signature] = session.split(".");
  if (!encoded || !signature) {
    return null;
  }

  const expected = sign(encoded);

  const signatureBuffer = Buffer.from(signature);
  const expectedBuffer = Buffer.from(expected);

  if (
    signatureBuffer.length !== expectedBuffer.length ||
    !timingSafeEqual(signatureBuffer, expectedBuffer)
  ) {
    return null;
  }

  try {
    const payload = JSON.parse(Buffer.from(encoded, "base64url").toString("utf8")) as {
      sub: string;
      exp: number;
    };

    if (payload.exp < Math.floor(Date.now() / 1000)) {
      return null;
    }

    return payload;
  } catch {
    return null;
  }
}

export function getAdminSessionCookieName() {
  return SESSION_COOKIE;
}

export function getAdminAuthConfig() {
  return {
    username: process.env.ADMIN_USERNAME || "owner",
    password: process.env.ADMIN_PASSWORD || "change-me-strong-password"
  };
}

export function getAdminSession() {
  const store = cookies();
  const value = store.get(SESSION_COOKIE)?.value;
  return verifyAdminSession(value);
}

export function requireAdminSession() {
  const session = getAdminSession();

  if (!session) {
    redirect("/admin/login");
  }

  return session;
}

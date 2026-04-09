import sql from "@/app/api/utils/sql";
import argon2 from "argon2";

export async function POST(request) {
  try {
    const { email, password } = await request.json();

    if (!email || !password) {
      return Response.json(
        { error: "Email and password are required" },
        { status: 400 },
      );
    }

    const rows = await sql(`SELECT * FROM admin_users WHERE email = $1`, [
      email,
    ]);

    if (rows.length === 0) {
      return Response.json({ error: "Invalid credentials" }, { status: 401 });
    }

    const user = rows[0];

    // If placeholder hash, accept a default password for initial setup
    let isValid = false;
    if (user.password_hash.includes("placeholder")) {
      // First-time setup: accept "admin123" and rehash
      if (password === "admin123") {
        const newHash = await argon2.hash(password);
        await sql(`UPDATE admin_users SET password_hash = $1 WHERE id = $2`, [
          newHash,
          user.id,
        ]);
        isValid = true;
      }
    } else {
      isValid = await argon2.verify(user.password_hash, password);
    }

    if (!isValid) {
      return Response.json({ error: "Invalid credentials" }, { status: 401 });
    }

    // Simple token (in production use JWT)
    const token = Buffer.from(
      `${user.id}:${user.email}:${Date.now()}`,
    ).toString("base64");

    return Response.json({ token, email: user.email });
  } catch (error) {
    console.error("Login error:", error);
    return Response.json({ error: "Login failed" }, { status: 500 });
  }
}

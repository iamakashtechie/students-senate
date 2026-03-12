// path: app/api/admin/login/route.js
import { NextResponse } from "next/server";
import { createSession } from "@/lib/sessions";

// in-memory rate limiter: track failed attempts per IP
const attempts = new Map();
const MAX_ATTEMPTS = 5;
const WINDOW_MS = 15 * 60 * 1000; // 15 minutes

// returns the admin key if password matches
// the admin key is then used by frontend for subsequent requests
export async function POST(request) {
  const ip = request.headers.get("x-forwarded-for") ?? "unknown";
  const now = Date.now();

  const record = attempts.get(ip);
  if (record && now < record.resetAt) {
    if (record.count >= MAX_ATTEMPTS) {
      return NextResponse.json(
        { error: "too many attempts. try again in 15 minutes." },
        { status: 429 },
      );
    }
    record.count++;
  } else {
    attempts.set(ip, { count: 1, resetAt: now + WINDOW_MS });
  }

  const { password } = await request.json();

  if (!password || password !== process.env.ADMIN_PASSWORD) {
    return NextResponse.json({ error: "invalid password" }, { status: 401 });
  }

  // successful login — clear the counter for this IP
  attempts.delete(ip);
  const token = createSession();
  
  const response = NextResponse.json({ success: true });
  response.cookies.set({
    name: "admin_session",
    value: token,
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: 2 * 60 * 60, // 2 hours
    path: "/",
  });

  return response;
}

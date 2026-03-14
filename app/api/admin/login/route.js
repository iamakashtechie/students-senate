// path: app/api/admin/login/route.js
import { NextResponse } from "next/server";
import { createSessionToken } from "@/lib/sessions";

export async function POST(request) {
  const { password } = await request.json();

  if (!password || password !== process.env.ADMIN_PASSWORD) {
    return NextResponse.json({ error: "invalid password" }, { status: 401 });
  }

  const token = createSessionToken();

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

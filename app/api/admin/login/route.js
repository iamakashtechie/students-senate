// path: app/api/admin/login/route.js
import { NextResponse } from "next/server";

// returns the admin key if password matches
// the admin key is then used by frontend for subsequent requests
export async function POST(request) {
  const { password } = await request.json();

  if (!password || password !== process.env.ADMIN_PASSWORD) {
    return NextResponse.json({ error: "invalid password" }, { status: 401 });
  }

  return NextResponse.json({ key: process.env.ADMIN_KEY });
}

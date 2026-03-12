import { NextResponse } from "next/server";
import { deleteSession } from "@/lib/sessions";

export async function POST(request) {
  // support token from header (normal fetch) or body (sendBeacon on tab close)
  let token = request.headers.get("x-admin-key");
  if (!token) {
    try {
      const body = await request.json();
      token = body.token;
    } catch {
      // no valid body — ignore
    }
  }
  if (token) deleteSession(token);
  return NextResponse.json({ success: true });
}

import { NextResponse } from "next/server";
import { deleteSession } from "@/lib/sessions";

export async function POST(request) {
  const token = request.cookies.get("admin_session")?.value;
  
  if (token) deleteSession(token);

  const response = NextResponse.json({ success: true });
  response.cookies.delete("admin_session");
  
  return response;
}

// path: app/api/resolution/route.js
import { NextResponse } from "next/server";
import { getResolution, saveResolution } from "@/lib/dataStore";

export async function GET() {
  return NextResponse.json(getResolution());
}

export async function PUT(request) {
  const adminKey = request.headers.get("x-admin-key");
  if (adminKey !== process.env.ADMIN_KEY) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }

  const body = await request.json();

  if (!body.text) {
    return NextResponse.json({ error: "text is required" }, { status: 400 });
  }

  const resolution = {
    text: body.text,
    year: body.year || getResolution().year,
    updatedAt: new Date().toISOString(),
  };

  saveResolution(resolution);
  return NextResponse.json(resolution);
}

// path: app/api/resolution/route.js
import { NextResponse } from "next/server";
import { getResolution, saveResolution } from "@/lib/dataStore";
import { validateSession } from "@/lib/sessions";

export async function GET() {
  return NextResponse.json(await getResolution());
}

export async function PUT(request) {
  const adminKey = request.headers.get("x-admin-key");
  if (!validateSession(adminKey)) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }

  const body = await request.json();

  if (!body.text) {
    return NextResponse.json({ error: "text is required" }, { status: 400 });
  }

  const existing = await getResolution();
  const resolution = {
    text: body.text,
    year: body.year || existing.year,
    updatedAt: new Date().toISOString(),
  };

  try {
    await saveResolution(resolution);
  } catch {
    return NextResponse.json({ error: "failed to save resolution" }, { status: 500 });
  }
  return NextResponse.json(resolution);
}

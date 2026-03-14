// path: app/api/members/[id]/route.js
import { NextResponse } from "next/server";
import { deleteMember } from "@/lib/dataStore";
import { validateSession } from "@/lib/sessions";

// delete a member by id from any section
export async function DELETE(request, { params }) {
  const { id } = await params;

  try {
    const deleted = await deleteMember(id);
    if (!deleted) {
      return NextResponse.json({ error: "not found" }, { status: 404 });
    }
    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Failed to delete member:", err);
    return NextResponse.json({ error: "failed to delete" }, { status: 500 });
  }
}

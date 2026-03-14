// path: app/api/notifications/[id]/route.js
import { NextResponse } from "next/server";
import { deleteNotification, updateNotification } from "@/lib/dataStore";
import { validateSession } from "@/lib/sessions";

// delete a notification by id
export async function DELETE(request, { params }) {
  const { id } = await params;

  try {
    const deleted = await deleteNotification(id);
    if (!deleted) {
      return NextResponse.json({ error: "not found" }, { status: 404 });
    }
    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Failed to delete notification:", err);
    return NextResponse.json({ error: "failed to delete" }, { status: 500 });
  }
}

// patch to update a notification (toggle important, etc.)
export async function PATCH(request, { params }) {
  const { id } = await params;
  const body = await request.json();

  const { title, description, date, important } = body;
  const updates = {};
  if (title !== undefined) updates.title = title;
  if (description !== undefined) updates.description = description;
  if (date !== undefined) updates.date = date;
  if (important !== undefined) updates.important = important;

  try {
    const updated = await updateNotification(id, updates);
    if (!updated) {
      return NextResponse.json({ error: "not found" }, { status: 404 });
    }
    return NextResponse.json(updated);
  } catch (err) {
    console.error("Failed to update notification:", err);
    return NextResponse.json({ error: "failed to update" }, { status: 500 });
  }
}

// path: app/api/notifications/[id]/route.js
import { NextResponse } from "next/server";
import { getNotifications, saveNotifications } from "@/lib/dataStore";
import { validateSession } from "@/lib/sessions";

// delete a notification by id
export async function DELETE(request, { params }) {
  const { id } = await params;
  let notifications = await getNotifications();
  const index = notifications.findIndex((n) => n.id === id);

  if (index === -1) {
    return NextResponse.json({ error: "not found" }, { status: 404 });
  }

  // remove the notification
  notifications.splice(index, 1);
  try {
    await saveNotifications(notifications);
  } catch {
    return NextResponse.json({ error: "failed to save data" }, { status: 500 });
  }

  return NextResponse.json({ success: true });
}

// patch to update a notification (toggle important, etc.)
export async function PATCH(request, { params }) {
  const { id } = await params;
  const body = await request.json();
  let notifications = await getNotifications();
  const index = notifications.findIndex((n) => n.id === id);

  if (index === -1) {
    return NextResponse.json({ error: "not found" }, { status: 404 });
  }

  const { title, description, date, important } = body;
  const updates = {};
  if (title !== undefined) updates.title = title;
  if (description !== undefined) updates.description = description;
  if (date !== undefined) updates.date = date;
  if (important !== undefined) updates.important = important;

  notifications[index] = { ...notifications[index], ...updates };
  try {
    await saveNotifications(notifications);
  } catch {
    return NextResponse.json({ error: "failed to save data" }, { status: 500 });
  }

  return NextResponse.json(notifications[index]);
}

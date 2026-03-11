// path: app/api/notifications/[id]/route.js
import { NextResponse } from "next/server";
import { getNotifications, saveNotifications } from "@/lib/dataStore";

// delete a notification by id
export async function DELETE(request, { params }) {
  const adminKey = request.headers.get("x-admin-key");
  if (adminKey !== process.env.ADMIN_KEY) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }

  const { id } = params;
  let notifications = getNotifications();
  const index = notifications.findIndex((n) => n.id === id);

  if (index === -1) {
    return NextResponse.json({ error: "not found" }, { status: 404 });
  }

  // remove the notification
  notifications.splice(index, 1);
  saveNotifications(notifications);

  return NextResponse.json({ success: true });
}

// patch to update a notification (toggle important, etc.)
export async function PATCH(request, { params }) {
  const adminKey = request.headers.get("x-admin-key");
  if (adminKey !== process.env.ADMIN_KEY) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }

  const { id } = params;
  const body = await request.json();
  let notifications = getNotifications();
  const index = notifications.findIndex((n) => n.id === id);

  if (index === -1) {
    return NextResponse.json({ error: "not found" }, { status: 404 });
  }

  notifications[index] = { ...notifications[index], ...body };
  saveNotifications(notifications);

  return NextResponse.json(notifications[index]);
}

// path: app/api/notifications/route.js
import { NextResponse } from "next/server";
import { v4 as uuidv4 } from "uuid";
import { getNotifications, saveNotifications } from "@/lib/dataStore";

// get all notifications sorted newest first
export async function GET() {
  const notifications = getNotifications();
  const sorted = [...notifications].sort(
    (a, b) => new Date(b.date) - new Date(a.date),
  );
  return NextResponse.json(sorted);
}

// create a new notification
// supports multipart form data for file attachments
export async function POST(request) {
  const adminKey = request.headers.get("x-admin-key");
  if (adminKey !== process.env.ADMIN_KEY) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }

  const formData = await request.formData();

  const title = formData.get("title");
  const description = formData.get("description");
  const date = formData.get("date");
  const important = formData.get("important") === "true";

  if (!title || !date) {
    return NextResponse.json(
      { error: "title and date are required" },
      { status: 400 },
    );
  }

  const attachments = [];

  // process uploaded files
  const files = formData.getAll("files");
  for (const file of files) {
    if (file && file.name) {
      const buffer = Buffer.from(await file.arrayBuffer());
      const ext = file.name.split(".").pop().toLowerCase();
      const filename = `${uuidv4()}.${ext}`;
      const filePath = `public/uploads/${filename}`;

      // write file to public directory
      const fs = await import("fs");
      const path = await import("path");
      const dir = path.join(process.cwd(), "public", "uploads");
      if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
      fs.writeFileSync(path.join(dir, filename), buffer);

      attachments.push({
        name: file.name,
        url: `/uploads/${filename}`,
        type: ["pdf"].includes(ext) ? "pdf" : "image",
      });
    }
  }

  const notification = {
    id: `notif-${uuidv4()}`,
    title,
    description: description || "",
    date,
    important,
    attachments,
  };

  const notifications = getNotifications();
  notifications.unshift(notification);
  saveNotifications(notifications);

  return NextResponse.json(notification, { status: 201 });
}

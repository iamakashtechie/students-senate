import connectDB from "./db";
import { Notification, Member, Resolution } from "./models";

// helper to convert Mongoose documents to plain JS objects for Next.js Server Components
const lean = (doc) => JSON.parse(JSON.stringify(doc));

// ── Notifications ──────────────────────────────────────────────

export async function getNotifications() {
  await connectDB();
  const notifs = await Notification.find({}).sort({ date: -1 }).lean();
  return notifs.map(lean);
}

export async function addNotification(notification) {
  await connectDB();
  const created = await Notification.create(notification);
  return lean(created.toObject());
}

export async function deleteNotification(id) {
  await connectDB();
  const result = await Notification.deleteOne({ id });
  return result.deletedCount > 0;
}

export async function updateNotification(id, updates) {
  await connectDB();
  const updated = await Notification.findOneAndUpdate(
    { id },
    { $set: updates },
    { new: true, lean: true }
  );
  return updated ? lean(updated) : null;
}

// ── Members ────────────────────────────────────────────────────

export async function getMembers() {
  await connectDB();
  const allMembers = await Member.find({}).lean();

  // group them back into the shape the frontend/API expects
  const grouped = {
    professors: [],
    executiveSecretariat: [],
    generalCouncil: [],
  };

  for (const m of allMembers) {
    if (!m.section || !grouped[m.section]) continue;
    grouped[m.section].push(lean(m));
  }

  return grouped;
}

export async function addMember(member) {
  await connectDB();
  const created = await Member.create(member);
  return lean(created.toObject());
}

export async function deleteMember(id) {
  await connectDB();
  const result = await Member.deleteOne({ id });
  return result.deletedCount > 0;
}

export async function updateMember(id, updates) {
  await connectDB();
  const updated = await Member.findOneAndUpdate(
    { id },
    { $set: updates },
    { new: true, lean: true }
  );
  return updated ? lean(updated) : null;
}

// Keep saveMembers for backward compatibility with API routes that pass the full object
export async function saveMembers(membersObj) {
  await connectDB();
  
  const flatMembers = [
    ...(membersObj.professors || []).map(m => ({ ...m, section: "professors" })),
    ...(membersObj.executiveSecretariat || []).map(m => ({ ...m, section: "executiveSecretariat" })),
    ...(membersObj.generalCouncil || []).map(m => ({ ...m, section: "generalCouncil" })),
  ];

  await Member.deleteMany({});
  if (flatMembers.length > 0) {
    // Strip any MongoDB _id fields from the data to prevent duplicate key errors
    const cleaned = flatMembers.map(({ _id, __v, ...rest }) => rest);
    await Member.insertMany(cleaned);
  }
}

// ── Resolution ─────────────────────────────────────────────────

export async function getResolution() {
  await connectDB();
  const res = await Resolution.findOne({}).lean();
  if (!res) {
    return { text: "", year: "2025-26", updatedAt: null };
  }
  return lean(res);
}

export async function saveResolution(resolution) {
  await connectDB();
  const existing = await Resolution.findOne({});
  if (existing) {
    existing.text = resolution.text;
    existing.year = resolution.year;
    await existing.save();
  } else {
    await Resolution.create(resolution);
  }
}

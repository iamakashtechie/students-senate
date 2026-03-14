import fs from "fs";
import path from "path"; 
import mongoose from "mongoose";
import dns from "dns";

// Bypass local ISP DNS blocks for MongoDB SRV records
dns.setServers(['8.8.8.8', '8.8.4.4']);

// We'll run this via node locally, so we need to load .env.local manually
import dotenv from "dotenv";
dotenv.config({ path: ".env.local" });

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  console.error("❌ MONGODB_URI is not set in .env.local");
  process.exit(1);
}

// Schemas copied here for the standalone script
const NotificationSchema = new mongoose.Schema({
  id: { type: String, required: true },
  title: String,
  description: String,
  date: String,
  important: Boolean,
  attachments: Array,
});

const MemberSchema = new mongoose.Schema({
  id: { type: String, required: true },
  name: String,
  rollNo: String,
  role: String,
  department: String,
  year: String,
  linkedIn: String,
  profilePic: String,
  section: String,
});

const ResolutionSchema = new mongoose.Schema({
  text: String,
  year: String,
});

const Notification = mongoose.models.Notification || mongoose.model("Notification", NotificationSchema);
const Member = mongoose.models.Member || mongoose.model("Member", MemberSchema);
const Resolution = mongoose.models.Resolution || mongoose.model("Resolution", ResolutionSchema);

async function run() {
  console.log("Connecting to MongoDB Atlas...");
  await mongoose.connect(MONGODB_URI);
  console.log("✅ Connected");

  const dataDir = path.join(process.cwd(), "data");

  // 1. Migrate Notifications
  console.log("\nMigrating Notifications...");
  try {
    const notifs = JSON.parse(fs.readFileSync(path.join(dataDir, "notifications.json"), "utf8"));
    await Notification.deleteMany({});
    if (notifs.length > 0) await Notification.insertMany(notifs);
    console.log(`✅ Migrated ${notifs.length} notifications.`);
  } catch (err) {
    console.log("⚠️ Could not migrate notifications:", err.message);
  }

  // 2. Migrate Members
  console.log("\nMigrating Members...");
  try {
    const membersObj = JSON.parse(fs.readFileSync(path.join(dataDir, "members.json"), "utf8"));
    const flatMembers = [
      ...(membersObj.professors || []).map(m => ({ ...m, section: "professors" })),
      ...(membersObj.executiveSecretariat || []).map(m => ({ ...m, section: "executiveSecretariat" })),
      ...(membersObj.generalCouncil || []).map(m => ({ ...m, section: "generalCouncil" })),
    ];
    await Member.deleteMany({});
    if (flatMembers.length > 0) await Member.insertMany(flatMembers);
    console.log(`✅ Migrated ${flatMembers.length} members.`);
  } catch (err) {
    console.log("⚠️ Could not migrate members:", err.message);
  }

  // 3. Migrate Resolution
  console.log("\nMigrating Resolution...");
  try {
    const res = JSON.parse(fs.readFileSync(path.join(dataDir, "resolution.json"), "utf8"));
    await Resolution.deleteMany({});
    await Resolution.create(res);
    console.log(`✅ Migrated resolution (${res.year}).`);
  } catch (err) {
    console.log("⚠️ Could not migrate resolution:", err.message);
  }

  console.log("\n🎉 Migration Complete! You can now safely push to Vercel.");
  process.exit(0);
}

run();

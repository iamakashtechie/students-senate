import mongoose from "mongoose";

// Notification Schema
const NotificationSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true }, // Keep existing string ID for frontend compatibility
  title: { type: String, required: true },
  description: { type: String, default: "" },
  date: { type: String, required: true },
  important: { type: Boolean, default: false },
  attachments: { type: Array, default: [] },
}, { timestamps: true });

// Member Schema
const MemberSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  rollNo: { type: String, default: "" },
  role: { type: String, default: "" },
  department: { type: String, required: true },
  year: { type: String, default: "" },
  linkedIn: { type: String, default: "" },
  profilePic: { type: String, default: "" },
  section: { 
    type: String, 
    required: true,
    enum: ["professors", "executiveSecretariat", "generalCouncil"]
  }
}, { timestamps: true });

// Resolution Schema (Singleton, we'll just have one document)
const ResolutionSchema = new mongoose.Schema({
  text: { type: String, default: "" },
  year: { type: String, default: "2025-26" },
}, { timestamps: true });

// Check if models exist before compiling to avoid overwrite errors in Next.js hot reload
export const Notification = mongoose.models.Notification || mongoose.model("Notification", NotificationSchema);
export const Member = mongoose.models.Member || mongoose.model("Member", MemberSchema);
export const Resolution = mongoose.models.Resolution || mongoose.model("Resolution", ResolutionSchema);

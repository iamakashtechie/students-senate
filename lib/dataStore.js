import fs from "fs";
import path from "path";

// base directory for json data files
const DATA_DIR = path.join(process.cwd(), "data");

// ensure data directory exists
if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}

// read json file; returns parsed object or fallback if file missing
function readJson(filename, fallback) {
  const filePath = path.join(DATA_DIR, filename);
  if (!fs.existsSync(filePath)) return fallback;
  try {
    return JSON.parse(fs.readFileSync(filePath, "utf-8"));
  } catch {
    return fallback;
  }
}

// write object to json file
function writeJson(filename, data) {
  const filePath = path.join(DATA_DIR, filename);
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2), "utf-8");
}

// notifications
export function getNotifications() {
  return readJson("notifications.json", []);
}

export function saveNotifications(notifications) {
  writeJson("notifications.json", notifications);
}

// members
export function getMembers() {
  return readJson("members.json", {
    professors: [],
    executiveSecretariat: [],
    generalCouncil: [],
  });
}

export function saveMembers(members) {
  writeJson("members.json", members);
}

// resolution
export function getResolution() {
  return readJson("resolution.json", {
    text: "",
    year: "2025-26",
    updatedAt: null,
  });
}

export function saveResolution(resolution) {
  writeJson("resolution.json", resolution);
}

import fs from "fs";
import path from "path";

// base directory for json data files
const DATA_DIR = path.join(process.cwd(), "data");

// ensure data directory exists
if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}

// read json file; returns parsed object or fallback if file missing
async function readJson(filename, fallback) {
  const filePath = path.join(DATA_DIR, filename);
  try {
    return JSON.parse(await fs.promises.readFile(filePath, "utf-8"));
  } catch {
    return fallback;
  }
}

// write object to json file
async function writeJson(filename, data) {
  const filePath = path.join(DATA_DIR, filename);
  try {
    await fs.promises.writeFile(filePath, JSON.stringify(data, null, 2), "utf-8");
  } catch (err) {
    throw new Error(`Failed to write ${filename}: ${err.message}`);
  }
}

// notifications
export async function getNotifications() {
  return readJson("notifications.json", []);
}

export async function saveNotifications(notifications) {
  await writeJson("notifications.json", notifications);
}

// members
export async function getMembers() {
  return readJson("members.json", {
    professors: [],
    executiveSecretariat: [],
    generalCouncil: [],
  });
}

export async function saveMembers(members) {
  await writeJson("members.json", members);
}

// resolution
export async function getResolution() {
  return readJson("resolution.json", {
    text: "",
    year: "2025-26",
    updatedAt: null,
  });
}

export async function saveResolution(resolution) {
  await writeJson("resolution.json", resolution);
}

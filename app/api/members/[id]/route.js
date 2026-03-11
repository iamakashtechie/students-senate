// path: app/api/members/[id]/route.js
import { NextResponse } from "next/server";
import { getMembers, saveMembers } from "@/lib/dataStore";

// delete a member by id from any section
export async function DELETE(request, { params }) {
  const adminKey = request.headers.get("x-admin-key");
  if (adminKey !== process.env.ADMIN_KEY) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }

  const { id } = params;
  const members = getMembers();

  let found = false;

  for (const section of [
    "professors",
    "executiveSecretariat",
    "generalCouncil",
  ]) {
    const index = members[section].findIndex((m) => m.id === id);
    if (index !== -1) {
      members[section].splice(index, 1);
      found = true;
      break;
    }
  }

  if (!found) {
    return NextResponse.json({ error: "not found" }, { status: 404 });
  }

  saveMembers(members);
  return NextResponse.json({ success: true });
}

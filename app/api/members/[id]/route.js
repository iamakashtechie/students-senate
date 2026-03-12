// path: app/api/members/[id]/route.js
import { NextResponse } from "next/server";
import { getMembers, saveMembers } from "@/lib/dataStore";
import { validateSession } from "@/lib/sessions";

// delete a member by id from any section
export async function DELETE(request, { params }) {
  const adminKey = request.headers.get("x-admin-key");
  if (!validateSession(adminKey)) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }

  const { id } = await params;
  const members = await getMembers();

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

  try {
    await saveMembers(members);
  } catch {
    return NextResponse.json({ error: "failed to save data" }, { status: 500 });
  }
  return NextResponse.json({ success: true });
}

// path: app/api/members/route.js
import { NextResponse } from "next/server";
import { v4 as uuidv4 } from "uuid";
import { getMembers, saveMembers } from "@/lib/dataStore";
import { validateSession } from "@/lib/sessions";

export async function GET() {
  return NextResponse.json(await getMembers());
}

// add a new member to any section
export async function POST(request) {
  const adminKey = request.headers.get("x-admin-key");
  if (!validateSession(adminKey)) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }

  const body = await request.json();
  const {
    name,
    rollNo,
    role,
    department,
    year,
    linkedIn,
    profilePic,
    section,
  } = body;

  if (!name || !department) {
    return NextResponse.json(
      { error: "name and department are required" },
      { status: 400 },
    );
  }

  const newMember = {
    id: `member-${uuidv4()}`,
    name,
    rollNo: rollNo || "",
    role: role || "",
    department: department || "",
    year: year || "",
    linkedIn: linkedIn || "",
    profilePic: profilePic || "",
  };

  const members = await getMembers();

  // section determines which list to append to
  if (section === "professors") {
    members.professors.push(newMember);
  } else if (section === "executiveSecretariat") {
    members.executiveSecretariat.push(newMember);
  } else {
    members.generalCouncil.push(newMember);
  }

  try {
    await saveMembers(members);
  } catch {
    return NextResponse.json({ error: "failed to save member" }, { status: 500 });
  }
  return NextResponse.json(newMember, { status: 201 });
}

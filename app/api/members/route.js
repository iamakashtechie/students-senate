// path: app/api/members/route.js
import { NextResponse } from "next/server";
import { v4 as uuidv4 } from "uuid";
import { getMembers, addMember } from "@/lib/dataStore";
import { validateSession } from "@/lib/sessions";

export async function GET() {
  return NextResponse.json(await getMembers());
}

// add a new member to any section
export async function POST(request) {
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
    section: section || "generalCouncil",
  };

  try {
    const created = await addMember(newMember);
    return NextResponse.json(created, { status: 201 });
  } catch (err) {
    console.error("Failed to save member:", err);
    return NextResponse.json({ error: "failed to save member" }, { status: 500 });
  }
}

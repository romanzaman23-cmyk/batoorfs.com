import { NextRequest, NextResponse } from "next/server";
import { getSession } from "@/lib/auth";
import { setSettings } from "@/lib/settings";

export async function GET() {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { getSettings } = await import("@/lib/settings");
  const settings = await getSettings();
  return NextResponse.json(settings);
}

export async function PUT(req: NextRequest) {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const data = await req.json();
  await setSettings(data);
  return NextResponse.json({ success: true });
}

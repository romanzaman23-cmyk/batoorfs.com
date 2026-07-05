import { NextResponse } from "next/server";
import { attachSessionCookie, createSessionToken, destroySession } from "@/lib/auth";

const COOKIE_NAME = "admin_session";

export async function POST() {
  await destroySession();
  const response = NextResponse.json({ success: true });
  response.cookies.delete(COOKIE_NAME);
  return response;
}

import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import {
  attachSessionCookie,
  createSessionToken,
  getAdminCredentials,
  matchesEnvAdmin,
  verifyPassword,
} from "@/lib/auth";

export async function POST(req: NextRequest) {
  try {
    const { email, password } = await req.json();

    if (!email || !password) {
      return NextResponse.json(
        { error: "Email and password required" },
        { status: 400 }
      );
    }

    const normalizedEmail = email.trim().toLowerCase();

    let adminId: string | null = null;
    let sessionEmail: string | null = null;

    try {
    const admin = await prisma.admin.findFirst({
        where: { email: normalizedEmail },
      });

      if (admin && (await verifyPassword(password, admin.passwordHash))) {
        adminId = admin.id;
        sessionEmail = admin.email;
      }
    } catch {
      // Database unavailable on serverless — fall through to env credentials
    }

    if (!adminId && matchesEnvAdmin(normalizedEmail, password)) {
      adminId = "env-admin";
      sessionEmail = getAdminCredentials().email;
    }

    if (!adminId || !sessionEmail) {
      return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
    }

    const token = await createSessionToken(adminId, sessionEmail);
    const response = NextResponse.json({ success: true });
    attachSessionCookie(response, token);
    return response;
  } catch (error) {
    console.error("Login error:", error);
    return NextResponse.json({ error: "Login failed" }, { status: 500 });
  }
}

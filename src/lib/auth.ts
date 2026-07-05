import { SignJWT, jwtVerify } from "jose";
import { cookies } from "next/headers";
import type { NextResponse } from "next/server";
import bcrypt from "bcryptjs";

const COOKIE_NAME = "admin_session";

function getSecret() {
  return new TextEncoder().encode(
    process.env.JWT_SECRET ?? "fallback-secret-change-me"
  );
}

export function getAdminCredentials() {
  return {
    email: process.env.ADMIN_EMAIL ?? "admin@catfit.in",
    password: process.env.ADMIN_PASSWORD ?? "admin123",
  };
}

export async function hashPassword(password: string) {
  return bcrypt.hash(password, 10);
}

export async function verifyPassword(password: string, hash: string) {
  return bcrypt.compare(password, hash);
}

export async function createSessionToken(adminId: string, email: string) {
  return new SignJWT({ adminId, email })
    .setProtectedHeader({ alg: "HS256" })
    .setExpirationTime("7d")
    .sign(getSecret());
}

export function getSessionCookieOptions() {
  return {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax" as const,
    path: "/",
    maxAge: 60 * 60 * 24 * 7,
  };
}

export function attachSessionCookie(response: NextResponse, token: string) {
  response.cookies.set(COOKIE_NAME, token, getSessionCookieOptions());
  return response;
}

export async function createSession(adminId: string, email: string) {
  const token = await createSessionToken(adminId, email);
  const cookieStore = await cookies();
  cookieStore.set(COOKIE_NAME, token, getSessionCookieOptions());
}

export async function destroySession() {
  const cookieStore = await cookies();
  cookieStore.delete(COOKIE_NAME);
}

export async function getSession() {
  const cookieStore = await cookies();
  const token = cookieStore.get(COOKIE_NAME)?.value;
  if (!token) return null;

  try {
    const { payload } = await jwtVerify(token, getSecret());
    return {
      adminId: payload.adminId as string,
      email: payload.email as string,
    };
  } catch {
    return null;
  }
}

export async function requireAdmin() {
  const session = await getSession();
  if (!session) {
    throw new Error("Unauthorized");
  }
  return session;
}

export function matchesEnvAdmin(email: string, password: string) {
  const creds = getAdminCredentials();
  return (
    email.trim().toLowerCase() === creds.email.trim().toLowerCase() &&
    password === creds.password
  );
}

import { prisma } from "@/lib/db";

export async function safeDbCount(
  query: () => Promise<number>,
  fallback = 0
): Promise<number> {
  try {
    return await query();
  } catch {
    return fallback;
  }
}

export async function safeDbQuery<T>(
  query: () => Promise<T>,
  fallback: T
): Promise<T> {
  try {
    return await query();
  } catch {
    return fallback;
  }
}

export { prisma };

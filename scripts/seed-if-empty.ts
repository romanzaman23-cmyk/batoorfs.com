import { PrismaClient } from "@prisma/client";
import { execSync } from "node:child_process";
import bcrypt from "bcryptjs";

if (!process.env.DATABASE_URL) {
  process.env.DATABASE_URL = "file:./prisma/dev.db";
}

const prisma = new PrismaClient();

async function ensureAdmin() {
  const email = process.env.ADMIN_EMAIL ?? "admin@catfit.in";
  const password = process.env.ADMIN_PASSWORD ?? "admin123";

  await prisma.admin.upsert({
    where: { email },
    update: {},
    create: {
      email,
      passwordHash: await bcrypt.hash(password, 10),
      name: "Admin",
    },
  });
}

async function main() {
  const menuCount = await prisma.menuItem.count();

  if (menuCount === 0) {
    console.log("Empty database — running full seed...");
    execSync("npx tsx prisma/seed.ts", { stdio: "inherit", env: process.env });
  } else {
    console.log("Ensuring admin user exists...");
    await ensureAdmin();
  }
}

main()
  .catch((err) => {
    console.error(err);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());

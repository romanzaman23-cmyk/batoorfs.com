import { PrismaClient } from "@prisma/client";
import { execSync } from "node:child_process";

if (!process.env.DATABASE_URL) {
  process.env.DATABASE_URL = "file:./prisma/dev.db";
}

const prisma = new PrismaClient();

async function main() {
  const count = await prisma.menuItem.count();
  if (count === 0) {
    console.log("Empty database — running seed...");
    execSync("npx tsx prisma/seed.ts", { stdio: "inherit", env: process.env });
  } else {
    console.log("Database already seeded — skipping.");
  }
}

main()
  .catch((err) => {
    console.error(err);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());

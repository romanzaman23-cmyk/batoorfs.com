import { execSync } from "node:child_process";

if (!process.env.DATABASE_URL) {
  process.env.DATABASE_URL = process.env.VERCEL
    ? "file:/tmp/data.db"
    : "file:./prisma/dev.db";
}

const run = (cmd) => execSync(cmd, { stdio: "inherit", env: process.env });

run("npx prisma generate");
run("npx prisma migrate deploy");
run("npx tsx scripts/seed-if-empty.ts");
run("npx next build");

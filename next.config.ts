import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  env: {
    DATABASE_URL: process.env.DATABASE_URL ?? "file:./prisma/dev.db",
    JWT_SECRET: process.env.JWT_SECRET ?? "change-me-in-production",
  },
};

export default nextConfig;

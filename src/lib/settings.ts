import { prisma } from "./db";

export async function getSettings() {
  const rows = await prisma.siteSetting.findMany();
  return Object.fromEntries(rows.map((r) => [r.key, r.value]));
}

export async function getSetting(key: string, fallback = "") {
  const row = await prisma.siteSetting.findUnique({ where: { key } });
  return row?.value ?? fallback;
}

export async function setSetting(key: string, value: string) {
  return prisma.siteSetting.upsert({
    where: { key },
    update: { value },
    create: { key, value },
  });
}

export async function setSettings(data: Record<string, string>) {
  await Promise.all(
    Object.entries(data).map(([key, value]) => setSetting(key, value))
  );
}

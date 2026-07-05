import { defaultSettings } from "./default-data";
import { prisma } from "./db";

export async function getSettings() {
  try {
    const rows = await prisma.siteSetting.findMany();
    const dbSettings = Object.fromEntries(rows.map((r) => [r.key, r.value]));
    if (Object.keys(dbSettings).length === 0) return defaultSettings;
    return { ...defaultSettings, ...dbSettings };
  } catch {
    return defaultSettings;
  }
}

export async function getSetting(key: string, fallback = "") {
  try {
    const row = await prisma.siteSetting.findUnique({ where: { key } });
    return row?.value ?? defaultSettings[key] ?? fallback;
  } catch {
    return defaultSettings[key] ?? fallback;
  }
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

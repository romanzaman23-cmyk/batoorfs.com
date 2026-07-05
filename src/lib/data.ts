import {
  defaultInstitutions,
  defaultMenuItems,
  defaultPanelists,
  defaultServices,
  defaultStats,
  defaultTestimonials,
  type InstitutionData,
  type MenuItemData,
  type PanelistData,
  type ServiceData,
  type StatData,
  type TestimonialData,
} from "./default-data";
import { prisma } from "./db";

async function safeQuery<T>(query: () => Promise<T>, fallback: T): Promise<T> {
  try {
    const result = await query();
    if (Array.isArray(result) && result.length === 0) return fallback;
    return result;
  } catch {
    return fallback;
  }
}

export async function getMenuItems(): Promise<MenuItemData[]> {
  return safeQuery(
    () =>
      prisma.menuItem.findMany({
        where: { parentId: null },
        include: {
          children: {
            orderBy: { sortOrder: "asc" },
            include: {
              children: { orderBy: { sortOrder: "asc" } },
            },
          },
        },
        orderBy: { sortOrder: "asc" },
      }),
    defaultMenuItems
  );
}

export async function getStats(): Promise<StatData[]> {
  return safeQuery(
    () => prisma.stat.findMany({ orderBy: { sortOrder: "asc" } }),
    defaultStats
  );
}

export async function getServices(category?: string): Promise<ServiceData[]> {
  const services = await safeQuery(
    () =>
      prisma.service.findMany({
        where: category
          ? { category, published: true }
          : { published: true },
        orderBy: { sortOrder: "asc" },
      }),
    category
      ? defaultServices.filter((s) => s.category === category)
      : defaultServices
  );
  return services;
}

export async function getServiceBySlug(slug: string): Promise<ServiceData | null> {
  try {
    const service = await prisma.service.findUnique({ where: { slug } });
    if (service?.published) return service;
  } catch {
    // fall through to defaults
  }
  return defaultServices.find((s) => s.slug === slug && s.published) ?? null;
}

export async function getPanelists(limit?: number): Promise<PanelistData[]> {
  const panelists = await safeQuery(
    () =>
      prisma.panelist.findMany({
        where: { published: true },
        orderBy: { sortOrder: "asc" },
        ...(limit ? { take: limit } : {}),
      }),
    limit ? defaultPanelists.slice(0, limit) : defaultPanelists
  );
  return panelists;
}

export async function getPanelistBySlug(slug: string): Promise<PanelistData | null> {
  try {
    const panelist = await prisma.panelist.findUnique({ where: { slug } });
    if (panelist?.published) return panelist;
  } catch {
    // fall through
  }
  return defaultPanelists.find((p) => p.slug === slug && p.published) ?? null;
}

export async function getTestimonials(): Promise<TestimonialData[]> {
  return safeQuery(
    () =>
      prisma.testimonial.findMany({
        where: { published: true },
        orderBy: { sortOrder: "asc" },
      }),
    defaultTestimonials
  );
}

export async function getInstitutions(): Promise<InstitutionData[]> {
  return safeQuery(
    () =>
      prisma.institution.findMany({
        where: { published: true },
        orderBy: { sortOrder: "asc" },
      }),
    defaultInstitutions
  );
}

export async function getAdminList<T>(
  query: () => Promise<T[]>,
  fallback: T[] = []
): Promise<T[]> {
  return safeQuery(query, fallback);
}

import { prisma } from "@/lib/db";
import { defaultMenuItems } from "@/lib/default-menu";
import { getSettings } from "@/lib/settings";
import HeaderClient from "./HeaderClient";

export default async function Header() {
  const [settings, dbMenuItems] = await Promise.all([
    getSettings(),
    prisma.menuItem
      .findMany({
        where: { parentId: null },
        include: {
          children: {
            orderBy: { sortOrder: "asc" },
            include: {
              children: {
                orderBy: { sortOrder: "asc" },
              },
            },
          },
        },
        orderBy: { sortOrder: "asc" },
      })
      .catch(() => []),
  ]);

  const menuItems = dbMenuItems.length > 0 ? dbMenuItems : defaultMenuItems;

  return (
    <HeaderClient
      siteName={settings.site_name ?? "CATFIT"}
      tagline={settings.site_tagline ?? "MIND MATTERS"}
      menuItems={menuItems}
    />
  );
}

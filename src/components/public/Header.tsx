import { getMenuItems } from "@/lib/data";
import { getSettings } from "@/lib/settings";
import HeaderClient from "./HeaderClient";

export default async function Header() {
  const [settings, menuItems] = await Promise.all([getSettings(), getMenuItems()]);

  return (
    <HeaderClient
      siteName={settings.site_name ?? "CATFIT"}
      tagline={settings.site_tagline ?? "MIND MATTERS"}
      menuItems={menuItems}
    />
  );
}

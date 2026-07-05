import { redirect } from "next/navigation";
import { getSession } from "@/lib/auth";
import { getAdminList } from "@/lib/data";
import { defaultMenuItems } from "@/lib/default-data";
import { prisma } from "@/lib/db";
import CrudTable from "@/components/admin/CrudTable";

function flattenMenu(items: typeof defaultMenuItems) {
  const flat: { id: string; title: string; href: string | null; parentId: string | null; sortOrder: number }[] = [];
  let order = 0;
  for (const item of items) {
    flat.push({ id: item.id, title: item.title, href: item.href, parentId: null, sortOrder: order++ });
    for (const child of item.children) {
      flat.push({ id: child.id, title: child.title, href: child.href, parentId: item.id, sortOrder: order++ });
      for (const sub of child.children) {
        flat.push({ id: sub.id, title: sub.title, href: sub.href, parentId: child.id, sortOrder: order++ });
      }
    }
  }
  return flat;
}

export default async function AdminMenuPage() {
  const session = await getSession();
  if (!session) redirect("/admin/login");

  const items = await getAdminList(
    () => prisma.menuItem.findMany({ orderBy: { sortOrder: "asc" } }),
    flattenMenu(defaultMenuItems)
  );

  return (
    <div className="p-8">
      <CrudTable
        title="Navigation Menu"
        resource="menu"
        columns={[
          { key: "title", label: "Title" },
          { key: "href", label: "Link (URL)" },
          { key: "parentId", label: "Parent ID (for submenu)" },
          { key: "sortOrder", label: "Order", type: "number" },
        ]}
        initialItems={items}
        newItemDefaults={{ title: "New Item", href: "/", sortOrder: 0 }}
      />
    </div>
  );
}

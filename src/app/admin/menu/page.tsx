import { redirect } from "next/navigation";
import { getSession } from "@/lib/auth";
import { prisma } from "@/lib/db";
import CrudTable from "@/components/admin/CrudTable";

export default async function AdminMenuPage() {
  const session = await getSession();
  if (!session) redirect("/admin/login");

  const items = await prisma.menuItem.findMany({ orderBy: { sortOrder: "asc" } });

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

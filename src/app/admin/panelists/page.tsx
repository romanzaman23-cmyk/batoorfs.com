import { redirect } from "next/navigation";
import { getSession } from "@/lib/auth";
import { getAdminList } from "@/lib/data";
import { defaultPanelists } from "@/lib/default-data";
import { prisma } from "@/lib/db";
import CrudTable from "@/components/admin/CrudTable";

export default async function AdminPanelistsPage() {
  const session = await getSession();
  if (!session) redirect("/admin/login");

  const panelists = await getAdminList(
    () => prisma.panelist.findMany({ orderBy: { sortOrder: "asc" } }),
    defaultPanelists
  );

  return (
    <div className="p-8">
      <CrudTable
        title="Panelists"
        resource="panelists"
        columns={[
          { key: "name", label: "Name" },
          { key: "slug", label: "URL Slug" },
          { key: "designation", label: "Designation", type: "textarea" },
          { key: "bio", label: "Bio", type: "textarea" },
          { key: "imageUrl", label: "Image URL" },
          { key: "sortOrder", label: "Order", type: "number" },
          { key: "published", label: "Published", type: "checkbox" },
        ]}
        initialItems={panelists}
        newItemDefaults={{
          name: "New Panelist",
          slug: "new-panelist",
          designation: "",
          bio: "",
          imageUrl: "",
          sortOrder: 0,
          published: true,
        }}
      />
    </div>
  );
}

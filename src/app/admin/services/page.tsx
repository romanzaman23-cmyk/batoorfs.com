import { redirect } from "next/navigation";
import { getSession } from "@/lib/auth";
import { getAdminList } from "@/lib/data";
import { defaultServices } from "@/lib/default-data";
import { prisma } from "@/lib/db";
import CrudTable from "@/components/admin/CrudTable";

export default async function AdminServicesPage() {
  const session = await getSession();
  if (!session) redirect("/admin/login");

  const services = await getAdminList(
    () => prisma.service.findMany({ orderBy: { sortOrder: "asc" } }),
    defaultServices
  );

  return (
    <div className="p-8">
      <CrudTable
        title="Services (Security & M.A.S.T.S)"
        resource="services"
        columns={[
          { key: "title", label: "Title" },
          { key: "slug", label: "URL Slug" },
          { key: "category", label: "Category", type: "select", options: [
            { value: "security", label: "Security" },
            { value: "masts", label: "M.A.S.T.S" },
          ]},
          { key: "description", label: "Description", type: "textarea" },
          { key: "content", label: "Full Content", type: "textarea" },
          { key: "sortOrder", label: "Order", type: "number" },
          { key: "published", label: "Published", type: "checkbox" },
        ]}
        initialItems={services}
        newItemDefaults={{
          title: "New Service",
          slug: "new-service",
          category: "security",
          description: "",
          content: "",
          sortOrder: 0,
          published: true,
        }}
      />
    </div>
  );
}

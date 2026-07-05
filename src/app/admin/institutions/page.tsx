import { redirect } from "next/navigation";
import { getSession } from "@/lib/auth";
import { prisma } from "@/lib/db";
import CrudTable from "@/components/admin/CrudTable";

export default async function AdminInstitutionsPage() {
  const session = await getSession();
  if (!session) redirect("/admin/login");

  const institutions = await prisma.institution.findMany({ orderBy: { sortOrder: "asc" } });

  return (
    <div className="p-8">
      <CrudTable
        title="Partner Institutions"
        resource="institutions"
        columns={[
          { key: "name", label: "Name" },
          { key: "logoUrl", label: "Logo URL" },
          { key: "sortOrder", label: "Order", type: "number" },
          { key: "published", label: "Published", type: "checkbox" },
        ]}
        initialItems={institutions}
        newItemDefaults={{
          name: "Institution Name",
          logoUrl: "",
          sortOrder: 0,
          published: true,
        }}
      />
    </div>
  );
}

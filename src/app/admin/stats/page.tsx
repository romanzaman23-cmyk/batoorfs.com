import { redirect } from "next/navigation";
import { getSession } from "@/lib/auth";
import { getAdminList } from "@/lib/data";
import { defaultStats } from "@/lib/default-data";
import { prisma } from "@/lib/db";
import CrudTable from "@/components/admin/CrudTable";

export default async function AdminStatsPage() {
  const session = await getSession();
  if (!session) redirect("/admin/login");

  const stats = await getAdminList(
    () => prisma.stat.findMany({ orderBy: { sortOrder: "asc" } }),
    defaultStats
  );

  return (
    <div className="p-8">
      <CrudTable
        title="Statistics (Homepage Counters)"
        resource="stats"
        columns={[
          { key: "label", label: "Label" },
          { key: "value", label: "Value" },
          { key: "suffix", label: "Suffix (e.g. Mn+, +)" },
          { key: "sortOrder", label: "Order", type: "number" },
        ]}
        initialItems={stats}
        newItemDefaults={{ label: "New Stat", value: "0", suffix: "+", sortOrder: 0 }}
      />
    </div>
  );
}

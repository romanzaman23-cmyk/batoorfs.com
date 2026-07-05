import { redirect } from "next/navigation";
import { getSession } from "@/lib/auth";
import AdminSidebar from "@/components/admin/AdminSidebar";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getSession();

  return (
    <div className="flex min-h-screen">
      {session && <AdminSidebar />}
      <div className="flex-1 overflow-auto bg-white">{children}</div>
    </div>
  );
}

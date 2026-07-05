import { redirect } from "next/navigation";
import { getSession } from "@/lib/auth";
import { prisma } from "@/lib/db";
import CrudTable from "@/components/admin/CrudTable";

export default async function AdminTestimonialsPage() {
  const session = await getSession();
  if (!session) redirect("/admin/login");

  const testimonials = await prisma.testimonial.findMany({ orderBy: { sortOrder: "asc" } });

  return (
    <div className="p-8">
      <CrudTable
        title="Student Testimonials"
        resource="testimonials"
        columns={[
          { key: "name", label: "Name" },
          { key: "role", label: "Role" },
          { key: "content", label: "Testimonial", type: "textarea" },
          { key: "sortOrder", label: "Order", type: "number" },
          { key: "published", label: "Published", type: "checkbox" },
        ]}
        initialItems={testimonials}
        newItemDefaults={{
          name: "Student Name",
          role: "Athlete",
          content: "Great experience with CATFIT...",
          sortOrder: 0,
          published: true,
        }}
      />
    </div>
  );
}

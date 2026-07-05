import { prisma } from "@/lib/db";
import { notFound } from "next/navigation";

export default async function ServicePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const service = await prisma.service.findUnique({ where: { slug } });
  if (!service || !service.published) notFound();

  return (
    <div className="py-20 px-4">
      <div className="max-w-4xl mx-auto">
        <p className="text-gold text-sm uppercase tracking-widest mb-4">
          {service.category === "security" ? "Security Solutions" : "M.A.S.T.S"}
        </p>
        <h1 className="text-4xl lg:text-5xl font-bold mb-6">{service.title}</h1>
        <p className="text-muted text-lg mb-8">{service.description}</p>
        <div className="prose max-w-none">
          <p className="text-foreground/80 leading-relaxed whitespace-pre-wrap">
            {service.content || service.description}
          </p>
        </div>
      </div>
    </div>
  );
}

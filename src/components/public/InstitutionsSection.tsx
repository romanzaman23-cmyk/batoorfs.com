import { prisma } from "@/lib/db";

export default async function InstitutionsSection() {
  const institutions = await prisma.institution.findMany({
    where: { published: true },
    orderBy: { sortOrder: "asc" },
  });

  if (institutions.length === 0) return null;

  return (
    <section className="py-20 px-4">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl lg:text-4xl font-bold text-center mb-12">
          Institutions & Organisations
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {institutions.map((inst) => (
            <div
              key={inst.id}
              className="bg-white border border-dark-border rounded-xl p-8 flex items-center justify-center h-32 hover:border-gold/30 transition-colors shadow-sm"
            >
              {inst.logoUrl ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={inst.logoUrl} alt={inst.name} className="max-h-16 max-w-full object-contain" />
              ) : (
                <span className="text-muted text-sm text-center">{inst.name}</span>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

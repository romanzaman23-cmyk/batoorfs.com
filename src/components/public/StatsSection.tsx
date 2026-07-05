import { prisma } from "@/lib/db";

export default async function StatsSection() {
  const stats = await prisma.stat.findMany({ orderBy: { sortOrder: "asc" } });

  return (
    <section className="py-16 bg-dark-card border-y border-dark-border">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat) => (
            <div key={stat.id} className="text-center">
              <div className="text-4xl lg:text-5xl font-bold text-gradient-gold mb-2">
                {stat.value}
                <span className="text-2xl">{stat.suffix}</span>
              </div>
              <p className="text-muted text-sm uppercase tracking-wide">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

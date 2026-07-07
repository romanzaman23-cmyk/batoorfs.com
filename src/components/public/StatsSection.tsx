import { getStats } from "@/lib/data";
import AnimateIn from "./AnimateIn";

export default async function StatsSection() {
  const stats = await getStats();

  return (
    <section className="relative -mt-8 z-20 px-4">
      <AnimateIn animation="zoom-in" duration={800}>
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 bg-white rounded-2xl border border-dark-border p-6 md:p-8 shadow-[var(--shadow-lg)]">
            {stats.map((stat, i) => (
              <AnimateIn key={stat.id} animation="fade-up" delay={i * 100} duration={600}>
                <div className="text-center px-4 py-2 border-r border-dark-border/60 last:border-r-0 even:border-r-0 lg:even:border-r">
                  <div className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-gradient-gold mb-1">
                    {stat.value}
                    <span className="text-xl md:text-2xl">{stat.suffix}</span>
                  </div>
                  <p className="text-muted text-xs md:text-sm font-semibold uppercase tracking-wider">
                    {stat.label}
                  </p>
                </div>
              </AnimateIn>
            ))}
          </div>
        </div>
      </AnimateIn>
    </section>
  );
}

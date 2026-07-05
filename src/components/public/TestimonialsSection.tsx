import { prisma } from "@/lib/db";

export default async function TestimonialsSection() {
  const testimonials = await prisma.testimonial.findMany({
    where: { published: true },
    orderBy: { sortOrder: "asc" },
  });

  if (testimonials.length === 0) return null;

  return (
    <section className="py-20 px-4 bg-dark-card">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl lg:text-4xl font-bold text-center mb-12">
          Words From Students
        </h2>
        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((t) => (
            <div
              key={t.id}
              className="bg-white border border-dark-border rounded-xl p-6 shadow-sm"
            >
              <p className="text-foreground/80 italic mb-4">&ldquo;{t.content}&rdquo;</p>
              <div>
                <p className="font-semibold text-gold">{t.name}</p>
                {t.role && <p className="text-muted text-sm">{t.role}</p>}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

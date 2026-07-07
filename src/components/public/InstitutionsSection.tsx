import { getInstitutions } from "@/lib/data";
import SectionHeading from "./SectionHeading";
import AnimateIn from "./AnimateIn";

export default async function InstitutionsSection() {
  const institutions = await getInstitutions();

  if (institutions.length === 0) return null;

  return (
    <section className="section-padding bg-white">
      <div className="max-w-7xl mx-auto">
        <AnimateIn animation="fade-up">
          <SectionHeading eyebrow="Partners" title="Institutions & Organisations" />
        </AnimateIn>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
          {institutions.map((inst, i) => (
            <AnimateIn key={inst.id} animation="zoom-in" delay={i * 60} duration={500}>
              <div className="bg-surface border border-dark-border rounded-2xl p-8 flex items-center justify-center h-32 card-hover">
                {inst.logoUrl ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={inst.logoUrl} alt={inst.name} className="max-h-14 max-w-full object-contain" />
                ) : (
                  <span className="text-muted text-sm font-semibold text-center">{inst.name}</span>
                )}
              </div>
            </AnimateIn>
          ))}
        </div>
      </div>
    </section>
  );
}

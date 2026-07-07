import { getPanelists } from "@/lib/data";
import Link from "next/link";
import SectionHeading from "./SectionHeading";
import AnimateIn from "./AnimateIn";

export default async function PanelistsGrid({
  limit,
  showHeading = true,
}: {
  limit?: number;
  showHeading?: boolean;
}) {
  const panelists = await getPanelists(limit);

  return (
    <section className="section-padding bg-white">
      <div className="max-w-7xl mx-auto">
        {showHeading && (
          <AnimateIn animation="fade-up">
            <SectionHeading eyebrow="Our Experts" title="PANELISTS" />
          </AnimateIn>
        )}

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {panelists.map((p, i) => (
            <AnimateIn key={p.id} animation="fade-up" delay={(i % 4) * 80} duration={650}>
              <Link
                href={`/panelists/${p.slug}`}
                className="group bg-white border border-dark-border rounded-2xl p-6 card-hover text-center block h-full"
              >
                <div className="w-20 h-20 rounded-2xl gradient-gold flex items-center justify-center mx-auto mb-4 text-2xl font-bold text-white shadow-md group-hover:scale-110 transition-transform duration-300">
                  {p.name.charAt(0)}
                </div>
                <h3 className="text-lg font-bold text-foreground group-hover:text-gold transition-colors">
                  {p.name}
                </h3>
                <p className="text-muted text-sm mt-2 line-clamp-3 leading-relaxed">
                  {p.designation}
                </p>
              </Link>
            </AnimateIn>
          ))}
        </div>

        {limit && (
          <AnimateIn animation="fade-up" delay={300} className="text-center mt-12">
            <Link href="/panelists" className="btn-outline">
              View All Panelists
            </Link>
          </AnimateIn>
        )}
      </div>
    </section>
  );
}

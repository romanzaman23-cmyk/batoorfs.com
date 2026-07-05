import { getPanelists } from "@/lib/data";
import Link from "next/link";

export default async function PanelistsGrid({ limit }: { limit?: number }) {
  const panelists = await getPanelists(limit);

  return (
    <section className="py-20 px-4">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl lg:text-4xl font-bold text-center mb-12">PANELISTS</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {panelists.map((p) => (
            <Link
              key={p.id}
              href={`/panelists/${p.slug}`}
              className="group bg-white border border-dark-border rounded-xl p-6 hover:border-gold/50 transition-all hover:-translate-y-1 shadow-sm"
            >
              <div className="w-20 h-20 rounded-full bg-gradient-to-br from-blue-100 to-blue-300 flex items-center justify-center mb-4 mx-auto text-2xl font-bold text-gold">
                {p.name.charAt(0)}
              </div>
              <h3 className="text-lg font-semibold text-center group-hover:text-gold transition-colors">
                {p.name}
              </h3>
              <p className="text-muted text-sm text-center mt-2 line-clamp-3">
                {p.designation}
              </p>
            </Link>
          ))}
        </div>
        {limit && (
          <div className="text-center mt-10">
            <Link
              href="/panelists"
              className="inline-block px-8 py-3 border border-gold text-gold rounded-full hover:bg-dark-card transition-colors"
            >
              View All Panelists
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}

import { getPanelists } from "@/lib/data";
import { getSettings } from "@/lib/settings";
import Link from "next/link";
import PageHero from "@/components/public/PageHero";
import AnimateIn from "@/components/public/AnimateIn";

export default async function TeamPage() {
  const [settings, panelists] = await Promise.all([
    getSettings(),
    getPanelists(6),
  ]);

  return (
    <>
      <PageHero
        eyebrow="Our Team"
        title="TEAM"
        description={settings.about_text?.slice(0, 200)}
      />

      <section className="section-padding bg-background">
        <div className="max-w-7xl mx-auto grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {panelists.map((p, i) => (
            <AnimateIn key={p.id} animation="zoom-in" delay={(i % 3) * 90} duration={600}>
              <Link
                href={`/panelists/${p.slug}`}
                className="group block bg-white border border-dark-border rounded-2xl p-8 card-hover text-center h-full"
              >
                <div className="w-24 h-24 rounded-2xl gradient-gold flex items-center justify-center mx-auto mb-5 text-3xl font-bold text-white shadow-md group-hover:scale-105 transition-transform">
                  {p.name.charAt(0)}
                </div>
                <h2 className="text-lg font-bold group-hover:text-gold transition-colors">
                  {p.name}
                </h2>
                <p className="text-muted text-sm mt-2 leading-relaxed">{p.designation}</p>
              </Link>
            </AnimateIn>
          ))}
        </div>
      </section>
    </>
  );
}

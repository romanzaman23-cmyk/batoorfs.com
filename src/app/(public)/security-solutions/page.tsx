import { getServices } from "@/lib/data";
import { getSettings } from "@/lib/settings";
import Link from "next/link";
import PageHero from "@/components/public/PageHero";
import AnimateIn from "@/components/public/AnimateIn";
import { Shield, ArrowRight } from "lucide-react";

export default async function SecuritySolutionsPage() {
  const [settings, services] = await Promise.all([
    getSettings(),
    getServices("security"),
  ]);

  return (
    <>
      <PageHero
        eyebrow="Our Services"
        title="Security Solutions"
        description={settings.security_intro}
      />

      <section className="section-padding bg-background">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, i) => (
            <AnimateIn key={service.id} animation="fade-up" delay={i * 80} duration={650}>
              <Link
                href={`/services/${service.slug}`}
                className="group block bg-white border border-dark-border rounded-2xl p-8 card-hover h-full"
              >
                <div className="w-14 h-14 rounded-2xl bg-surface flex items-center justify-center mb-5 group-hover:gradient-gold transition-all">
                  <Shield className="w-7 h-7 text-gold group-hover:text-white transition-colors" />
                </div>
                <h2 className="text-xl font-bold mb-3 group-hover:text-gold transition-colors">
                  {service.title}
                </h2>
                <p className="text-muted text-sm leading-relaxed mb-4">{service.description}</p>
                <span className="inline-flex items-center gap-1 text-gold text-sm font-semibold">
                  Learn more <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </span>
              </Link>
            </AnimateIn>
          ))}
        </div>
      </section>
    </>
  );
}

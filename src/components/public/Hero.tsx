import { getSettings } from "@/lib/settings";
import Link from "next/link";
import { ArrowRight, Shield, Target } from "lucide-react";

export default async function Hero() {
  const settings = await getSettings();

  return (
    <section className="relative min-h-[92vh] flex items-center overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-sky-50 via-white to-blue-100" />
      <div className="absolute inset-0 hero-grid" />
      <div className="absolute top-20 right-[10%] w-72 h-72 bg-sky-300/30 rounded-full blur-3xl animate-float" />
      <div className="absolute bottom-20 left-[5%] w-96 h-96 bg-blue-400/20 rounded-full blur-3xl animate-float-slow animate-pulse-soft" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 py-24 w-full">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white border border-dark-border text-gold text-xs font-bold uppercase tracking-widest shadow-sm mb-6 animate-fade-in-up hero-delay-1">
              <Target className="w-3.5 h-3.5" />
              {settings.site_tagline ?? "MIND MATTERS"}
            </span>

            <h1 className="text-4xl sm:text-5xl xl:text-6xl font-extrabold leading-[1.1] text-foreground mb-6 animate-fade-in-up hero-delay-2">
              {settings.hero_title ?? "FUTURE VICTORIES BEGIN WITHIN"}
            </h1>

            <p className="text-lg text-muted leading-relaxed max-w-xl mb-8 animate-fade-in-up hero-delay-3">
              {settings.hero_subtitle}
            </p>

            <div className="flex flex-wrap gap-4 animate-fade-in-up hero-delay-4">
              <Link href="/contact" className="btn-primary">
                Get Started
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </Link>
              <Link href="/masts/mental-fitness" className="btn-outline">
                Explore M.A.S.T.S
              </Link>
            </div>
          </div>

          <div className="hidden lg:block relative animate-fade-in-up hero-delay-5">
            <div className="relative bg-white rounded-3xl border border-dark-border p-8 shadow-[var(--shadow-lg)] card-hover">
              <div className="absolute -top-4 -right-4 w-20 h-20 gradient-gold rounded-2xl flex items-center justify-center shadow-lg animate-float">
                <Shield className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-xl font-bold text-foreground mb-2">CATFIT Excellence</h3>
              <p className="text-muted text-sm leading-relaxed mb-6">
                Special Forces & NSG veteran-led training for sports, students, and corporate teams.
              </p>
              <div className="grid grid-cols-2 gap-4">
                {[
                  { label: "Security", href: "/security-solutions" },
                  { label: "M.A.S.T.S", href: "/masts/mental-fitness" },
                  { label: "Panelists", href: "/panelists" },
                  { label: "Contact", href: "/contact" },
                ].map((item, i) => (
                  <Link
                    key={item.label}
                    href={item.href}
                    className="px-4 py-3 rounded-xl bg-surface text-gold text-sm font-semibold text-center hover:bg-sky-100 hover:scale-105 transition-all duration-300"
                    style={{ animationDelay: `${0.8 + i * 0.1}s` }}
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

import { getSettings } from "@/lib/settings";
import Link from "next/link";
import { Target, Eye, Shield, Brain } from "lucide-react";
import SectionHeading from "./SectionHeading";
import AnimateIn from "./AnimateIn";

export default async function AboutSection() {
  const settings = await getSettings();

  return (
    <>
      <section className="section-padding bg-white">
        <AnimateIn animation="fade-up" className="max-w-4xl mx-auto text-center">
          <SectionHeading
            eyebrow="About CATFIT"
            title="Pioneers of Mental & Physical Excellence"
            description={settings.about_text}
          />
        </AnimateIn>
      </section>

      <section className="section-padding bg-surface">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-8">
          <AnimateIn animation="fade-left" delay={0}>
            <div className="bg-white rounded-2xl border border-dark-border p-8 card-hover shadow-[var(--shadow)] h-full">
              <div className="w-14 h-14 rounded-2xl gradient-gold flex items-center justify-center mb-6">
                <Target className="w-7 h-7 text-white" />
              </div>
              <h2 className="text-2xl font-bold text-foreground mb-4">Our Mission</h2>
              <p className="text-muted leading-relaxed">{settings.mission}</p>
            </div>
          </AnimateIn>
          <AnimateIn animation="fade-right" delay={150}>
            <div className="bg-white rounded-2xl border border-dark-border p-8 card-hover shadow-[var(--shadow)] h-full">
              <div className="w-14 h-14 rounded-2xl gradient-gold flex items-center justify-center mb-6">
                <Eye className="w-7 h-7 text-white" />
              </div>
              <h2 className="text-2xl font-bold text-foreground mb-4">Our Vision</h2>
              <p className="text-muted leading-relaxed">{settings.vision}</p>
            </div>
          </AnimateIn>
        </div>
      </section>

      <section className="section-padding bg-white">
        <div className="max-w-7xl mx-auto">
          <AnimateIn animation="fade-up">
            <SectionHeading
              eyebrow="Services"
              title="Security Solutions"
              description={settings.security_intro}
            />
          </AnimateIn>
          <AnimateIn animation="zoom-in" delay={200} className="text-center">
            <Link href="/security-solutions" className="btn-outline">
              <Shield className="w-4 h-4" />
              Know More
            </Link>
          </AnimateIn>
        </div>
      </section>

      <section className="section-padding bg-gradient-to-br from-sky-900 to-sky-800 text-white relative overflow-hidden">
        <div className="absolute inset-0 hero-grid opacity-20" />
        <div className="absolute top-10 right-10 w-64 h-64 bg-sky-400/10 rounded-full blur-3xl animate-pulse-soft" />
        <div className="relative max-w-7xl mx-auto">
          <AnimateIn animation="fade-up">
            <SectionHeading
              eyebrow="Training Programs"
              title="M.A.S.T.S"
              description={settings.masts_intro}
              light
            />
          </AnimateIn>
          <AnimateIn animation="zoom-in" delay={250} className="text-center">
            <Link
              href="/masts/mental-fitness"
              className="inline-flex items-center gap-2 px-8 py-3.5 bg-white text-sky-900 font-bold rounded-full hover:bg-sky-50 hover:scale-105 transition-all duration-300 shadow-lg"
            >
              <Brain className="w-5 h-5" />
              Explore Programs
            </Link>
          </AnimateIn>
        </div>
      </section>
    </>
  );
}

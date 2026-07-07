import { getSettings } from "@/lib/settings";
import PageHero from "@/components/public/PageHero";
import AnimateIn from "@/components/public/AnimateIn";
import Link from "next/link";
import { Trophy, ArrowRight } from "lucide-react";

export default async function SportsPage() {
  const settings = await getSettings();

  return (
    <>
      <PageHero
        eyebrow="Athletics"
        title="SPORTS"
        description={settings.about_text}
      />

      <section className="section-padding bg-background">
        <div className="max-w-4xl mx-auto text-center">
          <AnimateIn animation="zoom-in" duration={700}>
            <div className="w-20 h-20 rounded-2xl gradient-gold flex items-center justify-center mx-auto mb-6">
              <Trophy className="w-10 h-10 text-white" />
            </div>
          </AnimateIn>
          <AnimateIn animation="fade-up" delay={120} duration={700}>
            <p className="text-muted text-lg leading-relaxed mb-8">{settings.about_text}</p>
          </AnimateIn>
          <AnimateIn animation="fade-up" delay={240} duration={600}>
            <Link href="/contact" className="btn-primary">
              Join Our Program
              <ArrowRight className="w-4 h-4" />
            </Link>
          </AnimateIn>
        </div>
      </section>
    </>
  );
}

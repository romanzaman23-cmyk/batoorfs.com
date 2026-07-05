import { getSettings } from "@/lib/settings";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default async function Hero() {
  const settings = await getSettings();

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-white">
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-white to-blue-100" />
      <div className="absolute inset-0 opacity-40">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-400/30 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-600/20 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-4 text-center pt-20">
        <p className="text-gold text-sm uppercase tracking-[0.4em] mb-4 animate-fade-in-up font-semibold">
          {settings.site_tagline ?? "MIND MATTERS"}
        </p>
        <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold leading-tight mb-6 animate-fade-in-up text-foreground">
          {settings.hero_title ?? "FUTURE VICTORIES BEGIN WITHIN"}
        </h1>
        <p className="text-muted text-lg max-w-2xl mx-auto mb-10 animate-fade-in-up">
          {settings.hero_subtitle}
        </p>
        <div className="flex flex-wrap gap-4 justify-center animate-fade-in-up">
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 px-8 py-3 gradient-gold text-white font-semibold rounded-full hover:opacity-90 transition-opacity shadow-md"
          >
            Get Started
            <ArrowRight className="w-4 h-4" />
          </Link>
          <Link
            href="/masts/mental-fitness"
            className="inline-flex items-center gap-2 px-8 py-3 border-2 border-gold text-gold rounded-full hover:bg-dark-card transition-colors"
          >
            Explore M.A.S.T.S
          </Link>
        </div>
      </div>
    </section>
  );
}

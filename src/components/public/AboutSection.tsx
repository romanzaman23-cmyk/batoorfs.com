import { getSettings } from "@/lib/settings";
import Link from "next/link";

export default async function AboutSection() {
  const settings = await getSettings();

  return (
    <>
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-foreground/80 text-lg leading-relaxed">{settings.about_text}</p>
        </div>
      </section>

      <section className="py-16 px-4 bg-dark-card">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12">
          <div>
            <h2 className="text-3xl font-bold text-gold mb-6">Our Mission</h2>
            <p className="text-muted leading-relaxed">{settings.mission}</p>
          </div>
          <div>
            <h2 className="text-3xl font-bold text-gold mb-6">Our Vision</h2>
            <p className="text-muted leading-relaxed">{settings.vision}</p>
          </div>
        </div>
      </section>

      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl lg:text-4xl font-bold text-center mb-4">Security Solutions</h2>
          <p className="text-muted text-center max-w-3xl mx-auto mb-10 leading-relaxed">
            {settings.security_intro}
          </p>
          <div className="text-center">
            <Link
              href="/security-solutions"
              className="inline-block px-8 py-3 border border-gold text-gold rounded-full hover:bg-gold/10 transition-colors"
            >
              Know More
            </Link>
          </div>
        </div>
      </section>

      <section className="py-20 px-4 bg-dark-card">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl lg:text-4xl font-bold text-center mb-4">M.A.S.T.S</h2>
          <p className="text-muted text-center max-w-3xl mx-auto mb-10 leading-relaxed">
            {settings.masts_intro}
          </p>
          <div className="text-center">
            <Link
              href="/masts/mental-fitness"
              className="inline-block px-8 py-3 gradient-gold text-white font-semibold rounded-full hover:opacity-90 transition-opacity shadow-md"
            >
              Explore Programs
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}

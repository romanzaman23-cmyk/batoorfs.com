import AnimateIn from "./AnimateIn";

type Props = {
  eyebrow?: string;
  title: string;
  description?: string;
};

export default function PageHero({ eyebrow, title, description }: Props) {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-sky-950 via-sky-900 to-sky-800 text-white">
      <div className="absolute inset-0 hero-grid opacity-30" />
      <div className="absolute top-0 right-0 w-96 h-96 bg-sky-400/20 rounded-full blur-3xl animate-float-slow" />
      <div className="absolute bottom-0 left-0 w-72 h-72 bg-cyan-400/10 rounded-full blur-3xl animate-pulse-soft" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 py-20 md:py-28">
        {eyebrow && (
          <AnimateIn animation="fade-down" duration={500}>
            <span className="inline-block text-xs font-bold uppercase tracking-[0.3em] text-sky-300 mb-4">
              {eyebrow}
            </span>
          </AnimateIn>
        )}
        <AnimateIn animation="fade-up" delay={100} duration={700}>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight max-w-4xl">
            {title}
          </h1>
        </AnimateIn>
        {description && (
          <AnimateIn animation="fade-up" delay={250} duration={700}>
            <p className="mt-6 text-lg text-sky-100 max-w-2xl leading-relaxed">
              {description}
            </p>
          </AnimateIn>
        )}
      </div>
    </section>
  );
}

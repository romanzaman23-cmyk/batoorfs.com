import { getTestimonials } from "@/lib/data";
import { Quote } from "lucide-react";
import SectionHeading from "./SectionHeading";
import AnimateIn from "./AnimateIn";

export default async function TestimonialsSection() {
  const testimonials = await getTestimonials();

  if (testimonials.length === 0) return null;

  return (
    <section className="section-padding bg-surface">
      <div className="max-w-7xl mx-auto">
        <AnimateIn animation="fade-up">
          <SectionHeading eyebrow="Testimonials" title="Words From Students" />
        </AnimateIn>

        <div className="grid md:grid-cols-3 gap-6">
          {testimonials.map((t, i) => (
            <AnimateIn key={t.id} animation="fade-up" delay={i * 120} duration={700}>
              <div className="relative bg-white border border-dark-border rounded-2xl p-8 card-hover shadow-[var(--shadow)] h-full">
                <Quote className="w-10 h-10 text-sky-200 mb-4" />
                <p className="text-foreground/80 italic leading-relaxed mb-6">
                  &ldquo;{t.content}&rdquo;
                </p>
                <div className="border-t border-dark-border pt-4">
                  <p className="font-bold text-foreground">{t.name}</p>
                  {t.role && <p className="text-gold text-sm font-medium mt-0.5">{t.role}</p>}
                </div>
              </div>
            </AnimateIn>
          ))}
        </div>
      </div>
    </section>
  );
}

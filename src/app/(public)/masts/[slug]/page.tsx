import { getServiceBySlug } from "@/lib/data";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import AnimateIn from "@/components/public/AnimateIn";

export default async function MastsPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const service = await getServiceBySlug(slug);
  if (!service) notFound();

  return (
    <>
      <section className="bg-gradient-to-br from-sky-900 to-sky-800 text-white py-16 md:py-24">
        <div className="max-w-4xl mx-auto px-4">
          <Link
            href="/masts/mental-fitness"
            className="inline-flex items-center gap-2 text-sky-300 hover:text-white text-sm font-medium mb-6 transition-colors animate-fade-in-up hero-delay-1"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to M.A.S.T.S
          </Link>
          <span className="block text-xs font-bold uppercase tracking-[0.3em] text-sky-300 mb-3 animate-fade-in-up hero-delay-2">
            M.A.S.T.S
          </span>
          <h1 className="text-4xl md:text-5xl font-bold leading-tight animate-fade-in-up hero-delay-3">{service.title}</h1>
          <p className="mt-4 text-lg text-sky-100 leading-relaxed animate-fade-in-up hero-delay-4">{service.description}</p>
        </div>
      </section>

      <section className="section-padding bg-white">
        <div className="max-w-4xl mx-auto px-4">
          <AnimateIn animation="fade-up" duration={700}>
            <p className="text-muted leading-relaxed text-lg whitespace-pre-wrap">
              {service.content || service.description}
            </p>
          </AnimateIn>
        </div>
      </section>
    </>
  );
}

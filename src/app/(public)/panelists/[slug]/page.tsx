import { getPanelistBySlug } from "@/lib/data";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import AnimateIn from "@/components/public/AnimateIn";

export default async function PanelistDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const panelist = await getPanelistBySlug(slug);
  if (!panelist) notFound();

  return (
    <>
      <section className="bg-gradient-to-br from-sky-900 to-sky-800 text-white py-16 md:py-24">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <Link
            href="/panelists"
            className="inline-flex items-center gap-2 text-sky-300 hover:text-white text-sm font-medium mb-8 transition-colors animate-fade-in-up hero-delay-1"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Panelists
          </Link>
          <div className="w-32 h-32 rounded-3xl gradient-gold flex items-center justify-center mx-auto mb-6 text-5xl font-bold text-white shadow-xl animate-fade-in-up hero-delay-2">
            {panelist.name.charAt(0)}
          </div>
          <h1 className="text-3xl md:text-4xl font-bold mb-3 animate-fade-in-up hero-delay-3">{panelist.name}</h1>
          <p className="text-sky-200 text-lg animate-fade-in-up hero-delay-4">{panelist.designation}</p>
        </div>
      </section>

      {panelist.bio && (
        <section className="section-padding bg-white">
          <div className="max-w-3xl mx-auto px-4 text-center">
            <AnimateIn animation="fade-up" duration={700}>
              <p className="text-muted leading-relaxed text-lg">{panelist.bio}</p>
            </AnimateIn>
          </div>
        </section>
      )}
    </>
  );
}

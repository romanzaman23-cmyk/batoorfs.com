import { getPanelistBySlug } from "@/lib/data";
import { notFound } from "next/navigation";

export default async function PanelistDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const panelist = await getPanelistBySlug(slug);
  if (!panelist) notFound();

  return (
    <div className="py-20 px-4">
      <div className="max-w-3xl mx-auto text-center">
        <div className="w-32 h-32 rounded-full bg-gradient-to-br from-blue-100 to-blue-300 flex items-center justify-center mx-auto mb-6 text-4xl font-bold text-gold">
          {panelist.name.charAt(0)}
        </div>
        <h1 className="text-3xl lg:text-4xl font-bold mb-4">{panelist.name}</h1>
        <p className="text-gold mb-8">{panelist.designation}</p>
        {panelist.bio && (
          <p className="text-muted leading-relaxed">{panelist.bio}</p>
        )}
      </div>
    </div>
  );
}

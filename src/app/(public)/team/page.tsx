import { getSettings } from "@/lib/settings";
import { prisma } from "@/lib/db";
import Link from "next/link";

export default async function TeamPage() {
  const settings = await getSettings();
  const panelists = await prisma.panelist.findMany({
    where: { published: true },
    orderBy: { sortOrder: "asc" },
    take: 6,
  });

  return (
    <div className="py-20 px-4">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl lg:text-5xl font-bold text-center mb-6">TEAM</h1>
        <p className="text-muted text-center max-w-3xl mx-auto mb-16 leading-relaxed">
          {settings.about_text}
        </p>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {panelists.map((p) => (
            <Link
              key={p.id}
              href={`/panelists/${p.slug}`}
              className="group bg-white border border-dark-border rounded-xl p-6 hover:border-gold/50 transition-all text-center shadow-sm"
            >
              <div className="w-24 h-24 rounded-full bg-gradient-to-br from-blue-100 to-blue-300 flex items-center justify-center mx-auto mb-4 text-3xl font-bold text-gold">
                {p.name.charAt(0)}
              </div>
              <h2 className="text-lg font-semibold group-hover:text-gold transition-colors">
                {p.name}
              </h2>
              <p className="text-muted text-sm mt-2">{p.designation}</p>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

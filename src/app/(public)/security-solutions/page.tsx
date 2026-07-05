import { getServices } from "@/lib/data";
import { getSettings } from "@/lib/settings";
import Link from "next/link";
import { Shield } from "lucide-react";

export default async function SecuritySolutionsPage() {
  const [settings, services] = await Promise.all([
    getSettings(),
    getServices("security"),
  ]);

  return (
    <div className="py-20 px-4">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl lg:text-5xl font-bold text-center mb-6">Security Solutions</h1>
        <p className="text-muted text-center max-w-3xl mx-auto mb-16 leading-relaxed">
          {settings.security_intro}
        </p>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service) => (
            <Link
              key={service.id}
              href={`/services/${service.slug}`}
              className="group bg-white border border-dark-border rounded-xl p-8 hover:border-gold/50 transition-all hover:-translate-y-1 shadow-sm"
            >
              <Shield className="w-10 h-10 text-gold mb-4" />
              <h2 className="text-xl font-semibold mb-3 group-hover:text-gold transition-colors">
                {service.title}
              </h2>
              <p className="text-muted text-sm">{service.description}</p>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

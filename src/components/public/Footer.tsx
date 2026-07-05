import Link from "next/link";
import { getSettings } from "@/lib/settings";
import { Mail, Phone, MapPin } from "lucide-react";

export default async function Footer() {
  const settings = await getSettings();

  return (
    <footer className="bg-gold text-white border-t border-blue-700 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
        <div className="grid md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-2xl font-bold text-white mb-2">
              {settings.site_name ?? "CATFIT"}
            </h3>
            <p className="text-blue-100 text-sm">{settings.site_tagline ?? "MIND MATTERS"}</p>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-4 uppercase tracking-wide text-sm">
              Get In Touch
            </h4>
            <div className="space-y-3 text-sm text-blue-100">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-white mt-0.5 shrink-0" />
                <span>{settings.contact_address}</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-white shrink-0" />
                <span>
                  {settings.contact_email1} | {settings.contact_email2}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-white shrink-0" />
                <span>
                  {settings.contact_phone1} | {settings.contact_phone2}
                </span>
              </div>
            </div>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-4 uppercase tracking-wide text-sm">
              Quick Links
            </h4>
            <div className="grid grid-cols-2 gap-2 text-sm">
              <Link href="/" className="text-blue-100 hover:text-white transition-colors">
                Home
              </Link>
              <Link href="/panelists" className="text-blue-100 hover:text-white transition-colors">
                Panelists
              </Link>
              <Link href="/sports" className="text-blue-100 hover:text-white transition-colors">
                Sports
              </Link>
              <Link href="/contact" className="text-blue-100 hover:text-white transition-colors">
                Contact
              </Link>
              <Link href="/admin" className="text-blue-100 hover:text-white transition-colors">
                Admin Panel
              </Link>
            </div>
          </div>
        </div>

        <div className="border-t border-blue-400/40 mt-8 pt-8 text-center text-sm text-blue-100">
          Copyright © {new Date().getFullYear()} {settings.site_name ?? "CATFIT"}
        </div>
      </div>
    </footer>
  );
}

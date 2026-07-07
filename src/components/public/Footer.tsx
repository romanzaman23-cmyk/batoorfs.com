import Link from "next/link";
import { getSettings } from "@/lib/settings";
import { Mail, Phone, MapPin, Shield } from "lucide-react";
import AnimateIn from "./AnimateIn";

export default async function Footer() {
  const settings = await getSettings();

  return (
    <footer className="bg-gradient-to-br from-sky-950 via-sky-900 to-sky-950 text-white mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-16 pb-8">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          <AnimateIn animation="fade-up" className="lg:col-span-1">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center">
                <Shield className="w-5 h-5 text-sky-300" />
              </div>
              <div>
                <h3 className="text-xl font-bold">{settings.site_name ?? "CATFIT"}</h3>
                <p className="text-sky-300 text-xs tracking-widest uppercase">
                  {settings.site_tagline ?? "MIND MATTERS"}
                </p>
              </div>
            </div>
            <p className="text-sky-200/80 text-sm leading-relaxed">
              Military Application & Special Forces Tactics for Sports & Students.
            </p>
          </AnimateIn>

          <AnimateIn animation="fade-up" delay={100}>
          <div>
            <h4 className="font-bold mb-4 text-sky-300 uppercase text-sm tracking-wider">
              Quick Links
            </h4>
            <div className="space-y-2.5 text-sm">
              {[
                { label: "Home", href: "/" },
                { label: "Security Solutions", href: "/security-solutions" },
                { label: "M.A.S.T.S", href: "/masts/mental-fitness" },
                { label: "Panelists", href: "/panelists" },
                { label: "Contact", href: "/contact" },
              ].map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="block text-sky-100/80 hover:text-white transition-colors"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
          </AnimateIn>

          <AnimateIn animation="fade-up" delay={200} className="lg:col-span-2">
          <div className="lg:col-span-2">
            <h4 className="font-bold mb-4 text-sky-300 uppercase text-sm tracking-wider">
              Get In Touch
            </h4>
            <div className="space-y-4 text-sm text-sky-100/90">
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-sky-400 mt-0.5 shrink-0" />
                <span>{settings.contact_address}</span>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-sky-400 shrink-0" />
                <span>
                  {settings.contact_email1} · {settings.contact_email2}
                </span>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-sky-400 shrink-0" />
                <span>
                  {settings.contact_phone1} · {settings.contact_phone2}
                </span>
              </div>
            </div>
          </div>
          </AnimateIn>
        </div>

        <div className="border-t border-white/10 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-sky-300/70">
          <p>Copyright © {new Date().getFullYear()} {settings.site_name ?? "CATFIT"}. All rights reserved.</p>
          <p>Excellence Through Training</p>
        </div>
      </div>
    </footer>
  );
}

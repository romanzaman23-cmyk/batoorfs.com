import { getSettings } from "@/lib/settings";
import ContactForm from "@/components/public/ContactForm";
import PageHero from "@/components/public/PageHero";
import AnimateIn from "@/components/public/AnimateIn";
import { MapPin, Mail, Phone } from "lucide-react";

export default async function ContactPage() {
  const settings = await getSettings();

  const contactItems = [
    { icon: MapPin, label: "Address", value: settings.contact_address },
    {
      icon: Mail,
      label: "Email",
      value: `${settings.contact_email1} · ${settings.contact_email2}`,
    },
    {
      icon: Phone,
      label: "Phone",
      value: `${settings.contact_phone1} · ${settings.contact_phone2}`,
    },
  ];

  return (
    <>
      <PageHero
        eyebrow="Contact Us"
        title="Get In Touch"
        description="Reach out to CATFIT for training programs, security solutions, and partnerships."
      />

      <section className="section-padding bg-background">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12">
          <div className="space-y-6">
            {contactItems.map(({ icon: Icon, label, value }, i) => (
              <AnimateIn key={label} animation="fade-right" delay={i * 100} duration={600}>
                <div className="flex items-start gap-4 p-6 bg-white rounded-2xl border border-dark-border shadow-[var(--shadow)] card-hover">
                  <div className="w-12 h-12 rounded-xl gradient-gold flex items-center justify-center shrink-0">
                    <Icon className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-gold uppercase tracking-wide mb-1">
                      {label}
                    </p>
                    <p className="text-muted leading-relaxed">{value}</p>
                  </div>
                </div>
              </AnimateIn>
            ))}
          </div>
          <AnimateIn animation="fade-left" delay={200} duration={700}>
            <ContactForm />
          </AnimateIn>
        </div>
      </section>
    </>
  );
}

import { getSettings } from "@/lib/settings";
import ContactForm from "@/components/public/ContactForm";
import { MapPin, Mail, Phone } from "lucide-react";

export default async function ContactPage() {
  const settings = await getSettings();

  return (
    <div className="py-20 px-4">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl lg:text-5xl font-bold text-center mb-12">Get In Touch</h1>
        <div className="grid lg:grid-cols-2 gap-12">
          <div>
            <div className="space-y-6 mb-8">
              <div className="flex items-start gap-4">
                <MapPin className="w-5 h-5 text-gold mt-1 shrink-0" />
                <p className="text-muted">{settings.contact_address}</p>
              </div>
              <div className="flex items-center gap-4">
                <Mail className="w-5 h-5 text-gold shrink-0" />
                <p className="text-muted">
                  {settings.contact_email1} | {settings.contact_email2}
                </p>
              </div>
              <div className="flex items-center gap-4">
                <Phone className="w-5 h-5 text-gold shrink-0" />
                <p className="text-muted">
                  {settings.contact_phone1} | {settings.contact_phone2}
                </p>
              </div>
            </div>
          </div>
          <ContactForm />
        </div>
      </div>
    </div>
  );
}

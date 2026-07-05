import { redirect } from "next/navigation";
import { getSession } from "@/lib/auth";
import { getSettings } from "@/lib/settings";
import SettingsForm from "@/components/admin/SettingsForm";

const fields = [
  { key: "site_name", label: "Site Name" },
  { key: "site_tagline", label: "Tagline" },
  { key: "hero_title", label: "Hero Title" },
  { key: "hero_subtitle", label: "Hero Subtitle" },
  { key: "about_text", label: "About Text", type: "textarea" as const, rows: 5 },
  { key: "mission", label: "Mission", type: "textarea" as const, rows: 4 },
  { key: "vision", label: "Vision", type: "textarea" as const, rows: 4 },
  { key: "security_intro", label: "Security Solutions Intro", type: "textarea" as const, rows: 4 },
  { key: "masts_intro", label: "M.A.S.T.S Intro", type: "textarea" as const, rows: 4 },
  { key: "contact_address", label: "Contact Address", type: "textarea" as const, rows: 2 },
  { key: "contact_email1", label: "Email 1" },
  { key: "contact_email2", label: "Email 2" },
  { key: "contact_phone1", label: "Phone 1" },
  { key: "contact_phone2", label: "Phone 2" },
];

export default async function AdminSettingsPage() {
  const session = await getSession();
  if (!session) redirect("/admin/login");

  const settings = await getSettings();

  return (
    <div className="p-8">
      <SettingsForm
        title="Site Settings"
        fields={fields}
        initialData={settings}
      />
    </div>
  );
}

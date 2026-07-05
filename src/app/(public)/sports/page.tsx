import { getSettings } from "@/lib/settings";

export default async function SportsPage() {
  const settings = await getSettings();

  return (
    <div className="py-20 px-4">
      <div className="max-w-4xl mx-auto text-center">
        <h1 className="text-4xl lg:text-5xl font-bold mb-6">SPORTS</h1>
        <p className="text-muted text-lg leading-relaxed">{settings.about_text}</p>
      </div>
    </div>
  );
}

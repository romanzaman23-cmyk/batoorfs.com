import Header from "@/components/public/Header";
import Footer from "@/components/public/Footer";
import { getSettings } from "@/lib/settings";

export async function generateMetadata() {
  const settings = await getSettings();
  return {
    title: `${settings.site_name ?? "CATFIT"} – ${settings.site_tagline ?? "MIND MATTERS"}`,
    description: settings.about_text?.slice(0, 160),
  };
}

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Header />
      <main className="flex-1 pt-16 lg:pt-20">{children}</main>
      <Footer />
    </>
  );
}

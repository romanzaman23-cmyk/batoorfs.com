import { getSettings } from "@/lib/settings";
import PageHero from "@/components/public/PageHero";
import PanelistsGrid from "@/components/public/PanelistsGrid";

export default async function PanelistsPage() {
  return (
    <>
      <PageHero
        eyebrow="Experts"
        title="Our Panelists"
        description="Meet the distinguished leaders, veterans, and professionals guiding CATFIT programs."
      />
      <PanelistsGrid showHeading={false} />
    </>
  );
}

import Hero from "@/components/public/Hero";
import StatsSection from "@/components/public/StatsSection";
import AboutSection from "@/components/public/AboutSection";
import InstitutionsSection from "@/components/public/InstitutionsSection";
import PanelistsGrid from "@/components/public/PanelistsGrid";
import TestimonialsSection from "@/components/public/TestimonialsSection";

export default function HomePage() {
  return (
    <>
      <Hero />
      <StatsSection />
      <AboutSection />
      <InstitutionsSection />
      <PanelistsGrid limit={8} />
      <TestimonialsSection />
    </>
  );
}

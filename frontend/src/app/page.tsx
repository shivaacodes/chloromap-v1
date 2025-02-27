import HeroSection from "@/components/hero-section";
import MarqueeSection from "@/components/marquee-section";
import FeatureSection from "@/components/features-section";
import AnalyzeSection from "@/components/analyze-section";
import About from "@/components/about";

export default function Home() {
  return (
    <>
      <HeroSection />
      <MarqueeSection />
      <FeatureSection />
      <AnalyzeSection />
      <About />
    </>
  );
}

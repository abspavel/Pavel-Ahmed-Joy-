import { HeroSection } from './sections/HeroSection';
import { MarqueeSection } from './sections/MarqueeSection';
import { ImageCircleSection } from './sections/ImageCircleSection';
import { AboutSection } from './sections/AboutSection';
import { ServicesSection } from './sections/ServicesSection';
import { ProjectsSection } from './sections/ProjectsSection';

export default function App() {
  return (
    <main className="main-wrapper flex flex-col min-h-screen selection:bg-[#BBCCD7] selection:text-[#0C0C0C]">
      <HeroSection />
      <MarqueeSection />
      <ImageCircleSection />
      <AboutSection />
      <ServicesSection />
      <ProjectsSection />
    </main>
  );
}

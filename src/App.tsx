import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import { HeroSection } from './sections/HeroSection';
import { MarqueeSection } from './sections/MarqueeSection';
import { ImageCircleSection } from './sections/ImageCircleSection';
import { AboutSection } from './sections/AboutSection';
import { ServicesSection } from './sections/ServicesSection';
import { ProjectsSection } from './sections/ProjectsSection';
import { TestimonialsSection } from './sections/TestimonialsSection';
import { FooterSection } from './sections/FooterSection';
import { AdminRouter } from './admin/AdminRouter';
import { ContactPage } from './pages/ContactPage';
import { ServiceDetailPage } from './pages/ServiceDetailPage';

function ScrollToTop() {
  const { pathname } = useLocation();
  
  useEffect(() => {
    // Only scroll to top if we're not using hash links on the home page
    if (!window.location.hash) {
      window.scrollTo(0, 0);
    }
  }, [pathname]);
  
  return null;
}

function PublicSite() {
  return (
    <main className="main-wrapper flex flex-col min-h-screen selection:bg-[#BBCCD7] selection:text-[#0C0C0C]">
      <HeroSection />
      <MarqueeSection />
      <ImageCircleSection />
      <AboutSection />
      <ServicesSection />
      <ProjectsSection />
      <TestimonialsSection />
      <FooterSection />
    </main>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        <Route path="/admin/*" element={<AdminRouter />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/services/:slug" element={<ServiceDetailPage />} />
        <Route path="*" element={<PublicSite />} />
      </Routes>
    </BrowserRouter>
  );
}

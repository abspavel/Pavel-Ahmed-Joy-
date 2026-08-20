import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import React, { useEffect, Suspense } from 'react';
import { HeroSection } from './sections/HeroSection';

const MarqueeSection = React.lazy(() => import('./sections/MarqueeSection').then(module => ({ default: module.MarqueeSection })));
const AchievementsSection = React.lazy(() => import('./sections/AchievementsSection').then(module => ({ default: module.AchievementsSection })));
const ImageCircleSection = React.lazy(() => import('./sections/ImageCircleSection').then(module => ({ default: module.ImageCircleSection })));
const AboutSection = React.lazy(() => import('./sections/AboutSection').then(module => ({ default: module.AboutSection })));
const SkillsCertificationsSection = React.lazy(() => import('./sections/SkillsCertificationsSection').then(module => ({ default: module.SkillsCertificationsSection })));
const ServicesSection = React.lazy(() => import('./sections/ServicesSection').then(module => ({ default: module.ServicesSection })));
const ProjectsSection = React.lazy(() => import('./sections/ProjectsSection').then(module => ({ default: module.ProjectsSection })));
const TestimonialsSection = React.lazy(() => import('./sections/TestimonialsSection').then(module => ({ default: module.TestimonialsSection })));
const FooterSection = React.lazy(() => import('./sections/FooterSection').then(module => ({ default: module.FooterSection })));

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

// Simple fallback skeleton for lazy loaded sections
function SectionSkeleton() {
  return (
    <div className="w-full h-[60vh] bg-[#0C0C0C] flex items-center justify-center">
      <div className="w-8 h-8 rounded-full border-2 border-[#D7E2EA]/20 border-t-[#D7E2EA] animate-spin"></div>
    </div>
  );
}

function PublicSite() {
  return (
    <main className="main-wrapper flex flex-col min-h-screen selection:bg-[#BBCCD7] selection:text-[#0C0C0C]">
      <HeroSection />
      <Suspense fallback={<SectionSkeleton />}>
        <MarqueeSection />
        <AchievementsSection />
        <ImageCircleSection />
        <AboutSection />
        <SkillsCertificationsSection />
        <ServicesSection />
        <ProjectsSection />
        <TestimonialsSection />
        <FooterSection />
      </Suspense>
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

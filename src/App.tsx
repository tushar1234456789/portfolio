import { useState, useRef } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { AboutSection } from './components/AboutSection';
import { TechnicalArsenal } from './components/TechnicalArsenal';
import { ProjectShowcase } from './components/ProjectShowcase';
import { TimelineSection } from './components/TimelineSection';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';

import { ResumeModal } from './components/ResumeModal';
import { useSmoothScroll } from './hooks/useSmoothScroll';

export default function App() {
  const [resumeOpen, setResumeOpen] = useState(false);
  const mainRef = useRef<HTMLElement>(null);
  
  // Initialize smooth scroll
  useSmoothScroll();

  return (
    <div className="relative min-h-screen bg-[#0A0A0C] text-[#e0e2e8] selection:bg-cyan-400 selection:text-black overflow-x-hidden font-sans">
      {/* Navigation Header */}
      <Header onOpenResume={() => setResumeOpen(true)} />

      {/* Main Page Sections */}
      <main ref={mainRef} className="relative z-10 space-y-12 pb-24">
        <Hero />
        <AboutSection />
        <TechnicalArsenal />
        <ProjectShowcase />
        <TimelineSection />
        <ContactSection />
      </main>

      {/* Footer */}
      <Footer />

      {/* Modals & Drawers */}
      <ResumeModal isOpen={resumeOpen} onClose={() => setResumeOpen(false)} />
    </div>
  );
}

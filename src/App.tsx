import { useState } from 'react';
import { BackgroundShader } from './components/BackgroundShader';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { AboutSection } from './components/AboutSection';
import { TechnicalArsenal } from './components/TechnicalArsenal';
import { ProjectShowcase } from './components/ProjectShowcase';
import { TimelineSection } from './components/TimelineSection';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { AITerminal } from './components/AITerminal';
import { ResumeModal } from './components/ResumeModal';
import { SourceCodeModal } from './components/SourceCodeModal';

export default function App() {
  const [terminalOpen, setTerminalOpen] = useState(false);
  const [resumeOpen, setResumeOpen] = useState(false);
  const [architectureOpen, setArchitectureOpen] = useState(false);

  return (
    <div className="relative min-h-screen bg-[#0A0A0C] text-[#e0e2e8] selection:bg-[#00f0ff] selection:text-black overflow-x-hidden font-sans">
      {/* Interactive WebGL Shader Background */}
      <BackgroundShader />

      {/* Navigation Header */}
      <Header
        onOpenTerminal={() => setTerminalOpen(true)}
        onOpenResume={() => setResumeOpen(true)}
        onOpenArchitecture={() => setArchitectureOpen(true)}
      />

      {/* Main Page Sections */}
      <main className="relative z-10 space-y-12">
        <Hero
          onOpenTerminal={() => setTerminalOpen(true)}
          onOpenArchitecture={() => setArchitectureOpen(true)}
        />
        <AboutSection />
        <TechnicalArsenal />
        <ProjectShowcase />
        <TimelineSection />
        <ContactSection />
      </main>

      {/* Footer */}
      <Footer />

      {/* Modals & Drawers */}
      <AITerminal isOpen={terminalOpen} onClose={() => setTerminalOpen(false)} />
      <ResumeModal isOpen={resumeOpen} onClose={() => setResumeOpen(false)} />
      <SourceCodeModal
        isOpen={architectureOpen}
        onClose={() => setArchitectureOpen(false)}
      />
    </div>
  );
}

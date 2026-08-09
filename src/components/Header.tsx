import React, { useState, useEffect } from 'react';
import { playClickSound, playHoverSound, toggleAudioSound, isAudioEnabled } from '../utils/audioFX';

interface HeaderProps {
  onOpenResume: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  onOpenResume,
}) => {
  const [audioOn, setAudioOn] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    setAudioOn(isAudioEnabled());

    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleToggleAudio = () => {
    const newState = toggleAudioSound();
    setAudioOn(newState);
    if (newState) playClickSound();
  };

  const navLinks = [
    { name: 'Home', href: '#home' },
    { name: 'About', href: '#about' },
    { name: 'Expertise', href: '#expertise' },
    { name: 'Projects', href: '#projects' },
    { name: 'Timeline', href: '#timeline' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 border-b ${
        scrolled
          ? 'bg-[#0a0a0a]/90 backdrop-blur-xl border-white/10 shadow-2xl h-16'
          : 'bg-[#0a0a0a]/60 backdrop-blur-md border-white/5 h-20'
      }`}
    >
      <div className="flex justify-between items-center h-full px-6 md:px-12 max-w-[1280px] mx-auto">
        {/* Brand Logo - Artistic Flair style */}
        <a
          href="#home"
          onMouseEnter={playHoverSound}
          onClick={playClickSound}
          className="flex items-center gap-2 text-xl font-black tracking-tighter text-white hover:opacity-90 transition-opacity"
        >
          <span>TUSHAR.G</span>
          <span className="text-emerald-400 font-bold">/</span>
        </a>

        {/* Desktop Navigation - Artistic Flair tracking & style */}
        <nav className="hidden md:flex items-center gap-8 text-[11px] uppercase tracking-[0.2em] font-medium">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              onMouseEnter={playHoverSound}
              onClick={playClickSound}
              className="text-white/60 hover:text-white hover:border-b hover:border-emerald-400 pb-0.5 transition-all"
            >
              {link.name}
            </a>
          ))}
        </nav>

        {/* Quick Action Controls */}
        <div className="hidden md:flex items-center gap-3">
          {/* Toggle Audio */}
          <button
            onClick={handleToggleAudio}
            onMouseEnter={playHoverSound}
            title={audioOn ? 'Mute Audio FX' : 'Enable Audio FX'}
            className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center text-white/70 hover:text-emerald-400 hover:border-emerald-400/50 transition-all"
          >
            <span className="material-symbols-outlined text-lg">
              {audioOn ? 'volume_up' : 'volume_off'}
            </span>
          </button>



          {/* View Resume Button - Artistic Flair bold white button */}
          <button
            onClick={() => {
              playClickSound();
              onOpenResume();
            }}
            onMouseEnter={playHoverSound}
            className="px-5 py-2.5 bg-white text-black font-bold uppercase text-[11px] tracking-widest hover:scale-105 transition-transform rounded-full shadow-lg flex items-center gap-1.5"
          >
            <span className="material-symbols-outlined text-sm">description</span>
            <span>Resume</span>
          </button>
        </div>

        {/* Mobile Hamburger Button */}
        <button
          onClick={() => {
            playClickSound();
            setMobileMenuOpen(!mobileMenuOpen);
          }}
          className="md:hidden w-10 h-10 rounded-full border border-white/20 flex items-center justify-center text-white"
        >
          <span className="material-symbols-outlined text-lg">
            {mobileMenuOpen ? 'close' : 'menu'}
          </span>
        </button>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#101417]/95 backdrop-blur-2xl border-b border-white/10 px-6 py-6 space-y-4">
          <nav className="flex flex-col gap-3 font-medium">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => {
                  playClickSound();
                  setMobileMenuOpen(false);
                }}
                className="text-[#e0e2e8] hover:text-[#00f0ff] py-2 border-b border-white/5"
              >
                {link.name}
              </a>
            ))}
          </nav>
          <div className="flex flex-wrap gap-3 pt-4">

            <button
              onClick={() => {
                playClickSound();
                setMobileMenuOpen(false);
                onOpenResume();
              }}
              className="flex-1 py-2.5 rounded bg-[#00f0ff] text-black font-mono text-xs font-semibold flex items-center justify-center gap-2"
            >
              <span className="material-symbols-outlined text-sm">description</span>
              <span>Resume</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};

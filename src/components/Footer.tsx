import React from 'react';
import { PERSONAL_INFO } from '../data/portfolioData';
import { playClickSound, playHoverSound } from '../utils/audioFX';
import { ScrollReveal } from './ScrollReveal';

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    playClickSound();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-black border-t border-white/10 py-12 px-6 md:px-12 relative z-10 font-mono text-xs text-zinc-400">
      <ScrollReveal>
        <div className="max-w-[1280px] mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-3">
            <div className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse shadow-lg shadow-emerald-400/50" />
            <span className="font-serif font-black text-white text-base tracking-widest">TUSHAR.G</span>
            <span className="text-zinc-500">© 2026. Engineered with Precision.</span>
          </div>

          <div className="flex items-center gap-6 uppercase tracking-widest text-[11px]">
            <a
              href={PERSONAL_INFO.linkedin}
              target="_blank"
              rel="noreferrer"
              onMouseEnter={playHoverSound}
              className="hover:text-emerald-400 transition-colors"
            >
              LinkedIn
            </a>
            <a
              href={PERSONAL_INFO.github}
              target="_blank"
              rel="noreferrer"
              onMouseEnter={playHoverSound}
              className="hover:text-emerald-400 transition-colors"
            >
              GitHub
            </a>
            <a
              href={`mailto:${PERSONAL_INFO.email}`}
              onMouseEnter={playHoverSound}
              className="hover:text-emerald-400 transition-colors"
            >
              Email
            </a>
          </div>

          <button
            onClick={scrollToTop}
            onMouseEnter={playHoverSound}
            className="px-5 py-2.5 rounded-full bg-zinc-900 hover:bg-emerald-400 hover:text-black text-emerald-400 border border-white/10 hover:border-emerald-400 transition-all flex items-center gap-1.5 uppercase tracking-widest text-[10px] font-bold shadow-xl"
          >
            <span className="material-symbols-outlined text-sm">arrow_upward</span>
            <span>Top</span>
          </button>
        </div>
      </ScrollReveal>
    </footer>
  );
};

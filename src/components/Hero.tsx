import React, { useRef } from 'react';
import { PERSONAL_INFO } from '../data/portfolioData';
import { playClickSound, playHoverSound } from '../utils/audioFX';
import { useScrollProgress } from '../hooks/useScrollProgress';

export const Hero: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const scrollProgress = useScrollProgress(sectionRef, 'top top', 'bottom top');
  
  // Parallax calculations based on scroll progress
  const textTranslateY = scrollProgress * 150;
  const imageTranslateY = scrollProgress * 50;
  
  return (
    <section 
      id="home" 
      ref={sectionRef}
      className="min-h-screen flex flex-col justify-center px-6 md:px-12 w-full mx-auto pt-32 md:pt-40 pb-12 lg:pb-24 relative z-10 overflow-hidden"
    >
      <div className="max-w-[1280px] mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center relative z-10">
        {/* Left Copy & Actions - 7 cols */}
        <div 
          className="lg:col-span-7 space-y-8"
          style={{ transform: `translateY(-${textTranslateY}px)` }}
        >
          {/* Eyebrow & Status */}
          <div className="space-y-2 animate-fadeIn">
            <span className="block text-[12px] uppercase tracking-[0.5em] text-white/40">
              Senior AI/ML & Full Stack Architect
            </span>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-[11px] font-mono font-semibold uppercase tracking-widest">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>Available for Global Directives // 2026</span>
            </div>
          </div>

          {/* Main Headline */}
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-black leading-[0.9] tracking-tighter text-white uppercase animate-fadeIn" style={{ animationDelay: '0.1s' }}>
            BUILDING <br />
            <span className="text-stroke">DIGITAL</span> <br />
            <span className="font-serif italic text-emerald-400 font-normal normal-case">Intelligence</span>
          </h1>

          {/* Subtitle */}
          <p className="text-zinc-400 max-w-xl text-base sm:text-lg leading-relaxed font-light animate-fadeIn" style={{ animationDelay: '0.2s' }}>
            {PERSONAL_INFO.bio}
          </p>

          {/* Action Buttons */}
          <div className="flex flex-wrap items-center gap-4 pt-4 animate-fadeIn" style={{ animationDelay: '0.3s' }}>
            <a
              href="#contact"
              onMouseEnter={playHoverSound}
              onClick={playClickSound}
              className="px-8 py-4 bg-emerald-400 text-black font-bold uppercase text-xs tracking-widest hover:bg-white hover:scale-105 transition-all shadow-xl flex items-center gap-2 rounded-none"
            >
              <span>Deploy Project</span>
              <span className="material-symbols-outlined text-sm">rocket_launch</span>
            </a>
          </div>
          
          {/* Quick Stats Grid Bar */}
          <div className="mt-8 grid grid-cols-2 sm:grid-cols-4 gap-4 p-6 rounded-2xl glass-strong animate-fadeInUp" style={{ animationDelay: '0.4s' }}>
            {PERSONAL_INFO.stats.map((stat) => (
              <div key={stat.label} className="text-center sm:text-left space-y-1">
                <div className="font-sans text-2xl sm:text-3xl font-black text-emerald-400 tracking-tight">
                  {stat.value}
                </div>
                <div className="text-[11px] text-zinc-400 font-medium uppercase tracking-[0.15em]">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Side: Photo Showcase - 5 cols */}
        <div 
          className="lg:col-span-5 relative h-[420px] sm:h-[500px] w-full flex items-center justify-center animate-fadeIn"
          style={{ animationDelay: '0.2s', transform: `translateY(-${imageTranslateY}px)` }}
        >
          {/* Container Frame */}
          <div className="w-full h-full rounded-[36px] overflow-hidden border border-emerald-500/30 glass shadow-2xl relative p-3 group">
            <div className="relative w-full h-full rounded-[28px] overflow-hidden border border-white/10">
              <img
                src={PERSONAL_INFO.profileImage}
                alt={PERSONAL_INFO.name}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 filter contrast-105 brightness-105 opacity-90 mix-blend-luminosity hover:mix-blend-normal"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent pointer-events-none" />

              {/* Overlay Title Tag */}
              <div className="absolute bottom-5 left-5 right-5 p-4 rounded-2xl glass-strong flex justify-between items-center pointer-events-none">
                <div>
                  <div className="text-[10px] uppercase tracking-widest text-emerald-400 font-mono font-bold">
                    {PERSONAL_INFO.name}
                  </div>
                  <div className="text-sm font-serif italic text-white">
                    Lead AI Architect
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse shadow-lg shadow-emerald-400/50" />
                  <span className="text-[10px] font-mono text-emerald-300 uppercase font-semibold">Online</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/30 animate-scrollIndicator">
        <span className="text-[9px] uppercase tracking-[0.3em] font-mono">Scroll to explore</span>
        <span className="material-symbols-outlined text-sm">keyboard_double_arrow_down</span>
      </div>
    </section>
  );
};

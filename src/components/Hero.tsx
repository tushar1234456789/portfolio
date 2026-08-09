import React from 'react';
import { PERSONAL_INFO } from '../data/portfolioData';
import { ThreeHeroCanvas } from './ThreeHeroCanvas';
import { playClickSound, playHoverSound } from '../utils/audioFX';

interface HeroProps {
  onOpenArchitecture: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenArchitecture }) => {
  return (
    <section id="home" className="min-h-[85vh] flex flex-col justify-center px-6 md:px-12 max-w-[1280px] mx-auto pt-28 pb-12 relative z-10">
      {/* Background ambient glow orbs from Artistic Flair theme */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden -z-10">
        <div className="absolute top-[-100px] right-[-100px] w-[500px] h-[500px] bg-indigo-600/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-[-50px] left-[-50px] w-[400px] h-[400px] bg-emerald-500/10 rounded-full blur-[100px]" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center w-full">
        {/* Left Copy & Actions - 7 cols */}
        <div className="lg:col-span-7 space-y-6">
          {/* Eyebrow & Status */}
          <div className="space-y-2">
            <span className="block text-[12px] uppercase tracking-[0.5em] text-white/40">
              Senior AI/ML & Full Stack Architect
            </span>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-[11px] font-mono font-semibold uppercase tracking-widest">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>Available for Global Directives // 2026</span>
            </div>
          </div>

          {/* Main Headline - Artistic Flair Stroke & Serif Typography */}
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-black leading-[0.9] tracking-tighter text-white uppercase">
            BUILDING <br />
            <span className="text-stroke">DIGITAL</span> <br />
            <span className="font-serif italic text-emerald-400 font-normal normal-case">Intelligence</span>
          </h1>

          {/* Subtitle */}
          <p className="text-zinc-400 max-w-xl text-base sm:text-lg leading-relaxed font-light">
            {PERSONAL_INFO.bio}
          </p>

          {/* Action Buttons */}
          <div className="flex flex-wrap items-center gap-4 pt-2">
            <a
              href="#contact"
              onMouseEnter={playHoverSound}
              onClick={playClickSound}
              className="px-8 py-4 bg-white text-black font-bold uppercase text-xs tracking-widest hover:scale-105 transition-transform shadow-xl flex items-center gap-2 rounded-none"
            >
              <span>Deploy Project</span>
              <span className="material-symbols-outlined text-sm">rocket_launch</span>
            </a>

            <button
              onClick={() => {
                playClickSound();
                onOpenArchitecture();
              }}
              onMouseEnter={playHoverSound}
              className="px-6 py-3.5 rounded-full border border-emerald-500/40 bg-emerald-500/10 text-emerald-400 hover:bg-emerald-500/20 hover:border-emerald-400 transition-all text-xs font-mono font-semibold uppercase tracking-wider flex items-center gap-2"
            >
              <span className="material-symbols-outlined text-sm">data_object</span>
              <span>View Source</span>
            </button>

          </div>
        </div>

        {/* Right Side: Photo Showcase - 5 cols */}
        <div className="lg:col-span-5 relative h-[420px] sm:h-[500px] w-full flex items-center justify-center">
          {/* Tilted Artistic Container Frame */}
          <div className="w-full h-full rounded-[36px] overflow-hidden border border-emerald-500/30 bg-zinc-900/90 backdrop-blur-xl shadow-2xl lg:rotate-2 relative p-3 group hover:rotate-0 transition-transform duration-500">
            <div className="relative w-full h-full rounded-[28px] overflow-hidden border border-white/10">
              <img
                src={PERSONAL_INFO.profileImage}
                alt={PERSONAL_INFO.name}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 filter contrast-105 brightness-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent pointer-events-none" />

              {/* Overlay Title Tag */}
              <div className="absolute bottom-5 left-5 right-5 p-4 rounded-2xl bg-black/75 backdrop-blur-md border border-white/15 flex justify-between items-center pointer-events-none">
                <div>
                  <div className="text-[10px] uppercase tracking-widest text-emerald-400 font-mono font-bold">
                    {PERSONAL_INFO.name}
                  </div>
                  <div className="text-sm font-serif italic text-white">
                    Lead AI Architect @ UpSqode
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse shadow-lg shadow-emerald-400/50" />
                  <span className="text-[10px] font-mono text-emerald-300 uppercase font-semibold">Online</span>
                </div>
              </div>
            </div>
          </div>

          {/* Artistic Floating Accent Badge */}
          <div className="absolute -left-6 top-[20%] p-3.5 rounded-2xl bg-zinc-900/90 backdrop-blur-md border border-emerald-500/40 -rotate-12 hidden sm:flex items-center gap-3 shadow-2xl pointer-events-none">
            <div className="w-10 h-10 border-2 border-emerald-400 rounded-xl bg-emerald-500/10 flex items-center justify-center">
              <span className="material-symbols-outlined text-emerald-400 text-lg">verified</span>
            </div>
            <div>
              <div className="text-[10px] font-mono font-bold uppercase tracking-widest text-emerald-400">8+ Years Tenure</div>
              <div className="text-xs text-white font-medium">Gujarat, India</div>
            </div>
          </div>

          <div className="absolute -right-4 bottom-[15%] p-3 rounded-2xl bg-zinc-900/90 backdrop-blur-md border border-indigo-500/40 rotate-6 hidden sm:flex items-center gap-2.5 shadow-2xl pointer-events-none">
            <span className="material-symbols-outlined text-indigo-400 text-base">psychology</span>
            <span className="text-[11px] font-mono text-indigo-200 font-semibold uppercase tracking-wider">AI / ML Expert</span>
          </div>
        </div>
      </div>

      {/* Quick Stats Grid Bar */}
      <div className="mt-16 grid grid-cols-2 sm:grid-cols-4 gap-4 p-6 rounded-2xl bg-zinc-900/60 backdrop-blur-xl border border-white/10 shadow-2xl">
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
    </section>
  );
};

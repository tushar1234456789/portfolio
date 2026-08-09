import React, { useState, useRef, useEffect } from 'react';
import { PROJECTS } from '../data/portfolioData';
import { Project } from '../types';
import { playClickSound, playHoverSound } from '../utils/audioFX';
import { useDeviceCapability } from '../hooks/useDeviceCapability';
import { TiltCard } from './TiltCard';
import { ScrollReveal } from './ScrollReveal';

export const ProjectShowcase: React.FC = () => {
  const [filter, setFilter] = useState<string>('all');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const filteredProjects = filter === 'all' ? PROJECTS : PROJECTS.filter((p) => p.category === filter);

  return (
    <section id="projects" className="py-24 relative z-10 w-full overflow-hidden" ref={containerRef}>
      {/* Header Container - Fixed inside the section during pinning */}
      <div className="px-6 md:px-12 max-w-[1280px] mx-auto w-full">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 gap-6 border-b border-white/10 pb-8">
          <div>
            <span className="block text-[12px] uppercase tracking-[0.4em] text-white/40 mb-2">
              Case Studies & Systems
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black uppercase tracking-tight text-white">
              FEATURED DIRECTIVES <span className="text-cyan-400 font-light">& Engineering Specs</span>
            </h2>
          </div>

          <div className="flex flex-wrap gap-2 text-xs">
            {[
              { id: 'all', label: 'All Projects' },
              { id: 'ai_ml', label: 'AI & RAG' },
              { id: 'systems', label: 'High-Perf Systems' },
              { id: 'graphics', label: '3D & WebGL' },
            ].map((item) => (
              <button
                key={item.id}
                onClick={() => {
                  playClickSound();
                  setFilter(item.id);
                }}
                onMouseEnter={playHoverSound}
                className={`px-5 py-2.5 rounded-full text-xs uppercase tracking-widest font-semibold transition-all ${
                  filter === item.id
                    ? 'bg-cyan-400 text-black shadow-[0_0_15px_rgba(34,211,238,0.4)] scale-105'
                    : 'bg-zinc-900 text-zinc-400 hover:text-white border border-white/10'
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Projects Vertical Wrapper */}
      <div className="w-full flex flex-col gap-16 px-6 md:px-12 max-w-[1280px] mx-auto">
        {filteredProjects.map((project, idx) => (
          <ScrollReveal key={project.id} delay={idx * 0.1}>
            <div className="w-full">
              <TiltCard maxTilt={2} scale={1.01}>
                <div
                  onClick={() => {
                    playClickSound();
                    setSelectedProject(project);
                  }}
                  onMouseEnter={playHoverSound}
                  className="p-6 md:p-10 rounded-[32px] glass-strong border border-white/10 hover:border-cyan-400/50 transition-all cursor-pointer flex flex-col justify-between shadow-2xl h-full group"
                >
                  <div className="flex flex-col lg:flex-row gap-12 items-center h-full">
                    {/* Left: Image */}
                    <div className="w-full lg:w-1/2 h-64 lg:h-[450px] rounded-2xl overflow-hidden border border-white/10 relative bg-black shrink-0">
                      <img
                        src={project.image}
                        alt={project.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 opacity-80 group-hover:opacity-100"
                      />
                      
                      <div className="absolute bottom-4 left-4 right-4 flex flex-wrap gap-2 z-10 pointer-events-none">
                        {project.metrics.map((m) => (
                          <div
                            key={m.label}
                            className="px-3 py-1 rounded-full glass border border-white/10 font-mono text-[11px]"
                          >
                            <span className="text-zinc-400">{m.label}: </span>
                            <span className="text-cyan-400 font-bold">{m.value}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Right: Content */}
                    <div className="w-full lg:w-1/2 flex flex-col justify-center space-y-6">
                      <h3 className="text-3xl lg:text-4xl font-bold text-white group-hover:text-cyan-400 transition-colors tracking-tight leading-none">
                        {project.title}
                      </h3>
                      <p className="text-sm lg:text-base text-zinc-400 leading-relaxed font-light">{project.shortDesc}</p>

                      <div className="flex flex-wrap gap-2">
                        {project.tags.map((tag) => (
                          <span
                            key={tag}
                            className="px-3 py-1 rounded-full bg-cyan-400/10 border border-cyan-500/30 text-cyan-300 font-mono text-[11px]"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>

                      <div className="flex justify-between items-center pt-6 border-t border-white/10 font-mono text-xs">
                        <span className="text-cyan-400 font-bold flex items-center gap-1 group-hover:translate-x-2 transition-transform uppercase tracking-wider">
                          <span>Inspect Architecture</span>
                          <span className="material-symbols-outlined text-sm">arrow_forward</span>
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </TiltCard>
            </div>
          </ScrollReveal>
        ))}
      </div>

      {/* Deep Spec Project Modal */}
      {selectedProject && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-xl animate-fadeIn">
          <div className="w-full max-w-3xl max-h-[90vh] overflow-y-auto p-8 rounded-3xl glass-strong border border-cyan-500/40 shadow-2xl space-y-6 relative">
            <button
              onClick={() => {
                playClickSound();
                setSelectedProject(null);
              }}
              className="absolute top-6 right-6 w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-zinc-400 hover:text-white hover:border-white/30 transition-all"
            >
              <span className="material-symbols-outlined text-xl">close</span>
            </button>

            <div className="text-[10px] font-mono text-cyan-400 uppercase tracking-widest font-bold">
              Project Specification // {selectedProject.category}
            </div>

            <h3 className="text-3xl font-black text-white">{selectedProject.title}</h3>

            <div className="h-64 w-full rounded-2xl overflow-hidden border border-white/10 relative">
              <img
                src={selectedProject.image}
                alt={selectedProject.title}
                className="w-full h-full object-cover"
              />
            </div>

            <div className="space-y-2">
              <h4 className="text-[10px] font-mono text-cyan-400 uppercase font-bold tracking-widest">Executive Overview:</h4>
              <p className="text-sm text-zinc-200 leading-relaxed bg-black/60 p-5 rounded-2xl border border-white/5 font-light">
                {selectedProject.fullDesc}
              </p>
            </div>

            {/* Key Performance Metrics */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {selectedProject.metrics.map((m) => (
                <div key={m.label} className="p-4 rounded-2xl bg-black/60 border border-white/5 text-center">
                  <div className="text-[10px] text-zinc-500 font-mono uppercase tracking-wider">{m.label}</div>
                  <div className="text-lg font-bold font-mono text-cyan-400 mt-1">{m.value}</div>
                </div>
              ))}
            </div>

            {/* Architectural Highlights */}
            <div className="space-y-2">
              <h4 className="text-[10px] font-mono text-indigo-300 uppercase font-bold tracking-widest">Key Architectural Highlights:</h4>
              <ul className="space-y-2 text-xs font-mono text-zinc-300">
                {selectedProject.architecture.map((item, i) => (
                  <li key={i} className="flex items-start gap-2.5 bg-black/60 p-3 rounded-xl border border-white/5">
                    <span className="text-cyan-400">▸</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Close Button */}
            <div className="pt-4 border-t border-white/10 flex justify-end">
              <button
                onClick={() => {
                  playClickSound();
                  setSelectedProject(null);
                }}
                className="px-8 py-3.5 rounded-full bg-cyan-400 text-black font-bold uppercase text-xs tracking-widest hover:scale-105 transition-transform shadow-xl"
              >
                Acknowledge Directive
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

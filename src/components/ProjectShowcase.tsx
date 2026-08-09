import React, { useState } from 'react';
import { PROJECTS } from '../data/portfolioData';
import { Project } from '../types';
import { ThreeHeroCanvas } from './ThreeHeroCanvas';
import { playClickSound, playHoverSound } from '../utils/audioFX';

export const ProjectShowcase: React.FC = () => {
  const [filter, setFilter] = useState<string>('all');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [interactive3dMap, setInteractive3dMap] = useState<Record<string, boolean>>({});

  const filteredProjects =
    filter === 'all' ? PROJECTS : PROJECTS.filter((p) => p.category === filter);

  const toggle3dMode = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    playClickSound();
    setInteractive3dMap((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <section id="projects" className="py-24 px-6 md:px-12 max-w-[1280px] mx-auto relative z-10">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 gap-6 border-b border-white/10 pb-8">
        <div>
          <span className="block text-[12px] uppercase tracking-[0.4em] text-white/40 mb-2">
            Case Studies & Systems
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black uppercase tracking-tight text-white">
            FEATURED DIRECTIVES <span className="font-serif italic text-emerald-400 font-normal normal-case">& Engineering Specs</span>
          </h2>
        </div>

        {/* Filters */}
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
                  ? 'bg-white text-black shadow-xl scale-105'
                  : 'bg-zinc-900 text-zinc-400 hover:text-white border border-white/10'
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {filteredProjects.map((project) => {
          const is3d = !!interactive3dMap[project.id];

          return (
            <div
              key={project.id}
              onClick={() => {
                playClickSound();
                setSelectedProject(project);
              }}
              onMouseEnter={playHoverSound}
              className="p-8 rounded-3xl bg-zinc-900/90 border border-white/10 hover:border-emerald-400/50 transition-all hover:shadow-2xl group cursor-pointer flex flex-col justify-between shadow-xl"
            >
              <div>
                {/* Visual Viewport Header */}
                <div className="relative h-64 w-full rounded-2xl overflow-hidden border border-white/10 mb-6 bg-black">
                  {is3d ? (
                    <div className="w-full h-full bg-black/90">
                      <ThreeHeroCanvas modelType={project.model3dType || 'brain'} />
                    </div>
                  ) : (
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-80 group-hover:opacity-100"
                    />
                  )}

                  {/* 3D Viewport Toggle Button */}
                  <button
                    onClick={(e) => toggle3dMode(project.id, e)}
                    className="absolute top-4 right-4 px-3.5 py-1.5 rounded-full bg-black/80 backdrop-blur-md border border-emerald-400/40 text-emerald-400 text-[11px] font-mono font-bold uppercase tracking-wider flex items-center gap-1.5 hover:bg-emerald-400 hover:text-black transition-all shadow-xl z-20"
                  >
                    <span className="material-symbols-outlined text-sm">
                      {is3d ? 'image' : '3d_rotation'}
                    </span>
                    <span>{is3d ? 'Image View' : '3D Canvas'}</span>
                  </button>

                  <div className="absolute bottom-4 left-4 right-4 flex flex-wrap gap-2 z-10 pointer-events-none">
                    {project.metrics.map((m) => (
                      <div
                        key={m.label}
                        className="px-3 py-1 rounded-full bg-black/90 backdrop-blur-md border border-white/10 font-mono text-[11px]"
                      >
                        <span className="text-zinc-400">{m.label}: </span>
                        <span className="text-emerald-400 font-bold">{m.value}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Project Title & Short Desc */}
                <h3 className="text-2xl font-bold text-white group-hover:text-emerald-400 transition-colors mb-2 tracking-tight">
                  {project.title}
                </h3>
                <p className="text-sm text-zinc-400 mb-6 leading-relaxed font-light">{project.shortDesc}</p>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-6">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 font-mono text-[11px]"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Action Footer */}
              <div className="flex justify-between items-center pt-4 border-t border-white/10 font-mono text-xs">
                <span className="text-emerald-400 font-bold flex items-center gap-1 group-hover:translate-x-1.5 transition-transform uppercase tracking-wider">
                  <span>Inspect Architecture</span>
                  <span className="material-symbols-outlined text-sm">arrow_forward</span>
                </span>
                <span className="text-zinc-500 text-[10px] uppercase tracking-widest">Deep Spec</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Deep Spec Project Modal */}
      {selectedProject && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-xl animate-fadeIn">
          <div className="w-full max-w-3xl max-h-[90vh] overflow-y-auto p-8 rounded-3xl bg-zinc-900 border border-emerald-500/40 shadow-2xl space-y-6 relative">
            <button
              onClick={() => {
                playClickSound();
                setSelectedProject(null);
              }}
              className="absolute top-6 right-6 w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-zinc-400 hover:text-white hover:border-white/30 transition-all"
            >
              <span className="material-symbols-outlined text-xl">close</span>
            </button>

            <div className="text-[10px] font-mono text-emerald-400 uppercase tracking-widest font-bold">
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
              <h4 className="text-[10px] font-mono text-emerald-400 uppercase font-bold tracking-widest">Executive Overview:</h4>
              <p className="text-sm text-zinc-200 leading-relaxed bg-black/60 p-5 rounded-2xl border border-white/5 font-light">
                {selectedProject.fullDesc}
              </p>
            </div>

            {/* Key Performance Metrics */}
            <div className="grid grid-cols-3 gap-3">
              {selectedProject.metrics.map((m) => (
                <div key={m.label} className="p-4 rounded-2xl bg-black/60 border border-white/5 text-center">
                  <div className="text-[10px] text-zinc-500 font-mono uppercase tracking-wider">{m.label}</div>
                  <div className="text-lg font-bold font-mono text-emerald-400 mt-1">{m.value}</div>
                </div>
              ))}
            </div>

            {/* Architectural Highlights */}
            <div className="space-y-2">
              <h4 className="text-[10px] font-mono text-indigo-300 uppercase font-bold tracking-widest">Key Architectural Highlights:</h4>
              <ul className="space-y-2 text-xs font-mono text-zinc-300">
                {selectedProject.architecture.map((item, i) => (
                  <li key={i} className="flex items-start gap-2.5 bg-black/60 p-3 rounded-xl border border-white/5">
                    <span className="text-emerald-400">▸</span>
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
                className="px-8 py-3.5 rounded-full bg-emerald-400 text-black font-bold uppercase text-xs tracking-widest hover:scale-105 transition-transform shadow-xl"
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

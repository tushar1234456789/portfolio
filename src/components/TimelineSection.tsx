import React, { useState } from 'react';
import { TIMELINE } from '../data/portfolioData';
import { playClickSound, playHoverSound } from '../utils/audioFX';

export const TimelineSection: React.FC = () => {
  const [expandedId, setExpandedId] = useState<string>(TIMELINE[0].id);

  return (
    <section id="timeline" className="py-24 px-6 md:px-12 max-w-[1280px] mx-auto relative z-10">
      {/* Header */}
      <div className="mb-16 border-b border-white/10 pb-8">
        <span className="block text-[12px] uppercase tracking-[0.4em] text-white/40 mb-2">
          Career Milestones
        </span>
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black uppercase tracking-tight text-white">
          CAREER TIMELINE <span className="font-serif italic text-emerald-400 font-normal normal-case">& Engineering Impact</span>
        </h2>
      </div>

      {/* Vertical Timeline */}
      <div className="relative border-l-2 border-emerald-500/30 ml-4 md:ml-8 space-y-10 pl-6 md:pl-10">
        {TIMELINE.map((item) => {
          const isExpanded = expandedId === item.id;

          return (
            <div key={item.id} className="relative group">
              {/* Glowing Node Dot */}
              <div
                className={`absolute -left-[31px] md:-left-[47px] top-2 w-5 h-5 rounded-full border-2 transition-all ${
                  isExpanded
                    ? 'bg-emerald-400 border-white shadow-2xl scale-125'
                    : 'bg-zinc-900 border-emerald-500/60 group-hover:bg-emerald-400'
                }`}
              />

              {/* Card Container */}
              <div
                onClick={() => {
                  playClickSound();
                  setExpandedId(isExpanded ? '' : item.id);
                }}
                onMouseEnter={playHoverSound}
                className="p-8 rounded-3xl bg-zinc-900/90 border border-white/10 hover:border-emerald-400/50 transition-all cursor-pointer shadow-xl hover:shadow-2xl"
              >
                <div className="flex flex-col md:flex-row justify-between md:items-center gap-2 mb-3">
                  <div>
                    <span className="px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 font-mono text-xs font-bold uppercase tracking-wider mr-3">
                      {item.period}
                    </span>
                    <h3 className="inline text-xl font-bold text-white tracking-tight">{item.role}</h3>
                  </div>
                  <div className="font-mono text-xs text-indigo-300 font-semibold uppercase tracking-wider">
                    {item.company} • {item.location}
                  </div>
                </div>

                {/* Always visible brief */}
                <div className="text-xs text-zinc-400 mt-2 font-mono flex items-center gap-2">
                  <span className="material-symbols-outlined text-sm text-emerald-400">
                    {isExpanded ? 'unfold_less' : 'unfold_more'}
                  </span>
                  <span className="uppercase tracking-widest text-[10px]">
                    {isExpanded ? 'Click to collapse details' : 'Click to inspect achievements'}
                  </span>
                </div>

                {/* Expanded Details */}
                {isExpanded && (
                  <div className="mt-6 pt-6 border-t border-white/10 space-y-5 animate-fadeIn">
                    <div className="space-y-3">
                      <div className="text-[10px] font-mono text-emerald-400 uppercase font-bold tracking-widest">Key Deliverables & Executive Impact:</div>
                      <ul className="space-y-2.5 text-xs text-zinc-200">
                        {item.highlights.map((h, i) => (
                          <li key={i} className="flex items-start gap-2.5 bg-black/50 p-3.5 rounded-2xl border border-white/5 font-light">
                            <span className="text-emerald-400 font-bold">▸</span>
                            <span>{h}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="flex flex-wrap gap-2 pt-2">
                      {item.technologies.map((tech) => (
                        <span
                          key={tech}
                          className="px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/30 text-indigo-300 font-mono text-[11px]"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

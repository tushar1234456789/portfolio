import React, { useState } from 'react';
import { SKILL_CATEGORIES } from '../data/portfolioData';
import { playClickSound, playHoverSound } from '../utils/audioFX';
import { ScrollReveal } from './ScrollReveal';
import { TiltCard } from './TiltCard';

export const TechnicalArsenal: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [inspectedSkill, setInspectedSkill] = useState<{
    name: string;
    level: number;
    experience: string;
    details: string;
    categoryTitle: string;
  } | null>(null);

  const categoriesToDisplay =
    selectedCategory === 'all'
      ? SKILL_CATEGORIES
      : SKILL_CATEGORIES.filter((c) => c.id === selectedCategory);

  return (
    <section id="expertise" className="py-24 px-6 md:px-12 max-w-[1280px] mx-auto relative z-10">
      {/* Header */}
      <ScrollReveal>
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 gap-6 border-b border-white/10 pb-8">
          <div>
            <span className="block text-[12px] uppercase tracking-[0.4em] text-white/40 mb-2">
              Competency Blueprint
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black uppercase tracking-tight text-white">
              TECHNICAL ARSENAL <span className="text-cyan-400 font-light">& Core Matrix</span>
            </h2>
          </div>

          {/* Filter Chips */}
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => {
                playClickSound();
                setSelectedCategory('all');
              }}
              onMouseEnter={playHoverSound}
              className={`px-5 py-2.5 rounded-full text-xs uppercase tracking-widest font-semibold transition-all ${
                selectedCategory === 'all'
                  ? 'bg-cyan-400 text-black shadow-[0_0_15px_rgba(34,211,238,0.4)] scale-105'
                  : 'bg-zinc-900 text-zinc-400 hover:text-white border border-white/10'
              }`}
            >
              All Disciplines
            </button>
            {SKILL_CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                onClick={() => {
                  playClickSound();
                  setSelectedCategory(cat.id);
                }}
                onMouseEnter={playHoverSound}
                className={`px-5 py-2.5 rounded-full text-xs uppercase tracking-widest font-semibold transition-all ${
                  selectedCategory === cat.id
                    ? 'bg-cyan-400 text-black shadow-[0_0_15px_rgba(34,211,238,0.4)] scale-105'
                    : 'bg-zinc-900 text-zinc-400 hover:text-white border border-white/10'
                }`}
              >
                {cat.title}
              </button>
            ))}
          </div>
        </div>
      </ScrollReveal>

      {/* Grid of Skill Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {categoriesToDisplay.map((cat, idx) => (
          <ScrollReveal key={cat.id} delay={idx * 0.1}>
            <TiltCard maxTilt={5}>
              <div
                onMouseEnter={playHoverSound}
                className="h-full p-8 rounded-3xl glass border border-white/10 hover:border-cyan-400/50 transition-all flex flex-col justify-between group shadow-xl relative overflow-hidden"
              >
                <div>
                  {/* Header inside card */}
                  <div className="flex justify-between items-center mb-6">
                    <span
                      className="material-symbols-outlined text-4xl group-hover:scale-110 transition-transform"
                      style={{ color: cat.accentColor }}
                    >
                      {cat.icon}
                    </span>
                    <span
                      className="px-3 py-1 rounded-full text-[10px] font-mono font-bold uppercase tracking-wider"
                      style={{
                        backgroundColor: cat.badgeBg,
                        border: `1px solid ${cat.badgeBorder}`,
                        color: cat.badgeText,
                      }}
                    >
                      {cat.skills.length} Competencies
                    </span>
                  </div>

                  <h3 className="text-xl font-bold text-white mb-2 tracking-tight">{cat.title}</h3>
                  <p className="text-xs text-zinc-400 mb-8 leading-relaxed font-light">{cat.description}</p>

                  {/* Progress Skill Bars */}
                  <div className="space-y-5">
                    {cat.skills.map((skill, skillIdx) => (
                      <div
                        key={skill.name}
                        onClick={() => {
                          playClickSound();
                          setInspectedSkill({ ...skill, categoryTitle: cat.title });
                        }}
                        onMouseEnter={playHoverSound}
                        className="cursor-pointer group/skill"
                      >
                        <div className="flex justify-between text-xs mb-1.5 font-medium">
                          <span className="text-zinc-200 group-hover/skill:text-cyan-400 transition-colors flex items-center gap-1.5">
                            <span>{skill.name}</span>
                            <span className="material-symbols-outlined text-[12px] opacity-0 group-hover/skill:opacity-100 transition-opacity text-cyan-400">
                              info
                            </span>
                          </span>
                          <span className="text-cyan-400 font-mono font-bold">{skill.level}%</span>
                        </div>
                        <div className="w-full h-2 bg-black/60 rounded-full overflow-hidden border border-white/5 p-0.5">
                          <ScrollReveal direction="left" delay={skillIdx * 0.05} distance={100} duration={0.8}>
                            <div
                              className="h-2 rounded-full"
                              style={{
                                width: `${skill.level}%`,
                                backgroundColor: cat.accentColor,
                              }}
                            />
                          </ScrollReveal>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mt-8 pt-4 border-t border-white/10 text-right relative z-10">
                  <span className="text-[10px] uppercase tracking-widest text-zinc-500 italic">
                    Click any line for telemetry notes
                  </span>
                </div>
              </div>
            </TiltCard>
          </ScrollReveal>
        ))}
      </div>

      {/* Skill Inspector Modal */}
      {inspectedSkill && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-xl animate-fadeIn">
          <div className="w-full max-w-lg p-8 rounded-3xl glass-strong border border-cyan-500/40 shadow-2xl space-y-6 relative">
            <button
              onClick={() => {
                playClickSound();
                setInspectedSkill(null);
              }}
              className="absolute top-6 right-6 w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-zinc-400 hover:text-white hover:border-white/30 transition-all"
            >
              <span className="material-symbols-outlined">close</span>
            </button>

            <div className="text-[10px] font-mono text-cyan-400 uppercase tracking-widest font-bold">
              {inspectedSkill.categoryTitle} // Telemetry
            </div>

            <h3 className="text-3xl font-black text-white">{inspectedSkill.name}</h3>

            <div className="grid grid-cols-2 gap-4 p-4 rounded-2xl bg-black/60 border border-white/10 font-mono text-xs">
              <div>
                <span className="text-zinc-500 uppercase tracking-wider block text-[10px]">Proficiency:</span>
                <div className="text-cyan-400 font-bold text-xl mt-0.5">{inspectedSkill.level}%</div>
              </div>
              <div>
                <span className="text-zinc-500 uppercase tracking-wider block text-[10px]">Tenure:</span>
                <div className="text-indigo-300 font-bold text-xl mt-0.5">{inspectedSkill.experience}</div>
              </div>
            </div>

            <div className="space-y-2">
              <div className="text-[10px] font-mono text-zinc-400 uppercase tracking-widest">Engineering Telemetry & Application:</div>
              <p className="text-sm text-zinc-200 leading-relaxed bg-black/80 p-5 rounded-2xl border border-white/5 font-light">
                {inspectedSkill.details}
              </p>
            </div>

            <button
              onClick={() => {
                playClickSound();
                setInspectedSkill(null);
              }}
              className="w-full py-3.5 rounded-full bg-cyan-400 text-black font-bold uppercase text-xs tracking-widest hover:scale-105 transition-transform"
            >
              Acknowledge Telemetry
            </button>
          </div>
        </div>
      )}
    </section>
  );
};

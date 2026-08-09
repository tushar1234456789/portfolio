import React, { useState } from 'react';
import { PERSONAL_INFO } from '../data/portfolioData';
import { playClickSound, playHoverSound, playTerminalKeySound } from '../utils/audioFX';
import { ScrollReveal } from './ScrollReveal';

export const ContactSection: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: 'AI/ML Project Inquiry',
    message: '',
  });
  const [projectType, setProjectType] = useState<string>('rag_llm');
  const [budget, setBudget] = useState<number>(25);
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    playClickSound();
    setStatus('submitting');

    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({
          access_key: '8814d8f7-aee0-4a99-a6d4-cc04307c1f8f',
          name: formData.name,
          email: formData.email,
          subject: formData.subject,
          message: `Project Type: ${projectType}\nEstimated Budget: $${budget}k\n\nMessage:\n${formData.message}`,
        }),
      });

      const result = await response.json();
      if (result.success) {
        setStatus('success');
      } else {
        setStatus('error');
      }
    } catch (error) {
      console.error('Submission failed', error);
      setStatus('error');
    }
  };

  return (
    <section id="contact" className="py-24 px-6 md:px-12 max-w-[1280px] mx-auto relative z-10">
      {/* Header */}
      <ScrollReveal>
        <div className="mb-16 border-b border-white/10 pb-8">
          <span className="block text-[12px] uppercase tracking-[0.4em] text-white/40 mb-2">
            Global Communication Channel
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black uppercase tracking-tight text-white">
            INITIATE DIRECTIVE <span className="font-serif italic text-emerald-400 font-normal normal-case">& Inquiry</span>
          </h2>
        </div>
      </ScrollReveal>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Left Side: Contact details & Scope Estimator */}
        <ScrollReveal direction="left">
          <div className="space-y-8">
            <div className="space-y-4">
              <h3 className="text-2xl font-bold text-white tracking-tight">Direct Channels</h3>
              <p className="text-sm text-zinc-400 leading-relaxed font-light">
                Available for full stack AI architecture consulting, technical leadership roles, and custom ML pipeline developments.
              </p>

              <div className="space-y-3 font-mono text-xs">
                <a
                  href={`mailto:${PERSONAL_INFO.email}`}
                  onMouseEnter={playHoverSound}
                  className="flex items-center gap-3 p-4 rounded-2xl glass border border-white/10 hover:border-emerald-400 transition-all group"
                >
                  <span className="material-symbols-outlined text-emerald-400">mail</span>
                  <span className="text-white group-hover:text-emerald-400 font-bold">{PERSONAL_INFO.email}</span>
                </a>

                <a
                  href={PERSONAL_INFO.github}
                  target="_blank"
                  rel="noreferrer"
                  onMouseEnter={playHoverSound}
                  className="flex items-center gap-3 p-4 rounded-2xl glass border border-white/10 hover:border-emerald-400 transition-all group"
                >
                  <span className="material-symbols-outlined text-indigo-400">code</span>
                  <span className="text-white group-hover:text-indigo-300 font-bold">GitHub Profile</span>
                </a>

                <a
                  href={PERSONAL_INFO.linkedin}
                  target="_blank"
                  rel="noreferrer"
                  onMouseEnter={playHoverSound}
                  className="flex items-center gap-3 p-4 rounded-2xl glass border border-white/10 hover:border-emerald-400 transition-all group"
                >
                  <span className="material-symbols-outlined text-rose-400">work</span>
                  <span className="text-white group-hover:text-rose-300 font-bold">LinkedIn Profile</span>
                </a>
              </div>
            </div>

            {/* Scope Estimator */}
            <div className="p-8 rounded-3xl glass-strong border border-white/10 space-y-5 shadow-xl">
              <h4 className="text-[10px] font-mono text-emerald-400 font-bold uppercase tracking-widest">
                /// Interactive Scope Calculator
              </h4>

              <div className="space-y-2">
                <label className="text-xs text-zinc-400 font-mono">Select Architecture Target:</label>
                <div className="grid grid-cols-2 gap-2.5 font-mono text-xs">
                  {[
                    { id: 'rag_llm', label: 'Enterprise RAG / LLM' },
                    { id: 'fullstack_saas', label: 'Full Stack Web App' },
                    { id: 'cv_video', label: 'Computer Vision Edge' },
                    { id: 'webgl_3d', label: '3D WebGL Canvas' },
                  ].map((type) => (
                    <button
                      type="button"
                      key={type.id}
                      onClick={() => {
                        playClickSound();
                        setProjectType(type.id);
                      }}
                      className={`p-3 rounded-xl border text-left transition-all ${
                        projectType === type.id
                          ? 'bg-emerald-500/20 border-emerald-400 text-emerald-300 font-bold'
                          : 'bg-black/50 border-white/5 text-zinc-400 hover:text-white'
                      }`}
                    >
                      {type.label}
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-3 pt-2">
                <div className="flex justify-between font-mono text-xs text-zinc-300">
                  <span className="uppercase tracking-wider text-[10px] text-zinc-500">Estimated Budget Scope:</span>
                  <span className="text-emerald-400 font-bold text-sm">${budget}k - ${budget + 15}k USD</span>
                </div>
                <input
                  type="range"
                  min={10}
                  max={100}
                  step={5}
                  value={budget}
                  onChange={(e) => {
                    playTerminalKeySound();
                    setBudget(Number(e.target.value));
                  }}
                  className="w-full accent-emerald-400 cursor-pointer"
                />
              </div>
            </div>
          </div>
        </ScrollReveal>

        {/* Right Side: Contact Form */}
        <ScrollReveal direction="right">
          <div className="p-8 rounded-3xl glass-strong border border-white/10 space-y-6 shadow-2xl h-full">
            <h3 className="text-xl font-bold text-white font-mono flex items-center gap-2">
              <span className="text-emerald-400">&gt;</span> Dispatch Transmission
            </h3>

            {status === 'success' ? (
              <div className="p-8 rounded-2xl bg-emerald-500/10 border border-emerald-400 text-emerald-200 space-y-4 font-mono text-xs animate-fadeIn">
                <div className="text-xl font-bold flex items-center gap-2 text-emerald-400">
                  <span className="material-symbols-outlined">check_circle</span>
                  Transmission Dispatched
                </div>
                <p className="font-sans leading-relaxed text-zinc-300">
                  Thank you, {formData.name || 'Engineer'}. Your project inquiry has been successfully routed to my inbox. I will review and respond shortly.
                </p>
                <button
                  onClick={() => setStatus('idle')}
                  className="mt-2 px-6 py-2.5 rounded-full bg-emerald-400 text-black font-bold uppercase tracking-wider text-xs hover:scale-105 transition-transform shadow-xl"
                >
                  Send Another Message
                </button>
              </div>
            ) : status === 'error' ? (
              <div className="p-8 rounded-2xl bg-rose-500/10 border border-rose-400 text-rose-200 space-y-4 font-mono text-xs animate-fadeIn">
                <div className="text-xl font-bold flex items-center gap-2 text-rose-400">
                  <span className="material-symbols-outlined">error</span>
                  Transmission Failed
                </div>
                <p className="font-sans leading-relaxed text-zinc-300">
                  There was an error communicating with the server. Please ensure you have added a valid Web3Forms access key, or try reaching out via email directly.
                </p>
                <button
                  onClick={() => setStatus('idle')}
                  className="mt-2 px-6 py-2.5 rounded-full bg-rose-400 text-black font-bold uppercase tracking-wider text-xs hover:scale-105 transition-transform shadow-xl"
                >
                  Retry Transmission
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5 font-mono text-xs">
                <div className="space-y-1.5">
                  <label className="text-zinc-400 uppercase tracking-wider text-[10px]">Your Name / Entity:</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => {
                      playTerminalKeySound();
                      setFormData({ ...formData, name: e.target.value });
                    }}
                    placeholder="e.g. Alex Vance (Apex Labs)"
                    className="w-full p-4 rounded-2xl bg-black/60 border border-white/10 text-white focus:border-emerald-400 focus:outline-none transition-colors"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-zinc-400 uppercase tracking-wider text-[10px]">Email Address:</label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => {
                      playTerminalKeySound();
                      setFormData({ ...formData, email: e.target.value });
                    }}
                    placeholder="alex@company.com"
                    className="w-full p-4 rounded-2xl bg-black/60 border border-white/10 text-white focus:border-emerald-400 focus:outline-none transition-colors"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-zinc-400 uppercase tracking-wider text-[10px]">Project Details & Directives:</label>
                  <textarea
                    rows={4}
                    required
                    value={formData.message}
                    onChange={(e) => {
                      playTerminalKeySound();
                      setFormData({ ...formData, message: e.target.value });
                    }}
                    placeholder="Describe your timeline, technical goals, and system requirements..."
                    className="w-full p-4 rounded-2xl bg-black/60 border border-white/10 text-white focus:border-emerald-400 focus:outline-none transition-colors"
                  />
                </div>

                <button
                  type="submit"
                  disabled={status === 'submitting'}
                  onMouseEnter={playHoverSound}
                  className={`w-full py-4 rounded-full font-bold uppercase text-xs tracking-widest transition-transform shadow-xl flex items-center justify-center gap-2 ${
                    status === 'submitting'
                      ? 'bg-zinc-600 text-zinc-400 cursor-not-allowed'
                      : 'bg-emerald-400 text-black hover:scale-105'
                  }`}
                >
                  <span>{status === 'submitting' ? 'Transmitting...' : 'Transmit Inquiry'}</span>
                  <span className={`material-symbols-outlined text-sm ${status === 'submitting' ? 'animate-pulse' : ''}`}>
                    {status === 'submitting' ? 'sync' : 'send'}
                  </span>
                </button>
              </form>
            )}
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
};

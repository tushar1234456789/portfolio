import React, { useState } from 'react';
import { PERSONAL_INFO, SKILL_CATEGORIES, TIMELINE } from '../data/portfolioData';
import { playClickSound, playHoverSound } from '../utils/audioFX';

interface ResumeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ResumeModal: React.FC<ResumeModalProps> = ({ isOpen, onClose }) => {
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const handleCopyText = () => {
    playClickSound();
    const text = `
${PERSONAL_INFO.name} - ${PERSONAL_INFO.title}
Email: ${PERSONAL_INFO.email} | Location: ${PERSONAL_INFO.location}
GitHub: ${PERSONAL_INFO.github} | LinkedIn: ${PERSONAL_INFO.linkedin}

SUMMARY:
${PERSONAL_INFO.bio}

SKILLS:
${SKILL_CATEGORIES.map((c) => `${c.title}: ${c.skills.map((s) => s.name).join(', ')}`).join('\n')}

EXPERIENCE:
${TIMELINE.map((t) => `${t.period} | ${t.role} @ ${t.company} (${t.location})\n${t.highlights.map((h) => `• ${h}`).join('\n')}`).join('\n\n')}
    `.trim();

    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fadeIn">
      <div className="w-full max-w-4xl max-h-[90vh] flex flex-col rounded-xl bg-[#101417] border border-[#00f0ff]/50 shadow-[0_0_40px_rgba(0,240,255,0.3)] overflow-hidden">
        {/* Header toolbar */}
        <div className="p-4 bg-[#181c20] border-b border-white/10 flex justify-between items-center font-mono text-xs">
          <div className="flex items-center gap-2 text-[#00f0ff]">
            <span className="material-symbols-outlined text-sm">description</span>
            <span className="font-bold">RESUME_VIEWER // TUSHAR_GOTI.PDF</span>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={handleCopyText}
              onMouseEnter={playHoverSound}
              className="px-3 py-1.5 rounded bg-[#1c2024] hover:bg-[#00f0ff] hover:text-black text-[#dbfcff] border border-white/10 transition-all flex items-center gap-1.5"
            >
              <span className="material-symbols-outlined text-sm">content_copy</span>
              <span>{copied ? 'Copied to Clipboard!' : 'Copy Plain Text'}</span>
            </button>

            <button
              onClick={() => {
                playClickSound();
                window.print();
              }}
              onMouseEnter={playHoverSound}
              className="px-3 py-1.5 rounded bg-[#00f0ff] text-black font-bold hover:shadow-[0_0_15px_rgba(0,240,255,0.5)] transition-all flex items-center gap-1.5"
            >
              <span className="material-symbols-outlined text-sm">print</span>
              <span>Print / Save PDF</span>
            </button>

            <button
              onClick={() => {
                playClickSound();
                onClose();
              }}
              className="text-[#b9cacb] hover:text-[#00f0ff] p-1 ml-2"
            >
              <span className="material-symbols-outlined text-xl">close</span>
            </button>
          </div>
        </div>

        {/* Printable Resume Content */}
        <div className="flex-1 p-6 md:p-10 overflow-y-auto space-y-8 text-[#e0e2e8] print:text-black print:bg-white">
          {/* Header */}
          <div className="border-b border-white/10 pb-6 print:border-black">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
              <div>
                <h1 className="text-3xl font-bold text-[#00f0ff] print:text-black">{PERSONAL_INFO.name}</h1>
                <p className="text-lg text-[#b9cacb] print:text-gray-700 font-mono mt-1">{PERSONAL_INFO.title}</p>
              </div>
              <div className="font-mono text-xs text-[#b9cacb] print:text-gray-700 space-y-1 md:text-right">
                <div>Email: {PERSONAL_INFO.email}</div>
                <div>Location: {PERSONAL_INFO.location}</div>
                <div>GitHub: {PERSONAL_INFO.github}</div>
                <div>LinkedIn: {PERSONAL_INFO.linkedin}</div>
              </div>
            </div>
          </div>

          {/* Executive Summary */}
          <div>
            <h2 className="font-mono text-sm text-[#00f0ff] print:text-black font-bold uppercase mb-2">Executive Summary</h2>
            <p className="text-sm text-[#b9cacb] print:text-gray-800 leading-relaxed bg-[#181c20] print:bg-gray-100 p-4 rounded">
              {PERSONAL_INFO.bio}
            </p>
          </div>

          {/* Technical Competencies */}
          <div>
            <h2 className="font-mono text-sm text-[#00f0ff] print:text-black font-bold uppercase mb-3">Core Technical Competencies</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 font-mono text-xs">
              {SKILL_CATEGORIES.map((cat) => (
                <div key={cat.id} className="p-3 rounded bg-[#181c20] print:bg-gray-100 border border-white/5 print:border-gray-300">
                  <div className="font-bold text-[#d1bcff] print:text-black mb-1">{cat.title}</div>
                  <div className="text-[#b9cacb] print:text-gray-700 leading-normal">
                    {cat.skills.map((s) => s.name).join(', ')}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Professional History */}
          <div>
            <h2 className="font-mono text-sm text-[#00f0ff] print:text-black font-bold uppercase mb-4">Professional Experience</h2>
            <div className="space-y-6">
              {TIMELINE.map((item) => (
                <div key={item.id} className="space-y-2">
                  <div className="flex justify-between text-sm font-bold">
                    <span className="text-[#e0e2e8] print:text-black">{item.role} @ <span className="text-[#00f0ff] print:text-blue-700">{item.company}</span></span>
                    <span className="font-mono text-xs text-[#b9cacb] print:text-gray-600">{item.period}</span>
                  </div>
                  <ul className="list-disc list-inside text-xs text-[#b9cacb] print:text-gray-800 space-y-1">
                    {item.highlights.map((h, i) => (
                      <li key={i}>{h}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

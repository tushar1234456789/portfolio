import React from 'react';
import { playClickSound } from '../utils/audioFX';

interface SourceCodeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SourceCodeModal: React.FC<SourceCodeModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fadeIn">
      <div className="w-full max-w-3xl max-h-[85vh] flex flex-col rounded-xl bg-[#101417] border border-[#00f0ff]/50 shadow-[0_0_40px_rgba(0,240,255,0.3)] overflow-hidden">
        {/* Header */}
        <div className="p-4 bg-[#181c20] border-b border-white/10 flex justify-between items-center font-mono text-xs">
          <div className="flex items-center gap-2 text-[#00f0ff]">
            <span className="material-symbols-outlined text-sm">code</span>
            <span className="font-bold">SYSTEM_ARCHITECTURE_MANIFEST.JSON</span>
          </div>
          <button
            onClick={() => {
              playClickSound();
              onClose();
            }}
            className="text-[#b9cacb] hover:text-[#00f0ff]"
          >
            <span className="material-symbols-outlined text-xl">close</span>
          </button>
        </div>

        {/* Manifest Body */}
        <div className="p-6 overflow-y-auto space-y-6 font-mono text-xs text-[#e0e2e8]">
          <div className="p-4 rounded bg-[#0b0f12] border border-[#00f0ff]/30 text-[#00f0ff] space-y-2">
            <div className="font-bold">// Portfolio Stack Architecture</div>
            <p className="text-xs text-[#b9cacb]">
              This application is built with a server-side full stack architecture: React 19, TypeScript, Vite, WebGL GLSL shaders, Three.js 3D rendering engines, Tailwind CSS v4, Motion animations, and Express + @google/genai (Gemini 3.6 Flash) API.
            </p>
          </div>

          <div className="space-y-2">
            <div className="text-[#d1bcff] font-bold">/// Component & Module Map</div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="p-3 rounded bg-[#181c20] border border-white/5 space-y-1">
                <div className="text-[#00f0ff] font-bold">1. BackgroundShader.tsx</div>
                <div className="text-[#b9cacb] text-[11px]">WebGL Fragment Shader canvas rendering custom grid, glows, and mouse particle interactions.</div>
              </div>
              <div className="p-3 rounded bg-[#181c20] border border-white/5 space-y-1">
                <div className="text-[#00f0ff] font-bold">2. ThreeHeroCanvas.tsx</div>
                <div className="text-[#b9cacb] text-[11px]">Three.js 3D mesh rendering Icosahedron neural core, orbiting torus rings, and particle clouds.</div>
              </div>
              <div className="p-3 rounded bg-[#181c20] border border-white/5 space-y-1">
                <div className="text-[#00f0ff] font-bold">3. AITerminal.tsx</div>
                <div className="text-[#b9cacb] text-[11px]">Interactive AI assistant powered by Gemini 3.6 Flash via server-side Express API (/api/chat).</div>
              </div>
              <div className="p-3 rounded bg-[#181c20] border border-white/5 space-y-1">
                <div className="text-[#00f0ff] font-bold">4. audioFX.ts</div>
                <div className="text-[#b9cacb] text-[11px]">Web Audio API synthesizer generating real-time futuristic UI chimes and terminal keypress sound effects.</div>
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <div className="text-[#ffb4ab] font-bold">/// Server Route Handler</div>
            <pre className="p-3 rounded bg-[#0b0f12] text-[#dbfcff] overflow-x-auto text-[11px] leading-relaxed">
{`app.post("/api/chat", async (req, res) => {
  const { message, history } = req.body;
  const chat = ai.chats.create({
    model: "gemini-3.6-flash",
    config: { systemInstruction: TUSHAR_RESUME_CONTEXT }
  });
  const response = await chat.sendMessage({ message });
  return res.json({ reply: response.text });
});`}
            </pre>
          </div>
        </div>

        <div className="p-4 bg-[#181c20] border-t border-white/10 flex justify-end">
          <button
            onClick={() => {
              playClickSound();
              onClose();
            }}
            className="px-5 py-2 rounded bg-[#00f0ff] text-black font-mono text-xs font-bold hover:shadow-[0_0_15px_rgba(0,240,255,0.5)] transition-all"
          >
            Close Manifest
          </button>
        </div>
      </div>
    </div>
  );
};

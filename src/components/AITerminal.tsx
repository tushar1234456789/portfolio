import React, { useState, useRef, useEffect } from 'react';
import { ChatMessage } from '../types';
import { playClickSound, playHoverSound, playTerminalKeySound } from '../utils/audioFX';

interface AITerminalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AITerminal: React.FC<AITerminalProps> = ({ isOpen, onClose }) => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'init-1',
      sender: 'assistant',
      text: 'CYBER-AI TERMINAL ONLINE // Powered by Gemini 3.6 Flash\nAsk me anything about Tushar Goti\'s 8+ years of experience, AI/ML models, RAG systems, or full-stack architecture.',
      timestamp: new Date().toLocaleTimeString(),
    },
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, loading]);

  if (!isOpen) return null;

  const quickPrompts = [
    "Summarize Tushar's tech stack",
    'How does Tushar build enterprise RAG systems?',
    "What are Tushar's top career achievements?",
    'Contact information & hiring details',
  ];

  const sendMessage = async (textToSend?: string) => {
    const query = (textToSend || input).trim();
    if (!query || loading) return;

    playClickSound();

    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      sender: 'user',
      text: query,
      timestamp: new Date().toLocaleTimeString(),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInput('');
    setLoading(true);

    try {
      const history = messages.map((m) => ({
        sender: m.sender,
        text: m.text,
      }));

      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: query, history }),
      });

      const data = await res.json();
      const replyText = data.reply || data.fallback || 'System query completed successfully.';

      const assistantMsg: ChatMessage = {
        id: (Date.now() + 1).toString(),
        sender: 'assistant',
        text: replyText,
        timestamp: new Date().toLocaleTimeString(),
      };

      setMessages((prev) => [...prev, assistantMsg]);
    } catch {
      const errorMsg: ChatMessage = {
        id: (Date.now() + 1).toString(),
        sender: 'assistant',
        text: "Tushar Goti is a Senior AI/ML & Full Stack Developer with 8+ years experience. Contact him at tgoti923@gmail.com for inquiries.",
        timestamp: new Date().toLocaleTimeString(),
      };
      setMessages((prev) => [...prev, errorMsg]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fadeIn">
      <div className="w-full max-w-2xl h-[80vh] flex flex-col rounded-xl bg-[#0b0f12] border border-[#00f0ff]/50 shadow-[0_0_40px_rgba(0,240,255,0.3)] overflow-hidden">
        {/* Terminal Header */}
        <div className="px-4 py-3 bg-[#101417] border-b border-white/10 flex justify-between items-center font-mono text-xs">
          <div className="flex items-center gap-2 text-[#00f0ff]">
            <span className="w-3 h-3 rounded-full bg-[#ff5f56]" />
            <span className="w-3 h-3 rounded-full bg-[#ffbd2e]" />
            <span className="w-3 h-3 rounded-full bg-[#27c93f]" />
            <span className="ml-2 font-bold">tushar-goti@cyber-ai:~$</span>
          </div>
          <button
            onClick={() => {
              playClickSound();
              onClose();
            }}
            className="text-[#b9cacb] hover:text-[#00f0ff] p-1"
          >
            <span className="material-symbols-outlined text-lg">close</span>
          </button>
        </div>

        {/* Messages Console */}
        <div className="flex-1 p-4 overflow-y-auto space-y-4 font-mono text-xs text-[#e0e2e8]">
          {messages.map((m) => (
            <div
              key={m.id}
              className={`p-3 rounded border ${
                m.sender === 'user'
                  ? 'bg-[#1c2024] border-[#00f0ff]/40 text-[#00f0ff] ml-8'
                  : 'bg-[#101417] border-white/10 text-[#e0e2e8]'
              }`}
            >
              <div className="flex justify-between text-[10px] text-[#b9cacb] mb-1">
                <span className="font-bold">{m.sender === 'user' ? 'USER_PROMPT' : 'CYBER_AI_AGENT'}</span>
                <span>{m.timestamp}</span>
              </div>
              <div className="whitespace-pre-wrap leading-relaxed">{m.text}</div>
            </div>
          ))}

          {loading && (
            <div className="p-3 rounded bg-[#101417] border border-white/10 text-[#00f0ff] flex items-center gap-2 animate-pulse">
              <span className="material-symbols-outlined text-sm animate-spin">sync</span>
              <span>Processing neural embeddings & querying Gemini model...</span>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Quick Prompts */}
        <div className="p-3 bg-[#101417] border-t border-white/10 flex flex-wrap gap-2">
          {quickPrompts.map((prompt) => (
            <button
              key={prompt}
              onClick={() => sendMessage(prompt)}
              onMouseEnter={playHoverSound}
              className="px-2.5 py-1 rounded bg-[#181c20] hover:bg-[#00363a] text-[#b9cacb] hover:text-[#dbfcff] border border-white/10 font-mono text-[11px] transition-all"
            >
              {prompt}
            </button>
          ))}
        </div>

        {/* Command Input Box */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            sendMessage();
          }}
          className="p-3 bg-[#0b0f12] border-t border-white/10 flex gap-2"
        >
          <span className="text-[#00f0ff] font-mono text-sm self-center">&gt;</span>
          <input
            type="text"
            value={input}
            onChange={(e) => {
              playTerminalKeySound();
              setInput(e.target.value);
            }}
            placeholder="Type your question for Tushar's AI..."
            className="flex-1 bg-transparent text-xs font-mono text-[#00f0ff] focus:outline-none placeholder-[#849495]"
          />
          <button
            type="submit"
            disabled={loading || !input.trim()}
            className="px-4 py-2 rounded bg-[#00f0ff] text-black font-mono text-xs font-bold disabled:opacity-50 hover:shadow-[0_0_15px_rgba(0,240,255,0.5)] transition-all"
          >
            Execute
          </button>
        </form>
      </div>
    </div>
  );
};

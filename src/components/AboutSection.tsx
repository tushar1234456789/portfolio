import React, { useState } from 'react';
import { playClickSound, playHoverSound } from '../utils/audioFX';
import { ScrollReveal } from './ScrollReveal';
import { TiltCard } from './TiltCard';

export const AboutSection: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'philosophy' | 'stack' | 'architecture'>('philosophy');

  const corePillars = [
    {
      icon: 'psychology',
      title: 'Cognitive AI & RAG',
      desc: 'Architecting context-aware AI systems with hybrid vector search, fine-tuned LLMs, and agentic workflows that solve complex business challenges.',
      color: '#00f0ff',
    },
    {
      icon: 'dns',
      title: 'Scalable Full Stack',
      desc: 'Crafting low-latency Express microservices, reactive React dashboards, and robust database architectures designed for millions of requests.',
      color: '#d1bcff',
    },
    {
      icon: 'cloud_sync',
      title: 'Cloud & MLOps',
      desc: 'Deploying automated CI/CD pipelines, containerized Kubernetes nodes, and GPU-optimized inference clusters with 99.99% reliability.',
      color: '#ffb4ab',
    },
    {
      icon: '3d_rotation',
      title: 'Spatial 3D & Graphics',
      desc: 'Building hardware-accelerated WebGL and Three.js visualizers for spatial data, financial graphics, and interactive real-time interfaces.',
      color: '#7df4ff',
    },
  ];

  return (
    <section id="about" className="py-24 px-6 md:px-12 max-w-[1280px] mx-auto relative z-10">
      <ScrollReveal>
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 gap-6 border-b border-white/10 pb-8">
          <div>
            <span className="block text-[12px] uppercase tracking-[0.4em] text-white/40 mb-2">
              Engineering Profile
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black uppercase tracking-tight text-white">
              THE ARCHITECT <span className="text-cyan-400 font-light">behind the code</span>
            </h2>
          </div>
          <div className="flex gap-2 flex-wrap">
            {(['philosophy', 'stack', 'architecture'] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => {
                  playClickSound();
                  setActiveTab(tab);
                }}
                onMouseEnter={playHoverSound}
                className={`px-5 py-2.5 rounded-full text-xs uppercase tracking-widest font-semibold transition-all ${
                  activeTab === tab
                    ? 'bg-cyan-400 text-black shadow-[0_0_15px_rgba(34,211,238,0.4)] scale-105'
                    : 'bg-zinc-900 text-zinc-400 hover:text-white border border-white/10'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>
      </ScrollReveal>

      {/* Tab Content */}
      <div className="relative min-h-[400px]">
        {activeTab === 'philosophy' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start mb-12 animate-fadeIn">
            <div className="lg:col-span-5 space-y-6 text-zinc-300 leading-relaxed font-light text-base">
              <ScrollReveal delay={0.1}>
                <p className="text-lg text-white font-normal leading-snug">
                  As a <strong className="font-bold text-cyan-400">Senior AI/ML & Full Stack Architect</strong> with 8+ years of engineering tenure, I specialize in building high-concurrency intelligence systems and web platforms.
                </p>
              </ScrollReveal>
              <ScrollReveal delay={0.2}>
                <p>
                  My engineering philosophy bridges cutting-edge machine learning innovation (RAG pipelines, LoRA fine-tuning, computer vision) with battle-tested software engineering standards: asynchronous microservices, zero-downtime containerized deployments, and clean TypeScript APIs.
                </p>
              </ScrollReveal>
              <ScrollReveal delay={0.3}>
                <div className="p-6 rounded-3xl glass border border-cyan-500/30 text-xs font-mono text-cyan-400 space-y-2 shadow-2xl relative overflow-hidden group">
                  <div className="absolute inset-0 bg-cyan-400/5 translate-y-[100%] group-hover:translate-y-0 transition-transform duration-500 ease-out" />
                  <div className="uppercase tracking-widest text-zinc-500 relative z-10">// Core Directive:</div>
                  <div className="text-white text-sm font-sans italic font-serif relative z-10">"Build clean, deterministic interfaces over high-dimensional probabilistic AI."</div>
                </div>
              </ScrollReveal>
            </div>

            <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-6">
              {corePillars.map((pillar, idx) => (
                <ScrollReveal key={pillar.title} delay={0.2 + idx * 0.1}>
                  <TiltCard maxTilt={10} perspective={1000} scale={1.02}>
                    <div
                      onMouseEnter={playHoverSound}
                      className="h-full p-6 rounded-3xl glass border border-white/10 hover:border-cyan-400/50 transition-colors shadow-xl group relative overflow-hidden"
                    >
                      <div className="flex justify-between items-start mb-4 relative z-10">
                        <span className="material-symbols-outlined text-3xl transition-transform group-hover:scale-110" style={{ color: pillar.color }}>
                          {pillar.icon}
                        </span>
                        <span className="text-xs font-mono font-bold text-zinc-600 group-hover:text-cyan-400 transition-colors">
                          0{idx + 1}
                        </span>
                      </div>
                      <h3 className="font-bold text-white text-lg mb-2 tracking-tight relative z-10">{pillar.title}</h3>
                      <p className="text-xs text-zinc-400 leading-relaxed font-light relative z-10">{pillar.desc}</p>
                    </div>
                  </TiltCard>
                </ScrollReveal>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'stack' && (
          <ScrollReveal>
            <div className="p-8 rounded-3xl glass border border-white/10 space-y-6 shadow-2xl animate-fadeIn">
              <h3 className="text-xs uppercase tracking-[0.3em] text-cyan-400 font-mono font-bold">/// Technical Arsenal & Stack Spectrum</h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 font-mono text-xs">
                <TiltCard>
                  <div className="h-full space-y-3 p-5 rounded-2xl bg-black/50 border border-white/5">
                    <div className="text-cyan-400 font-bold text-sm uppercase tracking-wider">AI & Machine Learning</div>
                    <ul className="text-zinc-300 space-y-2 list-disc list-inside font-sans">
                      <li>Llama 3, Gemini, Claude APIs</li>
                      <li>PyTorch, TensorFlow, HuggingFace</li>
                      <li>Pinecone, Qdrant, Chroma DB</li>
                      <li>LangChain, LlamaIndex</li>
                      <li>YOLOv8, OpenCV, TensorRT</li>
                    </ul>
                  </div>
                </TiltCard>
                <TiltCard>
                  <div className="h-full space-y-3 p-5 rounded-2xl bg-black/50 border border-white/5">
                    <div className="text-indigo-400 font-bold text-sm uppercase tracking-wider">Full Stack Systems</div>
                    <ul className="text-zinc-300 space-y-2 list-disc list-inside font-sans">
                      <li>React 19, TypeScript, Next.js</li>
                      <li>Node.js, Express, GraphQL</li>
                      <li>MongoDB, PostgreSQL, Redis</li>
                      <li>Three.js, WebGL, GSAP</li>
                      <li>Tailwind CSS v4</li>
                    </ul>
                  </div>
                </TiltCard>
                <TiltCard>
                  <div className="h-full space-y-3 p-5 rounded-2xl bg-black/50 border border-white/5">
                    <div className="text-rose-400 font-bold text-sm uppercase tracking-wider">Cloud & MLOps</div>
                    <ul className="text-zinc-300 space-y-2 list-disc list-inside font-sans">
                      <li>AWS SageMaker, ECS, Lambda</li>
                      <li>Docker, Kubernetes, Helm</li>
                      <li>GitHub Actions CI/CD</li>
                      <li>Kafka, WebSockets</li>
                      <li>Terraform IaC</li>
                    </ul>
                  </div>
                </TiltCard>
              </div>
            </div>
          </ScrollReveal>
        )}

        {activeTab === 'architecture' && (
          <ScrollReveal>
            <div className="p-8 rounded-3xl glass border border-cyan-500/30 font-mono text-xs space-y-4 shadow-2xl animate-fadeIn">
              <div className="flex justify-between items-center text-zinc-400 border-b border-white/10 pb-3">
                <span className="text-cyan-400 font-bold">system_architecture_manifest.ts</span>
                <span className="px-2.5 py-0.5 rounded-full bg-cyan-400/20 text-cyan-300 text-[10px] animate-pulse">STATUS: SYNCHRONIZED</span>
              </div>
              <pre className="text-cyan-200 overflow-x-auto p-5 rounded-2xl bg-black/80 leading-relaxed font-mono selection:bg-cyan-400 selection:text-black">
{`// Architectural Blueprint - Tushar Goti Portfolio Ecosystem
import { RAGPipeline } from '@ai/core';
import { MicroserviceCluster } from '@cloud/k8s';
import { WebGLRenderer } from '@graphics/three';

export class EnterpriseSystem {
  private aiEngine = new RAGPipeline({
    vectorStore: 'Pinecone',
    model: 'Llama-3-70B-Instruct',
    reranker: 'Cohere-CrossEncoder',
    latencyTargetMs: 150
  });

  private apiGateway = new MicroserviceCluster({
    runtime: 'Node.js/Express',
    cache: 'Redis Cluster',
    database: 'PostgreSQL/MongoDB Hybrid',
    concurrency: '50k RPS'
  });

  public async initialize(): Promise<void> {
    await this.aiEngine.loadEmbeddings();
    await this.apiGateway.connectWebSockets();
    console.log('[SYSTEM ONLINE] All nodes fully synchronized.');
  }
}`}
              </pre>
            </div>
          </ScrollReveal>
        )}
      </div>
    </section>
  );
};

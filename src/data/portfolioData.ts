import { Project, SkillCategory, TimelineItem } from '../types';

export const PERSONAL_INFO = {
  name: 'Tushar Goti',
  title: 'Senior AI/ML & Full Stack Developer',
  experienceYears: 8,
  profileImage: 'https://lh3.googleusercontent.com/aida-public/AB6AXuADAeci4vmXyCz3u5djY_qTR9B5t5K8OXMuH_IFk2IGL-FWU9VfgBCuJQIcQqDe1OoCGXkNOG9elxXj-FnkAIkwJu7iIFwpvSWxp1h5hG9QRds4sro36GnyS7PhLpFN_VAUMqz0g3n2A8KJ6a0q3LFmVvFNg3gTcGNZ5NKGDeadiJavpXjaQorxvEerJsmlt_MDDAeh5iz4Puf-P40uC7FuV9He4ZbtGUmYJZ6dUH3n3hhdz-EsMZU8XRnSZUtvxUjxZTY',
  tagline: 'Engineering the Intelligence of Tomorrow',
  bio: 'Senior AI/ML & Full Stack Developer with 8 years of orchestrating complex architectures. Bridging the gap between cutting-edge machine learning models and robust, low-latency production web systems.',
  email: 'tgoti923@gmail.com',
  github: 'https://github.com/tushargoti',
  linkedin: 'https://linkedin.com/in/tushargoti',
  location: 'Surat, Gujarat, India',
  stats: [
    { label: 'Years Experience', value: '8+' },
    { label: 'Daily AI Queries', value: '200K+' },
    { label: 'System Uptime', value: '99.99%' },
    { label: 'Production Models', value: '18+' },
  ]
};

export const SKILL_CATEGORIES: SkillCategory[] = [
  {
    id: 'ai_ml',
    title: 'AI & Machine Learning',
    icon: 'psychology',
    accentColor: '#34d399',
    badgeBg: '#064e3b',
    badgeBorder: '#059669',
    badgeText: '#a7f3d0',
    description: 'Architecting intelligent cognitive pipelines, LLM fine-tuning, retrieval systems, and computer vision models.',
    skills: [
      { name: 'LLMs & Fine-tuning', level: 95, experience: '5 yrs', details: 'Specialized in Llama 3, Claude, Gemini, LoRA/QLoRA parameter-efficient fine-tuning, and prompt optimization.' },
      { name: 'RAG & Vector Search', level: 98, experience: '4 yrs', details: 'Built hybrid vector + keyword search pipelines with Pinecone, Qdrant, and Chroma DB for multi-million document search.' },
      { name: 'PyTorch & TensorFlow', level: 90, experience: '7 yrs', details: 'Deep neural network architecture development, custom loss functions, and distributed model training.' },
      { name: 'Computer Vision (YOLOv8, OpenCV)', level: 88, experience: '6 yrs', details: 'Real-time object detection, segmentation, multi-object tracking, and edge AI video analytics.' },
      { name: 'LangChain & LlamaIndex', level: 92, experience: '3 yrs', details: 'Orchestrating autonomous multi-agent tool-using workflows with complex memory and guardrails.' },
    ]
  },
  {
    id: 'fullstack',
    title: 'MERN & Full Stack',
    icon: 'dns',
    accentColor: '#818cf8',
    badgeBg: '#1e1b4b',
    badgeBorder: '#4338ca',
    badgeText: '#c7d2fe',
    description: 'Building high-throughput API microservices, responsive WebGL interfaces, and real-time reactive dashboards.',
    skills: [
      { name: 'React 19 & TypeScript', level: 96, experience: '8 yrs', details: 'Advanced state management, custom hook architectures, performance optimizations, and design system creation.' },
      { name: 'Node.js & Express', level: 95, experience: '8 yrs', details: 'Low-latency async microservices, REST APIs, GraphQL, and event-driven worker queues.' },
      { name: 'MongoDB & PostgreSQL', level: 92, experience: '8 yrs', details: 'Database indexing, aggregation pipelines, ACID transactions, and distributed schema design.' },
      { name: 'Three.js & WebGL', level: 85, experience: '4 yrs', details: 'Custom WebGL fragment shaders, 3D spatial scenes, particle simulations, and GPU accelerated visuals.' },
      { name: 'Tailwind CSS & Motion', level: 98, experience: '6 yrs', details: 'Custom utility design systems, fluid responsive layouts, and 60fps glassmorphic animations.' },
    ]
  },
  {
    id: 'cloud_sys',
    title: 'System Architecture & Cloud',
    icon: 'architecture',
    accentColor: '#f472b6',
    badgeBg: '#831843',
    badgeBorder: '#be185d',
    badgeText: '#fbcfe8',
    description: 'Designing resilient cloud-native infrastructure, containerized deployments, and automated CI/CD pipelines.',
    skills: [
      { name: 'AWS & Cloud Infrastructure', level: 90, experience: '7 yrs', details: 'SageMaker, ECS/EKS, Lambda, S3, DynamoDB, API Gateway, and CloudFront CDN setup.' },
      { name: 'Docker & Kubernetes', level: 88, experience: '6 yrs', details: 'Multi-stage builds, container orchestration, zero-downtime rolling deployments, and service mesh.' },
      { name: 'Redis & Kafka', level: 92, experience: '5 yrs', details: 'High-speed caching layers, distributed pub/sub messaging, and real-time event streaming.' },
      { name: 'CI/CD & DevOps Automation', level: 90, experience: '7 yrs', details: 'GitHub Actions, Terraform Infrastructure-as-Code, automated unit testing, and security scanning.' },
    ]
  }
];

export const PROJECTS: Project[] = [
  {
    id: 'omnimind-rag',
    title: 'OmniMind RAG - Enterprise AI Knowledge Engine',
    category: 'ai_ml',
    shortDesc: 'Sub-150ms semantic search & multi-modal Q&A platform over 10M+ enterprise documents.',
    fullDesc: 'Designed and deployed a state-of-the-art Retrieval-Augmented Generation (RAG) platform. Features multi-stage re-ranking (Cohort/Cross-Encoder), dense-sparse hybrid vector search, auto-chunking strategies, and an agentic query router powered by custom fine-tuned Llama 3 models.',
    image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1000&auto=format&fit=crop',
    tags: ['RAG', 'Pinecone', 'PyTorch', 'Node.js', 'React', 'TypeScript'],
    metrics: [
      { label: 'Search Latency', value: '< 140ms' },
      { label: 'Recall Accuracy', value: '96.4%' },
      { label: 'Doc Volume', value: '10M+' }
    ],
    architecture: [
      'Multi-stage re-ranking cross-encoder for context compression',
      'Pinecone vector database with hybrid BM25 lexical index',
      'Node.js streaming response server with Server-Sent Events',
      'React 19 interactive document citation viewer'
    ],
    model3dType: 'brain',
    demoUrl: '#',
    githubUrl: 'https://github.com/tushargoti'
  },
  {
    id: 'visionpulse-edge',
    title: 'VisionPulse - Real-time Edge Object Detection',
    category: 'ai_ml',
    shortDesc: 'Multi-camera WebGL video analytics pipeline processing 60 FPS video streams at edge.',
    fullDesc: 'High-speed computer vision platform running custom YOLOv8 model inference over WebSocket streams. Renders real-time bounding boxes, velocity vectors, and object classification heatmaps on a hardware-accelerated WebGL canvas overlay.',
    image: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?q=80&w=1000&auto=format&fit=crop',
    tags: ['YOLOv8', 'OpenCV', 'WebSockets', 'WebGL', 'Three.js', 'Python'],
    metrics: [
      { label: 'Inference Speed', value: '60 FPS' },
      { label: 'Detection mAP', value: '91.2%' },
      { label: 'Stream Channels', value: '32 Concurrent' }
    ],
    architecture: [
      'YOLOv8 TensorRT optimized inference on GPU node',
      'Low-latency WebSocket binary stream transport',
      'Canvas 2D / WebGL overlay rendering with zero-copy buffer',
      'Automated alert trigger service with Web Push notifications'
    ],
    model3dType: 'vision',
    demoUrl: '#',
    githubUrl: 'https://github.com/tushargoti'
  },
  {
    id: 'quantcore-trading',
    title: 'QuantCore - Algorithmic Execution Pipeline',
    category: 'systems',
    shortDesc: 'Low-latency automated algorithmic trading engine handling $10M+ daily volume.',
    fullDesc: 'Sub-millisecond trade execution infrastructure featuring high-frequency order book matching, risk management guardrails, real-time WebSocket order feeds, and an interactive Recharts technical analysis terminal.',
    image: 'https://images.unsplash.com/photo-1642543492481-44e81e3914a7?q=80&w=1000&auto=format&fit=crop',
    tags: ['Node.js', 'Express', 'Redis', 'WebSockets', 'React', 'PostgreSQL'],
    metrics: [
      { label: 'Daily Volume', value: '$10M+' },
      { label: 'Order Execution', value: '< 2ms' },
      { label: 'System Uptime', value: '99.99%' }
    ],
    architecture: [
      'In-memory Redis order book buffer for instant matching',
      'Fault-tolerant Node.js microservice cluster',
      'PostgreSQL transactional ledger with audit logging',
      'React trading view with customizable candlestick charts'
    ],
    model3dType: 'trading',
    demoUrl: '#',
    githubUrl: 'https://github.com/tushargoti'
  },
  {
    id: 'cybermatrix-3d',
    title: 'CyberMatrix - Collaborative 3D Spatial Canvas',
    category: 'graphics',
    shortDesc: 'Multi-user WebGL spatial node visualizer for cloud architecture topology.',
    fullDesc: 'Immersive 3D web application allowing engineering teams to design, simulate, and visualize cloud infrastructure topologies in a shared 3D canvas with real-time multiplayer cursor synchronization.',
    image: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=1000&auto=format&fit=crop',
    tags: ['Three.js', 'WebGL', 'WebSockets', 'React', 'Tailwind CSS'],
    metrics: [
      { label: 'Render Rate', value: '120 FPS' },
      { label: 'Multiplayer Capacity', value: '50 Users/Canvas' },
      { label: 'Node Capacity', value: '10k Mesh Objects' }
    ],
    architecture: [
      'Three.js scene graph optimization with GPU instancing',
      'CRDT conflict-free replicated data type sync engine',
      'Custom post-processing glowing bloom shader',
      'Exportable IaC (Terraform) generator from 3D visual graphs'
    ],
    model3dType: 'globe',
    demoUrl: '#',
    githubUrl: 'https://github.com/tushargoti'
  }
];

export const TIMELINE: TimelineItem[] = [
  {
    id: 'role-1',
    period: '2023 - PRESENT',
    role: 'Senior AI/ML & Lead Full Stack Architect',
    company: 'UpSqode',
    location: 'Surat, Gujarat, India',
    type: 'work',
    highlights: [
      'Leading AI & Full Stack engineering at UpSqode, architecting enterprise LLM agent platforms serving 200,000+ daily queries.',
      'Designed multi-modal RAG knowledge engines reducing document search time from 15 minutes to under 2 seconds.',
      'Optimized cloud GPU infrastructure and inference costs by 38% using quantization and vLLM serving.',
      'Spearheaded modern WebGL 3D dashboard design systems across flagship SaaS products.'
    ],
    technologies: ['PyTorch', 'Llama 3', 'RAG', 'Node.js', 'React', 'TypeScript', 'AWS', 'Docker']
  },
  {
    id: 'role-2',
    period: '2021 - 2023',
    role: 'Senior Full Stack & AI Lead',
    company: 'AdvaitUX',
    location: 'Surat, Gujarat, India',
    type: 'work',
    highlights: [
      'Architected responsive web platforms, custom UI design systems, and AI-driven UX analytics engines.',
      'Built high-concurrency microservices handling 50k+ requests/second using Node.js, Express, Redis, and PostgreSQL.',
      'Mentored engineering teams on modern React, TypeScript, state management, and GraphQL API design.'
    ],
    technologies: ['React', 'TypeScript', 'Node.js', 'Express', 'Redis', 'PostgreSQL', 'GraphQL', 'Tailwind CSS']
  },
  {
    id: 'role-3',
    period: '2019 - 2021',
    role: 'Full Stack & IoT Cloud Engineer',
    company: 'DotCom IoT LLP',
    location: 'Surat, Gujarat, India',
    type: 'work',
    highlights: [
      'Designed real-time computer vision & IoT sensor telemetry processing pipelines for smart industrial networks.',
      'Engineered interactive React analytics dashboards featuring real-time WebSockets charting and automated alerting.',
      'Managed edge device synchronization protocols and cloud server infrastructure.'
    ],
    technologies: ['OpenCV', 'YOLO', 'Python', 'Node.js', 'React', 'WebSockets', 'MongoDB', 'Docker']
  },
  {
    id: 'role-4',
    period: '2018 - 2019',
    role: 'Full Stack Developer',
    company: 'KPEWorld',
    location: 'Surat, Gujarat, India',
    type: 'work',
    highlights: [
      'Developed 15+ custom web applications and e-commerce platforms using React, Node.js, Express, and MongoDB.',
      'Integrated payment gateway APIs, OAuth 2.0 authentication flows, and automated email/SMS webhook triggers.',
      'Maintained high uptime across production cloud environments.'
    ],
    technologies: ['React', 'Node.js', 'Express', 'MongoDB', 'REST APIs', 'AWS', 'Tailwind CSS']
  },
  {
    id: 'role-5',
    period: '2016 - 2018',
    role: 'Web Developer',
    company: 'WebInfoTech',
    location: 'Surat, Gujarat, India',
    type: 'work',
    highlights: [
      'Built responsive web interfaces and backend services for diverse business clients across India.',
      'Created modular JavaScript UI components, database schema migrations, and optimized SQL queries.'
    ],
    technologies: ['JavaScript', 'HTML5/CSS3', 'Node.js', 'MySQL', 'REST APIs', 'Bootstrap']
  },
  {
    id: 'edu-1',
    period: '2012 - 2016',
    role: 'B.Tech in Computer Engineering',
    company: 'Gujarat Technological University (GTU)',
    location: 'Gujarat, India',
    type: 'education',
    highlights: [
      'Graduated with First Class Honors in Computer Engineering.',
      'Focused research on Machine Learning algorithms, Distributed Systems, and Database Optimizations.',
      'Won 1st place in State University Hackathon for AI-driven automated surveillance system.'
    ],
    technologies: ['Algorithms', 'Data Structures', 'C++', 'Python', 'Machine Learning', 'SQL']
  }
];

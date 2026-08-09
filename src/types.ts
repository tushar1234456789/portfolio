export interface Project {
  id: string;
  title: string;
  category: 'ai_ml' | 'fullstack' | 'systems' | 'graphics';
  shortDesc: string;
  fullDesc: string;
  image: string;
  tags: string[];
  metrics: { label: string; value: string }[];
  architecture: string[];
  demoUrl?: string;
  githubUrl?: string;
  model3dType?: 'brain' | 'vision' | 'trading' | 'globe';
}

export interface SkillCategory {
  id: string;
  title: string;
  icon: string;
  accentColor: string;
  badgeBg: string;
  badgeBorder: string;
  badgeText: string;
  description: string;
  skills: { name: string; level: number; experience: string; details: string }[];
}

export interface TimelineItem {
  id: string;
  period: string;
  role: string;
  company: string;
  location: string;
  type: 'work' | 'education';
  highlights: string[];
  technologies: string[];
}

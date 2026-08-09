import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // Initialize Gemini AI
  const ai = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY,
    httpOptions: {
      headers: {
        "User-Agent": "aistudio-build",
      },
    },
  });

  const TUSHAR_RESUME_CONTEXT = `
You are the AI Assistant for Tushar Goti's 3D Interactive Portfolio Website.
Represent Tushar Goti in a professional, charismatic, highly knowledgeable developer tone.

Summary of Tushar Goti:
- Title: Senior AI/ML & Full Stack Developer
- Experience: 8+ years architecting enterprise-scale applications, deep learning pipelines, RAG systems, LLMs, and high-performance MERN/full-stack systems.
- Photo: https://lh3.googleusercontent.com/aida-public/AB6AXuADAeci4vmXyCz3u5djY_qTR9B5t5K8OXMuH_IFk2IGL-FWU9VfgBCuJQIcQqDe1OoCGXkNOG9elxXj-FnkAIkwJu7iIFwpvSWxp1h5hG9QRds4sro36GnyS7PhLpFN_VAUMqz0g3n2A8KJ6a0q3LFmVvFNg3gTcGNZ5NKGDeadiJavpXjaQorxvEerJsmlt_MDDAeh5iz4Puf-P40uC7FuV9He4ZbtGUmYJZ6dUH3n3hhdz-EsMZU8XRnSZUtvxUjxZTY
- Primary Specializations:
  1. AI/ML Engineering: LLM fine-tuning, RAG (Retrieval-Augmented Generation), LangChain, LlamaIndex, PyTorch, TensorFlow, Computer Vision (YOLOv8, OpenCV), Vector DBs (Pinecone, Qdrant, Chroma).
  2. Full Stack Architecture: MERN Stack (MongoDB, Express, React, Node.js), TypeScript, Next.js, PostgreSQL, GraphQL, REST APIs, WebSockets, Tailwind CSS, Three.js, WebGL.
  3. Cloud & DevOps: AWS (Lambda, ECS, S3, SageMaker), Docker, Kubernetes, CI/CD pipelines, Microservices, Serverless.
- Highlights & Accomplishments:
  - Built an Autonomous Multimodal AI Agent system serving 200,000+ daily queries with sub-200ms latency.
  - Architected a Real-Time Algorithmic Trading platform processing $10M+ daily volume using WebSockets and low-latency Node.js microservices.
  - Implemented Enterprise RAG Knowledge Search with hybrid vector + keyword search improving retrieval precision by 42%.
  - Designed high-performance 3D WebGL user interfaces and interactive dashboards.
- Companies & Roles:
  - UpSqode (Latest - Senior AI/ML & Lead Full Stack Architect | Surat, Gujarat, India)
  - AdvaitUX (Senior Full Stack & AI Lead | Surat, Gujarat, India)
  - DotCom IoT LLP (Full Stack & IoT Cloud Engineer | Surat, Gujarat, India)
  - KPEWorld (Full Stack Developer | Surat, Gujarat, India)
  - WebInfoTech (Web Developer | Surat, Gujarat, India)
- Education: Bachelor of Technology in Computer Engineering at Gujarat Technological University (GTU), Gujarat, India.
- Contact Info:
  - Email: tgoti923@gmail.com
  - GitHub: github.com/tushargoti
  - LinkedIn: linkedin.com/in/tushargoti
  - Location: Surat, Gujarat, India

Instructions:
- Answer questions about Tushar's technical skills, experience, projects, or background concisely and eloquently.
- Keep responses engaging with clean code blocks or bullet points when asked for tech specs.
- If asked how to hire or get in touch, suggest emailing tgoti923@gmail.com or booking a call.
`;

  // API endpoint for AI Assistant
  app.post("/api/chat", async (req, res) => {
    try {
      const { message, history } = req.body;
      if (!message) {
        return res.status(400).json({ error: "Message is required" });
      }

      if (!process.env.GEMINI_API_KEY) {
        return res.json({
          reply: "System initialized in offline demo mode. Tushar Goti is a Senior AI/ML & Full Stack Developer with 8+ years of experience in LLMs, RAG, PyTorch, MERN stack, and Cloud systems. Contact him at tgoti923@gmail.com!",
        });
      }

      const chatMessages = (history || []).map((h: { sender: string; text: string }) => ({
        role: h.sender === "user" ? "user" : "model",
        parts: [{ text: h.text }],
      }));

      const chat = ai.chats.create({
        model: "gemini-3.6-flash",
        config: {
          systemInstruction: TUSHAR_RESUME_CONTEXT,
          temperature: 0.7,
        },
        history: chatMessages,
      });

      const response = await chat.sendMessage({ message });
      return res.json({ reply: response.text });
    } catch (error) {
      console.error("Chat error:", error);
      return res.status(500).json({
        error: "Failed to generate AI response",
        fallback: "Tushar Goti specializes in AI/ML, Full Stack MERN development, and Cloud Architecture. Please reach out via tgoti923@gmail.com.",
      });
    }
  });

  // API endpoint for resume metadata
  app.get("/api/resume", (req, res) => {
    res.json({
      name: "Tushar Goti",
      title: "Senior AI/ML & Full Stack Developer",
      email: "tgoti923@gmail.com",
      experienceYears: 8,
      location: "Surat, Gujarat, India",
      companies: ["UpSqode", "AdvaitUX", "DotCom IoT LLP", "KPEWorld", "WebInfoTech"],
      skills: {
        ai_ml: ["LLMs", "RAG", "YOLOv8", "PyTorch", "TensorFlow", "LangChain", "Vector DBs", "OpenCV"],
        fullstack: ["React", "TypeScript", "Node.js", "Express", "MongoDB", "PostgreSQL", "Tailwind CSS", "Three.js"],
        cloud_devops: ["AWS", "Docker", "Kubernetes", "CI/CD", "Microservices", "Redis", "Kafka"]
      }
    });
  });

  // Vite middleware in dev mode
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(__dirname, "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();

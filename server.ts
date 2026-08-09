import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import { createServer as createViteServer } from "vite";

import dotenv from "dotenv";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());


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

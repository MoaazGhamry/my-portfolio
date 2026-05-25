"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { useLanguage } from "@/context/LanguageContext";
import { ease, smoothViewport } from "@/lib/motion";

const toolsRow1 = ["SOLIDWORKS", "Siemens TIA Portal", "Django 5.2", "Next.js", "PostgreSQL", "Redis", "Firebase", "Python", "TypeScript", "Docker", "Proteus 9", "PVSyst", "AutoCAD", "Git"];
const toolsRow2 = ["Google GenAI", "Groq", "Pandas", "NumPy", "Celery", "WebSockets", "Llama 3.3", "Gemini 2.5", "Ubuntu/WSL", "Nginx", "Figma", "VS Code", "GitHub Actions", "Vercel"];

export default function TechMarquee() {
  const { locale } = useLanguage();
  const isAr = locale === "ar";
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const x1 = useTransform(scrollYProgress, [0, 1], ["0%", "-15%"]);
  const x2 = useTransform(scrollYProgress, [0, 1], ["-15%", "0%"]);

  return (
    <section ref={ref} className="relative z-10 py-16 md:py-24 overflow-hidden">
      <motion.div initial={{ opacity: 0, filter: "blur(6px)" }} whileInView={{ opacity: 1, filter: "blur(0px)" }}
        viewport={smoothViewport} transition={{ duration: 0.8, ease: ease.outQuart }}>
        <div className="text-center mb-10">
          <p className="text-xs tracking-[0.3em] uppercase text-[var(--text-muted)] font-medium">{isAr ? "الأدوات والتقنيات" : "Tools & Technologies"}</p>
        </div>
        <motion.div style={{ x: x1, willChange: "transform" }} className="flex gap-3 mb-3 whitespace-nowrap">
          {[...toolsRow1, ...toolsRow1].map((tool, idx) => (
            <div key={idx} className="shrink-0 px-4 py-2.5 rounded-xl bg-[var(--bg-card)] border border-[var(--glass-border)] text-sm text-[var(--text-muted)] font-medium hover:text-[var(--text-secondary)] hover:border-purple-500/20 transition-all duration-400 cursor-default">{tool}</div>
          ))}
        </motion.div>
        <motion.div style={{ x: x2, willChange: "transform" }} className="flex gap-3 whitespace-nowrap">
          {[...toolsRow2, ...toolsRow2].map((tool, idx) => (
            <div key={idx} className="shrink-0 px-4 py-2.5 rounded-xl bg-[var(--bg-card)] border border-[var(--glass-border)] text-sm text-[var(--text-muted)] font-medium hover:text-[var(--text-secondary)] hover:border-blue-500/20 transition-all duration-400 cursor-default">{tool}</div>
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
}

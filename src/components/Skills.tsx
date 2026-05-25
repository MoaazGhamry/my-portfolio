"use client";

import { motion } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import { useLanguage } from "@/context/LanguageContext";
import { ease, smoothViewport } from "@/lib/motion";

const skillData = [
  { gradient: "from-blue-500 to-cyan-500", accentColor: "text-blue-400",
    items: [{ name: "SOLIDWORKS", level: 95 }, { name: "Siemens TIA Portal", level: 88 }, { name: "Proteus 9", level: 85 }, { name: "PVSyst", level: 75 }, { name: "CFD Simulation", level: 70 }] },
  { gradient: "from-purple-500 to-pink-500", accentColor: "text-purple-400",
    items: [{ name: "Django 5.2", level: 92 }, { name: "Next.js", level: 85 }, { name: "Celery", level: 80 }, { name: "Redis", level: 82 }, { name: "PostgreSQL", level: 88 }, { name: "WebSockets", level: 78 }] },
  { gradient: "from-emerald-500 to-teal-500", accentColor: "text-emerald-400",
    items: [{ name: "Google GenAI", level: 85 }, { name: "Groq", level: 78 }, { name: "Python", level: 95 }, { name: "WSL/Ubuntu", level: 80 }, { name: "Pandas", level: 82 }, { name: "NumPy", level: 80 }] },
];

function SkillBar({ name, level, gradient, delay }: { name: string; level: number; gradient: string; delay: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true); }, { threshold: 0.3 });
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <motion.div ref={ref}
      initial={{ opacity: 0, x: -12, filter: "blur(4px)" }}
      whileInView={{ opacity: 1, x: 0, filter: "blur(0px)" }}
      viewport={{ once: true }}
      transition={{ delay, duration: 0.5, ease: ease.outQuart }}
      className="group" data-cursor-hover>
      <div className="flex items-center justify-between mb-1.5">
        <span className="text-xs font-medium text-[var(--text-secondary)] group-hover:text-[var(--text-heading)] transition-colors duration-300">{name}</span>
        <span className="text-[10px] text-[var(--text-muted)] tabular-nums group-hover:text-[var(--text-secondary)] transition-colors duration-300">{level}%</span>
      </div>
      <div className="h-1 rounded-full bg-[var(--bg-card)] overflow-hidden">
        <motion.div className={`h-full rounded-full bg-gradient-to-r ${gradient}`}
          style={{ willChange: "width" }}
          initial={{ width: 0 }}
          animate={visible ? { width: `${level}%` } : { width: 0 }}
          transition={{ duration: 1.2, delay: delay + 0.1, ease: ease.outQuart }} />
      </div>
    </motion.div>
  );
}

export default function Skills() {
  const { t } = useLanguage();

  return (
    <section id="skills" className="relative z-10 py-20 md:py-32 px-4 max-w-6xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 30, filter: "blur(10px)" }}
        whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
        viewport={smoothViewport}
        transition={{ duration: 0.8, ease: ease.outQuart }}
      >
        <div className="text-center mb-14">
          <motion.p initial={{ opacity: 0, y: 8, filter: "blur(4px)" }} whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            viewport={smoothViewport} transition={{ delay: 0.1, duration: 0.6, ease: ease.outQuart }}
            className="text-xs tracking-[0.3em] uppercase text-cyan-400/80 mb-2 font-medium">{t.skills.eyebrow}</motion.p>
          <motion.h2 initial={{ opacity: 0, y: 12, filter: "blur(6px)" }} whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            viewport={smoothViewport} transition={{ delay: 0.15, duration: 0.7, ease: ease.outQuart }}
            className="text-2xl md:text-4xl lg:text-5xl font-bold text-[var(--text-heading)] mb-3">
            {t.skills.heading}<span className="text-gradient">{t.skills.headingHighlight}</span>
          </motion.h2>
          <motion.p initial={{ opacity: 0, y: 10, filter: "blur(4px)" }} whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            viewport={smoothViewport} transition={{ delay: 0.2, duration: 0.6, ease: ease.outQuart }}
            className="text-[var(--text-muted)] max-w-lg mx-auto text-sm md:text-base">{t.skills.subtitle}</motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
          {skillData.map((group, gIdx) => (
            <motion.div key={gIdx}
              initial={{ opacity: 0, y: 24, filter: "blur(8px)" }}
              whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              viewport={smoothViewport}
              transition={{ delay: gIdx * 0.1, duration: 0.7, ease: ease.outQuart }}
              className="glass-card p-6 md:p-8">
              <div className="flex items-center gap-3 mb-6">
                <div className={`h-px flex-1 bg-gradient-to-r ${group.gradient} opacity-20`} />
                <h3 className={`text-xs font-semibold tracking-[0.2em] uppercase ${group.accentColor}`}>
                  {t.skills.categories[gIdx]?.category || ""}
                </h3>
                <div className={`h-px flex-1 bg-gradient-to-l ${group.gradient} opacity-20`} />
              </div>
              <div className="space-y-4">
                {group.items.map((skill, sIdx) => (
                  <SkillBar key={sIdx} name={skill.name} level={skill.level} gradient={group.gradient}
                    delay={gIdx * 0.06 + sIdx * 0.04} />
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}

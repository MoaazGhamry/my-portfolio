"use client";

import { motion } from "framer-motion";
import { ExternalLink, Database, Activity, Cpu, Code, Server, Zap } from "lucide-react";
import { useRef } from "react";
import { useLanguage } from "@/context/LanguageContext";
import { ease, spring, smoothViewport } from "@/lib/motion";

const projectMeta = [
  { icon: <Database size={20} />, iconColor: "text-blue-400", gradient: "from-blue-500/20 to-cyan-500/20", tags: ["Django 5.2", "Redis", "WebSockets", "GenAI", "Llama 3.3", "Gemini 2.5"], status: "live", statusColor: "text-emerald-400" },
  { icon: <Activity size={20} />, iconColor: "text-emerald-400", gradient: "from-emerald-500/20 to-green-500/20", tags: ["Firebase", "Offline-first", "React", "Real-time Sync"], status: "live", statusColor: "text-emerald-400" },
  { icon: <Cpu size={20} />, iconColor: "text-purple-400", gradient: "from-purple-500/20 to-violet-500/20", tags: ["NE555", "Digital Logic", "PCB Design", "Cortex"], status: "exhibited", statusColor: "text-amber-400" },
  { icon: <Code size={20} />, iconColor: "text-amber-400", gradient: "from-amber-500/20 to-orange-500/20", tags: ["PostgreSQL", "Python", "Pandas", "Data Pipeline"], status: "live", statusColor: "text-emerald-400" },
  { icon: <Server size={20} />, iconColor: "text-cyan-400", gradient: "from-cyan-500/20 to-teal-500/20", tags: ["Siemens S7", "TIA Portal", "SCL/STL", "HMI"], status: "completed", statusColor: "text-blue-400" },
  { icon: <Zap size={20} />, iconColor: "text-rose-400", gradient: "from-rose-500/20 to-pink-500/20", tags: ["PVSyst", "SOLIDWORKS", "CFD", "Renewable"], status: "research", statusColor: "text-purple-400" },
];

const statusLabels: Record<string, { en: string; ar: string }> = {
  live: { en: "● Live", ar: "● مباشر" }, exhibited: { en: "● Exhibited", ar: "● معروض" },
  completed: { en: "● Completed", ar: "● مكتمل" }, research: { en: "● Research", ar: "● بحثي" },
};

const extraEN = [
  { title: "PLC Multi-Axis Production Line", description: "Engineered complete automation logic (SCL/STL) for multi-axis production lines with real-time HMI dashboards, emergency stops, and predictive fault detection on Siemens S7-1200/1500 platforms." },
  { title: "Renewable Energy System Optimizer", description: "Designed and simulated a hybrid solar-wind energy system using PVSyst and SOLIDWORKS. Conducted CFD analysis for optimal panel placement and airflow modeling." },
];
const extraAR = [
  { title: "خط إنتاج PLC متعدد المحاور", description: "تطوير منطق أتمتة كامل (SCL/STL) لخطوط إنتاج متعددة المحاور مع لوحات HMI للمراقبة الفورية واكتشاف الأعطال التنبؤي على منصات Siemens S7-1200/1500." },
  { title: "محسن نظام الطاقة المتجددة", description: "تصميم ومحاكاة نظام طاقة هجين شمسي-رياح باستخدام PVSyst و SOLIDWORKS. إجراء تحليل CFD لأمثل وضع للألواح ونمذجة تدفق الهواء." },
];

function SpotlightCard({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const handleMouseMove = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    ref.current.style.setProperty("--mouse-x", `${e.clientX - rect.left}px`);
    ref.current.style.setProperty("--mouse-y", `${e.clientY - rect.top}px`);
  };
  return <div ref={ref} onMouseMove={handleMouseMove} className={`spotlight-card ${className}`}>{children}</div>;
}

export default function Projects() {
  const { t, locale } = useLanguage();
  const isAr = locale === "ar";
  const allItems = [...t.projects.items, ...(isAr ? extraAR : extraEN)];

  return (
    <section id="projects" className="relative z-10 py-20 md:py-32 px-4 max-w-7xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 30, filter: "blur(10px)" }}
        whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
        viewport={smoothViewport}
        transition={{ duration: 0.8, ease: ease.outQuart }}
      >
        <div className="text-center mb-12">
          <motion.p initial={{ opacity: 0, y: 8, filter: "blur(4px)" }} whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            viewport={smoothViewport} transition={{ delay: 0.1, duration: 0.6, ease: ease.outQuart }}
            className="text-xs tracking-[0.3em] uppercase text-purple-400/80 mb-2 font-medium">{t.projects.eyebrow}</motion.p>
          <motion.h2 initial={{ opacity: 0, y: 12, filter: "blur(6px)" }} whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            viewport={smoothViewport} transition={{ delay: 0.15, duration: 0.7, ease: ease.outQuart }}
            className="text-2xl md:text-4xl lg:text-5xl font-bold text-[var(--text-heading)] mb-3">
            {t.projects.heading}<span className="text-gradient">{t.projects.headingHighlight}</span>
          </motion.h2>
          <motion.p initial={{ opacity: 0, y: 10, filter: "blur(4px)" }} whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            viewport={smoothViewport} transition={{ delay: 0.2, duration: 0.6, ease: ease.outQuart }}
            className="text-[var(--text-muted)] max-w-lg mx-auto text-sm md:text-base">{t.projects.subtitle}</motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5">
          {allItems.map((project, idx) => (
            <motion.div key={idx}
              initial={{ opacity: 0, y: 24, filter: "blur(8px)" }}
              whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              viewport={smoothViewport}
              transition={{ delay: idx * 0.07, duration: 0.7, ease: ease.outQuart }}>
              <SpotlightCard>
                <motion.div whileHover={{ scale: 1.03, y: -8, boxShadow: "0 20px 40px -10px rgba(139,92,246,0.3)" }} transition={spring.hover}
                  className="glass-card p-5 md:p-6 h-full flex flex-col relative overflow-hidden group transition-all duration-400" data-cursor-hover>
                  <div className={`absolute top-0 left-0 right-0 h-px bg-gradient-to-r ${projectMeta[idx]?.gradient || "from-blue-500/20 to-cyan-500/20"} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
                  <div className="flex items-center justify-between mb-4">
                    <div className={`w-10 h-10 rounded-xl bg-[var(--bg-card)] border border-[var(--glass-border)] flex items-center justify-center ${projectMeta[idx]?.iconColor || "text-blue-400"} group-hover:scale-110 transition-transform duration-500 ease-out`}>
                      {projectMeta[idx]?.icon || <Code size={20} />}
                    </div>
                    <div className="flex items-center gap-2">
                      {projectMeta[idx]?.status && (
                        <span className={`text-[9px] font-medium ${projectMeta[idx].statusColor}`}>
                          {statusLabels[projectMeta[idx].status]?.[isAr ? "ar" : "en"] || ""}
                        </span>
                      )}
                      <motion.div whileHover={{ scale: 1.15, rotate: 12 }} transition={spring.hover}
                        className="p-1.5 rounded-lg hover:bg-[var(--bg-card)] transition-colors duration-300" data-cursor-hover>
                        <ExternalLink className="text-[var(--text-muted)] group-hover:text-[var(--text-secondary)] transition-colors duration-300" size={13} />
                      </motion.div>
                    </div>
                  </div>
                  <h3 className="text-sm md:text-base font-bold text-[var(--text-heading)] mb-2">{project.title}</h3>
                  <p className="text-[var(--text-muted)] leading-relaxed text-xs mb-4 flex-grow">{project.description}</p>
                  <div className="flex flex-wrap gap-1 mt-auto">
                    {(projectMeta[idx]?.tags || []).map((tag, i) => (
                      <span key={i} className="px-2 py-0.5 bg-[var(--bg-card)] border border-[var(--glass-border)] rounded-md text-[9px] text-[var(--text-muted)] font-medium hover:text-[var(--text-secondary)] transition-all duration-300">{tag}</span>
                    ))}
                  </div>
                </motion.div>
              </SpotlightCard>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}

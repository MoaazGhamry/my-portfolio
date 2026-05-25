"use client";

import { motion, AnimatePresence } from "framer-motion";
import { ExternalLink, Database, Activity, Cpu, Code, Server, Zap, X, Terminal, Cpu as Processor, Layout, Award } from "lucide-react";
import { useRef, useState, useEffect } from "react";
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
  {
    title: "PLC Multi-Axis Production Line",
    description: "Engineered complete automation logic (SCL/STL) for multi-axis production lines with real-time HMI dashboards, emergency stops, and predictive fault detection on Siemens S7-1200/1500 platforms.",
    role: "Lead Automation Engineer",
    architecture: "Siemens S7-1200/1500 PLC processing sensor telemetry, outputting control values to variable frequency drives and pneumatic actuators. HMI is linked over PROFINET.",
    specs: ["Controller: Siemens S7-1500 CPU", "Communication: PROFINET / OPC UA", "Language: SCL / STL", "Testing: PLCSIM Advanced"],
    achievements: [
      "Optimized cycle execution times by 20% using structured SCL programming rather than legacy LAD.",
      "Integrated emergency stop safety zones compliant with ISO 13849 PLd.",
      "Developed a local simulation interface to test PLC logic without physical hardware access."
    ]
  },
  {
    title: "Renewable Energy System Optimizer",
    description: "Designed and simulated a hybrid solar-wind energy system using PVSyst and SOLIDWORKS. Conducted CFD analysis for optimal panel placement and airflow modeling.",
    role: "CAD & Simulation Engineer",
    architecture: "SolidWorks models of solar tracker hinges and wind turbine mounting poles. PVSyst calculates yearly irradiance maps and system generation yields.",
    specs: ["CAD: SOLIDWORKS 2024", "CFD Tool: SOLIDWORKS Flow Simulation", "PV Planning: PVSyst Professional", "Drafting: GD&T Standard"],
    achievements: [
      "Designed a light-tracking assembly that boosts solar panel absorption efficiency by 25%.",
      "Conducted wind tunnel simulations to ensure structure holds against up to 140 km/h wind gusts.",
      "Estimated annual generation capacity of 4.2 MWh with a 5.6-year capital payback model."
    ]
  },
];
const extraAR = [
  {
    title: "خط إنتاج PLC متعدد المحاور",
    description: "تطوير منطق أتمتة كامل (SCL/STL) لخطوط إنتاج متعددة المحاور مع لوحات HMI للمراقبة الفورية واكتشاف الأعطال التنبؤي على منصات Siemens S7-1200/1500.",
    role: "مهندس الأتمتة الرئيسي",
    architecture: "معالجات Siemens S7-1200/1500 لمعالجة الإشارات، وتوجيه المحركات وصمامات الهواء. ترتبط الشاشات عبر شبكة PROFINET الصناعية.",
    specs: ["المعالج: Siemens S7-1500 CPU", "البروتوكول: PROFINET / OPC UA", "اللغات: SCL / STL", "المحاكاة: PLCSIM Advanced"],
    achievements: [
      "تسريع دورة الإنتاج بنسبة 20% عبر استبدال المخططات السلمية القديمة بلغة SCL المنظمة.",
      "تطبيق أنظمة السلامة وإيقاف الطوارئ المتوافقة مع معايير ISO 13849 PLd.",
      "بناء منصة محاكاة برمجية لتجربة منطق الأتمتة بالكامل قبل التركيب الفعلي للأجهزة."
    ]
  },
  {
    title: "محسن نظام الطاقة المتجددة",
    description: "تصميم ومحاكاة نظام طاقة هجين شمسي-رياح باستخدام PVSyst و SOLIDWORKS. إجراء تحليل CFD لأمثل وضع للألواح ونمذجة تدفق الهواء.",
    role: "مهندس تصميم ومحاكاة CAD",
    architecture: "نماذج SOLIDWORKS لآليات تتبع الشمس وأعمدة توربينات الرياح. نظام PVSyst لحساب الخرائط الإشعاعية والإنتاج السنوي.",
    specs: ["برمجيات CAD: SOLIDWORKS 2024", "تحليل السوائل: SOLIDWORKS Flow CFD", "تخطيط الشمس: PVSyst Professional", "المقاييس: معيار GD&T الهندسي"],
    achievements: [
      "تصميم وحدة تتبع ضوئي تزيد كفاءة امتصاص الألواح الشمسية بنسبة 25%.",
      "إجراء محاكاة نفق الرياح لضمان ثبات الهيكل ضد هبات رياح تصل إلى 140 كم/ساعة.",
      "تقدير طاقة إنتاج سنوية بـ 4.2 ميجاوات مع نموذج استرداد رأس المال خلال 5.6 سنة."
    ]
  },
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
  const { t, locale, isRTL } = useLanguage();
  const isAr = locale === "ar";
  const allItems = [...t.projects.items, ...(isAr ? extraAR : extraEN)];
  const [selectedIdx, setSelectedIdx] = useState<number | null>(null);

  // Disable scrolling when modal is open
  useEffect(() => {
    if (selectedIdx !== null) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [selectedIdx]);

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
                <motion.div
                  whileHover={{ y: -4 }}
                  onClick={() => setSelectedIdx(idx)}
                  transition={spring.hover}
                  className="glass-card p-5 md:p-6 h-full flex flex-col relative overflow-hidden group transition-all duration-400 cursor-pointer"
                  data-cursor-hover
                >
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
                      <div className="p-1.5 rounded-lg hover:bg-[var(--bg-card)] transition-colors duration-300">
                        <ExternalLink className="text-[var(--text-muted)] group-hover:text-[var(--text-secondary)] transition-colors duration-300" size={13} />
                      </div>
                    </div>
                  </div>
                  <h3 className="text-sm md:text-base font-bold text-[var(--text-heading)] mb-2">{project.title}</h3>
                  <p className="text-[var(--text-muted)] leading-relaxed text-xs mb-4 flex-grow">{project.description}</p>
                  <div className="flex flex-wrap gap-1 mt-auto">
                    {(projectMeta[idx]?.tags || []).map((tag, i) => (
                      <span key={i} className="px-2 py-0.5 bg-[var(--bg-card)] border border-[var(--glass-border)] rounded-md text-[9px] text-[var(--text-muted)] font-medium hover:text-[var(--text-secondary)] transition-all duration-300">{tag}</span>
                    ))}
                  </div>
                  <span className="text-[10px] text-blue-400/80 font-semibold mt-4 flex items-center gap-1 group-hover:text-blue-400 transition-colors">
                    {t.projects.viewDetails} →
                  </span>
                </motion.div>
              </SpotlightCard>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Case Study Detailed Modal */}
      <AnimatePresence>
        {selectedIdx !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/70 backdrop-blur-md"
            onClick={() => setSelectedIdx(null)}
          >
            <motion.div
              initial={{ scale: 0.95, y: 15, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.95, y: 15, opacity: 0 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="glass-card max-w-2xl w-full max-h-[85vh] overflow-y-auto p-6 md:p-8 relative noise-overlay"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <button
                onClick={() => setSelectedIdx(null)}
                className="absolute top-4 right-4 p-2 rounded-xl bg-[var(--bg-card)] border border-[var(--glass-border)] text-[var(--text-muted)] hover:text-white transition-colors cursor-pointer"
                data-cursor-hover
              >
                <X size={16} />
              </button>

              {/* Title & Status */}
              <div className="flex items-center gap-3 mb-6">
                <div className={`w-12 h-12 rounded-2xl bg-[var(--bg-card)] border border-[var(--glass-border)] flex items-center justify-center ${projectMeta[selectedIdx]?.iconColor || "text-blue-400"}`}>
                  {projectMeta[selectedIdx]?.icon || <Code size={24} />}
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-0.5">
                    <span className="text-[10px] font-mono text-[var(--text-muted)] uppercase tracking-wider">
                      Case Study
                    </span>
                    {projectMeta[selectedIdx]?.status && (
                      <span className={`text-[9px] font-medium ${projectMeta[selectedIdx].statusColor}`}>
                        {statusLabels[projectMeta[selectedIdx].status]?.[isAr ? "ar" : "en"] || ""}
                      </span>
                    )}
                  </div>
                  <h3 className="text-xl md:text-2xl font-bold text-[var(--text-heading)]">
                    {allItems[selectedIdx].title}
                  </h3>
                </div>
              </div>

              <div className="space-y-6">
                {/* Engineering Role */}
                {allItems[selectedIdx].role && (
                  <div className="p-4 rounded-xl bg-blue-500/5 border border-blue-500/10">
                    <span className="text-[10px] uppercase font-bold text-blue-400 tracking-wider flex items-center gap-1.5 mb-1">
                      <Terminal size={11} />
                      {isAr ? "الدور الهندسي" : "Engineering Role"}
                    </span>
                    <p className="text-sm font-medium text-[var(--text-secondary)]">
                      {allItems[selectedIdx].role}
                    </p>
                  </div>
                )}

                {/* System Architecture */}
                {allItems[selectedIdx].architecture && (
                  <div>
                    <h4 className="text-xs uppercase font-bold tracking-wider text-[var(--text-muted)] mb-2 flex items-center gap-1.5">
                      <Layout size={12} />
                      {t.projects.archTitle}
                    </h4>
                    <p className="text-xs leading-relaxed text-[var(--text-secondary)]">
                      {allItems[selectedIdx].architecture}
                    </p>
                  </div>
                )}

                {/* Grid of specs & achievements */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t border-[var(--line-color)]">
                  {/* Technical Payload / Specs */}
                  {allItems[selectedIdx].specs && (
                    <div>
                      <h4 className="text-xs uppercase font-bold tracking-wider text-[var(--text-muted)] mb-3 flex items-center gap-1.5">
                        <Processor size={12} />
                        {t.projects.specTitle}
                      </h4>
                      <ul className="space-y-2">
                        {allItems[selectedIdx].specs.map((spec, i) => (
                          <li key={i} className="text-xs text-[var(--text-secondary)] flex items-start gap-2">
                            <span className="text-purple-400 font-mono">▸</span>
                            <span>{spec}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* Key Achievements */}
                  {allItems[selectedIdx].achievements && (
                    <div>
                      <h4 className="text-xs uppercase font-bold tracking-wider text-[var(--text-muted)] mb-3 flex items-center gap-1.5">
                        <Award size={12} />
                        {t.projects.achTitle}
                      </h4>
                      <ul className="space-y-2">
                        {allItems[selectedIdx].achievements.map((ach, i) => (
                          <li key={i} className="text-xs text-[var(--text-secondary)] flex items-start gap-2">
                            <span className="text-emerald-400 font-mono">✔</span>
                            <span>{ach}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { Rocket, Settings, ShieldCheck, Briefcase, Building } from "lucide-react";
import { useRef } from "react";
import { useLanguage } from "@/context/LanguageContext";
import { ease, spring, smoothViewport } from "@/lib/motion";

const expMeta = [
  { icon: <Rocket size={18} />, iconColor: "text-purple-400", dotColor: "bg-purple-500", glowColor: "shadow-[0_0_10px_rgba(139,92,246,0.3)]" },
  { icon: <Building size={18} />, iconColor: "text-cyan-400", dotColor: "bg-cyan-500", glowColor: "shadow-[0_0_10px_rgba(6,182,212,0.3)]" },
  { icon: <Settings size={18} />, iconColor: "text-blue-400", dotColor: "bg-blue-500", glowColor: "" },
  { icon: <ShieldCheck size={18} />, iconColor: "text-amber-400", dotColor: "bg-amber-500", glowColor: "" },
  { icon: <Briefcase size={18} />, iconColor: "text-emerald-400", dotColor: "bg-emerald-500", glowColor: "" },
];

export default function Experience() {
  const { t } = useLanguage();
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ["start 0.8", "end 0.5"] });
  const lineHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <section id="experience" ref={containerRef} className="relative z-10 py-20 md:py-32 px-4 max-w-4xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 30, filter: "blur(10px)" }}
        whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
        viewport={smoothViewport}
        transition={{ duration: 0.8, ease: ease.outQuart }}
      >
        <div className="text-center mb-16">
          <motion.p initial={{ opacity: 0, y: 8, filter: "blur(4px)" }} whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            viewport={smoothViewport} transition={{ delay: 0.1, duration: 0.6, ease: ease.outQuart }}
            className="text-xs tracking-[0.3em] uppercase text-emerald-400/80 mb-2 font-medium">{t.experience.eyebrow}</motion.p>
          <motion.h2 initial={{ opacity: 0, y: 12, filter: "blur(6px)" }} whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            viewport={smoothViewport} transition={{ delay: 0.15, duration: 0.7, ease: ease.outQuart }}
            className="text-2xl md:text-4xl lg:text-5xl font-bold text-[var(--text-heading)]">
            {t.experience.heading}<span className="text-gradient">{t.experience.headingHighlight}</span>
          </motion.h2>
        </div>

        <div className="relative">
          <div className="absolute left-[19px] md:left-1/2 md:-translate-x-1/2 top-0 bottom-0 w-px bg-[var(--line-color)]" />
          <motion.div className="absolute left-[19px] md:left-1/2 md:-translate-x-1/2 top-0 w-px origin-top"
            style={{ height: lineHeight, background: "linear-gradient(180deg, #3b82f6, #8b5cf6, #10b981)", willChange: "height" }} />

          <div className="space-y-10 md:space-y-14">
            {t.experience.items.map((exp, idx) => (
              <motion.div key={idx}
                initial={{ opacity: 0, y: 24, filter: "blur(8px)" }}
                whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ delay: idx * 0.08, duration: 0.7, ease: ease.outQuart }}
                className={`relative flex items-start gap-6 ${idx % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"}`}>
                {/* Dot */}
                <div className="absolute left-[19px] md:left-1/2 -translate-x-1/2 z-20">
                  <motion.div initial={{ scale: 0, filter: "blur(4px)" }} whileInView={{ scale: 1, filter: "blur(0px)" }}
                    viewport={{ once: true }} transition={{ delay: idx * 0.08 + 0.2, ...spring.gentle }} className="relative">
                    <div className={`w-[12px] h-[12px] rounded-full ${expMeta[idx]?.dotColor || "bg-blue-500"} ${idx < 2 ? expMeta[idx]?.glowColor || "" : ""} border-[3px] border-[var(--bg-primary)]`} />
                    {idx === 0 && <div className={`absolute inset-0 rounded-full ${expMeta[idx]?.dotColor} animate-ping opacity-20`} />}
                  </motion.div>
                </div>
                {/* Card */}
                <div className={`ml-12 md:ml-0 md:w-[calc(50%-32px)] ${idx % 2 === 0 ? "md:text-right" : ""}`}>
                  <motion.div whileHover={{ y: -3 }} transition={spring.hover}
                    className="glass-card glass-card-hover p-5 md:p-6 group" data-cursor-hover>
                    <div className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[var(--bg-card)] border border-[var(--glass-border)] text-[10px] text-[var(--text-muted)] mb-3 ${idx % 2 === 0 ? "md:float-right md:ml-2" : ""}`}>
                      <span className={expMeta[idx]?.iconColor || "text-blue-400"}>{expMeta[idx]?.icon}</span>
                      {exp.period}
                    </div>
                    <h3 className="text-base md:text-lg font-bold text-[var(--text-heading)] mb-1 clear-both">{exp.role}</h3>
                    <h4 className="text-blue-400/80 font-medium text-xs mb-2">{exp.company}</h4>
                    <p className="text-[var(--text-muted)] leading-relaxed text-sm">{exp.description}</p>
                  </motion.div>
                </div>
                <div className="hidden md:block md:w-[calc(50%-32px)]" />
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>
    </section>
  );
}

"use client";

import { motion, animate } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { useLanguage } from "@/context/LanguageContext";
import { Code, Layers, Wrench, Brain, Rocket, Globe } from "lucide-react";
import { ease, smoothViewport } from "@/lib/motion";

const metrics = [
  { value: 4, suffix: "+", icon: <Rocket size={16} />, label: { en: "Production Systems", ar: "أنظمة إنتاجية" }, color: "text-blue-400" },
  { value: 15, suffix: "+", icon: <Code size={16} />, label: { en: "Technologies Mastered", ar: "تقنيات متقنة" }, color: "text-purple-400" },
  { value: 30, suffix: "%", icon: <Wrench size={16} />, label: { en: "Efficiency Boost", ar: "زيادة الكفاءة" }, color: "text-emerald-400" },
  { value: 3, suffix: "x", icon: <Layers size={16} />, label: { en: "Excellence Awards", ar: "جوائز التميز" }, color: "text-amber-400" },
  { value: 2, suffix: "", icon: <Brain size={16} />, label: { en: "Companies Founded", ar: "شركات مؤسسة" }, color: "text-rose-400" },
  { value: 100, suffix: "%", icon: <Globe size={16} />, label: { en: "Data Integrity", ar: "سلامة البيانات" }, color: "text-cyan-400" },
];

function AnimatedNumber({ target, suffix }: { target: number; suffix: string }) {
  const [display, setDisplay] = useState("0");
  const [hasAnimated, setHasAnimated] = useState(false);
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !hasAnimated) {
        setHasAnimated(true);
        animate(0, target, { duration: 2, ease: ease.outQuart, onUpdate: (v) => setDisplay(Math.round(v).toString()) });
      }
    }, { threshold: 0.3 });
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [target, hasAnimated]);

  return <span ref={ref} className="tabular-nums">{display}{suffix}</span>;
}

export default function MetricsBanner() {
  const { locale } = useLanguage();
  const isAr = locale === "ar";

  return (
    <section className="relative z-10 py-12 md:py-16 px-4">
      <div className="max-w-6xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 24, filter: "blur(8px)" }} whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          viewport={smoothViewport} transition={{ duration: 0.7, ease: ease.outQuart }}
          className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          {metrics.map((m, idx) => (
            <motion.div key={idx}
              initial={{ opacity: 0, y: 16, filter: "blur(6px)" }}
              whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.06, duration: 0.55, ease: ease.outQuart }}
              className="text-center p-4 md:p-5 rounded-2xl bg-[var(--bg-card)] border border-[var(--glass-border)] group hover:border-purple-500/15 transition-all duration-400" data-cursor-hover>
              <div className={`${m.color} flex justify-center mb-2 group-hover:scale-110 transition-transform duration-500 ease-out`}>{m.icon}</div>
              <div className="text-2xl md:text-3xl font-bold text-[var(--text-heading)] mb-1"><AnimatedNumber target={m.value} suffix={m.suffix} /></div>
              <div className="text-[10px] text-[var(--text-muted)] leading-tight">{isAr ? m.label.ar : m.label.en}</div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

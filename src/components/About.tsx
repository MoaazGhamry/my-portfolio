"use client";

import { motion, useMotionValue, useTransform, animate } from "framer-motion";
import { Award, Users, Wrench, Zap, Briefcase, Medal } from "lucide-react";
import { useRef, useEffect, useState } from "react";
import { useLanguage } from "@/context/LanguageContext";
import { ease, spring, smoothViewport } from "@/lib/motion";
import Image from "next/image";

function TiltCard({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useTransform(y, [-0.5, 0.5], [5, -5]);
  const rotateY = useTransform(x, [-0.5, 0.5], [-5, 5]);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    x.set((e.clientX - rect.left) / rect.width - 0.5);
    y.set((e.clientY - rect.top) / rect.height - 0.5);
  };

  return (
    <motion.div ref={ref} onMouseMove={handleMouseMove}
      onMouseLeave={() => { x.set(0); y.set(0); }}
      style={{ rotateX, rotateY, transformStyle: "preserve-3d", perspective: 1000, willChange: "transform" }}
      transition={spring.smooth} className={className}>
      {children}
    </motion.div>
  );
}

function AnimatedCounter({ target, suffix = "" }: { target: number; suffix?: string }) {
  const count = useMotionValue(0);
  const [display, setDisplay] = useState("0");
  const [hasAnimated, setHasAnimated] = useState(false);
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated) {
          setHasAnimated(true);
          animate(count, target, {
            duration: 2, ease: ease.outQuart,
            onUpdate: (v) => setDisplay(target % 1 !== 0 ? v.toFixed(2) : Math.round(v).toString()),
          });
        }
      }, { threshold: 0.5 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [count, target, hasAnimated]);

  return <span ref={ref} className="tabular-nums">{display}{suffix}</span>;
}

const highlightIcons = [
  <Wrench key="w" className="text-blue-400" size={22} />,
  <Users key="u" className="text-purple-400" size={22} />,
  <Award key="a" className="text-emerald-400" size={22} />,
];
const highlightBgs = ["bg-blue-500/10 border-blue-500/20", "bg-purple-500/10 border-purple-500/20", "bg-emerald-500/10 border-emerald-500/20"];
const counterIcons = [<Zap key="z" size={16} />, <Briefcase key="b" size={16} />, <Medal key="m" size={16} />];
const counterValues = [4, 3, 3];
const counterSuffixes = ["+", "", "x"];

export default function About() {
  const { t } = useLanguage();

  return (
    <section id="about" className="relative z-10 py-20 md:py-32 px-4 max-w-6xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 30, filter: "blur(10px)" }}
        whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
        viewport={smoothViewport}
        transition={{ duration: 0.8, ease: ease.outQuart }}
      >
        {/* Photo + Header */}
        <div className="flex flex-col md:flex-row items-start md:items-center gap-6 mb-14">
          <motion.div
            initial={{ opacity: 0, scale: 0.9, filter: "blur(6px)" }}
            whileInView={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
            viewport={smoothViewport}
            transition={{ delay: 0.1, duration: 0.7, ease: ease.outQuart }}
            className="relative w-20 h-20 md:w-24 md:h-24 rounded-2xl overflow-hidden border border-[var(--glass-border)] shrink-0"
          >
            <Image src="/photos/cortex-exhibition.jpg" alt="Moaaz at Cortex Exhibition" fill className="object-cover object-top" sizes="96px" />
          </motion.div>
          <div>
            <motion.p initial={{ opacity: 0, y: 6, filter: "blur(4px)" }} whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              viewport={smoothViewport} transition={{ delay: 0.15, duration: 0.6, ease: ease.outQuart }}
              className="text-xs tracking-[0.3em] uppercase text-blue-400/80 mb-2 font-medium">{t.about.eyebrow}</motion.p>
            <motion.h2 initial={{ opacity: 0, y: 10, filter: "blur(6px)" }} whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              viewport={smoothViewport} transition={{ delay: 0.2, duration: 0.7, ease: ease.outQuart }}
              className="text-2xl md:text-4xl lg:text-5xl font-bold text-[var(--text-heading)] section-heading">{t.about.heading}</motion.h2>
          </div>
        </div>

        {/* Counter stats */}
        <div className="grid grid-cols-3 gap-3 md:gap-6 mb-14">
          {t.about.counterStats.map((stat, idx) => (
            <motion.div key={idx}
              initial={{ opacity: 0, y: 20, filter: "blur(6px)" }}
              whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              viewport={smoothViewport}
              transition={{ delay: 0.1 + idx * 0.1, duration: 0.65, ease: ease.outQuart }}
              className="text-center p-4 md:p-6 rounded-2xl bg-[var(--bg-card)] border border-[var(--glass-border)]">
              <div className="text-[var(--text-muted)] flex justify-center mb-2">{counterIcons[idx]}</div>
              <div className="text-2xl md:text-4xl font-bold text-[var(--text-heading)] mb-1">
                <AnimatedCounter target={counterValues[idx]} suffix={counterSuffixes[idx]} />
              </div>
              <div className="text-xs text-[var(--text-muted)]">{stat.label}</div>
            </motion.div>
          ))}
        </div>

        {/* 3D Tilt Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
          {t.about.highlights.map((item, idx) => (
            <motion.div key={idx}
              initial={{ opacity: 0, y: 24, filter: "blur(8px)" }}
              whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              viewport={smoothViewport}
              transition={{ delay: 0.15 + idx * 0.1, duration: 0.7, ease: ease.outQuart }}>
              <TiltCard className="h-full">
                <div className="glass-card glass-card-hover p-6 md:p-8 h-full group" data-cursor-hover>
                  <div className={`w-12 h-12 rounded-2xl ${highlightBgs[idx]} border flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-500 ease-out`}>
                    {highlightIcons[idx]}
                  </div>
                  <h3 className="text-lg font-bold text-[var(--text-heading)] mb-2">{item.title}</h3>
                  <p className="text-[var(--text-muted)] leading-relaxed text-sm">{item.description}</p>
                </div>
              </TiltCard>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}

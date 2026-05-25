"use client";

import { motion } from "framer-motion";
import { GraduationCap, Calendar, MapPin, Star, BookOpen } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { ease, smoothViewport } from "@/lib/motion";

const courses = ["Industrial Automation", "Control Systems", "Embedded Systems", "Robotics & AI", "CAD/CAM", "Fluid Mechanics", "Thermodynamics", "Electrical Machines", "Signal Processing"];
const coursesAr = ["الأتمتة الصناعية", "أنظمة التحكم", "الأنظمة المدمجة", "الروبوتات والذكاء الاصطناعي", "التصميم بمساعدة الحاسوب", "ميكانيكا الموائع", "الديناميكا الحرارية", "الآلات الكهربائية", "معالجة الإشارات"];

export default function Education() {
  const { locale } = useLanguage();
  const isAr = locale === "ar";

  return (
    <section id="education" className="relative z-10 py-20 md:py-28 px-4 max-w-5xl mx-auto">
      <motion.div initial={{ opacity: 0, y: 30, filter: "blur(10px)" }} whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
        viewport={smoothViewport} transition={{ duration: 0.8, ease: ease.outQuart }}>
        <div className="text-center mb-12">
          <motion.p initial={{ opacity: 0, y: 8, filter: "blur(4px)" }} whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            viewport={smoothViewport} transition={{ delay: 0.1, duration: 0.6, ease: ease.outQuart }}
            className="text-xs tracking-[0.3em] uppercase text-amber-400/80 mb-2 font-medium">{isAr ? "التعليم" : "Education"}</motion.p>
          <motion.h2 initial={{ opacity: 0, y: 12, filter: "blur(6px)" }} whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            viewport={smoothViewport} transition={{ delay: 0.15, duration: 0.7, ease: ease.outQuart }}
            className="text-2xl md:text-4xl lg:text-5xl font-bold text-[var(--text-heading)]">
            {isAr ? "المسار " : "Academic "}<span className="text-gradient">{isAr ? "الأكاديمي" : "Foundation"}</span>
          </motion.h2>
        </div>

        <motion.div initial={{ opacity: 0, y: 24, filter: "blur(8px)" }} whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          viewport={smoothViewport} transition={{ delay: 0.1, duration: 0.7, ease: ease.outQuart }}
          className="glass-card p-6 md:p-8 lg:p-10">
          <div className="flex flex-col md:flex-row gap-6 md:gap-10">
            <div className="flex flex-col items-center md:items-start shrink-0">
              <motion.div initial={{ opacity: 0, scale: 0.9, filter: "blur(4px)" }} whileInView={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                viewport={smoothViewport} transition={{ delay: 0.2, duration: 0.6, ease: ease.outQuart }}
                className="w-20 h-20 rounded-2xl bg-gradient-to-br from-amber-500/15 to-orange-500/15 border border-amber-500/20 flex items-center justify-center mb-3">
                <GraduationCap className="text-amber-400" size={32} />
              </motion.div>
              <div className="flex items-center gap-1.5 text-amber-400 text-sm font-bold"><Star size={12} fill="currentColor" /><span>3.99 / 4.0</span></div>
              <span className="text-[10px] text-[var(--text-muted)]">{isAr ? "معدل تراكمي" : "Cumulative GPA"}</span>
            </div>
            <div className="flex-1">
              <h3 className="text-xl md:text-2xl font-bold text-[var(--text-heading)] mb-1">{isAr ? "جامعة الزقازيق الأهلية" : "Zagazig National University"}</h3>
              <p className="text-blue-400/80 font-medium text-sm mb-3">{isAr ? "بكالوريوس هندسة الميكاترونيكس" : "B.Sc. Mechatronics Engineering"}</p>
              <div className="flex flex-wrap gap-3 mb-5 text-xs text-[var(--text-muted)]">
                <span className="flex items-center gap-1.5"><Calendar size={12} />{isAr ? "2022 – 2027 (متوقع)" : "2022 – 2027 (Expected)"}</span>
                <span className="flex items-center gap-1.5"><MapPin size={12} />{isAr ? "مدينة العاشر من رمضان، مصر" : "10th of Ramadan City, Egypt"}</span>
              </div>
              <div className="space-y-2.5 mb-6">
                {[
                  { en: "Ranked #1 in the department across all academic years", ar: "الأول على القسم عبر جميع السنوات الدراسية" },
                  { en: "University Excellence Award recipient — 3 consecutive years", ar: "حائز على جائزة التميز الجامعي لثلاث سنوات متتالية" },
                  { en: "Led Mecha-Horizon and Thrive ZNU student teams", ar: "قائد فريقي Mecha-Horizon و Thrive ZNU الطلابيين" },
                  { en: "Active member of IEEE and student engineering societies", ar: "عضو نشط في IEEE والجمعيات الهندسية الطلابية" },
                ].map((item, idx) => (
                  <motion.div key={idx} initial={{ opacity: 0, x: isAr ? 10 : -10, filter: "blur(3px)" }}
                    whileInView={{ opacity: 1, x: 0, filter: "blur(0px)" }} viewport={{ once: true }}
                    transition={{ delay: 0.25 + idx * 0.06, duration: 0.5, ease: ease.outQuart }}
                    className="flex items-start gap-2 text-sm text-[var(--text-secondary)]">
                    <span className="mt-1 w-1.5 h-1.5 rounded-full bg-amber-400/60 shrink-0" />
                    {isAr ? item.ar : item.en}
                  </motion.div>
                ))}
              </div>
              <div>
                <div className="flex items-center gap-2 mb-3"><BookOpen size={14} className="text-[var(--text-muted)]" />
                  <span className="text-xs font-semibold text-[var(--text-muted)] uppercase tracking-wider">{isAr ? "المقررات الرئيسية" : "Key Coursework"}</span></div>
                <div className="flex flex-wrap gap-1.5">
                  {(isAr ? coursesAr : courses).map((course, idx) => (
                    <motion.span key={idx} initial={{ opacity: 0, scale: 0.9, filter: "blur(3px)" }}
                      whileInView={{ opacity: 1, scale: 1, filter: "blur(0px)" }} viewport={{ once: true }}
                      transition={{ delay: 0.3 + idx * 0.03, duration: 0.45, ease: ease.outQuart }}
                      className="px-2.5 py-1 bg-[var(--bg-card)] border border-[var(--glass-border)] rounded-lg text-[10px] text-[var(--text-muted)] font-medium hover:text-[var(--text-secondary)] hover:border-amber-500/20 transition-all duration-300">{course}</motion.span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}

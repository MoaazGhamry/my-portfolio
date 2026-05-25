"use client";

import { motion } from "framer-motion";
import { Award, CheckCircle } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { ease, spring, smoothViewport } from "@/lib/motion";

const certifications = [
  { name: "CSWP", full: { en: "Certified SOLIDWORKS Professional", ar: "محترف SOLIDWORKS معتمد" }, issuer: { en: "Dassault Systèmes", ar: "داسو سيستمز" }, color: "from-red-500/15 to-orange-500/15", borderColor: "border-red-500/20", accentColor: "text-red-400", level: { en: "Professional", ar: "محترف" } },
  { name: "CSWA", full: { en: "Certified SOLIDWORKS Associate", ar: "مشارك SOLIDWORKS معتمد" }, issuer: { en: "Dassault Systèmes", ar: "داسو سيستمز" }, color: "from-blue-500/15 to-cyan-500/15", borderColor: "border-blue-500/20", accentColor: "text-blue-400", level: { en: "Associate", ar: "مشارك" } },
  { name: "PLC", full: { en: "Advanced PLC Programming — Siemens", ar: "برمجة PLC المتقدمة — سيمنز" }, issuer: { en: "DON-BOSCO Institute", ar: "معهد دون بوسكو" }, color: "from-teal-500/15 to-emerald-500/15", borderColor: "border-teal-500/20", accentColor: "text-teal-400", level: { en: "Advanced", ar: "متقدم" } },
  { name: "CAT", full: { en: "Heavy Equipment Diagnostics", ar: "تشخيص المعدات الثقيلة" }, issuer: { en: "ManTrac (Caterpillar)", ar: "مانتراك (كاتربيلر)" }, color: "from-amber-500/15 to-yellow-500/15", borderColor: "border-amber-500/20", accentColor: "text-amber-400", level: { en: "Specialized", ar: "متخصص" } },
];

export default function Certifications() {
  const { locale } = useLanguage();
  const isAr = locale === "ar";

  return (
    <section id="certifications" className="relative z-10 py-20 md:py-28 px-4 max-w-6xl mx-auto">
      <motion.div initial={{ opacity: 0, y: 30, filter: "blur(10px)" }} whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
        viewport={smoothViewport} transition={{ duration: 0.8, ease: ease.outQuart }}>
        <div className="text-center mb-12">
          <motion.p initial={{ opacity: 0, y: 8, filter: "blur(4px)" }} whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            viewport={smoothViewport} transition={{ delay: 0.1, duration: 0.6, ease: ease.outQuart }}
            className="text-xs tracking-[0.3em] uppercase text-rose-400/80 mb-2 font-medium">{isAr ? "الشهادات" : "Credentials"}</motion.p>
          <motion.h2 initial={{ opacity: 0, y: 12, filter: "blur(6px)" }} whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            viewport={smoothViewport} transition={{ delay: 0.15, duration: 0.7, ease: ease.outQuart }}
            className="text-2xl md:text-4xl lg:text-5xl font-bold text-[var(--text-heading)] mb-3">
            {isAr ? "الشهادات " : "Certifications & "}<span className="text-gradient">{isAr ? "والاعتمادات" : "Training"}</span>
          </motion.h2>
          <motion.p initial={{ opacity: 0, y: 10, filter: "blur(4px)" }} whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            viewport={smoothViewport} transition={{ delay: 0.2, duration: 0.6, ease: ease.outQuart }}
            className="text-[var(--text-muted)] max-w-lg mx-auto text-sm">
            {isAr ? "اعتمادات دولية وبرامج تدريب متخصصة تدعم الخبرة العملية." : "Industry-recognized credentials and specialized training programs that back real-world expertise."}
          </motion.p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-5">
          {certifications.map((cert, idx) => (
            <motion.div key={idx} initial={{ opacity: 0, y: 24, filter: "blur(8px)" }} whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              viewport={smoothViewport} transition={{ delay: idx * 0.08, duration: 0.7, ease: ease.outQuart }}>
              <motion.div whileHover={{ y: -4 }} transition={spring.hover}
                className="glass-card glass-card-hover p-5 md:p-6 h-full group" data-cursor-hover>
                <div className="flex items-start justify-between mb-4">
                  <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${cert.color} ${cert.borderColor} border flex items-center justify-center`}>
                    <span className={`text-lg font-black ${cert.accentColor}`}>{cert.name}</span>
                  </div>
                  <div className="flex items-center gap-1.5"><CheckCircle size={12} className="text-emerald-400" />
                    <span className="text-[10px] text-emerald-400 font-medium">{isAr ? "موثق" : "Verified"}</span></div>
                </div>
                <h3 className="text-sm md:text-base font-bold text-[var(--text-heading)] mb-1">{isAr ? cert.full.ar : cert.full.en}</h3>
                <p className="text-xs text-[var(--text-muted)] mb-3">{isAr ? cert.issuer.ar : cert.issuer.en}</p>
                <div className="flex items-center justify-between">
                  <span className={`px-2 py-0.5 rounded-md text-[10px] font-semibold ${cert.accentColor} bg-[var(--bg-card)] border border-[var(--glass-border)]`}>
                    {isAr ? cert.level.ar : cert.level.en}
                  </span>
                  <Award size={14} className="text-[var(--text-muted)] group-hover:text-amber-400 transition-colors duration-400" />
                </div>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}

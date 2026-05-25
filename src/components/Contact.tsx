"use client";

import { motion } from "framer-motion";
import { Send, ArrowUpRight } from "lucide-react";
import { FaLinkedinIn, FaGithub } from "react-icons/fa6";
import { Mail, FileText } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { ease, spring, smoothViewport } from "@/lib/motion";

const socials = [
  { icon: <FaLinkedinIn size={18} />, href: "https://linkedin.com", color: "text-blue-400 hover:bg-blue-500/15 hover:border-blue-500/30" },
  { icon: <FaGithub size={18} />, href: "https://github.com", color: "text-[var(--text-secondary)] hover:bg-purple-500/15 hover:border-purple-500/30" },
  { icon: <Mail size={18} />, href: "mailto:moaaz@example.com", color: "text-emerald-400 hover:bg-emerald-500/15 hover:border-emerald-500/30" },
  { icon: <FileText size={18} />, href: "/Moaaz Mohamed Elghamry - CV .pdf", color: "text-amber-400 hover:bg-amber-500/15 hover:border-amber-500/30" },
];

export default function Contact() {
  const { t } = useLanguage();

  return (
    <section id="contact" className="relative z-10 py-24 md:py-36 px-4 max-w-3xl mx-auto text-center">
      <motion.div
        initial={{ opacity: 0, y: 30, filter: "blur(10px)" }}
        whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
        viewport={smoothViewport}
        transition={{ duration: 0.8, ease: ease.outQuart }}
      >
        <motion.p initial={{ opacity: 0, y: 8, filter: "blur(4px)" }} whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          viewport={smoothViewport} transition={{ delay: 0.1, duration: 0.6, ease: ease.outQuart }}
          className="text-xs tracking-[0.3em] uppercase text-rose-400/80 mb-3 font-medium">{t.contact.eyebrow}</motion.p>

        <motion.h2 initial={{ opacity: 0, y: 14, filter: "blur(6px)" }} whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          viewport={smoothViewport} transition={{ delay: 0.15, duration: 0.7, ease: ease.outQuart }}
          className="text-3xl md:text-5xl lg:text-6xl font-bold text-[var(--text-heading)] mb-5">
          {t.contact.heading}<span className="text-gradient">{t.contact.headingHighlight}</span>
        </motion.h2>

        <motion.p initial={{ opacity: 0, y: 12, filter: "blur(4px)" }} whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          viewport={smoothViewport} transition={{ delay: 0.25, duration: 0.6, ease: ease.outQuart }}
          className="text-[var(--text-muted)] text-sm md:text-base max-w-md mx-auto leading-relaxed mb-8">{t.contact.description}</motion.p>

        <motion.div initial={{ opacity: 0, y: 16, filter: "blur(6px)" }} whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          viewport={smoothViewport} transition={{ delay: 0.35, duration: 0.7, ease: ease.outQuart }}>
          <motion.a href="mailto:moaaz@example.com" whileHover={{ scale: 1.03, y: -2 }} whileTap={{ scale: 0.97 }} transition={spring.hover}
            data-cursor-hover
            className="group inline-flex items-center gap-2.5 px-7 py-3.5 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl text-white font-semibold text-sm relative overflow-hidden">
            <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/[0.06] to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-[900ms] ease-out" />
            <Send size={15} className="relative z-10" />
            <span className="relative z-10">{t.contact.cta}</span>
            <ArrowUpRight size={14} className="relative z-10 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-400" />
          </motion.a>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 14, filter: "blur(6px)" }} whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          viewport={smoothViewport} transition={{ delay: 0.45, duration: 0.7, ease: ease.outQuart }}
          className="flex justify-center gap-3 mt-8">
          {socials.map((social, idx) => (
            <motion.a key={idx} href={social.href}
              target={social.href.startsWith("mailto:") || social.href.startsWith("/") ? undefined : "_blank"}
              rel="noopener noreferrer" whileHover={{ y: -3, scale: 1.05 }} whileTap={{ scale: 0.95 }} transition={spring.hover}
              className={`w-11 h-11 rounded-xl bg-[var(--bg-card)] border border-[var(--glass-border)] flex items-center justify-center transition-all duration-400 ${social.color}`}
              data-cursor-hover aria-label={t.contact.socials[idx]?.label}>
              {social.icon}
            </motion.a>
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
}

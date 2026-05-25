"use client";

import { motion } from "framer-motion";
import { Heart, ArrowUpRight, MapPin, Mail, Code2 } from "lucide-react";
import { FaLinkedinIn, FaGithub } from "react-icons/fa6";
import { useLanguage } from "@/context/LanguageContext";

const quickLinks = [
  { label: { en: "About", ar: "نبذة" }, href: "#about" },
  { label: { en: "Projects", ar: "المشاريع" }, href: "#projects" },
  { label: { en: "Experience", ar: "الخبرات" }, href: "#experience" },
  { label: { en: "Skills", ar: "المهارات" }, href: "#skills" },
  { label: { en: "Contact", ar: "تواصل" }, href: "#contact" },
];

const socials = [
  { icon: <FaLinkedinIn size={14} />, href: "https://linkedin.com", label: "LinkedIn" },
  { icon: <FaGithub size={14} />, href: "https://github.com", label: "GitHub" },
  { icon: <Mail size={14} />, href: "mailto:moaaz@example.com", label: "Email" },
];

export default function Footer() {
  const { locale } = useLanguage();
  const isAr = locale === "ar";

  const scrollToSection = (href: string) => {
    const el = document.getElementById(href.replace("#", ""));
    el?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <footer className="relative z-10 border-t border-[var(--line-color)]">
      <div className="max-w-6xl mx-auto px-4 py-10 md:py-14">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 mb-10">
          {/* Brand */}
          <div>
            <motion.button
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              className="text-2xl font-bold text-gradient mb-3 block"
              data-cursor-hover
            >
              MME
            </motion.button>
            <p className="text-xs text-[var(--text-muted)] leading-relaxed mb-3 max-w-xs">
              {isAr
                ? "مهندس ميكاترونيكس يبني أنظمة أتمتة ذكية عند تقاطع الأجهزة والبرمجيات والذكاء الاصطناعي."
                : "Mechatronics engineer building intelligent automation systems at the intersection of hardware, software, and AI."}
            </p>
            <div className="flex items-center gap-1.5 text-[10px] text-[var(--text-muted)]">
              <MapPin size={10} />
              <span>{isAr ? "مدينة العاشر من رمضان، مصر" : "10th of Ramadan City, Egypt"}</span>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-xs font-semibold tracking-[0.2em] uppercase text-[var(--text-muted)] mb-4">
              {isAr ? "روابط سريعة" : "Quick Links"}
            </h4>
            <div className="space-y-2">
              {quickLinks.map((link, idx) => (
                <button
                  key={idx}
                  onClick={() => scrollToSection(link.href)}
                  className="flex items-center gap-1.5 text-xs text-[var(--text-muted)] hover:text-[var(--text-secondary)] transition-colors group"
                  data-cursor-hover
                >
                  <ArrowUpRight size={10} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                  {isAr ? link.label.ar : link.label.en}
                </button>
              ))}
            </div>
          </div>

          {/* Connect */}
          <div>
            <h4 className="text-xs font-semibold tracking-[0.2em] uppercase text-[var(--text-muted)] mb-4">
              {isAr ? "تواصل" : "Connect"}
            </h4>
            <div className="flex gap-2 mb-4">
              {socials.map((social, idx) => (
                <a
                  key={idx}
                  href={social.href}
                  target={social.href.startsWith("mailto:") ? undefined : "_blank"}
                  rel="noopener noreferrer"
                  className="w-8 h-8 rounded-lg bg-[var(--bg-card)] border border-[var(--glass-border)] flex items-center justify-center text-[var(--text-muted)] hover:text-[var(--text-secondary)] hover:border-purple-500/20 transition-all"
                  data-cursor-hover
                  aria-label={social.label}
                >
                  {social.icon}
                </a>
              ))}
            </div>
            <a
              href="/Moaaz Mohamed Elghamry - CV .pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-xs text-blue-400/80 hover:text-blue-400 transition-colors"
              data-cursor-hover
            >
              <Code2 size={11} />
              {isAr ? "تحميل السيرة الذاتية" : "Download Resume"}
              <ArrowUpRight size={10} />
            </a>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-6 border-t border-[var(--line-color)] flex flex-col md:flex-row items-center justify-between gap-3">
          <p className="text-[10px] text-[var(--text-muted)]">
            © {new Date().getFullYear()} Moaaz Mohamed Elghamry. {isAr ? "جميع الحقوق محفوظة." : "All rights reserved."}
          </p>
          <p className="text-[10px] text-[var(--text-muted)] flex items-center gap-1.5">
            {isAr ? "بُني بـ" : "Built with"}{" "}
            <Heart size={8} className="text-rose-500/60 fill-rose-500/60" />{" "}
            Next.js, Framer Motion & TypeScript
          </p>
        </div>
      </div>
    </footer>
  );
}

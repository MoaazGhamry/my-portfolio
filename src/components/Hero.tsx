"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { ChevronDown, Award, GraduationCap, Trophy, MapPin, Sparkles } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { ease, spring } from "@/lib/motion";
import Image from "next/image";

function useTypewriter(words: string[], typingSpeed = 70, deletingSpeed = 35, pauseTime = 2200) {
  const [displayText, setDisplayText] = useState("");
  const [wordIndex, setWordIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentWord = words[wordIndex];
    const timeout = setTimeout(
      () => {
        if (!isDeleting) {
          setDisplayText(currentWord.substring(0, displayText.length + 1));
          if (displayText === currentWord) setTimeout(() => setIsDeleting(true), pauseTime);
        } else {
          setDisplayText(currentWord.substring(0, displayText.length - 1));
          if (displayText === "") { setIsDeleting(false); setWordIndex((prev) => (prev + 1) % words.length); }
        }
      },
      isDeleting ? deletingSpeed : typingSpeed
    );
    return () => clearTimeout(timeout);
  }, [displayText, wordIndex, isDeleting, words, typingSpeed, deletingSpeed, pauseTime]);

  return displayText;
}

const statIcons = [<GraduationCap key="g" size={14} />, <Award key="a" size={14} />, <Trophy key="t" size={14} />];
const statColors = ["text-blue-400", "text-purple-400", "text-emerald-400"];

// Word-by-word blur-fade reveal
const wordVariants = {
  hidden: { opacity: 0, y: 16, filter: "blur(8px)" },
  visible: (i: number) => ({
    opacity: 1, y: 0, filter: "blur(0px)",
    transition: { delay: 0.35 + i * 0.1, duration: 0.7, ease: ease.outQuart },
  }),
};

export default function Hero() {
  const { t } = useLanguage();
  const typedRole = useTypewriter(t.hero.roles);

  const scrollToProjects = () => document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" });
  const scrollToContact = () => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });

  const nameWords = t.hero.name.split(" ");

  return (
    <section className="relative z-10 flex flex-col items-center justify-center min-h-[100dvh] px-4 text-center pt-16 pb-20">
      <motion.div
        initial={{ opacity: 0, filter: "blur(10px)" }}
        animate={{ opacity: 1, filter: "blur(0px)" }}
        transition={{ duration: 0.8, ease: ease.outQuart }}
        className="max-w-4xl w-full"
      >
        {/* Profile photo + status badge */}
        <motion.div
          initial={{ opacity: 0, scale: 0.92, filter: "blur(8px)" }}
          animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
          transition={{ delay: 0.1, duration: 0.7, ease: ease.outQuart }}
          className="flex flex-col items-center mb-5"
        >
          <div className="relative mb-4">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
              className="absolute -inset-[3px] rounded-full opacity-50"
              style={{ background: "conic-gradient(from 0deg, #3b82f6, #8b5cf6, #06b6d4, #10b981, #3b82f6)", willChange: "transform" }}
            />
            <div className="relative w-24 h-24 md:w-28 md:h-28 rounded-full overflow-hidden border-[3px] border-[var(--bg-primary)]">
              <Image src="/photos/suit-portrait.jpg" alt="Moaaz Mohamed Elghamry" fill className="object-cover object-top" priority sizes="112px" />
            </div>
            <div className="absolute bottom-1 right-1 w-4 h-4 rounded-full bg-emerald-500 border-[2.5px] border-[var(--bg-primary)]" />
          </div>

          <motion.div
            initial={{ opacity: 0, y: 8, filter: "blur(4px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ delay: 0.25, duration: 0.6, ease: ease.outQuart }}
            className="flex items-center gap-1.5 text-[var(--text-muted)] text-xs mb-3"
          >
            <MapPin size={11} />
            <span>10th of Ramadan City, Egypt</span>
          </motion.div>

          <motion.span
            initial={{ opacity: 0, y: 8, filter: "blur(4px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ delay: 0.3, duration: 0.6, ease: ease.outQuart }}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[var(--bg-card)] border border-[var(--glass-border)] text-[11px] md:text-xs text-[var(--text-muted)] tracking-wider uppercase"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            <span className="font-mono min-w-0">
              {typedRole}
              <span className="inline-block w-[1.5px] h-3 bg-[var(--text-muted)] align-middle" style={{ animation: "typewriter-blink 0.8s infinite", marginInlineStart: "1px" }} />
            </span>
          </motion.span>
        </motion.div>

        {/* Name — word-by-word blur-fade */}
        <h1 className="text-[2.5rem] sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-4 tracking-tight leading-[1.15] px-2">
          {nameWords.map((word, i) => (
            <motion.span key={i} custom={i} variants={wordVariants} initial="hidden" animate="visible"
              className="inline-block text-gradient" style={{ marginInlineEnd: "0.25em", willChange: "transform, opacity, filter" }}>
              {word}
            </motion.span>
          ))}
        </h1>

        {/* Tagline */}
        <motion.p
          initial={{ opacity: 0, y: 16, filter: "blur(6px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ delay: 0.75, duration: 0.7, ease: ease.outQuart }}
          className="text-sm sm:text-base md:text-lg text-[var(--text-muted)] font-light mb-7 max-w-xl mx-auto leading-relaxed px-2"
        >
          {t.hero.tagline}{" "}
          <span className="text-[var(--text-secondary)] font-medium">{t.hero.taglineHighlight1}</span>
          {" & "}
          <span className="text-gradient-secondary font-medium">{t.hero.taglineHighlight2}</span>.
        </motion.p>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 16, filter: "blur(6px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ delay: 0.9, duration: 0.7, ease: ease.outQuart }}
          className="flex flex-wrap justify-center gap-2 md:gap-3 mb-8 px-2"
        >
          {t.hero.stats.map((stat, idx) => (
            <motion.div key={idx}
              initial={{ opacity: 0, scale: 0.9, filter: "blur(4px)" }}
              animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
              transition={{ delay: 1 + idx * 0.08, duration: 0.5, ease: ease.outQuart }}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[var(--bg-card)] border border-[var(--glass-border)]"
            >
              <span className={statColors[idx]}>{statIcons[idx]}</span>
              <span className="text-[11px] font-medium text-[var(--text-secondary)]">{stat.label}</span>
            </motion.div>
          ))}
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 16, filter: "blur(6px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ delay: 1.2, duration: 0.7, ease: ease.outQuart }}
          className="flex flex-col sm:flex-row gap-3 justify-center px-4"
        >
          <motion.button whileHover={{ scale: 1.02, y: -1 }} whileTap={{ scale: 0.98 }} transition={spring.hover}
            onClick={scrollToProjects} data-cursor-hover
            className="group relative px-6 py-3 rounded-xl font-medium text-white text-sm overflow-hidden">
            <span className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600" />
            <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/[0.06] to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-[800ms] ease-out" />
            <span className="relative z-10 flex items-center justify-center gap-2"><Sparkles size={14} />{t.hero.exploreBtn}</span>
          </motion.button>
          <motion.button whileHover={{ scale: 1.02, y: -1 }} whileTap={{ scale: 0.98 }} transition={spring.hover}
            onClick={scrollToContact} data-cursor-hover
            className="px-6 py-3 rounded-xl font-medium text-sm text-[var(--text-secondary)] bg-[var(--bg-card)] border border-[var(--glass-border)] hover:bg-[var(--bg-card-hover)] transition-all duration-400">
            {t.hero.contactBtn}
          </motion.button>
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2.2, duration: 0.8 }}
        className="absolute bottom-4 left-1/2 -translate-x-1/2">
        <motion.button onClick={() => document.getElementById("about")?.scrollIntoView({ behavior: "smooth" })}
          animate={{ y: [0, 5, 0] }} transition={{ duration: 2.8, repeat: Infinity, ease: "easeInOut" }}
          className="flex flex-col items-center gap-1 text-[var(--text-muted)] hover:text-[var(--text-secondary)] transition-colors duration-300" data-cursor-hover>
          <span className="text-[9px] tracking-[0.2em] uppercase">{t.hero.scroll}</span>
          <ChevronDown size={12} />
        </motion.button>
      </motion.div>
    </section>
  );
}

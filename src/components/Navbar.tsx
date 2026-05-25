"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Download, Sun, Moon, Languages } from "lucide-react";
import { useTheme } from "@/context/ThemeContext";
import { useLanguage } from "@/context/LanguageContext";

export default function Navbar() {
  const { theme, toggleTheme } = useTheme();
  const { t, toggleLocale, isRTL } = useLanguage();

  const navItems = [
    { label: t.nav.about, href: "#about" },
    { label: t.nav.projects, href: "#projects" },
    { label: t.nav.experience, href: "#experience" },
    { label: t.nav.skills, href: "#skills" },
    { label: t.nav.contact, href: "#contact" },
  ];

  const [isScrolled, setIsScrolled] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isVisible, setIsVisible] = useState(true);
  const [activeSection, setActiveSection] = useState("");
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setIsScrolled(currentScrollY > 50);
      if (currentScrollY > lastScrollY && currentScrollY > 200) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }
      setLastScrollY(currentScrollY);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveSection(entry.target.id);
        });
      },
      { rootMargin: "-40% 0px -55% 0px" }
    );
    const sections = document.querySelectorAll("section[id]");
    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  const scrollToSection = (href: string) => {
    setIsMobileOpen(false);
    const el = document.getElementById(href.replace("#", ""));
    el?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: isVisible ? 0 : -100, opacity: isVisible ? 1 : 0 }}
        transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
        className={`fixed top-0 left-0 right-0 z-[90] transition-all duration-500 ${isScrolled ? "py-2" : "py-4"}`}
      >
        <div
          className={`max-w-5xl mx-auto px-4 md:px-6 transition-all duration-500 ${
            isScrolled
              ? "bg-[var(--bg-navbar)] backdrop-blur-xl border-b border-purple-500/40 rounded-2xl shadow-[0_4px_30px_rgba(139,92,246,0.2)] mx-3 md:mx-auto"
              : ""
          }`}
        >
          <div className="flex items-center justify-between h-12 md:h-14">
            {/* Logo */}
            <motion.button
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              className="relative group"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              data-cursor-hover
            >
              <span className="text-lg md:text-xl font-bold text-gradient">MME</span>
            </motion.button>

            {/* Desktop Links */}
            <div className="hidden lg:flex items-center gap-0.5">
              {navItems.map((item) => (
                <button
                  key={item.href}
                  onClick={() => scrollToSection(item.href)}
                  data-cursor-hover
                  className={`relative px-3 py-1.5 text-sm font-medium transition-colors rounded-xl ${
                    activeSection === item.href.replace("#", "")
                      ? "text-[var(--text-heading)]"
                      : "text-[var(--text-muted)] hover:text-[var(--text-secondary)]"
                  }`}
                >
                  {activeSection === item.href.replace("#", "") && (
                    <motion.span
                      layoutId="activeNav"
                      className="absolute inset-0 bg-[var(--bg-card)] rounded-xl border border-[var(--glass-border)]"
                      transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    />
                  )}
                  <span className="relative z-10">{item.label}</span>
                </button>
              ))}
            </div>

            {/* Right side controls */}
            <div className="flex items-center gap-1.5 md:gap-2">
              {/* Language toggle */}
              <motion.button
                onClick={toggleLocale}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                data-cursor-hover
                className="p-2 rounded-xl text-[var(--text-muted)] hover:text-[var(--text-secondary)] hover:bg-[var(--bg-card)] transition-all text-xs font-semibold"
                title="Switch Language"
              >
                <Languages size={16} />
              </motion.button>

              {/* Theme toggle */}
              <motion.button
                onClick={toggleTheme}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                data-cursor-hover
                className="p-2 rounded-xl text-[var(--text-muted)] hover:text-[var(--text-secondary)] hover:bg-[var(--bg-card)] transition-all"
                title={theme === "dark" ? "Light Mode" : "Dark Mode"}
              >
                {theme === "dark" ? <Sun size={16} /> : <Moon size={16} />}
              </motion.button>

              {/* CV Download */}
              <motion.a
                href="/Moaaz Mohamed Elghamry - CV .pdf"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                data-cursor-hover
                className="hidden md:flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-[var(--text-heading)] bg-gradient-to-r from-blue-600/20 to-purple-600/20 border border-blue-500/30 rounded-xl hover:border-blue-500/50 transition-all"
              >
                <Download size={12} />
                <span>{t.nav.cv}</span>
              </motion.a>

              {/* Mobile toggle */}
              <button
                onClick={() => setIsMobileOpen(!isMobileOpen)}
                className="lg:hidden p-2 text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors"
                data-cursor-hover
              >
                {isMobileOpen ? <X size={20} /> : <Menu size={20} />}
              </button>
            </div>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-[85] bg-[var(--bg-overlay)] backdrop-blur-2xl pt-20 px-6"
          >
            <div className="flex flex-col gap-1">
              {navItems.map((item, idx) => (
                <motion.button
                  key={item.href}
                  initial={{ opacity: 0, x: isRTL ? 20 : -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.04 }}
                  onClick={() => scrollToSection(item.href)}
                  className={`text-${isRTL ? "right" : "left"} text-xl font-medium py-4 border-b border-[var(--line-color)] transition-colors ${
                    activeSection === item.href.replace("#", "")
                      ? "text-[var(--text-heading)]"
                      : "text-[var(--text-muted)]"
                  }`}
                >
                  <span className="text-xs text-[var(--text-muted)] font-mono mx-3">
                    0{idx + 1}
                  </span>
                  {item.label}
                </motion.button>
              ))}
              <motion.a
                initial={{ opacity: 0, x: isRTL ? 20 : -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: navItems.length * 0.04 }}
                href="/Moaaz Mohamed Elghamry - CV .pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 text-xl font-medium py-4 text-blue-400"
              >
                <Download size={18} />
                {t.nav.cv}
              </motion.a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

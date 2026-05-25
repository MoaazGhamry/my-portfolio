"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { type Locale, translations, type Translations } from "@/i18n/translations";

interface LanguageContextType {
  locale: Locale;
  t: Translations;
  toggleLocale: () => void;
  isRTL: boolean;
}

const LanguageContext = createContext<LanguageContextType>({
  locale: "en",
  t: translations.en,
  toggleLocale: () => {},
  isRTL: false,
});

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [locale, setLocale] = useState<Locale>("en");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem("portfolio-locale") as Locale | null;
    if (stored && (stored === "en" || stored === "ar")) {
      setLocale(stored);
    }
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;
    const root = document.documentElement;
    root.setAttribute("lang", locale);
    root.setAttribute("dir", locale === "ar" ? "rtl" : "ltr");
    localStorage.setItem("portfolio-locale", locale);
  }, [locale, mounted]);

  const toggleLocale = () => {
    setLocale((prev) => (prev === "en" ? "ar" : "en"));
  };

  const t = translations[locale];
  const isRTL = locale === "ar";

  if (!mounted) {
    return <div style={{ visibility: "hidden" }}>{children}</div>;
  }

  return (
    <LanguageContext.Provider value={{ locale, t, toggleLocale, isRTL }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  return useContext(LanguageContext);
}

"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useLanguage } from "@/context/LanguageContext";
import { Camera } from "lucide-react";
import { ease, spring, smoothViewport } from "@/lib/motion";

const photos = [
  { src: "/photos/cortex-exhibition.jpg", caption: { en: "Cortex Team — Traffic Management System Exhibition", ar: "فريق كورتكس — معرض نظام إدارة المرور" }, tag: { en: "Exhibition", ar: "معرض" } },
  { src: "/photos/professional-badge.jpg", caption: { en: "At the Engineering Conference — Representing the Team", ar: "في المؤتمر الهندسي — تمثيل الفريق" }, tag: { en: "Conference", ar: "مؤتمر" } },
  { src: "/photos/suit-portrait.jpg", caption: { en: "Professional Portrait — Ready for the Industry", ar: "صورة مهنية — جاهز للصناعة" }, tag: { en: "Portrait", ar: "صورة شخصية" } },
];

export default function PhotoGallery() {
  const { locale } = useLanguage();
  const isAr = locale === "ar";

  return (
    <section className="relative z-10 py-16 md:py-24 px-4 max-w-6xl mx-auto">
      <motion.div initial={{ opacity: 0, y: 24, filter: "blur(8px)" }} whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
        viewport={smoothViewport} transition={{ duration: 0.7, ease: ease.outQuart }}>
        <div className="flex items-center gap-3 mb-8">
          <Camera size={16} className="text-[var(--text-muted)]" />
          <h3 className="text-xs font-semibold tracking-[0.25em] uppercase text-[var(--text-muted)]">{isAr ? "لقطات" : "Snapshots"}</h3>
          <div className="h-px flex-1 bg-[var(--line-color)]" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-4">
          {photos.map((photo, idx) => (
            <motion.div key={idx}
              initial={{ opacity: 0, y: 20, filter: "blur(8px)" }}
              whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              viewport={smoothViewport}
              transition={{ delay: idx * 0.1, duration: 0.7, ease: ease.outQuart }}
              className="group relative">
              <motion.div whileHover={{ y: -4 }} transition={spring.hover}
                className="relative rounded-2xl overflow-hidden border border-[var(--glass-border)] aspect-[4/5]" data-cursor-hover>
                <Image src={photo.src} alt={isAr ? photo.caption.ar : photo.caption.en} fill
                  className="object-cover object-top group-hover:scale-[1.03] transition-transform duration-[800ms] ease-out" sizes="(max-width: 768px) 100vw, 33vw" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 ease-out">
                  <span className="inline-block px-2 py-0.5 rounded-md bg-white/15 backdrop-blur-sm text-[10px] text-white/80 font-medium mb-1.5">{isAr ? photo.tag.ar : photo.tag.en}</span>
                  <p className="text-xs text-white/90 font-medium leading-relaxed">{isAr ? photo.caption.ar : photo.caption.en}</p>
                </div>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}

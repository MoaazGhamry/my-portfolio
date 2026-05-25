"use client";

import { motion } from "framer-motion";

export default function SectionDivider() {
  return (
    <div className="relative flex items-center justify-center py-2">
      <motion.div
        initial={{ scaleX: 0, opacity: 0 }}
        whileInView={{ scaleX: 1, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        className="w-full max-w-[120px] h-px origin-center"
        style={{
          background: "linear-gradient(90deg, transparent, rgba(139, 92, 246, 0.2), transparent)",
        }}
      />
    </div>
  );
}

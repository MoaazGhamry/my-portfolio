"use client";

import { motion, useScroll, useSpring } from "framer-motion";

export default function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 60,
    damping: 20,
    mass: 0.5,
    restDelta: 0.0005,
  });

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-[1.5px] z-[100] origin-left"
      style={{
        scaleX,
        background: "linear-gradient(90deg, #3b82f6, #8b5cf6, #06b6d4)",
        willChange: "transform",
      }}
    />
  );
}

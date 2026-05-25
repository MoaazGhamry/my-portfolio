"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export default function CustomCursor() {
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  const [isHovering, setIsHovering] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isTouch, setIsTouch] = useState(false);

  // Buttery smooth spring — tuned for 144hz
  const springConfig = { damping: 28, stiffness: 350, mass: 0.25, restDelta: 0.001 };
  const ringX = useSpring(cursorX, springConfig);
  const ringY = useSpring(cursorY, springConfig);

  useEffect(() => {
    const isTouchDevice = "ontouchstart" in window || navigator.maxTouchPoints > 0;
    if (isTouchDevice) { setIsTouch(true); return; }

    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
      if (!isVisible) setIsVisible(true);
    };

    const addHoverListeners = () => {
      document.querySelectorAll('a, button, [data-cursor-hover], input, textarea, [role="button"]')
        .forEach((el) => {
          el.addEventListener("mouseenter", () => setIsHovering(true));
          el.addEventListener("mouseleave", () => setIsHovering(false));
        });
    };

    window.addEventListener("mousemove", moveCursor, { passive: true });
    document.addEventListener("mouseenter", () => setIsVisible(true));
    document.addEventListener("mouseleave", () => setIsVisible(false));
    addHoverListeners();

    const observer = new MutationObserver(addHoverListeners);
    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      window.removeEventListener("mousemove", moveCursor);
      observer.disconnect();
    };
  }, [cursorX, cursorY, isVisible]);

  if (isTouch) return null;

  return (
    <>
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9999] mix-blend-difference"
        style={{ x: cursorX, y: cursorY, translateX: "-50%", translateY: "-50%", willChange: "transform" }}
      >
        <motion.div
          animate={{ width: isHovering ? 8 : 4, height: isHovering ? 8 : 4, opacity: isVisible ? 1 : 0 }}
          transition={{ duration: 0.15, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="rounded-full bg-white"
        />
      </motion.div>
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9998] mix-blend-difference"
        style={{ x: ringX, y: ringY, translateX: "-50%", translateY: "-50%", willChange: "transform" }}
      >
        <motion.div
          animate={{ width: isHovering ? 40 : 24, height: isHovering ? 40 : 24, opacity: isVisible ? 0.6 : 0 }}
          transition={{ duration: 0.2, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="rounded-full border border-white/40"
        />
      </motion.div>
    </>
  );
}

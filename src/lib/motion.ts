import type { Transition, Variants } from "framer-motion";

/* ──────────────────────────────────────────────
   Shared Motion Config — Buttery Smooth @ 144hz
   ────────────────────────────────────────────── */

// Easing curves optimized for 144hz smoothness
export const ease = {
  outQuart: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number],
  outExpo: [0.16, 1, 0.3, 1] as [number, number, number, number],
  outCubic: [0.33, 1, 0.68, 1] as [number, number, number, number],
  inOutQuart: [0.76, 0, 0.24, 1] as [number, number, number, number],
};

// Spring configs
export const spring = {
  gentle: { type: "spring" as const, stiffness: 120, damping: 20, mass: 0.8 },
  smooth: { type: "spring" as const, stiffness: 100, damping: 22, mass: 1 },
  snappy: { type: "spring" as const, stiffness: 200, damping: 25, mass: 0.5 },
  hover: { type: "spring" as const, stiffness: 150, damping: 18, mass: 0.6 },
};

// Blur-fade-up entrance (the signature smooth entrance)
export const blurFadeUp: Variants = {
  hidden: { opacity: 0, y: 24, filter: "blur(8px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.7, ease: ease.outQuart },
  },
};

// Blur-fade-up with custom delay
export function blurFadeUpDelay(delay: number): Variants {
  return {
    hidden: { opacity: 0, y: 20, filter: "blur(6px)" },
    visible: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: { duration: 0.65, delay, ease: ease.outQuart },
    },
  };
}

// Simple blur-fade (no Y movement)
export const blurFade: Variants = {
  hidden: { opacity: 0, filter: "blur(6px)" },
  visible: {
    opacity: 1,
    filter: "blur(0px)",
    transition: { duration: 0.6, ease: ease.outCubic },
  },
};

// Scale-blur entrance
export function scaleBlur(delay = 0): Variants {
  return {
    hidden: { opacity: 0, scale: 0.95, filter: "blur(6px)" },
    visible: {
      opacity: 1,
      scale: 1,
      filter: "blur(0px)",
      transition: { duration: 0.6, delay, ease: ease.outQuart },
    },
  };
}

// Stagger container
export function staggerContainer(staggerChildren = 0.06, delayChildren = 0): Variants {
  return {
    hidden: {},
    visible: {
      transition: { staggerChildren, delayChildren },
    },
  };
}

// Stagger item (for use inside stagger container)
export const staggerItem: Variants = {
  hidden: { opacity: 0, y: 16, filter: "blur(6px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.55, ease: ease.outQuart },
  },
};

// Smooth section entrance transition
export const sectionTransition: Transition = {
  duration: 0.75,
  ease: ease.outQuart,
};

// Viewport config for smooth triggering
export const smoothViewport = {
  once: true,
  margin: "-60px" as const,
};

// Hover lift (for cards)
export const hoverLift = {
  y: -4,
  transition: spring.hover,
};

// Tap scale
export const tapScale = { scale: 0.97 };

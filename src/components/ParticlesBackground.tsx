"use client";

import { useEffect, useRef } from "react";
import { useTheme } from "@/context/ThemeContext";

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  opacity: number;
}

export default function ParticlesBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { theme } = useTheme();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationId: number;
    let particles: Particle[] = [];
    let mouseX = -1000;
    let mouseY = -1000;

    const isDark = theme === "dark";

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    const createParticles = () => {
      // Reduce particle count significantly to improve scroll performance
      const count = Math.min(Math.floor((canvas.width * canvas.height) / 25000), 35);
      particles = [];
      for (let i = 0; i < count; i++) {
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          vx: (Math.random() - 0.5) * 0.2,
          vy: (Math.random() - 0.5) * 0.2,
          size: Math.random() * 1.5 + 0.5,
          opacity: Math.random() * 0.25 + 0.05,
        });
      }
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      // Reduce connection distance to minimize O(n^2) line drawing operations
      const connectionDist = 100;
      const pColor = isDark ? "255,255,255" : "80,80,120";
      const lColor = isDark ? "139,92,246" : "99,102,241";

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        p.x += p.vx;
        p.y += p.vy;

        const dx = p.x - mouseX;
        const dy = p.y - mouseY;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 100) {
          const force = (100 - dist) / 100;
          p.vx += (dx / dist) * force * 0.015;
          p.vy += (dy / dist) * force * 0.015;
        }

        p.vx *= 0.999;
        p.vy *= 0.999;

        if (p.x < 0) p.x = canvas.width;
        if (p.x > canvas.width) p.x = 0;
        if (p.y < 0) p.y = canvas.height;
        if (p.y > canvas.height) p.y = 0;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${pColor},${p.opacity})`;
        ctx.fill();

        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const cdx = p.x - p2.x;
          const cdy = p.y - p2.y;
          const cdist = Math.sqrt(cdx * cdx + cdy * cdy);
          if (cdist < connectionDist) {
            const opacity = (1 - cdist / connectionDist) * 0.12;
            ctx.beginPath();
            ctx.strokeStyle = `rgba(${lColor},${opacity})`;
            ctx.lineWidth = 0.4;
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.stroke();
          }
        }
      }
      animationId = requestAnimationFrame(animate);
    };

    const handleMouseMove = (e: MouseEvent) => { mouseX = e.clientX; mouseY = e.clientY; };
    const handleMouseLeave = () => { mouseX = -1000; mouseY = -1000; };

    resize();
    createParticles();
    animate();

    window.addEventListener("resize", () => { resize(); createParticles(); });
    window.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [theme]);

  const isDark = theme === "dark";

  return (
    <div className="fixed inset-0 z-0 pointer-events-none">
      <div className="absolute inset-0" style={{ background: "var(--bg-primary)" }} />

      {/* Mesh gradient orbs */}
      <div className="absolute inset-0 overflow-hidden">
        <div
          className="absolute w-[400px] h-[400px] md:w-[500px] md:h-[500px] rounded-full blur-[80px]"
          style={{
            background: `radial-gradient(circle, ${isDark ? "rgba(59,130,246,0.3)" : "rgba(99,102,241,0.15)"}, transparent 70%)`,
            top: "10%", left: "15%",
            animation: "mesh-drift 25s ease-in-out infinite",
            opacity: isDark ? 0.18 : 0.4,
            willChange: "transform",
          }}
        />
        <div
          className="absolute w-[400px] h-[400px] md:w-[600px] md:h-[600px] rounded-full blur-[100px]"
          style={{
            background: `radial-gradient(circle, ${isDark ? "rgba(139,92,246,0.3)" : "rgba(139,92,246,0.12)"}, transparent 70%)`,
            top: "50%", right: "10%",
            animation: "mesh-drift 30s ease-in-out infinite reverse",
            opacity: isDark ? 0.13 : 0.3,
            willChange: "transform",
          }}
        />
        <div
          className="absolute w-[300px] h-[300px] md:w-[400px] md:h-[400px] rounded-full blur-[70px]"
          style={{
            background: `radial-gradient(circle, ${isDark ? "rgba(6,182,212,0.3)" : "rgba(6,182,212,0.1)"}, transparent 70%)`,
            bottom: "10%", left: "40%",
            animation: "mesh-drift 20s ease-in-out infinite 5s",
            opacity: isDark ? 0.1 : 0.25,
            willChange: "transform",
          }}
        />
      </div>

      <div className="absolute inset-0 dot-pattern opacity-30 pointer-events-none" />
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" style={{ pointerEvents: "auto", willChange: "transform" }} />
      <div className="absolute inset-0 noise-overlay pointer-events-none" />
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: `radial-gradient(ellipse at center, transparent 50%, var(--vignette) 100%)` }}
      />
    </div>
  );
}

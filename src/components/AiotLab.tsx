"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Play, Square, Activity, Cpu, ShieldAlert, Thermometer, Zap, AlertTriangle, RefreshCw } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { ease, spring } from "@/lib/motion";

export default function AiotLab() {
  const { t, isRTL } = useLanguage();

  // Control State
  const [power, setPower] = useState(false);
  const [speed, setSpeed] = useState(800); // RPM
  const [boxCount, setBoxCount] = useState(0);
  const [sensorTriggered, setSensorTriggered] = useState(false);
  const [systemState, setSystemState] = useState<"nominal" | "throttled" | "cooling">("nominal");

  // Telemetry arrays for line graphs (stores last 20 ticks)
  const [tempHistory, setTempHistory] = useState<number[]>(Array(20).fill(30));
  const [vibHistory, setVibHistory] = useState<number[]>(Array(20).fill(1));
  const [powerHistory, setPowerHistory] = useState<number[]>(Array(20).fill(5));

  // Visual Box Animation Position (0 to 100 percent)
  const [boxPos, setBoxPos] = useState(0);
  const [isPistonActive, setIsPistonActive] = useState(false);

  // Terminal Console Logs
  const [logs, setLogs] = useState<string[]>([]);
  const terminalEndRef = useRef<HTMLDivElement>(null);

  // Temperature control variables
  const currentTemp = tempHistory[tempHistory.length - 1];
  const currentVib = vibHistory[vibHistory.length - 1];
  const currentPower = powerHistory[powerHistory.length - 1];

  // Helper to add console log
  const addLog = (text: string) => {
    const time = new Date().toLocaleTimeString("en-US", { hour12: false });
    setLogs((prev) => [...prev.slice(-40), `[${time}] ${text}`]);
  };

  // Scroll logs window
  useEffect(() => {
    terminalEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [logs]);

  // Initial boot sequence
  useEffect(() => {
    addLog(t.aiotLab.logs.boot);
    addLog(t.aiotLab.logs.sensorCalib);
  }, []);

  // System Core Simulation Loop
  useEffect(() => {
    if (!power) {
      setBoxPos(0);
      setSensorTriggered(false);
      setIsPistonActive(false);
      return;
    }

    const interval = setInterval(() => {
      // Calculate dynamic variables based on speed
      let targetTemp = 30 + (speed / 2000) * 65; // speed increases temp
      let targetVib = 1 + (speed / 2000) * 8 + (Math.random() - 0.5) * 0.8;
      let targetPower = 5 + Math.pow(speed / 2000, 2.5) * 85;

      // Handle safety state machines
      setSystemState((prev) => {
        if (prev === "cooling") {
          // In cooling cycle, drop temp quickly and lock speed
          if (currentTemp <= 45) {
            addLog(t.aiotLab.logs.coolResolved);
            return "nominal";
          }
          return "cooling";
        }

        if (currentTemp >= 82) {
          if (prev !== "throttled") {
            addLog(t.aiotLab.logs.warningTemp);
            addLog(t.aiotLab.logs.coolActive);
          }
          return "cooling";
        }

        if (currentTemp >= 70) {
          return "throttled";
        }

        return "nominal";
      });

      // Adjust speed targets if safety limits active
      let activeSpeed = speed;
      if (systemState === "cooling") {
        activeSpeed = 300; // Locked cooling speed
        targetTemp = currentTemp - 4.5; // Cool down
        targetVib = 1.2 + (Math.random() - 0.5) * 0.2;
        targetPower = 12;
      } else if (systemState === "throttled") {
        activeSpeed = Math.min(speed, 1000); // Throttled maximum
        targetTemp = currentTemp + (30 + (activeSpeed / 2000) * 65 - currentTemp) * 0.15;
      } else {
        // Normal heating toward target
        targetTemp = currentTemp + (targetTemp - currentTemp) * 0.08;
      }

      // Add noise and update telemetry hooks
      setTempHistory((prev) => [...prev.slice(1), parseFloat(targetTemp.toFixed(1))]);
      setVibHistory((prev) => [...prev.slice(1), parseFloat(Math.max(0.1, targetVib).toFixed(2))]);
      setPowerHistory((prev) => [...prev.slice(1), parseFloat(targetPower.toFixed(1))]);

      // Move the box down the conveyor belt
      // Movement speed depends directly on the conveyor RPM
      setBoxPos((prev) => {
        const step = (activeSpeed / 1000) * 4;
        const nextPos = prev + step;

        // Laser Sensor Trigger (Beam sits around 60% of belt length)
        const sensorX = 60;
        if (prev < sensorX && nextPos >= sensorX) {
          setSensorTriggered(true);
          setIsPistonActive(true);
          setBoxCount((c) => c + 1);
          addLog(t.aiotLab.logs.boxDetected);
          setTimeout(() => setIsPistonActive(false), 250);
        }

        if (nextPos >= 100) {
          setSensorTriggered(false);
          return 0; // Recycle box back to start
        }

        return nextPos;
      });

    }, 100);

    return () => clearInterval(interval);
  }, [power, speed, currentTemp, systemState, t]);

  // Generates SVG chart paths from coordinates
  const generateSvgPath = (history: number[], minVal: number, maxVal: number) => {
    const width = 280;
    const height = 60;
    const points = history.map((val, idx) => {
      const x = (idx / (history.length - 1)) * width;
      const range = maxVal - minVal;
      const y = height - ((val - minVal) / (range || 1)) * height;
      return `${x},${y}`;
    });
    return `M ${points.join(" L ")}`;
  };

  return (
    <section id="aiot-lab" className="relative z-10 py-20 md:py-32 px-4 max-w-6xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 30, filter: "blur(10px)" }}
        whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8, ease: ease.outQuart }}
        className="w-full"
      >
        {/* Header */}
        <div className="text-center mb-12">
          <p className="text-xs tracking-[0.3em] uppercase text-blue-400/80 mb-2 font-medium">
            {t.aiotLab.eyebrow}
          </p>
          <h2 className="text-2xl md:text-4xl lg:text-5xl font-bold text-[var(--text-heading)] mb-3">
            {t.aiotLab.heading}
            <span className="text-gradient-secondary">{t.aiotLab.headingHighlight}</span>
          </h2>
          <p className="text-[var(--text-muted)] max-w-lg mx-auto text-sm md:text-base">
            {t.aiotLab.subtitle}
          </p>
        </div>

        {/* Dashboard Frame */}
        <div className="glass-card p-6 md:p-8 grid grid-cols-1 lg:grid-cols-12 gap-6 relative overflow-hidden noise-overlay">
          {/* Neon safety indicators */}
          <div className="absolute top-0 left-0 right-0 h-[2px] flex">
            <div className={`h-full flex-1 transition-colors duration-500 ${power ? (systemState === "cooling" ? "bg-red-500" : systemState === "throttled" ? "bg-amber-500" : "bg-blue-500") : "bg-neutral-800"}`} />
          </div>

          {/* LEFT PANEL: HMI Controllers (4 cols) */}
          <div className="lg:col-span-4 flex flex-col gap-6 justify-between border-b lg:border-b-0 lg:border-e border-[var(--line-color)] pb-6 lg:pb-0 lg:pe-6">
            <div className="space-y-6">
              {/* Device Power */}
              <div>
                <h3 className="text-xs font-semibold uppercase tracking-wider text-[var(--text-secondary)] mb-3 flex items-center gap-2">
                  <Cpu size={14} className="text-purple-400" />
                  {t.aiotLab.power}
                </h3>
                <div className="flex gap-2">
                  <motion.button
                    whileTap={{ scale: 0.96 }}
                    onClick={() => {
                      setPower(true);
                      addLog("Master Power Signal: ON. Telemetry modules activating.");
                    }}
                    className={`flex-1 py-2.5 rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 transition-all duration-300 ${
                      power && systemState !== "cooling"
                        ? "bg-blue-600 text-white shadow-lg shadow-blue-500/25"
                        : "bg-[var(--bg-card)] border border-[var(--glass-border)] text-[var(--text-secondary)] hover:text-white"
                    }`}
                    data-cursor-hover
                  >
                    <Play size={12} fill={power && systemState !== "cooling" ? "currentColor" : "none"} />
                    START
                  </motion.button>
                  <motion.button
                    whileTap={{ scale: 0.96 }}
                    onClick={() => {
                      setPower(false);
                      setSystemState("nominal");
                      addLog("Master Power Signal: OFF. All actuators deactivated.");
                    }}
                    className={`flex-1 py-2.5 rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 transition-all duration-300 ${
                      !power
                        ? "bg-red-600 text-white shadow-lg shadow-red-500/25"
                        : "bg-[var(--bg-card)] border border-[var(--glass-border)] text-[var(--text-secondary)] hover:text-white"
                    }`}
                    data-cursor-hover
                  >
                    <Square size={12} fill={!power ? "currentColor" : "none"} />
                    STOP
                  </motion.button>
                </div>
              </div>

              {/* Speed Controller */}
              <div className={!power || systemState === "cooling" ? "opacity-40 pointer-events-none transition-opacity duration-300" : "transition-opacity duration-300"}>
                <div className="flex justify-between items-center mb-2">
                  <h3 className="text-xs font-semibold uppercase tracking-wider text-[var(--text-secondary)]">
                    {t.aiotLab.speed}
                  </h3>
                  <span className="font-mono text-xs text-blue-400 font-bold tabular-nums">
                    {systemState === "cooling" ? 300 : speed}
                  </span>
                </div>
                <input
                  type="range"
                  min="200"
                  max="2000"
                  step="50"
                  value={speed}
                  onChange={(e) => {
                    const newSpeed = parseInt(e.target.value);
                    setSpeed(newSpeed);
                    addLog(`Conveyor speed command updated to: ${newSpeed} RPM`);
                  }}
                  className="w-full h-1.5 rounded-lg bg-[var(--bg-card)] appearance-none cursor-pointer accent-blue-500 border border-[var(--glass-border)]"
                  data-cursor-hover
                />
                <div className="flex justify-between text-[9px] text-[var(--text-muted)] mt-1">
                  <span>MIN (200)</span>
                  <span>MAX (2000)</span>
                </div>
              </div>

              {/* Simulation Status widgets */}
              <div className="grid grid-cols-2 gap-3">
                <div className="p-3.5 rounded-xl bg-[var(--bg-card)] border border-[var(--glass-border)]">
                  <div className="text-[10px] text-[var(--text-muted)] uppercase tracking-wider mb-1">
                    {t.aiotLab.boxCount}
                  </div>
                  <div className="text-xl font-bold font-mono text-[var(--text-heading)] tabular-nums">
                    {boxCount}
                  </div>
                </div>
                <div className="p-3.5 rounded-xl bg-[var(--bg-card)] border border-[var(--glass-border)] flex flex-col justify-between">
                  <span className="text-[10px] text-[var(--text-muted)] uppercase tracking-wider">
                    SYSTEM STATUS
                  </span>
                  <div className="flex items-center gap-1.5 mt-2">
                    <span className={`w-2 h-2 rounded-full ${
                      !power
                        ? "bg-neutral-600"
                        : systemState === "cooling"
                        ? "bg-red-500 animate-ping"
                        : systemState === "throttled"
                        ? "bg-amber-500 animate-pulse"
                        : "bg-emerald-400 animate-pulse"
                    }`} />
                    <span className="text-[10px] font-mono font-bold tracking-tight text-[var(--text-secondary)]">
                      {!power
                        ? "INACTIVE"
                        : systemState === "cooling"
                        ? t.aiotLab.stateCooling
                        : systemState === "throttled"
                        ? t.aiotLab.stateThrottled
                        : t.aiotLab.stateNormal}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Micro-Controller Board graphic */}
            <div className="hidden lg:block pt-6 border-t border-[var(--line-color)]">
              <div className="flex items-center gap-3 text-xs text-[var(--text-muted)] font-mono">
                <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                <span>IOT-GATEWAY-V3.9 // ONLINE</span>
              </div>
            </div>
          </div>

          {/* MIDDLE PANEL: Visual Conveyor & Telemetry (5 cols) */}
          <div className="lg:col-span-5 flex flex-col gap-6 justify-between">
            {/* Realtime Conveyor Belt Graphic */}
            <div className="p-4 rounded-2xl bg-[var(--bg-card)] border border-[var(--glass-border)] flex flex-col gap-3 relative overflow-hidden">
              <div className="flex justify-between items-center mb-1">
                <span className="text-[10px] uppercase font-bold tracking-wider text-[var(--text-muted)]">
                  {t.aiotLab.sensorStatus}
                </span>
                <span className={`text-[9px] font-mono font-semibold px-2 py-0.5 rounded ${
                  sensorTriggered
                    ? "bg-red-500/10 border border-red-500/20 text-red-400"
                    : "bg-emerald-500/10 border border-emerald-500/20 text-emerald-400"
                }`}>
                  {sensorTriggered ? t.aiotLab.sensorTriggered : t.aiotLab.sensorClear}
                </span>
              </div>

              {/* Animated Conveyor SVG */}
              <div className="relative h-20 bg-black/40 rounded-xl border border-[var(--glass-border)] flex items-center overflow-hidden">
                {/* Rolling Belt Lines */}
                <div
                  className="absolute inset-x-0 bottom-3 h-2 bg-neutral-800 flex justify-around overflow-hidden"
                  style={{ opacity: power ? 1 : 0.4 }}
                >
                  {Array(16)
                    .fill(0)
                    .map((_, i) => (
                      <motion.div
                        key={i}
                        animate={
                          power
                            ? {
                                x: isRTL
                                  ? [-10, 10]
                                  : [10, -10],
                              }
                            : {}
                        }
                        transition={{
                          repeat: Infinity,
                          duration: systemState === "cooling" ? 1.5 : Math.max(0.2, 2.2 - (speed / 2000) * 2),
                          ease: "linear",
                        }}
                        className="w-1 h-full bg-neutral-600 shrink-0"
                      />
                    ))}
                </div>

                {/* Laser sensor line */}
                <div className="absolute left-[60%] inset-y-0 w-[2px] flex flex-col items-center justify-between">
                  <div className="w-1 h-1 bg-red-600 rounded-full" />
                  <div className={`w-[1px] h-full ${sensorTriggered ? "bg-amber-400/80 shadow-[0_0_8px_rgba(251,191,36,1)]" : "bg-red-500/50 shadow-[0_0_4px_rgba(239,68,68,0.7)]"}`} />
                  <div className="w-1.5 h-1.5 bg-red-600 rounded-full" />
                </div>

                {/* Sorting Piston Actuator */}
                <div className="absolute left-[54%] top-0 w-4 h-8 flex flex-col items-center">
                  <div className="w-4 h-3 bg-neutral-700 border border-neutral-600 rounded-t" />
                  <motion.div
                    animate={isPistonActive ? { y: [0, 14, 0] } : { y: 0 }}
                    transition={{ duration: 0.2 }}
                    className="w-1.5 h-5 bg-neutral-400 origin-top"
                  />
                  <div className="w-3 h-1 bg-neutral-600 rounded-b" />
                </div>

                {/* Spawning Box */}
                {power && (
                  <motion.div
                    style={{
                      left: `${boxPos}%`,
                      willChange: "left",
                    }}
                    className="absolute -translate-y-1 w-7 h-7 bg-gradient-to-tr from-amber-600 to-amber-400 rounded border border-amber-700/50 shadow-md flex items-center justify-center"
                  >
                    <span className="text-[8px] font-mono text-amber-950 font-bold">MME</span>
                  </motion.div>
                )}
              </div>
            </div>

            {/* Realtime Oscilloscope graphs */}
            <div className="space-y-4">
              <h3 className="text-xs font-semibold uppercase tracking-wider text-[var(--text-secondary)] flex items-center gap-2">
                <Activity size={14} className="text-blue-400" />
                {t.aiotLab.telemetryTitle}
              </h3>

              <div className="grid grid-cols-1 gap-2.5">
                {/* 1. Temp Chart */}
                <div className="p-3 rounded-xl bg-[var(--bg-card)] border border-[var(--glass-border)] flex items-center justify-between gap-4">
                  <div className="shrink-0 w-28">
                    <div className="text-[9px] uppercase tracking-wider text-[var(--text-muted)] flex items-center gap-1">
                      <Thermometer size={10} className="text-red-400" />
                      {t.aiotLab.tempLabel.split(" ")[0]}
                    </div>
                    <div className="text-sm font-bold font-mono text-[var(--text-heading)] tabular-nums">
                      {currentTemp.toFixed(1)}°C
                    </div>
                  </div>
                  <div className="flex-grow h-8 relative">
                    <svg viewBox="0 0 280 60" className="w-full h-full">
                      <path
                        d={generateSvgPath(tempHistory, 20, 100)}
                        fill="none"
                        stroke={systemState === "cooling" ? "#ef4444" : systemState === "throttled" ? "#f59e0b" : "#3b82f6"}
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        className="transition-colors duration-500"
                      />
                    </svg>
                  </div>
                </div>

                {/* 2. Vibration Chart */}
                <div className="p-3 rounded-xl bg-[var(--bg-card)] border border-[var(--glass-border)] flex items-center justify-between gap-4">
                  <div className="shrink-0 w-28">
                    <div className="text-[9px] uppercase tracking-wider text-[var(--text-muted)] flex items-center gap-1">
                      <AlertTriangle size={10} className="text-amber-400" />
                      {t.aiotLab.vibLabel.split(" ")[0]}
                    </div>
                    <div className="text-sm font-bold font-mono text-[var(--text-heading)] tabular-nums">
                      {currentVib.toFixed(2)} Hz
                    </div>
                  </div>
                  <div className="flex-grow h-8 relative">
                    <svg viewBox="0 0 280 60" className="w-full h-full">
                      <path
                        d={generateSvgPath(vibHistory, 0, 12)}
                        fill="none"
                        stroke="#a855f7"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                      />
                    </svg>
                  </div>
                </div>

                {/* 3. Power Chart */}
                <div className="p-3 rounded-xl bg-[var(--bg-card)] border border-[var(--glass-border)] flex items-center justify-between gap-4">
                  <div className="shrink-0 w-28">
                    <div className="text-[9px] uppercase tracking-wider text-[var(--text-muted)] flex items-center gap-1">
                      <Zap size={10} className="text-emerald-400" />
                      {t.aiotLab.powerLabel.split(" ")[0]}
                    </div>
                    <div className="text-sm font-bold font-mono text-[var(--text-heading)] tabular-nums">
                      {currentPower.toFixed(1)} W
                    </div>
                  </div>
                  <div className="flex-grow h-8 relative">
                    <svg viewBox="0 0 280 60" className="w-full h-full">
                      <path
                        d={generateSvgPath(powerHistory, 0, 100)}
                        fill="none"
                        stroke="#10b981"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                      />
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT PANEL: Scrolled Industrial Terminal Console (3 cols) */}
          <div className="lg:col-span-3 flex flex-col h-full min-h-[220px] lg:min-h-0 border-t lg:border-t-0 lg:border-s border-[var(--line-color)] pt-6 lg:pt-0 lg:ps-6">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-[var(--text-secondary)] mb-3 flex items-center gap-2">
              <ShieldAlert size={14} className="text-red-400" />
              {t.aiotLab.terminalTitle}
            </h3>
            <div className="flex-grow bg-black/70 border border-neutral-800/80 rounded-xl p-3.5 font-mono text-[10px] text-green-400/90 overflow-y-auto h-[180px] lg:h-[280px] flex flex-col gap-1.5 scrollbar-thin select-none">
              {logs.map((log, idx) => (
                <div key={idx} className="leading-normal break-words font-mono">
                  {log.includes("Warning") || log.includes("warning") ? (
                    <span className="text-amber-400 font-bold">{log}</span>
                  ) : log.includes("cool") || log.includes("Cooling") ? (
                    <span className="text-red-400 font-bold">{log}</span>
                  ) : log.includes("OBJECT") || log.includes("رصد جسم") ? (
                    <span className="text-blue-400 font-bold">{log}</span>
                  ) : (
                    log
                  )}
                </div>
              ))}
              <div ref={terminalEndRef} />
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}

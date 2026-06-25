import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { HERO_DASHBOARD_CARDS } from "../../data/agentIntelligenceContent";

const KPI_COUNT = HERO_DASHBOARD_CARDS.length;

export default function HeroIntelligenceVisual() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const waveAreaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const waveArea = waveAreaRef.current;
    if (!canvas || !waveArea) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let frame = 0;
    let raf = 0;

    const resize = () => {
      const w = waveArea.clientWidth;
      const h = waveArea.clientHeight;
      canvas.width = w * devicePixelRatio;
      canvas.height = h * devicePixelRatio;
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx.setTransform(devicePixelRatio, 0, 0, devicePixelRatio, 0, 0);
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(waveArea);

    const draw = () => {
      const w = canvas.width / devicePixelRatio;
      const h = canvas.height / devicePixelRatio;
      ctx.clearRect(0, 0, w, h);

      const waveY = h * 0.48;
      const coreX = w * 0.5;
      const coreY = h * 0.42;
      const pulse = 0.9 + Math.sin(frame * 0.035) * 0.1;

      // ── 1. Incoming audio (left → center): waveform + spectrum ──
      const bars = 48;
      const barW = (w * 0.55) / bars;
      for (let i = 0; i < bars; i++) {
        const x = 12 + i * barW;
        const energy =
          0.35 +
          Math.abs(Math.sin(frame * 0.07 + i * 0.35)) * 0.45 +
          Math.abs(Math.sin(frame * 0.12 + i * 0.15)) * 0.2;
        const bh = energy * (h * 0.22);
        const g = ctx.createLinearGradient(x, waveY - bh, x, waveY + bh);
        g.addColorStop(0, "rgba(255,255,255,0.35)");
        g.addColorStop(0.5, "rgba(180,200,255,0.2)");
        g.addColorStop(1, "rgba(255,255,255,0.04)");
        ctx.fillStyle = g;
        ctx.fillRect(x, waveY - bh, Math.max(2, barW - 1.5), bh * 2);
      }

      // Smooth call waveform
      ctx.beginPath();
      for (let x = 0; x <= w * 0.88; x += 2) {
        const t = frame * 0.028 + x * 0.025;
        const envelope = Math.min(1, x / (w * 0.15)) * Math.min(1, (w * 0.85 - x) / (w * 0.2));
        const y =
          waveY +
          (Math.sin(t) * 14 + Math.sin(t * 2.3) * 6 + Math.sin(t * 0.5) * 4) * envelope;
        if (x === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.strokeStyle = "rgba(255,255,255,0.55)";
      ctx.lineWidth = 1.8;
      ctx.stroke();

      // ── 2. AI processing core (center) ──
      const coreGrad = ctx.createRadialGradient(coreX, coreY, 0, coreX, coreY, 55 * pulse);
      coreGrad.addColorStop(0, "rgba(255,255,255,0.14)");
      coreGrad.addColorStop(0.45, "rgba(100,160,255,0.08)");
      coreGrad.addColorStop(1, "rgba(0,0,0,0)");
      ctx.fillStyle = coreGrad;
      ctx.beginPath();
      ctx.arc(coreX, coreY, 55 * pulse, 0, Math.PI * 2);
      ctx.fill();

      // Rotating scan arc
      const scanAngle = (frame * 0.04) % (Math.PI * 2);
      ctx.strokeStyle = "rgba(255,255,255,0.25)";
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.arc(coreX, coreY, 32, scanAngle, scanAngle + Math.PI * 0.55);
      ctx.stroke();

      // Inner ring
      ctx.strokeStyle = `rgba(255,255,255,${0.12 + Math.sin(frame * 0.06) * 0.08})`;
      ctx.beginPath();
      ctx.arc(coreX, coreY, 18, 0, Math.PI * 2);
      ctx.stroke();

      // ── 3. Intelligence streams → insight columns (above KPI row) ──
      const colW = w / KPI_COUNT;
      for (let i = 0; i < KPI_COUNT; i++) {
        const colX = colW * i + colW / 2;
        const streamPhase = (frame * 0.02 + i * 0.4) % 1;

        // Vertical analysis beam (fades toward bottom, sits behind KPI HTML)
        const beamGrad = ctx.createLinearGradient(colX, coreY + 20, colX, h);
        beamGrad.addColorStop(0, "rgba(255,255,255,0.12)");
        beamGrad.addColorStop(0.5, "rgba(255,255,255,0.04)");
        beamGrad.addColorStop(1, "rgba(255,255,255,0)");
        ctx.fillStyle = beamGrad;
        ctx.fillRect(colX - 1, coreY + 20, 2, h - coreY - 20);

        // Traveling packet from core to column
        const px = coreX + (colX - coreX) * streamPhase;
        const py = coreY + (h - 24 - coreY) * streamPhase;
        const packetAlpha = streamPhase < 0.92 ? 0.2 + streamPhase * 0.6 : 0;
        ctx.beginPath();
        ctx.arc(px, py, 2.5, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255,255,255,${packetAlpha})`;
        ctx.fill();
      }

      // Flow line core → right (analysis complete)
      ctx.beginPath();
      for (let x = coreX; x <= w * 0.92; x += 2) {
        const t = frame * 0.03 + (x - coreX) * 0.05;
        const y = coreY + Math.sin(t) * 4;
        if (x === coreX) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.strokeStyle = "rgba(255,255,255,0.15)";
      ctx.lineWidth = 1;
      ctx.stroke();

      // Bottom fade, wave dissolves behind KPI strip
      const fade = ctx.createLinearGradient(0, h * 0.55, 0, h);
      fade.addColorStop(0, "rgba(10,10,10,0)");
      fade.addColorStop(0.55, "rgba(10,10,10,0.55)");
      fade.addColorStop(1, "rgba(10,10,10,0.95)");
      ctx.fillStyle = fade;
      ctx.fillRect(0, h * 0.45, w, h * 0.55);

      frame++;
      raf = requestAnimationFrame(draw);
    };
    draw();

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
    };
  }, []);

  return (
    <div className="relative w-full flex flex-col rounded-xl sm:rounded-2xl border border-white/[0.08] bg-void-50/80 overflow-hidden min-h-[300px] sm:min-h-[360px]">
      {/* Wave + AI layer (behind KPIs) */}
      <div ref={waveAreaRef} className="relative flex-1 min-h-[200px] sm:min-h-[240px]">
        <canvas ref={canvasRef} className="absolute inset-0 z-0" aria-hidden />

        <div className="absolute left-3 sm:left-4 top-3 sm:top-4 z-10 text-[8px] sm:text-[9px] font-mono uppercase tracking-widest text-void-600">
          Audio in
        </div>
        <div className="absolute left-1/2 -translate-x-1/2 top-3 sm:top-4 z-10 text-[8px] sm:text-[9px] font-mono uppercase tracking-widest text-platinum/70">
          AI analysis
        </div>
        <div className="absolute right-3 sm:right-4 top-3 sm:top-4 z-10 text-[8px] sm:text-[9px] font-mono uppercase tracking-widest text-void-600">
          Insights out
        </div>

        {/* Pipeline hint */}
        <div className="absolute bottom-2 left-1/2 -translate-x-1/2 z-10 hidden sm:flex items-center gap-2 text-[8px] font-mono text-void-700">
          <span>calls</span>
          <span className="text-void-500">→</span>
          <span>understand</span>
          <span className="text-void-500">→</span>
          <span>act</span>
        </div>
      </div>

      {/* KPI strip, always on top */}
      <div className="relative z-20 shrink-0 border-t border-white/[0.08] bg-void-50/95 backdrop-blur-md px-3 sm:px-4 py-3 sm:py-3.5">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2 sm:gap-2.5">
          {HERO_DASHBOARD_CARDS.map((card, i) => (
            <motion.div
              key={card.label}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 + i * 0.08, duration: 0.45 }}
              className="rounded-lg sm:rounded-xl px-2.5 py-2 sm:px-3 sm:py-2.5 border border-white/[0.1] bg-void-100/90 shadow-[0_4px_24px_rgba(0,0,0,0.4)] min-w-0"
            >
              <p className="text-[8px] sm:text-[9px] font-mono text-void-600 uppercase tracking-wide truncate">
                {card.label}
              </p>
              <p className={`font-mono font-bold text-sm sm:text-base ${card.accent} truncate`}>
                {card.value}
              </p>
              <p className="text-[8px] sm:text-[9px] text-void-700 truncate">{card.unit}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}

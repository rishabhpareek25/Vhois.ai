import { useEffect, useRef } from "react";

export default function CallWaveCanvas({
  intensity,
  flagged,
}: {
  intensity: number;
  flagged: boolean;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let frame = 0;
    let raf = 0;
    const bars = 64;

    const resize = () => {
      canvas.width = canvas.offsetWidth * devicePixelRatio;
      canvas.height = canvas.offsetHeight * devicePixelRatio;
      ctx.setTransform(devicePixelRatio, 0, 0, devicePixelRatio, 0, 0);
    };
    resize();
    window.addEventListener("resize", resize);

    const draw = () => {
      const w = canvas.offsetWidth;
      const h = canvas.offsetHeight;
      ctx.clearRect(0, 0, w, h);

      const grad = ctx.createLinearGradient(0, 0, w, 0);
      grad.addColorStop(0, "rgba(255,255,255,0.02)");
      grad.addColorStop(0.5, flagged ? "rgba(255,80,80,0.08)" : "rgba(255,255,255,0.06)");
      grad.addColorStop(1, "rgba(255,255,255,0.02)");
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, w, h);

      const mid = h / 2;
      ctx.beginPath();
      ctx.moveTo(0, mid);
      for (let x = 0; x <= w; x += 3) {
        const t = frame * 0.04 + x * 0.03;
        const amp = (8 + intensity * 28) * (0.6 + Math.sin(t * 0.7) * 0.4);
        const y = mid + Math.sin(t) * amp + Math.sin(t * 2.3) * amp * 0.3;
        ctx.lineTo(x, y);
      }
      ctx.strokeStyle = flagged ? "rgba(255,100,100,0.55)" : "rgba(255,255,255,0.35)";
      ctx.lineWidth = 1.5;
      ctx.stroke();

      const barW = w / bars;
      for (let i = 0; i < bars; i++) {
        const bh =
          (6 + Math.abs(Math.sin(frame * 0.08 + i * 0.4)) * (14 + intensity * 40)) *
          (flagged && i % 7 === 0 ? 1.4 : 1);
        const x = i * barW + barW * 0.2;
        ctx.fillStyle =
          flagged && i % 11 === 0
            ? "rgba(255,90,90,0.5)"
            : `rgba(255,255,255,${0.08 + intensity * 0.25})`;
        ctx.fillRect(x, h - bh - 8, barW * 0.6, bh);
      }

      frame++;
      raf = requestAnimationFrame(draw);
    };
    draw();

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
    };
  }, [intensity, flagged]);

  return (
    <canvas
      ref={canvasRef}
      className="w-full h-full rounded-lg border border-white/5 bg-void-50/80"
      aria-hidden
    />
  );
}

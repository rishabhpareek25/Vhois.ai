import { useEffect, useRef } from "react";

interface ReactiveInputCanvasProps {
  intensity: number;
  active: boolean;
}

export default function ReactiveInputCanvas({ intensity, active }: ReactiveInputCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const frameRef = useRef<number>();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const w = 320;
    const h = 56;
    canvas.width = w;
    canvas.height = h;
    let t = 0;

    const bars = 48;
    const phases = Array.from({ length: bars }, () => Math.random() * Math.PI * 2);

    const draw = () => {
      ctx.clearRect(0, 0, w, h);
      const centerY = h / 2;
      const boost = active ? intensity : intensity * 0.35;

      for (let i = 0; i < bars; i++) {
        const x = (i / bars) * w;
        const wave =
          Math.sin(t * 2.4 + phases[i]) * 0.35 +
          Math.sin(t * 1.1 + i * 0.2) * 0.25 +
          boost * 0.4;
        const amp = (wave + 1) / 2;
        const barH = 4 + amp * (h / 2 - 6);
        const grad = ctx.createLinearGradient(x, centerY - barH, x, centerY + barH);
        grad.addColorStop(0, "rgba(255,255,255,0.85)");
        grad.addColorStop(1, "rgba(120,120,120,0.2)");
        ctx.fillStyle = grad;
        ctx.fillRect(x, centerY - barH, w / bars - 1.5, barH * 2);
      }

      ctx.strokeStyle = "rgba(255,255,255,0.12)";
      ctx.beginPath();
      ctx.moveTo(0, centerY);
      ctx.lineTo(w, centerY);
      ctx.stroke();

      t += 0.04;
      frameRef.current = requestAnimationFrame(draw);
    };

    draw();
    return () => {
      if (frameRef.current) cancelAnimationFrame(frameRef.current);
    };
  }, [intensity, active]);

  return (
    <canvas
      ref={canvasRef}
      className="w-full h-14 rounded-lg border border-void-300/60 bg-void-50/40"
      aria-hidden
    />
  );
}

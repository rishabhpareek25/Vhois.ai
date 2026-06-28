import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

export default function AudioWaveformLogo() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>();
  const logoImageRef = useRef<HTMLImageElement | null>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [logoReady, setLogoReady] = useState(false);

  useEffect(() => {
    const img = new Image();
    img.src = "/logo-dark.png";
    img.onload = () => {
      logoImageRef.current = img;
      setLogoReady(true);
    };
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const size = 420;
    canvas.width = size;
    canvas.height = size;
    const centerX = size / 2;
    const centerY = size / 2;
    const plateSize = 218;
    const halfPlate = plateSize / 2;
    const cornerLen = 22;
    let time = 0;

    const drawRoundedRect = (x: number, y: number, w: number, h: number, r: number) => {
      ctx.beginPath();
      ctx.moveTo(x + r, y);
      ctx.lineTo(x + w - r, y);
      ctx.quadraticCurveTo(x + w, y, x + w, y + r);
      ctx.lineTo(x + w, y + h - r);
      ctx.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
      ctx.lineTo(x + r, y + h);
      ctx.quadraticCurveTo(x, y + h, x, y + h - r);
      ctx.lineTo(x, y + r);
      ctx.quadraticCurveTo(x, y, x + r, y);
      ctx.closePath();
    };

    function animate() {
      if (!ctx) return;
      ctx.clearRect(0, 0, size, size);
      const pulse = Math.sin(time * 1.8) * 0.5 + 0.5;

      // Back glow plate
      const plateGradient = ctx.createLinearGradient(
        centerX - halfPlate,
        centerY - halfPlate,
        centerX + halfPlate,
        centerY + halfPlate
      );
      plateGradient.addColorStop(0, "rgba(79, 70, 229, 0.4)");
      plateGradient.addColorStop(0.55, "rgba(79, 70, 229, 0.15)");
      plateGradient.addColorStop(1, "rgba(79, 70, 229, 0.3)");
      drawRoundedRect(centerX - halfPlate, centerY - halfPlate, plateSize, plateSize, 26);
      ctx.fillStyle = plateGradient;
      ctx.fill();

      // Brand Primary inner plate
      drawRoundedRect(centerX - halfPlate + 2, centerY - halfPlate + 2, plateSize - 4, plateSize - 4, 24);
      ctx.fillStyle = "#4f46e5"; // Brand Blue
      ctx.fill();

      // Subtle diagonal hologrid inside plate
      ctx.save();
      drawRoundedRect(centerX - halfPlate + 2, centerY - halfPlate + 2, plateSize - 4, plateSize - 4, 24);
      ctx.clip();
      for (let i = -8; i < 16; i++) {
        const x = centerX - halfPlate + i * 18 + ((time * 22) % 18);
        ctx.strokeStyle = "rgba(255,255,255,0.06)";
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(x, centerY - halfPlate);
        ctx.lineTo(x + plateSize * 0.55, centerY + halfPlate);
        ctx.stroke();
      }
      ctx.restore();

      // Angular kinetic beams (left)
      for (let i = 0; i < 10; i++) {
        const sweep = ((time * 180 + i * 41) % 300) - 150;
        const x = centerX - halfPlate - 70 + sweep;
        const y = centerY - 70 + i * 15;
        const alpha = 0.15 + (1 - Math.abs(sweep) / 150) * 0.3;
        ctx.strokeStyle = `rgba(255, 255, 255, ${alpha})`;
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.moveTo(x, y);
        ctx.lineTo(x + 34, y + 18);
        ctx.stroke();
      }

      // Traveling pulse rails (top + bottom)
      const railTravel = ((time * 220) % (plateSize + 140)) - 70;
      for (const yOffset of [-halfPlate - 18, halfPlate + 18]) {
        const railY = centerY + yOffset;
        ctx.strokeStyle = "rgba(255,255,255,0.15)";
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(centerX - halfPlate - 34, railY);
        ctx.lineTo(centerX + halfPlate + 34, railY);
        ctx.stroke();

        const pulseX = centerX - halfPlate + railTravel;
        const railPulse = ctx.createLinearGradient(pulseX - 36, railY, pulseX + 36, railY);
        railPulse.addColorStop(0, "rgba(255,255,255,0)");
        railPulse.addColorStop(0.5, "rgba(255,255,255,0.9)");
        railPulse.addColorStop(1, "rgba(255,255,255,0)");
        ctx.strokeStyle = railPulse;
        ctx.lineWidth = 2.5;
        ctx.beginPath();
        ctx.moveTo(pulseX - 36, railY);
        ctx.lineTo(pulseX + 36, railY);
        ctx.stroke();
      }

      // Reactive spectral bars (right)
      for (let i = 0; i < 8; i++) {
        const x = centerX + halfPlate + 18 + i * 12;
        const h = 24 + i * 9 + (Math.sin(time * 3.3 + i * 0.8) * 0.5 + 0.5) * 22;
        const y = centerY - h / 2;
        const barGradient = ctx.createLinearGradient(x, y, x, y + h);
        barGradient.addColorStop(0, "rgba(255, 255, 255, 1)");
        barGradient.addColorStop(1, "rgba(255, 255, 255, 0.2)");
        ctx.strokeStyle = barGradient;
        ctx.lineWidth = 5.5;
        ctx.lineCap = "round";
        ctx.beginPath();
        ctx.moveTo(x, y);
        ctx.lineTo(x, y + h);
        ctx.stroke();
      }

      // Left-side micro particles for "signal dust"
      for (let i = 0; i < 18; i++) {
        const orbit = time * (0.7 + i * 0.04) + i * 2.3;
        const radiusX = 34 + (i % 5) * 8;
        const radiusY = 22 + (i % 7) * 6;
        const px = centerX - halfPlate - 26 - Math.cos(orbit) * radiusX;
        const py = centerY + Math.sin(orbit * 1.35) * radiusY;
        const alpha = 0.2 + (Math.sin(orbit * 2.2) * 0.5 + 0.5) * 0.5;
        ctx.beginPath();
        ctx.arc(px, py, 1.1 + (i % 3) * 0.4, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${alpha})`;
        ctx.fill();
      }

      // Center logo (perfect screen blend over blue)
      const logoImage = logoImageRef.current;
      if (logoReady && logoImage) {
        const logoSize = plateSize - 6;
        const logoX = centerX - logoSize / 2;
        const logoY = centerY - logoSize / 2;
        ctx.save();
        drawRoundedRect(logoX, logoY, logoSize, logoSize, 16);
        ctx.clip();
        
        // Use Screen blending: Black pixels in the image will turn completely invisible,
        // leaving only the pure White V shining perfectly over the blue background.
        ctx.globalCompositeOperation = "screen";
        ctx.filter = "brightness(2.5) contrast(2.5) saturate(0)";
        ctx.drawImage(logoImage, logoX, logoY, logoSize, logoSize);
        
        ctx.filter = "none";
        ctx.globalCompositeOperation = "source-over";
        ctx.restore();
      }

      // Centerline glitch slices (short random bursts)
      if (Math.sin(time * 8.4) > 0.88) {
        const glitchY = centerY - 42 + ((time * 1000) % 84);
        ctx.fillStyle = "rgba(255,255,255,0.4)";
        ctx.fillRect(centerX - halfPlate + 18, glitchY, plateSize - 36, 2);
      }

      // Precision corner brackets
      const bracketAlpha = 0.6 + pulse * 0.4;
      ctx.strokeStyle = `rgba(255, 255, 255, ${bracketAlpha})`;
      ctx.lineWidth = 2.5;
      const x0 = centerX - halfPlate - 8;
      const x1 = centerX + halfPlate + 8;
      const y0 = centerY - halfPlate - 8;
      const y1 = centerY + halfPlate + 8;

      ctx.beginPath();
      ctx.moveTo(x0, y0 + cornerLen);
      ctx.lineTo(x0, y0);
      ctx.lineTo(x0 + cornerLen, y0);
      ctx.moveTo(x1 - cornerLen, y0);
      ctx.lineTo(x1, y0);
      ctx.lineTo(x1, y0 + cornerLen);
      ctx.moveTo(x0, y1 - cornerLen);
      ctx.lineTo(x0, y1);
      ctx.lineTo(x0 + cornerLen, y1);
      ctx.moveTo(x1 - cornerLen, y1);
      ctx.lineTo(x1, y1);
      ctx.lineTo(x1, y1 - cornerLen);
      ctx.stroke();

      // Horizontal scan pulse
      const scanY = centerY - halfPlate + (((time * 120) % (plateSize + 40)) - 20);
      const scanGradient = ctx.createLinearGradient(centerX - halfPlate - 20, scanY, centerX + halfPlate + 20, scanY);
      scanGradient.addColorStop(0, "rgba(255,255,255,0)");
      scanGradient.addColorStop(0.5, "rgba(255,255,255,0.5)");
      scanGradient.addColorStop(1, "rgba(255,255,255,0)");
      ctx.strokeStyle = scanGradient;
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.moveTo(centerX - halfPlate - 20, scanY);
      ctx.lineTo(centerX + halfPlate + 20, scanY);
      ctx.stroke();

      // Vertical scan pulse
      const scanX = centerX - halfPlate + (((time * 96) % (plateSize + 40)) - 20);
      const vScanGradient = ctx.createLinearGradient(scanX, centerY - halfPlate - 20, scanX, centerY + halfPlate + 20);
      vScanGradient.addColorStop(0, "rgba(255,255,255,0)");
      vScanGradient.addColorStop(0.5, "rgba(255,255,255,0.4)");
      vScanGradient.addColorStop(1, "rgba(255,255,255,0)");
      ctx.strokeStyle = vScanGradient;
      ctx.lineWidth = 1.2;
      ctx.beginPath();
      ctx.moveTo(scanX, centerY - halfPlate - 20);
      ctx.lineTo(scanX, centerY + halfPlate + 20);
      ctx.stroke();

      time += 0.03;
      animationRef.current = requestAnimationFrame(animate);
    }

    animate();

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [isHovered, logoReady]);

  return (
    <motion.div
      className="relative inline-block"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      whileHover={{ scale: 1.06, rotate: -1.5 }}
      style={{ cursor: "pointer" }}
    >
      <canvas
        ref={canvasRef}
        className="w-16 h-16 sm:w-[4.5rem] sm:h-[4.5rem] lg:w-20 lg:h-20"
        style={{
          filter: isHovered ? "drop-shadow(0 0 28px rgba(255, 255, 255, 0.38))" : "none",
          transition: "filter 0.3s ease",
        }}
      />
    </motion.div>
  );
}

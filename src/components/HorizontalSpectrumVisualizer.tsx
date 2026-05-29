import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

export default function HorizontalSpectrumVisualizer() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [liveMetrics, setLiveMetrics] = useState({
    confidence: 97.8,
    overlap: 12.4,
    activeSpeaker: "SPEAKER_A",
    turnDuration: 1.8,
  });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const height = 280;
    const bars = 180;
    let time = 0;
    let frameId = 0;
    let activeSpeaker = 0;
    let nextSpeakerSwap = 0;
    const speakerCount = 4;
    const frequencies: number[] = [];
    const phases: number[] = [];
    const speakerSeeds = Array.from({ length: speakerCount }, (_, i) => i * 1.7 + 0.9);

    const setCanvasWidth = () => {
      const parent = canvas.parentElement;
      const width = parent?.clientWidth ?? window.innerWidth - 48;
      canvas.width = width;
      canvas.height = height;
    };
    setCanvasWidth();

    for (let i = 0; i < bars; i++) {
      frequencies.push(0.35 + (i / bars) * 2.2);
      phases.push(Math.random() * Math.PI * 2);
    }

    function animate() {
      if (!ctx || !canvas) return;

      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const barGap = canvas.width / bars;
      const centerY = canvas.height / 2;

      const bgGradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
      bgGradient.addColorStop(0, "rgba(255, 255, 255, 0.02)");
      bgGradient.addColorStop(0.5, "rgba(120, 120, 120, 0.01)");
      bgGradient.addColorStop(1, "rgba(255, 255, 255, 0.02)");
      ctx.fillStyle = bgGradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Speaker lane guides for diarization (who spoke when)
      const laneHeight = canvas.height / (speakerCount + 1);
      for (let i = 0; i < speakerCount; i++) {
        const y = laneHeight * (i + 1);
        const isActive = i === activeSpeaker;
        ctx.strokeStyle = isActive ? "rgba(255, 255, 255, 0.25)" : "rgba(255, 255, 255, 0.1)";
        ctx.lineWidth = isActive ? 1.2 : 0.8;
        ctx.setLineDash([4, 6]);
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(canvas.width, y);
        ctx.stroke();

        // Speaker labels on the left edge
        ctx.font = "10px Space Mono";
        ctx.fillStyle = isActive ? "rgba(255,255,255,0.8)" : "rgba(255,255,255,0.35)";
        ctx.textAlign = "left";
        ctx.textBaseline = "middle";
        const label = `SPEAKER_${String.fromCharCode(65 + i)}`;
        ctx.fillText(label, 8, y);
      }
      ctx.setLineDash([]);

      // Main centerline
      ctx.strokeStyle = "rgba(255, 255, 255, 0.16)";
      ctx.lineWidth = 0.6;
      ctx.beginPath();
      ctx.moveTo(0, centerY);
      ctx.lineTo(canvas.width, centerY);
      ctx.stroke();

      // Rotate active speaker periodically (simulated diarization turn-taking)
      if (time > nextSpeakerSwap) {
        activeSpeaker = (activeSpeaker + 1 + Math.floor(Math.random() * 2)) % speakerCount;
        nextSpeakerSwap = time + 1.8 + Math.random() * 1.7;
      }

      for (let i = 0; i < bars; i++) {
        const x = i * barGap;
        const wave1 = Math.sin(time * frequencies[i] + phases[i]) * 0.5;
        const wave2 = Math.sin(time * 1.25 + phases[i] * 0.75) * 0.3;
        const wave3 = Math.cos(time * 0.65 + phases[i] * 1.15) * 0.2;
        const amplitude = (wave1 + wave2 + wave3 + 1) / 2;
        const energyBoost =
          0.22 *
          (Math.sin(time * 2.1 + (i / bars) * Math.PI * 4 + speakerSeeds[activeSpeaker]) * 0.5 + 0.5);
        const normalizedAmplitude = Math.min(1, amplitude * 0.78 + energyBoost);
        const barHeight = normalizedAmplitude * (canvas.height * 0.29);
        const topY = centerY - barHeight;
        const bottomY = centerY + barHeight;

        const barGradient = ctx.createLinearGradient(x, topY, x, centerY);
        barGradient.addColorStop(0, "rgba(255, 255, 255, 0.82)");
        barGradient.addColorStop(0.5, "rgba(180, 180, 180, 0.48)");
        barGradient.addColorStop(1, "rgba(95, 95, 95, 0.18)");

        ctx.fillStyle = barGradient;
        ctx.fillRect(x, topY, barGap - 1, barHeight);

        const bottomGradient = ctx.createLinearGradient(x, centerY, x, bottomY);
        bottomGradient.addColorStop(0, "rgba(95, 95, 95, 0.18)");
        bottomGradient.addColorStop(0.5, "rgba(180, 180, 180, 0.48)");
        bottomGradient.addColorStop(1, "rgba(255, 255, 255, 0.82)");

        ctx.fillStyle = bottomGradient;
        ctx.fillRect(x, centerY, barGap - 1, barHeight);

        if (normalizedAmplitude > 0.72) {
          ctx.shadowBlur = 12;
          ctx.shadowColor = "rgba(255, 255, 255, 0.28)";
          ctx.fillRect(x, topY, barGap - 1, barHeight);
          ctx.fillRect(x, centerY, barGap - 1, barHeight);
          ctx.shadowBlur = 0;
        }
      }

      // Speaker activity beads (diarization markers)
      for (let speaker = 0; speaker < speakerCount; speaker++) {
        const laneY = laneHeight * (speaker + 1);
        const isActive = speaker === activeSpeaker;
        const beadCount = 7;
        for (let i = 0; i < beadCount; i++) {
          const phase = (i / beadCount) * Math.PI * 2;
          const pulse = Math.sin(time * (isActive ? 3.1 : 1.6) + phase + speakerSeeds[speaker]) * 0.5 + 0.5;
          const x = (canvas.width / (beadCount + 1)) * (i + 1);
          const radius = isActive ? 2 + pulse * 2.2 : 1.5 + pulse * 1.1;
          const alpha = isActive ? 0.22 + pulse * 0.35 : 0.1 + pulse * 0.12;
          ctx.beginPath();
          ctx.arc(x, laneY, radius, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(255, 255, 255, ${alpha})`;
          ctx.fill();
        }
      }

      // Active speaker focus ring on the right edge
      const indicatorX = canvas.width - 22;
      const indicatorY = laneHeight * (activeSpeaker + 1);
      ctx.beginPath();
      ctx.arc(indicatorX, indicatorY, 6.5, 0, Math.PI * 2);
      ctx.strokeStyle = "rgba(255, 255, 255, 0.65)";
      ctx.lineWidth = 1.5;
      ctx.stroke();
      ctx.beginPath();
      ctx.arc(indicatorX, indicatorY, 2.8, 0, Math.PI * 2);
      ctx.fillStyle = "rgba(255, 255, 255, 0.9)";
      ctx.fill();

      // Overlap zone ribbon (center energy where cross-talk appears)
      const overlapIntensity = Math.sin(time * 1.7) * 0.5 + 0.5;
      const overlapHeight = 8 + overlapIntensity * 12;
      const overlapGradient = ctx.createLinearGradient(0, centerY - overlapHeight, 0, centerY + overlapHeight);
      overlapGradient.addColorStop(0, "rgba(255, 255, 255, 0)");
      overlapGradient.addColorStop(0.5, `rgba(255, 255, 255, ${0.04 + overlapIntensity * 0.12})`);
      overlapGradient.addColorStop(1, "rgba(255, 255, 255, 0)");
      ctx.fillStyle = overlapGradient;
      ctx.fillRect(0, centerY - overlapHeight, canvas.width, overlapHeight * 2);

      // Mirror peak dots for subtle premium feel
      for (let i = 0; i < 8; i++) {
        const barIndex = Math.floor((i / 8) * bars);
        const x = barIndex * barGap + barGap / 2;
        const wave = Math.sin(time * frequencies[barIndex] + phases[barIndex]) * 0.6 + 0.35;
        const barHeight = wave * (canvas.height * 0.26);
        const topY = centerY - barHeight;
        const bottomY = centerY + barHeight;
        ctx.beginPath();
        ctx.arc(x, topY, 2.3 + wave * 1.5, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${0.5 + wave * 0.35})`;
        ctx.fill();
        ctx.beginPath();
        ctx.arc(x, bottomY, 2.3 + wave * 1.5, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${0.5 + wave * 0.35})`;
        ctx.fill();
      }

      const edgeGradient = ctx.createLinearGradient(0, 0, 100, 0);
      edgeGradient.addColorStop(0, "rgba(0, 0, 0, 0.3)");
      edgeGradient.addColorStop(1, "rgba(0, 0, 0, 0)");
      ctx.fillStyle = edgeGradient;
      ctx.fillRect(0, 0, 100, canvas.height);

      const rightEdgeGradient = ctx.createLinearGradient(canvas.width - 100, 0, canvas.width, 0);
      rightEdgeGradient.addColorStop(0, "rgba(0, 0, 0, 0)");
      rightEdgeGradient.addColorStop(1, "rgba(0, 0, 0, 0.3)");
      ctx.fillStyle = rightEdgeGradient;
      ctx.fillRect(canvas.width - 100, 0, 100, canvas.height);

      time += 0.02;
      frameId = requestAnimationFrame(animate);
    }

    animate();

    const handleResize = () => {
      setCanvasWidth();
    };

    window.addEventListener("resize", handleResize);

    return () => {
      cancelAnimationFrame(frameId);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    const speakerIds = ["SPEAKER_A", "SPEAKER_B", "SPEAKER_C", "SPEAKER_D"];
    const interval = setInterval(() => {
      setLiveMetrics((prev) => ({
        confidence: Math.min(99.4, Math.max(92.5, prev.confidence + (Math.random() - 0.5) * 1.8)),
        overlap: Math.min(34, Math.max(4, prev.overlap + (Math.random() - 0.5) * 4.2)),
        activeSpeaker: speakerIds[Math.floor(Math.random() * speakerIds.length)],
        turnDuration: Math.min(6.2, Math.max(0.6, prev.turnDuration + (Math.random() - 0.5) * 1.2)),
      }));
    }, 900);

    return () => clearInterval(interval);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.8, duration: 0.8 }}
      className="w-full"
    >
      <div className="relative px-6">
        {/* Label */}
        <div className="mb-4 flex items-center justify-between">
          <div>
            <h3 className="text-sm font-mono text-platinum opacity-70">AUDIO SPECTRUM</h3>
            <p className="text-xs text-void-600">Real-time voice frequency and speaker diarization</p>
          </div>
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            className="w-8 h-8 rounded-full border border-platinum/30 flex items-center justify-center"
          >
            <div className="w-2 h-2 bg-platinum rounded-full" />
          </motion.div>
        </div>

        <div className="mb-3 flex flex-wrap items-center gap-2">
          {["speaker_labels=true", "overlap_detection=on", "confidence=enabled", "tracks=4"].map((item) => (
            <span
              key={item}
              className="text-[10px] font-mono px-2 py-1 rounded-md border border-void-300 text-void-600"
            >
              {item}
            </span>
          ))}
        </div>

        {/* Canvas container with border */}
        <motion.div
          whileHover={{ scale: 1.01 }}
          className="relative border border-void-300 rounded-xl overflow-hidden backdrop-blur-sm"
        >
          <canvas
            ref={canvasRef}
            className="w-full"
            style={{ height: "280px" }}
          />

          {/* Animated grid overlay */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              backgroundImage:
                "linear-gradient(90deg, transparent 49%, rgba(255,255,255,0.03) 49%, rgba(255,255,255,0.03) 51%, transparent 51%)",
              backgroundSize: "4% 100%",
            }}
          />

          {/* Vertical guide lines */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              backgroundImage:
                "linear-gradient(0deg, transparent 19%, rgba(255,255,255,0.02) 19%, rgba(255,255,255,0.02) 21%, transparent 21%, transparent 49%, rgba(255,255,255,0.02) 49%, rgba(255,255,255,0.02) 51%, transparent 51%, transparent 79%, rgba(255,255,255,0.02) 79%, rgba(255,255,255,0.02) 81%, transparent 81%)",
              backgroundSize: "100% 5%",
            }}
          />
        </motion.div>

        {/* Stats below */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 0.8 }}
          className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-4"
        >
          <div className="glass rounded-lg p-4 text-center">
            <div className="text-xs text-void-600 font-mono mb-2">DIARIZATION CONF</div>
            <div className="text-xl font-bold text-platinum">{liveMetrics.confidence.toFixed(1)}%</div>
          </div>
          <div className="glass rounded-lg p-4 text-center">
            <div className="text-xs text-void-600 font-mono mb-2">OVERLAP RATIO</div>
            <div className="text-xl font-bold text-platinum">{liveMetrics.overlap.toFixed(1)}%</div>
          </div>
          <div className="glass rounded-lg p-4 text-center">
            <div className="text-xs text-void-600 font-mono mb-2">ACTIVE SPEAKER</div>
            <div className="text-xl font-bold text-platinum">{liveMetrics.activeSpeaker.replace("_", " ")}</div>
          </div>
          <div className="glass rounded-lg p-4 text-center">
            <div className="text-xs text-void-600 font-mono mb-2">TURN DURATION</div>
            <div className="text-xl font-bold text-platinum">{liveMetrics.turnDuration.toFixed(1)}s</div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}

import { useEffect, useRef, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Radio, Sparkles, Zap } from "lucide-react";
import Button from "../components/ui/Button";
import WaitlistParticleField from "../components/waitlist/WaitlistParticleField";

const WHISPERS = [
  "Our engineers are teaching the AI table manners.",
  "This module is in a meeting that could've been an email.",
  "The servers are doing yoga before launch. Please wait.",
  "We asked GPT to finish this. It said 'after one more coffee.'",
  "Signal detected. Deployment… eventually.",
  "You're early. Like, uncomfortably early. We love it.",
  "Building voice intelligence. Arguing about semicolons.",
  "Status: 99% hype, 1% compile errors.",
];

const TERMINAL_LINES = [
  "> Initializing vhois.deploy()",
  "> Calibrating sarcasm levels... OK",
  "> Checking if universe is ready... debatable",
  "> Allocating infinite ambition... done",
  "> ERROR: Too cool to launch yet",
  "> Redirecting humans to waitlist.exe",
];

function useCountdown(target: Date) {
  const [left, setLeft] = useState({ d: 0, h: 0, m: 0, s: 0 });

  useEffect(() => {
    const tick = () => {
      const diff = Math.max(0, target.getTime() - Date.now());
      setLeft({
        d: Math.floor(diff / 86400000),
        h: Math.floor((diff % 86400000) / 3600000),
        m: Math.floor((diff % 3600000) / 60000),
        s: Math.floor((diff % 60000) / 1000),
      });
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, [target]);

  return left;
}

function GlitchTitle({ text }: { text: string }) {
  return (
    <h1 className="font-mono font-bold text-5xl sm:text-7xl md:text-8xl text-center leading-none relative">
      <motion.span
        className="block text-platinum"
        animate={{ x: [0, -2, 2, 0], opacity: [1, 0.92, 1] }}
        transition={{ duration: 0.15, repeat: Infinity, repeatDelay: 2.5 }}
      >
        {text}
      </motion.span>
      <span
        className="absolute inset-0 text-platinum/30 blur-[1px] select-none pointer-events-none"
        aria-hidden
        style={{ transform: "translate(3px, 2px)" }}
      >
        {text}
      </span>
      <span
        className="absolute inset-0 text-void-600/50 blur-[1px] select-none pointer-events-none"
        aria-hidden
        style={{ transform: "translate(-3px, -1px)" }}
      >
        {text}
      </span>
    </h1>
  );
}

export default function ComingSoon() {
  const [params] = useSearchParams();
  const feature = params.get("feature") || "Something Legendary";
  const [whisperIdx, setWhisperIdx] = useState(0);
  const [terminalLine, setTerminalLine] = useState(0);
  const [glitchFlash, setGlitchFlash] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const launchTarget = new Date("2026-09-01T00:00:00");
  const countdown = useCountdown(launchTarget);

  useEffect(() => {
    const w = setInterval(() => setWhisperIdx((i) => (i + 1) % WHISPERS.length), 4000);
    return () => clearInterval(w);
  }, []);

  useEffect(() => {
    const t = setInterval(() => {
      setTerminalLine((l) => (l + 1) % TERMINAL_LINES.length);
      if (Math.random() > 0.7) {
        setGlitchFlash(true);
        setTimeout(() => setGlitchFlash(false), 120);
      }
    }, 2200);
    return () => clearInterval(t);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    let frame: number;
    let t = 0;

    const resize = () => {
      const dpr = window.devicePixelRatio || 1;
      const w = canvas.offsetWidth;
      const h = canvas.offsetHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    window.addEventListener("resize", resize);

    const draw = () => {
      const w = canvas.offsetWidth;
      const h = canvas.offsetHeight;
      ctx.clearRect(0, 0, w, h);
      const cy = h / 2;
      for (let i = 0; i < 64; i++) {
        const x = (i / 64) * w;
        const amp = Math.sin(t * 2 + i * 0.2) * 0.4 + Math.sin(t * 0.7 + i) * 0.3;
        const barH = (amp + 0.5) * (h * 0.35);
        ctx.fillStyle = `rgba(255,255,255,${0.04 + amp * 0.08})`;
        ctx.fillRect(x, cy - barH / 2, w / 64 - 1, barH);
      }
      t += 0.03;
      frame = requestAnimationFrame(draw);
    };
    draw();
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <div className="relative min-h-screen overflow-hidden">
      <WaitlistParticleField intensity={0.85} />

      {glitchFlash && (
        <div className="fixed inset-0 z-[45] bg-platinum/5 pointer-events-none mix-blend-overlay" />
      )}

      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4 py-28">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", delay: 0.2 }}
          className="mb-6 inline-flex items-center gap-2 px-4 py-2 rounded-full border border-platinum/40 bg-platinum/5 text-xs font-mono text-platinum"
        >
          <Radio className="w-4 h-4 animate-pulse" />
          SIGNAL NOT YET DEPLOYED
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="font-mono text-sm text-void-600 mb-4 text-center"
        >
          You requested: <span className="text-platinum font-bold">{feature}</span>
        </motion.p>

        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }}>
          <GlitchTitle text="COMING SOON" />
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="mt-6 text-center text-void-600 max-w-lg text-sm md:text-base"
        >
          You found a door that doesn&apos;t open yet. Good taste. We&apos;re building something
          nobody&apos;s seen — and you&apos;re on the list before it exists.
        </motion.p>

        <canvas
          ref={canvasRef}
          className="w-full max-w-2xl h-24 mt-10 mb-8 opacity-80"
          aria-hidden
        />

        <div className="grid grid-cols-4 gap-3 sm:gap-6 mb-10">
          {[
            { label: "DAYS", val: countdown.d },
            { label: "HRS", val: countdown.h },
            { label: "MIN", val: countdown.m },
            { label: "SEC", val: countdown.s },
          ].map(({ label, val }) => (
            <div key={label} className="glass rounded-xl px-4 py-3 sm:px-6 sm:py-4 text-center min-w-[4rem]">
              <p className="font-mono font-bold text-2xl sm:text-4xl text-platinum tabular-nums">
                {String(val).padStart(2, "0")}
              </p>
              <p className="text-[10px] font-mono text-void-600 mt-1">{label}</p>
            </div>
          ))}
        </div>

        <div className="glass-dark rounded-xl p-4 font-mono text-xs text-void-600 w-full max-w-md mb-8 border border-void-300/50 min-h-[3rem] flex items-center">
          <span className="text-platinum mr-2">$</span>
          <AnimatePresence mode="wait">
            <motion.span
              key={terminalLine}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
            >
              {TERMINAL_LINES[terminalLine]}
            </motion.span>
          </AnimatePresence>
        </div>

        <AnimatePresence mode="wait">
          <motion.p
            key={whisperIdx}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            className="text-center text-sm italic text-void-600 max-w-md mb-10 min-h-[3rem] flex items-center justify-center"
          >
            &ldquo;{WHISPERS[whisperIdx]}&rdquo;
          </motion.p>
        </AnimatePresence>

        <div className="flex flex-col sm:flex-row gap-4 relative z-20">
          <Link to="/waitlist">
            <Button variant="primary" size="lg" asSpan>
              <Sparkles className="w-5 h-5 mr-2" />
              Join The Waitlist
              <Zap className="w-5 h-5 ml-2" />
            </Button>
          </Link>
          <Link to="/">
            <Button variant="outline" size="lg" asSpan>
              Return Home
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </Link>
        </div>

        <motion.p
          animate={{ opacity: [0.4, 0.8, 0.4] }}
          transition={{ duration: 3, repeat: Infinity }}
          className="mt-12 text-[10px] font-mono text-void-700"
        >
          v0.∞ · classified · you weren&apos;t supposed to see this (but we&apos;re glad you did)
        </motion.p>
      </div>
    </div>
  );
}

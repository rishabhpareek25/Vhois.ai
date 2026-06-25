import { useCallback, useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowLeft,
  Fingerprint,
  Lock,
  Mic,
  Users,
  BarChart3,
  Cpu,
  Globe,
  Shield,
  Zap,
  Radio,
  Eye,
  Skull,
} from "lucide-react";
import Button from "../components/ui/Button";
import WaitlistParticleField from "../components/waitlist/WaitlistParticleField";

const BOOT_LINES = [
  "VHois SECURE CHANNEL v0.∞",
  "Scanning biometric curiosity... PASS",
  "Loading classified product matrices...",
  "WARNING: Reality may bend below",
  "Decrypting voice intelligence dossiers...",
  "ACCESS LEVEL: UNHINGED",
];

const DOSSIERS = [
  {
    id: "PACKET-Ω1",
    codename: "THE MOUTH OF THE MACHINE",
    title: "Voice API",
    icon: Mic,
    redacted: "████████ streaming pipeline that eats audio and spits truth in <100ms",
    revealed:
      "Real-time + batch voice processing. 50+ languages. Webhooks that actually webhook. Built for India’s code-switching chaos.",
    metric: "LATENCY: <100ms | UPTIME: 99.99%",
    clearance: 25,
  },
  {
    id: "PACKET-Ω2",
    codename: "THE GREAT SEPARATION",
    title: "Speaker Diarization",
    icon: Users,
    redacted: "████████ who spoke when, even when everyone talks at once",
    revealed:
      "Overlap detection. Speaker lanes. Confidence scores. Courtroom-grade ‘who said that’ energy for the real world.",
    metric: "ACCURACY: 99.2% | OVERLAP: YES",
    clearance: 40,
  },
  {
    id: "PACKET-Ω3",
    codename: "THE ALL-SEEING WAVEFORM",
    title: "Analytics Dashboard",
    icon: BarChart3,
    redacted: "████████ dashboards that judge your voice data aesthetically",
    revealed:
      "Live metrics, custom reports, exportable intelligence. See your signal strength like a stock market for sound.",
    metric: "REFRESH: REAL-TIME | DRILL-DOWN: ∞",
    clearance: 55,
  },
  {
    id: "PACKET-Ω4",
    codename: "BRAIN IN A JAR",
    title: "Custom Models",
    icon: Cpu,
    redacted: "████████ train AI on YOUR voices, YOUR domain, YOUR secrets",
    revealed:
      "Fine-tuning, transfer learning, proprietary datasets. Your dialect. Your courtroom. Your call center. Your rules.",
    metric: "TRAINING: PRIVATE | DEPLOY: EDGE",
    clearance: 70,
  },
  {
    id: "PACKET-Ω5",
    codename: "PLANET-SCALE SCREAM",
    title: "Global CDN",
    icon: Globe,
    redacted: "████████ edge nodes so audio never travels alone",
    revealed:
      "200+ edge locations. Auto-scale. Disaster recovery that recovers from disasters. Voice processed near the human, not near a datacenter in another timeline.",
    metric: "NODES: 200+ | SCALE: INFINITE",
    clearance: 85,
  },
  {
    id: "PACKET-Ω6",
    codename: "FORT KNOX FOR SOUND",
    title: "Enterprise Security",
    icon: Shield,
    redacted: "████████ encryption so paranoid it encrypts the encryption",
    revealed:
      "E2E encryption, PII redaction, SOC2 energy, zero-trust architecture. Your audio stays yours. We’re not even offended you asked.",
    metric: "COMPLIANCE: SOC2 | TRUST: ZERO",
    clearance: 100,
  },
];

const WHISPERS = [
  "Drag clearance. The government hates this one trick.",
  "Click dossiers to collect signal fragments.",
  "Hover redacted text. Classified hates mice.",
  "You weren’t supposed to find this page. We’re proud of you.",
  "India speaks in 700+ ways. We listen in all of them.",
];

function RedactedText({
  hidden,
  revealed,
  clearance,
  minClearance,
}: {
  hidden: string;
  revealed: string;
  clearance: number;
  minClearance: number;
}) {
  const unlocked = clearance >= minClearance;
  const [hover, setHover] = useState(false);

  return (
    <p
      className="text-sm leading-relaxed min-h-[3.5rem] cursor-crosshair"
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      {unlocked || hover ? (
        <motion.span
          initial={{ opacity: 0, filter: "blur(8px)" }}
          animate={{ opacity: 1, filter: "blur(0px)" }}
          className="text-void-600"
        >
          {revealed}
        </motion.span>
      ) : (
        <span className="font-mono text-void-700 tracking-widest select-none animate-pulse">
          {hidden}
        </span>
      )}
    </p>
  );
}

export default function ForbiddenProductVault() {
  const [booted, setBooted] = useState(false);
  const [bootLine, setBootLine] = useState(0);
  const [clearance, setClearance] = useState(8);
  const [collected, setCollected] = useState<Set<string>>(new Set());
  const [whisper, setWhisper] = useState(0);
  const [glitch, setGlitch] = useState(false);

  const [spot, setSpot] = useState({ x: 0, y: 0 });

  const fragments = collected.size;
  const clearanceLabel = useMemo(() => {
    if (clearance < 25) return "TOURIST";
    if (clearance < 50) return "INTERN";
    if (clearance < 75) return "OPERATIVE";
    if (clearance < 95) return "ARCHIVIST";
    return "VOICE ORACLE";
  }, [clearance]);

  const onMove = useCallback((e: React.MouseEvent) => {
    setSpot({ x: e.clientX, y: e.clientY });
  }, []);

  useEffect(() => {
    if (booted) return;
    const t = setInterval(() => {
      setBootLine((l) => {
        if (l >= BOOT_LINES.length - 1) {
          clearInterval(t);
          setTimeout(() => setBooted(true), 400);
          return l;
        }
        return l + 1;
      });
    }, 380);
    return () => clearInterval(t);
  }, [booted]);

  useEffect(() => {
    const w = setInterval(() => setWhisper((i) => (i + 1) % WHISPERS.length), 4200);
    const g = setInterval(() => {
      setGlitch(true);
      setTimeout(() => setGlitch(false), 120);
    }, 5000);
    return () => {
      clearInterval(w);
      clearInterval(g);
    };
  }, []);

  const collect = (id: string) => {
    setCollected((prev) => new Set(prev).add(id));
  };

  return (
    <div
      className="relative min-h-screen overflow-hidden bg-void text-platinum"
      onMouseMove={onMove}
    >
      <WaitlistParticleField intensity={clearance / 100} />

      {/* Mouse spotlight */}
      <div
        className="pointer-events-none fixed inset-0 z-[1] transition-opacity duration-300"
        style={{
          background: `radial-gradient(550px circle at ${spot.x}px ${spot.y}px, rgba(255,255,255,0.09), transparent 70%)`,
        }}
      />

      {/* Boot sequence */}
      <AnimatePresence>
        {!booted && (
          <motion.div
            exit={{ opacity: 0, scale: 1.1, filter: "blur(20px)" }}
            className="fixed inset-0 z-[100] bg-void flex items-center justify-center p-6"
            onClick={() => setBooted(true)}
          >
            <div className="max-w-lg w-full font-mono text-sm">
              <p className="text-void-600 mb-4 animate-pulse">█ SECURE BOOT, click to skip</p>
              {BOOT_LINES.slice(0, bootLine + 1).map((line, i) => (
                <motion.p
                  key={i}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  className={i === bootLine ? "text-platinum" : "text-void-600"}
                >
                  {">"} {line}
                </motion.p>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 pt-28 pb-24">
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-void-600 hover:text-platinum text-sm font-mono mb-10 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Escape to surface web
        </Link>

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <motion.p
            animate={{ opacity: [0.4, 1, 0.4] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="text-[10px] font-mono text-void-600 tracking-[0.4em] mb-4"
          >
            ● LIVE ● UNAUTHORIZED ● VHois INTERNAL ●
          </motion.p>

          <h1
            className={`font-mono font-bold text-4xl sm:text-6xl md:text-7xl leading-tight mb-4 ${
              glitch ? "animate-pulse" : ""
            }`}
          >
            <span className="text-gradient">THE FORBIDDEN</span>
            <br />
            <span className="text-platinum">PRODUCT ARCHIVE</span>
          </h1>

          <p className="text-void-600 max-w-xl mx-auto text-sm md:text-base min-h-[1.5rem]">
            {WHISPERS[whisper]}
          </p>

          <div className="flex flex-wrap justify-center gap-3 mt-6 text-[10px] font-mono text-void-700">
            <span className="px-3 py-1 border border-void-300 rounded-full">
              FRAGMENTS: {fragments}/{DOSSIERS.length}
            </span>
            <span className="px-3 py-1 border border-platinum/30 rounded-full text-platinum">
              CLEARANCE: {clearanceLabel}
            </span>
            <span className="px-3 py-1 border border-void-300 rounded-full flex items-center gap-1">
              <Radio className="w-3 h-3 animate-pulse" /> SIGNAL LOCKED
            </span>
          </div>
        </motion.div>

        {/* Clearance slider */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="glass-dark rounded-2xl p-6 sm:p-8 mb-12 border border-void-300/50"
        >
          <div className="flex items-center gap-3 mb-4">
            <Fingerprint className="w-6 h-6 text-platinum" />
            <div className="text-left">
              <p className="font-mono font-bold text-platinum text-sm">
                CLEARANCE SLIDER OF DOOM™
              </p>
              <p className="text-xs text-void-600">
                Drag right. The archive opens like a dramatic Netflix intro.
              </p>
            </div>
            <span className="ml-auto font-mono text-2xl font-bold text-platinum tabular-nums">
              {clearance}%
            </span>
          </div>
          <input
            type="range"
            min={0}
            max={100}
            value={clearance}
            onChange={(e) => setClearance(Number(e.target.value))}
            className="w-full h-2 bg-void-100 rounded-full appearance-none cursor-grab active:cursor-grabbing
              [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-5 [&::-webkit-slider-thumb]:h-5
              [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-platinum
              [&::-webkit-slider-thumb]:shadow-glow-white-lg"
          />
          <div className="flex justify-between text-[9px] font-mono text-void-700 mt-2">
            <span>NOBODY</span>
            <span>INTERN</span>
            <span>AGENT</span>
            <span>GOD MODE</span>
          </div>
        </motion.div>

        {/* Dossier grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {DOSSIERS.map((d, i) => {
            const Icon = d.icon;
            const isCollected = collected.has(d.id);
            const visible = clearance >= d.clearance - 30;

            return (
              <motion.article
                key={d.id}
                initial={{ opacity: 0, y: 40, rotateX: 15 }}
                animate={{ opacity: visible ? 1 : 0.35, y: 0, rotateX: 0 }}
                transition={{ delay: i * 0.08, type: "spring" }}
                whileHover={{ scale: 1.02, rotate: i % 2 === 0 ? -0.5 : 0.5 }}
                onClick={() => collect(d.id)}
                className={`relative glass rounded-2xl p-6 border cursor-pointer transition-all overflow-hidden group ${
                  isCollected
                    ? "border-platinum shadow-glow-white"
                    : "border-void-300/60 hover:border-platinum/40"
                }`}
              >
                {clearance < d.clearance && (
                  <div className="absolute top-3 right-3 flex items-center gap-1 text-[9px] font-mono text-void-600">
                    <Lock className="w-3 h-3" />
                    LVL {d.clearance}
                  </div>
                )}

                <div className="flex items-start gap-4 mb-4">
                  <motion.div
                    animate={isCollected ? { rotate: [0, 360] } : {}}
                    transition={{ duration: 0.8 }}
                    className="p-3 rounded-xl bg-platinum/10 border border-platinum/20"
                  >
                    <Icon className="w-7 h-7 text-platinum" />
                  </motion.div>
                  <div className="text-left">
                    <p className="text-[10px] font-mono text-void-600">{d.id}</p>
                    <p className="font-mono font-bold text-lg text-platinum">{d.title}</p>
                    <p className="text-xs text-void-500 italic">{d.codename}</p>
                  </div>
                </div>

                <RedactedText
                  hidden={d.redacted}
                  revealed={d.revealed}
                  clearance={clearance}
                  minClearance={d.clearance}
                />

                <AnimatePresence>
                  {clearance >= d.clearance && (
                    <motion.p
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0 }}
                      className="mt-4 text-[10px] font-mono text-platinum/80 border-t border-void-300/50 pt-3"
                    >
                      {d.metric}
                    </motion.p>
                  )}
                </AnimatePresence>

                {isCollected && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute bottom-3 right-3"
                  >
                    <Eye className="w-5 h-5 text-platinum" />
                  </motion.div>
                )}

                <div className="absolute inset-0 bg-gradient-to-br from-platinum/0 via-platinum/0 to-platinum/5 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
              </motion.article>
            );
          })}
        </div>

        {/* Finale */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-16 text-center glass-dark rounded-3xl p-10 border border-platinum/20 relative overflow-hidden"
        >
          <Skull className="w-12 h-12 text-void-600 mx-auto mb-4 opacity-30" />
          <h2 className="font-mono font-bold text-2xl md:text-4xl text-platinum mb-3">
            You decoded {fragments} of {DOSSIERS.length} packets.
          </h2>
          <p className="text-void-600 text-sm max-w-lg mx-auto mb-8">
            {fragments === DOSSIERS.length
              ? "Full clearance achieved. The universe acknowledges your curiosity. Now join the waitlist before we classify YOU."
              : "Collect all fragments. Or don’t. We’re a voice AI company, not a gamification startup. (Okay we’re both.)"}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/waitlist">
              <Button variant="primary" size="sm">
                <Zap className="w-5 h-5 mr-2" />
                Join The Signal
              </Button>
            </Link>
            <Link to="/">
              <Button variant="outline" size="sm">
                Return Home
              </Button>
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

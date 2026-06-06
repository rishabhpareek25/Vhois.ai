import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  Headphones,
  Eye,
  AlertTriangle,
  Shield,
  TrendingDown,
  TrendingUp,
  Radio,
  ArrowRight,
  Scan,
  Zap,
} from "lucide-react";
import Button from "../ui/Button";
import CallWaveCanvas from "../ccValidation/CallWaveCanvas";

const AGENTS = [
  { id: "A-07", name: "Priya S.", score: 94, risk: "low", flag: null },
  { id: "A-12", name: "Rahul M.", score: 41, risk: "critical", flag: "Rude tone @ 04:33" },
  { id: "A-23", name: "Anita K.", score: 78, risk: "medium", flag: "Script skip @ 02:14" },
  { id: "A-47", name: "Vikram P.", score: 31, risk: "critical", flag: "Compliance breach" },
  { id: "A-51", name: "Sneha R.", score: 88, risk: "low", flag: null },
  { id: "A-63", name: "Arjun D.", score: 62, risk: "high", flag: "Missed follow-up" },
];

const TRANSCRIPT_LINES = [
  { speaker: "CUSTOMER", text: "Haan main interested hoon, kal call karna...", lang: "Hinglish", flag: false },
  { speaker: "AGENT #47", text: "Theek hai sir, main note kar leta hoon.", lang: "Hindi", flag: false },
  { speaker: "SYSTEM", text: "⚠ Customer agreed — no CRM follow-up logged", lang: "AI", flag: true },
  { speaker: "AGENT #12", text: "Aapko baar baar batana padega kya?", lang: "Hinglish", flag: true },
  { speaker: "SYSTEM", text: "⚠ Misbehavior probability: 0.89", lang: "AI", flag: true },
];

const ALERTS = [
  "AGENT #47 skipped mandatory compliance line",
  "Interested customer — zero follow-up in CRM",
  "Hinglish escalation detected on Call #8821",
  "Agent marked 'not interested' — customer said yes",
];

export default function AgentSurveillanceShowcase() {
  const [coverage, setCoverage] = useState(4);
  const [alertIdx, setAlertIdx] = useState(0);
  const [lineIdx, setLineIdx] = useState(0);
  const [hoveredAgent, setHoveredAgent] = useState<string | null>(null);

  useEffect(() => {
    const cov = setInterval(() => {
      setCoverage((c) => (c >= 100 ? 4 : c + 1));
    }, 80);
    const alert = setInterval(() => setAlertIdx((i) => (i + 1) % ALERTS.length), 2800);
    const line = setInterval(() => setLineIdx((i) => (i + 1) % TRANSCRIPT_LINES.length), 2200);
    return () => {
      clearInterval(cov);
      clearInterval(alert);
      clearInterval(line);
    };
  }, []);

  const riskColor = (risk: string) => {
    if (risk === "critical") return "text-red-400 border-red-500/40 bg-red-500/10";
    if (risk === "high") return "text-amber-300 border-amber-500/30 bg-amber-500/10";
    if (risk === "medium") return "text-ash border-white/20 bg-white/5";
    return "text-emerald-300/90 border-emerald-500/25 bg-emerald-500/8";
  };

  return (
    <section className="relative py-28 px-6 overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(255,60,60,0.06),transparent_60%)] pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[radial-gradient(circle,rgba(255,255,255,0.03),transparent_70%)] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <motion.div
            animate={{ boxShadow: ["0 0 0px rgba(255,255,255,0)", "0 0 30px rgba(255,255,255,0.15)", "0 0 0px rgba(255,255,255,0)"] }}
            transition={{ duration: 3, repeat: Infinity }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-red-500/30 bg-red-500/10 text-red-300 text-xs font-mono mb-6"
          >
            <Eye className="w-3.5 h-3.5" />
            PMF VALIDATION · PILOT STAGE
          </motion.div>
          <h2 className="font-mono font-bold text-4xl md:text-6xl lg:text-7xl mb-4 leading-tight">
            <span className="text-gradient">Agent</span>{" "}
            <span className="text-platinum">Surveillance</span>
          </h2>
          <p className="text-void-600 text-lg md:text-xl max-w-3xl mx-auto leading-relaxed">
            Audit <strong className="text-platinum font-semibold">100% of call center conversations</strong> across
            Hindi, English, Hinglish & regional languages. Catch misbehavior, missed revenue, and compliance
            violations your QA team will never see.
          </p>
        </motion.div>

        {/* Main console */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="relative rounded-3xl border border-white/15 bg-gradient-to-br from-void-50/90 via-void-100/80 to-void overflow-hidden shadow-[0_0_80px_rgba(255,255,255,0.06)]"
        >
          <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-red-400/50 to-transparent" />

          {/* Console HUD */}
          <div className="flex flex-wrap items-center justify-between gap-3 px-5 sm:px-8 py-4 border-b border-white/10 bg-void/60">
            <div className="flex items-center gap-3">
              <motion.div
                animate={{ opacity: [1, 0.4, 1] }}
                transition={{ duration: 1.5, repeat: Infinity }}
                className="w-2 h-2 rounded-full bg-red-500 shadow-[0_0_12px_rgba(239,68,68,0.8)]"
              />
              <span className="font-mono text-xs text-platinum font-bold tracking-wider">
                VHois QA Pulse · Call Center Intelligence
              </span>
            </div>
            <div className="flex flex-wrap items-center gap-4 sm:gap-8 font-mono text-xs">
              <span className="text-void-600">
                Manual QA: <span className="text-red-400 font-bold">{Math.max(4, 100 - coverage)}%</span>
              </span>
              <span>
                AI Audit:{" "}
                <motion.span
                  key={coverage}
                  initial={{ scale: 1.2 }}
                  animate={{ scale: 1 }}
                  className="text-platinum font-bold"
                >
                  {coverage}%
                </motion.span>
              </span>
              <span className="hidden sm:inline text-emerald-400/80">● REC</span>
            </div>
          </div>

          <div className="grid lg:grid-cols-12 gap-0">
            {/* Agent grid */}
            <div className="lg:col-span-5 p-5 sm:p-6 border-b lg:border-b-0 lg:border-r border-white/10">
              <p className="text-[10px] font-mono text-ash/60 uppercase tracking-widest mb-4 flex items-center gap-2">
                <Scan className="w-3 h-3" />
                Agent risk matrix
              </p>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 sm:gap-3">
                {AGENTS.map((agent, i) => (
                  <motion.div
                    key={agent.id}
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.06 }}
                    onMouseEnter={() => setHoveredAgent(agent.id)}
                    onMouseLeave={() => setHoveredAgent(null)}
                    className={`relative rounded-xl border p-3 cursor-default transition-all ${
                      riskColor(agent.risk)
                    } ${hoveredAgent === agent.id ? "scale-105 shadow-glow-white z-10" : ""}`}
                  >
                    {agent.risk === "critical" && (
                      <motion.div
                        className="absolute inset-0 rounded-xl border border-red-500/50"
                        animate={{ opacity: [0.3, 0.8, 0.3] }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                      />
                    )}
                    <p className="text-[10px] font-mono opacity-60">{agent.id}</p>
                    <p className="text-sm font-semibold text-platinum truncate">{agent.name}</p>
                    <p className="font-mono text-2xl font-bold mt-1">{agent.score}</p>
                    <p className="text-[9px] font-mono uppercase opacity-70">{agent.risk}</p>
                  </motion.div>
                ))}
              </div>

              <div className="mt-4 h-24 hidden sm:block">
                <CallWaveCanvas intensity={coverage / 100} flagged={coverage > 50} />
              </div>
            </div>

            {/* Live transcript + alerts */}
            <div className="lg:col-span-7 p-5 sm:p-6 flex flex-col">
              <div className="flex-1 rounded-xl border border-white/10 bg-void/80 p-4 sm:p-5 mb-4 min-h-[200px] relative overflow-hidden">
                <div className="absolute inset-0 bg-[linear-gradient(transparent_50%,rgba(0,0,0,0.4)_50%)] bg-[length:100%_4px] opacity-20 pointer-events-none" />
                <p className="text-[10px] font-mono text-ash/50 uppercase tracking-widest mb-3">
                  Live call intercept · simulated
                </p>
                <AnimatePresence mode="wait">
                  <motion.div
                    key={lineIdx}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className={`font-mono text-sm sm:text-base ${TRANSCRIPT_LINES[lineIdx].flag ? "text-red-300" : "text-ash"}`}
                  >
                    <span className="text-platinum/70 text-xs block mb-1">
                      [{TRANSCRIPT_LINES[lineIdx].speaker}] · {TRANSCRIPT_LINES[lineIdx].lang}
                    </span>
                    {TRANSCRIPT_LINES[lineIdx].text}
                  </motion.div>
                </AnimatePresence>
              </div>

              <motion.div
                key={alertIdx}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex items-center gap-2 px-4 py-2.5 rounded-lg bg-red-500/10 border border-red-500/25 text-red-300 text-xs font-mono mb-4"
              >
                <AlertTriangle className="w-4 h-4 shrink-0" />
                {ALERTS[alertIdx]}
              </motion.div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {[
                  { icon: Shield, label: "Compliance", val: "AUTO" },
                  { icon: TrendingUp, label: "Agreements", val: "TRACKED" },
                  { icon: TrendingDown, label: "Bad calls", val: "FLAGGED" },
                  { icon: Radio, label: "Languages", val: "11+" },
                ].map(({ icon: Icon, label, val }) => (
                  <div
                    key={label}
                    className="rounded-lg border border-white/10 bg-white/[0.03] px-3 py-2.5 text-center"
                  >
                    <Icon className="w-4 h-4 text-platinum/60 mx-auto mb-1" />
                    <p className="text-[9px] font-mono text-ash/50 uppercase">{label}</p>
                    <p className="text-xs font-mono font-bold text-platinum">{val}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>

        {/* Insight chips + CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-10 flex flex-col items-center"
        >
          <div className="flex flex-wrap justify-center gap-2 mb-8">
            {[
              "Agent misbehavior detection",
              "Customer agreement tracking",
              "Script violation alerts",
              "Missed follow-up ID",
              "Supervisor coaching insights",
              "Search all calls",
            ].map((chip, i) => (
              <motion.span
                key={chip}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                className="text-xs font-mono px-3 py-1.5 rounded-full border border-white/15 bg-white/5 text-ash hover:text-platinum hover:border-white/30 transition-colors"
              >
                {chip}
              </motion.span>
            ))}
          </div>

          <Link to="/call-center-qa">
            <Button variant="primary" size="lg" className="group relative overflow-hidden">
              <motion.span
                className="absolute inset-0 bg-gradient-to-r from-red-500/20 via-white/10 to-red-500/20"
                animate={{ x: ["-100%", "100%"] }}
                transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
              />
              <span className="relative flex items-center gap-2">
                <Zap className="w-5 h-5" />
                Run Validation Scan — 2 min
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </span>
            </Button>
          </Link>
          <p className="text-[10px] font-mono text-void-700 mt-4">
            For Indian call centers · Pilot-ready · Share with your QA team
          </p>
        </motion.div>
      </div>
    </section>
  );
}

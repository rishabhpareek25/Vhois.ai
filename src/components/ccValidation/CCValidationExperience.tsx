import { useCallback, useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  Check,
  Headphones,
  Radio,
  Shield,
  Zap,
  AlertTriangle,
  Sparkles,
  Lock,
  Orbit,
} from "lucide-react";
import CallWaveCanvas from "./CallWaveCanvas";
import ModulesArmedPanel from "./ModulesArmedPanel";
import WaitlistParticleField from "../waitlist/WaitlistParticleField";
import {
  CC_QUESTIONS,
  TICKER_ALERTS,
  coverageFromQ6,
  computePilotScore,
} from "../../data/ccValidationQuestions";
import { useWaitlistAudio } from "../../hooks/useWaitlistAudio";
import { submitCCValidation, type CCValidationPayload } from "../../lib/ccValidationApi";

const BOOT_LINES = [
  "VHois BLACK BOX v2.0 — QA INTELLIGENCE",
  "Loading Hindi / Hinglish / regional acoustic models...",
  "Simulating 100% call audit pipeline...",
  "Agent misbehavior classifiers: ARMED",
  "Compliance script matchers: ONLINE",
  "Missed revenue detectors: PRIMED",
  "WARNING: This form will ruin manual QA forever",
];

type Answers = Record<string, string | string[]>;
type Contact = { name: string; company: string; role: string; phone: string; email: string; city: string };

export default function CCValidationExperience() {
  const { playTone } = useWaitlistAudio();
  const [booted, setBooted] = useState(false);
  const [bootLine, setBootLine] = useState(0);
  const [step, setStep] = useState(-1);
  const [answers, setAnswers] = useState<Answers>({});
  const [contact, setContact] = useState<Contact>({
    name: "",
    company: "",
    role: "",
    phone: "",
    email: "",
    city: "",
  });
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [pilotScore, setPilotScore] = useState(0);
  const [tickerIdx, setTickerIdx] = useState(0);
  const [scanFlash, setScanFlash] = useState(false);

  const totalSteps = CC_QUESTIONS.length;
  const progress = step < 0 ? 0 : ((step + 1) / totalSteps) * 100;
  const currentQ = step >= 0 ? CC_QUESTIONS[step] : null;

  const manualCoverage = useMemo(() => coverageFromQ6(answers.q6 as string), [answers.q6]);
  const auditCoverage = Math.min(100, manualCoverage + progress * 0.55);
  const intensity = step < 0 ? 0.65 : progress / 100;
  const flagged = currentQ?.id === "q8" || currentQ?.id === "q10" || currentQ?.id === "q11";

  useEffect(() => {
    if (!booted) return;
    const t = setInterval(() => setTickerIdx((i) => (i + 1) % TICKER_ALERTS.length), 3200);
    return () => clearInterval(t);
  }, [booted]);

  useEffect(() => {
    if (booted) return;
    if (bootLine >= BOOT_LINES.length) {
      const t = setTimeout(() => setBooted(true), 400);
      return () => clearTimeout(t);
    }
    const t = setTimeout(() => setBootLine((l) => l + 1), 520);
    return () => clearTimeout(t);
  }, [bootLine, booted]);

  const pulseScan = useCallback(() => {
    setScanFlash(true);
    setTimeout(() => setScanFlash(false), 500);
  }, []);

  const selectSingle = (qId: string, optId: string) => {
    playTone("select");
    pulseScan();
    setAnswers((a) => ({ ...a, [qId]: optId }));
  };

  const toggleMulti = (qId: string, optId: string, max?: number) => {
    playTone("select");
    setAnswers((a) => {
      const prev = (a[qId] as string[] | undefined) ?? [];
      if (prev.includes(optId)) {
        return { ...a, [qId]: prev.filter((x) => x !== optId) };
      }
      if (max && prev.length >= max) {
        playTone("error");
        return a;
      }
      pulseScan();
      return { ...a, [qId]: [...prev, optId] };
    });
  };

  const isAnswered = (q = currentQ) => {
    if (!q) return false;
    if (q.type === "contact") {
      return (
        contact.name.trim().length > 1 &&
        contact.company.trim().length > 1 &&
        contact.role.trim().length > 0 &&
        contact.phone.trim().length >= 8 &&
        contact.email.includes("@") &&
        contact.city.trim().length > 1
      );
    }
    if (q.type === "multi") {
      const v = answers[q.id];
      return Array.isArray(v) && v.length > 0;
    }
    return typeof answers[q.id] === "string" && (answers[q.id] as string).length > 0;
  };

  const goNext = () => {
    if (!isAnswered()) {
      playTone("error");
      return;
    }
    playTone("step");
    if (step < totalSteps - 1) setStep((s) => s + 1);
    else void handleSubmit();
  };

  const goBack = () => {
    playTone("type");
    if (step > 0) setStep((s) => s - 1);
    else if (step === 0) setStep(-1);
  };

  const handleSubmit = async () => {
    setError(null);
    setSubmitting(true);
    const score = computePilotScore(answers);
    setPilotScore(score);
    const payload: CCValidationPayload = {
      name: contact.name.trim(),
      company: contact.company.trim(),
      role: contact.role.trim(),
      phone: contact.phone.trim(),
      email: contact.email.toLowerCase().trim(),
      city: contact.city.trim(),
      answers,
      pilotReadinessScore: score,
      auditCoveragePct: Math.round(auditCoverage),
    };
    try {
      await submitCCValidation(payload);
      playTone("success");
      setSubmitted(true);
    } catch (e) {
      playTone("error");
      setError(e instanceof Error ? e.message : "Transmission failed");
    } finally {
      setSubmitting(false);
    }
  };

  if (!booted) {
    return (
      <div className="relative min-h-screen flex items-center justify-center px-6">
        <WaitlistParticleField intensity={0.3} />
        <div className="relative z-10 max-w-xl w-full font-mono text-sm space-y-2">
          {BOOT_LINES.slice(0, bootLine).map((line, i) => (
            <motion.p
              key={line}
              initial={{ opacity: 0, x: -8 }}
              animate={{ opacity: 1, x: 0 }}
              className={i === bootLine - 1 ? "text-platinum" : "text-ash/50"}
            >
              <span className="text-ash/40 mr-2">{">"}</span>
              {line}
            </motion.p>
          ))}
          <span className="inline-block w-2 h-4 bg-platinum animate-pulse ml-4" />
        </div>
      </div>
    );
  }

  if (submitted) {
    return (
      <div className="relative min-h-screen flex items-center justify-center px-6 py-20">
        <WaitlistParticleField intensity={0.85} />
        <motion.div
          initial={{ opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          className="relative z-10 max-w-2xl w-full text-center"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-white/20 bg-white/5 text-xs font-mono text-ash mb-8">
            <Lock className="w-3 h-3" />
            AUDIT PACKET SEALED
          </div>
          <h1 className="text-4xl md:text-6xl font-bold text-platinum mb-4 tracking-tight">
            Pilot channel open.
          </h1>
          <p className="text-ash text-lg mb-10 max-w-lg mx-auto">
            Your validation data is locked. We&apos;ll reach out within 24 hours with a sample audit
            blueprint tailored to your call center.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10">
            {[
              { label: "Pilot Readiness", value: `${pilotScore}%`, icon: Zap },
              { label: "Audit Coverage", value: "100%", icon: Shield },
              { label: "Languages", value: String((answers.q12 as string[])?.length ?? 0), icon: Radio },
            ].map(({ label, value, icon: Icon }) => (
              <div
                key={label}
                className="glass rounded-2xl p-6 border border-white/10"
              >
                <Icon className="w-5 h-5 text-ash mx-auto mb-3" />
                <p className="text-3xl font-bold text-platinum font-mono">{value}</p>
                <p className="text-xs text-ash/70 mt-1 uppercase tracking-wider">{label}</p>
              </div>
            ))}
          </div>
          <Link to="/" className="inline-block mt-8 group">
            <motion.div
              animate={{
                boxShadow: [
                  "0 0 0px rgba(255,255,255,0)",
                  "0 0 40px rgba(255,255,255,0.2)",
                  "0 0 0px rgba(255,255,255,0)",
                ],
              }}
              transition={{ duration: 2.5, repeat: Infinity }}
              className="relative overflow-hidden rounded-full border-2 border-platinum/40 bg-gradient-to-r from-void-100 via-platinum/10 to-void-100 px-8 py-4"
            >
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-12"
                animate={{ x: ["-120%", "220%"] }}
                transition={{ duration: 2.8, repeat: Infinity, ease: "linear" }}
              />
              <span className="relative flex items-center gap-3 font-mono font-bold text-platinum text-sm sm:text-base">
                <Orbit className="w-5 h-5 animate-spin" style={{ animationDuration: "4s" }} />
                Escape the Black Box → Vhois Home
                <Sparkles className="w-4 h-4 text-ash group-hover:text-platinum transition-colors" />
              </span>
            </motion.div>
          </Link>
          <p className="text-[10px] text-ash/50 font-mono mt-4">
            You survived the audit. The homepage has more chaos.
          </p>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen">
      <WaitlistParticleField intensity={intensity} />

      {/* HUD top bar */}
      <div className="sticky top-0 z-40 border-b border-white/5 bg-void/80 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-4 py-3 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center">
              <Headphones className="w-4 h-4 text-platinum" />
            </div>
            <div>
              <p className="text-xs font-mono text-ash/60">VHois BLACK BOX</p>
              <p className="text-sm font-semibold text-platinum">Contact Center QA Intelligence</p>
            </div>
          </div>
          <div className="flex items-center gap-6 font-mono text-xs">
            <div className="hidden sm:block text-ash/60">
              Manual QA: <span className="text-red-400/90">{manualCoverage}%</span>
            </div>
            <div>
              AI Audit:{" "}
              <span className="text-platinum font-bold">{Math.round(auditCoverage)}%</span>
            </div>
            <div className="text-ash/50">
              {step < 0 ? "STANDBY" : `${step + 1}/${totalSteps}`}
            </div>
          </div>
        </div>
        <div className="h-0.5 bg-void-200">
          <motion.div
            className="h-full bg-gradient-to-r from-white/20 via-platinum to-white/20"
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.4 }}
          />
        </div>
        <div className="overflow-hidden bg-red-500/5 border-t border-red-500/10 py-1">
          <motion.p
            key={tickerIdx}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center text-[10px] sm:text-xs font-mono text-red-300/80 px-4"
          >
            <AlertTriangle className="inline w-3 h-3 mr-2 -mt-0.5" />
            LIVE SIM — {TICKER_ALERTS[tickerIdx]}
          </motion.p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8 lg:py-12 grid lg:grid-cols-12 gap-8">
        {/* Left telemetry */}
        <div className="hidden lg:flex lg:col-span-3 flex-col gap-4">
          <div className="h-36">
            <CallWaveCanvas intensity={intensity} flagged={flagged} />
          </div>
          <ModulesArmedPanel progress={progress} introMode={step < 0} />
        </div>

        {/* Main stage */}
        <div className="lg:col-span-6">
          <AnimatePresence mode="wait">
            {step < 0 ? (
              <motion.div
                key="intro"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -16 }}
                className="text-center py-8 lg:py-16"
              >
                <motion.div
                  animate={{ rotate: [0, 2, -2, 0] }}
                  transition={{ duration: 6, repeat: Infinity }}
                  className="inline-flex items-center justify-center w-20 h-20 rounded-2xl border border-white/15 bg-white/5 mb-8"
                >
                  <Shield className="w-10 h-10 text-platinum" />
                </motion.div>
                <h1 className="text-3xl sm:text-5xl font-bold text-platinum mb-4 leading-tight">
                  Audit 100% of your calls.
                  <br />
                  <span className="text-ash/80">Before your competitors do.</span>
                </h1>
                <p className="text-ash max-w-xl mx-auto mb-3 leading-relaxed">
                  We&apos;re building AI that audits every customer call across Hindi, English,
                  Hinglish, and regional languages — surfacing agent misbehavior, missed revenue,
                  and compliance violations your QA team will never catch manually.
                </p>
                <p className="text-sm text-ash/50 font-mono mb-10">~2 minutes · 20 scans · zero boredom</p>
                <button
                  type="button"
                  onClick={() => {
                    playTone("step");
                    setStep(0);
                  }}
                  className="group inline-flex items-center gap-3 px-8 py-4 rounded-full bg-platinum text-void font-semibold hover:shadow-glow-white-lg transition-all"
                >
                  <Sparkles className="w-5 h-5 group-hover:rotate-12 transition-transform" />
                  Initiate QA Audit Scan
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </button>
              </motion.div>
            ) : currentQ ? (
              <motion.div
                key={currentQ.id}
                initial={{ opacity: 0, x: 40 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -40 }}
                transition={{ duration: 0.35 }}
                className="relative"
              >
                {scanFlash && (
                  <motion.div
                    initial={{ opacity: 0.4 }}
                    animate={{ opacity: 0 }}
                    className="absolute inset-0 bg-platinum/10 pointer-events-none rounded-2xl z-20"
                  />
                )}
                <div className="absolute -inset-px rounded-2xl bg-gradient-to-b from-white/10 to-transparent opacity-50 pointer-events-none" />
                <div className="relative glass rounded-2xl border border-white/10 p-6 sm:p-8 overflow-hidden">
                  <div
                    className="absolute inset-x-0 h-px bg-gradient-to-r from-transparent via-platinum/40 to-transparent animate-scan pointer-events-none"
                    style={{ animationDuration: "3s" }}
                  />
                  <div className="flex flex-wrap items-center gap-2 mb-6 font-mono text-[10px] sm:text-xs">
                    <span className="px-2 py-0.5 rounded bg-white/10 text-platinum">
                      PHASE {currentQ.phaseLabel}
                    </span>
                    <span className="text-ash/50">{currentQ.phase}</span>
                    <span className="text-ash/30 ml-auto">{currentQ.scanTag}</span>
                  </div>

                  <div className="flex items-start gap-4 mb-6">
                    <div className="p-3 rounded-xl bg-white/5 border border-white/10 shrink-0">
                      <currentQ.icon className="w-6 h-6 text-platinum" />
                    </div>
                    <div>
                      <p className="text-xs font-mono text-ash/50 mb-1">
                        SCAN {String(currentQ.number).padStart(2, "0")} / {totalSteps}
                      </p>
                      <h2 className="text-xl sm:text-2xl font-bold text-platinum leading-snug">
                        {currentQ.title}
                      </h2>
                      {currentQ.hint && (
                        <p className="text-sm text-ash/60 mt-2">{currentQ.hint}</p>
                      )}
                    </div>
                  </div>

                  {currentQ.type === "contact" ? (
                    <div className="grid sm:grid-cols-2 gap-4">
                      {(
                        [
                          ["name", "Name", "text"],
                          ["company", "Company name", "text"],
                          ["role", "Role", "text"],
                          ["phone", "Phone number", "tel"],
                          ["email", "Email", "email"],
                          ["city", "City", "text"],
                        ] as const
                      ).map(([key, label, type]) => (
                        <label key={key} className="block sm:col-span-1">
                          <span className="text-xs font-mono text-ash/50 uppercase tracking-wider">
                            {label}
                          </span>
                          <input
                            type={type}
                            value={contact[key]}
                            onChange={(e) => {
                              playTone("type");
                              setContact((c) => ({ ...c, [key]: e.target.value }));
                            }}
                            className="mt-1.5 w-full px-4 py-3 rounded-xl bg-void-100 border border-white/10 text-platinum placeholder:text-ash/30 focus:border-white/30 focus:outline-none focus:ring-1 focus:ring-white/20 transition-colors"
                            placeholder={label}
                          />
                        </label>
                      ))}
                    </div>
                  ) : currentQ.type === "multi" ? (
                    <div>
                      {currentQ.maxSelect && (
                        <p className="text-xs font-mono text-ash/50 mb-3">
                          {((answers[currentQ.id] as string[]) ?? []).length}/{currentQ.maxSelect}{" "}
                          intelligence modules selected
                        </p>
                      )}
                      <div className="grid sm:grid-cols-2 gap-2">
                        {currentQ.options?.map((opt) => {
                          const selected = ((answers[currentQ.id] as string[]) ?? []).includes(opt.id);
                          return (
                            <button
                              key={opt.id}
                              type="button"
                              onClick={() => toggleMulti(currentQ.id, opt.id, currentQ.maxSelect)}
                              className={`text-left px-4 py-3 rounded-xl border transition-all ${
                                selected
                                  ? "border-platinum/50 bg-white/10 text-platinum shadow-glow-white"
                                  : "border-white/8 bg-void-50/50 text-ash hover:border-white/20 hover:text-platinum"
                              }`}
                            >
                              <span className="flex items-start gap-2">
                                <span
                                  className={`mt-0.5 w-4 h-4 rounded border flex items-center justify-center shrink-0 ${
                                    selected ? "border-platinum bg-platinum" : "border-ash/40"
                                  }`}
                                >
                                  {selected && <Check className="w-3 h-3 text-void" />}
                                </span>
                                <span className="text-sm leading-snug">{opt.label}</span>
                              </span>
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  ) : (
                    <div className="grid sm:grid-cols-2 gap-2">
                      {currentQ.options?.map((opt) => {
                        const selected = answers[currentQ.id] === opt.id;
                        return (
                          <button
                            key={opt.id}
                            type="button"
                            onClick={() => selectSingle(currentQ.id, opt.id)}
                            className={`text-left px-4 py-3.5 rounded-xl border transition-all ${
                              selected
                                ? "border-platinum/50 bg-white/10 text-platinum shadow-glow-white scale-[1.02]"
                                : "border-white/8 bg-void-50/50 text-ash hover:border-white/20 hover:text-platinum"
                            }`}
                          >
                            <span className="flex items-center gap-3">
                              <span
                                className={`w-4 h-4 rounded-full border-2 shrink-0 ${
                                  selected ? "border-platinum bg-platinum" : "border-ash/40"
                                }`}
                              />
                              <span className="text-sm">{opt.label}</span>
                            </span>
                          </button>
                        );
                      })}
                    </div>
                  )}

                  {error && (
                    <p className="mt-4 text-sm text-red-400/90 font-mono">{error}</p>
                  )}

                  <div className="flex items-center justify-between mt-8 pt-6 border-t border-white/5">
                    <button
                      type="button"
                      onClick={goBack}
                      className="inline-flex items-center gap-2 text-sm text-ash hover:text-platinum transition-colors"
                    >
                      <ArrowLeft className="w-4 h-4" />
                      Back
                    </button>
                    <button
                      type="button"
                      onClick={goNext}
                      disabled={!isAnswered() || submitting}
                      className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-platinum text-void font-semibold disabled:opacity-40 disabled:cursor-not-allowed hover:shadow-glow-white transition-all"
                    >
                      {submitting
                        ? "Sealing packet..."
                        : step === totalSteps - 1
                          ? "Transmit validation"
                          : "Next scan"}
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </motion.div>
            ) : null}
          </AnimatePresence>
        </div>

        {/* Right panel */}
        <div className="hidden lg:flex lg:col-span-3 flex-col gap-4">
          <div className="glass rounded-xl p-5 border border-white/5">
            <p className="text-xs font-mono text-ash/50 uppercase mb-4">What you&apos;ll unlock</p>
            <ul className="space-y-3 text-sm text-ash">
              {[
                "Agent-wise performance scores",
                "Script violation detection",
                "Customer interest signals",
                "Rude language flags",
                "Missed follow-up alerts",
                "Searchable transcripts",
                "Daily manager reports",
              ].map((item) => (
                <li key={item} className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-platinum/60 shrink-0 mt-0.5" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <div className="glass rounded-xl p-5 border border-white/5 font-mono text-xs">
            <p className="text-ash/50 uppercase mb-2">PMF test preview</p>
            <p className="text-ash leading-relaxed">
              We process your last 1,000 calls and deliver: top 10 worst calls, top 10 best calls,
              highest-risk agents, missed follow-ups, and compliance skips.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

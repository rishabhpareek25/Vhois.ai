import { useEffect, useLayoutEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowRight,
  Check,
  Cpu,
  Globe,
  Mic,
  Shield,
  Sparkles,
  Users,
  Zap,
  BarChart3,
  Code2,
  Building2,
  Radio,
  Volume2,
} from "lucide-react";
import Button from "../ui/Button";
import ReactiveInputCanvas from "./ReactiveInputCanvas";
import WaitlistParticleField from "./WaitlistParticleField";
import SignalOrb from "./SignalOrb";
import FrequencyTuner from "./FrequencyTuner";
import AchievementToast from "./AchievementToast";
import SyncTransmissionOverlay from "./SyncTransmissionOverlay";
import LiveTranscriptPreview from "./LiveTranscriptPreview";
import { useWaitlistAudio } from "../../hooks/useWaitlistAudio";
import { submitWaitlist } from "../../lib/waitlistApi";

const ROLES = [
  { id: "developer", label: "Developer", icon: Code2, tag: "API-first" },
  { id: "enterprise", label: "Enterprise", icon: Building2, tag: "Scale & SLA" },
  { id: "creator", label: "Creator", icon: Mic, tag: "Content pipelines" },
  { id: "research", label: "Research", icon: Cpu, tag: "Custom models" },
];

const CAPABILITIES = [
  { id: "transcription", label: "Real-time Transcription", icon: Mic },
  { id: "diarization", label: "Speaker Diarization", icon: Users },
  { id: "api", label: "Voice API", icon: Zap },
  { id: "analytics", label: "Analytics Dashboard", icon: BarChart3 },
  { id: "security", label: "Enterprise Security", icon: Shield },
  { id: "global", label: "Global CDN", icon: Globe },
];

const SERVICE_BROADCAST = [
  { id: "transcription", title: "Sub-100ms Transcription", desc: "Live voice-to-text across 50+ languages.", metric: "<100ms", icon: Mic },
  { id: "diarization", title: "Speaker Diarization", desc: "Who spoke when — overlap + confidence.", metric: "99.2%", icon: Users },
  { id: "api", title: "Voice API", desc: "Streaming + batch + webhooks.", metric: "REST+WS", icon: Zap },
  { id: "analytics", title: "Signal Analytics", desc: "Dashboards & custom reports.", metric: "Live", icon: BarChart3 },
  { id: "security", title: "Zero-Trust Security", desc: "E2E encryption & PII redaction.", metric: "SOC2", icon: Shield },
  { id: "global", title: "Global Edge", desc: "200+ nodes, auto-scale.", metric: "99.99%", icon: Globe },
];

const ACHIEVEMENTS = [
  { title: "Frequency Locked", subtitle: "Wavelength handshake initiated" },
  { title: "Identity Decoded", subtitle: "Signal carrier identified" },
  { title: "Voice Profile Matched", subtitle: "Stack personalized to your role" },
  { title: "Capabilities Armed", subtitle: "Services primed for your use case" },
  { title: "Transmission Ready", subtitle: "Final packet queued" },
];

const STEPS = ["Signal Lock", "Identity", "Voice Profile", "Capabilities", "Transmission"];

type FormData = {
  name: string;
  email: string;
  role: string;
  capabilities: string[];
  company: string;
  useCase: string;
};

export default function WaitlistExperience() {
  const { playTone } = useWaitlistAudio();
  const [step, setStep] = useState(0);
  const [frequencyHz, setFrequencyHz] = useState(440);
  const [typingIntensity, setTypingIntensity] = useState(0);
  const [signalStrength, setSignalStrength] = useState(0);
  const [queuePosition, setQueuePosition] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const [syncing, setSyncing] = useState(false);
  const [syncPhase, setSyncPhase] = useState(0);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [achievement, setAchievement] = useState<{ title: string; subtitle: string } | null>(null);
  const [stepBurst, setStepBurst] = useState(false);
  const [form, setForm] = useState<FormData>({
    name: "",
    email: "",
    role: "",
    capabilities: [],
    company: "",
    useCase: "",
  });

  const frequencyLocked = frequencyHz >= 420 && frequencyHz <= 480;
  const intensity = signalStrength / 100;

  const unlockedServices = useMemo(() => {
    const base = ["transcription"];
    if (step >= 2 && form.role) base.push("diarization", "api");
    if (step >= 3) base.push(...form.capabilities);
    if (step >= 4) base.push("security", "global");
    return [...new Set(base)];
  }, [step, form.role, form.capabilities]);

  const activeBroadcast = SERVICE_BROADCAST.filter((s) => unlockedServices.includes(s.id));

  useEffect(() => {
    const strength =
      (frequencyLocked ? 12 : 0) +
      (form.name ? 15 : 0) +
      (form.email.includes("@") ? 20 : 0) +
      (form.role ? 20 : 0) +
      form.capabilities.length * 8 +
      (form.company ? 10 : 0) +
      (form.useCase.length > 10 ? 15 : 0) +
      step * 5;
    setSignalStrength(Math.min(100, strength));
  }, [form, step, frequencyLocked]);

  useEffect(() => {
    if (!achievement) return;
    const t = setTimeout(() => setAchievement(null), 2800);
    return () => clearTimeout(t);
  }, [achievement]);

  // Keep confirmation view anchored at top (form scroll position is not carried over)
  useLayoutEffect(() => {
    if (!submitted) return;
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
  }, [submitted]);

  const handleType = (value: string) => {
    setTypingIntensity(Math.min(1, value.length / 20));
    if (value.length % 3 === 0) playTone("type");
  };

  const showAchievement = (index: number) => {
    setAchievement(ACHIEVEMENTS[index]);
    setStepBurst(true);
    setTimeout(() => setStepBurst(false), 600);
    playTone("step");
  };

  const nextStep = () => {
    if (step === 0 && !frequencyLocked) {
      playTone("error");
      return;
    }
    showAchievement(step);
    setStep((s) => Math.min(s + 1, STEPS.length - 1));
  };

  const toggleCapability = (id: string) => {
    playTone("select");
    setForm((f) => ({
      ...f,
      capabilities: f.capabilities.includes(id)
        ? f.capabilities.filter((c) => c !== id)
        : [...f.capabilities, id],
    }));
  };

  const canProceed = () => {
    if (step === 0) return frequencyLocked;
    if (step === 1) return form.name.trim().length > 1 && form.email.includes("@");
    if (step === 2) return !!form.role;
    if (step === 3) return form.capabilities.length > 0;
    if (step === 4) return form.useCase.trim().length > 5;
    return false;
  };

  const runSyncAndSubmit = async () => {
    if (!canProceed()) {
      playTone("error");
      return;
    }
    setError(null);
    setSyncing(true);
    setSyncPhase(0);

    const phaseInterval = setInterval(() => {
      setSyncPhase((p) => Math.min(p + 1, 4));
    }, 700);

    await new Promise((r) => setTimeout(r, 3600));
    clearInterval(phaseInterval);

    setSubmitting(true);
    try {
      const result = await submitWaitlist({
        name: form.name,
        email: form.email,
        role: form.role,
        capabilities: form.capabilities,
        company: form.company,
        useCase: form.useCase,
        signalStrength,
        frequencyHz,
      });
      setQueuePosition(result.queuePosition);
      playTone("success");
      setSyncing(false);
      window.scrollTo({ top: 0, left: 0, behavior: "instant" });
      setSubmitted(true);
    } catch (e) {
      const msg = e instanceof Error ? e.message : "Submission failed";
      setError(msg);
      playTone("error");
      setSyncing(false);
      if (msg.includes("Already")) {
        const match = msg.match(/\d+/);
        if (match) setQueuePosition(Number(match[0]));
      }
    } finally {
      setSubmitting(false);
    }
  };

  if (submitted) {
    const firstName = form.name.split(" ")[0] || "Operator";
    return (
      <div className="relative min-h-[80vh] flex flex-col items-center justify-start z-10 pt-28 pb-16">
        <WaitlistParticleField intensity={1} />
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="relative max-w-3xl mx-auto text-center px-6 z-10 w-full"
        >
          {Array.from({ length: 40 }).map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-platinum rounded-full left-1/2 top-1/2"
              initial={{ x: 0, y: 0, opacity: 1 }}
              animate={{
                x: (Math.random() - 0.5) * 400,
                y: (Math.random() - 0.5) * 400,
                opacity: 0,
              }}
              transition={{ duration: 1.5, delay: i * 0.03 }}
            />
          ))}

          <motion.div
            animate={{ scale: [1, 1.05, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="w-28 h-28 mx-auto mb-8 rounded-full border-2 border-platinum flex items-center justify-center shadow-glow-white-lg"
          >
            <Radio className="w-12 h-12 text-platinum" />
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="font-mono font-bold text-4xl md:text-6xl mb-2 text-platinum"
          >
            {firstName}, you&apos;re{" "}
            <span className="text-gradient inline-block">IN.</span>
          </motion.h2>
          <p className="text-void-600 text-lg mb-10">
            Transmission confirmed. Welcome to the most exclusive voice signal on Earth.
          </p>

          <motion.div
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 200 }}
            className="glass rounded-2xl p-10 mb-8 inline-block border border-platinum/20"
          >
            <p className="text-xs font-mono text-void-600 mb-2">YOUR QUEUE COORDINATE</p>
            <p className="font-mono font-bold text-7xl text-platinum tabular-nums">#{queuePosition}</p>
            <p className="text-sm text-void-600 mt-4">Locked at {frequencyHz} Hz · Signal {signalStrength}%</p>
          </motion.div>

          <div className="flex flex-wrap justify-center gap-2 mb-6">
            {form.capabilities.map((c) => (
              <span
                key={c}
                className="text-xs font-mono px-3 py-1.5 rounded-full border border-platinum/30 text-platinum bg-platinum/5"
              >
                ✓ {CAPABILITIES.find((x) => x.id === c)?.label}
              </span>
            ))}
          </div>
          <p className="text-sm text-void-600">
            Saved to database · Confirmation for <span className="text-platinum">{form.email}</span>
          </p>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen overflow-hidden">
      <WaitlistParticleField intensity={intensity} />
      <SignalOrb strength={signalStrength} frequencyHz={frequencyHz} />

      <AnimatePresence>
        {syncing && <SyncTransmissionOverlay phase={syncPhase} />}
      </AnimatePresence>

      <AchievementToast
        title={achievement?.title ?? ""}
        subtitle={achievement?.subtitle ?? ""}
        visible={!!achievement}
      />

      <motion.div
        animate={stepBurst ? { x: [0, -4, 4, -2, 2, 0] } : {}}
        transition={{ duration: 0.4 }}
        className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 pt-24 pb-20"
      >
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-8">
          <motion.div
            animate={{ scale: [1, 1.02, 1] }}
            transition={{ duration: 3, repeat: Infinity }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-platinum/30 text-xs font-mono text-platinum mb-4 bg-platinum/5"
          >
            <Volume2 className="w-3.5 h-3.5" />
            IMMERSIVE WAITLIST · NOT A FORM
          </motion.div>
          <h1 className="font-mono font-bold text-4xl md:text-6xl mb-3">
            Enter The <span className="text-gradient">Signal</span>
          </h1>
          <p className="text-void-600 max-w-lg mx-auto text-sm md:text-base">
            Drag. Type. Choose. Transmit. Every action unlocks live previews of Vhois voice intelligence.
          </p>
        </motion.div>

        <div className="max-w-2xl mx-auto mb-8">
          <div className="flex justify-between text-xs font-mono text-void-600 mb-2">
            <span>SIGNAL STRENGTH</span>
            <span className="text-platinum">{signalStrength}%</span>
          </div>
          <div className="h-2 bg-void-100 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-void-500 via-platinum to-white"
              animate={{ width: `${signalStrength}%` }}
              transition={{ type: "spring" }}
            />
          </div>
          <div className="flex gap-1 mt-3">
            {STEPS.map((label, i) => (
              <button
                key={label}
                type="button"
                onClick={() => i < step && setStep(i)}
                className={`flex-1 text-[9px] sm:text-[10px] font-mono py-2 rounded-md transition-all ${
                  i === step
                    ? "text-void bg-platinum font-bold"
                    : i < step
                      ? "text-platinum bg-void-100"
                      : "text-void-700"
                }`}
              >
                {i + 1}. {label}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
          <motion.div
            layout
            className="glass-dark rounded-2xl p-6 sm:p-8 border border-void-300/50 min-h-[440px] relative overflow-hidden"
          >
            <motion.div
              className="absolute inset-0 pointer-events-none"
              animate={{ opacity: [0.03, 0.08, 0.03] }}
              transition={{ duration: 4, repeat: Infinity }}
              style={{
                background: "linear-gradient(135deg, transparent, rgba(255,255,255,0.06), transparent)",
              }}
            />

            <AnimatePresence mode="wait">
              {step === 0 && (
                <motion.div key="s0" initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -30 }} className="space-y-6 relative">
                  <p className="text-sm font-mono text-void-600">STAGE 00 · FREQUENCY LOCK</p>
                  <h2 className="font-mono text-2xl font-bold text-platinum">
                    Tune to the Vhois wavelength
                  </h2>
                  <p className="text-void-600 text-sm">
                    Drag the tuner into the <span className="text-platinum">420–480 Hz</span> sweet spot to unlock the signal. This is your voice fingerprint.
                  </p>
                  <FrequencyTuner value={frequencyHz} onChange={setFrequencyHz} locked={frequencyLocked} />
                  <ReactiveInputCanvas intensity={frequencyLocked ? 0.9 : 0.3} active={frequencyLocked} />
                  {frequencyLocked && (
                    <motion.p
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="text-center text-sm font-mono text-platinum"
                    >
                      ✦ Signal locked at {frequencyHz} Hz — you may proceed
                    </motion.p>
                  )}
                </motion.div>
              )}

              {step === 1 && (
                <motion.div key="s1" initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -30 }} className="space-y-5 relative">
                  <p className="text-sm font-mono text-void-600">STAGE 01 · IDENTITY</p>
                  <h2 className="font-mono text-xl font-bold text-platinum">Who&apos;s transmitting?</h2>
                  <ReactiveInputCanvas intensity={typingIntensity} active />
                  <input
                    value={form.name}
                    onChange={(e) => {
                      setForm((f) => ({ ...f, name: e.target.value }));
                      handleType(e.target.value);
                    }}
                    className="w-full px-4 py-3 bg-void-50 border border-void-300 rounded-lg text-platinum focus:outline-none focus:border-platinum focus:shadow-glow-white transition-all"
                    placeholder="Your name"
                  />
                  <input
                    type="email"
                    value={form.email}
                    onChange={(e) => {
                      setForm((f) => ({ ...f, email: e.target.value }));
                      handleType(e.target.value);
                    }}
                    className="w-full px-4 py-3 bg-void-50 border border-void-300 rounded-lg text-platinum focus:outline-none focus:border-platinum focus:shadow-glow-white transition-all"
                    placeholder="you@company.com"
                  />
                </motion.div>
              )}

              {step === 2 && (
                <motion.div key="s2" initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -30 }} className="space-y-5 relative">
                  <p className="text-sm font-mono text-void-600">STAGE 02 · VOICE PROFILE</p>
                  <h2 className="font-mono text-xl font-bold text-platinum">Pick your frequency archetype</h2>
                  <div className="grid grid-cols-2 gap-3">
                    {ROLES.map((role) => {
                      const Icon = role.icon;
                      const selected = form.role === role.id;
                      return (
                        <motion.button
                          key={role.id}
                          type="button"
                          whileHover={{ scale: 1.03, rotate: selected ? 0 : -1 }}
                          whileTap={{ scale: 0.97 }}
                          onClick={() => {
                            playTone("select");
                            setForm((f) => ({ ...f, role: role.id }));
                          }}
                          className={`p-4 rounded-xl border text-left transition-all ${
                            selected
                              ? "border-platinum bg-platinum/15 shadow-glow-white scale-[1.02]"
                              : "border-void-300 hover:border-void-500"
                          }`}
                        >
                          <Icon className={`w-6 h-6 mb-2 ${selected ? "text-platinum" : "text-void-600"}`} />
                          <p className="font-mono font-bold text-sm text-platinum">{role.label}</p>
                          <p className="text-[10px] text-void-600">{role.tag}</p>
                        </motion.button>
                      );
                    })}
                  </div>
                </motion.div>
              )}

              {step === 3 && (
                <motion.div key="s3" initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -30 }} className="space-y-5 relative">
                  <p className="text-sm font-mono text-void-600">STAGE 03 · CAPABILITIES</p>
                  <h2 className="font-mono text-xl font-bold text-platinum">Arm your stack</h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {CAPABILITIES.map((cap) => {
                      const Icon = cap.icon;
                      const on = form.capabilities.includes(cap.id);
                      return (
                        <motion.button
                          key={cap.id}
                          type="button"
                          whileTap={{ scale: 0.95 }}
                          onClick={() => toggleCapability(cap.id)}
                          className={`flex items-center gap-3 p-3 rounded-lg border text-left text-sm ${
                            on ? "border-platinum bg-platinum/10" : "border-void-300"
                          }`}
                        >
                          <Icon className={`w-4 h-4 ${on ? "text-platinum" : "text-void-600"}`} />
                          <span className={on ? "text-platinum font-medium" : "text-void-600"}>{cap.label}</span>
                          {on && <Check className="w-4 h-4 ml-auto" />}
                        </motion.button>
                      );
                    })}
                  </div>
                </motion.div>
              )}

              {step === 4 && (
                <motion.div key="s4" initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -30 }} className="space-y-5 relative">
                  <p className="text-sm font-mono text-void-600">STAGE 04 · TRANSMISSION</p>
                  <h2 className="font-mono text-xl font-bold text-platinum">Final packet</h2>
                  <LiveTranscriptPreview text={form.useCase} />
                  <input
                    value={form.company}
                    onChange={(e) => setForm((f) => ({ ...f, company: e.target.value }))}
                    className="w-full px-4 py-3 bg-void-50 border border-void-300 rounded-lg text-platinum focus:outline-none focus:border-platinum"
                    placeholder="Company (optional)"
                  />
                  <textarea
                    value={form.useCase}
                    onChange={(e) => {
                      setForm((f) => ({ ...f, useCase: e.target.value }));
                      handleType(e.target.value);
                    }}
                    rows={3}
                    className="w-full px-4 py-3 bg-void-50 border border-void-300 rounded-lg text-platinum focus:outline-none focus:border-platinum resize-none"
                    placeholder="Describe your voice AI use case..."
                  />
                </motion.div>
              )}
            </AnimatePresence>

            {error && (
              <p className="mt-4 text-sm text-red-400 font-mono">{error}</p>
            )}

            <div className="flex items-center justify-between mt-8 pt-6 border-t border-void-300/50 relative">
              <button
                type="button"
                onClick={() => step > 0 && setStep(step - 1)}
                disabled={step === 0}
                className="text-sm text-void-600 hover:text-platinum disabled:opacity-30"
              >
                ← Back
              </button>
              {step < STEPS.length - 1 ? (
                <Button variant="primary" size="md" onClick={nextStep} disabled={!canProceed()}>
                  Continue <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              ) : (
                <Button
                  variant="primary"
                  size="md"
                  onClick={runSyncAndSubmit}
                  disabled={!canProceed() || submitting}
                  loading={submitting}
                >
                  Transmit Signal <Zap className="w-4 h-4 ml-2" />
                </Button>
              )}
            </div>
          </motion.div>

          <div className="lg:sticky lg:top-24 space-y-4">
            <div className="glass rounded-2xl p-6 border border-void-300/40 relative overflow-hidden">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <p className="text-xs font-mono text-void-600">LIVE BROADCAST</p>
                  <h3 className="font-mono font-bold text-lg text-platinum">Your Vhois Stack</h3>
                </div>
                <span className="flex items-center gap-1.5 text-xs font-mono text-platinum">
                  <motion.span
                    animate={{ opacity: [1, 0.3, 1] }}
                    transition={{ duration: 1, repeat: Infinity }}
                    className="w-2 h-2 rounded-full bg-platinum"
                  />
                  LIVE
                </span>
              </div>
              <div className="space-y-2 max-h-[400px] overflow-y-auto">
                <AnimatePresence>
                  {activeBroadcast.map((s, i) => {
                    const Icon = s.icon;
                    return (
                      <motion.div
                        key={s.id}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.06 }}
                        className="p-3 rounded-xl border border-void-300/50 bg-void-50/40 flex gap-3"
                      >
                        <Icon className="w-5 h-5 text-platinum shrink-0 mt-0.5" />
                        <div>
                          <p className="font-mono text-sm font-bold text-platinum">{s.title}</p>
                          <p className="text-[11px] text-void-600">{s.desc}</p>
                        </div>
                      </motion.div>
                    );
                  })}
                </AnimatePresence>
              </div>
            </div>

            <div className="glass rounded-xl p-4 border border-void-300/30 font-mono text-xs text-void-600 space-y-1">
              <p>UNLOCKED: {activeBroadcast.length} / {SERVICE_BROADCAST.length} modules</p>
              <p>FREQ: {frequencyHz} Hz</p>
              <p>ROLE: {form.role || "—"}</p>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

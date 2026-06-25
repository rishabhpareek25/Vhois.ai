import { useLayoutEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowRight,
  Check,
  Code2,
  Building2,
  Mic,
  Cpu,
  Users,
  Zap,
  BarChart3,
  Shield,
  Globe,
  Radio,
} from "lucide-react";
import Button from "../ui/Button";
import WaitlistParticleField from "./WaitlistParticleField";
import { useWaitlistAudio } from "../../hooks/useWaitlistAudio";
import { submitWaitlist } from "../../lib/waitlistApi";

const ROLES = [
  { id: "developer", label: "Developer", icon: Code2 },
  { id: "enterprise", label: "Enterprise", icon: Building2 },
  { id: "creator", label: "Creator", icon: Mic },
  { id: "research", label: "Research", icon: Cpu },
];

const CAPABILITIES = [
  { id: "transcription", label: "Transcription", icon: Mic },
  { id: "diarization", label: "Diarization", icon: Users },
  { id: "api", label: "Voice API", icon: Zap },
  { id: "analytics", label: "Analytics", icon: BarChart3 },
  { id: "security", label: "Security", icon: Shield },
  { id: "global", label: "Edge / scale", icon: Globe },
];

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
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [queuePosition, setQueuePosition] = useState(0);
  const [form, setForm] = useState<FormData>({
    name: "",
    email: "",
    role: "",
    capabilities: [],
    company: "",
    useCase: "",
  });

  useLayoutEffect(() => {
    if (submitted) window.scrollTo({ top: 0, left: 0, behavior: "instant" });
  }, [submitted]);

  const toggleCapability = (id: string) => {
    playTone("select");
    setForm((f) => ({
      ...f,
      capabilities: f.capabilities.includes(id)
        ? f.capabilities.filter((c) => c !== id)
        : [...f.capabilities, id],
    }));
  };

  const canProceedStep0 =
    form.name.trim().length > 1 && form.email.includes("@") && !!form.role;
  const canSubmit = form.capabilities.length > 0 && form.useCase.trim().length > 5;

  const handleSubmit = async () => {
    if (!canSubmit) {
      playTone("error");
      return;
    }
    setError(null);
    setSubmitting(true);
    try {
      const result = await submitWaitlist({
        name: form.name,
        email: form.email,
        role: form.role,
        capabilities: form.capabilities,
        company: form.company,
        useCase: form.useCase,
        signalStrength: 100,
        frequencyHz: 440,
      });
      setQueuePosition(result.queuePosition);
      playTone("success");
      setSubmitted(true);
    } catch (e) {
      playTone("error");
      setError(e instanceof Error ? e.message : "Submission failed");
    } finally {
      setSubmitting(false);
    }
  };

  if (submitted) {
    const firstName = form.name.split(" ")[0] || "there";
    return (
      <div className="relative min-h-[80vh] flex flex-col items-center justify-start z-10 pt-28 pb-16 px-6">
        <WaitlistParticleField intensity={0.6} />
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative z-10 max-w-lg w-full text-center"
        >
          <div className="w-16 h-16 mx-auto mb-8 rounded-full border border-white/20 flex items-center justify-center">
            <Check className="w-7 h-7 text-platinum" strokeWidth={1.5} />
          </div>
          <h2 className="font-sans font-semibold text-3xl md:text-4xl text-platinum mb-3 tracking-tight">
            You&apos;re on the list, {firstName}.
          </h2>
          <p className="text-void-600 text-base leading-relaxed mb-8">
            We&apos;ll email <span className="text-platinum">{form.email}</span> when your access
            window opens. Queue position{" "}
            <span className="font-mono text-platinum">#{queuePosition}</span>.
          </p>
          <div className="flex flex-wrap justify-center gap-2">
            {form.capabilities.map((c) => (
              <span
                key={c}
                className="text-xs px-3 py-1 rounded-full border border-white/15 text-void-600"
              >
                {CAPABILITIES.find((x) => x.id === c)?.label}
              </span>
            ))}
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen overflow-hidden">
      <WaitlistParticleField intensity={0.35} />

      <div className="relative z-10 max-w-xl mx-auto px-6 pt-28 pb-20">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-10"
        >
          <p className="text-[11px] font-mono uppercase tracking-[0.22em] text-void-600 mb-4">
            Early access
          </p>
          <h1 className="font-sans font-semibold text-4xl md:text-5xl text-platinum tracking-tight mb-3">
            Join the waitlist
          </h1>
          <p className="text-void-600 text-base leading-relaxed">
            Two quick steps. No frequency tuning required; we save the crazy stuff for the product.
          </p>
        </motion.div>

        {/* Progress */}
        <div className="flex gap-2 mb-8">
          {["About you", "Your use case"].map((label, i) => (
            <button
              key={label}
              type="button"
              onClick={() => i < step && setStep(i)}
              className={`flex-1 py-2.5 text-xs font-mono rounded-lg border transition-colors ${
                i === step
                  ? "border-white/25 bg-white/[0.06] text-platinum"
                  : i < step
                    ? "border-white/10 text-void-600 hover:text-platinum cursor-pointer"
                    : "border-white/[0.04] text-void-700 cursor-default"
              }`}
            >
              {i + 1}. {label}
            </button>
          ))}
        </div>

        <motion.div
          layout
          className="rounded-2xl border border-white/[0.08] bg-void-50/60 backdrop-blur-sm p-6 sm:p-8"
        >
          <AnimatePresence mode="wait">
            {step === 0 ? (
              <motion.div
                key="step0"
                initial={{ opacity: 0, x: 12 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -12 }}
                className="space-y-5"
              >
                <div>
                  <label className="block text-xs font-mono text-void-600 mb-2 uppercase tracking-wider">
                    Name
                  </label>
                  <input
                    value={form.name}
                    onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                    className="w-full px-4 py-3 bg-void/50 border border-white/[0.08] rounded-xl text-platinum placeholder:text-void-700 focus:outline-none focus:border-white/25 transition-colors"
                    placeholder="Your name"
                    autoComplete="name"
                  />
                </div>
                <div>
                  <label className="block text-xs font-mono text-void-600 mb-2 uppercase tracking-wider">
                    Work email
                  </label>
                  <input
                    type="email"
                    value={form.email}
                    onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
                    className="w-full px-4 py-3 bg-void/50 border border-white/[0.08] rounded-xl text-platinum placeholder:text-void-700 focus:outline-none focus:border-white/25 transition-colors"
                    placeholder="you@company.com"
                    autoComplete="email"
                  />
                </div>
                <div>
                  <label className="block text-xs font-mono text-void-600 mb-2 uppercase tracking-wider">
                    Company
                  </label>
                  <input
                    value={form.company}
                    onChange={(e) => setForm((f) => ({ ...f, company: e.target.value }))}
                    className="w-full px-4 py-3 bg-void/50 border border-white/[0.08] rounded-xl text-platinum placeholder:text-void-700 focus:outline-none focus:border-white/25 transition-colors"
                    placeholder="Optional"
                    autoComplete="organization"
                  />
                </div>
                <div>
                  <label className="block text-xs font-mono text-void-600 mb-3 uppercase tracking-wider">
                    I am a…
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    {ROLES.map((role) => {
                      const Icon = role.icon;
                      const selected = form.role === role.id;
                      return (
                        <button
                          key={role.id}
                          type="button"
                          onClick={() => {
                            playTone("select");
                            setForm((f) => ({ ...f, role: role.id }));
                          }}
                          className={`flex items-center gap-2.5 p-3.5 rounded-xl border text-left transition-all ${
                            selected
                              ? "border-white/30 bg-white/[0.06] text-platinum"
                              : "border-white/[0.06] text-void-600 hover:border-white/15"
                          }`}
                        >
                          <Icon className="w-4 h-4 shrink-0" strokeWidth={1.5} />
                          <span className="text-sm font-medium">{role.label}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="step1"
                initial={{ opacity: 0, x: 12 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -12 }}
                className="space-y-5"
              >
                <div>
                  <label className="block text-xs font-mono text-void-600 mb-3 uppercase tracking-wider">
                    What do you need?
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    {CAPABILITIES.map((cap) => {
                      const Icon = cap.icon;
                      const on = form.capabilities.includes(cap.id);
                      return (
                        <button
                          key={cap.id}
                          type="button"
                          onClick={() => toggleCapability(cap.id)}
                          className={`flex items-center gap-2 p-3 rounded-xl border text-left text-sm transition-all ${
                            on
                              ? "border-white/30 bg-white/[0.06] text-platinum"
                              : "border-white/[0.06] text-void-600 hover:border-white/15"
                          }`}
                        >
                          <Icon className="w-3.5 h-3.5 shrink-0" strokeWidth={1.5} />
                          <span>{cap.label}</span>
                          {on && <Check className="w-3.5 h-3.5 ml-auto" />}
                        </button>
                      );
                    })}
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-mono text-void-600 mb-2 uppercase tracking-wider">
                    Tell us about your use case
                  </label>
                  <textarea
                    value={form.useCase}
                    onChange={(e) => setForm((f) => ({ ...f, useCase: e.target.value }))}
                    rows={4}
                    className="w-full px-4 py-3 bg-void/50 border border-white/[0.08] rounded-xl text-platinum placeholder:text-void-700 focus:outline-none focus:border-white/25 resize-none transition-colors"
                    placeholder="e.g. auditing 200 agent calls/day in Hindi and Hinglish…"
                  />
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {error && <p className="mt-4 text-sm text-red-400">{error}</p>}

          <div className="flex items-center justify-between mt-8 pt-6 border-t border-white/[0.06]">
            <button
              type="button"
              onClick={() => step > 0 && setStep(0)}
              disabled={step === 0}
              className="text-sm text-void-600 hover:text-platinum disabled:opacity-30 transition-colors"
            >
              Back
            </button>
            {step === 0 ? (
              <Button
                variant="primary"
                size="md"
                onClick={() => {
                  if (!canProceedStep0) {
                    playTone("error");
                    return;
                  }
                  playTone("step");
                  setStep(1);
                }}
                disabled={!canProceedStep0}
              >
                Continue
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            ) : (
              <Button
                variant="primary"
                size="md"
                onClick={handleSubmit}
                disabled={!canSubmit || submitting}
                loading={submitting}
              >
                <Radio className="w-4 h-4 mr-2" />
                Join waitlist
              </Button>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  );
}

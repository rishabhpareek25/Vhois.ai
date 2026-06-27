import { motion } from "framer-motion";

const LOSS = [
  "Recordings pile up. Nobody listens",
  "QA samples 2–5% and hopes for the best",
  "Hinglish & accents get misread",
  "Disputes with zero evidence trail",
];

const GAIN = [
  "100% of conversations processed",
  "Who spoke · what mattered · what next",
  "Built for noisy, real-world audio",
  "Search, audit, export on demand",
];

export default function ProblemSolution() {
  return (
    <section className="relative pt-6 sm:pt-8 pb-10 sm:pb-12 overflow-hidden">
      <div className="absolute inset-0 bg-[linear-gradient(180deg,transparent,rgba(255,60,50,0.03)_50%,transparent)]" />

      <div className="page-bleed relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-8 sm:mb-10 max-w-2xl"
        >
          <p className="text-[10px] font-mono uppercase tracking-[0.12em] text-tertiary mb-3">
            The problem: missed signals
          </p>
          <h2 className="font-display font-bold text-2xl sm:text-[1.75rem] md:text-3xl text-primary tracking-[-0.02em] leading-[1.15]">
            Documents get archived.
            <br />
            <span className="text-ember">Conversations don&apos;t.</span>
          </h2>
        </motion.div>

        <div className="relative grid grid-cols-1 lg:grid-cols-2 gap-0 border-y border-white/[0.08]">
          <div className="split-panel-loss relative py-7 sm:py-8 px-4 sm:px-6 lg:pr-8 lg:pl-4 border-b lg:border-b-0 lg:border-r border-white/[0.06]">
            <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-red-300 mb-5">
              Without intelligence
            </p>
            <ul className="space-y-4 sm:space-y-5">
              {LOSS.map((line, i) => (
                <motion.li
                  key={line}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08 }}
                  className="group flex items-baseline gap-4"
                >
                  <span className="font-mono text-xs text-red-400/60 tabular-nums">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="font-display text-sm sm:text-base md:text-lg text-red-200/75 group-hover:text-red-100/90 transition-colors leading-snug line-through decoration-red-400/50 decoration-1">
                    {line}
                  </span>
                </motion.li>
              ))}
            </ul>
          </div>

          <div className="split-panel-gain relative py-7 sm:py-8 px-4 sm:px-6 lg:pl-8 lg:pr-4">
            <p className="font-mono text-[10px] uppercase tracking-[0.12em] text-primary mb-5">
              What Vhois delivers
            </p>
            <ul className="space-y-4 sm:space-y-5">
              {GAIN.map((line, i) => (
                <motion.li
                  key={line}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08 }}
                  className="group flex items-baseline gap-4"
                >
                  <span className="font-mono text-xs text-white/40 tabular-nums">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="font-display text-sm sm:text-base md:text-lg text-primary group-hover:text-luminous transition-all leading-snug">
                    {line}
                  </span>
                </motion.li>
              ))}
            </ul>
          </div>

          <div className="hidden lg:block absolute left-1/2 top-8 bottom-8 w-px -translate-x-1/2 bg-gradient-to-b from-transparent via-white/30 to-transparent" />
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-7 sm:mt-8 text-center text-sm sm:text-base text-secondary max-w-xl mx-auto leading-relaxed"
        >
          Not just transcripts.{" "}
          <span className="text-primary font-medium">structured intelligence</span> your ops, QA,
          and leadership teams can act on.
        </motion.p>
      </div>
    </section>
  );
}

const PIPELINE = [
  {
    step: "01",
    title: "Ingest",
    line: "Calls · meetings · uploads",
    detail: "Multilingual, noisy, real-world Indian audio.",
  },
  {
    step: "02",
    title: "Understand",
    line: "Speakers · topics · signals",
    detail: "Transcription, diarization, compliance flags, QA scores.",
  },
  {
    step: "03",
    title: "Act",
    line: "Search · audit · alert",
    detail: "Evidence-backed records, not forgotten recordings.",
  },
];

export function HowItWorksStrip() {
  return (
    <section className="relative py-10 sm:py-12 border-t border-white/[0.06]">
      <div className="page-bleed">
        <div className="mb-8 sm:mb-10">
          <p className="text-[10px] font-mono uppercase tracking-[0.28em] text-tertiary mb-3">
            What we build
          </p>
          <h2 className="font-display font-bold text-2xl sm:text-3xl md:text-[2rem] text-primary tracking-[-0.02em]">
            Three layers of{" "}
            <span className="text-signal">conversation intelligence</span>
          </h2>
        </div>

        <div className="relative">
          <div className="hidden md:block absolute top-[2.75rem] left-[10%] right-[10%] pipeline-line" />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-6">
            {PIPELINE.map((item, i) => (
              <motion.div
                key={item.step}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="relative text-center md:text-left"
              >
                <div className="inline-flex md:flex items-center justify-center md:justify-start gap-3 mb-5">
                  <span className="flex h-11 w-11 items-center justify-center rounded-full border border-white/20 bg-void-50 text-sm font-mono text-primary shadow-[0_0_24px_rgba(255,255,255,0.08)]">
                    {item.step}
                  </span>
                </div>
                <h3 className="font-display font-bold text-2xl sm:text-3xl text-primary mb-1">
                  {item.title}
                </h3>
                <p className="font-mono text-xs text-tertiary uppercase tracking-wider mb-3">
                  {item.line}
                </p>
                <p className="text-secondary text-sm sm:text-base leading-relaxed max-w-xs mx-auto md:mx-0">
                  {item.detail}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

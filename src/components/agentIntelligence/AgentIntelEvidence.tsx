import { motion } from "framer-motion";
import { Play, FileText, Clock } from "lucide-react";
import { EVIDENCE_TIMELINE } from "../../data/agentIntelligenceContent";

const TYPE_STYLES = {
  positive: "border-emerald-500/30 bg-emerald-500/10 text-emerald-300",
  risk: "border-amber-500/30 bg-amber-500/10 text-amber-300",
  neutral: "border-white/20 bg-white/5 text-platinum",
  critical: "border-red-500/40 bg-red-500/15 text-red-300",
} as const;

export default function AgentIntelEvidence() {
  return (
    <section className="relative py-16 sm:py-24">
      <div className="page-bleed">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14 items-start">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <p className="text-[11px] font-mono uppercase tracking-[0.2em] text-void-600 mb-4">
              Evidence-based AI
            </p>
            <h2 className="font-sans font-semibold text-3xl sm:text-4xl text-platinum tracking-tight mb-5 leading-tight">
              Every finding ships with proof
            </h2>
            <p className="text-void-600 text-base leading-relaxed mb-6">
              No black-box scores. Each insight links to a timestamp, transcript snippet, and audio
              clip, so managers can coach with confidence, not guesswork.
            </p>
            <div className="flex flex-wrap gap-3">
              {[
                { icon: Clock, label: "Timestamp" },
                { icon: FileText, label: "Transcript" },
                { icon: Play, label: "Audio clip" },
              ].map(({ icon: Icon, label }) => (
                <span
                  key={label}
                  className="inline-flex items-center gap-2 px-3 py-2 rounded-lg border border-white/10 text-xs font-mono text-void-600"
                >
                  <Icon className="w-3.5 h-3.5" strokeWidth={1.5} />
                  {label}
                </span>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative rounded-xl sm:rounded-2xl border border-white/[0.08] bg-void-50/60 p-5 sm:p-6"
          >
            <p className="text-[10px] font-mono text-void-600 mb-5 uppercase tracking-wider">
              Call #8821 · timeline
            </p>

            <div className="relative pl-6 border-l border-white/10 space-y-5">
              {EVIDENCE_TIMELINE.map((pin, i) => (
                <motion.div
                  key={pin.time}
                  initial={{ opacity: 0, x: 12 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08 }}
                  className="relative"
                >
                  <span className="absolute -left-[1.65rem] top-1 w-3 h-3 rounded-full border-2 border-void bg-platinum/80" />
                  <div className="flex flex-wrap items-center gap-2 mb-1.5">
                    <span className="font-mono text-xs text-platinum">{pin.time}</span>
                    <span
                      className={`text-[9px] font-mono uppercase px-2 py-0.5 rounded-full border ${TYPE_STYLES[pin.type]}`}
                    >
                      {pin.type}
                    </span>
                  </div>
                  <p className="text-sm text-void-600">{pin.event}</p>
                  {pin.type === "critical" && (
                    <p className="mt-2 text-[11px] font-mono text-red-300/80 italic border-l-2 border-red-500/40 pl-3">
                      &quot;Mandatory disclosure not read, compliance script skipped&quot;
                    </p>
                  )}
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

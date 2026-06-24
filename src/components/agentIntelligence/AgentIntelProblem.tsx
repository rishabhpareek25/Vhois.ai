import { motion } from "framer-motion";
import { AlertTriangle } from "lucide-react";
import { HIDDEN_RISKS } from "../../data/agentIntelligenceContent";

export default function AgentIntelProblem() {
  return (
    <section className="relative pt-10 sm:pt-12 pb-14 sm:pb-20 border-y border-white/[0.06]">
      <div className="page-bleed">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <p className="text-[11px] font-mono uppercase tracking-[0.2em] text-red-300/80 mb-4">
              The blind spot
            </p>
            <h2 className="font-sans font-semibold text-3xl sm:text-4xl text-platinum tracking-tight mb-5 leading-tight">
              You record every call.
              <br />
              <span className="text-void-600">You review almost none.</span>
            </h2>
            <p className="text-void-600 text-base sm:text-lg leading-relaxed mb-6">
              Most teams audit 2–10% of conversations manually. The other 90%+ hides revenue leaks,
              compliance failures, and customer churn — until it&apos;s too late.
            </p>

            {/* Sampling vs full audit visual */}
            <div className="rounded-xl border border-white/[0.08] p-5 bg-void-50/50">
              <div className="flex justify-between text-[10px] font-mono text-void-600 mb-3">
                <span>Manual QA sample</span>
                <span className="text-red-300">~5% reviewed</span>
              </div>
              <div className="flex gap-1 mb-4">
                {Array.from({ length: 20 }).map((_, i) => (
                  <div
                    key={i}
                    className={`h-8 flex-1 rounded-sm ${
                      i < 1 ? "bg-red-500/40" : "bg-white/[0.04]"
                    }`}
                  />
                ))}
              </div>
              <div className="flex justify-between text-[10px] font-mono text-void-600 mb-3">
                <span>Vhois full audit</span>
                <span className="text-emerald-300">100% analyzed</span>
              </div>
              <div className="flex gap-1">
                {Array.from({ length: 20 }).map((_, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, scaleY: 0 }}
                    whileInView={{ opacity: 1, scaleY: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.02 }}
                    className="h-8 flex-1 rounded-sm bg-emerald-500/25 origin-bottom"
                  />
                ))}
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="grid grid-cols-1 sm:grid-cols-2 gap-3"
          >
            {HIDDEN_RISKS.map((risk, i) => (
              <motion.div
                key={risk}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                className="flex items-start gap-3 p-4 rounded-xl border border-red-500/15 bg-red-500/[0.04] hover:bg-red-500/[0.07] transition-colors"
              >
                <AlertTriangle className="w-4 h-4 text-red-300 shrink-0 mt-0.5" strokeWidth={1.5} />
                <span className="text-sm text-platinum/90 leading-snug">{risk}</span>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}

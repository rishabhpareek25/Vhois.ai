import { motion } from "framer-motion";
import { TrendingUp, TrendingDown } from "lucide-react";
import { DASHBOARD_METRICS } from "../../data/agentIntelligenceContent";
import { COMPANY } from "../../data/company";

export default function AgentIntelDashboard() {
  return (
    <section className="relative py-16 sm:py-24 border-y border-white/[0.06] overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,0.03),transparent_70%)] pointer-events-none" />

      <div className="page-bleed relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-10 sm:mb-12"
        >
          <p className="text-[11px] font-mono uppercase tracking-[0.2em] text-void-600 mb-4">
            Intelligence dashboard
          </p>
          <h2 className="font-sans font-semibold text-3xl sm:text-4xl text-platinum tracking-tight">
            Your command center for conversation quality
          </h2>
        </motion.div>

        {/* Mock dashboard chrome */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="rounded-xl sm:rounded-2xl border border-white/[0.1] bg-void-50/80 backdrop-blur-sm overflow-hidden"
        >
          <div className="flex items-center gap-2 px-4 py-3 border-b border-white/[0.06] bg-void-100/50">
            <div className="flex gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-red-500/40" />
              <span className="w-2.5 h-2.5 rounded-full bg-amber-500/40" />
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/40" />
            </div>
            <span className="text-[10px] font-mono text-void-600 ml-2">
              {COMPANY.domain} / quality-intelligence / live
            </span>
            <span className="ml-auto flex items-center gap-1.5 text-[10px] font-mono text-emerald-300">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              LIVE
            </span>
          </div>

          <div className="p-4 sm:p-6 grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
            {DASHBOARD_METRICS.map((m, i) => {
              const isRisk = m.label.includes("violation") || m.label.includes("Risky");
              return (
                <motion.div
                  key={m.label}
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.04 }}
                  className={`rounded-xl p-4 border ${
                    isRisk
                      ? "border-red-500/20 bg-red-500/[0.04]"
                      : "border-white/[0.06] bg-white/[0.02]"
                  }`}
                >
                  <p className="text-[9px] sm:text-[10px] font-mono text-void-600 uppercase tracking-wide mb-2 leading-tight">
                    {m.label}
                  </p>
                  <p className="font-mono font-bold text-xl sm:text-2xl text-platinum">{m.value}</p>
                  <p className="text-[10px] text-void-700 mt-1 flex items-center gap-1">
                    {isRisk ? (
                      <TrendingDown className="w-3 h-3 text-red-400" />
                    ) : (
                      <TrendingUp className="w-3 h-3 text-emerald-400" />
                    )}
                    {m.delta}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

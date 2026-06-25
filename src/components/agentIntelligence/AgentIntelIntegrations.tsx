import { motion } from "framer-motion";
import { INTEGRATIONS } from "../../data/agentIntelligenceContent";

export default function AgentIntelIntegrations() {
  return (
    <section id="integrations" className="relative py-16 sm:py-24 border-y border-white/[0.06]">
      <div className="page-bleed">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12 max-w-2xl mx-auto"
        >
          <p className="text-[11px] font-mono uppercase tracking-[0.2em] text-void-600 mb-4">
            Integrations
          </p>
          <h2 className="font-sans font-semibold text-3xl sm:text-4xl text-platinum tracking-tight mb-4">
            Connect your stack in days, not months
          </h2>
          <p className="text-void-600 text-base">
            From a single CSV to enterprise dialer pipelines, start wherever you are.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {INTEGRATIONS.map((item, i) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                className="group rounded-xl border border-white/[0.08] bg-white/[0.02] p-5 sm:p-6 hover:border-white/20 hover:bg-white/[0.04] transition-all"
              >
                <div className="w-10 h-10 rounded-lg border border-white/10 bg-white/[0.04] flex items-center justify-center mb-4 group-hover:scale-105 transition-transform">
                  <Icon className="w-5 h-5 text-platinum" strokeWidth={1.5} />
                </div>
                <h3 className="font-semibold text-platinum mb-1.5">{item.title}</h3>
                <p className="text-sm text-void-600 leading-relaxed">{item.description}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

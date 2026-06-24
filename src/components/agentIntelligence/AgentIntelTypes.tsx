import { motion } from "framer-motion";
import { AGENT_TYPES } from "../../data/agentIntelligenceContent";

export default function AgentIntelTypes() {
  return (
    <section className="relative py-16 sm:py-24 border-y border-white/[0.06] bg-white/[0.01]">
      <div className="page-bleed">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12 sm:mb-14"
        >
          <p className="text-[11px] font-mono uppercase tracking-[0.2em] text-void-600 mb-4">
            Built for every agent type
          </p>
          <h2 className="font-sans font-semibold text-3xl sm:text-4xl text-platinum tracking-tight max-w-2xl">
            Performance intelligence tailored to your floor
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-5">
          {AGENT_TYPES.map((type, i) => (
            <motion.div
              key={type.title}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              className={`rounded-xl sm:rounded-2xl border bg-gradient-to-br ${type.accent} p-5 sm:p-6 hover:border-white/20 transition-colors`}
            >
              <span className="text-[9px] font-mono uppercase tracking-widest text-void-600">
                {type.tag}
              </span>
              <h3 className="font-sans font-semibold text-lg sm:text-xl text-platinum mt-2 mb-4">
                {type.title}
              </h3>
              <ul className="space-y-2">
                {type.items.map((item) => (
                  <li key={item} className="flex items-center gap-2 text-sm text-void-600">
                    <span className="w-1 h-1 rounded-full bg-platinum/50 shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

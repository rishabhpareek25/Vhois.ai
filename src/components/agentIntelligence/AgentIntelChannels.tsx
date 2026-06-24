import { motion } from "framer-motion";
import { Cloud, Smartphone } from "lucide-react";
import { OFFLINE_CHANNELS, ONLINE_CHANNELS } from "../../data/agentIntelligenceContent";

export default function AgentIntelChannels() {
  return (
    <section className="relative py-16 sm:py-24">
      <div className="page-bleed">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12 max-w-2xl mx-auto"
        >
          <p className="text-[11px] font-mono uppercase tracking-[0.2em] text-void-600 mb-4">
            Online + offline
          </p>
          <h2 className="font-sans font-semibold text-3xl sm:text-4xl text-platinum tracking-tight">
            Every conversation channel. One intelligence layer.
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6">
          <motion.div
            initial={{ opacity: 0, x: -16 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="rounded-2xl border border-white/[0.1] bg-gradient-to-br from-blue-500/[0.06] to-transparent p-6 sm:p-8"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-11 h-11 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center">
                <Cloud className="w-5 h-5 text-blue-300" strokeWidth={1.5} />
              </div>
              <div>
                <h3 className="font-semibold text-lg text-platinum">Online agents</h3>
                <p className="text-xs text-void-600">Live & connected systems</p>
              </div>
            </div>
            <ul className="space-y-3">
              {ONLINE_CHANNELS.map((ch) => (
                <li key={ch} className="text-sm text-void-600 flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-400/60" />
                  {ch}
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 16 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="rounded-2xl border border-white/[0.1] bg-gradient-to-br from-amber-500/[0.06] to-transparent p-6 sm:p-8"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-11 h-11 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center">
                <Smartphone className="w-5 h-5 text-amber-200" strokeWidth={1.5} />
              </div>
              <div>
                <h3 className="font-semibold text-lg text-platinum">Offline agents</h3>
                <p className="text-xs text-void-600">Field & async audio</p>
              </div>
            </div>
            <ul className="space-y-3">
              {OFFLINE_CHANNELS.map((ch) => (
                <li key={ch} className="text-sm text-void-600 flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-400/60" />
                  {ch}
                </li>
              ))}
            </ul>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

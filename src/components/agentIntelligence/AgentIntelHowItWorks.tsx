import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { HOW_IT_WORKS } from "../../data/agentIntelligenceContent";

export default function AgentIntelHowItWorks() {
  return (
    <section className="relative py-16 sm:py-24">
      <div className="page-bleed">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12 sm:mb-16 max-w-2xl mx-auto"
        >
          <p className="text-[11px] font-mono uppercase tracking-[0.2em] text-void-600 mb-4">
            How it works
          </p>
          <h2 className="font-sans font-semibold text-3xl sm:text-4xl text-platinum tracking-tight">
            Three steps to full conversation intelligence
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 relative">
          {/* Connector line — desktop */}
          <div className="hidden md:block absolute top-[4.5rem] left-[16%] right-[16%] h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />

          {HOW_IT_WORKS.map((step, i) => {
            const Icon = step.icon;
            return (
              <motion.div
                key={step.step}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.12 }}
                className="relative text-center md:text-left"
              >
                <div className="inline-flex md:flex items-center justify-center md:justify-start gap-4 mb-5">
                  <div className="w-14 h-14 rounded-2xl border border-white/15 bg-white/[0.04] flex items-center justify-center shrink-0">
                    <Icon className="w-6 h-6 text-platinum" strokeWidth={1.5} />
                  </div>
                  <span className="font-mono text-2xl font-bold text-void-600">{step.step}</span>
                </div>
                <h3 className="font-sans font-semibold text-xl text-platinum mb-2">{step.title}</h3>
                <p className="text-void-600 text-sm sm:text-base leading-relaxed">{step.description}</p>
                {i < HOW_IT_WORKS.length - 1 && (
                  <ArrowRight className="w-5 h-5 text-void-700 mx-auto md:hidden mt-6 rotate-90" />
                )}
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

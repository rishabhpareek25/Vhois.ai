import { motion } from "framer-motion";
import { PROBLEM } from "../../data/homeContent";
import SectionHeading from "./SectionHeading";

export default function ProblemSolution() {
  return (
    <section className="relative pt-6 sm:pt-8 pb-8 sm:pb-10 overflow-hidden border-t border-white/[0.06]">
      <div className="absolute inset-0 bg-[linear-gradient(180deg,transparent,rgba(255,60,50,0.03)_50%,transparent)]" />

      <div className="page-bleed relative">
        <SectionHeading
          label={PROBLEM.label}
          title={PROBLEM.title}
          description={PROBLEM.description}
          accent="ember"
        />

        <div className="relative grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-6">
          <div className="split-panel-loss rounded-lg border border-red-500/10 py-5 px-4 sm:px-5">
            <p className="text-xs font-medium text-red-300 mb-4">Without Vhois AI</p>
            <ul className="space-y-2.5">
              {PROBLEM.without.map((line, i) => (
                <motion.li
                  key={line}
                  initial={{ opacity: 0, x: -12 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.05 }}
                  className="flex gap-2.5 text-sm text-red-100/80 leading-snug"
                >
                  <span className="text-red-400 shrink-0 mt-0.5">✕</span>
                  {line}
                </motion.li>
              ))}
            </ul>
          </div>

          <div className="split-panel-gain rounded-lg border border-white/10 py-5 px-4 sm:px-5">
            <p className="text-xs font-medium text-emerald-300 mb-4">With Vhois AI</p>
            <ul className="space-y-2.5">
              {PROBLEM.with.map((line, i) => (
                <motion.li
                  key={line}
                  initial={{ opacity: 0, x: 12 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.05 }}
                  className="flex gap-2.5 text-sm text-primary leading-snug"
                >
                  <span className="text-emerald-400 shrink-0 mt-0.5">✓</span>
                  {line}
                </motion.li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

import { motion } from "framer-motion";
import { COMPARISON } from "../../data/homeContent";
import SectionHeading from "./SectionHeading";

export default function HomeWhyDifferent() {
  return (
    <section className="relative py-10 sm:py-12 border-t border-white/[0.06] bg-white/[0.015]">
      <div className="page-bleed">
        <SectionHeading
          label={COMPARISON.label}
          title={COMPARISON.title}
          accent="ember"
        />

        <div className="overflow-hidden rounded-xl border border-white/[0.1]">
          <div className="hidden sm:grid sm:grid-cols-2 bg-white/[0.04] border-b border-white/[0.08]">
            <p className="px-5 py-3 text-sm font-semibold text-tertiary uppercase tracking-wide">
              Traditional transcription
            </p>
            <p className="px-5 py-3 text-sm font-semibold text-ember uppercase tracking-wide border-l border-white/[0.08]">
              Vhois AI
            </p>
          </div>
          {COMPARISON.rows.map((row, i) => (
            <motion.div
              key={row.traditional}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.04 }}
              className="grid grid-cols-1 sm:grid-cols-2 border-b border-white/[0.06] last:border-b-0"
            >
              <p className="px-5 py-4 text-sm sm:text-base text-tertiary leading-relaxed sm:border-r border-white/[0.06]">
                <span className="sm:hidden text-xs font-semibold text-tertiary block mb-1">
                  Traditional
                </span>
                {row.traditional}
              </p>
              <p className="px-5 py-4 text-sm sm:text-base text-primary leading-relaxed bg-white/[0.02]">
                <span className="sm:hidden text-xs font-semibold text-ember block mb-1">Vhois AI</span>
                {row.vhois}
              </p>
            </motion.div>
          ))}
        </div>

        <p className="mt-6 text-sm sm:text-base text-secondary max-w-3xl leading-relaxed">
          {COMPARISON.footnote}
        </p>
      </div>
    </section>
  );
}

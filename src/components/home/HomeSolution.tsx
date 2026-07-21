import { motion } from "framer-motion";
import { SOLUTION } from "../../data/homeContent";
import SectionHeading from "./SectionHeading";

export default function HomeSolution() {
  return (
    <section className="relative py-8 sm:py-10 border-t border-white/[0.06] bg-white/[0.015]">
      <div className="page-bleed">
        <SectionHeading
          label={SOLUTION.label}
          title={SOLUTION.title}
          description={SOLUTION.description}
          accent="signal"
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
          {SOLUTION.bullets.map((item, i) => (
            <motion.div
              key={item}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.04 }}
              className="flex items-start gap-3 p-4 rounded-lg border border-white/[0.08] bg-void-50/40"
            >
              <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-white/10 text-xs font-mono text-primary">
                {i + 1}
              </span>
              <p className="text-sm sm:text-base text-secondary leading-relaxed">{item}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

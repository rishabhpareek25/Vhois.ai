import { motion } from "framer-motion";
import { IMPACT } from "../../data/homeContent";
import SectionHeading from "./SectionHeading";

export default function HomeImpact() {
  return (
    <section className="relative py-10 sm:py-12 border-t border-white/[0.06]">
      <div className="page-bleed">
        <SectionHeading
          label={IMPACT.label}
          title={IMPACT.title}
          accent="primary"
        />

        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-w-3xl">
          {IMPACT.items.map((item, i) => (
            <motion.li
              key={item}
              initial={{ opacity: 0, x: -8 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.04 }}
              className="flex items-center gap-3 text-sm sm:text-base text-secondary"
            >
              <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-emerald-500/20 text-emerald-400 text-xs">
                ✓
              </span>
              {item}
            </motion.li>
          ))}
        </ul>
      </div>
    </section>
  );
}

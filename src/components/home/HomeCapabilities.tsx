import { motion } from "framer-motion";
import { CAPABILITIES } from "../../data/homeContent";
import SectionHeading from "./SectionHeading";

export default function HomeCapabilities() {
  return (
    <section className="relative py-10 sm:py-12 border-t border-white/[0.06]">
      <div className="page-bleed">
        <SectionHeading
          label={CAPABILITIES.label}
          title={CAPABILITIES.title}
          accent="signal"
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {CAPABILITIES.items.map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              className="p-5 rounded-xl border border-white/[0.08] hover:border-white/15 transition-colors"
            >
              <h3 className="font-display font-bold text-lg text-primary mb-2">{item.title}</h3>
              <p className="text-sm text-secondary leading-relaxed">{item.text}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

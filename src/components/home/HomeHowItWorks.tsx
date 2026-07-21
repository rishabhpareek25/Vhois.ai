import { motion } from "framer-motion";
import { HOW_IT_WORKS } from "../../data/homeContent";
import SectionHeading from "./SectionHeading";

export default function HomeHowItWorks() {
  return (
    <section className="relative py-8 sm:py-10 border-t border-white/[0.06]">
      <div className="page-bleed">
        <SectionHeading
          label={HOW_IT_WORKS.label}
          title={HOW_IT_WORKS.title}
          description={HOW_IT_WORKS.description}
          accent="primary"
        />

        <div className="space-y-0 divide-y divide-white/[0.08] border-y border-white/[0.08]">
          {HOW_IT_WORKS.steps.map((item, i) => (
            <motion.div
              key={item.step}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              className="grid grid-cols-1 sm:grid-cols-12 gap-3 sm:gap-6 py-5 sm:py-6 items-start"
            >
              <div className="sm:col-span-1">
                <span className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/20 bg-white/[0.04] text-sm font-bold text-primary">
                  {item.step}
                </span>
              </div>
              <div className="sm:col-span-3">
                <h3 className="font-display font-bold text-lg sm:text-xl text-primary">{item.title}</h3>
              </div>
              <div className="sm:col-span-8">
                <p className="text-sm sm:text-base text-secondary leading-relaxed">{item.text}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

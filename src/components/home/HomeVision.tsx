import { motion } from "framer-motion";
import { VISION } from "../../data/homeContent";
import SectionHeading from "./SectionHeading";

export default function HomeVision() {
  return (
    <section className="relative py-10 sm:py-14 border-t border-white/[0.06]">
      <div className="page-bleed">
        <div className="max-w-3xl mx-auto text-center">
          <SectionHeading
            label={VISION.label}
            title={VISION.title}
            align="center"
            accent="signal"
          />
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-base sm:text-lg text-secondary leading-relaxed"
          >
            {VISION.text}
          </motion.p>
        </div>
      </div>
    </section>
  );
}

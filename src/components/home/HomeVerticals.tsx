import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { USE_CASES } from "../../data/homeContent";
import SectionHeading from "./SectionHeading";

export default function HomeVerticals() {
  return (
    <section className="relative py-10 sm:py-12 border-t border-white/[0.06]">
      <div className="page-bleed">
        <SectionHeading
          label={USE_CASES.label}
          title={USE_CASES.title}
          accent="primary"
        />

        <div className="space-y-4">
          {USE_CASES.items.map((item, i) => (
            <motion.article
              key={item.title}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.06 }}
              className="p-5 sm:p-6 rounded-xl border border-white/[0.08] hover:border-white/15 transition-colors"
            >
              <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
                <div className="flex-1 min-w-0">
                  <h3 className="font-display font-bold text-lg sm:text-xl text-primary mb-2">
                    {item.title}
                  </h3>
                  <p className="text-sm text-tertiary mb-2">{item.problem}</p>
                  <p className="text-sm sm:text-base text-secondary leading-relaxed">{item.solution}</p>
                </div>
                <Link
                  to={item.href}
                  className="inline-flex items-center gap-2 text-sm font-medium text-primary hover:gap-3 transition-all shrink-0"
                >
                  {item.cta}
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}

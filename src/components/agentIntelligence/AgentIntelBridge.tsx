import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, Home, LayoutGrid } from "lucide-react";

export default function AgentIntelBridge() {
  return (
    <section className="relative py-8 sm:py-10 border-b border-white/[0.06]">
      <div className="page-bleed">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 rounded-xl border border-white/[0.08] bg-white/[0.02] px-5 py-4 sm:px-6 sm:py-5"
        >
          <p className="text-sm text-void-600 text-center sm:text-left">
            <span className="text-platinum font-medium">Connected across Vhois</span>. See the live
            command console on our homepage or browse all industry use cases.
          </p>
          <div className="flex flex-col xs:flex-row gap-2 sm:gap-3 shrink-0">
            <Link
              to="/#agent-surveillance"
              className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg border border-white/15 text-sm font-mono text-platinum hover:bg-white/[0.05] transition-colors"
            >
              <Home className="w-3.5 h-3.5" />
              Homepage demo
            </Link>
            <Link
              to="/use-cases"
              className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg border border-white/15 text-sm font-mono text-platinum hover:bg-white/[0.05] transition-colors"
            >
              <LayoutGrid className="w-3.5 h-3.5" />
              All use cases
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

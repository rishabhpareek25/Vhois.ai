import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";
import Button from "../ui/Button";

export default function AgentIntelPilotCTA() {
  return (
    <section className="relative py-20 sm:py-28">
      <div className="page-bleed">
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="relative rounded-2xl sm:rounded-3xl border border-white/[0.12] overflow-hidden"
        >
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,rgba(255,255,255,0.08),transparent_50%),radial-gradient(ellipse_at_bottom_right,rgba(59,130,246,0.08),transparent_50%)]" />
          <div className="absolute inset-0 opacity-30">
            <div
              className="absolute inset-0"
              style={{
                backgroundImage:
                  "repeating-linear-gradient(0deg,transparent,transparent 40px,rgba(255,255,255,0.02) 40px,rgba(255,255,255,0.02) 41px)",
              }}
            />
          </div>

          <div className="relative z-10 px-6 py-14 sm:px-12 sm:py-16 md:py-20 text-center max-w-3xl mx-auto">
            <motion.div
              animate={{ rotate: [0, 5, -5, 0] }}
              transition={{ duration: 4, repeat: Infinity }}
              className="inline-flex items-center justify-center w-12 h-12 rounded-full border border-white/20 mb-6"
            >
              <Sparkles className="w-5 h-5 text-platinum" />
            </motion.div>

            <h2 className="font-sans font-semibold text-2xl sm:text-4xl md:text-5xl text-platinum tracking-tight mb-5 leading-tight">
              Your calls already know where the business is leaking. Let Vhois show you.
            </h2>
            <p className="text-void-600 text-base sm:text-lg mb-8 leading-relaxed">
              Share sample calls and get a free AI call audit report, revenue gaps, compliance
              risks, and agent coaching priorities included.
            </p>
            <Link to="/call-center-qa">
              <Button variant="primary" size="sm">
                Analyze my sample calls
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </Link>
            <p className="mt-5 text-xs font-mono text-void-700">
              2-minute setup · No credit card · Hindi & Hinglish ready
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

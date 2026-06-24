import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Button from "../ui/Button";
import HeroIntelligenceVisual from "./HeroIntelligenceVisual";

type Props = {
  onIntegrationsClick: () => void;
};

export default function AgentIntelHero({ onIntegrationsClick }: Props) {
  return (
    <section className="relative pt-28 sm:pt-32 pb-6 sm:pb-8 overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(255,255,255,0.05),transparent_50%)] pointer-events-none" />
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-[radial-gradient(circle,rgba(59,130,246,0.06),transparent_70%)] pointer-events-none" />

      <div className="page-bleed relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14 items-center">
          <div className="text-center lg:text-left">
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-[10px] sm:text-[11px] font-mono uppercase tracking-[0.2em] text-void-600 mb-4"
            >
              Agent Intelligence · Call Audit · Quality Intelligence
            </motion.p>

            <motion.h1
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="font-sans font-semibold text-[1.75rem] leading-[1.12] sm:text-4xl md:text-5xl xl:text-[3.25rem] text-platinum tracking-tight mb-5"
            >
              Stop sampling calls.
              <br />
              <span className="text-void-600">Start understanding every conversation.</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-base sm:text-lg text-void-600 leading-relaxed mb-8 max-w-xl mx-auto lg:mx-0"
            >
              Vhois AI audits 100% of agent calls and reveals revenue leaks, script violations,
              customer intent, and agent performance risks — your AI Quality Manager for every
              conversation.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="flex flex-col sm:flex-row items-center lg:items-start justify-center lg:justify-start gap-3"
            >
              <Link to="/call-center-qa">
                <Button variant="primary" size="lg" className="w-full sm:w-auto">
                  Try free call audit
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </Link>
              <Button variant="outline" size="lg" className="w-full sm:w-auto" onClick={onIntegrationsClick}>
                View integration options
              </Button>
            </motion.div>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="mt-6 text-xs font-mono text-void-700 flex items-center justify-center lg:justify-start gap-2"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              Hindi · Hinglish · all Indian languages
            </motion.p>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.25, duration: 0.7 }}
          >
            <HeroIntelligenceVisual />
          </motion.div>
        </div>
      </div>
    </section>
  );
}

import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import Button from "../ui/Button";
import { COMPANY } from "../../data/company";
import HeroConversationVisual from "./HeroConversationVisual";

export default function HomeHero() {
  return (
    <section className="relative overflow-hidden pt-20 sm:pt-24 pb-4 sm:pb-6">
      <div className="absolute inset-0 animated-grid opacity-40" />
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[min(140%,900px)] h-[320px] bg-[radial-gradient(ellipse_at_center,rgba(255,90,70,0.08),transparent_65%)] pointer-events-none" />

      <div className="relative z-10 page-bleed">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 lg:gap-8 items-start">
          <div className="lg:col-span-7 text-center lg:text-left">
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-2 text-[10px] font-mono uppercase tracking-[0.24em] text-tertiary mb-3 lg:mb-4"
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-60" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-red-400" />
              </span>
              {COMPANY.tagline}
            </motion.p>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.06 }}
              className="font-display font-bold text-[1.6rem] leading-[1.12] sm:text-[1.85rem] md:text-[2.15rem] lg:text-[2.35rem] tracking-[-0.02em] mb-3"
            >
              <span className="text-primary">Your business runs on</span>
              <br />
              <span className="text-primary">conversations.</span>
              <br />
              <span className="text-ember">Most of that intelligence disappears.</span>
            </motion.h1>

            {/* Mobile: visual directly under headline so nothing floats at the bottom */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.12 }}
              className="lg:hidden my-4 max-w-md mx-auto"
            >
              <HeroConversationVisual />
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.14 }}
              className="text-sm sm:text-[15px] md:text-base text-secondary leading-relaxed max-w-lg mx-auto lg:mx-0 mb-2"
            >
              Contact centers record every call, but QA samples a fraction. Meetings end.
              Decisions fade.
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-sm sm:text-[15px] md:text-base text-luminous font-medium leading-relaxed max-w-lg mx-auto lg:mx-0 mb-4"
            >
              {COMPANY.name} makes every conversation searchable, auditable, and actionable
              across Hindi, Hinglish, and real-world Indian audio.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.28 }}
              className="flex flex-col sm:flex-row items-center lg:items-start justify-center lg:justify-start gap-2"
            >
              <Link to="/agent-intelligence">
                <Button variant="primary" size="sm">
                  See how it works
                  <ArrowRight className="w-3.5 h-3.5 ml-1.5" />
                </Button>
              </Link>
              <Link to="/contact">
                <Button variant="outline" size="sm">
                  Request a pilot
                </Button>
              </Link>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="hidden lg:block lg:col-span-5 lg:sticky lg:top-24"
          >
            <HeroConversationVisual />
          </motion.div>
        </div>
      </div>
    </section>
  );
}

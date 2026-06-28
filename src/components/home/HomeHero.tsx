import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, Sparkles } from "lucide-react";
import Button from "../ui/Button";
import { COMPANY } from "../../data/company";

export default function HomeHero() {
  return (
    <section className="relative pt-20 sm:pt-24 pb-4 overflow-hidden flex flex-col items-center justify-center bg-white">
      {/* Subtle Glow Behind Hero */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-full max-w-4xl h-[300px] bg-primary-500/10 blur-[100px] rounded-full pointer-events-none" />

      <div className="relative z-10 page-bleed flex flex-col items-center text-center">
        {/* Premium Pill */}
        <motion.div
          initial={{ opacity: 0, y: 20, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="mb-6"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-primary-200 bg-white/60 backdrop-blur-md shadow-sm">
            <span className="flex items-center justify-center w-5 h-5 rounded-full bg-primary-100">
              <Sparkles className="w-3 h-3 text-primary-600" />
            </span>
            <span className="text-sm font-medium text-primary-700 pr-2">
              The Intelligence Layer for Voice
            </span>
          </div>
        </motion.div>

        {/* Massive Typography */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
          className="font-display font-bold text-5xl sm:text-6xl md:text-[5.5rem] tracking-tighter leading-[1.05] text-gray-900 max-w-5xl mx-auto"
        >
          Turn conversations into{" "}
          <span className="relative inline-block">
            <span className="text-gradient">actionable data.</span>
            <svg className="absolute -bottom-2 left-0 w-full h-3 text-primary-300/50" viewBox="0 0 100 10" preserveAspectRatio="none">
              <path d="M0 5 Q 50 10 100 5" fill="none" stroke="currentColor" strokeWidth="3" />
            </svg>
          </span>
        </motion.h1>

        {/* Elegant Body Copy */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
          className="mt-4 text-lg sm:text-xl text-gray-500 max-w-2xl mx-auto leading-relaxed"
        >
          {COMPANY.name} turns your real-world Indian contact-center audio into structured, auditable intelligence. Do not let 95% of your conversations disappear.
        </motion.p>

        {/* Premium CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.3 }}
          className="mt-6 flex flex-col sm:flex-row items-center gap-4 sm:gap-6"
        >
          <Link to="/contact" className="w-full sm:w-auto group">
            <button className="relative w-full sm:w-auto px-8 py-4 bg-primary-600 text-white text-base font-semibold rounded-xl shadow-glow-primary hover:bg-primary-700 hover:shadow-glow-primary-lg transition-all overflow-hidden flex items-center justify-center gap-2">
              <span className="absolute inset-0 w-full h-full -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent group-hover:animate-wave-flow" />
              Start your pilot
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
          </Link>
          <a href="#how-it-works" className="w-full sm:w-auto group">
            <button className="w-full sm:w-auto px-8 py-4 bg-white text-gray-700 text-base font-semibold rounded-xl border border-gray-200 shadow-sm hover:border-gray-300 hover:bg-gray-50 transition-all flex items-center justify-center gap-2">
              See how it works
            </button>
          </a>
        </motion.div>
      </div>
    </section>
  );
}

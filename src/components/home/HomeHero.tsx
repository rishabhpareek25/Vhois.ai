import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import Button from "../ui/Button";
import { HERO } from "../../data/homeContent";
import HeroConversationVisual from "./HeroConversationVisual";

export default function HomeHero() {
  return (
    <section className="relative overflow-hidden pt-20 sm:pt-24 pb-0">
      <div className="absolute inset-0 animated-grid opacity-30" />

      <div className="relative z-10 page-bleed">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          <div className="text-center lg:text-left pb-6 lg:pb-8">
            <motion.h1
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              className="font-sans font-semibold text-[1.5rem] sm:text-[1.75rem] md:text-[2rem] lg:text-[2.125rem] text-primary leading-snug tracking-tight mb-4"
            >
              {HERO.headline}
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.08 }}
              className="text-sm sm:text-base text-secondary leading-relaxed max-w-md mx-auto lg:mx-0 mb-5"
            >
              {HERO.subhead}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.14 }}
              className="flex flex-col sm:flex-row items-center lg:items-start justify-center lg:justify-start gap-2"
            >
              <Link to="/agent-intelligence">
                <Button variant="primary" size="sm">
                  {HERO.ctaPrimary}
                  <ArrowRight className="w-3.5 h-3.5 ml-1.5" />
                </Button>
              </Link>
              <Link to="/contact">
                <Button variant="outline" size="sm">
                  {HERO.ctaSecondary}
                </Button>
              </Link>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.12 }}
            className="w-full max-w-md mx-auto lg:max-w-none lg:mx-0 pb-6 lg:pb-8"
          >
            <HeroConversationVisual />
          </motion.div>
        </div>
      </div>
    </section>
  );
}

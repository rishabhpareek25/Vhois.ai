import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowUpRight, Headphones, Layers, Radio } from "lucide-react";

const PATHS = [
  {
    to: "/waitlist",
    icon: Radio,
    eyebrow: "Early access",
    title: "Join the waitlist",
    description: "Get API access and product updates as we ship.",
    accent: "from-white/[0.08] via-transparent to-transparent",
    ring: "group-hover:ring-white/25",
    iconWrap: "bg-white/[0.06] text-platinum",
  },
  {
    to: "/agent-intelligence",
    icon: Headphones,
    eyebrow: "For contact centers",
    title: "Agent Intelligence",
    description: "100% call audit — see the full product story.",
    accent: "from-red-500/[0.12] via-transparent to-transparent",
    ring: "group-hover:ring-red-400/30",
    iconWrap: "bg-red-500/10 text-red-300",
    featured: true,
  },
  {
    to: "/the-forbidden-archive",
    icon: Layers,
    eyebrow: "Product depth",
    title: "Explore the stack",
    description: "See what we're building beyond the landing page.",
    accent: "from-amber-500/[0.08] via-transparent to-transparent",
    ring: "group-hover:ring-amber-400/25",
    iconWrap: "bg-amber-500/10 text-amber-200",
  },
] as const;

export default function HeroActionDock() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.45, duration: 0.7 }}
      className="w-full"
    >
      <p className="text-[10px] sm:text-[11px] font-mono uppercase tracking-[0.18em] sm:tracking-[0.22em] text-void-600 mb-4 sm:mb-5 px-0.5">
        Choose your entry point
      </p>

      {/* Stack until xl — 3 cols only when there's room */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-px rounded-xl sm:rounded-2xl overflow-hidden border border-white/[0.08] bg-white/[0.03] backdrop-blur-sm">
        {PATHS.map((path, i) => {
          const Icon = path.icon;
          return (
            <Link key={path.to} to={path.to} className="group block min-w-0">
              <motion.div
                initial={{ opacity: 0, x: -12 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.55 + i * 0.08 }}
                className={`relative flex items-center gap-3 sm:gap-4 px-4 sm:px-5 md:px-6 py-4 sm:py-5 md:py-6 bg-gradient-to-br ${path.accent} transition-colors duration-300 hover:bg-white/[0.04] ring-1 ring-transparent ${path.ring}`}
              >
                {"featured" in path && path.featured && (
                  <span className="absolute top-3 right-3 sm:top-4 sm:right-4 text-[8px] sm:text-[9px] font-mono uppercase tracking-widest text-red-300/80">
                    Pilot open
                  </span>
                )}

                <div
                  className={`shrink-0 w-10 h-10 sm:w-11 sm:h-11 rounded-lg sm:rounded-xl flex items-center justify-center ${path.iconWrap} border border-white/[0.06]`}
                >
                  <Icon className="w-4 h-4 sm:w-5 sm:h-5" strokeWidth={1.5} />
                </div>

                <div className="flex-1 min-w-0 pr-8 sm:pr-10">
                  <p className="text-[9px] sm:text-[10px] font-mono uppercase tracking-wider text-void-600 mb-0.5 sm:mb-1 truncate">
                    {path.eyebrow}
                  </p>
                  <p className="font-sans font-semibold text-sm sm:text-base md:text-lg text-platinum tracking-tight leading-snug">
                    {path.title}
                  </p>
                  <p className="text-xs sm:text-sm text-void-600 mt-0.5 leading-snug line-clamp-2">
                    {path.description}
                  </p>
                </div>

                <div className="absolute right-3 sm:right-4 top-1/2 -translate-y-1/2 shrink-0 flex items-center justify-center w-8 h-8 sm:w-9 sm:h-9 rounded-full border border-white/10 text-void-600 transition-all duration-300 group-hover:border-white/30 group-hover:text-platinum">
                  <ArrowUpRight className="w-3.5 h-3.5 sm:w-4 sm:h-4" strokeWidth={1.5} />
                </div>
              </motion.div>
            </Link>
          );
        })}
      </div>
    </motion.div>
  );
}

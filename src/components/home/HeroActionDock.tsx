import type { CSSProperties } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, FlaskConical, Headphones, Play, Radio, Skull } from "lucide-react";

const ACTIONS = [
  {
    to: "/waitlist",
    icon: Radio,
    code: "01",
    label: "Join Waitlist",
    tag: "SIGNAL",
    sub: "Early access",
    glow: "rgba(255,255,255,0.2)",
    border: "border-white/20 hover:border-white/50",
    bg: "from-white/10 to-transparent",
    iconBg: "bg-white/10 border-white/25",
    iconColor: "text-platinum",
  },
  {
    to: "/call-center-qa",
    icon: Headphones,
    code: "02",
    label: "Agent Surveillance",
    tag: "VALIDATE",
    sub: "2-min PMF scan",
    glow: "rgba(239,68,68,0.3)",
    border: "border-red-500/30 hover:border-red-400/60",
    bg: "from-red-500/12 to-transparent",
    iconBg: "bg-red-500/15 border-red-400/35",
    iconColor: "text-red-300",
    pulse: true,
  },
  {
    to: "/the-forbidden-archive",
    icon: Skull,
    code: "03",
    label: "Unseal Intel",
    tag: "VAULT",
    sub: "Classified dossiers",
    glow: "rgba(251,191,36,0.22)",
    border: "border-amber-500/20 hover:border-amber-400/50",
    bg: "from-amber-500/8 to-transparent",
    iconBg: "bg-amber-500/12 border-amber-400/25",
    iconColor: "text-amber-300",
  },
] as const;

export default function HeroActionDock() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.5 }}
      className="w-full max-w-3xl mx-auto"
    >
      <div className="relative rounded-2xl border border-white/10 bg-void-50/50 backdrop-blur-md p-1.5 sm:p-2 overflow-hidden">
        <motion.div
          className="absolute inset-0 opacity-[0.07] pointer-events-none"
          style={{
            backgroundImage:
              "repeating-linear-gradient(0deg,transparent,transparent 2px,rgba(255,255,255,0.4) 2px,rgba(255,255,255,0.4) 3px)",
          }}
          animate={{ backgroundPositionY: ["0px", "6px"] }}
          transition={{ duration: 1.2, repeat: Infinity, ease: "linear" }}
        />

        <div className="relative flex flex-col sm:flex-row gap-1.5 sm:gap-2">
          {ACTIONS.map((action, i) => {
            const Icon = action.icon;
            const End = i === 2 ? Play : i === 1 ? FlaskConical : ArrowRight;
            return (
              <Link key={action.to} to={action.to} className="flex-1 min-w-0 group">
                <motion.div
                  whileHover={{ y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  className={`relative flex items-center gap-2.5 px-3 py-2.5 sm:py-3 rounded-xl border bg-gradient-to-br ${action.bg} ${action.border} transition-shadow group-hover:shadow-[0_0_28px_var(--g)]`}
                  style={{ "--g": action.glow } as CSSProperties}
                >
                  {"pulse" in action && action.pulse && (
                    <motion.span
                      className="absolute top-1.5 right-1.5 w-1.5 h-1.5 rounded-full bg-red-400"
                      animate={{ opacity: [1, 0.2, 1], scale: [1, 1.4, 1] }}
                      transition={{ duration: 1.6, repeat: Infinity }}
                    />
                  )}
                  <span className="text-[9px] font-mono text-ash/40 w-4 shrink-0">{action.code}</span>
                  <div
                    className={`shrink-0 w-8 h-8 rounded-lg border flex items-center justify-center ${action.iconBg}`}
                  >
                    <Icon className={`w-3.5 h-3.5 ${action.iconColor}`} />
                  </div>
                  <div className="flex-1 min-w-0 text-left leading-tight">
                    <span className="text-[8px] font-mono uppercase tracking-widest text-ash/55 block">
                      {action.tag}
                    </span>
                    <span className="font-mono font-bold text-xs sm:text-sm text-platinum block truncate">
                      {action.label}
                    </span>
                    <span className="text-[9px] font-mono text-ash/45 hidden sm:block truncate">
                      {action.sub}
                    </span>
                  </div>
                  <End className="w-3 h-3 text-ash/40 group-hover:text-platinum shrink-0 transition-colors" />
                </motion.div>
              </Link>
            );
          })}
        </div>
      </div>
    </motion.div>
  );
}

import type { CSSProperties } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, Headphones, Play, Radio, Sparkles, Skull } from "lucide-react";

const ACTIONS = [
  {
    to: "/waitlist",
    icon: Radio,
    label: "Join Waitlist",
    tag: "SIGNAL LOCK",
    sub: "Get early access",
    accent: "platinum",
    glow: "rgba(255,255,255,0.25)",
    border: "border-white/25 hover:border-white/60",
    bg: "from-white/[0.12] via-white/[0.06] to-transparent",
    iconBg: "bg-platinum/15 border-white/30",
    iconColor: "text-platinum",
    textColor: "text-platinum",
    badge: null,
  },
  {
    to: "/call-center-qa",
    icon: Headphones,
    label: "Agent Surveillance",
    tag: "BLACK BOX",
    sub: "100% call audit",
    accent: "red",
    glow: "rgba(239,68,68,0.35)",
    border: "border-red-500/35 hover:border-red-400/70",
    bg: "from-red-500/[0.14] via-red-500/[0.06] to-transparent",
    iconBg: "bg-red-500/20 border-red-400/40",
    iconColor: "text-red-300",
    textColor: "text-platinum",
    badge: "LIVE",
  },
  {
    to: "/the-forbidden-archive",
    icon: Skull,
    label: "Unseal Intel",
    tag: "CLASSIFIED",
    sub: "Product dossiers",
    accent: "amber",
    glow: "rgba(251,191,36,0.25)",
    border: "border-amber-500/25 hover:border-amber-400/55",
    bg: "from-amber-500/[0.1] via-amber-500/[0.04] to-transparent",
    iconBg: "bg-amber-500/15 border-amber-400/30",
    iconColor: "text-amber-300",
    textColor: "text-platinum",
    badge: null,
  },
] as const;

function ActionCard({
  action,
  index,
}: {
  action: (typeof ACTIONS)[number];
  index: number;
}) {
  const Icon = action.icon;
  const TrailIcon = index === 2 ? Play : ArrowRight;

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.55 + index * 0.1, duration: 0.5 }}
      className="w-full sm:flex-1 min-w-0"
    >
      <Link to={action.to} className="block h-full group">
        <motion.div
          whileHover={{ y: -3, scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className={`relative h-full min-h-[72px] sm:min-h-[80px] rounded-2xl border bg-gradient-to-br ${action.bg} ${action.border} backdrop-blur-md overflow-hidden transition-all duration-300 group-hover:shadow-[0_0_32px_var(--glow)]`}
          style={{ "--glow": action.glow } as CSSProperties}
        >
          <motion.div
            className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
            style={{
              background: `radial-gradient(ellipse at 50% 0%, ${action.glow}, transparent 70%)`,
            }}
          />
          <div
            className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent opacity-50 group-hover:opacity-100 transition-opacity"
          />

          <div className="relative flex items-center gap-3 sm:gap-4 px-4 sm:px-5 py-4 h-full">
            <motion.div
              animate={
                action.badge
                  ? { boxShadow: ["0 0 0px transparent", `0 0 20px ${action.glow}`, "0 0 0px transparent"] }
                  : {}
              }
              transition={{ duration: 2.2, repeat: Infinity, delay: index * 0.3 }}
              className={`shrink-0 w-11 h-11 sm:w-12 sm:h-12 rounded-xl border flex items-center justify-center ${action.iconBg}`}
            >
              <Icon className={`w-5 h-5 sm:w-5 sm:h-5 ${action.iconColor}`} />
            </motion.div>

            <div className="flex-1 min-w-0 text-left">
              <div className="flex items-center gap-2 mb-0.5">
                <span className="text-[9px] sm:text-[10px] font-mono uppercase tracking-[0.15em] text-ash/70">
                  {action.tag}
                </span>
                {action.badge && (
                  <motion.span
                    animate={{ opacity: [1, 0.45, 1] }}
                    transition={{ duration: 1.4, repeat: Infinity }}
                    className="text-[8px] font-mono font-bold px-1.5 py-px rounded bg-red-500 text-white"
                  >
                    {action.badge}
                  </motion.span>
                )}
              </div>
              <p className={`font-mono font-bold text-sm sm:text-base truncate ${action.textColor}`}>
                {action.label}
              </p>
              <p className="text-[10px] sm:text-xs text-ash/55 font-mono truncate">
                {action.sub}
              </p>
            </div>

            <div className="shrink-0 w-8 h-8 rounded-full border border-white/10 bg-white/5 flex items-center justify-center group-hover:border-white/25 group-hover:bg-white/10 transition-all">
              <TrailIcon className="w-3.5 h-3.5 text-ash group-hover:text-platinum group-hover:translate-x-0.5 transition-all" />
            </div>
          </div>
        </motion.div>
      </Link>
    </motion.div>
  );
}

export default function HeroActionDock() {
  return (
    <div className="w-full max-w-4xl mx-auto">
      <motion.div
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.5, duration: 0.6 }}
        className="relative rounded-[1.35rem] border border-white/10 bg-void-50/40 backdrop-blur-xl p-2 sm:p-2.5 shadow-[0_0_60px_rgba(255,255,255,0.04)]"
      >
        <div className="absolute -top-px left-1/2 -translate-x-1/2 w-1/2 h-px bg-gradient-to-r from-transparent via-platinum/50 to-transparent" />

        <div className="flex items-center justify-center gap-2 mb-2 px-1">
          <Sparkles className="w-3 h-3 text-ash/50" />
          <span className="text-[10px] font-mono uppercase tracking-[0.25em] text-ash/50">
            Choose your transmission
          </span>
          <Sparkles className="w-3 h-3 text-ash/50" />
        </div>

        <div className="flex flex-col sm:flex-row gap-2 sm:gap-2.5">
          {ACTIONS.map((action, i) => (
            <ActionCard key={action.to} action={action} index={i} />
          ))}
        </div>
      </motion.div>
    </div>
  );
}

import { motion } from "framer-motion";
import {
  AlertOctagon,
  BadgeCheck,
  FileWarning,
  PhoneMissed,
  Target,
  Zap,
} from "lucide-react";

const MODULES = [
  { id: "misbehavior", label: "Misbehavior detection", icon: AlertOctagon, accent: "from-red-500/30 to-orange-500/10" },
  { id: "agreement", label: "Agreement tracking", icon: BadgeCheck, accent: "from-emerald-400/30 to-cyan-500/10" },
  { id: "compliance", label: "Compliance scripts", icon: FileWarning, accent: "from-amber-400/30 to-yellow-500/10" },
  { id: "followups", label: "Missed follow-ups", icon: PhoneMissed, accent: "from-violet-400/30 to-fuchsia-500/10" },
  { id: "objections", label: "Objection mining", icon: Target, accent: "from-sky-400/30 to-blue-500/10" },
] as const;

export default function ModulesArmedPanel({
  progress,
  introMode,
}: {
  progress: number;
  introMode: boolean;
}) {
  const armedCount = introMode
    ? MODULES.length
    : MODULES.filter((_, i) => progress > i * 18).length;

  return (
    <motion.div
      initial={{ opacity: 0, x: -12 }}
      animate={{ opacity: 1, x: 0 }}
      className="relative overflow-hidden rounded-xl border border-white/20 bg-gradient-to-br from-white/[0.08] via-void-50/80 to-void-100/90 p-4 shadow-[0_0_40px_rgba(255,255,255,0.08)]"
    >
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,rgba(255,255,255,0.12),transparent_55%)] pointer-events-none" />
      <motion.div
        className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-platinum to-transparent"
        animate={{ opacity: [0.3, 1, 0.3] }}
        transition={{ duration: 2, repeat: Infinity }}
      />

      <div className="relative flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <motion.div
            animate={introMode ? { scale: [1, 1.15, 1], opacity: [0.8, 1, 0.8] } : {}}
            transition={{ duration: 1.4, repeat: Infinity }}
            className="p-1.5 rounded-md bg-platinum/15 border border-white/25"
          >
            <Zap className="w-3.5 h-3.5 text-platinum" />
          </motion.div>
          <p className="text-[10px] font-mono uppercase tracking-[0.2em] text-platinum font-bold">
            Modules armed
          </p>
        </div>
        <motion.span
          animate={introMode ? { boxShadow: ["0 0 0px rgba(255,255,255,0)", "0 0 16px rgba(255,255,255,0.35)", "0 0 0px rgba(255,255,255,0)"] } : {}}
          transition={{ duration: 2, repeat: Infinity }}
          className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-platinum text-void font-bold"
        >
          {armedCount}/{MODULES.length} ARMED
        </motion.span>
      </div>

      <div className="relative space-y-2">
        {MODULES.map((m, i) => {
          const live = introMode || progress > i * 18;
          const Icon = m.icon;
          return (
            <motion.div
              key={m.id}
              initial={introMode ? { opacity: 0, x: -8 } : false}
              animate={introMode ? { opacity: 1, x: 0 } : {}}
              transition={{ delay: i * 0.12, duration: 0.35 }}
              className={`relative flex items-center gap-3 rounded-lg px-3 py-2.5 border transition-all ${
                live
                  ? `border-white/25 bg-gradient-to-r ${m.accent} shadow-[inset_0_0_20px_rgba(255,255,255,0.04)]`
                  : "border-white/5 bg-void-50/30"
              }`}
            >
              {live && introMode && (
                <motion.div
                  className="absolute inset-0 rounded-lg border border-white/20 pointer-events-none"
                  animate={{ opacity: [0.2, 0.7, 0.2] }}
                  transition={{ duration: 1.8, repeat: Infinity, delay: i * 0.2 }}
                />
              )}
              <motion.div
                animate={
                  live && introMode
                    ? { scale: [1, 1.2, 1], boxShadow: ["0 0 0px #fff", "0 0 12px rgba(255,255,255,0.6)", "0 0 0px #fff"] }
                    : {}
                }
                transition={{ duration: 1.6, repeat: Infinity, delay: i * 0.15 }}
                className={`relative shrink-0 w-7 h-7 rounded-md flex items-center justify-center ${
                  live ? "bg-platinum/20 border border-white/30" : "bg-void-200/50 border border-white/5"
                }`}
              >
                <Icon className={`w-3.5 h-3.5 ${live ? "text-platinum" : "text-ash/30"}`} />
              </motion.div>
              <span className={`flex-1 text-xs font-mono ${live ? "text-platinum font-semibold" : "text-ash/25"}`}>
                {m.label}
              </span>
              {live ? (
                <motion.span
                  animate={{ opacity: [1, 0.4, 1] }}
                  transition={{ duration: 1.2, repeat: Infinity, delay: i * 0.1 }}
                  className="text-[9px] font-mono font-bold uppercase tracking-wider text-platinum px-1.5 py-0.5 rounded bg-white/10 border border-white/20"
                >
                  armed
                </motion.span>
              ) : (
                <span className="text-[9px] font-mono text-ash/20 uppercase">idle</span>
              )}
            </motion.div>
          );
        })}
      </div>

      {introMode && (
        <motion.p
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 2.5, repeat: Infinity }}
          className="relative mt-4 text-[10px] font-mono text-center text-platinum/80 uppercase tracking-widest"
        >
          ◆ All classifiers primed : awaiting your signal ◆
        </motion.p>
      )}
    </motion.div>
  );
}

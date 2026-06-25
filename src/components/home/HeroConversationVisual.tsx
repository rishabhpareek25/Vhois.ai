import { motion } from "framer-motion";

const TRANSCRIPT = [
  { speaker: "Customer", line: "Haan, loan ke liye interested hoon…", retain: 1 },
  { speaker: "Agent", line: "Sir EMI kitni comfortable hogi?", retain: 0.85 },
  { speaker: "Customer", line: "Compliance part skip ho gaya call mein", retain: 0.45 },
  { speaker: "Agent", line: "Follow-up kal karte hain", retain: 0.15 },
];

export default function HeroConversationVisual() {
  return (
    <div className="relative w-full">
      <div className="relative overflow-hidden rounded-xl border border-white/[0.1] bg-gradient-to-br from-void-50/90 to-void/90 shadow-[0_0_60px_rgba(255,70,50,0.06)]">
        {/* Header, what this is */}
        <div className="flex items-center justify-between gap-3 px-4 py-2.5 border-b border-white/[0.08] bg-white/[0.02]">
          <div className="flex items-center gap-2 min-w-0">
            <span className="relative flex h-2 w-2 shrink-0">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400/70" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400" />
            </span>
            <span className="font-mono text-[10px] sm:text-[11px] text-primary truncate">
              Call recorded · 08:42 · Hindi/Hinglish
            </span>
          </div>
          <span className="font-mono text-[9px] uppercase tracking-wider text-tertiary shrink-0">
            100% captured
          </span>
        </div>

        {/* Transcript, fades as it goes down */}
        <div className="px-4 py-3 space-y-2.5">
          {TRANSCRIPT.map((row, i) => (
            <motion.div
              key={row.line}
              initial={{ opacity: 0, x: -8 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.15 + i * 0.12 }}
              className="flex gap-2 sm:gap-3"
              style={{ opacity: row.retain }}
            >
              <span className="font-mono text-[9px] sm:text-[10px] text-tertiary w-14 sm:w-16 shrink-0 pt-0.5">
                {row.speaker}
              </span>
              <p
                className="text-[11px] sm:text-xs text-secondary leading-snug"
                style={{
                  opacity: row.retain,
                  filter: row.retain < 0.5 ? `blur(${(1 - row.retain) * 3}px)` : undefined,
                  textDecoration: row.retain < 0.35 ? "line-through" : undefined,
                  textDecorationColor: "rgba(248,113,113,0.5)",
                }}
              >
                {row.line}
              </p>
            </motion.div>
          ))}
        </div>

        {/* The insight, QA funnel */}
        <div className="px-4 py-3 border-t border-white/[0.08] bg-black/30">
          <div className="flex items-center justify-between mb-2">
            <span className="font-mono text-[9px] uppercase tracking-[0.18em] text-tertiary">
              What ops actually reviews
            </span>
            <motion.span
              className="font-mono text-[10px] text-ember font-semibold"
              animate={{ opacity: [0.7, 1, 0.7] }}
              transition={{ duration: 2.2, repeat: Infinity }}
            >
              ~3% sampled
            </motion.span>
          </div>

          {/* 100 dots, only 3 lit */}
          <div className="flex flex-wrap gap-[3px] mb-3">
            {Array.from({ length: 100 }).map((_, i) => (
              <motion.span
                key={i}
                className={`h-1.5 w-1.5 rounded-full ${
                  i < 3
                    ? "bg-emerald-400/90 shadow-[0_0_6px_rgba(52,211,153,0.5)]"
                    : "bg-white/[0.06]"
                }`}
                initial={{ opacity: 0 }}
                animate={{ opacity: i < 3 ? 1 : [0.15, 0.35, 0.15] }}
                transition={{
                  delay: i * 0.008,
                  duration: 3,
                  repeat: i < 3 ? 0 : Infinity,
                  ease: "easeInOut",
                }}
              />
            ))}
          </div>

          {/* Loss bar */}
          <div className="space-y-1.5">
            <div className="flex justify-between font-mono text-[9px]">
              <span className="text-emerald-400/90">Reviewed</span>
              <span className="text-ember">Intelligence lost</span>
            </div>
            <div className="relative h-2 rounded-full overflow-hidden bg-white/[0.06]">
              <motion.div
                className="absolute inset-y-0 left-0 bg-gradient-to-r from-emerald-500/80 to-emerald-400/40 rounded-full"
                initial={{ width: "8%" }}
                animate={{ width: ["8%", "5%", "8%"] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              />
              <motion.div
                className="absolute inset-y-0 right-0 bg-gradient-to-l from-red-500/70 via-orange-500/50 to-transparent rounded-full"
                initial={{ width: "92%" }}
                animate={{ width: ["92%", "95%", "92%"] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              />
            </div>
            <p className="text-[10px] sm:text-[11px] text-secondary leading-snug pt-0.5">
              Decisions, compliance flags, and revenue signals{" "}
              <span className="text-ember font-medium">gone when the call ends.</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

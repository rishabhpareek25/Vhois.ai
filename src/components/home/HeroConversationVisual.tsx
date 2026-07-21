const LINES = [
  { who: "Customer", text: "Interested in the loan…" },
  { who: "Agent", text: "Sir, EMI kitni comfortable hogi?" },
];

export default function HeroConversationVisual() {
  return (
    <div className="relative w-full">
      <div className="overflow-hidden rounded-lg border border-white/[0.1] bg-void-50/80">
        <div className="flex items-center justify-between gap-2 px-3 py-2 border-b border-white/[0.08]">
          <div className="flex items-center gap-1.5 min-w-0">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 shrink-0" />
            <span className="text-xs text-secondary truncate">Call recorded · 08:42</span>
          </div>
          <span className="text-[10px] text-tertiary shrink-0">100% captured</span>
        </div>

        <div className="px-3 py-2.5 space-y-1.5">
          {LINES.map((row) => (
            <div key={row.text} className="flex gap-2 text-xs">
              <span className="text-tertiary w-14 shrink-0">{row.who}</span>
              <span className="text-secondary">{row.text}</span>
            </div>
          ))}
        </div>

        <div className="px-3 py-2.5 border-t border-white/[0.08] bg-black/20">
          <div className="flex items-center justify-between text-[10px] mb-1.5">
            <span className="text-tertiary">Ops reviews</span>
            <span className="text-ember font-medium">~3% of calls</span>
          </div>
          <div className="h-1.5 rounded-full overflow-hidden bg-white/[0.06]">
            <div className="h-full w-[7%] bg-emerald-500/80 rounded-full" />
          </div>
          <p className="text-[10px] text-tertiary mt-1.5">
            Rest of the insight <span className="text-ember">lost after the call</span>
          </p>
        </div>
      </div>
    </div>
  );
}

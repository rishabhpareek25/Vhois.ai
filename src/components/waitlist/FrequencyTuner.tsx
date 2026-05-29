import { motion } from "framer-motion";

export default function FrequencyTuner({
  value,
  onChange,
  locked,
}: {
  value: number;
  onChange: (hz: number) => void;
  locked: boolean;
}) {
  const pct = ((value - 220) / (880 - 220)) * 100;

  return (
    <div className="space-y-4">
      <div className="flex justify-between text-xs font-mono text-void-600">
        <span>FREQUENCY TUNER</span>
        <motion.span
          key={value}
          initial={{ opacity: 0, y: -4 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-platinum tabular-nums"
        >
          {value} Hz {locked && "· LOCKED ✓"}
        </motion.span>
      </div>
      <div className="relative h-14 rounded-xl border border-void-300 bg-void-50/80 overflow-hidden">
        <motion.div
          className="absolute inset-y-0 left-0 bg-gradient-to-r from-void-600 via-platinum/40 to-platinum/20"
          style={{ width: `${pct}%` }}
        />
        <input
          type="range"
          min={220}
          max={880}
          step={1}
          value={value}
          onChange={(e) => onChange(Number(e.target.value))}
          className="absolute inset-0 w-full h-full opacity-0 cursor-grab active:cursor-grabbing"
        />
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <span className="text-[10px] font-mono text-void-600">
            {locked ? "Signal locked — proceed" : "Drag to lock your wavelength"}
          </span>
        </div>
        {Array.from({ length: 12 }).map((_, i) => (
          <div
            key={i}
            className="absolute top-0 bottom-0 w-px bg-void-300/40"
            style={{ left: `${(i / 11) * 100}%` }}
          />
        ))}
      </div>
    </div>
  );
}

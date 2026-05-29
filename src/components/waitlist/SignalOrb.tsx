import { motion } from "framer-motion";

export default function SignalOrb({
  strength,
  frequencyHz,
}: {
  strength: number;
  frequencyHz: number;
}) {
  const scale = 0.7 + (strength / 100) * 0.6;

  return (
    <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none z-0">
      <motion.div
        animate={{
          scale: [scale, scale * 1.08, scale],
          opacity: [0.15, 0.28, 0.15],
        }}
        transition={{ duration: 2 + frequencyHz / 500, repeat: Infinity }}
        className="w-[min(90vw,520px)] h-[min(90vw,520px)] rounded-full"
        style={{
          background:
            "radial-gradient(circle, rgba(255,255,255,0.12) 0%, rgba(255,255,255,0.04) 40%, transparent 70%)",
          boxShadow: `0 0 ${60 + strength}px rgba(255,255,255,${0.05 + strength / 400})`,
        }}
      />
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
        className="absolute inset-8 border border-platinum/10 rounded-full"
      />
      <motion.div
        animate={{ rotate: -360 }}
        transition={{ duration: 24, repeat: Infinity, ease: "linear" }}
        className="absolute inset-16 border border-dashed border-platinum/5 rounded-full"
      />
    </div>
  );
}

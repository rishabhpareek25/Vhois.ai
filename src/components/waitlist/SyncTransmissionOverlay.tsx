import { motion } from "framer-motion";

const PHASES = [
  "Calibrating voice fingerprint...",
  "Routing to edge nodes...",
  "Encrypting packet...",
  "Syncing diarization engine...",
  "Assigning queue coordinates...",
];

export default function SyncTransmissionOverlay({ phase }: { phase: number }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[70] flex items-center justify-center bg-void/95 backdrop-blur-xl"
    >
      <div className="text-center px-6 max-w-md">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1.2, repeat: Infinity, ease: "linear" }}
          className="w-20 h-20 mx-auto mb-8 border-2 border-platinum/30 border-t-platinum rounded-full"
        />
        <p className="font-mono text-xs text-void-600 mb-2">TRANSMITTING</p>
        <motion.p
          key={phase}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          className="font-mono text-xl text-platinum mb-6"
        >
          {PHASES[phase] ?? PHASES[PHASES.length - 1]}
        </motion.p>
        <div className="flex justify-center gap-1">
          {PHASES.map((_, i) => (
            <motion.div
              key={i}
              animate={{
                scale: i <= phase ? [1, 1.3, 1] : 1,
                opacity: i <= phase ? 1 : 0.25,
              }}
              transition={{ duration: 0.4 }}
              className="w-2 h-2 rounded-full bg-platinum"
            />
          ))}
        </div>
      </div>
    </motion.div>
  );
}

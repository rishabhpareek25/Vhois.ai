import { motion, AnimatePresence } from "framer-motion";

const PHRASES = [
  "Initializing speaker lanes...",
  "Detecting overlap zones...",
  "Mapping utterance boundaries...",
  "Confidence score: rising...",
];

export default function LiveTranscriptPreview({ text }: { text: string }) {
  const words = text.trim().split(/\s+/).filter(Boolean);
  const display = words.slice(-12).join(" ");

  return (
    <div className="rounded-lg border border-void-300/60 bg-void-50/60 p-3 font-mono text-xs">
      <p className="text-void-600 mb-2 flex items-center gap-2">
        <span className="w-1.5 h-1.5 rounded-full bg-platinum animate-pulse" />
        LIVE TRANSCRIPT PREVIEW
      </p>
      <p className="text-platinum min-h-[2.5rem] leading-relaxed">
        {display || (
          <span className="text-void-700 italic">Start typing your use case...</span>
        )}
        <motion.span
          animate={{ opacity: [1, 0] }}
          transition={{ duration: 0.6, repeat: Infinity }}
          className="inline-block w-2 h-4 bg-platinum ml-0.5 align-middle"
        />
      </p>
      <AnimatePresence mode="wait">
        {text.length > 20 && (
          <motion.p
            key={text.length % PHRASES.length}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="text-[10px] text-void-600 mt-2"
          >
            {PHRASES[text.length % PHRASES.length]}
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  );
}

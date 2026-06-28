import { motion } from "framer-motion";
import { CheckCircle2, TrendingUp, AlertCircle } from "lucide-react";

const TRANSCRIPT = [
  { speaker: "Customer", line: "I'm interested in the new enterprise plan, but price is an issue.", type: "intent" },
  { speaker: "Agent", line: "I can offer a 10% discount if we sign this quarter.", type: "commitment" },
  { speaker: "Customer", line: "That sounds reasonable. Send me the details.", type: "next-step" },
];

export default function HeroConversationVisual() {
  return (
    <div className="relative w-full shadow-soft-lg rounded-2xl bg-white border border-gray-100 overflow-hidden transform-gpu hover-lift">
      {/* Header, what this is */}
      <div className="flex items-center justify-between gap-3 px-5 py-3.5 border-b border-gray-100 bg-gray-50/50">
        <div className="flex items-center gap-2 min-w-0">
          <span className="relative flex h-2.5 w-2.5 shrink-0">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary-400 opacity-60" />
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-primary-500" />
          </span>
          <span className="font-semibold text-xs sm:text-sm text-gray-800 truncate">
            Live Analysis: Sales Call #8892
          </span>
        </div>
        <span className="font-mono text-[10px] font-medium uppercase tracking-wider text-primary-600 bg-primary-50 px-2 py-1 rounded-md shrink-0">
          100% Processed
        </span>
      </div>

      {/* Transcript, raw conversation */}
      <div className="px-5 py-4 space-y-4">
        {TRANSCRIPT.map((row, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.15 + i * 0.4 }}
            className="flex flex-col gap-1"
          >
            <span className="font-medium text-[11px] uppercase tracking-wider text-gray-500">
              {row.speaker}
            </span>
            <p className="text-sm text-gray-900 leading-relaxed">
              "{row.line}"
            </p>
          </motion.div>
        ))}
      </div>

      {/* The insight, Structured Data */}
      <div className="px-5 py-4 bg-gray-50 border-t border-gray-100">
        <div className="flex items-center gap-2 mb-3">
          <TrendingUp className="w-4 h-4 text-primary-600" />
          <span className="font-semibold text-xs uppercase tracking-widest text-gray-800">
            Business Intelligence Extracted
          </span>
        </div>

        <div className="space-y-2.5">
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.5 }}
            className="flex items-center justify-between p-2.5 rounded-lg bg-green-50 border border-green-100"
          >
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-green-600" />
              <span className="text-xs font-medium text-green-800">High Purchase Intent</span>
            </div>
            <span className="text-[10px] font-mono text-green-600 bg-green-100 px-1.5 py-0.5 rounded">Detected</span>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.8 }}
            className="flex items-center justify-between p-2.5 rounded-lg bg-blue-50 border border-blue-100"
          >
            <div className="flex items-center gap-2">
              <AlertCircle className="w-4 h-4 text-blue-600" />
              <span className="text-xs font-medium text-blue-800">Objection: Pricing</span>
            </div>
            <span className="text-[10px] font-mono text-blue-600 bg-blue-100 px-1.5 py-0.5 rounded">Logged</span>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 2.1 }}
            className="flex items-center justify-between p-2.5 rounded-lg bg-amber-50 border border-amber-100"
          >
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded-full border-2 border-amber-500 flex items-center justify-center">
                <div className="w-1.5 h-1.5 rounded-full bg-amber-500" />
              </div>
              <span className="text-xs font-medium text-amber-800">Action: Send Proposal</span>
            </div>
            <span className="text-[10px] font-mono text-amber-700 bg-amber-100 px-1.5 py-0.5 rounded">Added to CRM</span>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

import { motion, AnimatePresence } from "framer-motion";
import { Trophy } from "lucide-react";

export default function AchievementToast({
  title,
  subtitle,
  visible,
}: {
  title: string;
  subtitle: string;
  visible: boolean;
}) {
  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, y: 40, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -20, scale: 0.95 }}
          className="fixed bottom-8 left-1/2 -translate-x-1/2 z-[60] flex items-center gap-3 px-5 py-3 rounded-xl glass border border-platinum/30 shadow-glow-white"
        >
          <div className="p-2 rounded-lg bg-platinum/10">
            <Trophy className="w-5 h-5 text-platinum" />
          </div>
          <div>
            <p className="font-mono font-bold text-sm text-platinum">{title}</p>
            <p className="text-xs text-void-600">{subtitle}</p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

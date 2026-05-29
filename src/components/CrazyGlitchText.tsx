import { motion } from "framer-motion";
import { useState } from "react";

interface CrazyGlitchTextProps {
  children: string;
  className?: string;
}

export default function CrazyGlitchText({ children, className = "" }: CrazyGlitchTextProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`relative cursor-pointer group ${className}`}
    >
      {/* Main text */}
      <span className="relative inline-block">{children}</span>

      {/* Glitch layer 1 */}
      {isHovered && (
        <motion.span
          initial={{ opacity: 0, x: 2, y: -2 }}
          animate={{ opacity: 0.8, x: [2, -2, 2], y: [-2, 2, -2] }}
          transition={{ duration: 0.3, repeat: 2 }}
          className="absolute top-0 left-0 text-transparent bg-clip-text bg-gradient-to-r from-platinum to-void-600"
          style={{ mixBlendMode: "screen" }}
        >
          {children}
        </motion.span>
      )}

      {/* Glitch layer 2 */}
      {isHovered && (
        <motion.span
          initial={{ opacity: 0, x: -2, y: 2 }}
          animate={{ opacity: 0.6, x: [-2, 2, -2], y: [2, -2, 2] }}
          transition={{ duration: 0.3, repeat: 2, delay: 0.05 }}
          className="absolute top-0 left-0 text-transparent bg-clip-text bg-gradient-to-r from-void-600 to-platinum"
          style={{ mixBlendMode: "multiply" }}
        >
          {children}
        </motion.span>
      )}
    </motion.div>
  );
}

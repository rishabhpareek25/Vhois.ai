import { motion } from "framer-motion";
import { ReactNode } from "react";

interface CardProps {
  children: ReactNode;
  className?: string;
  glowColor?: "white" | "grey" | "silver" | "cyan" | "purple" | "green" | "none";
  hover3D?: boolean;
}

export default function Card({
  children,
  className = "",
  glowColor = "none",
  hover3D = true,
}: CardProps) {
  const glowStyles: Record<string, string> = {
    white: "hover:shadow-glow-white hover:border-ash-light/30",
    grey: "hover:shadow-glow-grey hover:border-void-600/40",
    silver: "hover:shadow-glow-smoke hover:border-silver/30",
    cyan: "hover:shadow-glow-white hover:border-void-300",
    purple: "hover:shadow-glow-grey hover:border-void-400",
    green: "hover:shadow-glow-smoke hover:border-void-500",
    none: "",
  };

  return (
    <motion.div
      whileHover={
        hover3D
          ? {
              rotateY: 5,
              rotateX: -5,
              scale: 1.02,
              transition: { duration: 0.3 },
            }
          : {}
      }
      className={`glass rounded-xl p-6 border border-void-300 ${glowStyles[glowColor]} transition-all duration-300 ${className}`}
    >
      {children}
    </motion.div>
  );
}

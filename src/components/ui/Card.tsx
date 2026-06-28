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
    white: "hover:shadow-md hover:border-gray-300",
    grey: "hover:shadow-md hover:border-gray-400",
    silver: "hover:shadow-md hover:border-gray-400",
    cyan: "hover:shadow-md hover:border-primary-300",
    purple: "hover:shadow-md hover:border-purple-300",
    green: "hover:shadow-md hover:border-emerald-300",
    none: "hover:shadow-sm hover:border-gray-200",
  };

  return (
    <motion.div
      whileHover={
        hover3D
          ? {
              rotateY: 2,
              rotateX: -2,
              scale: 1.01,
              transition: { duration: 0.3 },
            }
          : {}
      }
      className={`bg-white rounded-2xl p-6 sm:p-8 border border-gray-100 shadow-sm ${glowStyles[glowColor]} transition-all duration-300 ${className}`}
    >
      {children}
    </motion.div>
  );
}

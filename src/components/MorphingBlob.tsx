import { motion } from "framer-motion";

interface MorphingBlobProps {
  className?: string;
  size?: "sm" | "md" | "lg";
}

export default function MorphingBlob({ className = "", size = "md" }: MorphingBlobProps) {
  const sizeMap = {
    sm: "w-32 h-32",
    md: "w-64 h-64",
    lg: "w-96 h-96",
  };

  return (
    <motion.div
      className={`${sizeMap[size]} rounded-full absolute pointer-events-none ${className}`}
      animate={{
        scale: [1, 1.2, 0.9, 1.1, 1],
        rotate: [0, 90, 180, 270, 360],
      }}
      transition={{
        duration: 8,
        repeat: Infinity,
        ease: "easeInOut",
      }}
      style={{
        background: "radial-gradient(circle, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.02) 70%, transparent 100%)",
        filter: "blur(60px)",
      }}
    />
  );
}

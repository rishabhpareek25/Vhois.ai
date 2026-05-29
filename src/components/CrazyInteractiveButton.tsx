import { motion, useMotionValue, useTransform, animate } from "framer-motion";
import { useRef } from "react";
import { ReactNode } from "react";

interface CrazyInteractiveButtonProps {
  children: ReactNode;
  onClick?: () => void;
  variant?: "primary" | "secondary";
  className?: string;
}

export default function CrazyInteractiveButton({
  children,
  onClick,
  variant = "primary",
  className = "",
}: CrazyInteractiveButtonProps) {
  const buttonRef = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const rotateX = useTransform(mouseY, [0, 300], [10, -10]);
  const rotateY = useTransform(mouseX, [0, 300], [-10, 10]);

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = buttonRef.current?.getBoundingClientRect();
    if (!rect) return;

    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    mouseX.set(x);
    mouseY.set(y);
  };

  const handleMouseLeave = () => {
    animate(mouseX, 0, { duration: 0.3 });
    animate(mouseY, 0, { duration: 0.3 });
  };

  const styleMap = {
    primary:
      "bg-platinum text-void hover:shadow-glow-white-lg border border-platinum",
    secondary:
      "bg-transparent border-2 border-platinum text-platinum hover:bg-platinum hover:text-void",
  };

  return (
    <motion.div
      ref={buttonRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX,
        rotateY,
        perspective: 1000,
      }}
      whileHover={{
        scale: 1.08,
        transition: { type: "spring", stiffness: 400, damping: 10 },
      }}
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
      className={`relative px-8 py-3 rounded-lg font-semibold text-lg cursor-pointer transition-all duration-300 overflow-hidden ${styleMap[variant]} ${className}`}
    >
      {/* Shine effect */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-0"
        animate={{ x: ["150%", "-150%"] }}
        transition={{ duration: 1.5, repeat: Infinity, repeatDelay: 2 }}
        style={{ pointerEvents: "none" }}
      />

      {/* Content */}
      <span className="relative z-10 block">{children}</span>

      {/* Glow effect on hover */}
      <motion.div
        className="absolute inset-0 rounded-lg opacity-0 pointer-events-none"
        whileHover={{
          opacity: 1,
          boxShadow: "0 0 30px rgba(255, 255, 255, 0.5)",
        }}
        transition={{ duration: 0.3 }}
      />
    </motion.div>
  );
}

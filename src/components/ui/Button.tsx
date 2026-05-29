import { motion } from "framer-motion";
import { ReactNode } from "react";

type ButtonVariant = "primary" | "secondary" | "ghost" | "outline" | "neon";
type ButtonSize = "sm" | "md" | "lg";

interface ButtonProps {
  children: ReactNode;
  variant?: ButtonVariant;
  size?: ButtonSize;
  className?: string;
  onClick?: () => void;
  disabled?: boolean;
  loading?: boolean;
  /** Use inside <Link> — renders span instead of button to avoid invalid HTML */
  asSpan?: boolean;
}

export default function Button({
  children,
  variant = "primary",
  size = "md",
  className = "",
  onClick,
  disabled = false,
  loading = false,
  asSpan = false,
}: ButtonProps) {
  const baseStyles =
    "relative inline-flex items-center justify-center font-semibold rounded-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed";

  const variants: Record<string, string> = {
    primary:
      "bg-platinum text-void hover:shadow-glow-white-lg active:scale-95 border border-platinum",
    secondary:
      "bg-void-100 text-ash-light border border-void-300 hover:border-void-600 hover:text-platinum",
    ghost: "text-void-600 hover:text-platinum hover:bg-void-100",
    outline: "bg-transparent border-2 border-void-400 text-ash-light hover:border-platinum hover:text-platinum hover:shadow-glow-white",
    neon: "bg-transparent border-2 border-platinum text-platinum hover:bg-void-100 hover:shadow-glow-white",
  };

  const sizes = {
    sm: "px-4 py-2 text-sm",
    md: "px-6 py-2.5 text-base",
    lg: "px-8 py-3 text-lg",
  };

  const Comp = asSpan ? motion.span : motion.button;

  return (
    <Comp
      whileHover={{ scale: disabled ? 1 : 1.05 }}
      whileTap={{ scale: disabled ? 1 : 0.95 }}
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
      onClick={onClick}
      {...(!asSpan && { disabled: disabled || loading })}
      role={asSpan ? "presentation" : undefined}
    >
      {loading ? (
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
          <span>Loading...</span>
        </div>
      ) : (
        children
      )}
    </Comp>
  );
}

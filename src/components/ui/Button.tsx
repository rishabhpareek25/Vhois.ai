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
    "relative inline-flex items-center justify-center font-medium rounded-md transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed";

  const variants: Record<string, string> = {
    primary:
      "bg-primary-600 text-white hover:bg-primary-700 active:scale-[0.98] border border-transparent shadow-sm",
    secondary:
      "bg-gray-100 text-gray-900 border border-transparent hover:bg-gray-200",
    ghost: "text-gray-600 hover:text-gray-900 hover:bg-gray-100",
    outline:
      "bg-white border border-gray-200 text-gray-700 hover:border-gray-300 hover:bg-gray-50 shadow-sm",
    neon: "bg-white border border-primary-200 text-primary-700 hover:bg-primary-50 hover:border-primary-300 shadow-sm",
  };

  const sizes = {
    sm: "px-3 py-1.5 text-xs gap-1.5",
    md: "px-4 py-2 text-sm gap-2",
    lg: "px-5 py-2 text-sm gap-2",
  };

  const Comp = asSpan ? motion.span : motion.button;

  return (
    <Comp
      whileHover={{ scale: disabled ? 1 : 1.02 }}
      whileTap={{ scale: disabled ? 1 : 0.98 }}
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

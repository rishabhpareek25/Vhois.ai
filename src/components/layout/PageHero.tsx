import { motion } from "framer-motion";
import { ReactNode } from "react";

type PageHeroProps = {
  eyebrow?: string;
  title: ReactNode;
  description?: string;
  children?: ReactNode;
  align?: "center" | "left";
};

export default function PageHero({
  eyebrow,
  title,
  description,
  children,
  align = "center",
}: PageHeroProps) {
  const centered = align === "center";

  return (
    <motion.header
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7 }}
      className={`mb-14 sm:mb-16 ${centered ? "text-center max-w-4xl mx-auto" : "max-w-3xl"}`}
    >
      {eyebrow && (
        <p className="text-[10px] sm:text-[11px] font-mono uppercase tracking-[0.22em] text-void-600 mb-4">
          {eyebrow}
        </p>
      )}
      <h1 className="font-sans font-semibold text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-platinum tracking-tight leading-[1.1] mb-5">
        {title}
      </h1>
      {description && (
        <p className="text-base sm:text-lg text-void-600 leading-relaxed">{description}</p>
      )}
      {children && (
        <div className={`mt-8 flex flex-wrap gap-3 ${centered ? "justify-center" : ""}`}>
          {children}
        </div>
      )}
    </motion.header>
  );
}

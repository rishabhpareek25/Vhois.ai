import type { ReactNode } from "react";
import { motion } from "framer-motion";

type SectionHeadingProps = {
  label: string;
  title: ReactNode;
  description?: string;
  align?: "left" | "center";
  accent?: "ember" | "signal" | "primary";
};

const accentClass = {
  ember: "text-ember",
  signal: "text-signal",
  primary: "text-primary",
};

export default function SectionHeading({
  label,
  title,
  description,
  align = "left",
  accent = "ember",
}: SectionHeadingProps) {
  const centered = align === "center";

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className={`mb-6 sm:mb-8 max-w-2xl ${centered ? "mx-auto text-center" : ""}`}
    >
      <p className={`text-sm font-medium mb-2 ${accentClass[accent]}`}>{label}</p>
      <h2
        className={`font-sans font-semibold text-xl sm:text-2xl md:text-[1.75rem] text-primary leading-snug tracking-tight ${centered ? "" : "max-w-xl"}`}
      >
        {title}
      </h2>
      {description && (
        <p
          className={`mt-3 text-sm sm:text-base text-secondary leading-relaxed ${centered ? "max-w-lg mx-auto" : "max-w-lg"}`}
        >
          {description}
        </p>
      )}
    </motion.div>
  );
}

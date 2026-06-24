import { motion } from "framer-motion";
import { ReactNode } from "react";

export type LegalSection = {
  id: string;
  title: string;
  content: ReactNode;
};

type LegalDocumentProps = {
  title: string;
  lastUpdated: string;
  disclaimer?: string;
  sections: LegalSection[];
};

export default function LegalDocument({
  title,
  lastUpdated,
  disclaimer,
  sections,
}: LegalDocumentProps) {
  return (
    <article className="max-w-3xl mx-auto">
      <div className="mb-10 pb-8 border-b border-white/[0.08]">
        <h1 className="font-sans font-semibold text-3xl sm:text-4xl text-platinum tracking-tight mb-3">
          {title}
        </h1>
        <p className="text-sm font-mono text-void-600">Last updated: {lastUpdated}</p>
        {disclaimer && (
          <p className="mt-4 text-sm text-void-700 leading-relaxed rounded-lg border border-amber-500/20 bg-amber-500/[0.06] px-4 py-3">
            {disclaimer}
          </p>
        )}
      </div>

      <nav className="mb-10 hidden sm:block">
        <p className="text-[10px] font-mono uppercase tracking-widest text-void-600 mb-3">
          On this page
        </p>
        <ul className="flex flex-wrap gap-2">
          {sections.map((s) => (
            <li key={s.id}>
              <a
                href={`#${s.id}`}
                className="text-xs font-mono text-void-600 hover:text-platinum px-2.5 py-1 rounded-md border border-white/[0.06] hover:border-white/20 transition-colors"
              >
                {s.title}
              </a>
            </li>
          ))}
        </ul>
      </nav>

      <div className="space-y-10">
        {sections.map((section, i) => (
          <motion.section
            key={section.id}
            id={section.id}
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.02 }}
            className="scroll-mt-28"
          >
            <h2 className="font-sans font-semibold text-xl text-platinum mb-4">{section.title}</h2>
            <div className="text-void-600 text-sm sm:text-base leading-relaxed space-y-3 prose-legal">
              {section.content}
            </div>
          </motion.section>
        ))}
      </div>
    </article>
  );
}

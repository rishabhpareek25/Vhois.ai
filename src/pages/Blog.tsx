import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, PenLine } from "lucide-react";
import Button from "../components/ui/Button";
import PageHero from "../components/layout/PageHero";
import { usePageMeta } from "../hooks/usePageMeta";
import { COMPANY } from "../data/company";

const TOPICS = [
  "Building conversation intelligence for Indian speech",
  "From random QA sampling to 100% call audit",
  "Multilingual ASR in noisy, real-world audio",
  "Evidence trails for compliance and operations",
];

export default function Blog() {
  usePageMeta(
    "Insights",
    `Product notes and engineering insights from ${COMPANY.name}, conversation intelligence for real-world speech.`
  );

  return (
    <div className="min-h-screen pt-28 sm:pt-32 pb-20">
      <div className="page-bleed-narrow">
        <PageHero
          eyebrow="Insights"
          title={
            <>
              Writing from the
              <br />
              <span className="text-void-600">conversation intelligence frontier.</span>
            </>
          }
          description="We're heads-down building. Long-form product notes, engineering write-ups, and pilot learnings will land here as we ship."
        />

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          className="rounded-2xl border border-white/[0.08] bg-void-50/40 p-8 sm:p-10 mb-10"
        >
          <PenLine className="w-6 h-6 text-platinum mb-4" strokeWidth={1.5} />
          <h2 className="font-sans font-semibold text-xl text-platinum mb-3">Coming soon</h2>
          <p className="text-void-600 leading-relaxed mb-6">
            No placeholder articles, when we publish, it will be real work from the {COMPANY.name}{" "}
            team on speech intelligence, India-scale audio, and production QA systems.
          </p>
          <ul className="space-y-2 mb-8">
            {TOPICS.map((topic) => (
              <li key={topic} className="flex gap-2 text-sm text-void-600">
                <span className="text-platinum/40">·</span>
                {topic}
              </li>
            ))}
          </ul>
          <div className="flex flex-wrap gap-3">
            <Link to="/waitlist">
              <Button variant="primary" size="md">
                Join waitlist
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
            <Link to="/contact">
              <Button variant="outline" size="md">
                Talk to us
              </Button>
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

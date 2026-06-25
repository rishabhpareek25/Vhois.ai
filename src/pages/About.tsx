import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Headphones,
  Building2,
  Scale,
  Landmark,
  Users,
  Radio,
  Target,
  Eye,
} from "lucide-react";
import Button from "../components/ui/Button";
import PageHero from "../components/layout/PageHero";
import { usePageMeta } from "../hooks/usePageMeta";

const VERTICALS = [
  { icon: Headphones, title: "Call intelligence", desc: "Agent quality, revenue signals, compliance on every call." },
  { icon: Users, title: "Agent quality audit", desc: "100% coverage, not random samples." },
  { icon: Building2, title: "Meeting intelligence", desc: "Decisions, actions, and accountability from spoken meetings." },
  { icon: Landmark, title: "Governance & public", desc: "Auditable records from policy and public discussions." },
  { icon: Scale, title: "Legal & courtroom", desc: "Timestamped, searchable speech with evidence trails." },
  { icon: Radio, title: "Enterprise knowledge", desc: "Conversation memory that teams can query and trust." },
];

export default function About() {
  usePageMeta(
    "About Us",
    "Vhois AI builds conversation intelligence infrastructure, making spoken knowledge searchable, auditable, and actionable."
  );

  return (
    <div className="min-h-screen pt-28 sm:pt-32 pb-20">
      <div className="page-bleed">
        <PageHero
          eyebrow="About Vhois AI"
          title={
            <>
              Building the intelligence layer
              <br />
              <span className="text-void-600">for human conversations.</span>
            </>
          }
          description="We transform speech into structured intelligence: who spoke, what was said, what matters, and what should happen next. Not transcription alone. Infrastructure for real-world spoken knowledge."
        >
          <Link to="/agent-intelligence">
            <Button variant="primary" size="md">
              Explore Vhois AI
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </Link>
          <Link to="/contact">
            <Button variant="outline" size="md">
              Contact us
            </Button>
          </Link>
        </PageHero>

        {/* Problem */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-20 sm:mb-28 rounded-2xl border border-white/[0.08] bg-white/[0.02] p-8 sm:p-12"
        >
          <p className="text-[11px] font-mono uppercase tracking-[0.2em] text-void-600 mb-4">The gap</p>
          <h2 className="font-sans font-semibold text-2xl sm:text-3xl text-platinum mb-5 leading-tight">
            The world preserves documents. Most spoken knowledge disappears.
          </h2>
          <p className="text-void-600 text-base sm:text-lg leading-relaxed max-w-3xl">
            Businesses archive websites, PDFs, and databases with care. Yet the richest source of
            operational truth: customer calls, team meetings, field conversations, public hearings,
            often vanishes when the conversation ends. Recordings exist. Understanding does not.
          </p>
        </motion.section>

        {/* Mission + What we do */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-20 sm:mb-28">
          <motion.div
            initial={{ opacity: 0, x: -16 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="rounded-2xl border border-white/[0.08] p-8 sm:p-10"
          >
            <Target className="w-6 h-6 text-platinum mb-4" strokeWidth={1.5} />
            <h2 className="font-sans font-semibold text-2xl text-platinum mb-4">Our mission</h2>
            <p className="text-void-600 leading-relaxed">
              Make conversations searchable, understandable, and actionable across languages,
              accents, and noisy real-world audio. We believe spoken knowledge deserves the same
              permanence and utility as written knowledge.
            </p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 16 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="rounded-2xl border border-white/[0.08] bg-gradient-to-br from-white/[0.04] to-transparent p-8 sm:p-10"
          >
            <Radio className="w-6 h-6 text-platinum mb-4" strokeWidth={1.5} />
            <h2 className="font-sans font-semibold text-2xl text-platinum mb-4">What Vhois AI does</h2>
            <p className="text-void-600 leading-relaxed mb-4">
              We build conversation intelligence infrastructure: ingest speech, understand context,
              extract signals, and deliver evidence-backed insights teams can act on.
            </p>
            <ul className="space-y-2 text-sm text-void-600">
              {["Who spoke and when", "What was said, across languages", "What matters for your business", "What action should follow"].map((item) => (
                <li key={item} className="flex items-center gap-2">
                  <span className="w-1 h-1 rounded-full bg-platinum/60" />
                  {item}
                </li>
              ))}
            </ul>
          </motion.div>
        </div>

        {/* Verticals */}
        <section className="mb-20 sm:mb-28">
          <p className="text-[11px] font-mono uppercase tracking-[0.2em] text-void-600 mb-4 text-center">
            Where we apply intelligence
          </p>
          <h2 className="font-sans font-semibold text-2xl sm:text-3xl text-platinum text-center mb-10">
            Verticals we are building for
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {VERTICALS.map((v, i) => (
              <motion.div
                key={v.title}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.04 }}
                className="rounded-xl border border-white/[0.08] bg-void-50/50 p-6 hover:border-white/15 transition-colors"
              >
                <v.icon className="w-5 h-5 text-platinum mb-3" strokeWidth={1.5} />
                <h3 className="font-semibold text-platinum mb-2">{v.title}</h3>
                <p className="text-sm text-void-600 leading-relaxed">{v.desc}</p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Vision */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center rounded-2xl border border-white/[0.1] p-10 sm:p-14 bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,0.05),transparent_70%)]"
        >
          <Eye className="w-8 h-8 text-platinum mx-auto mb-5" strokeWidth={1.5} />
          <h2 className="font-sans font-semibold text-2xl sm:text-4xl text-platinum mb-5 tracking-tight">
            A future where spoken knowledge is as accessible as written knowledge.
          </h2>
          <p className="text-void-600 max-w-2xl mx-auto mb-8 leading-relaxed">
            That is the world we are building toward, one conversation at a time, with rigor,
            evidence, and respect for how people actually speak in India and beyond.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link to="/team">
              <Button variant="outline" size="md">
                Meet the team
              </Button>
            </Link>
            <Link to="/contact">
              <Button variant="primary" size="md">
                Get in touch
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
          </div>
        </motion.section>
      </div>
    </div>
  );
}

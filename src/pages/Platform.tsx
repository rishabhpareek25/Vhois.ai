import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  Mic,
  FileText,
  BarChart3,
  Shield,
  Globe,
  Cpu,
  Layers,
  ArrowRight,
} from "lucide-react";
import Button from "../components/ui/Button";
import { usePageMeta } from "../hooks/usePageMeta";
import { COMPANY } from "../data/company";

const products = [
  {
    icon: Mic,
    title: "Speech ingestion",
    description: "Ingest calls, meetings, and uploads — built for noisy Indian audio.",
    specs: ["Multilingual", "Real-world audio", "Batch & streaming"],
  },
  {
    icon: FileText,
    title: "Transcription & diarization",
    description: "Who spoke, when, and what was said — across Hindi, Hinglish, and regional speech.",
    specs: ["Speaker attribution", "Timestamps", "Searchable transcripts"],
  },
  {
    icon: BarChart3,
    title: "Conversation intelligence",
    description: "QA signals, compliance flags, topics, and actionable insights from spoken data.",
    specs: ["Agent audit", "Compliance signals", "Exportable reports"],
  },
];

const capabilities = [
  { icon: Globe, value: "Indian", label: "Languages & accents" },
  { icon: Cpu, value: "AWS", label: "Cloud-native stack" },
  { icon: Layers, value: "Pilot", label: "Enterprise deployments" },
  { icon: Shield, value: "Secure", label: "Encryption & access control" },
];

const integrations = ["AWS", "REST API", "Webhooks", "CRM (roadmap)", "Dialer (roadmap)"];

export default function Platform() {
  usePageMeta(
    "Platform",
    `${COMPANY.name} platform — speech ingestion, transcription, and conversation intelligence for enterprise workflows.`
  );

  return (
    <div className="min-h-screen pt-28 sm:pt-32 pb-20">
      <div className="page-bleed">
        <motion.header
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16 sm:mb-20 max-w-4xl mx-auto"
        >
          <p className="text-[11px] font-mono uppercase tracking-[0.2em] text-void-600 mb-4">Platform</p>
          <h1 className="font-sans font-semibold text-3xl sm:text-5xl md:text-6xl text-platinum tracking-tight mb-5">
            Conversation intelligence
            <br />
            <span className="text-void-600">infrastructure.</span>
          </h1>
          <p className="text-void-600 text-lg leading-relaxed">{COMPANY.description}</p>
        </motion.header>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-20">
          {products.map((product, i) => (
            <motion.div
              key={product.title}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.06 }}
              className="rounded-2xl border border-white/[0.08] bg-void-50/40 p-7 flex flex-col"
            >
              <div className="p-3 rounded-lg bg-white/[0.04] w-fit mb-5">
                <product.icon className="w-7 h-7 text-platinum" strokeWidth={1.5} />
              </div>
              <h3 className="font-semibold text-xl text-platinum mb-2">{product.title}</h3>
              <p className="text-sm text-void-600 leading-relaxed mb-5 flex-1">{product.description}</p>
              <div className="flex flex-wrap gap-2">
                {product.specs.map((spec) => (
                  <span
                    key={spec}
                    className="text-[10px] font-mono px-2.5 py-1 rounded-full border border-white/[0.08] text-void-600"
                  >
                    {spec}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        <motion.section
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-20"
        >
          <h2 className="font-sans font-semibold text-2xl text-platinum text-center mb-10">
            Built for production workloads
          </h2>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {capabilities.map((spec) => (
              <div
                key={spec.label}
                className="rounded-xl border border-white/[0.08] p-6 text-center bg-white/[0.02]"
              >
                <spec.icon className="w-6 h-6 text-platinum mx-auto mb-3" strokeWidth={1.5} />
                <div className="font-mono font-bold text-xl text-platinum mb-1">{spec.value}</div>
                <div className="text-xs text-void-600">{spec.label}</div>
              </div>
            ))}
          </div>
        </motion.section>

        <motion.section
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="rounded-2xl border border-white/[0.08] p-8 sm:p-12 text-center mb-16"
        >
          <h2 className="font-sans font-semibold text-2xl text-platinum mb-4">Integrations</h2>
          <p className="text-void-600 mb-8 max-w-xl mx-auto">
            Deploy on AWS today. CRM, dialer, and webhook integrations scoped per pilot.
          </p>
          <div className="flex flex-wrap justify-center gap-3 mb-10">
            {integrations.map((name) => (
              <span
                key={name}
                className="px-4 py-2 rounded-lg border border-white/[0.08] font-mono text-sm text-void-600"
              >
                {name}
              </span>
            ))}
          </div>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link to="/agent-intelligence">
              <Button variant="primary" size="md">
                Agent intelligence
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
            <Link to="/contact">
              <Button variant="outline" size="md">
                Discuss integration
              </Button>
            </Link>
          </div>
        </motion.section>
      </div>
    </div>
  );
}

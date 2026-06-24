import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  Cloud,
  Database,
  Lock,
  Mic,
  Webhook,
  Code2,
  Server,
} from "lucide-react";
import Button from "../components/ui/Button";
import PageHero from "../components/layout/PageHero";
import { usePageMeta } from "../hooks/usePageMeta";
import { COMPANY } from "../data/company";

const STACK = [
  {
    icon: Cloud,
    title: "AWS-native deployment",
    description: "Amplify hosting, Lambda APIs, and DynamoDB — built for production from day one.",
  },
  {
    icon: Mic,
    title: "Speech ingestion",
    description: "Upload audio, connect dialers, or stream calls for transcription and intelligence.",
  },
  {
    icon: Database,
    title: "Structured outputs",
    description: "Transcripts, speaker attribution, topics, compliance flags, and searchable records.",
  },
  {
    icon: Webhook,
    title: "Integrations (roadmap)",
    description: "CRM, dialer, and internal stack hooks — scoped per pilot and enterprise engagement.",
  },
];

const ROADMAP = [
  "REST API for transcription and conversation intelligence",
  "Webhook events for QA and compliance workflows",
  "SDKs for Python and Node.js",
  "Sandbox keys for pilot customers",
];

export default function Developers() {
  usePageMeta(
    "Developers",
    `${COMPANY.name} API and integration roadmap — conversation intelligence on AWS.`
  );

  return (
    <div className="min-h-screen pt-28 sm:pt-32 pb-20">
      <div className="page-bleed">
        <PageHero
          eyebrow="Developers"
          title={
            <>
              API & integrations
              <br />
              <span className="text-void-600">in early access.</span>
            </>
          }
          description={`${COMPANY.productSummary} Pilot customers get scoped API access as we expand the developer platform.`}
        >
          <Link to="/waitlist">
            <Button variant="primary" size="md">
              Join developer waitlist
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </Link>
          <Link to="/contact">
            <Button variant="outline" size="md">
              Integration discussion
            </Button>
          </Link>
        </PageHero>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-14">
          {STACK.map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              className="rounded-xl border border-white/[0.08] bg-void-50/40 p-6"
            >
              <item.icon className="w-5 h-5 text-platinum mb-3" strokeWidth={1.5} />
              <h3 className="font-semibold text-platinum mb-2">{item.title}</h3>
              <p className="text-sm text-void-600 leading-relaxed">{item.description}</p>
            </motion.div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-14">
          <motion.div
            initial={{ opacity: 0, x: -12 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="rounded-2xl border border-white/[0.08] p-6 sm:p-8 font-mono text-sm"
          >
            <div className="flex items-center gap-2 text-void-600 mb-4 text-xs uppercase tracking-widest">
              <Code2 className="w-4 h-4" />
              Planned API surface
            </div>
            <pre className="text-void-600 leading-relaxed overflow-x-auto">
{`POST /v1/transcribe
POST /v1/conversations/analyze
GET  /v1/conversations/{id}
POST /v1/webhooks`}
            </pre>
            <p className="text-xs text-void-700 mt-4">
              Endpoints and auth are provided during pilot onboarding — not public yet.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 12 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="rounded-2xl border border-white/[0.08] p-6 sm:p-8"
          >
            <div className="flex items-center gap-2 text-void-600 mb-4 text-xs font-mono uppercase tracking-widest">
              <Server className="w-4 h-4" />
              Roadmap
            </div>
            <ul className="space-y-3">
              {ROADMAP.map((item) => (
                <li key={item} className="flex gap-2 text-sm text-void-600">
                  <span className="text-platinum/50">→</span>
                  {item}
                </li>
              ))}
            </ul>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="rounded-2xl border border-white/[0.1] p-8 sm:p-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 bg-gradient-to-r from-white/[0.04] to-transparent"
        >
          <div className="flex items-start gap-4">
            <Lock className="w-6 h-6 text-platinum shrink-0" strokeWidth={1.5} />
            <div>
              <h2 className="font-semibold text-platinum mb-1">Security-first by design</h2>
              <p className="text-sm text-void-600 leading-relaxed max-w-xl">
                Encryption in transit and at rest, access controls, and audit logging — aligned with
                enterprise conversation data requirements.
              </p>
            </div>
          </div>
          <Link to="/contact" className="shrink-0">
            <Button variant="outline" size="md">
              Request API access
            </Button>
          </Link>
        </motion.div>
      </div>
    </div>
  );
}

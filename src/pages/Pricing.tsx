import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, Check, Rocket, Building2, Scale, Headphones } from "lucide-react";
import Button from "../components/ui/Button";
import PageHero from "../components/layout/PageHero";
import { usePageMeta } from "../hooks/usePageMeta";
import { COMPANY } from "../data/company";

const PILOT_TIERS = [
  {
    icon: Headphones,
    name: "Call intelligence pilot",
    description: "100% call audit, agent QA, compliance signals on your real audio.",
    features: ["Hindi, Hinglish & regional speech", "Misbehavior & compliance flags", "Exportable audit reports"],
    highlight: false,
  },
  {
    icon: Building2,
    name: "Enterprise pilot",
    description: "Meeting intelligence and workflow integration for ops teams.",
    features: ["Meeting transcription & search", "Action items & accountability", "API & webhook roadmap"],
    highlight: true,
  },
  {
    icon: Scale,
    name: "Regulated workflows",
    description: "Legal, governance, and public-meeting intelligence — scoped per engagement.",
    features: ["Timestamped speech records", "Evidence-backed search", "Custom retention policies"],
    highlight: false,
  },
];

export default function Pricing() {
  usePageMeta(
    "Pricing",
    "Early-access pilots for Vhois AI conversation intelligence — contact us for scoped pricing."
  );

  return (
    <div className="min-h-screen pt-28 sm:pt-32 pb-20">
      <div className="page-bleed">
        <PageHero
          eyebrow="Early access"
          title={
            <>
              Pilots built around
              <br />
              <span className="text-void-600">your conversations.</span>
            </>
          }
          description={`${COMPANY.name} is in early access. We scope pilots with contact centers, enterprises, and partners — pricing depends on volume, languages, and deployment model.`}
        >
          <Link to="/contact">
            <Button variant="primary" size="md">
              Request a pilot
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </Link>
          <Link to="/waitlist">
            <Button variant="outline" size="md">
              Join waitlist
            </Button>
          </Link>
        </PageHero>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-16">
          {PILOT_TIERS.map((tier, i) => (
            <motion.div
              key={tier.name}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.06 }}
              className={`rounded-2xl border p-7 sm:p-8 flex flex-col ${
                tier.highlight
                  ? "border-platinum/30 bg-gradient-to-b from-white/[0.06] to-transparent"
                  : "border-white/[0.08] bg-void-50/40"
              }`}
            >
              <tier.icon className="w-6 h-6 text-platinum mb-4" strokeWidth={1.5} />
              <h2 className="font-sans font-semibold text-xl text-platinum mb-2">{tier.name}</h2>
              <p className="text-sm text-void-600 leading-relaxed mb-6 flex-1">{tier.description}</p>
              <ul className="space-y-2.5 mb-6">
                {tier.features.map((f) => (
                  <li key={f} className="flex items-start gap-2 text-sm text-void-600">
                    <Check className="w-4 h-4 text-platinum shrink-0 mt-0.5" strokeWidth={2} />
                    {f}
                  </li>
                ))}
              </ul>
              <Link to="/contact">
                <Button variant={tier.highlight ? "primary" : "outline"} size="sm" className="w-full">
                  Discuss this pilot
                </Button>
              </Link>
            </motion.div>
          ))}
        </div>

        <motion.section
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="rounded-2xl border border-white/[0.1] p-8 sm:p-12 text-center bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,0.04),transparent_70%)]"
        >
          <Rocket className="w-8 h-8 text-platinum mx-auto mb-4" strokeWidth={1.5} />
          <h2 className="font-sans font-semibold text-2xl sm:text-3xl text-platinum mb-4">
            Transparent, scoped engagements
          </h2>
          <p className="text-void-600 max-w-2xl mx-auto mb-8 leading-relaxed">
            We don&apos;t publish list pricing during early access. Every pilot starts with your audio,
            languages, and success criteria — then we propose a clear scope and timeline.
          </p>
          <p className="text-xs font-mono text-void-700">
            {COMPANY.email} · {COMPANY.domain}
          </p>
        </motion.section>
      </div>
    </div>
  );
}

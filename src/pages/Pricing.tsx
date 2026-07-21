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
    description: "Legal, governance, and public-meeting intelligence, scoped per engagement.",
    features: ["Timestamped speech records", "Evidence-backed search", "Custom retention policies"],
    highlight: false,
  },
];

export default function Pricing() {
  usePageMeta(
    "Pricing",
    "Early-access pilots for Vhois AI conversation intelligence, contact us for scoped pricing."
  );

  return (
    <div className="min-h-screen pt-28 sm:pt-32 pb-20 bg-gray-50">
      <div className="page-bleed">
        <PageHero
          eyebrow="Early access"
          title={
            <>
              Pilots built around
              <br />
              <span className="text-primary-600">your conversations.</span>
            </>
          }
          description={`${COMPANY.name} is in early access. We scope pilots with contact centers, enterprises, and partners, pricing depends on volume, languages, and deployment model.`}
        >
          <Link to="/contact">
            <Button variant="primary" size="md">
              Request a pilot
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </Link>
          <Link to="/waitlist">
            <Button variant="outline" size="md" className="bg-white">
              Join waitlist
            </Button>
          </Link>
        </PageHero>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8 mb-20 max-w-6xl mx-auto items-center">
          {PILOT_TIERS.map((tier, i) => (
            <motion.div
              key={tier.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className={`relative rounded-3xl p-8 sm:p-10 flex flex-col transition-all duration-300 ${
                tier.highlight
                  ? "bg-gradient-to-b from-white to-primary-50/50 border-2 border-primary-400 shadow-[0_20px_60px_-15px_rgba(79,70,229,0.3)] scale-100 lg:scale-105 z-10"
                  : "bg-white border border-gray-200 shadow-md hover:shadow-lg"
              }`}
            >
              {tier.highlight && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                  <span className="bg-primary-600 text-white text-[10px] font-bold uppercase tracking-widest px-4 py-1.5 rounded-full shadow-lg shadow-primary-600/30">
                    Most Popular
                  </span>
                </div>
              )}
              <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-6 ${tier.highlight ? 'bg-primary-100 text-primary-700' : 'bg-primary-50 text-primary-600'}`}>
                <tier.icon className="w-7 h-7" strokeWidth={1.5} />
              </div>
              <h2 className="font-sans font-semibold text-2xl mb-3 text-gray-900">{tier.name}</h2>
              <p className={`text-sm leading-relaxed mb-8 flex-1 ${tier.highlight ? 'text-gray-600' : 'text-gray-500'}`}>{tier.description}</p>
              <ul className="space-y-4 mb-10">
                {tier.features.map((f) => (
                  <li key={f} className={`flex items-start gap-3 text-sm ${tier.highlight ? 'text-gray-700 font-medium' : 'text-gray-600'}`}>
                    <Check className={`w-5 h-5 shrink-0 ${tier.highlight ? 'text-primary-600' : 'text-primary-500'}`} strokeWidth={2.5} />
                    <span className="pt-0.5">{f}</span>
                  </li>
                ))}
              </ul>
              <Link to="/contact" className="w-full">
                <Button variant={tier.highlight ? "primary" : "outline"} size="lg" className="w-full">
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
          className="rounded-3xl border border-primary-200 p-10 sm:p-16 text-center bg-gradient-to-br from-primary-50 via-white to-primary-50 shadow-lg relative overflow-hidden max-w-5xl mx-auto"
        >
          <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay pointer-events-none" />
          <div className="relative z-10">
            <div className="w-20 h-20 rounded-full bg-white flex items-center justify-center mx-auto mb-6 shadow-md border border-primary-100">
              <Rocket className="w-10 h-10 text-primary-600" strokeWidth={1.5} />
            </div>
            <h2 className="font-sans font-semibold text-3xl sm:text-4xl text-gray-900 mb-6 tracking-tight">
              Transparent, scoped engagements
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto mb-10 leading-relaxed text-lg">
              We don&apos;t publish list pricing during early access. Every pilot starts with your audio,
              languages, and success criteria, then we propose a clear scope and timeline.
            </p>
            <div className="inline-flex items-center gap-2 bg-white px-5 py-2.5 rounded-full shadow-sm border border-gray-100">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <p className="text-xs font-bold uppercase tracking-widest text-gray-700">
                {COMPANY.email}
              </p>
            </div>
          </div>
        </motion.section>
      </div>
    </div>
  );
}

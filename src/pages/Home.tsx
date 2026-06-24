import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  Mic,
  BarChart3,
  Shield,
  Globe,
  Cpu,
  ArrowRight,
  Eye,
  Languages,
  Database,
  Activity,
} from "lucide-react";
import Button from "../components/ui/Button";
import HorizontalSpectrumVisualizer from "../components/HorizontalSpectrumVisualizer";
import AgentSurveillanceShowcase from "../components/home/AgentSurveillanceShowcase";
import HeroActionDock from "../components/home/HeroActionDock";
import { usePageMeta } from "../hooks/usePageMeta";
import { COMPANY } from "../data/company";

function AnimatedCounter({
  value,
  suffix = "",
  decimals = 0,
}: {
  value: number;
  suffix?: string;
  decimals?: number;
}) {
  const [count, setCount] = useState(0);
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    if (hasAnimated) return;

    const duration = 2000;
    const steps = 60;
    const increment = value / steps;
    let current = 0;

    const timer = setInterval(() => {
      current += increment;
      if (current >= value) {
        setCount(value);
        clearInterval(timer);
        setHasAnimated(true);
      } else {
        setCount(current);
      }
    }, duration / steps);

    return () => clearInterval(timer);
  }, [value, hasAnimated]);

  const display =
    decimals > 0 ? count.toFixed(decimals) : Math.floor(count).toLocaleString();

  return (
    <span className="font-mono font-bold text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-platinum tabular-nums tracking-tight">
      {display}
      {suffix}
    </span>
  );
}

const STATS: Array<
  | { icon: typeof Database; value: number; suffix: string; label: string; animate: true; decimals?: number }
  | { icon: typeof Activity; display: string; suffix: string; label: string; animate: false }
  | { icon: typeof Languages; display: string; suffix: string; label: string; animate: false }
> = [
  {
    icon: Database,
    value: 5,
    suffix: "M+",
    label: "Hours of Indian audio in training data",
    animate: true,
  },
  {
    icon: Activity,
    display: "AWS",
    suffix: "",
    label: "Cloud-native production stack",
    animate: false,
  },
  {
    icon: Languages,
    display: "All",
    suffix: "",
    label: "Indian languages & accents",
    animate: false,
  },
];

const capabilities = [
  {
    index: "01",
    icon: Mic,
    title: "Real-time transcription",
    description: "Sub-100ms latency for live voice-to-text in noisy, real-world audio.",
  },
  {
    index: "02",
    icon: Cpu,
    title: "Speaker diarization",
    description: "Identify who spoke when — including overlap in multi-party calls.",
  },
  {
    index: "03",
    icon: Shield,
    title: "Enterprise security",
    description: "Encryption in transit and at rest, with compliance-ready data handling.",
  },
  {
    index: "04",
    icon: Globe,
    title: "Production scale",
    description: "Built to run continuous call-center workloads, not just demos.",
  },
];

const features = [
  {
    icon: Eye,
    title: "Agent Surveillance",
    description:
      "100% call audit for Indian contact centers — misbehavior, compliance gaps, and missed revenue.",
    specs: "Hindi · Hinglish · all regional languages",
    cta: "Run validation scan",
    link: "/agent-intelligence",
    span: "md:col-span-2 xl:col-span-2 xl:row-span-2",
    featured: true,
  },
  {
    icon: Mic,
    title: "Voice API",
    description: "Streaming and batch audio processing with low-latency inference.",
    specs: "REST + WebSocket · <100ms",
    span: "",
  },
  {
    icon: Cpu,
    title: "Speaker analysis",
    description: "Track speakers, sentiment, and conversational patterns automatically.",
    specs: "Embeddings · overlap detection",
    span: "",
  },
  {
    icon: BarChart3,
    title: "Analytics",
    description: "Operational dashboards and exportable reports for QA teams.",
    specs: "Live monitoring · custom metrics",
    span: "",
  },
  {
    icon: Cpu,
    title: "Custom models",
    description: "Fine-tune on your domain vocabulary, scripts, and acoustic environments.",
    specs: "Private training · edge deploy",
    span: "md:col-span-2 xl:col-span-2",
  },
];

export default function Home() {
  usePageMeta(
    "Home",
    `${COMPANY.description} ${COMPANY.domain}`
  );

  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: containerRef });
  const gridRotate = useTransform(scrollYProgress, [0, 1], ["rotateX(5deg)", "rotateX(-5deg)"]);

  return (
    <div ref={containerRef} className="relative">
      {/* Hero */}
      <section className="relative overflow-hidden pt-24 sm:pt-28 md:pt-32 lg:pt-36 pb-8 sm:pb-12 md:pb-14">
        <motion.div
          style={{ transform: gridRotate }}
          className="absolute inset-0 perspective-1000"
        >
          <div className="absolute inset-0 animated-grid" />
        </motion.div>

        {/* Headline */}
        <div className="relative z-10 page-bleed text-center mb-10 sm:mb-12 md:mb-16">
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.6 }}
            className="text-[10px] sm:text-[11px] font-mono uppercase tracking-[0.16em] sm:tracking-[0.24em] text-void-600 mb-4 sm:mb-6"
          >
            Voice intelligence · India-first
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="font-sans font-semibold text-[2rem] leading-[1.1] sm:text-5xl md:text-6xl xl:text-7xl mb-4 sm:mb-6 tracking-tight text-platinum max-w-4xl mx-auto"
          >
            Audio intelligence
            <br />
            <span className="text-void-600">for real conversations</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="text-base sm:text-lg md:text-xl text-void-600 max-w-2xl mx-auto leading-relaxed font-light px-2"
          >
            Models trained on 5M+ hours of Indian audio — Hindi, Hinglish, and every regional
            language your customers actually use.
          </motion.p>
        </div>

        {/* Entry paths */}
        <div className="relative z-10 page-bleed mb-10 sm:mb-14 md:mb-16">
          <HeroActionDock />
        </div>

        {/* Spectrum — full width */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 1 }}
          className="relative z-10 w-full"
        >
          <HorizontalSpectrumVisualizer />
        </motion.div>
      </section>

      {/* Stats */}
      <section className="relative py-12 sm:py-16 md:py-24 border-y border-white/[0.06]">
        <div className="page-bleed">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="grid grid-cols-1 sm:grid-cols-3 gap-8 sm:gap-10"
          >
            {STATS.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.08, duration: 0.6 }}
                  className="flex flex-col items-center sm:items-start text-center sm:text-left"
                >
                  <Icon className="w-4 h-4 text-void-600 mb-3 sm:mb-4" strokeWidth={1.5} />
                  {stat.animate ? (
                    <AnimatedCounter
                      value={stat.value}
                      suffix={stat.suffix}
                      decimals={"decimals" in stat ? stat.decimals : 0}
                    />
                  ) : (
                    <span className="font-mono font-bold text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-platinum tracking-tight">
                      {"display" in stat ? stat.display : ""}
                      {stat.suffix}
                    </span>
                  )}
                  <p className="text-void-600 text-sm sm:text-base mt-2 sm:mt-3 leading-snug max-w-[16rem] sm:max-w-none">
                    {stat.label}
                  </p>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      <AgentSurveillanceShowcase />

      {/* Capabilities — numbered spec list */}
      <section className="relative py-16 sm:py-24 md:py-32">
        <div className="page-bleed">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-16 md:mb-20"
          >
            <div className="max-w-xl">
              <p className="text-[11px] font-mono uppercase tracking-[0.22em] text-void-600 mb-4">
                Core infrastructure
              </p>
              <h2 className="font-sans font-semibold text-4xl md:text-5xl text-platinum tracking-tight leading-tight">
                What runs under the hood
              </h2>
            </div>
            <p className="text-void-600 text-base md:text-lg max-w-md md:text-right leading-relaxed">
              The same stack powers our API, analytics, and contact-center audits.
            </p>
          </motion.div>

          <div className="space-y-0 border-t border-white/[0.06]">
            {capabilities.map((item, index) => (
              <motion.div
                key={item.index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.06, duration: 0.5 }}
                className="group grid grid-cols-[auto_1fr] md:grid-cols-[4rem_3rem_1fr] gap-4 md:gap-8 items-start py-8 md:py-10 border-b border-white/[0.06] hover:bg-white/[0.02] transition-colors"
              >
                <span className="font-mono text-sm text-void-600 pt-1">{item.index}</span>
                <div className="hidden md:flex w-12 h-12 items-center justify-center text-void-600 group-hover:text-platinum transition-colors">
                  <item.icon className="w-5 h-5" strokeWidth={1.5} />
                </div>
                <div className="min-w-0">
                  <div className="flex items-center gap-3 mb-2 md:mb-3">
                    <item.icon className="w-4 h-4 text-void-600 md:hidden" strokeWidth={1.5} />
                    <h3 className="font-sans font-semibold text-xl md:text-2xl text-platinum tracking-tight">
                      {item.title}
                    </h3>
                  </div>
                  <p className="text-void-600 text-base leading-relaxed max-w-2xl">
                    {item.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features — bento grid */}
      <section className="relative py-16 sm:py-24 md:py-32">
        <div className="page-bleed">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-14 md:mb-16"
          >
            <p className="text-[11px] font-mono uppercase tracking-[0.22em] text-void-600 mb-4">
              Product surface
            </p>
            <h2 className="font-sans font-semibold text-4xl md:text-5xl text-platinum tracking-tight">
              One platform, multiple ways in
            </h2>
            <p className="text-void-600 text-lg mt-4 max-w-2xl leading-relaxed">
              From developer APIs to full call-center surveillance — pick the layer that matches
              your team today.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-px bg-white/[0.06] rounded-xl sm:rounded-2xl overflow-hidden border border-white/[0.06]">
            {features.map((feature, index) => {
              const isFeatured = "featured" in feature && feature.featured;
              const inner = (
                <motion.div
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.04, duration: 0.5 }}
                  className={`relative h-full flex flex-col justify-between p-7 md:p-9 bg-void-50/80 hover:bg-void-100/60 transition-colors duration-300 ${
                    isFeatured ? "min-h-[260px] md:min-h-[280px] xl:min-h-full" : "min-h-[180px] sm:min-h-[200px]"
                  }`}
                >
                  {isFeatured && (
                    <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(239,68,68,0.08),transparent_55%)] pointer-events-none" />
                  )}

                  <div className="relative">
                    <div className="flex items-start justify-between gap-4 mb-6">
                      <feature.icon
                        className={`w-5 h-5 shrink-0 ${isFeatured ? "text-red-300" : "text-void-600"}`}
                        strokeWidth={1.5}
                      />
                      {isFeatured && (
                        <span className="text-[9px] font-mono uppercase tracking-widest text-red-300/90 border border-red-500/25 px-2 py-0.5 rounded-full">
                          Pilot
                        </span>
                      )}
                    </div>
                    <h3 className="font-sans font-semibold text-xl md:text-2xl text-platinum mb-3 tracking-tight">
                      {feature.title}
                    </h3>
                    <p className="text-void-600 text-sm md:text-base leading-relaxed mb-6">
                      {feature.description}
                    </p>
                  </div>

                  <div className="relative mt-auto pt-4 border-t border-white/[0.06]">
                    <p className="text-[11px] font-mono text-void-700 tracking-wide">{feature.specs}</p>
                    {"cta" in feature && feature.cta && (
                      <p className="mt-3 text-sm text-platinum flex items-center gap-1.5 group-hover:gap-2.5 transition-all">
                        {feature.cta}
                        <ArrowRight className="w-3.5 h-3.5" />
                      </p>
                    )}
                  </div>
                </motion.div>
              );

              const cell = (
                <div key={feature.title} className={feature.span}>
                  {"link" in feature && feature.link ? (
                    <Link to={feature.link} className="block h-full group">
                      {inner}
                    </Link>
                  ) : (
                    inner
                  )}
                </div>
              );

              return cell;
            })}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative py-16 sm:py-24">
        <div className="page-bleed">
          <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="relative rounded-2xl border border-white/[0.08] px-8 py-14 md:px-14 md:py-16 text-center overflow-hidden"
          >
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,0.04),transparent_70%)]" />
            <div className="relative z-10">
              <h2 className="font-sans font-semibold text-3xl md:text-5xl text-platinum mb-5 tracking-tight">
                Start with a conversation
              </h2>
              <p className="text-void-600 text-lg mb-8 max-w-lg mx-auto leading-relaxed">
                Join the waitlist for API access, or talk to us about a contact-center pilot.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link to="/waitlist">
                  <Button variant="primary" size="lg">
                    Join waitlist
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </Button>
                </Link>
                <Link to="/contact">
                  <Button variant="ghost" size="lg">
                    Contact us
                  </Button>
                </Link>
                <Link to="/about">
                  <Button variant="outline" size="lg">
                    About Vhois AI
                  </Button>
                </Link>
              </div>
            </div>
          </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}

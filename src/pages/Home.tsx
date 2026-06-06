import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Mic, BarChart3, Shield, Globe, Cpu, ArrowRight, Eye } from "lucide-react";
import Button from "../components/ui/Button";
import Card from "../components/ui/Card";
import HorizontalSpectrumVisualizer from "../components/HorizontalSpectrumVisualizer";
import AgentSurveillanceShowcase from "../components/home/AgentSurveillanceShowcase";
import HeroActionDock from "../components/home/HeroActionDock";

// Animated counter component
function AnimatedCounter({ value, suffix = "" }: { value: number; suffix?: string }) {
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
        setCount(Math.floor(current));
      }
    }, duration / steps);

    return () => clearInterval(timer);
  }, [value, hasAnimated]);

  return (
    <span className="font-mono font-bold text-5xl md:text-6xl text-platinum">
      {count.toLocaleString()}
      {suffix}
    </span>
  );
}

export default function Home() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: containerRef });
  const gridRotate = useTransform(scrollYProgress, [0, 1], ["rotateX(5deg)", "rotateX(-5deg)"]);

  const capabilities = [
    {
      icon: Mic,
      title: "Real-time Transcription",
      description: "Sub-100ms latency for instant voice-to-text conversion",
      color: "white" as const,
    },
    {
      icon: Cpu,
      title: "Speaker Diarization",
      description: "AI-powered speaker identification and segmentation",
      color: "grey" as const,
    },
    {
      icon: Shield,
      title: "Enterprise Security",
      description: "End-to-end encryption with compliance guarantees",
      color: "silver" as const,
    },
    {
      icon: Globe,
      title: "Infinite Scale",
      description: "Process billions of minutes with zero downtime",
      color: "white" as const,
    },
  ];

  const features = [
    {
      icon: Eye,
      title: "Agent Surveillance",
      description: "100% call audit for Indian contact centers — misbehavior, compliance, missed revenue",
      specs: "Hindi · Hinglish · 11+ languages | PMF validation | 2-min scan",
      priority: true,
      link: "/call-center-qa",
    },
    {
      icon: Mic,
      title: "Voice API",
      description: "Real-time audio processing with industry-leading accuracy",
      specs: "50+ languages | <100ms latency | 99.99% uptime",
    },
    {
      icon: Cpu,
      title: "Speaker Analysis",
      description: "Identify, track, and analyze multiple speakers automatically",
      specs: "Unlimited speakers | Speaker embeddings | Sentiment detection",
    },
    {
      icon: BarChart3,
      title: "Analytics Dashboard",
      description: "Deep insights into your voice data with customizable metrics",
      specs: "Real-time monitoring | Custom reports | API access",
    },
    {
      icon: Cpu,
      title: "Custom Models",
      description: "Train domain-specific models on your proprietary data",
      specs: "Fine-tuning | Transfer learning | Model marketplace",
    },
    {
      icon: Globe,
      title: "Global CDN",
      description: "Edge processing nodes in 200+ locations worldwide",
      specs: "Multi-region | Auto-scaling | Disaster recovery",
    },
  ];

  return (
    <div ref={containerRef} className="relative">
      {/* Hero Section */}
      <section className="relative min-h-[85vh] flex items-start justify-center overflow-hidden pt-0 md:pt-4">
        {/* 3D Grid effect */}
        <motion.div
          style={{ transform: gridRotate }}
          className="absolute inset-0 perspective-1000"
        >
          <div className="absolute inset-0 animated-grid" />
        </motion.div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 text-center">
          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="font-mono font-bold text-5xl md:text-7xl lg:text-8xl mb-6 leading-tight"
          >
            <span className="text-gradient">Transcend</span>
            <br />
            <span className="text-platinum">Audio Intelligence</span>
          </motion.h1>

          {/* Subheading */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="text-lg md:text-xl text-void-600 max-w-2xl mx-auto mb-12"
          >
            Enterprise-grade AI infrastructure for voice processing. Engineered for the future
            of technology.
          </motion.p>

          <HeroActionDock />

          {/* NEW: Horizontal Spectrum Visualizer - CRAZIEST ELEMENT */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 1 }}
            className="mt-12 mb-0"
          >
            <HorizontalSpectrumVisualizer />
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2 }}
          className="absolute bottom-8 left-0 right-0 flex justify-center"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="w-6 h-10 border-2 border-void-600 rounded-full flex justify-center pt-2"
          >
            <motion.div
              animate={{ height: [0, 12, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="w-1 bg-platinum rounded-full"
            />
          </motion.div>
        </motion.div>
      </section>

      {/* Stats Section */}
      <section className="relative py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-12"
          >
            {[
              { value: 10, suffix: "B+", label: "Minutes Processed" },
              { value: 99.99, suffix: "%", label: "Uptime SLA" },
              { value: 50, suffix: "+", label: "Languages Supported" },
            ].map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                className="glass rounded-xl p-8 text-center relative overflow-hidden"
              >
                <div className="absolute inset-0 scanline" />
                <AnimatedCounter value={stat.value} suffix={stat.suffix} />
                <p className="text-void-600 text-lg mt-4">{stat.label}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      <AgentSurveillanceShowcase />

      {/* Vision Section */}
      <section className="relative py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="font-mono font-bold text-4xl md:text-5xl mb-4">
              Built for <span className="text-gradient">Tomorrow</span>
            </h2>
            <p className="text-void-600 text-lg max-w-2xl mx-auto">
              Every component engineered for infinite scale and zero compromise
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {capabilities.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
              >
                <Card glowColor={item.color} className="h-full">
                  <div className="flex items-start gap-4">
                    <div className="p-3 rounded-lg bg-void-100">
                      <item.icon className="w-8 h-8 text-platinum" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-mono font-bold text-xl mb-2 text-platinum">{item.title}</h3>
                      <p className="text-void-600">{item.description}</p>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Carousel */}
      <section className="relative py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="font-mono font-bold text-4xl md:text-5xl mb-4">
              Power Your <span className="text-gradient">Innovation</span>
            </h2>
            <p className="text-void-600 text-lg max-w-2xl mx-auto">
              A complete ecosystem for building the next generation of voice experiences
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, index) => {
              const isPriority = "priority" in feature && feature.priority;
              const inner = (
                <Card
                  glowColor="white"
                  className={`h-full relative overflow-hidden group ${
                    isPriority
                      ? "border-red-500/25 shadow-[0_0_40px_rgba(239,68,68,0.08)] hover:shadow-[0_0_50px_rgba(239,68,68,0.14)]"
                      : ""
                  }`}
                >
                  {isPriority && (
                    <div className="absolute top-3 right-3 text-[9px] font-mono font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-red-500/15 border border-red-500/30 text-red-300">
                      VALIDATE
                    </div>
                  )}
                  <div
                    className={`absolute top-0 right-0 w-32 h-32 rounded-full blur-3xl group-hover:opacity-10 transition-opacity ${
                      isPriority ? "bg-red-500 opacity-10" : "bg-platinum opacity-5"
                    }`}
                  />
                  <div className="relative z-10">
                    <div
                      className={`p-3 rounded-lg inline-block mb-4 ${
                        isPriority ? "bg-red-500/10 border border-red-500/20" : "bg-void-100"
                      }`}
                    >
                      <feature.icon className={`w-8 h-8 ${isPriority ? "text-red-300" : "text-platinum"}`} />
                    </div>
                    <h3 className="font-mono font-bold text-xl mb-2 text-platinum">{feature.title}</h3>
                    <p className="text-void-600 mb-4">{feature.description}</p>
                    <div className="text-xs text-void-700 font-mono">{feature.specs}</div>
                    {isPriority && "link" in feature && (
                      <p className="mt-4 text-xs font-mono text-platinum flex items-center gap-1 group-hover:gap-2 transition-all">
                        Run validation scan <ArrowRight className="w-3 h-3" />
                      </p>
                    )}
                  </div>
                </Card>
              );
              return (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.05, duration: 0.6 }}
                  className={isPriority ? "md:col-span-2 lg:col-span-1" : ""}
                >
                  {"link" in feature && feature.link ? (
                    <Link to={feature.link} className="block h-full">
                      {inner}
                    </Link>
                  ) : (
                    inner
                  )}
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-24 px-6">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="glass-dark rounded-2xl p-12 text-center relative overflow-hidden"
          >
            <div className="absolute inset-0 opacity-30">
              <div
                className="absolute inset-0"
                style={{
                  background:
                    "radial-gradient(circle at 50% 50%, rgba(100, 100, 100, 0.15) 0%, transparent 70%)",
                }}
              />
            </div>

            <div className="relative z-10">
              <h2 className="font-mono font-bold text-4xl md:text-5xl mb-6">
                Ready to <span className="text-gradient">Build the Future?</span>
              </h2>
              <p className="text-void-600 text-lg mb-8 max-w-xl mx-auto">
                Start processing voice data in minutes, not months. Free tier available.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link to="/waitlist">
                  <Button variant="primary" size="lg">
                    Join Waitlist
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </Button>
                </Link>
                <Link to="/contact">
                  <Button variant="ghost" size="lg">
                    Contact Sales
                  </Button>
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}

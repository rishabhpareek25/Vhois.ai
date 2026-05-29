import { motion } from "framer-motion";
import {
  Mic,
  FileText,
  BarChart3,
  Code,
  Zap,
  Shield,
  Globe,
  Cpu,
  Layers,
} from "lucide-react";
import Card from "../components/ui/Card";
import Button from "../components/ui/Button";
import ComingSoonLink from "../components/ComingSoonLink";

const products = [
  {
    icon: Mic,
    title: "Voice API",
    description: "Real-time voice processing with <100ms latency",
    specs: ["Multi-language", "Custom Models", "Webhook Events"],
    code: `// Real-time transcription
const response = await vhois.transcribe({
  audio: audioStream,
  language: 'en',
  model: 'neural-v2'
});`,
    color: "cyan" as const,
  },
  {
    icon: FileText,
    title: "Transcription Engine",
    description: "Industry-leading transcription accuracy",
    specs: ["Accent Detection", "Speaker Diarization", "Timestamps"],
    code: `// Advanced features
const result = await vhois.transcribe({
  audio: file,
  features: {
    diarization: true,
    timestamps: true,
    sentiment: true
  }
});`,
    color: "purple" as const,
  },
  {
    icon: BarChart3,
    title: "Analytics Suite",
    description: "Real-time insights and performance metrics",
    specs: ["Live Dashboard", "Custom Reports", "Webhooks"],
    code: `// Analytics query
const metrics = await vhois.analytics.query({
  range: '30d',
  metrics: ['latency', 'volume', 'accuracy']
});`,
    color: "green" as const,
  },
];

const integrations = [
  "AWS",
  "Google Cloud",
  "Azure",
  "Slack",
  "Twilio",
  "Zapier",
  "Webhooks",
  "REST API",
];

const technicalSpecs = [
  {
    icon: Zap,
    value: "99.99%",
    label: "SLA Uptime",
    color: "neon-cyan" as const,
  },
  {
    icon: Globe,
    value: "<100ms",
    label: "Global Latency",
    color: "neon-purple" as const,
  },
  {
    icon: Layers,
    value: "50+",
    label: "Languages",
    color: "neon-green" as const,
  },
  {
    icon: Shield,
    value: "SOC 2",
    label: "Certified",
    color: "neon-cyan" as const,
  },
  {
    icon: Cpu,
    value: "HIPAA",
    label: "Compliant",
    color: "neon-purple" as const,
  },
  {
    icon: Code,
    value: "Custom",
    label: "Models",
    color: "neon-green" as const,
  },
];

export default function Platform() {
  return (
    <div className="min-h-screen pt-32 pb-24">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <h1 className="font-mono font-bold text-5xl md:text-7xl mb-6">
            The Vhois.ai <span className="text-gradient">Ecosystem</span>
          </h1>
          <p className="text-xl text-mist max-w-3xl mx-auto">
            A complete suite of AI-powered voice products, designed for developers and
            enterprises building the future of communication.
          </p>
        </motion.div>

        {/* Product Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-24">
          {products.map((product, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.6 }}
            >
              <Card glowColor={product.color} className="h-full flex flex-col">
                <div className="relative z-10 flex-1 flex flex-col">
                  {/* Icon */}
                  <div className="p-4 rounded-xl bg-void-100 inline-block mb-6 w-fit">
                    <product.icon
                      className={`w-10 h-10 ${
                        product.color === "cyan"
                          ? "text-neon-cyan"
                          : product.color === "purple"
                          ? "text-neon-purple"
                          : "text-neon-green"
                      }`}
                    />
                  </div>

                  {/* Title & Description */}
                  <h3 className="font-mono font-bold text-2xl mb-3">{product.title}</h3>
                  <p className="text-mist mb-4">{product.description}</p>

                  {/* Specs */}
                  <div className="flex flex-wrap gap-2 mb-6">
                    {product.specs.map((spec, i) => (
                      <span
                        key={i}
                        className="text-xs font-mono px-3 py-1 bg-void-100 rounded-full text-mist border border-void-300"
                      >
                        {spec}
                      </span>
                    ))}
                  </div>

                  {/* Code Preview */}
                  <div className="glass rounded-lg p-4 font-code text-xs mb-6 flex-1">
                    <pre className="text-neon-cyan overflow-x-auto">
                      <code>{product.code}</code>
                    </pre>
                  </div>

                  {/* CTA */}
                  <ComingSoonLink feature={product.title}>
                    <Button
                      variant={product.color === "cyan" ? "primary" : "neon"}
                      className="w-full"
                      asSpan
                    >
                      Explore API
                    </Button>
                  </ComingSoonLink>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Technical Specs Grid */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-24"
        >
          <h2 className="font-mono font-bold text-3xl md:text-4xl text-center mb-12">
            Enterprise-Grade <span className="text-gradient">Infrastructure</span>
          </h2>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {technicalSpecs.map((spec, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05, duration: 0.5 }}
                className="glass rounded-xl p-6 text-center relative overflow-hidden group"
              >
                <div
                  className={`absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity`}
                  style={{
                    background: `radial-gradient(circle at center, var(--${spec.color}), transparent)`,
                  }}
                />
                <div className="relative z-10">
                  <spec.icon className={`w-8 h-8 mx-auto mb-3 text-${spec.color}`} />
                  <div className="font-mono font-bold text-2xl mb-1">{spec.value}</div>
                  <div className="text-mist text-sm">{spec.label}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Integrations */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="glass-dark rounded-2xl p-12 relative overflow-hidden"
        >
          <div className="absolute inset-0 opacity-30">
            <div
              className="absolute inset-0"
              style={{
                background:
                  "radial-gradient(circle at 30% 50%, rgba(0, 240, 255, 0.1), transparent 60%), radial-gradient(circle at 70% 50%, rgba(180, 0, 255, 0.1), transparent 60%)",
              }}
            />
          </div>

          <div className="relative z-10 text-center">
            <h2 className="font-mono font-bold text-3xl md:text-4xl mb-4">
              Seamless <span className="text-gradient">Integrations</span>
            </h2>
            <p className="text-mist mb-8 max-w-xl mx-auto">
              Connect with your favorite tools and services in minutes
            </p>

            <div className="flex flex-wrap justify-center gap-4">
              {integrations.map((integration, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.05, duration: 0.5 }}
                  whileHover={{ scale: 1.1, y: -5 }}
                  className="glass px-6 py-3 rounded-lg font-mono text-sm hover:border-neon-cyan transition-all cursor-pointer"
                >
                  {integration}
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

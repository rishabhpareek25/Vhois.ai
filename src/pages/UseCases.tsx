import { motion } from "framer-motion";
import { useState } from "react";
import { Phone, Heart, Video, Building2, ArrowRight, CheckCircle2 } from "lucide-react";
import Card from "../components/ui/Card";
import Button from "../components/ui/Button";
import ComingSoonLink from "../components/ComingSoonLink";

const useCases = [
  {
    id: "support",
    icon: Phone,
    title: "Customer Support",
    challenge: "Handling 10k+ calls daily with 24/7 availability",
    solution: "Vhois.ai real-time transcription + sentiment analysis",
    results: ["40% faster resolution", "99.2% accuracy", "24/7 availability"],
    gradient: "from-neon-cyan to-neon-purple",
  },
  {
    id: "healthcare",
    icon: Heart,
    title: "Healthcare",
    challenge: "HIPAA-compliant voice documentation at scale",
    solution: "Encrypted, secure voice API with compliance guarantees",
    results: ["8 hours/day saved per clinician", "100% HIPAA compliant", "Zero data leakage"],
    gradient: "from-neon-green to-neon-cyan",
  },
  {
    id: "media",
    icon: Video,
    title: "Media & Broadcasting",
    challenge: "Live subtitle generation for global audiences",
    solution: "50+ language support with real-time processing",
    results: ["0 latency streaming", "Perfect sync with video", "50+ languages"],
    gradient: "from-neon-purple to-neon-cyan",
  },
  {
    id: "enterprise",
    icon: Building2,
    title: "Enterprise AI",
    challenge: "Building proprietary voice AI models",
    solution: "Custom model training + fine-tuning on your data",
    results: [
      "Domain-specific accuracy improvements",
      "Private model hosting",
      "Enterprise support",
    ],
    gradient: "from-neon-cyan to-neon-green",
  },
];

export default function UseCases() {
  const [activeTab, setActiveTab] = useState("support");

  const activeCase = useCases.find((uc) => uc.id === activeTab);

  return (
    <div className="min-h-screen pt-32 pb-24">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h1 className="font-mono font-bold text-5xl md:text-7xl mb-6">
            Trusted by <span className="text-gradient">Industry Leaders</span>
          </h1>
          <p className="text-xl text-mist max-w-3xl mx-auto">
            See how leading organizations use Vhois.ai to transform their voice experiences
          </p>
        </motion.div>

        {/* Tabs */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {useCases.map((useCase) => (
            <motion.button
              key={useCase.id}
              onClick={() => setActiveTab(useCase.id)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`px-6 py-3 rounded-lg font-mono text-sm transition-all ${
                activeTab === useCase.id
                  ? "bg-neon-cyan text-void shadow-neon-cyan"
                  : "glass text-mist hover:text-platinum"
              }`}
            >
              {useCase.title}
            </motion.button>
          ))}
        </div>

        {/* Active Case Study */}
        {activeCase && (
          <motion.div
            key={activeCase.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Card glowColor="cyan" className="relative overflow-hidden">
              {/* Background gradient */}
              <div
                className={`absolute inset-0 opacity-10 bg-gradient-to-br ${activeCase.gradient}`}
              />

              <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12">
                {/* Left: Info */}
                <div>
                  <div className="flex items-center gap-4 mb-6">
                    <div className="p-4 rounded-xl bg-void-100">
                      <activeCase.icon className="w-10 h-10 text-neon-cyan" />
                    </div>
                    <h3 className="font-mono font-bold text-3xl">{activeCase.title}</h3>
                  </div>

                  <div className="space-y-6">
                    <div>
                      <h4 className="font-mono text-neon-red text-sm uppercase tracking-wide mb-2">
                        Challenge
                      </h4>
                      <p className="text-platinum text-lg">{activeCase.challenge}</p>
                    </div>

                    <div>
                      <h4 className="font-mono text-neon-green text-sm uppercase tracking-wide mb-2">
                        Solution
                      </h4>
                      <p className="text-platinum text-lg">{activeCase.solution}</p>
                    </div>
                  </div>

                  <div className="mt-8">
                    <ComingSoonLink feature="Case Study">
                      <Button variant="primary" asSpan>
                        View Full Case Study
                        <ArrowRight className="w-5 h-5 ml-2" />
                      </Button>
                    </ComingSoonLink>
                  </div>
                </div>

                {/* Right: Results */}
                <div className="glass-dark rounded-xl p-8">
                  <h4 className="font-mono font-bold text-xl mb-6 text-neon-cyan">
                    Key Results
                  </h4>
                  <div className="space-y-4">
                    {activeCase.results.map((result, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1, duration: 0.5 }}
                        className="flex items-center gap-3"
                      >
                        <CheckCircle2 className="w-6 h-6 text-neon-green flex-shrink-0" />
                        <span className="text-platinum text-lg">{result}</span>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>
            </Card>
          </motion.div>
        )}

        {/* More Use Cases Grid */}
        <div className="mt-24">
          <h2 className="font-mono font-bold text-3xl md:text-4xl text-center mb-12">
            Explore More <span className="text-gradient">Solutions</span>
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              "Call Centers",
              "Podcast Transcription",
              "Voice Assistants",
              "Meeting Notes",
              "Accessibility Tools",
              "Content Creation",
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05, duration: 0.5 }}
                whileHover={{ scale: 1.02 }}
              >
                <Card glowColor="purple" className="cursor-pointer hover-lift">
                  <h3 className="font-mono font-bold text-xl mb-2">{item}</h3>
                  <p className="text-mist text-sm">
                    Learn how Vhois.ai powers {item.toLowerCase()} workflows
                  </p>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

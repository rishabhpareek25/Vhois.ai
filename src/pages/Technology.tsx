import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Server, Cloud, Lock, Code2, Database } from "lucide-react";
import Card from "../components/ui/Card";
import Button from "../components/ui/Button";
import { usePageMeta } from "../hooks/usePageMeta";
import { COMPANY } from "../data/company";

const architectureLayers = [
  {
    title: "Input Layer",
    description: "Voice data ingestion and preprocessing",
    icon: Database,
    specs: ["Real-time streaming", "Audio preprocessing", "Format conversion"],
  },
  {
    title: "Processing Pipeline",
    description: "Neural network inference and analysis",
    icon: Code2,
    specs: ["GPU acceleration", "Batch optimization", "Model routing"],
  },
  {
    title: "Output Layer",
    description: "Results delivery and webhook triggers",
    icon: Server,
    specs: ["Websocket streaming", "REST endpoints", "Event triggers"],
  },
];

export default function Technology() {
  usePageMeta(
    "Technology",
    `${COMPANY.name} engineering, AWS-native speech pipelines built for reliability and scale.`
  );

  return (
    <div className="min-h-screen pt-28 sm:pt-32 pb-20">
      <div className="page-bleed">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <h1 className="font-mono font-bold text-5xl md:text-7xl mb-6">
            Engineering <span className="text-gradient">Excellence</span>
          </h1>
          <p className="text-xl text-mist max-w-3xl mx-auto">
            Built from the ground up for reliability, security, and infinite scale
          </p>
        </motion.div>

        {/* Architecture Diagram */}
        <div className="mb-24">
          <h2 className="font-mono font-bold text-3xl text-center mb-12">
            System <span className="text-gradient">Architecture</span>
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {architectureLayers.map((layer, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
              >
                <Card glowColor="cyan" className="h-full relative">
                  {/* Connection lines */}
                  {index < 2 && (
                    <div className="hidden md:block absolute top-1/2 -right-3 w-6 h-0.5 bg-gradient-to-r from-neon-cyan to-neon-purple opacity-50" />
                  )}

                  <div className="relative z-10">
                    <div className="p-4 rounded-xl bg-void-100 inline-block mb-4">
                      <layer.icon className="w-8 h-8 text-neon-cyan" />
                    </div>
                    <h3 className="font-mono font-bold text-2xl mb-3">{layer.title}</h3>
                    <p className="text-mist mb-4">{layer.description}</p>
                    <ul className="space-y-2">
                      {layer.specs.map((spec, i) => (
                        <li key={i} className="flex items-center gap-2 text-sm">
                          <div className="w-1.5 h-1.5 bg-neon-cyan rounded-full" />
                          <span className="text-platinum">{spec}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Infrastructure Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-24">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <Card glowColor="cyan">
              <div className="p-4 rounded-xl bg-void-100 inline-block mb-4">
                <Database className="w-8 h-8 text-neon-cyan" />
              </div>
              <h3 className="font-mono font-bold text-2xl mb-3">Edge Processing</h3>
              <p className="text-mist mb-4">Data processed at 200+ edge locations globally</p>
              <ul className="space-y-2 text-sm">
                <li className="text-platinum">• Automatic failover</li>
                <li className="text-platinum">• Load balancing</li>
                <li className="text-platinum">• Geographic routing</li>
              </ul>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <Card glowColor="purple">
              <div className="p-4 rounded-xl bg-void-100 inline-block mb-4">
                <Cloud className="w-8 h-8 text-neon-purple" />
              </div>
              <h3 className="font-mono font-bold text-2xl mb-3">Cloud Intelligence</h3>
              <p className="text-mist mb-4">Advanced AI models running on GPU clusters</p>
              <ul className="space-y-2 text-sm">
                <li className="text-platinum">• Neural networks</li>
                <li className="text-platinum">• Transfer learning</li>
                <li className="text-platinum">• Model optimization</li>
              </ul>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <Card glowColor="green">
              <div className="p-4 rounded-xl bg-void-100 inline-block mb-4">
                <Server className="w-8 h-8 text-neon-green" />
              </div>
              <h3 className="font-mono font-bold text-2xl mb-3">Global Distribution</h3>
              <p className="text-mist mb-4">Multi-region deployment with instant scaling</p>
              <ul className="space-y-2 text-sm">
                <li className="text-platinum">• Auto-scaling</li>
                <li className="text-platinum">• Zero downtime</li>
                <li className="text-platinum">• Disaster recovery</li>
              </ul>
            </Card>
          </motion.div>
        </div>

        {/* Security & Compliance */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="glass-dark rounded-2xl p-12 relative overflow-hidden mb-24"
        >
          <div className="absolute top-0 right-0 w-64 h-64 bg-neon-purple rounded-full opacity-10 blur-3xl" />

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="flex items-center gap-4 mb-6">
                <div className="p-4 rounded-xl bg-void-100">
                  <Lock className="w-10 h-10 text-neon-purple" />
                </div>
                <div>
                  <h2 className="font-mono font-bold text-3xl">
                    Security & <span className="text-gradient">Compliance</span>
                  </h2>
                  <p className="text-mist">Built for enterprise</p>
                </div>
              </div>

              <p className="text-mist mb-6">
                Your data never leaves secure infrastructure. End-to-end encryption protects every
                request and response.
              </p>

              <div className="grid grid-cols-2 gap-4">
                {["Encryption at rest & in transit", "Access controls", "Audit logging", "India data handling"].map((item) => (
                  <div key={item} className="glass px-4 py-3 rounded-lg text-center font-mono text-sm text-void-600">
                    {item}
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-4">
              {[
                { title: "End-to-end encryption", desc: "AES-256 encryption at rest and in transit" },
                { title: "Audit logs", desc: "Complete visibility into all API operations" },
                { title: "Access controls", desc: "Role-based permissions and API key management" },
              ].map((feature, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="glass rounded-lg p-4"
                >
                  <h4 className="font-mono font-bold mb-1">{feature.title}</h4>
                  <p className="text-mist text-sm">{feature.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* API Playground Preview */}
        <div className="text-center">
          <h2 className="font-mono font-bold text-3xl mb-6">Explore the API</h2>
          <p className="text-mist mb-8 max-w-xl mx-auto">
            API documentation is available during pilot onboarding
          </p>
          <Link to="/developers">
            <Button variant="primary" size="sm">
              <Code2 className="w-5 h-5 mr-2" />
              Developer platform
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}

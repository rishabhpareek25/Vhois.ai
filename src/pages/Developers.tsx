import { motion } from "framer-motion";
import { useState } from "react";
import { Link } from "react-router-dom";
import { Code, Play, Copy, Check, ExternalLink, Book, Zap, Webhook, Settings } from "lucide-react";
import Card from "../components/ui/Card";

const codeExamples = [
  {
    language: "Python",
    code: `# Install Vhois SDK
pip install vhois-ai

# Quick start
from vhois import Client

client = Client(api_key="your_api_key")
result = client.transcribe("audio.mp3")
print(result.text)`,
  },
  {
    language: "Node.js",
    code: `// Install Vhois SDK
npm install @vhois/ai

// Quick start
import { Vhois } from '@vhois/ai';

const client = new Vhois({ apiKey: 'your_api_key' });
const result = await client.transcribe('audio.mp3');
console.log(result.text);`,
  },
  {
    language: "Go",
    code: `// Install Vhois SDK
go get github.com/vhois/ai

// Quick start
package main

import "github.com/vhois/ai"

func main() {
  client := vhois.New("your_api_key")
  result, _ := client.Transcribe("audio.mp3")
  fmt.Println(result.Text)
}`,
  },
];

const endpoints = [
  {
    method: "POST",
    path: "/transcribe",
    description: "Real-time audio transcription",
    icon: Play,
  },
  {
    method: "POST",
    path: "/analyze",
    description: "Sentiment and emotion analysis",
    icon: Zap,
  },
  {
    method: "POST",
    path: "/synthesize",
    description: "Text-to-speech synthesis",
    icon: Code,
  },
  {
    method: "POST",
    path: "/webhooks",
    description: "Configure webhook endpoints",
    icon: Webhook,
  },
];

const sdks = [
  { name: "Python", icon: "🐍", link: "/coming-soon?feature=Python SDK" },
  { name: "Node.js", icon: "⬢", link: "/coming-soon?feature=Node.js SDK" },
  { name: "Go", icon: "🔷", link: "/coming-soon?feature=Go SDK" },
  { name: "Java", icon: "☕", link: "/coming-soon?feature=Java SDK" },
  { name: "Ruby", icon: "💎", link: "/coming-soon?feature=Ruby SDK" },
  { name: "PHP", icon: "🐘", link: "/coming-soon?feature=PHP SDK" },
];

export default function Developers() {
  const [activeLanguage, setActiveLanguage] = useState("Python");
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    const code = codeExamples.find((ex) => ex.language === activeLanguage)?.code || "";
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

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
            Powerful APIs for <span className="text-gradient">Modern Developers</span>
          </h1>
          <p className="text-xl text-mist max-w-3xl mx-auto">
            Build voice experiences in minutes with our intuitive APIs and comprehensive SDKs
          </p>
        </motion.div>

        {/* Code Playground */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-24"
        >
          <div className="glass-dark rounded-2xl overflow-hidden">
            {/* Tabs */}
            <div className="flex items-center gap-2 px-6 py-4 border-b border-void-300">
              {codeExamples.map((example) => (
                <button
                  key={example.language}
                  onClick={() => setActiveLanguage(example.language)}
                  className={`px-4 py-2 rounded-lg font-mono text-sm transition-all ${
                    activeLanguage === example.language
                      ? "bg-neon-cyan text-void"
                      : "text-mist hover:text-platinum"
                  }`}
                >
                  {example.language}
                </button>
              ))}
              <div className="ml-auto">
                <button
                  onClick={handleCopy}
                  className="p-2 rounded-lg hover:bg-void-100 transition-colors"
                  aria-label="Copy code"
                >
                  {copied ? <Check className="w-5 h-5 text-neon-green" /> : <Copy className="w-5 h-5 text-mist" />}
                </button>
              </div>
            </div>

            {/* Code */}
            <div className="p-6 font-code text-sm overflow-x-auto">
              <pre className="text-neon-cyan">
                <code>{codeExamples.find((ex) => ex.language === activeLanguage)?.code}</code>
              </pre>
            </div>
          </div>
        </motion.div>

        {/* API Endpoints */}
        <div className="mb-24">
          <h2 className="font-mono font-bold text-3xl mb-8 text-center">
            Core <span className="text-gradient">Endpoints</span>
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {endpoints.map((endpoint, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
              >
                <Card glowColor="cyan" className="cursor-pointer hover-lift">
                  <div className="p-3 rounded-lg bg-void-100 inline-block mb-4">
                    <endpoint.icon className="w-6 h-6 text-neon-cyan" />
                  </div>
                  <div className="font-mono text-xs text-neon-purple mb-2">{endpoint.method}</div>
                  <h3 className="font-mono font-bold text-lg mb-2">{endpoint.path}</h3>
                  <p className="text-mist text-sm">{endpoint.description}</p>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>

        {/* SDKs */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-24"
        >
          <h2 className="font-mono font-bold text-3xl mb-8 text-center">
            Official <span className="text-gradient">SDKs</span>
          </h2>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {sdks.map((sdk, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05, duration: 0.5 }}
                whileHover={{ scale: 1.1 }}
              >
                <Link
                  to={sdk.link}
                  className="block glass rounded-xl p-6 text-center hover:border-platinum/40 transition-colors"
                >
                  <div className="text-4xl mb-3">{sdk.icon}</div>
                  <div className="font-mono text-sm text-platinum">{sdk.name}</div>
                </Link>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Resources */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            {
              icon: Book,
              title: "Documentation",
              description: "Comprehensive guides and API reference",
              link: "/coming-soon?feature=Documentation",
            },
            {
              icon: Settings,
              title: "API Playground",
              description: "Test API calls in your browser",
              link: "/coming-soon?feature=API Playground",
            },
            {
              icon: Webhook,
              title: "Changelog",
              description: "Latest updates and API changes",
              link: "/coming-soon?feature=Changelog",
            },
          ].map((resource, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
            >
              <Link to={resource.link}>
                <Card glowColor="white" className="hover-lift cursor-pointer h-full">
                  <resource.icon className="w-8 h-8 text-platinum mb-4" />
                  <h3 className="font-mono font-bold text-xl mb-2 text-platinum">{resource.title}</h3>
                  <p className="text-void-600 text-sm">{resource.description}</p>
                  <div className="mt-4 text-platinum text-sm flex items-center gap-2">
                    Learn more <ExternalLink className="w-4 h-4" />
                  </div>
                </Card>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}

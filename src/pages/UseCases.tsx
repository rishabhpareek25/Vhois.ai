import { motion } from "framer-motion";
import { useState } from "react";
import { Link } from "react-router-dom";
import { Phone, Video, Building2, ArrowRight, CheckCircle2, Headphones } from "lucide-react";
import Card from "../components/ui/Card";
import Button from "../components/ui/Button";
import { COMPANY } from "../data/company";
import { usePageMeta } from "../hooks/usePageMeta";

const useCases = [
  {
    id: "callcenter",
    icon: Headphones,
    title: "Agent surveillance",
    challenge: "QA teams review a small fraction of calls — issues and missed revenue slip through",
    solution: `${COMPANY.name} audits 100% of calls in Hindi, Hinglish & regional languages`,
    results: ["Full call coverage", "Misbehavior detection", "Revenue & compliance signals", "Searchable audit trail"],
    gradient: "from-red-500 to-orange-500",
    liveLink: "/agent-intelligence",
  },
  {
    id: "support",
    icon: Phone,
    title: "Customer support",
    challenge: "High call volume with limited visibility into quality and resolution patterns",
    solution: "Real-time transcription, sentiment signals, and searchable conversation history",
    results: ["Faster QA review", "Trend detection across calls", "Multilingual support"],
    gradient: "from-white/20 to-white/5",
  },
  {
    id: "meetings",
    icon: Building2,
    title: "Enterprise meetings",
    challenge: "Decisions and action items get lost after spoken meetings end",
    solution: "Meeting intelligence with transcripts, speakers, and accountability signals",
    results: ["Searchable meeting records", "Action item extraction", "Team-wide visibility"],
    gradient: "from-blue-500/25 to-blue-500/5",
  },
  {
    id: "governance",
    icon: Video,
    title: "Governance & public",
    challenge: "Public and policy discussions need auditable, searchable records",
    solution: "Timestamped speech intelligence with evidence-backed search",
    results: ["Auditable transcripts", "Speaker attribution", "Export for review"],
    gradient: "from-violet-500/30 to-violet-500/5",
  },
  {
    id: "legal",
    icon: Building2,
    title: "Legal workflows",
    challenge: "Spoken proceedings require precise, searchable documentation",
    solution: "Structured speech records designed for review and retrieval workflows",
    results: ["Timestamped records", "Multilingual transcription", "Secure handling"],
    gradient: "from-emerald-500/30 to-emerald-500/5",
  },
];

export default function UseCases() {
  const [activeTab, setActiveTab] = useState("callcenter");
  usePageMeta(
    "Use Cases",
    `How ${COMPANY.name} applies conversation intelligence to calls, meetings, governance, and enterprise workflows.`
  );

  const activeCase = useCases.find((uc) => uc.id === activeTab);

  return (
    <div className="min-h-screen pt-28 sm:pt-32 pb-20">
      <div className="page-bleed">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h1 className="font-sans font-semibold text-4xl md:text-6xl text-platinum mb-6 tracking-tight">
            Built for <span className="text-void-600">real conversations</span>
          </h1>
          <p className="text-lg text-void-600 max-w-3xl mx-auto leading-relaxed">
            {COMPANY.name} turns spoken operational knowledge into structured intelligence — across
            contact centers, meetings, and regulated workflows.
          </p>
        </motion.div>

        {/* Tabs */}
        <div className="flex flex-wrap justify-center gap-2 sm:gap-3 mb-12">
          {useCases.map((useCase) => {
            const isActive = activeTab === useCase.id;
            return (
            <motion.button
              key={useCase.id}
              onClick={() => setActiveTab(useCase.id)}
              whileHover={{ scale: isActive ? 1 : 1.03 }}
              whileTap={{ scale: 0.97 }}
              className={`px-5 sm:px-6 py-2.5 sm:py-3 rounded-lg font-mono text-sm transition-all border ${
                isActive
                  ? "bg-platinum text-void border-platinum shadow-glow-white font-semibold"
                  : "bg-void-50/60 text-void-600 border-white/[0.08] hover:text-platinum hover:border-white/25 hover:bg-white/[0.04]"
              }`}
            >
              {useCase.title}
            </motion.button>
            );
          })}
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
                      <activeCase.icon className="w-10 h-10 text-platinum" />
                    </div>
                    <h3 className="font-mono font-bold text-3xl">{activeCase.title}</h3>
                  </div>

                  <div className="space-y-6">
                    <div>
                      <h4 className="font-mono text-red-300 text-sm uppercase tracking-wide mb-2">
                        Challenge
                      </h4>
                      <p className="text-platinum text-lg">{activeCase.challenge}</p>
                    </div>

                    <div>
                      <h4 className="font-mono text-emerald-300 text-sm uppercase tracking-wide mb-2">
                        Solution
                      </h4>
                      <p className="text-platinum text-lg">{activeCase.solution}</p>
                    </div>
                  </div>

                  <div className="mt-8">
                    {"liveLink" in activeCase && activeCase.liveLink ? (
                      <Link to={activeCase.liveLink}>
                        <Button variant="primary" asSpan>
                          Explore Agent Intelligence
                          <ArrowRight className="w-5 h-5 ml-2" />
                        </Button>
                      </Link>
                    ) : (
                      <Link to="/contact">
                        <Button variant="primary" asSpan>
                          Discuss this use case
                          <ArrowRight className="w-5 h-5 ml-2" />
                        </Button>
                      </Link>
                    )}
                  </div>
                </div>

                {/* Right: Results */}
                <div className="glass-dark rounded-xl p-8">
                  <h4 className="font-mono font-bold text-xl mb-6 text-platinum">
                    Capabilities
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
                        <CheckCircle2 className="w-6 h-6 text-emerald-400 flex-shrink-0" />
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
              { title: "Call Centers", link: "/agent-intelligence", live: true },
              { title: "Podcast Transcription", link: null, live: false },
              { title: "Voice Assistants", link: null, live: false },
              { title: "Meeting Notes", link: null, live: false },
              { title: "Accessibility Tools", link: null, live: false },
              { title: "Content Creation", link: null, live: false },
            ].map((item, index) => {
              const card = (
                <Card
                  glowColor={item.live ? "white" : "purple"}
                  className={`cursor-pointer hover-lift ${item.live ? "border-red-500/20" : ""}`}
                >
                  {item.live && (
                    <span className="text-[9px] font-mono font-bold uppercase text-red-300/90 mb-2 inline-block">
                      ● PMF Pilot
                    </span>
                  )}
                  <h3 className="font-mono font-bold text-xl mb-2">{item.title}</h3>
                  <p className="text-void-600 text-sm">
                    {item.live
                      ? "100% call audit for Indian contact centers"
                      : `Conversation intelligence for ${item.title.toLowerCase()}`}
                  </p>
                </Card>
              );
              return (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.05, duration: 0.5 }}
                  whileHover={{ scale: 1.02 }}
                >
                  {item.link ? <Link to={item.link}>{card}</Link> : card}
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

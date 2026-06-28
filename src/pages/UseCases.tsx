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
    challenge: "QA teams review a small fraction of calls, issues and missed revenue slip through",
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
    <div className="min-h-screen pt-20 sm:pt-24 pb-12 bg-gray-50">
      <div className="page-bleed">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-8"
        >
          <h1 className="font-sans font-semibold text-3xl md:text-5xl text-gray-900 mb-4 tracking-tight">
            Built for <span className="text-primary-600">real conversations</span>
          </h1>
          <p className="text-base text-gray-600 max-w-2xl mx-auto leading-relaxed">
            {COMPANY.name} turns spoken operational knowledge into structured intelligence, across
            contact centers, meetings, and regulated workflows.
          </p>
        </motion.div>

        {/* Tabs */}
        <div className="flex justify-center mb-8">
          <div className="inline-flex flex-wrap justify-center p-1.5 bg-gray-100/80 backdrop-blur-sm rounded-2xl gap-1 mx-auto shadow-sm border border-gray-200/50">
            {useCases.map((useCase) => {
              const isActive = activeTab === useCase.id;
              return (
              <motion.button
                key={useCase.id}
                onClick={() => setActiveTab(useCase.id)}
                whileHover={{ scale: isActive ? 1 : 1.02 }}
                whileTap={{ scale: 0.98 }}
                className={`px-5 py-2.5 rounded-xl font-sans text-sm sm:text-base transition-all duration-300 ${
                  isActive
                    ? "bg-white text-gray-900 shadow-md font-semibold ring-1 ring-gray-200"
                    : "bg-transparent text-gray-500 hover:text-gray-900 hover:bg-gray-50/50 font-medium"
                }`}
              >
                {useCase.title}
              </motion.button>
              );
            })}
          </div>
        </div>

        {/* Active Case Study */}
        {activeCase && (
          <motion.div
            key={activeCase.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="relative z-10 w-full max-w-5xl mx-auto mt-2">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-stretch">
                {/* Left: Info (Takes up 7 columns) */}
                <div className="lg:col-span-7 bg-white rounded-3xl border border-gray-200 shadow-xl shadow-gray-200/40 p-6 sm:p-8 flex flex-col justify-between relative overflow-hidden group">
                  <div className="absolute top-0 right-0 w-64 h-64 bg-primary-50/50 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/3 pointer-events-none" />
                  
                  <div className="relative z-10">
                    <div className="flex items-center gap-4 mb-6">
                      <div className="p-3 rounded-2xl bg-gradient-to-br from-primary-50 to-indigo-50 border border-primary-100 shadow-sm text-primary-600">
                        <activeCase.icon className="w-6 h-6" strokeWidth={1.5} />
                      </div>
                      <h3 className="font-sans font-bold text-2xl sm:text-3xl text-gray-900 tracking-tight">{activeCase.title}</h3>
                    </div>

                    <div className="space-y-4">
                      <div className="relative pl-5 before:absolute before:left-0 before:top-1.5 before:bottom-1.5 before:w-1 before:bg-gray-200 before:rounded-full">
                        <h4 className="font-bold text-gray-400 text-[10px] uppercase tracking-[0.2em] mb-1.5">
                          The Challenge
                        </h4>
                        <p className="text-gray-500 text-sm leading-relaxed">{activeCase.challenge}</p>
                      </div>

                      <div className="relative pl-5 before:absolute before:left-0 before:top-1.5 before:bottom-1.5 before:w-1 before:bg-primary-500 before:rounded-full">
                        <h4 className="font-bold text-primary-600 text-[10px] uppercase tracking-[0.2em] mb-1.5">
                          The Solution
                        </h4>
                        <p className="text-gray-900 text-base font-medium leading-relaxed">{activeCase.solution}</p>
                      </div>
                    </div>
                  </div>

                  <div className="mt-6 relative z-10">
                    {"liveLink" in activeCase && activeCase.liveLink ? (
                      <Link to={activeCase.liveLink}>
                        <Button variant="primary" size="sm" asSpan>
                          Explore Agent Intelligence
                          <ArrowRight className="w-4 h-4 ml-2" />
                        </Button>
                      </Link>
                    ) : (
                      <Link to="/contact">
                        <Button variant="primary" size="sm" asSpan>
                          Discuss this use case
                          <ArrowRight className="w-4 h-4 ml-2" />
                        </Button>
                      </Link>
                    )}
                  </div>
                </div>

                {/* Right: Results / Capabilities (Takes up 5 columns) */}
                <div className="lg:col-span-5 bg-gradient-to-br from-gray-50 to-white rounded-3xl border border-gray-200 shadow-md p-6 sm:p-8 flex flex-col justify-center">
                  <h4 className="font-sans font-bold text-xl mb-4 text-gray-900 tracking-tight flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-primary-500 animate-pulse" />
                    Key Capabilities
                  </h4>
                  <div className="space-y-3">
                    {activeCase.results.map((result, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1, duration: 0.4 }}
                        className="flex items-center gap-3 bg-white p-3.5 rounded-2xl border border-gray-100 shadow-sm hover:border-primary-200 hover:shadow-md transition-all group/item"
                      >
                        <div className="p-1 rounded-full bg-primary-50 text-primary-500 group-hover/item:bg-primary-100 group-hover/item:text-primary-600 transition-colors">
                          <CheckCircle2 className="w-4 h-4 flex-shrink-0" strokeWidth={2.5} />
                        </div>
                        <span className="text-gray-700 text-sm font-medium">{result}</span>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* More Use Cases Grid */}
        <div className="mt-24">
          <h2 className="font-sans font-bold text-3xl md:text-4xl text-center mb-12 tracking-tight text-gray-900">
            Explore More Solutions
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { title: "Call Centers", link: "/agent-intelligence", live: true, desc: "100% call audit for Indian contact centers" },
              { title: "Podcast Transcription", link: null, live: false, desc: "Searchable archives for long-form audio" },
              { title: "Voice Assistants", link: null, live: false, desc: "Analyze user queries and intent" },
              { title: "Meeting Notes", link: null, live: false, desc: "Automated extraction of action items" },
              { title: "Accessibility Tools", link: null, live: false, desc: "Real-time captions for live events" },
              { title: "Content Creation", link: null, live: false, desc: "Transcribe interviews and field recordings" },
            ].map((item, index) => {
              const card = (
                <div className={`p-6 sm:p-8 rounded-2xl bg-white border border-gray-200 shadow-sm hover:shadow-xl hover:border-primary-200 transition-all duration-300 h-full flex flex-col ${item.live ? "ring-1 ring-primary-500/10" : ""}`}>
                  {item.live && (
                    <span className="text-[10px] font-bold uppercase tracking-widest text-primary-600 mb-4 flex items-center gap-1.5 bg-primary-50 w-fit px-3 py-1 rounded-full">
                      <span className="w-1.5 h-1.5 rounded-full bg-primary-500 animate-pulse" />
                      Live product
                    </span>
                  )}
                  <h3 className={`font-sans font-semibold text-xl mb-3 ${item.live ? 'text-gray-900 mt-0' : 'text-gray-900 mt-2'}`}>{item.title}</h3>
                  <p className="text-gray-500 text-sm leading-relaxed flex-1">
                    {item.desc}
                  </p>
                </div>
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

import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  TrendingUp,
  ShieldAlert,
  Award,
  Zap,
  ArrowRight,
  Activity,
  CheckCircle2,
  PhoneCall,
  BrainCircuit,
  BarChart3
} from "lucide-react";
import Button from "../ui/Button";

const ALERTS = [
  "Sales: High-intent verbal agreement captured on Call #8892",
  "Compliance: Agent #42 missed mandatory script disclaimer",
  "Operations: 145 calls summarized and logged to CRM",
  "QA: 100% of today's calls audited successfully",
];

const TRANSCRIPT_LINES = [
  { id: 1, speaker: "CUSTOMER", text: "I'm interested, but the price seems a bit high for our team.", type: "neutral" },
  { id: 2, speaker: "AGENT", text: "I understand. If we can do a 10% discount, would you be ready to move forward today?", type: "neutral" },
  { id: 3, speaker: "VHOIS AI", text: "Intent: High | Objection: Pricing | Action: Discount Offered", type: "insight" },
  { id: 4, speaker: "CUSTOMER", text: "Yes, send over the agreement.", type: "neutral" },
  { id: 5, speaker: "VHOIS AI", text: "Verbal Agreement Captured | CRM Updated Automatically", type: "success" },
  { id: 6, speaker: "AGENT", text: "Perfect, it should be in your inbox now.", type: "neutral" },
];

export default function AgentSurveillanceShowcase() {
  const [alertIdx, setAlertIdx] = useState(0);
  const [visibleLines, setVisibleLines] = useState<number[]>([0]);

  useEffect(() => {
    const alertTimer = setInterval(() => setAlertIdx((i) => (i + 1) % ALERTS.length), 3500);
    
    let currentIdx = 0;
    const lineTimer = setInterval(() => {
      currentIdx = (currentIdx + 1) % TRANSCRIPT_LINES.length;
      setVisibleLines(prev => {
        const next = [...prev, currentIdx];
        if (next.length > 3) next.shift(); // Keep only last 3 messages
        return next;
      });
    }, 2800);

    return () => {
      clearInterval(alertTimer);
      clearInterval(lineTimer);
    };
  }, []);

  return (
    <section id="business-impact" className="relative pt-4 sm:pt-8 pb-6 sm:pb-20 bg-white overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-primary-100/30 blur-[100px] pointer-events-none rounded-full -translate-y-1/2 translate-x-1/3" />
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-indigo-100/30 blur-[100px] pointer-events-none rounded-full translate-y-1/3 -translate-x-1/3" />
      
      <div className="page-bleed relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12 sm:mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-gray-200 bg-white shadow-sm mb-6">
            <TrendingUp className="w-4 h-4 text-primary-600" />
            <span className="text-xs font-bold uppercase tracking-widest text-gray-700">Business Impact</span>
          </div>
          <h2 className="font-display font-bold text-4xl sm:text-5xl md:text-6xl text-gray-900 mb-6 tracking-tight leading-[1.1] max-w-4xl mx-auto">
            Measurable results across your <span className="text-gradient">entire organization</span>
          </h2>
          <p className="text-gray-500 text-lg sm:text-xl max-w-2xl mx-auto leading-relaxed">
            See how 100% conversation coverage drives revenue, ensures compliance, automates quality assurance, and eliminates manual data entry.
          </p>
        </motion.div>

        {/* Bento Box Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-6 max-w-[1300px] mx-auto px-4 sm:px-6 items-stretch">
          
          {/* Main Transcript Bento (Dashboard Feel) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="lg:col-span-7 bg-white rounded-[1.5rem] p-6 shadow-soft-xl border border-gray-100 flex flex-col relative overflow-hidden h-full"
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 pb-4 border-b border-gray-100 relative z-10 gap-4">
              <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2">
                <BrainCircuit className="w-5 h-5 text-primary-600" />
                Live Call Analysis
              </h3>
              <div className="flex items-center gap-2 px-3 py-1 bg-green-50 text-green-700 rounded-full text-[10px] font-bold uppercase tracking-wider border border-green-200 shadow-sm">
                <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                Call #8892
              </div>
            </div>
            
            <div className="flex-1 grid grid-cols-1 md:grid-cols-5 gap-6 relative z-10">
              
              {/* Left Column: Live Feed */}
              <div className="md:col-span-3 flex flex-col justify-end relative h-full min-h-[280px]">
                {/* Fade out top for older messages */}
                <div className="absolute top-0 left-0 w-full h-12 bg-gradient-to-b from-white to-transparent z-10 pointer-events-none" />
                
                <div className="flex flex-col justify-end h-full w-full relative overflow-hidden">
                  <AnimatePresence initial={false}>
                    {visibleLines.map((lineIdx) => (
                      <motion.div
                        key={TRANSCRIPT_LINES[lineIdx].id}
                        layout
                        initial={{ opacity: 0, x: -20, scale: 0.95 }}
                        animate={{ opacity: 1, x: 0, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.9, filter: "blur(4px)", transition: { duration: 0.2 } }}
                        transition={{ type: "spring", stiffness: 400, damping: 30 }}
                        className={`p-3 rounded-xl mb-2 border shadow-sm shrink-0 ${
                          TRANSCRIPT_LINES[lineIdx].type === 'insight' 
                            ? "bg-primary-50/50 border-primary-200 ml-4" 
                            : TRANSCRIPT_LINES[lineIdx].type === 'success'
                              ? "bg-green-50/50 border-green-200 ml-4"
                              : TRANSCRIPT_LINES[lineIdx].speaker === 'AGENT'
                                ? "bg-white border-gray-200 ml-4"
                                : "bg-gray-50 border-gray-200 mr-4"
                        }`}
                      >
                        <div className="flex items-center gap-1.5 mb-1">
                          {TRANSCRIPT_LINES[lineIdx].type === 'insight' || TRANSCRIPT_LINES[lineIdx].type === 'success' ? (
                            <Zap className="w-3 h-3 text-primary-600 fill-primary-600" />
                          ) : (
                            <div className="w-1.5 h-1.5 rounded-full bg-gray-400" />
                          )}
                          <span className={`text-[9px] font-bold uppercase tracking-widest ${
                            TRANSCRIPT_LINES[lineIdx].type === 'insight' ? "text-primary-600" 
                            : TRANSCRIPT_LINES[lineIdx].type === 'success' ? "text-green-600"
                            : "text-gray-500"
                          }`}>
                            {TRANSCRIPT_LINES[lineIdx].speaker}
                          </span>
                        </div>
                        <p className={`text-xs sm:text-sm font-medium leading-snug ${
                          TRANSCRIPT_LINES[lineIdx].type === 'neutral' ? "text-gray-700" : "text-gray-900"
                        }`}>
                          {TRANSCRIPT_LINES[lineIdx].text}
                        </p>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </div>
              </div>

              {/* Right Column: Live Metrics */}
              <div className="md:col-span-2 hidden md:flex flex-col p-4 bg-gradient-to-b from-gray-50 to-white rounded-xl border border-gray-100 shadow-inner h-full min-h-[280px]">
                
                {/* Sentiment Block */}
                <div className="mb-auto">
                  <div className="flex items-center justify-between mb-3">
                    <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">Sentiment Shift</p>
                    <div className="flex items-center gap-1">
                      <div className="w-1 h-1 rounded-full bg-green-500 animate-pulse" />
                      <span className="text-[9px] font-bold text-green-600 uppercase">Positive</span>
                    </div>
                  </div>
                  
                  {/* Sleek Audio-Spectrum Sentiment Chart */}
                  <div className="flex items-end justify-between h-12 w-full gap-0.5 border-b border-gray-200 pb-1.5 relative">
                    {/* Trend Line Overlay */}
                    <div className="absolute bottom-1.5 left-0 w-full h-[1px] bg-gray-300/50" />
                    {[...Array(16)].map((_, i) => (
                      <motion.div 
                        key={i}
                        animate={{ 
                          height: [
                            `${20 + Math.random() * 30}%`, 
                            `${40 + Math.random() * 50}%`, 
                            `${30 + Math.random() * 40}%`
                          ] 
                        }} 
                        transition={{ duration: 1.5 + Math.random(), repeat: Infinity, ease: "easeInOut" }} 
                        className={`w-full rounded-t-[1px] ${
                          i < 4 ? 'bg-red-300' : i < 8 ? 'bg-amber-300' : i < 12 ? 'bg-green-300' : 'bg-green-500'
                        }`} 
                      />
                    ))}
                  </div>
                </div>

                {/* Confidence Bars */}
                <div className="space-y-3 pt-4">
                  <div>
                    <div className="flex justify-between text-[9px] font-bold text-gray-500 mb-1 tracking-wider">
                      <span>CONFIDENCE</span>
                      <span className="text-primary-600">98%</span>
                    </div>
                    <div className="h-1 w-full bg-gray-200 rounded-full overflow-hidden">
                      <motion.div initial={{ width: "80%" }} animate={{ width: "98%" }} transition={{ duration: 1 }} className="h-full bg-primary-500 rounded-full" />
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between text-[9px] font-bold text-gray-500 mb-1 tracking-wider">
                      <span>SCRIPT ADHERENCE</span>
                      <span className="text-green-600">100%</span>
                    </div>
                    <div className="h-1 w-full bg-gray-200 rounded-full overflow-hidden">
                      <motion.div initial={{ width: "60%" }} animate={{ width: "100%" }} transition={{ duration: 1.5 }} className="h-full bg-green-500 rounded-full" />
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </motion.div>

          {/* KPI Strips - Ultra Compact */}
          <div className="lg:col-span-5 flex flex-col gap-3 h-full">
            
            {/* KPI 1: QA */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100 flex items-center justify-between group hover:shadow-md transition-all flex-1"
            >
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-xl bg-primary-50 text-primary-600 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                  <Award className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-0.5">QA Audits</h4>
                  <p className="text-xs text-gray-400 font-medium">Daily calls audited instantly</p>
                </div>
              </div>
              <p className="text-2xl font-display font-bold text-gray-900 tracking-tight">100%</p>
            </motion.div>

            {/* KPI 2: Sales & Rev */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100 flex items-center justify-between group hover:shadow-md transition-all flex-1"
            >
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-xl bg-green-50 text-green-600 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                  <TrendingUp className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-0.5">Sales & Rev</h4>
                  <p className="text-xs text-gray-400 font-medium">Hidden pipeline recovered</p>
                </div>
              </div>
              <p className="text-2xl font-display font-bold text-gray-900 tracking-tight">+18%</p>
            </motion.div>

            {/* KPI 3: Efficiency */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
              className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100 flex items-center justify-between group hover:shadow-md transition-all flex-1"
            >
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                  <BarChart3 className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-0.5">Efficiency</h4>
                  <p className="text-xs text-gray-400 font-medium">After-call work reduced</p>
                </div>
              </div>
              <p className="text-2xl font-display font-bold text-gray-900 tracking-tight">-40%</p>
            </motion.div>

            {/* KPI 4: Alert Stream */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5 }}
              className="bg-gray-900 rounded-2xl p-4 shadow-md border border-gray-800 flex items-center gap-4 relative overflow-hidden flex-1 min-h-[72px]"
            >
              <div className="w-10 h-10 rounded-xl bg-white/10 text-white flex items-center justify-center shrink-0">
                <ShieldAlert className="w-5 h-5" />
              </div>
              <div className="flex-1 overflow-hidden">
                <div className="flex items-center gap-2 mb-1">
                  <div className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
                  <span className="text-[9px] font-bold text-red-400 uppercase tracking-widest">Live Alert Stream</span>
                </div>
                <div className="relative h-[18px] flex items-center">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={alertIdx}
                      initial={{ opacity: 0, y: 5 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -5 }}
                      transition={{ duration: 0.3 }}
                      className="absolute inset-0 text-xs font-medium text-gray-300 truncate"
                    >
                      {ALERTS[alertIdx]}
                    </motion.div>
                  </AnimatePresence>
                </div>
              </div>
            </motion.div>

            {/* CTA & Trust Badges */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.6 }}
              className="mt-1 bg-gradient-to-r from-gray-50 to-white rounded-2xl p-5 border border-gray-100 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 group hover:border-primary-200 transition-colors shadow-sm shrink-0"
            >
              <div className="flex flex-col gap-2.5 w-full sm:w-auto">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-primary-500" />
                  <span className="text-[10px] font-bold text-gray-600 uppercase tracking-widest">100% Coverage</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-primary-500" />
                  <span className="text-[10px] font-bold text-gray-600 uppercase tracking-widest">Multi-lingual Support</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-primary-500" />
                  <span className="text-[10px] font-bold text-gray-600 uppercase tracking-widest">Enterprise Security</span>
                </div>
              </div>
              <Link to="/contact" className="w-full sm:w-auto px-5 py-3 bg-gray-900 text-white rounded-xl text-xs font-bold uppercase tracking-widest hover:bg-primary-600 transition-colors shadow-md flex items-center justify-center gap-2">
                Request Demo
                <ArrowRight className="w-4 h-4" />
              </Link>
            </motion.div>

          </div>
        </div>

      </div>
    </section>
  );
}

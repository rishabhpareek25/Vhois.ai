import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2, ArrowRight, Activity, Zap } from "lucide-react";

const PROBLEMS = [
  "Conversations are never reviewed",
  "Insights disappear after every call",
  "QA audits cover only a fraction",
  "Action items are missed",
  "Compliance is difficult to track",
];

const SOLUTIONS = [
  "100% Transcription & ID",
  "Automated Summaries",
  "Intent & Sentiment Tracking",
  "Auto-generated CRM updates",
  "Real-time Risk Indicators",
];

export default function ProblemSolution() {
  const [mobileView, setMobileView] = useState<'without' | 'with'>('without');

  return (
    <section className="relative pt-6 sm:pt-8 pb-16 sm:pb-24 bg-white overflow-hidden">
      {/* Subtle Premium Background */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(79,70,229,0.04),transparent_80%)] pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-[1000px] h-[600px] bg-gradient-to-r from-red-50/50 via-primary-50/50 to-indigo-50/50 blur-[100px] rounded-full pointer-events-none opacity-70" />

      <div className="page-bleed relative z-10">
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center max-w-4xl mx-auto mb-10 sm:mb-16 px-4"
        >
          <div className="inline-flex items-center gap-3 px-5 py-2.5 rounded-full border border-gray-200 bg-white shadow-sm mb-6">
            <span className="w-2.5 h-2.5 rounded-full bg-primary-500 animate-pulse" />
            <span className="text-sm font-bold uppercase tracking-widest text-gray-700">The Intelligence Gap</span>
          </div>
          <h2 className="font-display font-bold text-4xl sm:text-5xl md:text-5xl text-gray-900 tracking-tight leading-[1.15]">
            Your business runs on conversations.
            <br className="hidden sm:block" />
            <span className="text-gray-500 block sm:inline mt-2 sm:mt-0"> Most of that intelligence disappears.</span>
          </h2>
        </motion.div>

        {/* The Animated Data Engine */}
        <div className="relative w-full max-w-6xl mx-auto">
          
          {/* Mobile Continuous Flow Track (Removed, as we are shifting to a compact toggle layout) */}

          {/* Continuous Flow Track (Desktop Background) */}
          <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-1 -translate-y-1/2 z-0">
            {/* Red Messy Data Flow */}
            <div className="absolute left-0 w-1/2 h-full bg-gradient-to-r from-transparent via-red-200 to-red-400 overflow-hidden">
              <motion.div 
                className="absolute top-0 left-0 w-32 h-full bg-red-500 shadow-[0_0_15px_rgba(239,68,68,0.8)]"
                animate={{ x: ["-100%", "300%"] }}
                transition={{ duration: 2.5, repeat: Infinity, ease: "linear" }}
              />
              {/* Unstructured particles */}
              {[...Array(5)].map((_, i) => (
                 <motion.div
                   key={i}
                   className="absolute top-1/2 w-2 h-2 bg-red-400 rounded-full"
                   style={{ left: `${Math.random() * 100}%`, top: `${Math.random() * 100}%` }}
                   animate={{ 
                     x: [0, 200], 
                     y: [0, (Math.random() - 0.5) * 50],
                     opacity: [0, 1, 0]
                   }}
                   transition={{ duration: 1.5 + Math.random(), repeat: Infinity, delay: Math.random() * 2 }}
                 />
              ))}
            </div>
            
            {/* Blue Structured Data Flow */}
            <div className="absolute right-0 w-1/2 h-full bg-gradient-to-r from-primary-400 via-primary-300 to-transparent overflow-hidden">
               <motion.div 
                className="absolute top-0 left-0 w-32 h-full bg-primary-400 shadow-[0_0_15px_rgba(99,102,241,0.8)]"
                animate={{ x: ["-100%", "300%"] }}
                transition={{ duration: 2.5, repeat: Infinity, ease: "linear", delay: 0.5 }}
              />
            </div>
          </div>

          {/* DESKTOP LAYOUT (Unchanged) */}
          <div className="hidden lg:flex flex-row items-stretch justify-center gap-4 relative z-10 px-0">
            
            {/* Left Side: The Mess (Red Glass Pane) */}
            <div className="flex-1 relative">
              <div className="absolute inset-0 bg-gradient-to-br from-white to-red-50/80 rounded-3xl border border-red-100 shadow-[0_8px_30px_rgb(220,38,38,0.06)] backdrop-blur-xl" />
              <div className="relative p-6 sm:p-8 lg:p-10 flex flex-col h-full justify-center">
                <h3 className="text-sm font-bold uppercase tracking-widest text-red-500 mb-6 sm:mb-8 flex items-center gap-3">
                  <span className="w-8 h-px bg-red-300" />
                  Without Vhois AI
                </h3>
                
                <div className="space-y-5 sm:space-y-7">
                  {PROBLEMS.map((prob, i) => (
                    <motion.div
                      key={`prob-${i}`}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.1, duration: 0.6 }}
                      className="flex items-start gap-4 group"
                    >
                      <div className="w-1.5 h-1.5 mt-2.5 rounded-full bg-red-400 shadow-[0_0_8px_rgba(248,113,113,0.6)] shrink-0 group-hover:scale-150 transition-transform" />
                      <p className="text-base sm:text-lg font-medium text-gray-700 leading-relaxed group-hover:text-red-700 transition-colors">
                        {prob}
                      </p>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>

            {/* Central AI Engine Node */}
            <div className="shrink-0 relative w-48 h-48 lg:w-64 lg:h-64 my-4 lg:my-0 flex items-center justify-center z-20 self-center">
              {/* Pulsing Aura */}
              <motion.div 
                className="absolute inset-0 rounded-full bg-primary-400/20 blur-[30px]"
                animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0.8, 0.5] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              />
              
              {/* Outer rings */}
              <motion.div 
                animate={{ rotate: 360 }}
                transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                className="absolute inset-2 rounded-full border-2 border-dashed border-primary-300/60"
              />
              <motion.div 
                animate={{ rotate: -360 }}
                transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
                className="absolute inset-6 rounded-full border border-gray-300/50 bg-white/30 backdrop-blur-sm"
              />
              
              {/* The core */}
              <div className="absolute inset-10 rounded-full bg-white shadow-[0_0_40px_rgba(79,70,229,0.3)] border border-primary-200 flex items-center justify-center overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-primary-100/50 to-white" />
                
                {/* Scanning Laser */}
                <motion.div 
                  className="absolute left-0 right-0 h-1 bg-primary-400 blur-[1px]"
                  animate={{ top: ["0%", "100%", "0%"] }}
                  transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                />

                <div className="relative z-10 flex flex-col items-center">
                  <Activity className="w-10 h-10 text-primary-600 mb-2 drop-shadow-md" />
                  <span className="font-display font-bold text-sm text-gray-900 tracking-wider">VHOIS AI</span>
                </div>
              </div>
            </div>

            {/* Right Side: The Solution (Blue Glass Pane) */}
            <div className="flex-1 relative">
              <div className="absolute inset-0 bg-gradient-to-bl from-white to-primary-50/80 rounded-3xl border border-primary-100 shadow-[0_8px_30px_rgb(79,70,229,0.06)] backdrop-blur-xl" />
              <div className="relative p-6 sm:p-8 lg:p-10 flex flex-col h-full justify-center">
                <h3 className="text-sm font-bold uppercase tracking-widest text-primary-600 mb-6 sm:mb-8 flex items-center justify-end gap-3 text-right">
                  With Vhois AI
                  <span className="w-8 h-px bg-primary-300" />
                </h3>
                
                <div className="space-y-5 sm:space-y-7">
                  {SOLUTIONS.map((sol, i) => (
                    <motion.div
                      key={`sol-${i}`}
                      initial={{ opacity: 0, x: 20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.1, duration: 0.6 }}
                      className="flex items-start justify-end gap-4 group text-right"
                    >
                      <p className="text-base sm:text-lg font-bold text-gray-900 leading-relaxed group-hover:text-primary-700 transition-colors">
                        {sol}
                      </p>
                      <div className="w-2 h-2 mt-2.5 rounded-full bg-primary-500 shadow-[0_0_8px_rgba(99,102,241,0.6)] shrink-0 group-hover:scale-150 transition-transform" />
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
            
          </div>

          {/* MOBILE LAYOUT (Interactive Toggle) */}
          <div className="flex flex-col lg:hidden relative z-10 px-4 sm:px-6 items-center">
             
             {/* Central AI Engine Node (Scaled down for mobile header) */}
             <div className="shrink-0 relative w-32 h-32 mb-6 flex items-center justify-center z-20">
                <motion.div 
                  className="absolute inset-0 rounded-full bg-primary-400/20 blur-[20px]"
                  animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0.8, 0.5] }}
                  transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                />
                <motion.div 
                  animate={{ rotate: 360 }}
                  transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                  className="absolute inset-2 rounded-full border-2 border-dashed border-primary-300/60"
                />
                <motion.div 
                  animate={{ rotate: -360 }}
                  transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
                  className="absolute inset-4 rounded-full border border-gray-300/50 bg-white/30 backdrop-blur-sm"
                />
                <div className="absolute inset-6 rounded-full bg-white shadow-[0_0_20px_rgba(79,70,229,0.3)] border border-primary-200 flex items-center justify-center overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-primary-100/50 to-white" />
                  <motion.div 
                    className="absolute left-0 right-0 h-1 bg-primary-400 blur-[1px]"
                    animate={{ top: ["0%", "100%", "0%"] }}
                    transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                  />
                  <div className="relative z-10 flex flex-col items-center mt-1">
                    <Activity className="w-6 h-6 text-primary-600 mb-1 drop-shadow-md" />
                    <span className="font-display font-bold text-[10px] text-gray-900 tracking-wider">VHOIS AI</span>
                  </div>
                </div>
             </div>

             {/* Modern Segmented Control Toggle */}
             <div className="flex w-full max-w-sm bg-gray-100/80 backdrop-blur-md p-1.5 rounded-2xl shadow-inner border border-gray-200 mb-6 relative">
                 {/* Sliding Background */}
                 <motion.div 
                   className="absolute top-1.5 bottom-1.5 w-[calc(50%-6px)] rounded-xl bg-white shadow-sm border border-gray-200/50 z-0"
                   initial={false}
                   animate={{ left: mobileView === 'without' ? '6px' : 'calc(50% + 0px)' }}
                   transition={{ type: "spring", stiffness: 400, damping: 30 }}
                 />
                 <button 
                   onClick={() => setMobileView('without')} 
                   className={`flex-1 py-3 rounded-xl text-[13px] font-bold transition-colors z-10 ${mobileView === 'without' ? 'text-red-600' : 'text-gray-500 hover:text-gray-700'}`}
                 >
                   Without VHOIS AI
                 </button>
                 <button 
                   onClick={() => setMobileView('with')} 
                   className={`flex-1 py-3 rounded-xl text-[13px] font-bold transition-colors z-10 ${mobileView === 'with' ? 'text-primary-600' : 'text-gray-500 hover:text-gray-700'}`}
                 >
                   With VHOIS AI
                 </button>
             </div>

             {/* Dynamic Content Container */}
             <div className="relative w-full max-w-sm">
                <AnimatePresence mode="wait">
                  {mobileView === 'without' ? (
                     <motion.div 
                       key="without" 
                       initial={{ opacity: 0, scale: 0.95 }} 
                       animate={{ opacity: 1, scale: 1 }} 
                       exit={{ opacity: 0, scale: 0.95 }} 
                       transition={{ duration: 0.2 }}
                     >
                        <div className="relative rounded-3xl overflow-hidden">
                          <div className="absolute inset-0 bg-gradient-to-br from-white to-red-50/80 border border-red-100 shadow-md backdrop-blur-xl" />
                          
                          {/* Premium Watermark */}
                          <div className="absolute -right-6 -bottom-6 opacity-[0.04] text-red-900 pointer-events-none transform -rotate-12">
                            <Activity className="w-48 h-48" />
                          </div>

                          <div className="relative p-6 sm:p-7 flex flex-col space-y-4">
                            {PROBLEMS.map((prob, i) => (
                              <div key={`mob-prob-${i}`} className="flex items-start gap-4">
                                <div className="w-1.5 h-1.5 mt-2 rounded-full bg-red-400 shadow-[0_0_8px_rgba(248,113,113,0.6)] shrink-0" />
                                <p className="text-sm sm:text-base font-medium text-gray-700 leading-snug">
                                  {prob}
                                </p>
                              </div>
                            ))}
                          </div>
                        </div>
                     </motion.div>
                  ) : (
                     <motion.div 
                       key="with" 
                       initial={{ opacity: 0, scale: 0.95 }} 
                       animate={{ opacity: 1, scale: 1 }} 
                       exit={{ opacity: 0, scale: 0.95 }} 
                       transition={{ duration: 0.2 }}
                     >
                        <div className="relative rounded-3xl overflow-hidden">
                          <div className="absolute inset-0 bg-gradient-to-bl from-white to-primary-50/80 border border-primary-100 shadow-md backdrop-blur-xl" />
                          
                          {/* Premium Watermark */}
                          <div className="absolute -right-6 -bottom-6 opacity-[0.04] text-primary-900 pointer-events-none transform rotate-12">
                            <Zap className="w-48 h-48" />
                          </div>

                          <div className="relative p-6 sm:p-7 flex flex-col space-y-4">
                            {SOLUTIONS.map((sol, i) => (
                              <div key={`mob-sol-${i}`} className="flex items-start gap-4">
                                <div className="w-1.5 h-1.5 mt-2 rounded-full bg-primary-500 shadow-[0_0_8px_rgba(99,102,241,0.6)] shrink-0" />
                                <p className="text-sm sm:text-base font-bold text-gray-900 leading-snug">
                                  {sol}
                                </p>
                              </div>
                            ))}
                          </div>
                        </div>
                     </motion.div>
                  )}
                </AnimatePresence>
             </div>
          </div>
        </div>
      </div>
    </section>
  );
}

import { Mic, Cpu, LineChart, LayoutDashboard, Network } from "lucide-react";

const PIPELINE = [
  { step: "01", icon: Mic, title: "Capture", desc: "Seamless ingestion from cloud platforms and physical on-ground environments.",
    color: { ring1: "border-blue-300", ring2: "border-blue-200", core: "bg-blue-50", icon: "text-blue-500", badge: "bg-blue-500" } 
  },
  { step: "02", icon: Cpu, title: "Process", desc: "Precision speaker diarization & noise-filtering AI.",
    color: { ring1: "border-indigo-300", ring2: "border-indigo-200", core: "bg-indigo-50", icon: "text-indigo-500", badge: "bg-indigo-500" } 
  },
  { step: "03", icon: LineChart, title: "Analyze", desc: "Extract commitments & customer intent.",
    color: { ring1: "border-violet-300", ring2: "border-violet-200", core: "bg-violet-50", icon: "text-violet-500", badge: "bg-violet-500" } 
  },
  { step: "04", icon: LayoutDashboard, title: "Discover", desc: "Visual dashboards & searchable transcripts.",
    color: { ring1: "border-fuchsia-300", ring2: "border-fuchsia-200", core: "bg-fuchsia-50", icon: "text-fuchsia-500", badge: "bg-fuchsia-500" } 
  },
  { step: "05", icon: Network, title: "Act", desc: "Automated CRM updates & follow-ups.",
    color: { ring1: "border-rose-300", ring2: "border-rose-200", core: "bg-rose-50", icon: "text-rose-500", badge: "bg-rose-500" } 
  },
];

export function HowItWorksStrip() {
  return (
    <section id="how-it-works" className="relative pt-0 pb-8 bg-white overflow-hidden">
      
      {/* Background Ambience */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/2 left-1/4 w-[800px] h-[800px] bg-[radial-gradient(circle_at_center,rgba(79,70,229,0.04),transparent_70%)] rounded-full -translate-y-1/2" />
        <div className="absolute top-1/2 right-1/4 w-[800px] h-[800px] bg-[radial-gradient(circle_at_center,rgba(99,102,241,0.04),transparent_70%)] rounded-full -translate-y-1/2" />
      </div>

      <div className="page-bleed relative z-10">
        <div className="text-center mb-6">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <p className="text-[11px] font-bold uppercase tracking-widest text-primary-500 tracking-[0.25em]">
              The Intelligence Pipeline
            </p>
          </motion.div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6">
          
          {/* Vertical Mobile Track - Compact Timeline */}
          <div className="lg:hidden absolute top-[2rem] bottom-[2rem] left-[3.5rem] sm:left-[4.5rem] w-[2px] bg-gray-100 z-0">
            <motion.div 
              className="absolute top-0 left-0 w-full h-[40%] bg-gradient-to-b from-transparent via-primary-500 to-transparent"
              animate={{ top: ["-40%", "100%"] }}
              transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
            />
          </div>

          {/* Horizontal Desktop Track */}
          <div className="hidden lg:block absolute top-[4rem] left-[10%] right-[10%] h-[2px] bg-gray-100 z-0">
            <motion.div 
              className="absolute top-0 left-0 h-full w-[40%] bg-gradient-to-r from-transparent via-primary-500 to-transparent"
              animate={{ left: ["-40%", "100%"] }}
              transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
            />
            {/* Pulsing energy dots along the line */}
            <div className="absolute top-1/2 left-1/4 w-1.5 h-1.5 rounded-full bg-primary-400 -translate-y-1/2 shadow-[0_0_10px_rgba(79,70,229,0.8)] animate-pulse" />
            <div className="absolute top-1/2 left-2/4 w-1.5 h-1.5 rounded-full bg-primary-400 -translate-y-1/2 shadow-[0_0_10px_rgba(79,70,229,0.8)] animate-pulse" style={{ animationDelay: "1s" }} />
            <div className="absolute top-1/2 left-3/4 w-1.5 h-1.5 rounded-full bg-primary-400 -translate-y-1/2 shadow-[0_0_10px_rgba(79,70,229,0.8)] animate-pulse" style={{ animationDelay: "2s" }} />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 lg:gap-4 relative z-10 px-4 sm:px-8 lg:px-0">
            {PIPELINE.map((item, i) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={item.step}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ delay: i * 0.1, duration: 0.6, type: "spring" }}
                  className="relative flex flex-row lg:flex-col items-center lg:items-center text-left lg:text-center group gap-5 lg:gap-0"
                >
                  {/* The Unbeatable Circular Node - Compacted for mobile */}
                  <div className="relative lg:mb-4 w-20 h-20 lg:w-28 lg:h-28 flex items-center justify-center shrink-0">
                    
                    {/* Hover Glow Behind */}
                    <div className="absolute inset-0 bg-primary-400/20 rounded-full blur-[15px] lg:blur-[25px] opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />

                    {/* Outer Rotating Ring */}
                    <motion.div 
                      className={`absolute inset-0 rounded-full border-[1.5px] border-dashed ${item.color.ring1} group-hover:border-primary-400 transition-colors duration-500`}
                      animate={{ rotate: 360 }}
                      transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
                    />
                    
                    {/* Inner Rotating Ring (Reverse) */}
                    <motion.div 
                      className={`absolute inset-1.5 lg:inset-2 rounded-full border border-solid ${item.color.ring2} group-hover:border-primary-200 transition-colors duration-500`}
                      animate={{ rotate: -360 }}
                      transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                    />

                    {/* The Core Circle */}
                    <div className={`relative w-14 h-14 lg:w-20 lg:h-20 rounded-full ${item.color.core} shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-white flex items-center justify-center group-hover:scale-110 group-hover:shadow-[0_0_40px_rgba(79,70,229,0.2)] transition-all duration-500 z-10 overflow-hidden`}>
                      <Icon className={`w-5 h-5 lg:w-7 lg:h-7 ${item.color.icon} group-hover:scale-110 transition-transform duration-500 relative z-10`} />
                    </div>

                    {/* Step Number Badge */}
                    <div className={`absolute -top-1 -right-1 lg:-top-2 lg:-right-2 w-6 h-6 lg:w-8 lg:h-8 rounded-full ${item.color.badge} border-2 lg:border-[3px] border-white flex items-center justify-center shadow-md group-hover:scale-110 transition-all duration-500 z-20`}>
                      <span className="font-display font-bold text-[9px] lg:text-xs text-white">{item.step}</span>
                    </div>

                  </div>
                  
                  {/* Floating Typography */}
                  <div>
                    <h3 className="font-display font-bold text-lg lg:text-xl text-gray-900 mb-1 lg:mb-2 group-hover:text-primary-600 transition-colors duration-300">
                      {item.title}
                    </h3>
                    <p className="text-gray-500 text-xs lg:text-sm leading-relaxed font-medium max-w-[200px] lg:mx-auto">
                      {item.desc}
                    </p>
                  </div>

                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}


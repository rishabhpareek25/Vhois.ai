import { motion } from "framer-motion";
import { Laptop, Mic, BrainCircuit, Waves, Database, Users, Bot, User } from "lucide-react";

export default function OmnichannelCapture() {
  return (
    <section className="relative py-24 sm:py-32 bg-white overflow-hidden border-y border-gray-100">
      
      {/* Super clean, minimalistic background mesh */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-[1000px] h-[600px] bg-[radial-gradient(ellipse_at_top,rgba(99,102,241,0.04),transparent_70%)]" />
      </div>

      <div className="page-bleed relative z-10">
        
        {/* Simple, relatable Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center max-w-3xl mx-auto mb-16 sm:mb-24 px-4"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary-50 text-primary-700 text-sm font-bold uppercase tracking-widest mb-6 border border-primary-100">
            <Users className="w-4 h-4" />
            <span>Omnichannel Diarization</span>
          </div>
          <h2 className="font-display font-bold text-4xl sm:text-5xl text-gray-900 tracking-tight leading-[1.15] mb-6">
            Capture Intelligence <span className="text-primary-600">Anywhere.</span>
          </h2>
          <p className="text-lg sm:text-xl text-gray-500 leading-relaxed max-w-2xl mx-auto">
            A single, unified AI engine that ingests audio from both digital clouds and physical rooms—perfectly separating mixed voices into structured insights.
          </p>
        </motion.div>

        {/* The Unified Flow Diagram */}
        <div className="relative max-w-4xl mx-auto px-4 flex flex-col items-center">
          
          {/* LEVEL 1: The Sources */}
          <div className="flex justify-between w-full max-w-[400px] sm:max-w-[600px] relative z-20">
            
            {/* Source 1: Digital */}
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="flex flex-col items-center group"
            >
              <div className="w-40 sm:w-48 h-28 sm:h-32 rounded-3xl bg-white shadow-[0_10px_40px_-10px_rgba(99,102,241,0.15)] border border-indigo-50 p-2 sm:p-3 mb-4 relative overflow-hidden transition-transform group-hover:-translate-y-1">
                {/* Ultra-clean iOS-style Split Screen */}
                <div className="flex h-full gap-2 relative">
                  {/* Left Panel - Bot */}
                  <div className="flex-1 bg-gradient-to-b from-indigo-50/50 to-indigo-100/30 rounded-2xl relative overflow-hidden flex flex-col items-center justify-center border border-indigo-100/50">
                     <div className="w-8 h-8 rounded-full bg-white shadow-sm flex items-center justify-center mb-2">
                       <Bot className="w-4 h-4 text-indigo-600" />
                     </div>
                     {/* Elegant Voice wave */}
                     <div className="flex items-end gap-1 h-3">
                        {[...Array(4)].map((_, j) => (
                          <motion.div key={j} className="w-1 bg-indigo-500 rounded-full" animate={{height: ["30%","100%","30%"]}} transition={{duration: 0.4 + Math.random(), repeat: Infinity}} />
                        ))}
                     </div>
                  </div>
                  
                  {/* Right Panel - Customer */}
                  <div className="flex-1 bg-gradient-to-b from-blue-50/50 to-blue-100/30 rounded-2xl relative overflow-hidden flex flex-col items-center justify-center border border-blue-100/50">
                     <div className="w-8 h-8 rounded-full bg-white shadow-sm flex items-center justify-center mb-2">
                       <User className="w-4 h-4 text-blue-600" />
                     </div>
                     <div className="flex items-end gap-1 h-3">
                        {[...Array(4)].map((_, j) => (
                          <motion.div key={j} className="w-1 bg-blue-500 rounded-full" animate={{height: ["30%","100%","30%"]}} transition={{duration: 0.4 + Math.random(), repeat: Infinity}} />
                        ))}
                     </div>
                  </div>
                </div>
              </div>
              <span className="font-bold text-gray-900 text-sm sm:text-base">Digital Clouds</span>
              <span className="text-xs text-gray-500 font-medium">Zoom, Teams, Meet</span>
            </motion.div>

            {/* Source 2: Physical */}
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="flex flex-col items-center group"
            >
              <div className="w-40 sm:w-48 h-28 sm:h-32 rounded-3xl bg-white shadow-[0_10px_40px_-10px_rgba(168,85,247,0.15)] border border-purple-50 p-2 sm:p-3 mb-4 relative overflow-hidden flex items-center justify-center transition-transform group-hover:-translate-y-1">
                 {/* Premium Glassy Oval Table */}
                 <div className="w-[90%] h-[75%] rounded-[100px] bg-gradient-to-br from-purple-50/30 to-slate-50 border border-slate-100 flex items-center justify-center relative">
                    
                    {/* Central Premium Mic Wrapper */}
                    <div className="relative w-8 h-8 flex items-center justify-center z-20">
                       {/* Expanding Premium Radar Rings */}
                       <motion.div className="absolute inset-0 rounded-full border border-purple-200" animate={{scale:[1,3,3], opacity:[1,1,0]}} transition={{duration: 2.5, repeat: Infinity}} />
                       <motion.div className="absolute inset-0 rounded-full border border-purple-200" animate={{scale:[1,3,3], opacity:[1,1,0]}} transition={{duration: 2.5, repeat: Infinity, delay: 1.25}} />
                       
                       {/* The Mic Icon Background */}
                       <div className="absolute inset-0 rounded-full bg-white shadow-md border border-purple-100 flex items-center justify-center">
                          <Mic className="w-4 h-4 text-purple-500" />
                       </div>
                    </div>

                    {/* Sales Agent (Top Center) */}
                    <div className="absolute -top-4 w-8 h-8 rounded-full bg-white border border-indigo-100 flex items-center justify-center z-10 shadow-sm">
                       <User className="w-4 h-4 text-indigo-600" />
                    </div>

                    {/* Customer 1 (Bottom Left) */}
                    <div className="absolute -bottom-3 left-[15%] w-8 h-8 rounded-full bg-white border border-fuchsia-100 flex items-center justify-center z-10 shadow-sm">
                       <Users className="w-4 h-4 text-fuchsia-600" />
                    </div>

                    {/* Customer 2 (Bottom Right) */}
                    <div className="absolute -bottom-3 right-[15%] w-8 h-8 rounded-full bg-white border border-fuchsia-100 flex items-center justify-center z-10 shadow-sm">
                       <User className="w-4 h-4 text-fuchsia-600" />
                    </div>
                 </div>
              </div>
              <span className="font-bold text-gray-900 text-sm sm:text-base">Physical Rooms</span>
              <span className="text-xs text-gray-500 font-medium">Sales, Field Surveys</span>
            </motion.div>
            
          </div>

          {/* LEVEL 2: The Connecting "Y" SVG */}
          <div className="w-[300px] sm:w-[500px] h-[100px] sm:h-[120px] -my-2 sm:-my-4 relative z-10 pointer-events-none">
            <svg width="100%" height="100%" viewBox="0 0 500 120" preserveAspectRatio="none" className="overflow-visible">
              {/* Static background lines */}
              <path d="M 50,0 C 50,60 250,60 250,120" fill="none" stroke="#e5e7eb" strokeWidth="3" strokeLinecap="round" />
              <path d="M 450,0 C 450,60 250,60 250,120" fill="none" stroke="#e5e7eb" strokeWidth="3" strokeLinecap="round" />
              
              {/* Animated Flow - Left */}
              <motion.path 
                d="M 50,0 C 50,60 250,60 250,120" 
                fill="none" stroke="#6366f1" strokeWidth="3" strokeLinecap="round" strokeDasharray="8 8"
                initial={{ strokeDashoffset: 24 }}
                animate={{ strokeDashoffset: 0 }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
              />
              
              {/* Animated Flow - Right */}
              <motion.path 
                d="M 450,0 C 450,60 250,60 250,120" 
                fill="none" stroke="#a855f7" strokeWidth="3" strokeLinecap="round" strokeDasharray="8 8"
                initial={{ strokeDashoffset: 24 }}
                animate={{ strokeDashoffset: 0 }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
              />
            </svg>
          </div>

          {/* LEVEL 3: Central AI Processor */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="relative z-20"
          >
            {/* Outer Glowing Ring */}
            <motion.div 
              className="absolute -inset-4 rounded-full border border-primary-200/50 bg-primary-50/50"
              animate={{ scale: [1, 1.1, 1], opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 3, repeat: Infinity }}
            />
            
            <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-full bg-white shadow-2xl shadow-primary-500/20 border border-primary-100 flex flex-col items-center justify-center relative">
              <BrainCircuit className="w-10 h-10 text-primary-600 mb-1" />
              <span className="text-[9px] sm:text-[10px] font-extrabold uppercase tracking-widest text-primary-900">Vhois AI</span>
            </div>
          </motion.div>

          {/* LEVEL 4: Processing Output Line */}
          <div className="w-[2px] h-16 sm:h-20 bg-gray-200 relative z-10 -my-1 overflow-hidden">
            <motion.div 
              className="absolute top-0 left-0 w-full h-1/2 bg-gradient-to-b from-primary-500 to-fuchsia-500"
              animate={{ top: ["-50%", "100%"] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
            />
          </div>

          {/* LEVEL 5: Diarized Output */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="relative z-20 flex flex-col items-center bg-white rounded-3xl shadow-xl shadow-gray-200/50 border border-gray-100 p-6 sm:p-8 w-full max-w-[500px]"
          >
            <h4 className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-6">Perfectly Separated Intelligence</h4>
            
            <div className="w-full flex flex-col sm:flex-row gap-4 justify-between">
              
              {/* Speaker A */}
              <div className="flex-1 flex flex-col bg-gray-50 rounded-2xl p-4 border border-gray-100 relative overflow-hidden group">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center">
                    <span className="text-indigo-700 font-bold text-sm">A</span>
                  </div>
                  <span className="font-bold text-gray-900 text-sm">Host / Agent</span>
                </div>
                {/* Simulated Audio separation */}
                <div className="flex items-end gap-1 h-8 opacity-60">
                   {[...Array(12)].map((_, j) => (
                     <motion.div 
                       key={j} 
                       className="w-1.5 bg-indigo-400 rounded-full"
                       animate={{ height: ["20%", "100%", "20%"] }}
                       transition={{ duration: 0.5 + Math.random(), repeat: Infinity, delay: Math.random() }}
                     />
                   ))}
                </div>
              </div>

              {/* Speaker B */}
              <div className="flex-1 flex flex-col bg-gray-50 rounded-2xl p-4 border border-gray-100 relative overflow-hidden group">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-8 h-8 rounded-full bg-fuchsia-100 flex items-center justify-center">
                    <span className="text-fuchsia-700 font-bold text-sm">B</span>
                  </div>
                  <span className="font-bold text-gray-900 text-sm">Client / Customer</span>
                </div>
                {/* Simulated Audio separation */}
                <div className="flex items-end gap-1 h-8 opacity-60">
                   {[...Array(12)].map((_, j) => (
                     <motion.div 
                       key={j} 
                       className="w-1.5 bg-fuchsia-400 rounded-full"
                       animate={{ height: ["20%", "100%", "20%"] }}
                       transition={{ duration: 0.5 + Math.random(), repeat: Infinity, delay: Math.random() }}
                     />
                   ))}
                </div>
              </div>

            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}

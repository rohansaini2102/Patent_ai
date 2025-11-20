import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FileText, Sparkles, ChevronRight } from 'lucide-react';

export const Comparison: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'before' | 'after'>('after');

  return (
    <section className="py-24 px-6 md:px-12 bg-[#E8E8E5] relative overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="font-serif text-5xl md:text-6xl mb-6 text-charcoal">Gold-Standard <br/>Drafting</h2>
            <p className="max-w-md text-charcoal/70 leading-relaxed">
              Extensive technical vocabulary & custom dictionary to supercharge patent drafting accuracy.
            </p>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="bg-white/40 p-1.5 rounded-full flex items-center backdrop-blur-sm border border-white/50 shadow-sm"
          >
            <button 
              onClick={() => setActiveTab('before')}
              className={`px-8 py-3 rounded-full text-sm font-medium transition-all duration-500 relative z-10 ${activeTab === 'before' ? 'text-white' : 'text-charcoal hover:text-charcoal/70'}`}
            >
              {activeTab === 'before' && (
                <motion.div 
                  layoutId="activeTab" 
                  className="absolute inset-0 bg-charcoal rounded-full shadow-md -z-10"
                  transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                />
              )}
              Manual Input
            </button>
            <button 
              onClick={() => setActiveTab('after')}
              className={`px-8 py-3 rounded-full text-sm font-medium transition-all duration-500 flex items-center gap-2 relative z-10 ${activeTab === 'after' ? 'text-white' : 'text-charcoal hover:text-charcoal/70'}`}
            >
              {activeTab === 'after' && (
                <motion.div 
                  layoutId="activeTab" 
                  className="absolute inset-0 bg-charcoal rounded-full shadow-md -z-10"
                  transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                />
              )}
              <Sparkles className="w-3 h-3" />
              With Nexora
            </button>
          </motion.div>
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 50, scale: 0.95 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="relative h-[600px] w-full perspective-1000"
        >
          <AnimatePresence mode="wait">
            {activeTab === 'before' ? (
              <motion.div 
                key="before"
                initial={{ opacity: 0, rotateX: 5, scale: 0.95 }}
                animate={{ opacity: 1, rotateX: 0, scale: 1 }}
                exit={{ opacity: 0, rotateX: -5, scale: 0.95 }}
                transition={{ duration: 0.4, ease: "circOut" }}
                className="absolute inset-0 bg-[#FAFAFA] rounded-3xl p-8 md:p-12 shadow-2xl overflow-hidden border border-gray-200/80"
              >
                 <div className="absolute top-0 left-0 w-full h-1.5 bg-gray-200"></div>
                 <div className="flex items-center gap-4 mb-8 opacity-50">
                   <div className="w-10 h-10 bg-gray-200/50 rounded-full flex items-center justify-center border border-gray-200">
                     <FileText className="w-5 h-5 text-gray-500" />
                   </div>
                   <div className="text-sm text-gray-500 font-mono">raw_notes.txt</div>
                 </div>
                 
                 <div className="font-mono text-sm md:text-base text-gray-600 leading-loose whitespace-pre-wrap opacity-80">
{`> Invention: Coffee Cup Holder for Drones
> Context: Need a way to deliver coffee without spilling.
> Parts: Gimbal mechanism, thermal insulation, quick release.

Notes:
- The gimbal needs 3-axis stabilization.
- Must attach to standard DJI drones?
- Material should be lightweight carbon fiber.
- Need a locking mechanism so the cup doesn't fly out during high G turns.`}
                 </div>
              </motion.div>
            ) : (
              <motion.div 
                key="after"
                initial={{ opacity: 0, rotateX: 5, scale: 0.95 }}
                animate={{ opacity: 1, rotateX: 0, scale: 1 }}
                exit={{ opacity: 0, rotateX: -5, scale: 0.95 }}
                transition={{ duration: 0.4, ease: "circOut" }}
                className="absolute inset-0 bg-white rounded-3xl p-8 md:p-12 shadow-2xl overflow-hidden border border-white ring-1 ring-gray-100"
              >
                 {/* Scanning Beam */}
                 <motion.div 
                   className="absolute left-0 right-0 h-[200px] bg-gradient-to-b from-brand-blue/5 to-transparent -z-0 pointer-events-none"
                   animate={{ top: ["-100%", "200%"] }}
                   transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                 />
                 
                 <div className="absolute top-0 left-0 w-full h-1.5 bg-charcoal z-10"></div>
                 <div className="flex items-center justify-between mb-8 z-10 relative">
                   <div className="flex items-center gap-4">
                     <div className="w-10 h-10 bg-charcoal rounded-full flex items-center justify-center shadow-lg shadow-charcoal/20">
                       <Sparkles className="w-5 h-5 text-white" />
                     </div>
                     <div className="text-sm text-charcoal font-bold font-serif">Generated Claim 1</div>
                   </div>
                   <div className="flex items-center gap-2 text-xs bg-green-50 text-green-700 px-3 py-1.5 rounded-full font-bold border border-green-100">
                     <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></div>
                     Legally Validated
                   </div>
                 </div>
                 
                 <div className="font-serif text-lg md:text-xl text-charcoal leading-loose relative z-10">
                   <p className="mb-6"><span className="font-bold">1. An aerial delivery stabilization apparatus comprising:</span></p>
                   <motion.p 
                     className="pl-8 mb-4"
                     initial={{ opacity: 0, x: -10 }}
                     animate={{ opacity: 1, x: 0 }}
                     transition={{ delay: 0.2 }}
                   >
                     a <span className="bg-blue-50 text-blue-700 px-1 rounded border border-blue-100">three-axis gimbal mechanism</span> configured to coupled to an underside of an unmanned aerial vehicle (UAV);
                   </motion.p>
                   <motion.p 
                     className="pl-8 mb-4"
                     initial={{ opacity: 0, x: -10 }}
                     animate={{ opacity: 1, x: 0 }}
                     transition={{ delay: 0.4 }}
                   >
                     a receptacle housing pivotally connected to said gimbal mechanism, said housing defining an internal volume dimensioned to receive a liquid container; and
                   </motion.p>
                   <motion.p 
                     className="pl-8"
                     initial={{ opacity: 0, x: -10 }}
                     animate={{ opacity: 1, x: 0 }}
                     transition={{ delay: 0.6 }}
                   >
                     an <span className="bg-blue-50 text-blue-700 px-1 rounded border border-blue-100">automatic locking engagement member</span> disposed within said receptacle housing, configured to apply compressive force to said liquid container in response to detected acceleration forces exceeding a predetermined threshold.
                   </motion.p>
                 </div>

                 {/* Decorative AI Elements */}
                 <motion.div 
                   className="absolute bottom-8 right-8 bg-charcoal text-white text-xs px-5 py-3 rounded-full shadow-xl flex items-center gap-2"
                   initial={{ y: 20, opacity: 0 }}
                   animate={{ y: 0, opacity: 1 }}
                   transition={{ delay: 0.8 }}
                   whileHover={{ scale: 1.05 }}
                 >
                   <span>AI Confidence: 99.8%</span>
                   <ChevronRight size={14} className="text-white/50" />
                 </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
};
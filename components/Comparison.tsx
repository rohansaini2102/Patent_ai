import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FileText, Sparkles } from 'lucide-react';

export const Comparison: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'before' | 'after'>('after');

  return (
    <section className="py-24 px-6 md:px-12 bg-[#E8E8E5]">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8">
          <div>
            <h2 className="font-serif text-5xl md:text-6xl mb-6">Gold-Standard <br/>Drafting</h2>
            <p className="max-w-md text-charcoal/70 leading-relaxed">
              Extensive technical vocabulary & custom dictionary to supercharge patent drafting accuracy.
            </p>
          </div>
          
          <div className="bg-white/50 p-1 rounded-full flex items-center backdrop-blur-sm">
            <button 
              onClick={() => setActiveTab('before')}
              className={`px-8 py-3 rounded-full text-sm font-medium transition-all duration-300 ${activeTab === 'before' ? 'bg-charcoal text-white shadow-lg' : 'text-charcoal hover:bg-white/50'}`}
            >
              Manual Input
            </button>
            <button 
              onClick={() => setActiveTab('after')}
              className={`px-8 py-3 rounded-full text-sm font-medium transition-all duration-300 flex items-center gap-2 ${activeTab === 'after' ? 'bg-charcoal text-white shadow-lg' : 'text-charcoal hover:bg-white/50'}`}
            >
              <Sparkles className="w-3 h-3" />
              With Nexora
            </button>
          </div>
        </div>

        <div className="relative h-[600px] w-full perspective-1000">
          <AnimatePresence mode="wait">
            {activeTab === 'before' ? (
              <motion.div 
                key="before"
                initial={{ opacity: 0, rotateX: 10, y: 20 }}
                animate={{ opacity: 1, rotateX: 0, y: 0 }}
                exit={{ opacity: 0, rotateX: -10, y: -20 }}
                transition={{ duration: 0.5 }}
                className="absolute inset-0 bg-white rounded-3xl p-8 md:p-12 shadow-2xl overflow-hidden border border-gray-200"
              >
                 <div className="absolute top-0 left-0 w-full h-2 bg-gray-300"></div>
                 <div className="flex items-center gap-4 mb-8 opacity-50">
                   <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
                     <FileText className="w-5 h-5 text-gray-500" />
                   </div>
                   <div className="text-sm text-gray-500 font-mono">raw_notes.txt</div>
                 </div>
                 
                 <div className="font-mono text-sm md:text-base text-gray-600 leading-loose whitespace-pre-wrap">
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
                initial={{ opacity: 0, rotateX: 10, y: 20 }}
                animate={{ opacity: 1, rotateX: 0, y: 0 }}
                exit={{ opacity: 0, rotateX: -10, y: -20 }}
                transition={{ duration: 0.5 }}
                className="absolute inset-0 bg-white rounded-3xl p-8 md:p-12 shadow-2xl overflow-hidden border border-blue-100"
              >
                 <div className="absolute top-0 left-0 w-full h-2 bg-charcoal"></div>
                 <div className="flex items-center justify-between mb-8">
                   <div className="flex items-center gap-4">
                     <div className="w-10 h-10 bg-charcoal rounded-full flex items-center justify-center">
                       <Sparkles className="w-5 h-5 text-white" />
                     </div>
                     <div className="text-sm text-charcoal font-bold font-serif">Generated Claim 1</div>
                   </div>
                   <div className="text-xs bg-green-100 text-green-800 px-3 py-1 rounded-full font-medium">Legally Validated</div>
                 </div>
                 
                 <div className="font-serif text-lg md:text-xl text-charcoal leading-loose">
                   <p className="mb-6"><span className="font-bold">1. An aerial delivery stabilization apparatus comprising:</span></p>
                   <p className="pl-8 mb-4">
                     a <span className="bg-blue-50 text-blue-700 px-1 rounded">three-axis gimbal mechanism</span> configured to coupled to an underside of an unmanned aerial vehicle (UAV);
                   </p>
                   <p className="pl-8 mb-4">
                     a receptacle housing pivotally connected to said gimbal mechanism, said housing defining an internal volume dimensioned to receive a liquid container; and
                   </p>
                   <p className="pl-8">
                     an <span className="bg-blue-50 text-blue-700 px-1 rounded">automatic locking engagement member</span> disposed within said receptacle housing, configured to apply compressive force to said liquid container in response to detected acceleration forces exceeding a predetermined threshold.
                   </p>
                 </div>

                 {/* Decorative AI Elements */}
                 <motion.div 
                   className="absolute bottom-8 right-8 bg-charcoal text-white text-xs px-4 py-2 rounded-full shadow-lg"
                   initial={{ y: 20, opacity: 0 }}
                   animate={{ y: 0, opacity: 1 }}
                   transition={{ delay: 0.5 }}
                 >
                   AI Confidence: 99.8%
                 </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};
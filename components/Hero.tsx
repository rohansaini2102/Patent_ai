import React from 'react';
import { motion } from 'framer-motion';
import { Edit3, Sparkles, CheckCircle2 } from 'lucide-react';
import { Page } from '../App';

interface HeroProps {
  onNavigate: (page: Page) => void;
}

export const Hero: React.FC<HeroProps> = ({ onNavigate }) => {
  return (
    <section className="relative min-h-screen flex flex-col pt-32 pb-32 px-6 md:px-12 overflow-hidden bg-brand-blue text-white">
      
      {/* Animated Background Blobs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div 
          className="absolute -top-[10%] -left-[10%] w-[40vw] h-[40vw] min-w-[400px] min-h-[400px] bg-white/10 rounded-full blur-[100px]"
          animate={{
            x: [0, 50, 0],
            y: [0, 30, 0],
            scale: [1, 1.05, 1],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div 
          className="absolute top-[20%] right-[-10%] w-[35vw] h-[35vw] min-w-[350px] min-h-[350px] bg-indigo-300/20 rounded-full blur-[100px]"
          animate={{
            x: [0, -30, 0],
            y: [0, 50, 0],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1
          }}
        />
        <motion.div 
          className="absolute -bottom-[20%] left-[20%] w-[50vw] h-[50vw] min-w-[500px] min-h-[500px] bg-blue-400/20 rounded-full blur-[120px]"
          animate={{
            x: [0, 40, 0],
            y: [0, -40, 0],
            opacity: [0.2, 0.4, 0.2],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2
          }}
        />
      </div>

      {/* Subtle Background Particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-white/10 blur-sm"
            style={{
              width: Math.random() * 60 + 20,
              height: Math.random() * 60 + 20,
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -40, 0],
              opacity: [0.1, 0.3, 0.1],
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: Math.random() * 5 + 5,
              repeat: Infinity,
              ease: "easeInOut",
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>

      <div className="max-w-7xl w-full mx-auto z-10 flex flex-col items-center text-center">
        
        <motion.h1 
          className="font-sans font-bold text-6xl md:text-8xl lg:text-[7rem] leading-[0.95] tracking-tight mb-8 drop-shadow-sm"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          Invent More.<br />
          Draft Less.
        </motion.h1>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-2xl mx-auto space-y-4"
        >
          <p className="text-xl md:text-2xl font-medium text-blue-50/90 leading-relaxed">
            Transform raw invention disclosures into <br className="hidden md:block" /> 
            robust legal claims <span className="text-white font-bold">instantly.</span>
          </p>
          <p className="text-base md:text-lg text-blue-100/80 font-light">
            Save 10+ hours per application. Zero hallucination mode. <br className="hidden md:block"/>
            Trusted by forward-thinking patent attorneys.
          </p>
        </motion.div>

        <motion.button
          onClick={() => onNavigate('contact')}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mt-10 bg-charcoal text-white px-10 py-5 rounded-full font-bold text-lg shadow-xl hover:bg-charcoal/90 transition-all ring-4 ring-white/20"
        >
          Book Demo
        </motion.button>

        {/* Comparison Visual - Styled like Reference */}
        <div className="relative w-full max-w-5xl h-[450px] mt-24 mx-auto perspective-1000">
          
          {/* Left Card (Before) */}
          <motion.div
            initial={{ x: -50, y: 20, opacity: 0, rotate: -6 }}
            animate={{ x: 0, y: 0, opacity: 1, rotate: -3 }}
            transition={{ duration: 1, delay: 0.6, type: "spring", bounce: 0.4 }}
            className="absolute top-10 left-0 md:left-[15%] w-[300px] md:w-[380px] bg-[#F8F9FA] rounded-3xl shadow-2xl text-charcoal z-10 transform origin-bottom-right border border-gray-200/50"
          >
            {/* Floating Badge */}
            <div className="absolute -top-5 left-8 bg-white border border-gray-100 shadow-md px-4 py-2 rounded-xl flex items-center gap-2 z-20">
              <Edit3 size={16} className="text-gray-400" />
              <span className="font-bold text-gray-500 text-sm">Before</span>
            </div>

            <div className="p-8 pt-10 text-left">
              <div className="space-y-4 font-mono text-xs md:text-sm text-gray-500/80 leading-relaxed">
                <div className="p-3 bg-white rounded-xl border border-gray-100 shadow-sm rotate-1">
                  <p className="line-through decoration-gray-300">Invention: A drone coffee cup holder.</p>
                </div>
                <div className="p-3 bg-white rounded-xl border border-gray-100 shadow-sm -rotate-1">
                   <p>Needs a gimbal. 3-axis?</p>
                </div>
                <div className="p-3 bg-white rounded-xl border border-gray-100 shadow-sm rotate-1">
                  <p>Must lock when flying fast.</p>
                  <p className="mt-2 text-xs italic text-gray-400">"Make sure it fits a venti."</p>
                </div>
              </div>
            </div>
            {/* Fade at bottom */}
            <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-[#F8F9FA] to-transparent rounded-b-3xl"></div>
          </motion.div>

          {/* Right Card (After) */}
          <motion.div
            initial={{ x: 50, y: 40, opacity: 0, rotate: 6 }}
            animate={{ x: 0, y: 20, opacity: 1, rotate: 3 }}
            transition={{ duration: 1, delay: 0.8, type: "spring", bounce: 0.4 }}
            className="absolute top-0 right-0 md:right-[15%] w-[340px] md:w-[440px] bg-white rounded-3xl shadow-[0_20px_50px_-12px_rgba(0,0,0,0.3)] text-charcoal z-20 border border-white/50"
          >
            {/* Floating Badge */}
            <div className="absolute -top-5 left-8 bg-white border border-blue-50 shadow-md px-4 py-2 rounded-xl flex items-center gap-2 z-20">
              <Sparkles size={16} className="text-brand-blue fill-brand-blue" />
              <span className="font-bold text-charcoal text-sm">After</span>
            </div>

            <div className="p-8 pt-10 text-left">
              <div className="font-serif text-sm md:text-base leading-loose text-charcoal-light">
                <p className="mb-4"><span className="font-bold text-black">1. An aerial delivery stabilization apparatus comprising:</span></p>
                <p className="pl-4 mb-3 border-l-2 border-brand-blue/30">
                  a <span className="bg-blue-50 text-brand-blue px-1 rounded font-medium">three-axis gimbal mechanism</span> configured to couple to an underside of an unmanned aerial vehicle;
                </p>
                <p className="pl-4 border-l-2 border-brand-blue/30">
                  an automatic locking engagement member disposed within said housing...
                </p>
              </div>
              
              <div className="mt-6 pt-4 border-t border-gray-50 flex items-center justify-between">
                <div className="flex items-center gap-2 text-green-600 text-xs font-bold uppercase tracking-wider">
                  <CheckCircle2 size={14} />
                  <span>Ready to file</span>
                </div>
                <div className="text-xs text-gray-300 font-mono">Generated in 0.4s</div>
              </div>
            </div>
          </motion.div>

        </div>
      </div>

      {/* Soft White Gradient Fade at Bottom to blend with next section */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-cream to-transparent z-20"></div>
    </section>
  );
};
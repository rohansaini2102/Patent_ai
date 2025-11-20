import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring, useMotionValue } from 'framer-motion';
import { Edit3, Sparkles, CheckCircle2, MousePointer2 } from 'lucide-react';
import { Page } from '../App';

interface HeroProps {
  onNavigate: (page: Page) => void;
}

export const Hero: React.FC<HeroProps> = ({ onNavigate }) => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollY } = useScroll();
  
  // Adjusted parallax to prevent overlap
  const yText = useTransform(scrollY, [0, 300], [0, 100]);
  const yCards = useTransform(scrollY, [0, 300], [0, -20]);

  // 3D Tilt Logic
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const mouseX = useSpring(x, { stiffness: 50, damping: 15 });
  const mouseY = useSpring(y, { stiffness: 50, damping: 15 });

  function handleMouseMove({ clientX, clientY, currentTarget }: React.MouseEvent) {
    const { left, top, width, height } = currentTarget.getBoundingClientRect();
    const xPct = (clientX - left) / width - 0.5;
    const yPct = (clientY - top) / height - 0.5;
    x.set(xPct);
    y.set(yPct);
  }

  function handleMouseLeave() {
    x.set(0);
    y.set(0);
  }

  const rotateX = useTransform(mouseY, [-0.5, 0.5], [7, -7]);
  const rotateY = useTransform(mouseX, [-0.5, 0.5], [-7, 7]);

  return (
    <section 
      ref={ref}
      className="relative min-h-[120vh] flex flex-col pt-32 pb-32 px-6 md:px-12 overflow-hidden bg-brand-blue text-white perspective-2000"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {/* Noise Texture Overlay */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none z-0 mix-blend-overlay" 
           style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }}>
      </div>

      {/* Animated Background Blobs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none select-none z-0">
        <motion.div 
          className="absolute -top-[20%] -left-[10%] w-[60vw] h-[60vw] min-w-[500px] min-h-[500px] bg-gradient-to-br from-white/20 to-blue-200/10 rounded-full blur-[100px] mix-blend-overlay"
          animate={{
            x: [0, 120, -80, 0],
            y: [0, -60, 100, 0],
            scale: [1, 1.1, 0.95, 1],
            rotate: [0, 45, -20, 0],
          }}
          transition={{ duration: 45, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div 
          className="absolute top-[-10%] right-[-20%] w-[50vw] h-[50vw] min-w-[400px] min-h-[400px] bg-indigo-400/20 rounded-full blur-[90px]"
          animate={{
            x: [0, -100, 50, 0],
            y: [0, 80, -40, 0],
            scale: [1, 1.2, 0.9, 1],
          }}
          transition={{ duration: 38, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        />
        <motion.div 
          className="absolute top-[40%] left-[40%] w-[25vw] h-[25vw] min-w-[250px] min-h-[250px] bg-white/5 rounded-full blur-[80px]"
          animate={{
             x: [0, -150, 100, 0],
             y: [0, 120, -80, 0],
             scale: [0.8, 1.1, 0.9, 0.8],
             opacity: [0, 0.2, 0.1, 0]
          }}
          transition={{ duration: 30, repeat: Infinity, ease: "easeInOut", delay: 5 }}
        />
      </div>

      {/* Content Layer */}
      <div className="max-w-7xl w-full mx-auto z-10 flex flex-col items-center text-center relative">
        
        {/* Text Container - High Z-index to sit above cards */}
        <motion.div style={{ y: yText }} className="relative z-30 pointer-events-auto">
          <motion.h1 
            className="font-sans font-bold text-6xl md:text-8xl lg:text-[7rem] leading-[0.95] tracking-tight mb-8 drop-shadow-sm"
            initial={{ opacity: 0, y: 50, filter: "blur(10px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          >
            Invent More.<br />
            Draft Less.
          </motion.h1>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="max-w-2xl mx-auto space-y-4"
          >
            <p className="text-xl md:text-2xl font-medium text-blue-50/90 leading-relaxed">
              Transform raw invention disclosures into <br className="hidden md:block" /> 
              robust legal claims <span className="text-white font-bold border-b border-white/20 pb-0.5">instantly.</span>
            </p>
          </motion.div>

          <motion.button
            onClick={() => onNavigate('contact')}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="mt-10 bg-charcoal text-white px-10 py-5 rounded-full font-bold text-lg shadow-[0_20px_50px_-12px_rgba(0,0,0,0.5)] hover:shadow-[0_30px_60px_-15px_rgba(0,0,0,0.6)] hover:bg-charcoal/90 transition-all ring-4 ring-white/10 relative overflow-hidden group cursor-pointer"
          >
            <span className="relative z-10">Book Demo</span>
            <motion.div 
              className="absolute inset-0 bg-white/20 translate-y-[100%] group-hover:translate-y-0 transition-transform duration-300 ease-out"
            />
          </motion.button>
        </motion.div>

        {/* 3D Comparison Visual - Lower Z-index, More spacing */}
        <motion.div 
          style={{ y: yCards, rotateX, rotateY, transformStyle: "preserve-3d" }}
          className="relative w-full max-w-5xl h-[500px] mt-48 mx-auto perspective-1000 z-20"
        >
          
          {/* Left Card (Before) - Updated styling to match premium look */}
          <motion.div
            initial={{ x: -100, opacity: 0, rotate: -10 }}
            animate={{ x: 0, opacity: 1, rotate: -3 }}
            whileHover={{ scale: 1.05, rotate: 0, z: 30 }}
            transition={{ duration: 1.2, delay: 0.6, type: "spring", bounce: 0.3 }}
            className="absolute top-10 left-0 md:left-[10%] w-[300px] md:w-[380px] bg-white/90 backdrop-blur-md rounded-3xl shadow-[0_20px_60px_-15px_rgba(0,0,0,0.3)] text-charcoal z-10 origin-bottom-right border border-white/60"
            style={{ transformStyle: "preserve-3d", translateZ: 20 }}
          >
            {/* Floating Badge */}
            <div className="absolute -top-5 left-8 bg-white border border-gray-100 shadow-lg px-4 py-2 rounded-full flex items-center gap-2 z-20">
              <Edit3 size={14} className="text-charcoal" />
              <span className="font-bold text-charcoal text-xs uppercase tracking-wider">Input</span>
            </div>

            <div className="p-8 pt-10 text-left">
              <div className="space-y-4 font-mono text-xs md:text-sm text-gray-600 leading-relaxed">
                <motion.div 
                   className="p-4 bg-white rounded-xl border border-gray-100 shadow-sm rotate-1"
                   whileHover={{ scale: 1.05, rotate: 0 }}
                >
                  <p className="line-through decoration-red-300 text-gray-400">Invention: A drone coffee cup holder.</p>
                </motion.div>
                <motion.div 
                   className="p-4 bg-white rounded-xl border border-gray-100 shadow-sm -rotate-1"
                   whileHover={{ scale: 1.05, rotate: 0 }}
                >
                   <p>Needs a gimbal. 3-axis? Stabilization is key.</p>
                </motion.div>
                <motion.div 
                   className="p-4 bg-white rounded-xl border border-gray-100 shadow-sm rotate-1"
                   whileHover={{ scale: 1.05, rotate: 0 }}
                >
                  <p>Must lock when flying fast.</p>
                  <p className="mt-2 text-xs italic text-gray-400">"Make sure it fits a venti."</p>
                </motion.div>
              </div>
            </div>
          </motion.div>

          {/* Right Card (After) */}
          <motion.div
            initial={{ x: 100, opacity: 0, rotate: 10 }}
            animate={{ x: 0, opacity: 1, rotate: 3 }}
            whileHover={{ scale: 1.05, rotate: 0, z: 80 }}
            transition={{ duration: 1.2, delay: 0.8, type: "spring", bounce: 0.3 }}
            className="absolute top-0 right-0 md:right-[10%] w-[340px] md:w-[440px] bg-white/95 backdrop-blur-md rounded-3xl shadow-[0_30px_80px_-20px_rgba(0,0,0,0.4)] text-charcoal z-20 border border-white/60"
            style={{ transformStyle: "preserve-3d", translateZ: 60 }}
          >
            {/* Floating Badge */}
            <div className="absolute -top-5 left-8 bg-charcoal border border-charcoal shadow-lg px-4 py-2 rounded-full flex items-center gap-2 z-20">
              <Sparkles size={14} className="text-white" />
              <span className="font-bold text-white text-xs uppercase tracking-wider">Nexora AI</span>
            </div>

            <div className="p-8 pt-10 text-left relative overflow-hidden rounded-3xl">
              {/* Scanning Effect */}
              <motion.div 
                className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-brand-blue to-transparent z-30 opacity-50"
                animate={{ top: ["0%", "100%", "0%"] }}
                transition={{ duration: 8, ease: "linear", repeat: Infinity }}
              />

              <div className="font-serif text-sm md:text-base leading-loose text-charcoal-light relative z-10">
                <p className="mb-4"><span className="font-bold text-black">1. An aerial delivery stabilization apparatus comprising:</span></p>
                <motion.p 
                  className="pl-4 mb-3 border-l-2 border-brand-blue/30"
                  initial={{ opacity: 0.5 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                >
                  a <span className="bg-blue-50 text-brand-blue px-1 rounded font-medium">three-axis gimbal mechanism</span> configured to couple to an underside of an unmanned aerial vehicle;
                </motion.p>
                <motion.p 
                  className="pl-4 border-l-2 border-brand-blue/30"
                  initial={{ opacity: 0.5 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 }}
                >
                  an automatic locking engagement member disposed within said housing...
                </motion.p>
              </div>
              
              <div className="mt-6 pt-4 border-t border-gray-50 flex items-center justify-between relative z-10">
                <div className="flex items-center gap-2 text-green-600 text-xs font-bold uppercase tracking-wider">
                  <CheckCircle2 size={14} />
                  <span>Ready to file</span>
                </div>
                <div className="text-xs text-gray-300 font-mono flex items-center gap-1">
                   <Sparkles size={10} />
                   Generated in 0.4s
                </div>
              </div>
            </div>
          </motion.div>

          {/* Floating Cursor Element for visual cue */}
          <motion.div 
            className="absolute z-50 pointer-events-none text-white/20 mix-blend-overlay hidden md:block"
            style={{ 
               x: useTransform(mouseX, [-0.5, 0.5], [-150, 150]),
               y: useTransform(mouseY, [-0.5, 0.5], [-100, 100]),
               rotate: -15
            }}
          >
            <MousePointer2 size={120} strokeWidth={1} />
          </motion.div>

        </motion.div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-cream to-transparent z-20 pointer-events-none"></div>
    </section>
  );
};
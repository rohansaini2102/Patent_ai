import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { BrainCircuit, Feather } from 'lucide-react';

export const Manifesto: React.FC = () => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], [100, -100]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

  return (
    <section ref={ref} className="py-32 md:py-48 px-6 md:px-12 bg-cream relative overflow-hidden" id="manifesto">
      
      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div 
          style={{ opacity, y }}
          className="flex flex-col gap-20"
        >
           {/* Header */}
           <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-8 border-b border-charcoal/10 pb-12">
              <div className="max-w-4xl">
                <motion.span 
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6 }}
                  viewport={{ once: true }}
                  className="text-xs font-bold uppercase tracking-[0.2em] text-brand-blue mb-6 block"
                >
                  The New Standard
                </motion.span>
                <h2 className="font-serif text-5xl md:text-7xl lg:text-8xl text-charcoal leading-[0.95] tracking-tight overflow-hidden">
                  <motion.span 
                    initial={{ y: "100%" }}
                    whileInView={{ y: 0 }}
                    transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                    viewport={{ once: true }}
                    className="block"
                  >
                    Draft at the 
                  </motion.span>
                  <motion.span 
                    initial={{ y: "100%" }}
                    whileInView={{ y: 0 }}
                    transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
                    viewport={{ once: true }}
                    className="block italic text-gray-400 font-light"
                  >
                     speed of thought.
                  </motion.span>
                </h2>
              </div>
              <div className="hidden md:block text-right">
                 <motion.div 
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8 }}
                    className="text-4xl font-light text-charcoal/20 font-serif italic"
                 >
                    01
                 </motion.div>
              </div>
           </div>

           {/* Content */}
           <div className="grid grid-cols-1 md:grid-cols-2 gap-16 lg:gap-24">
              <div className="space-y-8">
                 <motion.h3 
                   initial={{ opacity: 0, y: 20 }}
                   whileInView={{ opacity: 1, y: 0 }}
                   viewport={{ once: true }}
                   transition={{ duration: 0.8, delay: 0.2 }}
                   className="text-2xl md:text-3xl font-medium text-charcoal leading-snug"
                 >
                   We transformed the patent drafting process from a <span className="border-b-2 border-brand-blue/30 pb-1">literary challenge</span> into a <span className="border-b-2 border-brand-blue/30 pb-1">computational one</span>.
                 </motion.h3>
                 <motion.p 
                   initial={{ opacity: 0, y: 20 }}
                   whileInView={{ opacity: 1, y: 0 }}
                   viewport={{ once: true }}
                   transition={{ duration: 0.8, delay: 0.3 }}
                   className="text-charcoal/70 leading-relaxed font-light text-lg"
                 >
                   Traditionally, converting a technical disclosure into a legal claim set is a high-friction task requiring deep cognitive load. It's slow, expensive, and constrained by human bandwidth.
                 </motion.p>
              </div>
              
              <div className="space-y-8 relative">
                 {/* Decorative line */}
                 <motion.div 
                   initial={{ height: 0 }}
                   whileInView={{ height: "100%" }}
                   transition={{ duration: 1.5 }}
                   viewport={{ once: true }}
                   className="absolute -left-8 top-0 bottom-0 w-[1px] bg-gradient-to-b from-brand-blue/0 via-brand-blue/30 to-brand-blue/0 hidden md:block"
                 ></motion.div>

                 <motion.p 
                   initial={{ opacity: 0, y: 20 }}
                   whileInView={{ opacity: 1, y: 0 }}
                   viewport={{ once: true }}
                   transition={{ duration: 0.8, delay: 0.4 }}
                   className="text-charcoal/70 leading-relaxed font-light text-lg"
                 >
                   Nexora leverages advanced generative AI models fine-tuned on millions of granted patents. Our engine digests raw inputs—diagrams, code snippets, and whitepapers—to architect legally robust specifications in minutes.
                 </motion.p>

                 <motion.div 
                   initial={{ opacity: 0 }}
                   whileInView={{ opacity: 1 }}
                   viewport={{ once: true }}
                   transition={{ delay: 0.6 }}
                   className="flex flex-wrap items-center gap-4 pt-6"
                 >
                    <div className="flex items-center gap-2 px-5 py-3 bg-white rounded-full border border-gray-200 shadow-sm opacity-60">
                       <Feather size={16} className="text-gray-400" />
                       <span className="text-xs uppercase tracking-wider text-gray-400 font-medium line-through">Manual Drafting</span>
                    </div>
                    <div className="h-[1px] w-8 bg-gray-300 hidden sm:block"></div>
                    <motion.div 
                        whileHover={{ scale: 1.05, rotate: 1 }}
                        className="flex items-center gap-2 px-5 py-3 bg-charcoal text-white rounded-full shadow-xl shadow-charcoal/20 cursor-default"
                    >
                       <BrainCircuit size={18} className="text-brand-blue" />
                       <span className="text-xs uppercase tracking-wider font-bold">Generative AI</span>
                    </motion.div>
                 </motion.div>
              </div>
           </div>

        </motion.div>
      </div>
    </section>
  );
};
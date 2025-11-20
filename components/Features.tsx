import React, { useState, useRef } from 'react';
import { motion, useMotionTemplate, useMotionValue, Variants } from 'framer-motion';
import { Cpu, Scale, Zap, ShieldCheck } from 'lucide-react';

const features = [
  {
    title: "Context Awareness",
    description: "Understanding the nuance between a 'comprising' and 'consisting of' claim scope.",
    icon: Cpu,
    colSpan: "md:col-span-2",
  },
  {
    title: "Prior Art Analysis",
    description: "Real-time cross-referencing with global patent databases to ensure novelty.",
    icon: Scale,
    colSpan: "md:col-span-1",
  },
  {
    title: "Instant Formatting",
    description: "Auto-formatting to USPTO, EPO, and WIPO standards instantly.",
    icon: Zap,
    colSpan: "md:col-span-1",
  },
  {
    title: "Secure Execution",
    description: "Enterprise-grade encryption. Your invention data never trains public models.",
    icon: ShieldCheck,
    colSpan: "md:col-span-2",
  }
];

interface SpotlightCardProps {
  children: React.ReactNode;
  className?: string;
}

const SpotlightCard: React.FC<SpotlightCardProps> = ({ children, className = "" }) => {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  function handleMouseMove({ currentTarget, clientX, clientY }: React.MouseEvent) {
    const { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }

  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 50, scale: 0.9 },
        visible: { 
          opacity: 1, 
          y: 0, 
          scale: 1,
          transition: { duration: 0.7, ease: [0.21, 0.47, 0.32, 0.98] } 
        }
      }}
      className={`group relative border border-charcoal/5 bg-white/50 overflow-hidden rounded-3xl ${className}`}
      onMouseMove={handleMouseMove}
      whileHover={{ y: -5, transition: { duration: 0.2 } }}
    >
      <motion.div
        className="pointer-events-none absolute -inset-px rounded-3xl opacity-0 transition duration-300 group-hover:opacity-100"
        style={{
          background: useMotionTemplate`
            radial-gradient(
              650px circle at ${mouseX}px ${mouseY}px,
              rgba(155, 187, 225, 0.15),
              transparent 80%
            )
          `,
        }}
      />
      <motion.div
        className="pointer-events-none absolute -inset-px rounded-3xl opacity-0 transition duration-300 group-hover:opacity-100"
        style={{
            background: useMotionTemplate`
              radial-gradient(
                400px circle at ${mouseX}px ${mouseY}px,
                rgba(155, 187, 225, 0.4),
                transparent 40%
              )
            `,
            maskImage: useMotionTemplate`
                radial-gradient(
                    200px circle at ${mouseX}px ${mouseY}px,
                    black,
                    transparent
                )
            `,
            WebkitMaskImage: useMotionTemplate`
                radial-gradient(
                    200px circle at ${mouseX}px ${mouseY}px,
                    black,
                    transparent
                )
            `
        }}
      >
         <div className="absolute inset-0 border-2 border-brand-blue rounded-3xl pointer-events-none"></div>
      </motion.div>
      
      {children}
    </motion.div>
  );
};

export const Features: React.FC = () => {
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2
      }
    }
  };

  return (
    <section className="py-32 px-6 md:px-12 bg-cream relative overflow-hidden" id="solution">
      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="mb-20 max-w-2xl"
        >
           <h2 className="text-sm font-bold uppercase tracking-widest text-charcoal/50 mb-4 flex items-center gap-2">
             <motion.span 
               initial={{ width: 0 }}
               whileInView={{ width: 32 }}
               transition={{ duration: 0.8 }}
               className="h-[1px] bg-charcoal/30" 
             />
             Our Capabilities
           </h2>
           <h3 className="font-serif text-4xl md:text-5xl text-charcoal leading-tight">
             Engineered for the Modern <br/>Patent Practitioner.
           </h3>
        </motion.div>

        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          {features.map((feature, index) => (
            <SpotlightCard key={index} className={feature.colSpan}>
              <div className="relative h-full flex flex-col justify-between p-8 z-20">
                <div className="w-12 h-12 bg-white border border-gray-100 rounded-2xl flex items-center justify-center mb-6 shadow-sm group-hover:scale-110 transition-transform duration-500">
                  <feature.icon className="w-6 h-6 text-charcoal" />
                </div>
                
                <div>
                  <h4 className="font-serif text-2xl mb-3 text-charcoal">{feature.title}</h4>
                  <p className="text-sm text-charcoal/60 leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </div>
            </SpotlightCard>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

import React from 'react';
import { motion } from 'framer-motion';
import { Cpu, Scale, Zap, ShieldCheck } from 'lucide-react';

const features = [
  {
    title: "Context Awareness",
    description: "Understanding the nuance between a 'comprising' and 'consisting of' claim scope.",
    icon: Cpu
  },
  {
    title: "Prior Art Analysis",
    description: "Real-time cross-referencing with global patent databases to ensure novelty.",
    icon: Scale
  },
  {
    title: "Instant Formatting",
    description: "Auto-formatting to USPTO, EPO, and WIPO standards instantly.",
    icon: Zap
  },
  {
    title: "Secure Execution",
    description: "Enterprise-grade encryption. Your invention data never trains public models.",
    icon: ShieldCheck
  }
];

export const Features: React.FC = () => {
  return (
    <section className="py-32 px-6 md:px-12 bg-cream" id="solution">
      <div className="max-w-7xl mx-auto">
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mb-20"
        >
           <h2 className="text-sm font-bold uppercase tracking-widest text-charcoal/50 mb-4">Our Capabilities</h2>
           <h3 className="font-serif text-4xl md:text-5xl text-charcoal">Engineered for the Modern <br/>Patent Practitioner.</h3>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              className="group p-8 border border-gray-200 hover:border-charcoal hover:bg-white transition-all duration-500 min-h-[300px] flex flex-col justify-between"
            >
              <div className="w-12 h-12 bg-gray-100 group-hover:bg-charcoal group-hover:text-white rounded-full flex items-center justify-center transition-colors duration-500 mb-6">
                <feature.icon className="w-6 h-6" />
              </div>
              
              <div>
                <h4 className="font-serif text-2xl mb-4">{feature.title}</h4>
                <p className="text-sm text-gray-500 leading-relaxed group-hover:text-gray-800 transition-colors">
                  {feature.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
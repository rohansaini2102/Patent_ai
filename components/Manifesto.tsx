import React from 'react';
import { motion } from 'framer-motion';

export const Manifesto: React.FC = () => {
  return (
    <section className="py-32 px-6 md:px-12 bg-cream relative" id="manifesto">
      <div className="max-w-4xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-10%" }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="font-serif text-4xl md:text-6xl leading-tight text-charcoal mb-12">
            Where aesthetics and <br/><span className="italic text-gray-500">functionality</span> meet.
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 text-left">
           <motion.div
             initial={{ opacity: 0, x: -20 }}
             whileInView={{ opacity: 1, x: 0 }}
             viewport={{ once: true }}
             transition={{ delay: 0.2, duration: 0.8 }}
           >
             <p className="text-lg font-light leading-relaxed">
               Drafting a patent is an art form constrained by rigid legal frameworks. Traditionally, it requires hours of meticulous translation from technical jargon to legal prose.
             </p>
           </motion.div>
           <motion.div
             initial={{ opacity: 0, x: 20 }}
             whileInView={{ opacity: 1, x: 0 }}
             viewport={{ once: true }}
             transition={{ delay: 0.4, duration: 0.8 }}
           >
             <p className="text-lg font-light leading-relaxed">
               Nexora acts as your intelligent co-pilot. We don't just autocomplete sentences; we understand the invention's novelty and structure the claims accordingly.
             </p>
           </motion.div>
        </div>
      </div>
      
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[1px] h-32 bg-charcoal/10 hidden md:block"></div>
    </section>
  );
};
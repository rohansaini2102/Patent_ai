import React from 'react';
import { Page } from '../App';
import { ArrowUpRight, ShieldCheck, Lock } from 'lucide-react';
import { motion } from 'framer-motion';

interface FooterProps {
  onNavigate: (page: Page) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.5 }
    }
  };

  return (
    <footer className="bg-charcoal text-cream px-6 md:px-12 pt-24 pb-12 relative overflow-hidden">
      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Top Section: Mission & Links */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 mb-24">
          
          {/* Brand / Mission */}
          <motion.div 
            className="lg:col-span-5 space-y-8"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h3 className="font-serif text-3xl md:text-4xl leading-tight text-white">
              Stay ahead of the curve.
            </h3>
            <p className="text-cream/60 font-light text-lg max-w-md leading-relaxed">
              We are redefining how patents are written. Bringing intelligence, speed, and precision to the forefront of intellectual property workflow.
            </p>
            <motion.button 
                onClick={() => onNavigate('contact')}
                whileHover={{ scale: 1.05, x: 5 }}
                className="group inline-flex items-center gap-2 text-sm font-bold uppercase tracking-widest mt-4 hover:text-brand-blue transition-colors"
            >
                Start Drafting
                <ArrowUpRight size={16} className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"/>
            </motion.button>

            {/* Security / Trust Badges */}
            <motion.div 
              className="pt-8 mt-8 border-t border-white/10"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
                <p className="text-xs font-bold uppercase tracking-widest text-white/30 mb-4">Security & Compliance</p>
                <div className="flex flex-wrap gap-y-3 gap-x-6 text-sm text-white/60 font-light">
                    <div className="flex items-center gap-2">
                        <ShieldCheck size={14} className="text-green-500" />
                        <span>SOC2 Type II Ready</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <Lock size={14} className="text-green-500" />
                        <span>AES-256 Encryption</span>
                    </div>
                </div>
            </motion.div>
          </motion.div>

          {/* Navigation Grid */}
          <div className="lg:col-span-7 grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8">
            
            {/* Menu */}
            <motion.div 
              className="space-y-6"
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              <span className="text-xs font-bold uppercase tracking-widest text-cream/40 block border-b border-cream/10 pb-4">Company</span>
              <ul className="space-y-3">
                <motion.li variants={itemVariants}><button onClick={() => onNavigate('home')} className="text-lg hover:text-brand-blue transition-colors text-left font-light">Work</button></motion.li>
                <motion.li variants={itemVariants}><button onClick={() => onNavigate('home')} className="text-lg hover:text-brand-blue transition-colors text-left font-light">Expertise</button></motion.li>
                <motion.li variants={itemVariants}><button onClick={() => onNavigate('contact')} className="text-lg hover:text-brand-blue transition-colors text-left font-light">Pricing</button></motion.li>
                <motion.li variants={itemVariants}><button className="text-lg hover:text-brand-blue transition-colors text-left font-light">Careers</button></motion.li>
                <motion.li variants={itemVariants}><button className="text-lg hover:text-brand-blue transition-colors text-left font-light">Press</button></motion.li>
              </ul>
            </motion.div>

            {/* Socials */}
            <motion.div 
              className="space-y-6"
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              <span className="text-xs font-bold uppercase tracking-widest text-cream/40 block border-b border-cream/10 pb-4">Socials</span>
              <ul className="space-y-3">
                <motion.li variants={itemVariants}><a href="#" className="text-lg hover:text-brand-blue transition-colors block font-light">Instagram</a></motion.li>
                <motion.li variants={itemVariants}><a href="#" className="text-lg hover:text-brand-blue transition-colors block font-light">LinkedIn</a></motion.li>
                <motion.li variants={itemVariants}><a href="#" className="text-lg hover:text-brand-blue transition-colors block font-light">Twitter</a></motion.li>
              </ul>
            </motion.div>

            {/* Contact */}
            <motion.div 
              className="space-y-6"
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              <span className="text-xs font-bold uppercase tracking-widest text-cream/40 block border-b border-cream/10 pb-4">Contact</span>
              <div className="space-y-3">
                <motion.a variants={itemVariants} href="mailto:info@nexorapatent.com" className="text-lg hover:text-brand-blue transition-colors block font-light break-all">info@nexorapatent.com</motion.a>
                <motion.p variants={itemVariants} className="text-cream/60 font-light">Delaware, USA</motion.p>
                <motion.button variants={itemVariants} onClick={() => onNavigate('contact')} className="text-sm underline underline-offset-4 hover:text-brand-blue transition-colors mt-4 block">
                    Get in touch
                </motion.button>
              </div>
            </motion.div>

          </div>
        </div>

        {/* Divider */}
        <motion.div 
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: "easeInOut" }}
          className="h-px w-full bg-gradient-to-r from-cream/0 via-cream/10 to-cream/0 mb-16 origin-left"
        />

        {/* Big Typography */}
        <div className="flex flex-col items-center text-center mb-16 select-none pointer-events-none overflow-hidden">
           <motion.h1 
             initial={{ y: "100%" }}
             whileInView={{ y: 0 }}
             viewport={{ once: true }}
             transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
             className="font-serif text-[12vw] md:text-[13.5vw] leading-[0.8] text-cream opacity-90 tracking-tighter whitespace-nowrap"
           >
            Let's Innovate
          </motion.h1>
        </div>

        {/* Bottom Bar */}
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="flex flex-col md:flex-row justify-between items-center gap-6 text-xs uppercase tracking-widest text-cream/40 pt-8 border-t border-cream/5"
        >
          <p>© 2024 Nexora Patent AI</p>
          <div className="flex gap-8">
             <button onClick={() => onNavigate('privacy')} className="hover:text-cream transition-colors">Privacy Policy</button>
             <button onClick={() => onNavigate('terms')} className="hover:text-cream transition-colors">Terms of Service</button>
          </div>
        </motion.div>
      </div>
    </footer>
  );
};
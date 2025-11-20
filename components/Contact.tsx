import React, { useState } from 'react';
import { motion } from 'framer-motion';

export const Contact: React.FC = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" }
    }
  };

  return (
    <motion.section 
      initial="hidden"
      animate="visible"
      exit={{ opacity: 0, y: -20 }}
      className="min-h-screen bg-cream pt-32 pb-12 px-6 md:px-12"
    >
      <div className="max-w-7xl mx-auto">
        <motion.div
          variants={itemVariants}
          className="mb-20"
        >
          <h1 className="font-serif text-6xl md:text-8xl text-charcoal mb-6">Let's Connect</h1>
          <p className="text-xl font-light text-charcoal/70 max-w-2xl">
            Ready to revolutionize your patent workflow? We are here to help you integrate the future of drafting.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-16">
          <motion.div 
            className="md:col-span-5 space-y-12"
            variants={containerVariants}
          >
            <motion.div variants={itemVariants}>
              <h3 className="text-sm uppercase tracking-widest text-charcoal/50 mb-4">Email Us</h3>
              <a href="mailto:info@nexorapatent.com" className="text-2xl font-serif hover:opacity-70 transition-opacity">
                info@nexorapatent.com
              </a>
            </motion.div>

            <motion.div variants={itemVariants}>
              <h3 className="text-sm uppercase tracking-widest text-charcoal/50 mb-4">Headquarters</h3>
              <p className="text-xl font-serif">
                Delaware, USA
              </p>
            </motion.div>

            <motion.div variants={itemVariants}>
              <h3 className="text-sm uppercase tracking-widest text-charcoal/50 mb-4">Socials</h3>
              <div className="flex gap-6">
                <a href="#" className="text-lg border-b border-charcoal/20 pb-1 hover:border-charcoal transition-colors">LinkedIn</a>
                <a href="#" className="text-lg border-b border-charcoal/20 pb-1 hover:border-charcoal transition-colors">Twitter</a>
              </div>
            </motion.div>
          </motion.div>

          <motion.div 
            className="md:col-span-7"
            variants={containerVariants}
          >
            <form className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <motion.div variants={itemVariants}>
                  <AnimatedInput label="First Name" placeholder="John" />
                </motion.div>
                <motion.div variants={itemVariants}>
                  <AnimatedInput label="Last Name" placeholder="Doe" />
                </motion.div>
              </div>

              <motion.div variants={itemVariants}>
                <AnimatedInput label="Email Address" placeholder="john@company.com" type="email" />
              </motion.div>
              
              <motion.div variants={itemVariants}>
                <AnimatedTextArea label="Message" placeholder="Tell us about your needs..." />
              </motion.div>

              <motion.button 
                variants={itemVariants}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit" 
                className="bg-charcoal text-cream px-10 py-4 rounded-full text-sm font-medium uppercase tracking-widest hover:bg-charcoal/80 transition-all shadow-lg mt-8"
              >
                Send Message
              </motion.button>
            </form>
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
};

const AnimatedInput = ({ label, placeholder, type = "text" }: { label: string, placeholder: string, type?: string }) => {
    const [focused, setFocused] = useState(false);

    return (
        <div className="space-y-2 relative">
            <label className={`text-xs uppercase tracking-widest transition-colors duration-300 ${focused ? 'text-charcoal' : 'text-charcoal/60'}`}>{label}</label>
            <div className="relative">
                <input 
                    type={type} 
                    className="w-full bg-transparent border-b border-charcoal/20 py-4 text-lg focus:outline-none transition-colors" 
                    placeholder={placeholder}
                    onFocus={() => setFocused(true)}
                    onBlur={() => setFocused(false)}
                />
                <motion.div 
                    className="absolute bottom-0 left-0 h-[2px] bg-charcoal"
                    initial={{ width: "0%" }}
                    animate={{ width: focused ? "100%" : "0%" }}
                    transition={{ duration: 0.4, ease: "easeInOut" }}
                />
            </div>
        </div>
    );
}

const AnimatedTextArea = ({ label, placeholder }: { label: string, placeholder: string }) => {
    const [focused, setFocused] = useState(false);

    return (
        <div className="space-y-2 relative">
            <label className={`text-xs uppercase tracking-widest transition-colors duration-300 ${focused ? 'text-charcoal' : 'text-charcoal/60'}`}>{label}</label>
            <div className="relative">
                <textarea 
                    rows={4} 
                    className="w-full bg-transparent border-b border-charcoal/20 py-4 text-lg focus:outline-none resize-none" 
                    placeholder={placeholder}
                    onFocus={() => setFocused(true)}
                    onBlur={() => setFocused(false)}
                />
                <motion.div 
                    className="absolute bottom-0 left-0 h-[2px] bg-charcoal"
                    initial={{ width: "0%" }}
                    animate={{ width: focused ? "100%" : "0%" }}
                    transition={{ duration: 0.4, ease: "easeInOut" }}
                />
            </div>
        </div>
    );
}
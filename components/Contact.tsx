import React from 'react';
import { motion } from 'framer-motion';

export const Contact: React.FC = () => {
  return (
    <section className="min-h-screen bg-cream pt-32 pb-12 px-6 md:px-12">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
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
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.8 }}
          >
            <div>
              <h3 className="text-sm uppercase tracking-widest text-charcoal/50 mb-4">Email Us</h3>
              <a href="mailto:info@nexorapatent.com" className="text-2xl font-serif hover:opacity-70 transition-opacity">
                info@nexorapatent.com
              </a>
            </div>

            <div>
              <h3 className="text-sm uppercase tracking-widest text-charcoal/50 mb-4">Headquarters</h3>
              <p className="text-xl font-serif">
                Delaware, USA
              </p>
            </div>

            <div>
              <h3 className="text-sm uppercase tracking-widest text-charcoal/50 mb-4">Socials</h3>
              <div className="flex gap-6">
                <a href="#" className="text-lg border-b border-charcoal/20 pb-1 hover:border-charcoal transition-colors">LinkedIn</a>
                <a href="#" className="text-lg border-b border-charcoal/20 pb-1 hover:border-charcoal transition-colors">Twitter</a>
              </div>
            </div>
          </motion.div>

          <motion.div 
            className="md:col-span-7"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
          >
            <form className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-2">
                  <label className="text-xs uppercase tracking-widest text-charcoal/60">First Name</label>
                  <input type="text" className="w-full bg-transparent border-b border-charcoal/20 py-4 text-lg focus:outline-none focus:border-charcoal transition-colors" placeholder="John" />
                </div>
                <div className="space-y-2">
                  <label className="text-xs uppercase tracking-widest text-charcoal/60">Last Name</label>
                  <input type="text" className="w-full bg-transparent border-b border-charcoal/20 py-4 text-lg focus:outline-none focus:border-charcoal transition-colors" placeholder="Doe" />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs uppercase tracking-widest text-charcoal/60">Email Address</label>
                <input type="email" className="w-full bg-transparent border-b border-charcoal/20 py-4 text-lg focus:outline-none focus:border-charcoal transition-colors" placeholder="john@company.com" />
              </div>

              <div className="space-y-2">
                <label className="text-xs uppercase tracking-widest text-charcoal/60">Message</label>
                <textarea rows={4} className="w-full bg-transparent border-b border-charcoal/20 py-4 text-lg focus:outline-none focus:border-charcoal transition-colors resize-none" placeholder="Tell us about your needs..."></textarea>
              </div>

              <button type="submit" className="bg-charcoal text-cream px-10 py-4 rounded-full text-sm font-medium uppercase tracking-widest hover:bg-charcoal/80 transition-colors mt-8">
                Send Message
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
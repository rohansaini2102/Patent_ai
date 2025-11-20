import React from 'react';
import { motion } from 'framer-motion';

export const Privacy: React.FC = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.8, ease: "easeOut" }
    }
  };

  return (
    <motion.section 
      initial="hidden"
      animate="visible"
      exit={{ opacity: 0 }}
      className="min-h-screen bg-cream pt-32 pb-24 px-6 md:px-12"
    >
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
        >
          <h1 className="font-serif text-5xl md:text-7xl text-charcoal mb-12">Privacy Policy</h1>
          
          <motion.div 
            variants={containerVariants}
            className="space-y-12 text-charcoal/80 font-light leading-relaxed text-lg"
          >
            <motion.div variants={itemVariants}>
              <h3 className="font-serif text-2xl text-charcoal mb-4">1. Introduction</h3>
              <p>
                Nexora Patent AI ("we," "us," or "our") respects your privacy and is committed to protecting your personal data. This privacy policy will inform you as to how we look after your personal data when you visit our website (regardless of where you visit it from) and tell you about your privacy rights and how the law protects you.
              </p>
            </motion.div>

            <motion.div variants={itemVariants}>
              <h3 className="font-serif text-2xl text-charcoal mb-4">2. Data We Collect</h3>
              <p className="mb-4">
                We may collect, use, store and transfer different kinds of personal data about you which we have grouped together follows:
              </p>
              <ul className="list-disc pl-5 space-y-2">
                <li><strong className="font-medium">Identity Data</strong> includes first name, last name, username or similar identifier.</li>
                <li><strong className="font-medium">Contact Data</strong> includes billing address, delivery address, email address and telephone numbers.</li>
                <li><strong className="font-medium">Technical Data</strong> includes internet protocol (IP) address, your login data, browser type and version, time zone setting and location.</li>
              </ul>
            </motion.div>

            <motion.div variants={itemVariants}>
              <h3 className="font-serif text-2xl text-charcoal mb-4">3. How We Use Your Data</h3>
              <p>
                We will only use your personal data when the law allows us to. Most commonly, we will use your personal data in the following circumstances:
              </p>
              <ul className="list-disc pl-5 space-y-2 mt-4">
                <li>Where we need to perform the contract we are about to enter into or have entered into with you.</li>
                <li>Where it is necessary for our legitimate interests (or those of a third party) and your interests and fundamental rights do not override those interests.</li>
                <li>Where we need to comply with a legal or regulatory obligation.</li>
              </ul>
            </motion.div>

            <motion.div variants={itemVariants}>
              <h3 className="font-serif text-2xl text-charcoal mb-4">4. Data Security</h3>
              <p>
                We have put in place appropriate security measures to prevent your personal data from being accidentally lost, used or accessed in an unauthorized way, altered or disclosed. In addition, we limit access to your personal data to those employees, agents, contractors and other third parties who have a business need to know.
              </p>
            </motion.div>
            
            <motion.div variants={itemVariants}>
              <h3 className="font-serif text-2xl text-charcoal mb-4">5. Contact Us</h3>
              <p>
                If you have any questions about this privacy policy or our privacy practices, please contact us at: <a href="mailto:info@nexorapatent.com" className="underline text-charcoal">info@nexorapatent.com</a>.
              </p>
              <p className="mt-4">
                Nexora Patent AI<br/>
                Delaware, USA
              </p>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </motion.section>
  );
};
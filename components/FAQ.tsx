import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, HelpCircle } from 'lucide-react';

interface FAQItem {
  question: string;
  answer: string;
}

const faqData: FAQItem[] = [
  {
    question: "What is AI patent drafting?",
    answer: "AI patent drafting uses advanced generative AI models trained on millions of granted patents to automatically convert invention disclosures into legally robust patent claims and specifications. It reduces drafting time from days to minutes while maintaining USPTO, EPO, and WIPO compliance. The AI understands technical language, legal terminology, and patent prosecution requirements to generate draft-ready applications."
  },
  {
    question: "How accurate is AI-generated patent claims?",
    answer: "Nexora Patent AI achieves over 99% accuracy in generating patent claims by leveraging models fine-tuned on millions of granted patents. The system understands nuanced legal terminology like 'comprising' vs 'consisting of' and performs real-time prior art analysis to ensure novelty. Every generated claim undergoes automated validation checks for proper antecedent basis, claim dependency, and format compliance."
  },
  {
    question: "Is AI patent drafting software secure for confidential inventions?",
    answer: "Yes. Nexora Patent uses enterprise-grade AES-256 encryption and is SOC2 Type II ready. Your invention data never trains public models, ensuring complete confidentiality of your intellectual property. We maintain strict data isolation, regular security audits, and comply with attorney-client privilege requirements."
  },
  {
    question: "Can AI replace patent attorneys?",
    answer: "AI patent drafting tools like Nexora are designed to augment patent attorneys, not replace them. The AI handles the time-consuming drafting work—converting disclosures to claims, formatting specifications, and checking prior art—allowing attorneys to focus on strategy, client relationships, and complex prosecution matters. Final review, legal judgment, and client representation remain with qualified professionals."
  },
  {
    question: "What patent office formats does Nexora support?",
    answer: "Nexora Patent automatically formats patent applications for USPTO (United States Patent and Trademark Office), EPO (European Patent Office), and WIPO (World Intellectual Property Organization) standards. The system handles jurisdiction-specific requirements including claim formatting, specification structure, abstract length limits, and drawing requirements for each office."
  },
  {
    question: "How fast can AI draft a patent application?",
    answer: "Nexora Patent can generate comprehensive patent claims and specifications in minutes, compared to the traditional process that takes days or weeks. The AI processes invention disclosures, diagrams, code snippets, and technical documents to produce draft-ready legal claims almost instantly. A typical provisional application draft can be generated in under 5 minutes."
  },
  {
    question: "What types of patents can Nexora draft?",
    answer: "Nexora Patent supports utility patents across all technology domains including software, mechanical, electrical, chemical, biotechnology, and pharmaceutical inventions. The AI is trained on diverse patent portfolios and can handle complex multi-claim structures, continuation applications, and international filings. Design patent support is on our roadmap."
  },
  {
    question: "How does Nexora handle prior art analysis?",
    answer: "Nexora integrates real-time prior art search across global patent databases including USPTO, EPO, WIPO, and major national offices. The AI identifies potentially conflicting references, suggests claim scope adjustments to avoid prior art, and generates novelty arguments. This helps attorneys anticipate examiner rejections and draft stronger initial applications."
  }
];

const FAQItemComponent: React.FC<{ item: FAQItem; index: number }> = ({ item, index }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="border-b border-charcoal/10 last:border-b-0"
    >
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full py-6 flex items-start justify-between gap-4 text-left group"
        aria-expanded={isOpen}
      >
        <h3 className="font-serif text-lg md:text-xl text-charcoal group-hover:text-charcoal/80 transition-colors pr-4">
          {item.question}
        </h3>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3 }}
          className="flex-shrink-0 w-8 h-8 rounded-full bg-charcoal/5 flex items-center justify-center group-hover:bg-charcoal/10 transition-colors"
        >
          <ChevronDown className="w-5 h-5 text-charcoal/60" />
        </motion.div>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <p className="pb-6 text-charcoal/70 leading-relaxed font-light text-base md:text-lg max-w-3xl">
              {item.answer}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export const FAQ: React.FC = () => {
  return (
    <section className="py-24 md:py-32 px-6 md:px-12 bg-cream relative overflow-hidden" id="faq">
      <div className="max-w-4xl mx-auto relative z-10">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="mb-16 text-center"
        >
          <div className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm border border-charcoal/10 rounded-full px-4 py-2 mb-6">
            <HelpCircle className="w-4 h-4 text-charcoal/60" />
            <span className="text-xs font-bold uppercase tracking-widest text-charcoal/60">
              Frequently Asked Questions
            </span>
          </div>

          <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl text-charcoal leading-tight mb-6">
            Everything Patent Attorneys<br />
            <span className="text-charcoal/40 italic font-light">Need to Know</span>
          </h2>

          <p className="text-lg text-charcoal/60 max-w-2xl mx-auto font-light">
            Get answers to common questions about AI-powered patent drafting, security, accuracy, and how Nexora transforms intellectual property workflows.
          </p>
        </motion.div>

        {/* FAQ List */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="bg-white/50 backdrop-blur-sm rounded-3xl border border-charcoal/5 p-6 md:p-10"
        >
          {faqData.map((item, index) => (
            <FAQItemComponent key={index} item={item} index={index} />
          ))}
        </motion.div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="mt-12 text-center"
        >
          <p className="text-charcoal/60 mb-4">Still have questions?</p>
          <a
            href="mailto:info@nexorapatent.com"
            className="inline-flex items-center gap-2 text-charcoal font-medium hover:text-charcoal/70 transition-colors border-b border-charcoal/30 pb-1"
          >
            Contact our team
          </a>
        </motion.div>
      </div>
    </section>
  );
};

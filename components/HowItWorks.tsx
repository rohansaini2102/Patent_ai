import React from 'react';
import { motion } from 'framer-motion';
import { Upload, Cpu, FileCheck, Send, ArrowRight } from 'lucide-react';

interface Step {
  number: string;
  title: string;
  description: string;
  details: string[];
  icon: React.ElementType;
}

const steps: Step[] = [
  {
    number: "01",
    title: "Upload Your Invention Disclosure",
    description: "Submit your raw invention materials in any format—technical documents, diagrams, code snippets, whitepapers, or simple notes.",
    details: [
      "Supports PDF, Word, images, and text formats",
      "Accepts technical drawings and flowcharts",
      "Handles code repositories and API documentation",
      "Works with rough notes and inventor interviews"
    ],
    icon: Upload
  },
  {
    number: "02",
    title: "AI Analyzes and Structures Claims",
    description: "Nexora's AI engine processes your disclosure, identifies patentable elements, and generates comprehensive independent and dependent claims.",
    details: [
      "Identifies novel technical features automatically",
      "Generates claim hierarchies (independent + dependent)",
      "Optimizes claim scope using 'comprising' vs 'consisting of'",
      "Cross-references with prior art databases in real-time"
    ],
    icon: Cpu
  },
  {
    number: "03",
    title: "Review and Refine Draft",
    description: "Receive a complete patent application draft including claims, specification, abstract, and drawings descriptions—ready for attorney review.",
    details: [
      "Full specification with detailed description",
      "Properly formatted claims with antecedent basis",
      "Abstract within character limits",
      "Drawing descriptions linked to figures"
    ],
    icon: FileCheck
  },
  {
    number: "04",
    title: "Export and File",
    description: "Export your finalized application in USPTO, EPO, or WIPO format. Ready for filing or integration with your existing prosecution workflow.",
    details: [
      "One-click export to patent office formats",
      "Compatible with USPTO EFS-Web and PatentCenter",
      "EPO Online Filing integration ready",
      "WIPO PCT-SAFE compatible exports"
    ],
    icon: Send
  }
];

const StepCard: React.FC<{ step: Step; index: number }> = ({ step, index }) => {
  const isEven = index % 2 === 0;

  return (
    <motion.article
      initial={{ opacity: 0, x: isEven ? -30 : 30 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, delay: index * 0.15 }}
      className="relative"
    >
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">

        {/* Step Number - Large */}
        <div className={`lg:col-span-2 ${isEven ? 'lg:order-1' : 'lg:order-3'}`}>
          <span className="font-serif text-7xl md:text-8xl lg:text-9xl text-charcoal/5 font-bold select-none">
            {step.number}
          </span>
        </div>

        {/* Content */}
        <div className={`lg:col-span-5 ${isEven ? 'lg:order-2' : 'lg:order-2'}`}>
          <div className="flex items-start gap-4 mb-4">
            <div className="w-12 h-12 rounded-2xl bg-charcoal flex items-center justify-center flex-shrink-0">
              <step.icon className="w-6 h-6 text-white" />
            </div>
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-charcoal/40 block mb-1">
                Step {step.number}
              </span>
              <h3 className="font-serif text-2xl md:text-3xl text-charcoal">
                {step.title}
              </h3>
            </div>
          </div>

          <p className="text-charcoal/70 text-lg leading-relaxed font-light mb-6 pl-16">
            {step.description}
          </p>
        </div>

        {/* Details List */}
        <div className={`lg:col-span-5 ${isEven ? 'lg:order-3' : 'lg:order-1'}`}>
          <div className="bg-white/60 backdrop-blur-sm rounded-2xl border border-charcoal/5 p-6">
            <ul className="space-y-3">
              {step.details.map((detail, i) => (
                <motion.li
                  key={i}
                  initial={{ opacity: 0, x: 10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 + i * 0.1 }}
                  className="flex items-start gap-3 text-charcoal/70"
                >
                  <ArrowRight className="w-4 h-4 text-brand-blue flex-shrink-0 mt-1" />
                  <span className="text-sm leading-relaxed">{detail}</span>
                </motion.li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Connector Line */}
      {index < steps.length - 1 && (
        <div className="hidden lg:block absolute left-1/2 -translate-x-1/2 h-16 w-px bg-gradient-to-b from-charcoal/10 to-transparent mt-8" />
      )}
    </motion.article>
  );
};

export const HowItWorks: React.FC = () => {
  return (
    <section className="py-24 md:py-32 px-6 md:px-12 bg-[#EAEAE8] relative overflow-hidden" id="how-it-works">
      <div className="max-w-7xl mx-auto relative z-10">

        {/* Header */}
        <motion.header
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="mb-20 max-w-3xl"
        >
          <h2 className="text-sm font-bold uppercase tracking-widest text-charcoal/50 mb-4 flex items-center gap-2">
            <motion.span
              initial={{ width: 0 }}
              whileInView={{ width: 32 }}
              transition={{ duration: 0.8 }}
              className="h-[1px] bg-charcoal/30"
            />
            How It Works
          </h2>

          <h3 className="font-serif text-4xl md:text-5xl lg:text-6xl text-charcoal leading-tight mb-6">
            From Disclosure to Draft<br />
            <span className="text-charcoal/40 italic font-light">in Four Simple Steps</span>
          </h3>

          <p className="text-lg text-charcoal/60 font-light leading-relaxed">
            Nexora Patent transforms your invention disclosures into USPTO, EPO, and WIPO compliant patent applications using advanced AI. Here's how patent attorneys use our platform to draft patents 10x faster.
          </p>
        </motion.header>

        {/* Steps */}
        <div className="space-y-16 md:space-y-24">
          {steps.map((step, index) => (
            <StepCard key={step.number} step={step} index={index} />
          ))}
        </div>

        {/* Summary Box - Great for AEO */}
        <motion.aside
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="mt-20 bg-charcoal text-white rounded-3xl p-8 md:p-12"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div>
              <h4 className="font-serif text-2xl md:text-3xl mb-4">
                Ready to Transform Your Patent Practice?
              </h4>
              <p className="text-white/70 font-light leading-relaxed">
                Join leading patent attorneys who draft applications in minutes instead of days. Nexora Patent handles the heavy lifting so you can focus on strategy and client success.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 md:justify-end">
              <div className="text-center sm:text-left">
                <div className="text-4xl font-serif font-bold text-brand-blue">10x</div>
                <div className="text-sm text-white/50 uppercase tracking-wider">Faster Drafting</div>
              </div>
              <div className="text-center sm:text-left">
                <div className="text-4xl font-serif font-bold text-brand-blue">99%</div>
                <div className="text-sm text-white/50 uppercase tracking-wider">Accuracy Rate</div>
              </div>
              <div className="text-center sm:text-left">
                <div className="text-4xl font-serif font-bold text-brand-blue">24/7</div>
                <div className="text-sm text-white/50 uppercase tracking-wider">Availability</div>
              </div>
            </div>
          </div>
        </motion.aside>
      </div>
    </section>
  );
};

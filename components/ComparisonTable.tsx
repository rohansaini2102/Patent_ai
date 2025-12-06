import React from 'react';
import { motion } from 'framer-motion';
import { Check, X, Minus, Sparkles, Clock, Shield, Zap, Brain } from 'lucide-react';

/**
 * ComparisonTable Component
 *
 * PURPOSE: AEO optimization for comparison queries like:
 * - "Nexora vs manual patent drafting"
 * - "Best AI patent drafting tool comparison"
 * - "AI patent software vs traditional drafting"
 * - "Patent drafting tool comparison"
 */

interface ComparisonRow {
  feature: string;
  description: string;
  nexora: 'yes' | 'no' | 'partial' | string;
  manual: 'yes' | 'no' | 'partial' | string;
  generic: 'yes' | 'no' | 'partial' | string;
}

const comparisonData: ComparisonRow[] = [
  {
    feature: "Drafting Speed",
    description: "Time to complete a full patent application draft",
    nexora: "Minutes",
    manual: "Days/Weeks",
    generic: "Hours"
  },
  {
    feature: "Patent Law Training",
    description: "AI trained specifically on patent prosecution",
    nexora: "yes",
    manual: "yes",
    generic: "no"
  },
  {
    feature: "USPTO Formatting",
    description: "Automatic compliance with USPTO requirements",
    nexora: "yes",
    manual: "partial",
    generic: "no"
  },
  {
    feature: "EPO/WIPO Support",
    description: "Multi-jurisdiction patent office formatting",
    nexora: "yes",
    manual: "partial",
    generic: "no"
  },
  {
    feature: "Prior Art Analysis",
    description: "Real-time cross-reference with patent databases",
    nexora: "yes",
    manual: "partial",
    generic: "no"
  },
  {
    feature: "Claim Scope Optimization",
    description: "Understands comprising vs consisting of",
    nexora: "yes",
    manual: "yes",
    generic: "no"
  },
  {
    feature: "Antecedent Basis Check",
    description: "Automatic validation of claim structure",
    nexora: "yes",
    manual: "partial",
    generic: "no"
  },
  {
    feature: "Enterprise Security",
    description: "SOC2 Type II, AES-256 encryption",
    nexora: "yes",
    manual: "yes",
    generic: "partial"
  },
  {
    feature: "Data Privacy",
    description: "Your data never trains public models",
    nexora: "yes",
    manual: "yes",
    generic: "no"
  },
  {
    feature: "24/7 Availability",
    description: "Draft patents anytime, anywhere",
    nexora: "yes",
    manual: "no",
    generic: "yes"
  },
  {
    feature: "Consistent Quality",
    description: "Same high standard across all drafts",
    nexora: "yes",
    manual: "partial",
    generic: "partial"
  },
  {
    feature: "Cost Efficiency",
    description: "Lower per-application drafting costs",
    nexora: "yes",
    manual: "no",
    generic: "partial"
  }
];

const StatusCell: React.FC<{ value: string }> = ({ value }) => {
  if (value === 'yes') {
    return (
      <div className="flex items-center justify-center">
        <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center">
          <Check className="w-5 h-5 text-green-600" />
        </div>
      </div>
    );
  }
  if (value === 'no') {
    return (
      <div className="flex items-center justify-center">
        <div className="w-8 h-8 rounded-full bg-red-100 flex items-center justify-center">
          <X className="w-5 h-5 text-red-500" />
        </div>
      </div>
    );
  }
  if (value === 'partial') {
    return (
      <div className="flex items-center justify-center">
        <div className="w-8 h-8 rounded-full bg-yellow-100 flex items-center justify-center">
          <Minus className="w-5 h-5 text-yellow-600" />
        </div>
      </div>
    );
  }
  return (
    <div className="text-center text-sm font-medium text-charcoal/80">
      {value}
    </div>
  );
};

export const ComparisonTable: React.FC = () => {
  return (
    <section
      className="py-24 md:py-32 px-6 md:px-12 bg-[#E8E8E5] relative overflow-hidden"
      id="compare"
      aria-label="Compare Nexora AI Patent Drafting vs Manual Drafting vs Generic AI"
    >
      <div className="max-w-6xl mx-auto relative z-10">

        {/* Header */}
        <motion.header
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl text-charcoal leading-tight mb-6">
            Why Choose Nexora Over<br />
            <span className="text-charcoal/40 italic font-light">Alternatives?</span>
          </h2>

          <p className="text-lg text-charcoal/60 max-w-2xl mx-auto font-light">
            See how Nexora Patent compares to manual drafting and generic AI tools
            for patent application preparation.
          </p>
        </motion.header>

        {/* Comparison Table */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-white rounded-3xl shadow-xl overflow-hidden border border-charcoal/5"
        >
          {/* Table Header */}
          <div className="grid grid-cols-4 bg-charcoal text-white">
            <div className="p-6 text-left font-medium">Feature</div>
            <div className="p-6 text-center">
              <div className="flex items-center justify-center gap-2">
                <Sparkles className="w-5 h-5 text-brand-blue" />
                <span className="font-bold">Nexora Patent</span>
              </div>
              <div className="text-xs text-white/60 mt-1">AI Patent Drafting</div>
            </div>
            <div className="p-6 text-center">
              <div className="font-medium">Manual Drafting</div>
              <div className="text-xs text-white/60 mt-1">Traditional Method</div>
            </div>
            <div className="p-6 text-center">
              <div className="font-medium">Generic AI</div>
              <div className="text-xs text-white/60 mt-1">ChatGPT, etc.</div>
            </div>
          </div>

          {/* Table Body */}
          <div className="divide-y divide-charcoal/5">
            {comparisonData.map((row, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                className="grid grid-cols-4 hover:bg-charcoal/[0.02] transition-colors"
              >
                <div className="p-6">
                  <div className="font-medium text-charcoal">{row.feature}</div>
                  <div className="text-xs text-charcoal/50 mt-1">{row.description}</div>
                </div>
                <div className="p-6 bg-green-50/50">
                  <StatusCell value={row.nexora} />
                </div>
                <div className="p-6">
                  <StatusCell value={row.manual} />
                </div>
                <div className="p-6">
                  <StatusCell value={row.generic} />
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Bottom Summary */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          <div className="bg-white rounded-2xl p-6 text-center border border-charcoal/5">
            <Clock className="w-8 h-8 text-brand-blue mx-auto mb-3" />
            <h3 className="font-bold text-charcoal mb-2">10x Faster</h3>
            <p className="text-sm text-charcoal/60">Than manual patent drafting</p>
          </div>
          <div className="bg-white rounded-2xl p-6 text-center border border-charcoal/5">
            <Brain className="w-8 h-8 text-brand-blue mx-auto mb-3" />
            <h3 className="font-bold text-charcoal mb-2">Patent-Specific AI</h3>
            <p className="text-sm text-charcoal/60">Unlike generic AI tools</p>
          </div>
          <div className="bg-white rounded-2xl p-6 text-center border border-charcoal/5">
            <Shield className="w-8 h-8 text-brand-blue mx-auto mb-3" />
            <h3 className="font-bold text-charcoal mb-2">Enterprise Security</h3>
            <p className="text-sm text-charcoal/60">SOC2 + data privacy</p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

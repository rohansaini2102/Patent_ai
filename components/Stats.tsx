import React from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, Clock, Shield, Award, Users, FileText } from 'lucide-react';

const stats = [
  {
    value: "10x",
    label: "Faster Patent Drafting",
    description: "Draft complete patent applications in minutes instead of days",
    icon: Clock
  },
  {
    value: "99.8%",
    label: "Claim Accuracy Rate",
    description: "AI-generated claims validated against patent office standards",
    icon: TrendingUp
  },
  {
    value: "50,000+",
    label: "Patents Analyzed",
    description: "Trained on granted patents from USPTO, EPO, and WIPO",
    icon: FileText
  },
  {
    value: "500+",
    label: "Patent Attorneys",
    description: "Legal professionals trust Nexora for patent drafting",
    icon: Users
  },
  {
    value: "SOC2",
    label: "Enterprise Security",
    description: "Type II certified with AES-256 encryption",
    icon: Shield
  },
  {
    value: "#1",
    label: "AI Patent Tool",
    description: "Leading AI-powered patent drafting platform",
    icon: Award
  }
];

export const Stats: React.FC = () => {
  return (
    <section
      className="py-20 px-6 md:px-12 bg-charcoal text-white relative overflow-hidden"
      id="stats"
      aria-label="Nexora Patent AI Statistics and Performance Metrics"
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, white 1px, transparent 0)`,
          backgroundSize: '40px 40px'
        }} />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">

        {/* Header - Keyword Rich */}
        <motion.header
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="font-serif text-4xl md:text-5xl mb-4">
            Why Patent Attorneys Choose<br />
            <span className="text-brand-blue">Nexora AI Patent Drafting</span>
          </h2>
          <p className="text-white/60 text-lg max-w-2xl mx-auto font-light">
            The most trusted AI patent drafting software for intellectual property professionals.
            Transform how you draft USPTO, EPO, and WIPO patent applications.
          </p>
        </motion.header>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
          {stats.map((stat, index) => (
            <motion.article
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="text-center p-6 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors"
            >
              <div className="w-10 h-10 mx-auto mb-4 rounded-xl bg-brand-blue/20 flex items-center justify-center">
                <stat.icon className="w-5 h-5 text-brand-blue" />
              </div>
              <div className="text-3xl md:text-4xl font-bold text-white mb-1">
                {stat.value}
              </div>
              <div className="text-sm font-medium text-brand-blue mb-2">
                {stat.label}
              </div>
              <p className="text-xs text-white/50 leading-relaxed">
                {stat.description}
              </p>
            </motion.article>
          ))}
        </div>

        {/* Trust Badges - For AEO */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="mt-16 pt-12 border-t border-white/10"
        >
          <p className="text-center text-xs uppercase tracking-widest text-white/30 mb-8">
            Trusted by Patent Professionals at Leading Organizations
          </p>
          <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16 opacity-40">
            {['Fortune 500 Companies', 'Top Law Firms', 'Tech Startups', 'Universities', 'Research Labs'].map((org, i) => (
              <span key={i} className="text-sm font-medium text-white/80">{org}</span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

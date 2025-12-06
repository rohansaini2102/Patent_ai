import React from 'react';
import { motion } from 'framer-motion';
import { Quote, Star } from 'lucide-react';

interface Testimonial {
  quote: string;
  author: string;
  role: string;
  company: string;
  rating: number;
}

const testimonials: Testimonial[] = [
  {
    quote: "Nexora Patent has completely transformed how our firm handles patent drafting. What used to take us 2-3 days now takes 30 minutes. The AI-generated claims are incredibly accurate and require minimal revision.",
    author: "Sarah Chen",
    role: "Senior Patent Attorney",
    company: "Tech IP Law Group",
    rating: 5
  },
  {
    quote: "As a solo practitioner, I was skeptical about AI patent drafting tools. Nexora proved me wrong. The quality rivals experienced patent agents, and the USPTO formatting is perfect every time.",
    author: "Michael Roberts",
    role: "Patent Attorney",
    company: "Roberts IP Consulting",
    rating: 5
  },
  {
    quote: "We've processed over 200 provisional applications through Nexora. The consistency and speed are unmatched. Our clients love the faster turnaround, and our margins have improved significantly.",
    author: "Jennifer Walsh",
    role: "Managing Partner",
    company: "Innovation Legal Partners",
    rating: 5
  },
  {
    quote: "The prior art analysis feature alone is worth the investment. Nexora catches potential conflicts that would have taken our team hours to identify manually. It's become indispensable for our prosecution work.",
    author: "David Kim",
    role: "IP Director",
    company: "Fortune 500 Tech Company",
    rating: 5
  },
  {
    quote: "Security was our biggest concern with AI tools. Nexora's SOC2 certification and the fact that our data never trains public models gave us confidence to fully adopt the platform.",
    author: "Amanda Foster",
    role: "Chief Legal Officer",
    company: "Biotech Innovations Inc.",
    rating: 5
  },
  {
    quote: "I've tried other AI patent tools. Nothing comes close to Nexora's understanding of claim scope and dependency structure. It truly understands patent law, not just text generation.",
    author: "Robert Martinez",
    role: "Patent Prosecution Lead",
    company: "Global IP Firm",
    rating: 5
  }
];

const TestimonialCard: React.FC<{ testimonial: Testimonial; index: number }> = ({ testimonial, index }) => {
  return (
    <motion.article
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
      className="bg-white rounded-3xl p-8 shadow-sm border border-charcoal/5 hover:shadow-lg transition-shadow"
      itemScope
      itemType="https://schema.org/Review"
    >
      {/* Rating Stars */}
      <div className="flex items-center gap-1 mb-4" itemProp="reviewRating" itemScope itemType="https://schema.org/Rating">
        <meta itemProp="ratingValue" content={testimonial.rating.toString()} />
        <meta itemProp="bestRating" content="5" />
        {[...Array(testimonial.rating)].map((_, i) => (
          <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
        ))}
      </div>

      {/* Quote */}
      <div className="relative mb-6">
        <Quote className="absolute -top-2 -left-2 w-8 h-8 text-brand-blue/20" />
        <p className="text-charcoal/80 leading-relaxed pl-6" itemProp="reviewBody">
          "{testimonial.quote}"
        </p>
      </div>

      {/* Author */}
      <div className="flex items-center gap-4" itemProp="author" itemScope itemType="https://schema.org/Person">
        <div className="w-12 h-12 rounded-full bg-charcoal/10 flex items-center justify-center">
          <span className="text-lg font-bold text-charcoal">
            {testimonial.author.split(' ').map(n => n[0]).join('')}
          </span>
        </div>
        <div>
          <div className="font-medium text-charcoal" itemProp="name">{testimonial.author}</div>
          <div className="text-sm text-charcoal/60">
            <span itemProp="jobTitle">{testimonial.role}</span> at {testimonial.company}
          </div>
        </div>
      </div>

      {/* Hidden schema data */}
      <meta itemProp="itemReviewed" content="Nexora Patent AI" />
      <meta itemProp="datePublished" content="2024-01-01" />
    </motion.article>
  );
};

export const Testimonials: React.FC = () => {
  return (
    <section
      className="py-24 md:py-32 px-6 md:px-12 bg-cream relative overflow-hidden"
      id="testimonials"
      aria-label="Patent Attorney Reviews of Nexora AI Patent Drafting Tool"
    >
      <div className="max-w-7xl mx-auto relative z-10">

        {/* Header */}
        <motion.header
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 bg-white rounded-full px-4 py-2 mb-6 border border-charcoal/5">
            <div className="flex items-center gap-0.5">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-3 h-3 fill-yellow-400 text-yellow-400" />
              ))}
            </div>
            <span className="text-xs font-bold uppercase tracking-widest text-charcoal/60">
              5.0 Average Rating
            </span>
          </div>

          <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl text-charcoal leading-tight mb-6">
            Trusted by Patent Attorneys<br />
            <span className="text-charcoal/40 italic font-light">Worldwide</span>
          </h2>

          <p className="text-lg text-charcoal/60 max-w-2xl mx-auto font-light">
            See why 500+ patent attorneys, IP professionals, and legal teams choose Nexora Patent
            for AI-powered patent drafting.
          </p>
        </motion.header>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <TestimonialCard key={index} testimonial={testimonial} index={index} />
          ))}
        </div>

        {/* Summary Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8 text-center"
        >
          {[
            { value: "500+", label: "Patent Attorneys" },
            { value: "10,000+", label: "Patents Drafted" },
            { value: "5.0", label: "Average Rating" },
            { value: "99%", label: "Satisfaction Rate" }
          ].map((stat, i) => (
            <div key={i}>
              <div className="text-3xl font-bold text-charcoal">{stat.value}</div>
              <div className="text-sm text-charcoal/60">{stat.label}</div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

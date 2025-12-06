import React, { useEffect, useState } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { Features } from './components/Features';
import { Comparison } from './components/Comparison';
import { Footer } from './components/Footer';
import { Manifesto } from './components/Manifesto';
import { Contact } from './components/Contact';
import { Privacy } from './components/Privacy';
import { Terms } from './components/Terms';
import { FAQ } from './components/FAQ';
import { HowItWorks } from './components/HowItWorks';
import { Stats } from './components/Stats';
import { DefinitiveGuide } from './components/DefinitiveGuide';
import { Testimonials } from './components/Testimonials';
import { ComparisonTable } from './components/ComparisonTable';
import { AnimatePresence, motion } from 'framer-motion';

export type Page = 'home' | 'contact' | 'privacy' | 'terms';

export default function App() {
  const [currentPage, setCurrentPage] = useState<Page>('home');

  // Smooth scroll behavior fix for some browsers & scroll to top on nav
  useEffect(() => {
    document.documentElement.style.scrollBehavior = 'smooth';
    window.scrollTo(0, 0);
    return () => {
      document.documentElement.style.scrollBehavior = 'auto';
    };
  }, [currentPage]);

  const renderPage = () => {
    switch(currentPage) {
      case 'contact':
        return <Contact key="contact" />;
      case 'privacy':
        return <Privacy key="privacy" />;
      case 'terms':
        return <Terms key="terms" />;
      default:
        return (
          <motion.div
            key="home"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            {/* Hero - Primary value proposition */}
            <Hero onNavigate={setCurrentPage} />
            {/* Stats - Social proof and metrics */}
            <Stats />
            {/* Manifesto - Brand story */}
            <Manifesto />
            {/* Comparison - Before/After demo */}
            <Comparison />
            {/* How It Works - Step by step for AEO */}
            <HowItWorks />
            {/* Features - Core capabilities */}
            <Features />
            {/* Comparison Table - Nexora vs alternatives */}
            <ComparisonTable />
            {/* Definitive Guide - AEO content hub */}
            <DefinitiveGuide />
            {/* Testimonials - Social proof */}
            <Testimonials />
            {/* FAQ - AEO optimization */}
            <FAQ />
          </motion.div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-cream text-charcoal selection:bg-charcoal selection:text-cream overflow-hidden font-sans">
      <Navbar currentPage={currentPage} onNavigate={setCurrentPage} />
      <main>
        <AnimatePresence mode="wait">
          {renderPage()}
        </AnimatePresence>
      </main>
      <Footer onNavigate={setCurrentPage} />
    </div>
  );
}
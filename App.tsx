import React, { useEffect, useState } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { Features } from './components/Features';
import { Comparison } from './components/Comparison';
import { Footer } from './components/Footer';
import { Manifesto } from './components/Manifesto';
import { Contact } from './components/Contact';
import { Privacy } from './components/Privacy';

export type Page = 'home' | 'contact' | 'privacy';

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
        return <Contact />;
      case 'privacy':
        return <Privacy />;
      default:
        return (
          <>
            <Hero onNavigate={setCurrentPage} />
            <Manifesto />
            <Comparison />
            <Features />
          </>
        );
    }
  };

  return (
    <div className="min-h-screen bg-cream text-charcoal selection:bg-charcoal selection:text-cream overflow-hidden font-sans">
      <Navbar currentPage={currentPage} onNavigate={setCurrentPage} />
      <main>
        {renderPage()}
      </main>
      <Footer onNavigate={setCurrentPage} />
    </div>
  );
}
import React, { useState } from 'react';
import { motion, useScroll, useMotionValueEvent } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { Page } from '../App';

interface NavbarProps {
  onNavigate: (page: Page) => void;
  currentPage: Page;
}

export const Navbar: React.FC<NavbarProps> = ({ onNavigate, currentPage }) => {
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious() ?? 0;
    if (latest > previous && latest > 150) {
      setHidden(true);
    } else {
      setHidden(false);
    }
    if (latest > 50) {
      setScrolled(true);
    } else {
      setScrolled(false);
    }
  });

  const handleNavClick = (item: string) => {
    if (item === 'Pricing') {
      onNavigate('contact');
    } else if (item === 'About') {
      onNavigate('home');
      setTimeout(() => {
        const el = document.getElementById('manifesto');
        el?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } else if (item === 'Expertise' || item === 'Solution') {
       onNavigate('home');
       setTimeout(() => {
        const el = document.getElementById('solution');
        el?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    }
  };

  return (
    <motion.header
      variants={{
        visible: { y: 0 },
        hidden: { y: "-100%" },
      }}
      animate={hidden ? "hidden" : "visible"}
      transition={{ duration: 0.35, ease: "easeInOut" }}
      className={`fixed top-0 left-0 right-0 z-50 flex justify-between items-center px-6 py-6 md:px-12 transition-all duration-300 text-charcoal ${
        scrolled ? 'bg-white/90 backdrop-blur-md shadow-sm py-4' : ''
      }`}
    >
      <div 
        className="flex items-center gap-2 cursor-pointer"
        onClick={() => onNavigate('home')}
      >
        <span className="font-serif text-2xl font-bold tracking-tighter">Nexora</span>
        <span className="text-[10px] uppercase tracking-widest border border-charcoal/30 rounded-full px-2 py-0.5 hidden sm:block transition-colors">Patent AI</span>
      </div>

      <nav className="hidden md:flex gap-8 text-sm font-medium tracking-wide">
        {['Expertise', 'Solution', 'Pricing', 'About'].map((item) => (
          <button 
            key={item} 
            onClick={() => handleNavClick(item)}
            className="hover:opacity-60 transition-opacity cursor-pointer uppercase text-xs tracking-widest"
          >
            {item === 'Pricing' ? "Let's Connect" : item}
          </button>
        ))}
      </nav>

      <button 
        onClick={() => onNavigate('contact')}
        className="group flex items-center gap-2 text-sm font-medium uppercase tracking-wider hover:opacity-70 transition-opacity text-charcoal"
      >
        <span>Get Access</span>
        <ArrowUpRight className="w-4 h-4 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-transform" />
      </button>
    </motion.header>
  );
};
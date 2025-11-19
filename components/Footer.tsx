import React from 'react';
import { Page } from '../App';

interface FooterProps {
  onNavigate: (page: Page) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  return (
    <footer className="bg-charcoal text-cream px-6 md:px-12 pt-24 pb-8 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 mb-32">
          <div className="md:col-span-4">
            <h3 className="font-serif text-3xl mb-8">Subscribe to our newsletter</h3>
            <div className="relative border-b border-cream/30 pb-2">
              <input 
                type="email" 
                placeholder="Email address" 
                className="bg-transparent w-full outline-none text-cream placeholder:text-cream/30"
              />
              <button className="absolute right-0 top-0 hover:text-gray-300 transition-colors">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="7" y1="17" x2="17" y2="7"></line>
                  <polyline points="7 7 17 7 17 17"></polyline>
                </svg>
              </button>
            </div>
          </div>
          
          <div className="md:col-start-7 md:col-span-3">
             <div className="text-xs uppercase tracking-widest text-cream/50 mb-4">Contact</div>
             <a href="mailto:info@nexorapatent.com" className="block text-lg hover:opacity-70 transition-opacity">info@nexorapatent.com</a>
             <button onClick={() => onNavigate('contact')} className="mt-2 text-left hover:underline">Let's Connect with Us</button>
             
             <div className="mt-12">
                <p className="text-cream/70">Delaware, USA</p>
             </div>
          </div>

          <div className="md:col-span-3">
            <div className="text-xs uppercase tracking-widest text-cream/50 mb-4">Menu</div>
            <ul className="space-y-2">
              <li><button onClick={() => onNavigate('home')} className="hover:opacity-70 transition-opacity">Work</button></li>
              <li><button onClick={() => onNavigate('home')} className="hover:opacity-70 transition-opacity">Expertise</button></li>
              <li><button onClick={() => onNavigate('contact')} className="hover:opacity-70 transition-opacity">Pricing</button></li>
              <li><button onClick={() => onNavigate('contact')} className="hover:opacity-70 transition-opacity">Login</button></li>
            </ul>
            
            <div className="mt-12 flex gap-4">
               <a href="#" className="text-sm hover:underline">Instagram</a>
               <a href="#" className="text-sm hover:underline">LinkedIn</a>
               <a href="#" className="text-sm hover:underline">Twitter</a>
            </div>
          </div>
        </div>

        <div className="border-t border-cream/10 pt-8 flex flex-col md:flex-row justify-between items-end md:items-center gap-8">
           <div className="flex-1 w-full text-center md:text-left">
              <h1 className="font-serif text-[15vw] md:text-[18vw] leading-[0.8] text-cream opacity-90 tracking-tighter select-none">
                Let's draft
              </h1>
           </div>
        </div>
        
        <div className="flex justify-between text-xs text-cream/40 mt-8 uppercase tracking-wider">
          <span>© 2024 Nexora Patent AI</span>
          <button onClick={() => onNavigate('privacy')} className="hover:text-cream transition-colors">Privacy Policy</button>
        </div>
      </div>
    </footer>
  );
};
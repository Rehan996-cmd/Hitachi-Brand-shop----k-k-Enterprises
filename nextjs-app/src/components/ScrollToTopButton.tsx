'use client';

import React, { useEffect, useState } from 'react';
import { ArrowUp } from 'lucide-react';
import { sound } from '@/lib/sound';

export default function ScrollToTopButton() {
  const [isVisible, setIsVisible] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (docHeight > 0) {
        setScrollProgress(Math.min(100, Math.round((scrollY / docHeight) * 100)));
      }
      setIsVisible(scrollY > 350);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    sound.playClick();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (!isVisible) return null;

  return (
    <button
      onClick={scrollToTop}
      className="fixed bottom-24 lg:bottom-8 right-4 lg:right-8 z-30 w-11 h-11 rounded-full bg-[#0d1522]/90 border border-[#d4af37]/50 text-[#d4af37] hover:bg-[#d4af37] hover:text-[#080c14] transition-all duration-300 shadow-[0_8px_25px_rgba(0,0,0,0.8)] backdrop-blur-md flex items-center justify-center cursor-pointer hover:scale-110 active:scale-95 group"
      title={`Back to Top (${scrollProgress}%)`}
      aria-label="Scroll to top of page"
    >
      <ArrowUp size={18} className="group-hover:-translate-y-0.5 transition-transform stroke-[2.5]" />
    </button>
  );
}

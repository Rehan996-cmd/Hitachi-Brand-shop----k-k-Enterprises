'use client';

import React, { useEffect, useState } from 'react';
import { useCart } from '@/context/CartContext';
import { Home, UtensilsCrossed, BellRing, CalendarDays, ShoppingBag } from 'lucide-react';

export default function MobileBottomNav() {
  const { itemCount, grandTotal, setIsCartOpen } = useCart();
  const [activeHash, setActiveHash] = useState('#home');

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['#home', '#menu', '#inroom', '#reservation'];
      const scrollPos = window.scrollY + 200;

      for (const section of sections) {
        const el = document.querySelector(section);
        if (el) {
          const top = (el as HTMLElement).offsetTop;
          const height = (el as HTMLElement).offsetHeight;
          if (scrollPos >= top && scrollPos < top + height) {
            setActiveHash(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { href: '#home', label: 'Home', icon: Home },
    { href: '#menu', label: 'Royal Menu', icon: UtensilsCrossed },
    { href: '#inroom', label: 'In-Room', icon: BellRing },
    { href: '#reservation', label: 'Reserve', icon: CalendarDays },
  ];

  return (
    <nav
      className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-[#080c14]/95 backdrop-blur-xl border-t border-[#d4af37]/30 shadow-[0_-8px_32px_rgba(0,0,0,0.8)] px-2 py-1.5 pb-[max(0.4rem,env(safe-area-inset-bottom))]"
      aria-label="Mobile Navigation Bar"
    >
      <div className="max-w-md mx-auto grid grid-cols-5 items-center">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeHash === item.href;

          return (
            <a
              key={item.href}
              href={item.href}
              onClick={() => setActiveHash(item.href)}
              className={`flex flex-col items-center justify-center py-1 px-1 rounded-xl transition-all duration-200 cursor-pointer ${
                isActive ? 'text-[#d4af37]' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <div className={`relative p-1 rounded-xl transition-transform duration-200 ${isActive ? 'scale-110' : ''}`}>
                <Icon size={19} className={isActive ? 'text-[#d4af37]' : 'text-slate-400'} />
                {isActive && (
                  <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-[#d4af37] shadow-[0_0_8px_#d4af37]" />
                )}
              </div>
              <span className={`text-[10px] font-bold mt-0.5 tracking-tight ${isActive ? 'text-[#d4af37]' : 'text-slate-400'}`}>
                {item.label}
              </span>
            </a>
          );
        })}

        {/* My Plate / Cart Button */}
        <button
          onClick={() => setIsCartOpen(true)}
          className="flex flex-col items-center justify-center py-1 px-1 rounded-xl transition-all duration-200 cursor-pointer text-slate-200 hover:text-white group"
          aria-label="Open Cart"
        >
          <div className="relative p-0.5">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-[#d4af37] via-[#b38e44] to-[#881337] p-[1px] shadow-sm group-hover:scale-105 transition-transform">
              <div className="w-full h-full bg-[#0c1220] rounded-[11px] flex items-center justify-center">
                <ShoppingBag size={15} className="text-[#d4af37]" />
              </div>
            </div>
            {itemCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-gradient-to-r from-[#d4af37] to-[#dfc17b] text-[#080c14] font-black text-[10px] min-w-[17px] h-[17px] rounded-full flex items-center justify-center shadow-md px-1 animate-pulse">
                {itemCount}
              </span>
            )}
          </div>
          <span className="text-[10px] font-bold mt-0.5 tracking-tight text-[#d4af37]">
            {itemCount > 0 ? `₹${grandTotal}` : 'Plate'}
          </span>
        </button>
      </div>
    </nav>
  );
}

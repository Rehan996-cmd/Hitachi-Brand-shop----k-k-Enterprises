'use client';

import React from 'react';
import MenuSection from '@/components/MenuSection';
import { Crown, Sparkles, UtensilsCrossed, Phone } from 'lucide-react';

export default function MenuPage() {
  return (
    <div className="min-h-screen bg-[#080c14] text-slate-100 pt-24 sm:pt-28 pb-20">
      {/* Royal Header Banner */}
      <section className="relative px-4 sm:px-6 lg:px-8 py-12 sm:py-16 text-center max-w-4xl mx-auto border-b border-[#d4af37]/20">
        <div className="inline-flex items-center gap-2 text-xs font-bold tracking-[0.25em] text-[#d4af37] bg-[#121c2e] border border-[#d4af37]/30 px-4 py-2 rounded-full uppercase mb-4 shadow-sm">
          <Crown size={14} className="text-[#d4af37]" />
          <span>100% PURE VEGETARIAN ROYAL DINING</span>
        </div>
        
        <h1 className="text-3xl sm:text-5xl lg:text-6xl font-serif font-black text-white mb-4 tracking-tight">
          Hotel Shivansh Royal Menu
        </h1>
        
        <p className="text-slate-300 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
          From our signature Maharaja Thali and handi curries to slow-cooked dum biryani and fresh tandoori rotis. Available for Dine-In, In-Room Dining, and Doorstep Delivery in Sikar.
        </p>

        <div className="flex items-center justify-center gap-4 mt-6 text-xs text-slate-400">
          <span className="flex items-center gap-1.5 text-emerald-400 font-semibold">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            Kitchen Open · Hot Fresh Preparation
          </span>
          <span>·</span>
          <a href="tel:+919460624455" className="hover:text-[#d4af37] transition font-bold flex items-center gap-1 text-white">
            <Phone size={12} className="text-[#d4af37]" />
            Order on Call: +91 94606 24455
          </a>
        </div>
      </section>

      {/* Interactive Menu Section */}
      <MenuSection />
    </div>
  );
}

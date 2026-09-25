'use client';

import React from 'react';
import { Leaf, CookingPot, Droplets, BellRing, Sparkles } from 'lucide-react';

export default function WhyShivanshSection() {
  const points = [
    {
      icon: Leaf,
      title: '100% Pure Vegetarian',
      desc: 'Strictly separate pure veg kitchen using fresh daily sourced farm vegetables and premium cottage cheese.',
      badge: 'Certified Veg',
      color: 'emerald',
    },
    {
      icon: CookingPot,
      title: 'Pure Desi Ghee & Spices',
      desc: 'Slow-simmered handi gravies and aromatic biryanis prepared with authentic Rajasthani spices and pure desi ghee.',
      badge: 'Heritage Taste',
      color: 'amber',
    },
    {
      icon: Droplets,
      title: '100% RO Purified Kitchen',
      desc: 'All food preparation, vegetable washing, and drinking water uses multi-stage commercial RO purification systems.',
      badge: 'Hygiene Assured',
      color: 'blue',
    },
    {
      icon: BellRing,
      title: '24x7 Priority Room Service',
      desc: 'Exclusive high-speed kitchen dispatch for Hotel Shivansh staying guests. Zero delivery fee directly to your room.',
      badge: 'Guest Priority',
      color: 'rose',
    },
  ];

  const colorMap: Record<string, { icon: string; bg: string; badge: string }> = {
    emerald: { icon: 'text-emerald-400', bg: 'bg-emerald-950/60 border-emerald-500/40', badge: 'text-emerald-300 bg-emerald-950/80 border-emerald-500/40' },
    amber: { icon: 'text-[#d4af37]', bg: 'bg-amber-950/60 border-amber-500/40', badge: 'text-amber-200 bg-amber-950/80 border-amber-500/40' },
    blue: { icon: 'text-sky-400', bg: 'bg-sky-950/60 border-sky-500/40', badge: 'text-sky-300 bg-sky-950/80 border-sky-500/40' },
    rose: { icon: 'text-rose-400', bg: 'bg-rose-950/60 border-rose-500/40', badge: 'text-rose-300 bg-rose-950/80 border-rose-500/40' },
  };

  return (
    <section className="py-16 sm:py-24 bg-[#0d1522] border-t border-b border-[#d4af37]/20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-16">
          <span className="inline-flex items-center gap-1.5 text-xs font-bold tracking-[0.2em] text-[#d4af37] uppercase mb-2">
            <Sparkles size={13} /> OUR 5-STAR QUALITY PROMISE
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-3 leading-tight">
            The Shivansh Hospitality Standard
          </h2>
          <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
            We take immense pride in crafting hearty, hygienic, and authentic heritage flavors for every traveler and family visiting Sikar.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {points.map((pt, i) => {
            const colors = colorMap[pt.color];
            const Icon = pt.icon;
            return (
              <div
                key={i}
                className="bg-[#121c2e] border border-[#d4af37]/30 hover:border-[#d4af37] rounded-3xl p-6 sm:p-7 transition-all duration-300 hover:-translate-y-1 shadow-lg hover:shadow-2xl flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <div className={`w-12 h-12 rounded-2xl ${colors.bg} border flex items-center justify-center shadow-md`}>
                      <Icon size={22} className={colors.icon} />
                    </div>
                    <span className={`text-[10px] font-bold ${colors.badge} border px-3 py-1 rounded-full`}>
                      {pt.badge}
                    </span>
                  </div>
                  <h3 className="font-serif font-bold text-lg text-white mb-2">{pt.title}</h3>
                  <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">{pt.desc}</p>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}

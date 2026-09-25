'use client';

import React, { useState } from 'react';
import { useModal } from '@/context/ModalContext';
import { DISH_MAP } from '@/lib/products';
import { sound } from '@/lib/sound';
import { Star, Clock, Crown, Plus, Sparkles, Camera } from 'lucide-react';

export default function SpecialsSection() {
  const { openModal } = useModal();
  const [activeTab, setActiveTab] = useState<'all' | 'thalis' | 'curries' | 'biryani'>('all');

  const specialIds = ['thali-1', 'thali-2', 'main-1', 'starter-1', 'biryani-1', 'beverage-3'];
  const allSpecials = specialIds.map(id => DISH_MAP[id]).filter(Boolean);

  const filteredSpecials = allSpecials.filter(dish => {
    if (activeTab === 'thalis') return dish.category === 'thali';
    if (activeTab === 'curries') return dish.category === 'mains' || dish.category === 'starters';
    if (activeTab === 'biryani') return dish.category === 'biryani' || dish.category === 'beverages';
    return true;
  });

  return (
    <section className="py-16 sm:py-24 bg-[#0d1522] border-y border-[#d4af37]/20 relative overflow-hidden" id="thali">
      {/* Decorative accents */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-amber-500/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-rose-600/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-14">
          <span className="inline-flex items-center gap-2 text-xs font-bold tracking-widest text-amber-200 uppercase mb-3 bg-[#be123c]/20 px-3.5 py-1.5 rounded-full border border-[#be123c]/40">
            <Crown size={14} className="text-[#d4af37]" />
            ROYAL SIGNATURE MASTERPIECES
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white mb-3 leading-tight">
            Chef&apos;s Handcrafted Delicacies
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-transparent via-[#d4af37] to-transparent mx-auto mb-4" />
          <p className="text-slate-300 text-sm sm:text-base leading-relaxed mb-6">
            Slow-simmered with 100% pure desi ghee, freshly stone-ground spices, and generational Rajasthani culinary traditions.
          </p>

          {/* Quick Filter Tabs */}
          <div className="flex flex-wrap justify-center gap-2">
            {[
              { key: 'all', label: 'All Royal Specialties' },
              { key: 'thalis', label: 'Grand Thalis' },
              { key: 'curries', label: 'Handi Curries & Starters' },
              { key: 'biryani', label: 'Biryani & Shakes' },
            ].map(tab => (
              <button
                key={tab.key}
                onClick={() => {
                  sound.playClick();
                  setActiveTab(tab.key as typeof activeTab);
                }}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer border ${
                  activeTab === tab.key
                    ? 'gold-btn text-[#080c14] border-amber-300 shadow-md scale-105'
                    : 'bg-[#121c2e] text-slate-300 border-[#d4af37]/20 hover:border-[#d4af37] hover:text-white'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {filteredSpecials.map(dish => (
            <div
              key={dish.id}
              className="bg-[#121c2e] border border-[#d4af37]/30 rounded-3xl overflow-hidden hover:border-[#d4af37] transition-all duration-300 hover:-translate-y-1 shadow-lg hover:shadow-2xl flex flex-col group"
            >
              {/* Photo Showcase with Lightbox Zoom */}
              <div
                onClick={() => openModal('gallery', { photoIndex: 2 })}
                className="relative h-56 sm:h-60 w-full overflow-hidden bg-slate-900 cursor-pointer"
                title="Click to view photo in lightbox"
              >
                <img
                  src={dish.image || '/assets/restaurant_thali.jpg'}
                  alt={dish.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#121c2e] via-transparent to-transparent opacity-80" />
                
                <span className="absolute top-3.5 left-3.5 bg-gradient-to-r from-[#d4af37] to-[#aa771c] text-[#080c14] text-[10px] font-black px-3 py-1 rounded-full shadow-md flex items-center gap-1">
                  <Sparkles size={10} className="text-[#080c14]" />
                  {dish.tags?.[0] || 'SIGNATURE'}
                </span>

                <span className="absolute top-3.5 right-3.5 bg-[#080c14]/70 text-slate-300 text-[10px] font-bold px-2 py-1 rounded-full border border-white/20 flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                  <Camera size={11} />
                  <span>Zoom</span>
                </span>
              </div>

              <div className="p-6 sm:p-7 flex flex-col flex-1">
                <div className="flex items-center gap-2.5 mb-3 text-xs flex-wrap">
                  <span className="w-4 h-4 border border-emerald-500 rounded flex items-center justify-center shrink-0 bg-emerald-950/60" title="100% Pure Veg">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                  </span>
                  <span className="text-amber-400 font-bold flex items-center gap-1 bg-[#18253d] px-2 py-0.5 rounded-full border border-amber-500/30">
                    <Star size={11} fill="currentColor" /> {dish.rating}
                  </span>
                  <span className="text-slate-400 flex items-center gap-1">
                    <Clock size={11} /> {dish.prepTime}
                  </span>
                </div>

                <h3 className="font-serif font-bold text-lg sm:text-xl text-white mb-2 leading-snug line-clamp-1 group-hover:text-[#d4af37] transition">
                  {dish.name}
                </h3>

                <p className="text-slate-300 text-xs leading-relaxed mb-5 line-clamp-2 flex-1">
                  {dish.description}
                </p>

                {/* Price & Add to Plate */}
                <div className="flex items-center justify-between pt-4 border-t border-[#d4af37]/20 mt-auto gap-3">
                  <div className="flex flex-col">
                    <div className="flex items-baseline gap-1.5">
                      <span className="font-serif text-xl sm:text-2xl font-black text-[#d4af37]">₹{dish.price}</span>
                      {dish.originalPrice && (
                        <span className="text-xs text-slate-500 line-through">₹{dish.originalPrice}</span>
                      )}
                    </div>
                    <span className="text-[10px] text-emerald-400 font-bold bg-emerald-950/60 border border-emerald-500/30 px-1.5 py-0.5 rounded w-fit mt-0.5">
                      Pure Desi Ghee
                    </span>
                  </div>

                  <button
                    onClick={() => openModal('dish', { dishId: dish.id })}
                    className="gold-btn px-4 py-2.5 rounded-2xl flex items-center gap-1.5 text-xs font-black cursor-pointer shadow-md hover:scale-[1.02] active:scale-[0.98]"
                    aria-label={`Add ${dish.name} to plate`}
                  >
                    <span className="w-4 h-4 rounded-full bg-[#080c14]/20 flex items-center justify-center shrink-0">
                      <Plus size={11} className="stroke-[3] text-[#080c14]" />
                    </span>
                    <span>Add</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

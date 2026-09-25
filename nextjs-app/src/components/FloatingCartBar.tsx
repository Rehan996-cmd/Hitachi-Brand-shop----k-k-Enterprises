'use client';

import React from 'react';
import { useCart } from '@/context/CartContext';
import { UtensilsCrossed, ChevronRight } from 'lucide-react';

export default function FloatingCartBar() {
  const { itemCount, grandTotal, setIsCartOpen, diningMode, selectedRoom } = useCart();

  if (itemCount === 0) return null;

  return (
    <div className="fixed bottom-[calc(70px+env(safe-area-inset-bottom,0px))] lg:bottom-6 left-3 right-3 sm:left-auto sm:right-8 sm:w-[420px] z-40 animate-slideUp">
      <div
        onClick={() => setIsCartOpen(true)}
        className="cursor-pointer bg-gradient-to-r from-[#0c1220] via-[#161f36] to-[#0c1220] text-white p-3.5 sm:p-4 rounded-2xl sm:rounded-3xl shadow-[0_12px_36px_rgba(0,0,0,0.85)] border-2 border-[#d4af37]/60 flex items-center justify-between hover:scale-[1.02] active:scale-[0.98] transition-all duration-300"
      >
        <div className="flex items-center gap-3.5">
          <div className="relative w-11 h-11 rounded-2xl bg-[#080c14] flex items-center justify-center border border-[#d4af37]/40 shrink-0">
            <UtensilsCrossed className="w-5 h-5 text-[#d4af37]" />
            <span className="absolute -top-1.5 -right-1.5 bg-gradient-to-r from-[#d4af37] to-[#dfc17b] text-[#080c14] font-black text-[11px] w-5 h-5 rounded-full flex items-center justify-center shadow-md">
              {itemCount}
            </span>
          </div>
          <div>
            <div className="flex items-center gap-2 mb-0.5">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-300">
                {itemCount} {itemCount === 1 ? 'Dish' : 'Dishes'} in Plate
              </span>
              {diningMode === 'room' && (
                <span className="text-[10px] bg-[#d4af37]/20 border border-[#d4af37]/40 px-2.5 py-0.5 rounded-full font-bold text-[#f3e8b1]">
                  Room #{selectedRoom}
                </span>
              )}
            </div>
            <div className="text-base font-black text-white leading-tight font-serif flex items-baseline gap-1.5">
              <span className="text-[#d4af37]">₹{grandTotal}</span>
              <span className="text-[11px] font-normal text-slate-400 font-sans">(Incl. GST)</span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2 bg-[#d4af37] text-[#080c14] hover:bg-[#dfc17b] px-4 py-2.5 rounded-xl sm:rounded-2xl text-xs font-extrabold transition shadow-[0_0_15px_rgba(212,175,55,0.3)]">
          <span>View Plate</span>
          <ChevronRight className="w-4 h-4" />
        </div>
      </div>
    </div>
  );
}

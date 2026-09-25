'use client';

import React, { useState } from 'react';
import { useCart } from '@/context/CartContext';
import { useModal } from '@/context/ModalContext';
import { sound } from '@/lib/sound';
import { BellRing, PhoneCall, MessageSquare, ShieldCheck, Crown, Plus, Minus } from 'lucide-react';

export default function InRoomDiningSection() {
  const { selectedRoom, setSelectedRoom, setDiningMode, addItem, items, updateQuantity } = useCart();
  const { showToast } = useModal();
  const [activeFloor, setActiveFloor] = useState<'all' | 'floor1' | 'floor2' | 'floor3' | 'suites'>('all');

  const roomsByFloor = {
    floor1: ['101', '102', '103', '104'],
    floor2: ['201', '202', '203', '204', '205'],
    floor3: ['301', '302', '304'],
    suites: ['Deluxe 401', 'Royal Suite 501'],
  };

  const handleSelectRoom = (room: string) => {
    setSelectedRoom(room);
    setDiningMode('room');
    sound.playRoomBell();
    showToast(`Room ${room} selected! 15% ROOMGUEST discount active.`);
  };

  const quickRoomCombos = [
    {
      id: 'thali-1',
      title: 'Maharaja Thali Royal Dinner',
      desc: 'Complete dinner thali with Paneer, Dal Makhani, 4 Rotis & Sweet.',
      price: 320,
      image: '/assets/restaurant_thali.jpg',
      badge: 'Guest Favorite',
    },
    {
      id: 'main-1',
      title: 'Paneer Butter Masala Handi',
      desc: 'Rich creamy paneer curry + 2 Butter Naan + Raita.',
      price: 240,
      image: '/assets/dish_paneer.jpg',
      badge: 'Quick 15 Mins',
    },
    {
      id: 'biryani-1',
      title: 'Royal Veg Dum Biryani Handi',
      desc: 'Slow-cooked fragrant biryani handi with boondi raita & papad.',
      price: 220,
      image: '/assets/dish_biryani.jpg',
      badge: 'Late Night Special',
    },
  ];

  const displayedRooms = activeFloor === 'all'
    ? [...roomsByFloor.floor1, ...roomsByFloor.floor2, ...roomsByFloor.floor3, ...roomsByFloor.suites]
    : roomsByFloor[activeFloor];

  return (
    <section className="py-16 sm:py-24 bg-[#0d1522] border-t border-[#d4af37]/20 relative overflow-hidden" id="inroom">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-14">
          <div className="inline-flex items-center gap-2 bg-[#121c2e] border border-[#d4af37]/30 text-[#d4af37] px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider mb-4 shadow-md">
            <BellRing className="w-3.5 h-3.5 text-[#d4af37]" />
            <span>24x7 Hotel Guest In-Room Dining Terminal</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white mb-4 leading-tight">
            In-Room Dining Concierge
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-transparent via-[#d4af37] to-transparent mx-auto mb-4" />
          <p className="text-slate-300 text-sm sm:text-base leading-relaxed max-w-2xl mx-auto">
            Staying at Hotel Shivansh? Select your room number below. Your order is prepared with royal priority and delivered piping hot straight to your bed with <strong className="text-[#d4af37] font-bold">Zero Delivery Fee &amp; 15% OFF</strong>.
          </p>
        </div>

        {/* Room Selector Box */}
        <div className="bg-[#121c2e] border border-[#d4af37]/40 rounded-3xl p-6 sm:p-8 lg:p-10 shadow-2xl mb-14 max-w-4xl mx-auto">
          
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-5 mb-8 pb-6 border-b border-[#d4af37]/20">
            <div>
              <span className="text-xs font-bold text-[#d4af37] uppercase tracking-widest block mb-1">Active Room Allotment</span>
              <div className="text-2xl sm:text-3xl font-black text-white flex items-center gap-3">
                <span>Room #{selectedRoom}</span>
                <span className="text-xs bg-emerald-950/80 border border-emerald-500/40 text-emerald-400 px-3 py-1 rounded-full font-bold flex items-center gap-1.5 shadow-sm">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                  Priority Kitchen Queue
                </span>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-2.5">
              <a
                href="tel:+919460624455"
                className="text-xs sm:text-sm font-bold text-slate-200 hover:text-white bg-[#18253d] hover:bg-[#1e304f] border border-[#d4af37]/30 px-4 py-2.5 rounded-xl transition flex items-center gap-2 shadow-sm"
              >
                <PhoneCall className="w-4 h-4 text-[#d4af37]" />
                <span>Dial Front Desk</span>
              </a>
              <a
                href={`https://wa.me/919460624455?text=Hello%20Hotel%20Shivansh%20Room%20Service,%20I%20am%20in%20Room%20${selectedRoom}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs sm:text-sm font-bold text-emerald-300 bg-emerald-950/60 hover:bg-emerald-900/80 border border-emerald-500/40 px-4 py-2.5 rounded-xl transition flex items-center gap-2 shadow-sm"
              >
                <MessageSquare className="w-4 h-4 text-emerald-400" />
                <span>WhatsApp Room Desk</span>
              </a>
            </div>
          </div>

          {/* Floor Navigation Tabs */}
          <div className="flex gap-2 overflow-x-auto pb-3 mb-6 scrollbar-none">
            {[
              { key: 'all', label: 'All Rooms (14)' },
              { key: 'floor1', label: '1st Floor (101-104)' },
              { key: 'floor2', label: '2nd Floor (201-205)' },
              { key: 'floor3', label: '3rd Floor (301-304)' },
              { key: 'suites', label: 'VIP Suites' },
            ].map(tab => (
              <button
                key={tab.key}
                onClick={() => setActiveFloor(tab.key as any)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all shrink-0 cursor-pointer ${
                  activeFloor === tab.key
                    ? 'gold-btn text-[#080c14] shadow-md font-extrabold'
                    : 'bg-[#18253d] text-slate-300 border border-[#d4af37]/20 hover:bg-[#223352] hover:text-white'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Room Selection Chips */}
          <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-5 gap-2.5 mb-8">
            {displayedRooms.map(r => {
              const isSuite = r.includes('Suite') || r.includes('Deluxe');
              const isSelected = selectedRoom === r;

              return (
                <button
                  key={r}
                  onClick={() => handleSelectRoom(r)}
                  className={`py-3 px-3 text-center rounded-2xl font-bold text-xs sm:text-sm border transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
                    isSelected
                      ? 'bg-[#be123c] text-white border-rose-500 shadow-lg scale-[1.02]'
                      : 'bg-[#18253d] text-slate-300 border-[#d4af37]/20 hover:border-[#d4af37] hover:text-white'
                  }`}
                >
                  {isSuite && <Crown size={14} className={isSelected ? 'text-amber-200' : 'text-[#d4af37]'} />}
                  <span>{isSuite ? r : `Room ${r}`}</span>
                </button>
              );
            })}
          </div>

          {/* Quick Add Combos */}
          <div className="pt-6 border-t border-[#d4af37]/20">
            <h4 className="text-xs font-bold text-[#d4af37] uppercase tracking-wider mb-4">
              Chef Recommended Late Night &amp; Dinner Combos for Room #{selectedRoom}
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {quickRoomCombos.map(combo => {
                const inCart = items.find(i => i.id === combo.id);
                const inCartQty = inCart ? inCart.quantity : 0;

                return (
                  <div key={combo.id} className="bg-[#18253d] border border-[#d4af37]/30 rounded-2xl p-4 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-[10px] font-bold text-amber-300 bg-amber-950/60 px-2 py-0.5 rounded-full border border-amber-500/30">
                          {combo.badge}
                        </span>
                        <span className="text-sm font-black text-[#d4af37]">₹{combo.price}</span>
                      </div>
                      <h5 className="font-bold text-white text-sm mb-1">{combo.title}</h5>
                      <p className="text-xs text-slate-300 mb-4">{combo.desc}</p>
                    </div>

                    <div className="flex items-center justify-between pt-2 border-t border-white/5">
                      <span className="text-[11px] text-slate-400">Zero Delivery Fee</span>
                      {inCartQty > 0 ? (
                        <div className="flex items-center bg-[#121c2e] border border-[#d4af37] rounded-xl p-0.5">
                          <button onClick={() => updateQuantity(combo.id, inCartQty - 1)} className="w-6 h-6 flex items-center justify-center text-slate-200">
                            <Minus size={11} />
                          </button>
                          <span className="px-2 text-xs font-bold text-white">{inCartQty}</span>
                          <button onClick={() => updateQuantity(combo.id, inCartQty + 1)} className="w-6 h-6 flex items-center justify-center text-slate-200">
                            <Plus size={11} />
                          </button>
                        </div>
                      ) : (
                        <button
                          onClick={() => {
                            addItem({ id: combo.id, quantity: 1, portion: 'Full', spice: 'medium', unitPrice: combo.price });
                            showToast(`Added to Room #${selectedRoom} plate!`);
                          }}
                          className="gold-btn px-3 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1 cursor-pointer"
                        >
                          <Plus size={11} />
                          <span>Add</span>
                        </button>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}

'use client';

import React from 'react';
import { useCart } from '@/context/CartContext';
import { DiningMode } from '@/lib/types';
import { BellRing, UtensilsCrossed, Bike, ArrowRight, Sparkles, Phone, MessageSquare, ShieldCheck, Clock, CheckCircle } from 'lucide-react';

export default function DiningModeSection() {
  const { diningMode, setDiningMode } = useCart();

  const handleSelectMode = (mode: DiningMode) => {
    setDiningMode(mode);
    if (mode === 'room') {
      const el = document.getElementById('inroom');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    } else {
      const el = document.getElementById('menu');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const steps = [
    {
      num: '01',
      icon: '🍲',
      title: 'Select Your Food',
      subtitle: 'Browse Royal Menu',
      desc: 'Choose from our signature Maharaja Thali, pure desi ghee Dal Baati Churma, Paneer Handi, or fresh rotis and add them to your plate.',
      tip: '💡 You can specify mild spice or Jain preparations in the chef notes.',
    },
    {
      num: '02',
      icon: '📍',
      title: 'Choose Dining Mode',
      subtitle: 'Where to Serve',
      desc: 'Select your hotel room number (101-308), restaurant table number, or your doorstep address in Sikar. No hidden fees!',
      tip: '🛎️ In-Room Delivery is 100% Free with zero delivery fee.',
    },
    {
      num: '03',
      icon: '🛵',
      title: 'Live Tracking & OTP',
      subtitle: 'Secure Handover',
      desc: 'Watch live kitchen preparation & Zomato rider GPS. Share your secret 4-digit OTP only upon doorstep parcel arrival.',
      tip: '🔒 Security: Share OTP only after verifying your hot sealed meal.',
    },
  ];

  const modes = [
    {
      key: 'room' as DiningMode,
      icon: BellRing,
      title: 'In-Room Dining',
      desc: 'Staying at Hotel Shivansh? Select your room number (101–308). Our kitchen delivers hot meals to your door in 20-25 mins (Zero Delivery Charge).',
      badge: 'Hotel Guests (Free Delivery)',
      badgeColor: 'text-amber-200 bg-[#be123c] border-[#be123c]/40',
      cta: 'Select Room & Order',
    },
    {
      key: 'table' as DiningMode,
      icon: UtensilsCrossed,
      title: 'Restaurant Table Service',
      desc: 'Dine in our royal AC dining hall. Enter your table number, and our courteous staff will serve fresh culinary creations to your table.',
      badge: 'Royal AC Dining Hall',
      badgeColor: 'text-[#080c14] bg-[#d4af37] border-amber-300',
      cta: 'Order to Table',
    },
    {
      key: 'delivery' as DiningMode,
      icon: Bike,
      title: 'Sikar Home Delivery (Zomato)',
      desc: 'Order to your home or office anywhere across Sikar city. Dedicated Zomato riders deliver in sealed thermal packaging in 30-40 mins.',
      badge: 'Across Sikar City (30-40 MIN)',
      badgeColor: 'text-emerald-300 bg-emerald-950/80 border-emerald-500/40',
      cta: 'Order Home Delivery',
    },
  ];

  return (
    <section className="py-16 sm:py-20 relative z-20 bg-[#080c14] border-b border-[#d4af37]/20" id="dining-modes">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* ================= 3-STEP ORDER GUIDE ================= */}
        <div className="mb-16">
          <div className="text-center max-w-3xl mx-auto mb-10">
            <span className="inline-flex items-center gap-1.5 text-xs font-bold tracking-[0.2em] text-[#d4af37] uppercase mb-2 bg-[#d4af37]/10 px-3 py-1 rounded-full border border-[#d4af37]/30">
              <Sparkles size={13} /> EASY &amp; SEAMLESS • 3 SIMPLE STEPS
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-white leading-tight">
              How Ordering Works <span className="text-[#d4af37]">(Simple &amp; Fast)</span>
            </h2>
            <p className="text-slate-300 text-sm sm:text-base mt-2">
              Whether you are relaxing in your hotel room, seated in our dining hall, or ordering to your home in Sikar:
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {steps.map((s) => (
              <div
                key={s.num}
                className="bg-[#0f172a]/80 border border-[#d4af37]/25 rounded-2xl p-6 relative hover:border-[#d4af37] transition-all hover:-translate-y-1 shadow-lg"
              >
                <span className="absolute top-4 right-4 font-serif text-2xl font-bold text-[#d4af37]/30">
                  {s.num}
                </span>
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#d4af37]/20 to-[#be123c]/20 border border-[#d4af37]/40 flex items-center justify-center text-2xl mb-4">
                  {s.icon}
                </div>
                <h3 className="font-serif font-bold text-lg text-white mb-1">{s.title}</h3>
                <span className="text-xs text-[#d4af37] font-semibold block mb-2">{s.subtitle}</span>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-4">{s.desc}</p>
                <div className="bg-black/30 border-l-2 border-[#d4af37] p-2.5 rounded text-[11px] text-slate-400">
                  {s.tip}
                </div>
              </div>
            ))}
          </div>

          {/* Quick Help & Helpline Banner */}
          <div className="mt-8 bg-gradient-to-r from-[#be123c]/20 via-[#18253d] to-[#d4af37]/20 border border-[#d4af37]/30 rounded-2xl p-4 sm:p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3.5 text-center sm:text-left">
              <div className="w-11 h-11 rounded-full bg-[#10b981]/20 border border-[#10b981]/40 flex items-center justify-center text-[#10b981] flex-shrink-0">
                <Phone size={20} />
              </div>
              <div>
                <strong className="text-white text-sm sm:text-base block">
                  Questions or special dietary preferences? Speak directly with our chefs:
                </strong>
                <span className="text-xs sm:text-sm text-slate-300">
                  Hotel Shivansh Sikar Desk is available 24x7 (+91 94606 24455)
                </span>
              </div>
            </div>
            <div className="flex items-center gap-3 flex-wrap">
              <a
                href="tel:+919460624455"
                className="inline-flex items-center gap-2 bg-[#10b981] hover:bg-[#059669] text-white text-xs sm:text-sm font-bold px-4 py-2 rounded-full shadow transition"
              >
                <Phone size={14} />
                <span>Call Us (+91 94606 24455)</span>
              </a>
              <a
                href="https://wa.me/919460624455?text=Hello%20Hotel%20Shivansh%2C%20I%20need%20assistance%20with%20my%20order."
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-[#25d366] hover:bg-[#128c7e] text-white text-xs sm:text-sm font-bold px-4 py-2 rounded-full shadow transition"
              >
                <MessageSquare size={14} />
                <span>WhatsApp Help</span>
              </a>
            </div>
          </div>
        </div>

        {/* ================= DINING PREFERENCES GRID ================= */}
        <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-14">
          <span className="inline-flex items-center gap-1.5 text-xs font-bold tracking-[0.2em] text-[#d4af37] uppercase mb-2">
            <Sparkles size={13} /> YOUR CHOICE • CHOOSE DINING PREFERENCE
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-white leading-tight">
            Where Would You Like to Dine?
          </h2>
          <p className="text-slate-300 text-sm sm:text-base mt-3 max-w-xl mx-auto">
            Enjoy in the comfort of your room, at our royal restaurant table, or delivered to your doorstep in Sikar:
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {modes.map((mode) => {
            const isActive = diningMode === mode.key;
            const Icon = mode.icon;
            return (
              <div
                key={mode.key}
                onClick={() => handleSelectMode(mode.key)}
                className={`cursor-pointer rounded-3xl p-7 sm:p-8 border transition-all duration-300 relative flex flex-col justify-between group overflow-hidden ${
                  isActive
                    ? 'bg-[#121c2e] border-[#d4af37] shadow-2xl shadow-amber-900/20 ring-2 ring-[#d4af37]/50 scale-[1.01]'
                    : 'bg-[#0d1522] border-[#d4af37]/30 hover:border-[#d4af37] hover:-translate-y-1 hover:shadow-xl shadow-lg'
                }`}
              >
                {/* Top status & badge */}
                <div className="flex items-center justify-between gap-3 mb-6">
                  <div className={`w-13 h-13 rounded-2xl flex items-center justify-center flex-shrink-0 transition-all duration-300 ${
                    isActive
                      ? 'bg-gradient-to-br from-[#d4af37] to-[#aa771c] text-[#080c14] shadow-lg'
                      : 'bg-[#18253d] border border-[#d4af37]/30 text-[#d4af37] group-hover:bg-[#d4af37] group-hover:text-[#080c14]'
                  }`}>
                    <Icon size={24} />
                  </div>

                  <div className="flex items-center gap-2">
                    {isActive && (
                      <span className="inline-flex items-center gap-1.5 text-[10px] font-bold text-[#d4af37] bg-[#080c14] border border-[#d4af37]/50 px-3 py-1 rounded-full shadow-sm">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#d4af37] animate-pulse"></span>
                        Active Mode
                      </span>
                    )}
                    <span className={`text-[10px] font-bold ${mode.badgeColor} border px-3 py-1 rounded-full shadow-sm`}>
                      {mode.badge}
                    </span>
                  </div>
                </div>

                <div className="flex-1 mb-6">
                  <h3 className="font-serif font-bold text-xl sm:text-2xl text-white mb-2.5 group-hover:text-[#d4af37] transition">
                    {mode.title}
                  </h3>
                  <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
                    {mode.desc}
                  </p>
                </div>

                <div className={`pt-5 border-t border-[#d4af37]/20 flex items-center justify-between text-xs sm:text-sm font-bold ${
                  isActive ? 'text-[#d4af37]' : 'text-slate-400 group-hover:text-[#d4af37]'
                }`}>
                  <span className="tracking-wide">{mode.cta}</span>
                  <div className={`w-8 h-8 rounded-xl flex items-center justify-center transition-all duration-300 ${
                    isActive
                      ? 'bg-[#d4af37] text-[#080c14] shadow-md'
                      : 'bg-[#18253d] text-slate-300 group-hover:bg-[#d4af37] group-hover:text-[#080c14] group-hover:translate-x-1'
                  }`}>
                    <ArrowRight size={14} />
                  </div>
                </div>

                {mode.key === 'delivery' && (
                  <div className="mt-4 pt-3 border-t border-slate-800 flex items-center justify-between" onClick={e => e.stopPropagation()}>
                    <span className="text-[11px] text-slate-400">Prefer food app?</span>
                    <a
                      href="https://www.zomato.com/sikar/restaurants?q=Hotel+Shivansh"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 bg-[#e23744] hover:bg-[#cb202d] text-white text-[11px] font-extrabold px-3 py-1 rounded-lg shadow transition"
                    >
                      <span>Order on Zomato</span>
                      <span className="text-[10px] bg-black/25 px-1 rounded">⭐ 4.8</span>
                    </a>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}


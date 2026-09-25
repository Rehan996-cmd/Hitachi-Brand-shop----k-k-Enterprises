'use client';

import React from 'react';
import Image from 'next/image';
import { BedDouble, UtensilsCrossed, Phone, MapPin, Star, ChevronDown, Sparkles, MessageCircle } from 'lucide-react';

export default function Hero() {
  const handleScrollDown = () => {
    const nextSection = document.getElementById('why-shivansh');
    if (nextSection) {
      nextSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative min-h-[100vh] lg:min-h-[110vh] w-full bg-[#080c14] overflow-hidden flex flex-col justify-between" id="home">
      {/* Background Atmosphere Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/assets/hotel_hero.jpg"
          alt="Hotel Shivansh Sikar Exterior & Royal Ambiance"
          fill
          priority
          quality={80}
          className="object-cover saturate-[0.85] brightness-[0.45] scale-105 animate-pulse-slow"
          sizes="100vw"
        />
      </div>

      {/* Atmospheric Vignette Gradients */}
      <div className="absolute inset-0 z-10 bg-gradient-to-t from-[#080c14] via-[#080c14]/40 to-[#080c14]/80" />
      <div className="absolute inset-0 z-10 bg-[radial-gradient(ellipse_at_center,transparent_0%,rgba(8,12,20,0.8)_100%)]" />

      {/* Hero Main Content */}
      <div className="relative z-20 flex-1 flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8 text-center pt-24 sm:pt-28 pb-16">
        <div className="max-w-4xl mx-auto space-y-6 sm:space-y-8 animate-fade-in-up">
          
          {/* Top Badge with Justdial Rating */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#121c2e]/90 border border-[#d4af37]/40 shadow-xl backdrop-blur-md">
            <div className="flex items-center gap-1 text-[#d4af37]">
              <Star size={14} className="fill-[#d4af37]" />
              <span className="font-black text-xs">5.0 RATED ON JUSTDIAL</span>
            </div>
            <span className="text-white/40">·</span>
            <span className="text-xs font-bold text-slate-200">OPPOSITE ROADWAYS BUS DEPOT, SIKAR</span>
          </div>

          {/* Heading */}
          <div className="space-y-3">
            <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-serif font-black text-white tracking-tight leading-[1.05]">
              HOTEL <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#d4af37] via-[#f3e5ab] to-[#aa771c] drop-shadow-[0_0_35px_rgba(212,175,55,0.4)]">SHIVANSH</span>
            </h1>
            <p className="text-base sm:text-xl md:text-2xl text-amber-200/90 font-serif font-medium tracking-wide">
              Starts at ₹1,999/night · AC Luxury Stay &amp; 100% Pure Veg Royal Dining
            </p>
          </div>

          {/* Description */}
          <p className="text-xs sm:text-base md:text-lg text-slate-300 max-w-2xl mx-auto font-normal leading-relaxed">
            Experience Sikar&apos;s warmest Rajputana hospitality with sanitized AC rooms, 24x7 in-room dining, massive breakfast spread, and authentic pure desi ghee cuisine.
          </p>

          {/* Action CTAs */}
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 items-center justify-center pt-4">
            {/* Book Room WhatsApp */}
            <a
              href="https://wa.me/919460624455?text=Hello%20Hotel%20Shivansh!%20I%20would%20like%20to%20inquire%20about%20booking%20a%20room%20starting%20at%20₹1,999/night."
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-[#d4af37] via-[#c49a30] to-[#aa771c] text-[#080c14] rounded-2xl font-black text-sm tracking-wide hover:brightness-110 transition-all duration-300 transform hover:scale-105 active:scale-95 shadow-[0_8px_30px_rgba(212,175,55,0.35)] flex items-center justify-center gap-2"
            >
              <BedDouble size={18} />
              <span>Book Room (From ₹1,999)</span>
            </a>

            {/* Explore Menu */}
            <a
              href="#menu"
              className="w-full sm:w-auto px-7 py-4 bg-[#121c2e]/90 hover:bg-[#1a2842] border border-[#d4af37]/40 hover:border-[#d4af37] text-white rounded-2xl font-bold text-sm tracking-wide transition-all backdrop-blur-md flex items-center justify-center gap-2 shadow-lg"
            >
              <UtensilsCrossed size={18} className="text-[#d4af37]" />
              <span>Explore Royal Menu</span>
            </a>

            {/* Direct Call */}
            <a
              href="tel:+919460624455"
              className="w-full sm:w-auto px-6 py-4 bg-white/5 hover:bg-white/10 border border-white/10 text-slate-200 rounded-2xl font-bold text-sm tracking-wide transition-all backdrop-blur-md flex items-center justify-center gap-2"
            >
              <Phone size={18} className="text-[#d4af37]" />
              <span>+91 94606 24455</span>
            </a>
          </div>

          {/* Location Bar Pill */}
          <div className="pt-2">
            <a
              href="https://www.google.com/maps/search/Hotel+Shivansh+Opposite+Roadways+Bus+Depot+Sikar+Rajasthan"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-xs text-slate-300 hover:text-[#d4af37] transition bg-black/40 px-4 py-2 rounded-full border border-white/10"
            >
              <MapPin size={14} className="text-[#d4af37]" />
              <span>Opposite Roadways Bus Depot, Sikar Roadlines, Sikar (332001)</span>
            </a>
          </div>

        </div>
      </div>

      {/* Highlights Bar at Bottom of Hero */}
      <div className="relative z-20 border-t border-[#d4af37]/20 bg-[#080c14]/90 backdrop-blur-lg py-4 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
          <div className="flex flex-col items-center">
            <span className="text-[#d4af37] font-bold text-base sm:text-lg flex items-center gap-1">
              <Star size={16} className="fill-[#d4af37]" /> 5.0 Justdial
            </span>
            <span className="text-[11px] text-slate-400">11 Verified Reviews · 55+ Photos</span>
          </div>

          <div className="flex flex-col items-center">
            <span className="text-white font-bold text-base sm:text-lg">Opp. Bus Depot</span>
            <span className="text-[11px] text-slate-400">Prime Sikar Roadlines Location</span>
          </div>

          <div className="flex flex-col items-center">
            <span className="text-[#d4af37] font-bold text-base sm:text-lg">Starts ₹1,999</span>
            <span className="text-[11px] text-slate-400">Deluxe AC Luxury Rooms</span>
          </div>

          <div className="flex flex-col items-center">
            <span className="text-emerald-400 font-bold text-base sm:text-lg">100% Pure Veg</span>
            <span className="text-[11px] text-slate-400">24x7 In-Room Hot Dining</span>
          </div>
        </div>
      </div>

      {/* Scroll Down Trigger */}
      <div
        onClick={handleScrollDown}
        className="absolute bottom-20 left-1/2 -translate-x-1/2 z-20 hidden md:flex flex-col items-center gap-2 cursor-pointer group"
      >
        <div className="animate-bounce">
          <ChevronDown size={22} className="text-[#d4af37]/70 group-hover:text-[#d4af37] transition" />
        </div>
      </div>
    </section>
  );
}

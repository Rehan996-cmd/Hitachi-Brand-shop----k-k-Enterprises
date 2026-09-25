'use client';

import React, { useState, useEffect } from 'react';
import { useCart } from '@/context/CartContext';
import { useModal } from '@/context/ModalContext';
import {
  Crown, BedDouble, ShoppingBag, Menu as MenuIcon,
  X, Phone, MessageCircle, Star, UtensilsCrossed,
  CalendarDays, MapPin, Camera, Search as SearchIcon
} from 'lucide-react';

export default function Header() {
  const { itemCount, grandTotal, setIsCartOpen } = useCart();
  const { openModal } = useModal();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const navLinks = [
    { href: '#rooms', label: 'Rooms & Stay' },
    { href: '#menu', label: 'Royal Menu' },
    { href: '#thali', label: 'Maharaja Thali' },
    { href: '#inroom', label: 'In-Room Dining' },
    { href: '#reservation', label: 'Reserve Table' },
    { href: '#reviews', label: 'Reviews' },
    { href: '#contact', label: 'Contact' },
  ];

  return (
    <>
      {/* Top 5-Star Announcement Bar */}
      <aside className="bg-[#05080f] text-slate-300 text-xs py-2 px-4 border-b border-[#d4af37]/20 select-none">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-3">
          {/* Left: Justdial Rating & Prime Location */}
          <div className="flex items-center gap-2">
            <span className="flex items-center gap-1 bg-[#d4af37] text-[#080c14] font-black text-[11px] px-2 py-0.5 rounded shadow-sm">
              <Star size={11} className="fill-[#080c14]" />
              <span>5.0</span>
            </span>
            <span className="hidden sm:inline font-bold text-white tracking-wide">
              HOTEL SHIVANSH
            </span>
            <span className="hidden md:inline text-slate-500">·</span>
            <span className="text-slate-300 text-[11px] sm:text-xs truncate">
              Opposite Roadways Bus Depot, Sikar
            </span>
          </div>

          {/* Right: Zomato, Phone & WhatsApp */}
          <div className="flex items-center gap-3 sm:gap-4 shrink-0 text-xs">
            <a
              href="https://www.zomato.com/sikar/restaurants?q=Hotel+Shivansh"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-[#e23744] hover:bg-[#cb202d] text-white px-2.5 py-0.5 rounded font-bold text-[11px] transition flex items-center gap-1 shadow-sm"
              title="Order on Zomato"
            >
              <span>Zomato</span>
              <span className="text-[10px] bg-black/30 px-1 rounded">⭐ 4.8</span>
            </a>

            <a
              href="tel:+919460624455"
              className="hover:text-[#d4af37] transition font-bold text-white flex items-center gap-1.5"
            >
              <Phone size={12} className="text-[#d4af37]" />
              <span className="hidden sm:inline">+91 94606 24455</span>
              <span className="sm:hidden">Call</span>
            </a>

            <a
              href="https://wa.me/919460624455?text=Hello%20Hotel%20Shivansh!%20I%20would%20like%20to%20inquire%20about%20booking%20a%20room."
              target="_blank"
              rel="noopener noreferrer"
              className="text-emerald-400 hover:text-white font-bold hidden md:flex items-center gap-1 transition"
            >
              <MessageCircle size={13} />
              <span>WhatsApp</span>
            </a>
          </div>
        </div>
      </aside>

      {/* Main Sticky Header */}
      <header
        className={`sticky top-0 z-50 transition-all duration-300 ${
          scrolled
            ? 'bg-[#080c14]/95 backdrop-blur-xl border-b border-[#d4af37]/30 shadow-[0_10px_35px_rgba(0,0,0,0.85)] py-2.5'
            : 'bg-[#080c14]/90 backdrop-blur-md border-b border-[#d4af37]/20 py-3.5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-4 lg:gap-6">
          
          {/* Brand Logo & Name */}
          <a href="#home" className="flex items-center gap-3 group shrink-0">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-[#d4af37] via-[#c49a30] to-[#aa771c] border-2 border-amber-300 flex items-center justify-center text-[#080c14] shadow-lg group-hover:scale-105 transition-all duration-300">
              <Crown size={22} className="stroke-[2.5]" />
            </div>
            <div className="flex flex-col">
              <span className="font-serif font-black text-xl sm:text-2xl text-white tracking-wide leading-none group-hover:text-[#d4af37] transition whitespace-nowrap">
                HOTEL SHIVANSH
              </span>
              <span className="text-[9px] sm:text-[10px] font-bold text-[#d4af37] tracking-[0.2em] uppercase mt-1 whitespace-nowrap">
                ROYAL STAY &amp; PURE VEG DINING · SIKAR
              </span>
            </div>
          </a>

          {/* Desktop Navigation Links - Clean, Single-Line on lg and up */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-slate-300 hover:text-[#d4af37] px-2.5 xl:px-3 py-2 rounded-xl text-xs xl:text-[13px] font-bold tracking-wide transition-all hover:bg-white/5 whitespace-nowrap"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Header Action Buttons (Only Primary Customer CTAs) */}
          <div className="flex items-center gap-2.5 sm:gap-3 shrink-0">
            {/* Book Room CTA Button */}
            <a
              href="https://wa.me/919460624455?text=Hello%20Hotel%20Shivansh!%20I%20would%20like%20to%20inquire%20about%20booking%20a%20room%20starting%20at%20₹1,999/night."
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:inline-flex items-center gap-1.5 bg-gradient-to-r from-[#d4af37] via-[#c49a30] to-[#aa771c] hover:brightness-110 text-[#080c14] px-4 py-2.5 rounded-xl font-black text-xs tracking-wider uppercase transition shadow-md whitespace-nowrap"
            >
              <BedDouble size={14} />
              <span>Book Room</span>
            </a>

            {/* My Plate / Cart Button */}
            <button
              onClick={() => setIsCartOpen(true)}
              className="flex items-center gap-2 bg-[#121c2e] hover:bg-[#1a2842] border border-[#d4af37]/40 hover:border-[#d4af37] text-white px-3 sm:px-3.5 py-2 rounded-xl transition cursor-pointer shadow-md whitespace-nowrap"
              aria-label="Open food cart plate"
            >
              <div className="relative">
                <ShoppingBag size={16} className="text-[#d4af37]" />
                {itemCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-[#be123c] text-white text-[10px] font-black w-4 h-4 rounded-full flex items-center justify-center shadow-md animate-pulse">
                    {itemCount}
                  </span>
                )}
              </div>
              <div className="flex flex-col text-left leading-none">
                <span className="text-[9px] uppercase font-bold text-slate-400">My Plate</span>
                <span className="text-xs font-black text-[#d4af37]">₹{grandTotal}</span>
              </div>
            </button>

            {/* Mobile / Tablet Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(true)}
              className="lg:hidden p-2 text-slate-200 hover:text-[#d4af37] hover:bg-white/5 rounded-xl transition cursor-pointer"
              aria-label="Open navigation menu"
            >
              <MenuIcon size={22} />
            </button>
          </div>
        </div>

        {/* Full-Screen Luxury Mobile Drawer */}
        {mobileMenuOpen && (
          <div className="fixed inset-0 z-[100] lg:hidden animate-fadeIn">
            {/* Backdrop */}
            <div
              className="fixed inset-0 bg-black/75 backdrop-blur-sm transition-opacity"
              onClick={() => setMobileMenuOpen(false)}
            />

            {/* Slide-in Drawer */}
            <div className="fixed top-0 right-0 bottom-0 w-[85%] max-w-sm bg-[#0d1522] border-l border-[#d4af37]/35 p-6 flex flex-col justify-between shadow-2xl z-10 animate-slideDrawer overflow-y-auto">
              <div>
                {/* Drawer Top */}
                <div className="flex items-center justify-between pb-5 border-b border-[#d4af37]/20 mb-6">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-[#d4af37] to-[#aa771c] border-2 border-amber-300 flex items-center justify-center shadow-lg">
                      <Crown size={18} className="text-[#080c14] stroke-[2.5]" />
                    </div>
                    <div>
                      <h3 className="font-serif font-bold text-base text-white leading-none">HOTEL SHIVANSH</h3>
                      <span className="text-[9px] font-bold text-[#d4af37] tracking-widest uppercase mt-1 block">
                        Opp. Roadways Bus Depot, Sikar
                      </span>
                    </div>
                  </div>
                  <button
                    onClick={() => setMobileMenuOpen(false)}
                    className="w-9 h-9 rounded-full bg-[#121c2e] hover:bg-[#18253d] text-slate-200 flex items-center justify-center border border-[#d4af37]/30 transition cursor-pointer"
                    aria-label="Close Mobile Menu"
                  >
                    <X size={18} />
                  </button>
                </div>

                {/* Primary Book Room Card */}
                <div className="bg-[#121c2e] border border-[#d4af37]/40 rounded-2xl p-4 mb-5 shadow-lg">
                  <span className="text-[10px] text-[#d4af37] font-bold tracking-widest uppercase block mb-1">
                    Luxury AC Stay · Starts ₹1,999
                  </span>
                  <p className="text-white text-xs mb-3">
                    Book direct via WhatsApp for instant confirmation &amp; best corporate tariff.
                  </p>
                  <a
                    href="https://wa.me/919460624455?text=Hello%20Hotel%20Shivansh!%20I%20would%20like%20to%20inquire%20about%20booking%20a%20room."
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-2.5 bg-gradient-to-r from-[#d4af37] to-[#aa771c] text-[#080c14] rounded-xl font-black text-xs flex items-center justify-center gap-2 shadow"
                  >
                    <MessageCircle size={14} />
                    <span>Book on WhatsApp</span>
                  </a>
                </div>

                {/* Navigation Links */}
                <nav className="flex flex-col gap-1 mb-6">
                  {navLinks.map((link) => (
                    <a
                      key={link.href}
                      href={link.href}
                      onClick={() => setMobileMenuOpen(false)}
                      className="flex items-center justify-between text-slate-200 hover:text-[#d4af37] hover:bg-white/5 px-4 py-3 rounded-xl text-sm font-bold transition border border-transparent hover:border-[#d4af37]/20"
                    >
                      <span>{link.label}</span>
                      <span className="text-[#d4af37] text-xs">›</span>
                    </a>
                  ))}
                </nav>
              </div>

              {/* Drawer Bottom Actions */}
              <div className="pt-4 border-t border-[#d4af37]/20 space-y-3">
                <a
                  href="https://www.zomato.com/sikar/restaurants?q=Hotel+Shivansh"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full flex items-center justify-between bg-[#e23744] hover:bg-[#cb202d] text-white font-extrabold py-2.5 px-4 rounded-xl text-xs transition shadow-md"
                >
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-white animate-ping"></span>
                    <span>Order on Zomato</span>
                  </div>
                  <span className="bg-black/30 px-2 py-0.5 rounded text-[10px]">⭐ 4.8</span>
                </a>

                <div className="grid grid-cols-2 gap-2">
                  <a
                    href="tel:+919460624455"
                    className="flex items-center justify-center gap-1.5 bg-[#121c2e] hover:bg-[#18253d] border border-[#d4af37]/40 text-white font-bold py-2.5 rounded-xl text-xs transition"
                  >
                    <Phone size={13} className="text-[#d4af37]" />
                    <span>Call Desk</span>
                  </a>
                  <button
                    onClick={() => { setMobileMenuOpen(false); openModal('gallery'); }}
                    className="flex items-center justify-center gap-1.5 bg-[#121c2e] hover:bg-[#18253d] border border-[#d4af37]/40 text-[#d4af37] font-bold py-2.5 rounded-xl text-xs transition"
                  >
                    <Camera size={13} />
                    <span>Photos</span>
                  </button>
                </div>

                <div className="pt-2 text-center">
                  <button
                    onClick={() => { setMobileMenuOpen(false); openModal('trackOrder'); }}
                    className="text-xs text-slate-400 hover:text-[#d4af37] transition inline-flex items-center gap-1"
                  >
                    <SearchIcon size={12} />
                    <span>Track Existing Order</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </header>
    </>
  );
}

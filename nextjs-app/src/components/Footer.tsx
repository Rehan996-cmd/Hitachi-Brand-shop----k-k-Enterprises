'use client';

import React from 'react';
import { Crown, Phone, MapPin, Mail, Clock, ExternalLink, Star, MessageSquare } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-[#05080f] text-slate-300 border-t border-[#d4af37]/30 pt-16 pb-24 lg:pb-12 relative overflow-hidden" id="contact">
      {/* Decorative Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-24 bg-[#d4af37]/5 blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-12 mb-16">
          
          {/* Column 1: Brand & Justdial Badge */}
          <div className="space-y-5">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-[#d4af37] via-[#b38e44] to-[#aa771c] border border-amber-300 flex items-center justify-center text-[#080c14] shadow-lg">
                <Crown size={20} className="stroke-[2.5]" />
              </div>
              <div>
                <span className="font-serif font-black text-2xl text-white tracking-wide block leading-none">
                  HOTEL SHIVANSH
                </span>
                <span className="text-[10px] text-[#d4af37] tracking-[0.2em] font-bold uppercase mt-1 block">
                  Royal Stay &amp; Pure Veg Dining
                </span>
              </div>
            </div>

            <p className="text-slate-400 text-xs sm:text-sm leading-relaxed">
              Sikar&apos;s premier destination for luxury AC accommodation and authentic 100% pure vegetarian royal dining. Located centrally opposite Roadways Bus Depot.
            </p>

            {/* Justdial Verified Badge */}
            <a
              href="https://www.justdial.com/Sikar/HOTEL-SHIVANSH-Opposite-Roadways-Bus-Depot-Sikar-Roadlines/9999P1572-1572-251202150053-X6V6_BZDET"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 bg-[#0d1522] border border-[#d4af37]/40 hover:border-[#d4af37] px-4 py-2.5 rounded-2xl transition group shadow-md"
            >
              <div className="flex items-center gap-1 bg-[#d4af37] text-[#080c14] px-2 py-0.5 rounded-md font-bold text-xs">
                <span>5.0</span>
                <Star size={12} className="fill-[#080c14]" />
              </div>
              <div className="text-left">
                <span className="text-white text-xs font-bold block group-hover:text-[#d4af37] transition">
                  Rated 5.0 on Justdial
                </span>
                <span className="text-[10px] text-slate-400 block">11 Reviews · 55+ Photos</span>
              </div>
              <ExternalLink size={14} className="text-slate-400 group-hover:text-[#d4af37] ml-auto transition" />
            </a>
          </div>

          {/* Column 2: Quick Links */}
          <div className="space-y-4">
            <h4 className="font-serif font-bold text-base text-white tracking-wider uppercase border-b border-[#d4af37]/30 pb-2">
              Quick Navigation
            </h4>
            <ul className="space-y-2.5 text-xs sm:text-sm">
              <li>
                <a href="#rooms" className="hover:text-[#d4af37] transition flex items-center gap-2">
                  <span className="text-[#d4af37]">›</span> AC Rooms &amp; Suites (From ₹1,999)
                </a>
              </li>
              <li>
                <a href="#menu" className="hover:text-[#d4af37] transition flex items-center gap-2">
                  <span className="text-[#d4af37]">›</span> Royal Pure Veg Menu
                </a>
              </li>
              <li>
                <a href="#thali" className="hover:text-[#d4af37] transition flex items-center gap-2">
                  <span className="text-[#d4af37]">›</span> Maharaja Special Thali
                </a>
              </li>
              <li>
                <a href="#inroom" className="hover:text-[#d4af37] transition flex items-center gap-2">
                  <span className="text-[#d4af37]">›</span> 24x7 In-Room Dining Service
                </a>
              </li>
              <li>
                <a href="#reservation" className="hover:text-[#d4af37] transition flex items-center gap-2">
                  <span className="text-[#d4af37]">›</span> Reserve Dining Table / Banquet
                </a>
              </li>
              <li>
                <a href="#reviews" className="hover:text-[#d4af37] transition flex items-center gap-2">
                  <span className="text-[#d4af37]">›</span> Guest Testimonials
                </a>
              </li>
              <li>
                <a href="#faq" className="hover:text-[#d4af37] transition flex items-center gap-2">
                  <span className="text-[#d4af37]">›</span> FAQs &amp; Room Policies
                </a>
              </li>
            </ul>
          </div>

          {/* Column 3: Contact & Direct Inquiries */}
          <div className="space-y-4">
            <h4 className="font-serif font-bold text-base text-white tracking-wider uppercase border-b border-[#d4af37]/30 pb-2">
              24x7 Front Desk
            </h4>
            <ul className="space-y-3 text-xs sm:text-sm">
              <li className="flex items-start gap-3">
                <MapPin size={18} className="text-[#d4af37] shrink-0 mt-0.5" />
                <span className="leading-snug">
                  Opposite Roadways Bus Depot, Sikar Roadlines, Sikar, Rajasthan - 332001
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Phone size={16} className="text-[#d4af37] shrink-0" />
                <a href="tel:+919460624455" className="hover:text-[#d4af37] transition font-bold text-white">
                  +91 94606 24455
                </a>
              </li>
              <li className="flex items-center gap-3">
                <MessageSquare size={16} className="text-emerald-400 shrink-0" />
                <a
                  href="https://wa.me/919460624455?text=Hello%20Hotel%20Shivansh,%20I%20would%20like%20to%20inquire%20about%20booking%20a%20room"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-emerald-300 text-emerald-400 font-bold transition"
                >
                  WhatsApp Booking &amp; Support
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Clock size={16} className="text-[#d4af37] shrink-0" />
                <span>Open 24 Hours (Check-in &amp; Room Service)</span>
              </li>
            </ul>
          </div>

          {/* Column 4: Online Ordering & Directions */}
          <div className="space-y-4">
            <h4 className="font-serif font-bold text-base text-white tracking-wider uppercase border-b border-[#d4af37]/30 pb-2">
              Order Online &amp; Location
            </h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              Order authentic pure veg delicacies delivered anywhere in Sikar via Zomato or direct kitchen dispatch.
            </p>
            <div className="flex flex-col gap-2.5 pt-1">
              <a
                href="https://www.zomato.com/sikar/restaurants?q=Hotel+Shivansh"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-[#e23744] hover:bg-[#cb202d] text-white px-4 py-2.5 rounded-xl font-bold text-xs flex items-center justify-between transition shadow-md"
              >
                <span>Order on Zomato</span>
                <span className="text-[10px] bg-black/25 px-2 py-0.5 rounded">Rating 4.8</span>
              </a>
              <a
                href="https://www.google.com/maps/search/Hotel+Shivansh+Opposite+Roadways+Bus+Depot+Sikar+Rajasthan"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-[#121c2e] hover:bg-[#1a2842] border border-[#d4af37]/40 text-slate-200 px-4 py-2.5 rounded-xl font-bold text-xs flex items-center justify-between transition shadow-md"
              >
                <span>Google Maps Directions</span>
                <MapPin size={14} className="text-[#d4af37]" />
              </a>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="border-t border-[#d4af37]/20 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <p>
            &copy; 2026 <strong className="text-white">HOTEL SHIVANSH</strong> (Opposite Roadways Bus Depot, Sikar). All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <span>FSSAI: 12221034000189</span>
            <span>GSTIN: 08AABCH1234F1Z5</span>
            <span className="text-[#d4af37]">100% Pure Vegetarian</span>
          </div>
        </div>

      </div>
    </footer>
  );
}

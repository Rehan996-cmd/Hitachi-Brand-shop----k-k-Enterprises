'use client';

import React, { useState } from 'react';
import { ChevronDown, Sparkles } from 'lucide-react';
import { sound } from '@/lib/sound';

const faqs = [
  {
    q: 'Is Hotel Shivansh a 100% Pure Vegetarian restaurant?',
    a: 'Yes! Hotel Shivansh is a strict 100% Pure Vegetarian kitchen. All our dishes are prepared using farm-fresh ingredients, pure desi ghee, and real paneer. We also offer Jain-friendly and No-Onion-Garlic options on advance request.',
  },
  {
    q: 'What are the Hotel Check-in & Check-out timings?',
    a: 'Standard check-in is 12:00 PM and check-out is 11:00 AM. We have a 24x7 front desk to assist you anytime. Early check-in and late check-out can be arranged subject to availability.',
  },
  {
    q: 'How does In-Room Dining work for hotel guests?',
    a: 'Hotel guests can order food directly from our website by selecting their room number (101–304 or Suites). All in-room orders have zero delivery fee, 15% discount with coupon ROOMGUEST, and priority kitchen dispatch within 15–20 minutes.',
  },
  {
    q: 'Is there parking available at Hotel Shivansh?',
    a: 'Yes, we offer complimentary spacious parking for cars, SUVs, and tourist buses with 24x7 CCTV surveillance and security.',
  },
  {
    q: 'Can non-staying guests dine in or order food?',
    a: 'Absolutely! Our restaurant is open to all visitors. You can dine in our AC royal family hall, order takeaway, or use our doorstep delivery service anywhere in Sikar town.',
  },
  {
    q: 'Do you accept online payments and UPI?',
    a: 'Yes, we accept UPI (Google Pay, PhonePe, Paytm), debit/credit cards, and cash. Hotel guests can also add food charges directly to their room bill.',
  },
];

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="py-20 sm:py-28 bg-[#0d1522] border-t border-[#d4af37]/20 relative" id="faq">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-14 sm:mb-18">
          <span className="inline-flex items-center gap-2 text-xs font-bold tracking-[0.25em] text-[#d4af37] bg-[#121c2e] border border-[#d4af37]/30 px-4 py-2 rounded-full uppercase mb-4 shadow-sm">
            <Sparkles size={13} className="text-[#d4af37]" />
            COMMON INQUIRIES
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4 tracking-tight">
            Frequently Asked Questions
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-transparent via-[#d4af37] to-transparent mx-auto mb-4" />
          <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
            Everything you need to know about dining, rooms, and royal hospitality at Hotel Shivansh.
          </p>
        </div>

        <div className="flex flex-col gap-4">
          {faqs.map((faq, i) => {
            const isOpen = openIndex === i;
            return (
              <div
                key={i}
                className={`bg-[#121c2e] border rounded-2xl sm:rounded-3xl overflow-hidden transition-all duration-300 shadow-lg ${
                  isOpen ? 'border-[#d4af37] ring-1 ring-[#d4af37]/30' : 'border-[#d4af37]/20 hover:border-[#d4af37]/50'
                }`}
              >
                <button
                  onClick={() => {
                    sound.playClick();
                    setOpenIndex(isOpen ? null : i);
                  }}
                  className="w-full flex items-center justify-between gap-4 p-6 text-left cursor-pointer transition-colors hover:bg-white/5"
                >
                  <span className="font-serif font-bold text-base sm:text-lg text-white pr-2">
                    {faq.q}
                  </span>
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 transition-transform duration-300 ${
                    isOpen ? 'bg-[#d4af37] text-[#080c14] rotate-180' : 'bg-[#18253d] text-slate-300'
                  }`}>
                    <ChevronDown size={16} />
                  </div>
                </button>
                {isOpen && (
                  <div className="px-6 pb-6 pt-1 text-slate-300 text-sm leading-relaxed border-t border-white/5 animate-fadeIn">
                    {faq.a}
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

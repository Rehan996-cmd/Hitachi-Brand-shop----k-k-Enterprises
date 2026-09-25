'use client';

import React, { useState, useEffect } from 'react';
import { useModal } from '@/context/ModalContext';
import { Star, Sparkles, PenLine, ExternalLink, CheckCircle2 } from 'lucide-react';

interface ReviewItem {
  name: string;
  location: string;
  rating: number;
  tag: string;
  text: string;
  source?: string;
  verified?: boolean;
}

const justdialReviews: ReviewItem[] = [
  {
    name: 'Sapna Tak',
    location: 'Leisure Traveler',
    rating: 5,
    tag: 'Tidy Lobby & Tasty Food',
    text: 'My stay at HOTEL SHIVANSH was delightful! The tidy lobby welcomed me with warmth, setting a relaxing tone for my visit. It is budget-friendly, making it perfect for leisure travelers like me. The highlight was the tasty food – every meal was a treat! Overall, it provided a refreshing escape without breaking the bank. Highly recommended!',
    source: 'Verified on Justdial',
    verified: true,
  },
  {
    name: 'Kajal Goyal',
    location: 'Comfort Stay',
    rating: 5,
    tag: 'Large Rooms & Great Location',
    text: 'I had a great time at HOTEL SHIVANSH. It is a comfortable place to stay. The food was very tasty, and I enjoyed every meal. The location is great, making it easy to explore the area. The rooms are large and nice, perfect for relaxing. Budget-friendly with multi-language support so I could talk easily with the staff.',
    source: 'Verified on Justdial',
    verified: true,
  },
  {
    name: 'Surendra Kumar Punia',
    location: 'Family Stay',
    rating: 5,
    tag: 'Warm Staff & Multi-Language Support',
    text: 'My stay at HOTEL SHIVANSH was delightful! The tidy lobby set a welcoming tone, and the large rooms offered plenty of space to relax. It is budget-friendly without compromising comfort. The staff were warm and attentive, providing excellent service with multi-language support.',
    source: 'Verified on Justdial',
    verified: true,
  },
  {
    name: 'Devendra',
    location: 'Group Traveler',
    rating: 5,
    tag: 'Massive Breakfast Spread',
    text: 'HOTEL SHIVANSH is a great place! It has good vibes and feels very nice. The property is excellent, and I had a relaxing stay. The breakfast spread is massive and tasty! They also have good offers for groups. My room was clean and comfortable.',
    source: 'Verified on Justdial',
    verified: true,
  },
  {
    name: 'Nitesh Kumar',
    location: 'Pilgrim & Leisure',
    rating: 5,
    tag: 'Hidden Gem in Sikar',
    text: 'Hotel Shivansh is a hidden gem for leisure stays! Centrally located opposite Roadways Bus Depot. Spacious rooms and exceptional group offers. Friendly staff goes above and beyond to ensure a pleasant stay.',
    source: 'Verified on Justdial',
    verified: true,
  },
];

export default function ReviewsSection() {
  const { openModal } = useModal();
  const [allReviews, setAllReviews] = useState<ReviewItem[]>(justdialReviews);

  useEffect(() => {
    try {
      const saved = localStorage.getItem('shivansh_user_reviews');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          const userFormatted: ReviewItem[] = parsed.map((item: { name: string; city?: string; rating: number; favoriteDish?: string; comment: string }) => ({
            name: item.name,
            location: item.city || 'Verified Guest',
            rating: item.rating || 5,
            tag: item.favoriteDish ? `Loved ${item.favoriteDish}` : 'Verified Guest Review',
            text: item.comment,
            source: 'Guest Review',
            verified: true,
          }));
          setAllReviews([...userFormatted, ...justdialReviews]);
        }
      }
    } catch {}
  }, []);

  return (
    <section className="py-20 sm:py-28 bg-[#080c14] border-t border-[#d4af37]/20 relative overflow-hidden" id="reviews">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-16">
          <span className="inline-flex items-center gap-2 text-xs font-bold tracking-widest text-[#d4af37] bg-[#121c2e] border border-[#d4af37]/30 px-4 py-2 rounded-full uppercase mb-4 shadow-sm">
            <Sparkles size={13} className="text-[#d4af37]" />
            AUTHENTIC GUEST TESTIMONIALS
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4 tracking-tight">
            Rated 5.0 on Justdial
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-transparent via-[#d4af37] to-transparent mx-auto mb-4" />
          <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
            Real experiences from travelers, pilgrims, and families who enjoyed our luxury AC rooms, tidy lobby, and delicious pure vegetarian food in Sikar.
          </p>
        </div>

        {/* Review Highlights Bar */}
        <div className="max-w-3xl mx-auto mb-12 bg-[#0d1522] border border-[#d4af37]/30 rounded-2xl p-4 sm:p-5 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-xl">
          <div className="flex items-center gap-3.5">
            <div className="text-3xl font-black font-serif text-[#d4af37]">5.0</div>
            <div>
              <div className="flex gap-1 text-[#d4af37]">
                {[1, 2, 3, 4, 5].map((s) => (
                  <Star key={s} size={16} className="fill-[#d4af37]" />
                ))}
              </div>
              <span className="text-xs text-slate-300 block mt-0.5">
                Based on <strong>11 Verified Reviews &amp; 55+ Photos</strong> on Justdial
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <a
              href="https://www.justdial.com/Sikar/HOTEL-SHIVANSH-Opposite-Roadways-Bus-Depot-Sikar-Roadlines/9999P1572-1572-251202150053-X6V6_BZDET"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs font-bold text-[#d4af37] hover:text-white border border-[#d4af37]/40 px-3.5 py-2 rounded-xl transition flex items-center gap-1.5 bg-[#121c2e]"
            >
              <span>View Justdial Profile</span>
              <ExternalLink size={12} />
            </a>
            <button
              onClick={() => openModal('reviewForm')}
              className="px-4 py-2 rounded-xl bg-gradient-to-r from-[#d4af37] to-[#aa771c] text-[#080c14] font-bold text-xs flex items-center gap-1.5 shadow-md hover:brightness-110 transition cursor-pointer"
            >
              <PenLine size={13} />
              <span>Write a Review</span>
            </button>
          </div>
        </div>

        {/* Reviews Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {allReviews.map((rev, index) => (
            <div
              key={index}
              className="bg-[#0d1522] border border-[#d4af37]/20 hover:border-[#d4af37] rounded-3xl p-6 sm:p-7 flex flex-col justify-between transition-all duration-300 hover:-translate-y-1 shadow-lg hover:shadow-2xl relative group"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-4">
                  <div className="flex gap-1 text-[#d4af37]">
                    {Array.from({ length: rev.rating }).map((_, i) => (
                      <Star key={i} size={15} className="fill-[#d4af37]" />
                    ))}
                  </div>
                  <span className="text-[10px] font-bold text-[#d4af37] bg-[#d4af37]/10 border border-[#d4af37]/20 px-2.5 py-0.5 rounded-full">
                    {rev.tag}
                  </span>
                </div>

                <p className="text-slate-200 text-xs sm:text-sm leading-relaxed mb-6 italic">
                  &ldquo;{rev.text}&rdquo;
                </p>
              </div>

              <div className="pt-4 border-t border-white/5 flex items-center justify-between">
                <div>
                  <h4 className="font-serif font-bold text-white text-sm sm:text-base">{rev.name}</h4>
                  <span className="text-xs text-slate-400 block">{rev.location}</span>
                </div>
                {rev.verified && (
                  <div className="flex items-center gap-1 text-[11px] text-emerald-400 font-semibold bg-emerald-950/40 border border-emerald-500/30 px-2.5 py-1 rounded-full">
                    <CheckCircle2 size={12} />
                    <span>{rev.source || 'Verified'}</span>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}

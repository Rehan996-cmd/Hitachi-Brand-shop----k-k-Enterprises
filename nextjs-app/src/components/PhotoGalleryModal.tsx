'use client';

import React, { useState } from 'react';
import { useModal } from '@/context/ModalContext';
import { X, ChevronLeft, ChevronRight, Sparkles } from 'lucide-react';

const galleryPhotos = [
  {
    src: '/assets/shivansh_facade.jpg',
    title: 'Hotel Shivansh Grand Exterior & Reception',
    caption: 'Prime location on Salasar Road, Near Sikar Junction Railway Station.',
    tag: 'Property Facade',
  },
  {
    src: '/assets/restaurant_ambiance.jpg',
    title: 'Royal AC Family Dining Hall',
    caption: 'Seating for 120+ patrons with private family booths and quiet executive dining.',
    tag: 'Restaurant',
  },
  {
    src: '/assets/restaurant_thali.jpg',
    title: 'Shivansh Maharaja Special Royal Thali',
    caption: '100% Pure Desi Ghee preparation with Dal Baati Churma, Paneer, Gulab Jamun & Kadhai Roti.',
    tag: 'Chef Signature',
  },
  {
    src: '/assets/dish_paneer.jpg',
    title: 'Shahi Paneer Tikka Masala & Rich Curries',
    caption: 'Fresh Malai paneer simmered in aromatic cashew gravy and whole spices.',
    tag: 'Main Course',
  },
  {
    src: '/assets/dish_starters.jpg',
    title: 'Charcoal Tandoori Platters & Crispy Starters',
    caption: 'Crisp Paneer Tikka, Hara Bhara Kabab & Veg Seekh straight from clay tandoor.',
    tag: 'Tandoor Special',
  },
  {
    src: '/assets/dish_biryani.jpg',
    title: 'Dum Handi Biryani with Burani Raita',
    caption: 'Long-grain Basmati rice slow-dum-cooked with saffron, mint & whole spices.',
    tag: 'Rice Delicacy',
  },
  {
    src: '/assets/room_deluxe.jpg',
    title: 'Royal Deluxe AC Room & Suite',
    caption: 'King-size orthopedic spring mattress, split AC, smart LED TV & 24x7 room service.',
    tag: 'Luxury Stay',
  },
  {
    src: '/assets/room_standard.jpg',
    title: 'Executive Comfort Standard AC Room',
    caption: 'Clean, soundproofed room ideal for pilgrims, travelers and business visitors.',
    tag: 'Comfort Stay',
  },
];

export default function PhotoGalleryModal() {
  const { activeModal, modalData, closeModal } = useModal();
  const initialIndex = typeof modalData.photoIndex === 'number' ? modalData.photoIndex : 0;
  const [currentIndex, setCurrentIndex] = useState(initialIndex);

  if (activeModal !== 'gallery') return null;

  const currentPhoto = galleryPhotos[currentIndex] || galleryPhotos[0];

  const handleNext = () => {
    setCurrentIndex((currentIndex + 1) % galleryPhotos.length);
  };

  const handlePrev = () => {
    setCurrentIndex((currentIndex - 1 + galleryPhotos.length) % galleryPhotos.length);
  };

  return (
    <div
      className="fixed inset-0 z-[1000] bg-black/95 backdrop-blur-md flex flex-col justify-between p-4 sm:p-6 animate-fadeIn"
      onClick={e => { if (e.target === e.currentTarget) closeModal(); }}
    >
      {/* Top Header */}
      <div className="flex items-center justify-between z-10">
        <div className="flex items-center gap-2.5">
          <span className="w-2.5 h-2.5 rounded-full bg-[#d4af37] animate-pulse" />
          <h3 className="font-serif text-white font-bold text-sm sm:text-base tracking-wide">
            Hotel Shivansh • High-Res Photo Lightbox
          </h3>
          <span className="text-xs text-[#d4af37] bg-[#d4af37]/15 border border-[#d4af37]/30 px-2.5 py-0.5 rounded-full font-mono">
            {currentIndex + 1} / {galleryPhotos.length}
          </span>
        </div>
        <button
          onClick={closeModal}
          className="w-10 h-10 rounded-full bg-[#101728] border border-[#d4af37]/30 text-slate-300 hover:text-white transition flex items-center justify-center cursor-pointer"
          aria-label="Close Lightbox"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Main Image Viewport with Next/Prev controls */}
      <div className="relative flex-1 flex items-center justify-center my-4 overflow-hidden">
        <button
          onClick={handlePrev}
          className="absolute left-2 sm:left-6 z-20 w-11 h-11 rounded-full bg-[#080c14]/80 border border-[#d4af37]/40 text-white hover:bg-[#d4af37] hover:text-[#080c14] transition flex items-center justify-center cursor-pointer shadow-lg"
          aria-label="Previous image"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>

        <div className="max-w-4xl max-h-[70vh] flex flex-col items-center">
          <img
            src={currentPhoto.src}
            alt={currentPhoto.title}
            className="max-h-[60vh] max-w-full object-contain rounded-2xl border border-[#d4af37]/35 shadow-[0_20px_60px_rgba(0,0,0,0.9)]"
          />
          <div className="text-center mt-3 max-w-xl">
            <span className="text-[10px] sm:text-xs font-bold uppercase tracking-widest text-[#d4af37] flex items-center justify-center gap-1 mb-1">
              <Sparkles className="w-3 h-3" />
              {currentPhoto.tag}
            </span>
            <h4 className="text-base sm:text-lg font-serif font-black text-white">{currentPhoto.title}</h4>
            <p className="text-xs text-slate-300 mt-1">{currentPhoto.caption}</p>
          </div>
        </div>

        <button
          onClick={handleNext}
          className="absolute right-2 sm:right-6 z-20 w-11 h-11 rounded-full bg-[#080c14]/80 border border-[#d4af37]/40 text-white hover:bg-[#d4af37] hover:text-[#080c14] transition flex items-center justify-center cursor-pointer shadow-lg"
          aria-label="Next image"
        >
          <ChevronRight className="w-6 h-6" />
        </button>
      </div>

      {/* Thumbnails Row */}
      <div className="flex gap-2.5 overflow-x-auto py-2 justify-center shrink-0">
        {galleryPhotos.map((photo, idx) => (
          <button
            key={idx}
            onClick={() => setCurrentIndex(idx)}
            className={`relative rounded-xl overflow-hidden shrink-0 w-16 h-12 sm:w-20 sm:h-14 border-2 transition-all cursor-pointer ${
              currentIndex === idx
                ? 'border-[#d4af37] scale-105 shadow-[0_0_12px_#d4af37]'
                : 'border-transparent opacity-50 hover:opacity-100'
            }`}
          >
            <img src={photo.src} alt={photo.title} className="w-full h-full object-cover" />
          </button>
        ))}
      </div>
    </div>
  );
}

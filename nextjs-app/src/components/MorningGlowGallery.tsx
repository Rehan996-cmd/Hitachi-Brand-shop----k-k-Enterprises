'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';

interface GalleryPhoto {
  src: string;
  alt: string;
}

const photos: GalleryPhoto[] = [
  { src: '/1.jpeg', alt: 'Cozy interior' },
  { src: '/2.jpeg', alt: 'Artisan coffee' },
  { src: '/3.jpeg', alt: 'Fresh toasts' },
  { src: '/4.jpeg', alt: 'Morning vibes' },
  { src: '/5.jpeg', alt: 'Coffee corner' },
  { src: '/6.jpeg', alt: 'Warm atmosphere' },
  { src: '/7.jpeg', alt: 'Signature drinks' },
  { src: '/8.jpeg', alt: 'Our space' },
];

export default function MorningGlowGallery() {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (selectedIndex === null) return;
      if (e.key === 'Escape') setSelectedIndex(null);
      if (e.key === 'ArrowLeft') setSelectedIndex((selectedIndex - 1 + photos.length) % photos.length);
      if (e.key === 'ArrowRight') setSelectedIndex((selectedIndex + 1) % photos.length);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedIndex]);

  return (
    <section className="py-24 bg-background">
      <div className="text-center mb-16">
        <h2 className="text-4xl md:text-5xl font-display mb-4 text-text">
          Capturing the Vibe
        </h2>
        <p className="text-muted">A glimpse into our daily craft</p>
      </div>

      <div className="py-20 relative z-10 bg-background overflow-hidden">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-20">
            <span className="text-xs tracking-[0.5em] uppercase text-accent mb-6 block font-bold">
              The Canvas
            </span>
            <h2 className="text-5xl md:text-7xl lg:text-8xl font-display text-text mb-8 tracking-tighter">
              Morning <span className="italic font-light">Glow</span>
            </h2>
            <p className="text-muted/70 text-lg max-w-2xl mx-auto leading-relaxed font-light">
              Every snapshot captured here represents a moment of pure culinary dedication and local warmth.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            {photos.map((photo, idx) => (
              <div
                key={photo.src}
                className="relative aspect-[4/5] overflow-hidden rounded-[1.5rem] group cursor-pointer glass border-white/5"
                onClick={() => setSelectedIndex(idx)}
              >
                <div className="relative w-full h-full transform transition-transform duration-1000 group-hover:scale-110">
                  <Image
                    src={photo.src}
                    alt={photo.alt}
                    fill
                    className="object-cover saturate-[0.7] group-hover:saturate-100 transition-all duration-700"
                    sizes="(max-width: 768px) 50vw, 33vw"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent opacity-40 group-hover:opacity-60 transition-opacity duration-500" />
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500">
                    <div className="w-12 h-12 rounded-full bg-accent text-background flex items-center justify-center scale-75 group-hover:scale-100 transition-transform duration-500 shadow-lg">
                      <svg
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7" />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Lightbox Modal */}
      {selectedIndex !== null && (
        <div
          className="fixed inset-0 z-[100] bg-background/95 backdrop-blur-xl flex items-center justify-center p-6 animate-fade-in-up"
          onClick={() => setSelectedIndex(null)}
        >
          <button
            className="absolute top-10 right-10 z-10 w-14 h-14 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-text hover:bg-accent hover:text-background transition-all"
            onClick={() => setSelectedIndex(null)}
            aria-label="Close lightbox"
          >
            <X size={24} />
          </button>

          <div
            className="relative w-full max-w-5xl aspect-video rounded-3xl overflow-hidden shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={photos[selectedIndex].src}
              alt={photos[selectedIndex].alt}
              fill
              className="object-contain"
              sizes="100vw"
              priority
            />
          </div>

          <div
            className="absolute bottom-10 left-1/2 -translate-x-1/2 flex items-center gap-6"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setSelectedIndex((selectedIndex - 1 + photos.length) % photos.length)}
              className="w-12 h-12 rounded-full glass flex items-center justify-center hover:bg-accent hover:text-background transition-all text-text"
              aria-label="Previous image"
            >
              <ChevronLeft size={20} />
            </button>
            <span className="text-accent font-display italic text-lg select-none">
              {selectedIndex + 1} / {photos.length}
            </span>
            <button
              onClick={() => setSelectedIndex((selectedIndex + 1) % photos.length)}
              className="w-12 h-12 rounded-full glass flex items-center justify-center hover:bg-accent hover:text-background transition-all text-text"
              aria-label="Next image"
            >
              <ChevronRight size={20} />
            </button>
          </div>
        </div>
      )}
    </section>
  );
}

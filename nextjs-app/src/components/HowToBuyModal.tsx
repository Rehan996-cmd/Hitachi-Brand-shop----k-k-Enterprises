'use client';

import { useState } from 'react';
import { usePathname } from 'next/navigation';
import { X, MapPin } from 'lucide-react';

export default function HowToBuyModal() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  if (pathname.startsWith('/admin')) {
    return null;
  }

  return (
    <>
      {/* Floating Trigger Button */}
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-8 right-8 z-[90] glass-button bg-surface border-accent/30 text-accent hover:border-accent hover:bg-accent/10 shadow-[0_4px_20px_rgba(200,169,110,0.15)] flex items-center gap-2"
        aria-label="How to Buy"
      >
        <span className="font-display tracking-widest text-sm">How to Buy?</span>
      </button>

      {/* Modal Dialog */}
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 animate-fade-in-up">
          {/* Backdrop */}
          <div
            onClick={() => setIsOpen(false)}
            className="absolute inset-0 bg-background/80 backdrop-blur-sm cursor-pointer"
          />

          {/* Modal Container */}
          <div
            className="relative w-full max-w-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="glass p-8 relative overflow-hidden bg-[#0f120d] border border-accent/30 shadow-2xl rounded-3xl">
              <button
                onClick={() => setIsOpen(false)}
                className="absolute top-6 right-6 text-muted hover:text-text transition-colors"
                aria-label="Close modal"
              >
                <X size={24} />
              </button>

              <div className="text-center mb-10">
                <h2 className="text-3xl font-display mb-2 text-text">How to Buy?</h2>
                <p className="text-muted">Choose how you&apos;d like to experience Coffee &amp; Toast</p>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                {/* Option 1: In-Store */}
                <a
                  href="https://www.google.com/maps/search/Coffee+and+Toast+Café+Sikar+Rajasthan"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block group"
                >
                  <div className="h-full p-8 rounded-2xl bg-surface border border-surface-border transition-all duration-300 group-hover:border-accent/50 group-hover:bg-accent/5 group-hover:shadow-[0_0_30px_rgba(200,169,110,0.15)]">
                    <div className="w-12 h-12 rounded-full bg-accent/20 flex items-center justify-center text-accent mb-6 group-hover:scale-110 transition-transform">
                      <MapPin size={24} />
                    </div>
                    <h3 className="text-xl font-display mb-2 flex items-center gap-2 text-text">
                      Visit Our Store <span className="text-accent">&rarr;</span>
                    </h3>
                    <p className="text-sm text-muted">Come to our store.</p>
                  </div>
                </a>

                {/* Option 2: Zomato Online */}
                <a
                  href="https://www.zomato.com/sikar/coffee-toast-sikar-locality/order"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block group"
                >
                  <div className="h-full p-8 rounded-2xl bg-surface border border-surface-border transition-all duration-300 group-hover:border-accent/50 group-hover:bg-accent/5 group-hover:shadow-[0_0_30px_rgba(200,169,110,0.15)]">
                    <div className="w-12 h-12 rounded-full bg-accent/20 flex items-center justify-center text-accent mb-6 group-hover:scale-110 transition-transform">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <circle cx="18.5" cy="17.5" r="3.5" />
                        <circle cx="5.5" cy="17.5" r="3.5" />
                        <circle cx="15" cy="5" r="1" />
                        <path d="M12 17.5V14l-3-3 4-3 2 3h2" />
                      </svg>
                    </div>
                    <h3 className="text-xl font-display mb-2 flex items-center gap-2 text-text">
                      Order online <span className="text-accent">&rarr;</span>
                    </h3>
                    <p className="text-sm text-muted">Get orders delivered at your doorstep.</p>
                  </div>
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

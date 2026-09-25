'use client';

import Link from 'next/link';
import Image from 'next/image';

const points = [
  'Freshly brewed specialty coffee',
  'Handcrafted toasts & sandwiches',
  'Warm, welcoming dine-in',
  'Located in Sikar, Rajasthan',
];

export default function Legacy() {
  return (
    <section className="py-32 relative overflow-hidden bg-background">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col lg:flex-row rounded-[2rem] overflow-hidden glass border-white/5 shadow-2xl">
          {/* Crafting Image Side */}
          <div className="w-full lg:w-1/2 min-h-[400px] lg:min-h-[600px] relative overflow-hidden">
            <div className="overflow-hidden absolute inset-0 h-full w-full lg:h-[120%] lg:-top-[10%]">
              <div className="h-full w-full relative">
                <Image
                  src="/3.jpeg"
                  alt="Coffee & Toast Crafting"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                  loading="lazy"
                />
              </div>
            </div>
            <div className="absolute inset-0 bg-background/30 mix-blend-multiply" />
          </div>

          {/* Legacy Information Side */}
          <div className="w-full lg:w-1/2 p-12 md:p-20 flex flex-col justify-center bg-[#11140e]">
            <div>
              <span className="text-xs tracking-[0.4em] uppercase text-accent font-bold mb-6 block">
                Our Legacy
              </span>
              <h2 className="text-4xl md:text-5xl font-display text-text mb-8 leading-[1.1]">
                Crafting <span className="italic font-light">Moments</span> <br />
                One Cup at a Time.
              </h2>
              <p className="text-muted/90 text-lg leading-relaxed mb-10 font-light">
                Our cafe serves a delicious Paneer Bhurji Sandwich with perfectly spiced, flavorful, soft, and moist paneer. Our food is of great quality, budget-friendly, and satisfying. People also like the warm, cozy atmosphere and attentive staff.
              </p>

              <ul className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm text-text/80 mb-10">
                {points.map((pt, idx) => (
                  <li key={idx} className="flex items-center gap-4 group">
                    <div className="w-1.5 h-1.5 rounded-full bg-accent group-hover:scale-150 transition-transform" />
                    <span>{pt}</span>
                  </li>
                ))}
              </ul>

              <Link
                href="/menu"
                className="w-fit px-8 py-3 border border-accent/20 rounded-full hover:bg-accent hover:text-background transition-all duration-500 font-medium"
              >
                View Complete Menu
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

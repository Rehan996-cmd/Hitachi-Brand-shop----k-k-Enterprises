'use client';

import { Coffee, Sunrise, Clock, UtensilsCrossed } from 'lucide-react';

const features = [
  {
    icon: <Coffee size={32} />,
    title: 'Specialty Beans',
    desc: 'Ethically sourced, single-origin beans roasted to perfection.',
  },
  {
    icon: <Sunrise size={32} />,
    title: 'Artisan Toasts',
    desc: 'Golden crusts, handcrafted daily with premium toppings.',
  },
  {
    icon: <Clock size={32} />,
    title: 'Endless Brunch',
    desc: 'Premium breakfast classics served throughout the day.',
  },
  {
    icon: <UtensilsCrossed size={32} />,
    title: 'Cinematic Space',
    desc: 'A warm, moody atmosphere designed for reflection & connection.',
  },
];

export default function Features() {
  return (
    <section id="features-section" className="py-32 relative z-10 bg-background">
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="sr-only">Our Core Features</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((item, idx) => (
            <div key={idx}>
              <div className="glass glass-hover p-12 h-full flex flex-col items-center text-center group bg-[#11140e]/40 border-white/5 hover:bg-accent/5 transition-colors duration-700">
                <div className="w-20 h-20 rounded-full bg-white/5 flex items-center justify-center text-accent mb-10 group-hover:scale-110 group-hover:rotate-[15deg] group-hover:bg-accent/20 transition-all duration-700 ease-out">
                  {item.icon}
                </div>
                <h3 className="text-2xl font-display text-text mb-4 tracking-tight group-hover:text-accent transition-colors duration-500">
                  {item.title}
                </h3>
                <p className="text-muted leading-relaxed font-light">
                  {item.desc}
                </p>
                <div className="mt-8 w-8 h-[1px] bg-accent/20 group-hover:w-16 transition-all duration-500" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

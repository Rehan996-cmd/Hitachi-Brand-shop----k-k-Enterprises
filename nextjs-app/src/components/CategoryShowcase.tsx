'use client';

import { useRef, useState, MouseEvent } from 'react';
import Link from 'next/link';
import Image from 'next/image';

interface CategoryItem {
  title: string;
  description: string;
  image: string;
  accent: string;
  href: string;
}

const categories: CategoryItem[] = [
  {
    title: 'Sweet Bites',
    description: 'Enjoy our fresh cakes, pastries, and delicious sweet treats made with love.',
    image: '/category-dessert.webp',
    accent: 'text-accent',
    href: '/menu?category=desserts',
  },
  {
    title: 'Coffee & Shakes',
    description: 'Try our fresh coffee, cold shakes, and hot drinks to refresh your day.',
    image: '/category-beverage.webp',
    accent: 'text-accent',
    href: '/menu?category=beverages',
  },
  {
    title: 'Pizzas & Burgers',
    description: 'Tasty burgers, hot pizzas, and more, served fresh from our kitchen.',
    image: '/category-fastfood.webp',
    accent: 'text-accent',
    href: '/menu?category=fast-food',
  },
];

function CategoryRow({ category, index }: { category: CategoryItem; index: number }) {
  const isEven = index % 2 === 0;
  const cardRef = useRef<HTMLDivElement>(null);
  const [transformStyle, setTransformStyle] = useState<string>('perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)');

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (typeof window !== 'undefined' && window.innerWidth < 1024) return;
    const card = cardRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const rotateY = 8 * (x / rect.width - 0.5);
    const rotateX = -8 * (y / rect.height - 0.5);
    setTransformStyle(`perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.01, 1.01, 1.01)`);
  };

  const handleMouseLeave = () => {
    setTransformStyle('perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)');
  };

  return (
    <div className="min-h-screen flex items-center relative overflow-hidden py-24 lg:py-32">
      <div className="max-w-7xl mx-auto px-6 w-full">
        <div
          className={`flex flex-col ${
            isEven ? 'lg:flex-row' : 'lg:flex-row-reverse'
          } items-center gap-12 lg:gap-32`}
        >
          {/* Visual Showcase Card */}
          <div className="w-full lg:w-1/2 perspective-1000">
            <div
              ref={cardRef}
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
              style={{ transform: transformStyle, transition: 'transform 0.2s cubic-bezier(0.2, 0, 0.4, 1)' }}
              className="relative aspect-[4/5] group overflow-hidden rounded-[2rem] lg:rounded-[2.5rem] glass border-white/5 shadow-2xl transform-gpu cursor-pointer"
            >
              <div className="absolute inset-0 -top-[5%] lg:-top-[10%] h-[110%] lg:h-[120%]">
                <Image
                  src={category.image}
                  alt={category.title}
                  fill
                  className="object-cover scale-105 lg:scale-110 transition-transform duration-1000 group-hover:scale-115 saturate-[0.8] brightness-[0.9]"
                  sizes="(max-width: 768px) 100vw, 50vw"
                  loading="lazy"
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent opacity-80" />
              <div className="absolute bottom-10 left-10 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                <span className="text-white font-display text-2xl italic">
                  Explore {category.title}
                </span>
              </div>
            </div>
          </div>

          {/* Text Content */}
          <div className="w-full lg:w-1/2">
            <span className="text-xs tracking-[0.5em] uppercase text-accent mb-8 block font-bold">
              Section {index + 1}
            </span>
            <h2 className="text-5xl md:text-7xl lg:text-8xl font-display text-text mb-10 leading-[0.9] tracking-tighter">
              {category.title.split(' ').map((word, wIdx) => (
                <span
                  key={wIdx}
                  className={word === '&' ? 'text-accent' : ''}
                >
                  {word}{' '}
                </span>
              ))}
            </h2>
            <p className="text-muted text-lg md:text-xl leading-relaxed mb-12 max-w-xl font-light">
              {category.description}
            </p>
            <Link
              href={category.href}
              className="group relative inline-flex items-center gap-6 overflow-hidden"
            >
              <div className="w-16 h-16 rounded-full border border-accent/30 flex items-center justify-center group-hover:bg-accent transition-all duration-500">
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-accent group-hover:text-background transition-colors transform group-hover:translate-x-1"
                >
                  <line x1="5" y1="12" x2="19" y2="12" />
                  <polyline points="12 5 19 12 12 19" />
                </svg>
              </div>
              <span className="text-sm tracking-[0.3em] uppercase font-bold group-hover:text-accent transition-colors">
                View Collection
              </span>
            </Link>
          </div>
        </div>
      </div>

      {/* Ambient Radial Backlight */}
      <div
        className={`absolute -z-10 top-1/2 ${
          isEven ? '-right-1/4' : '-left-1/4'
        } -translate-y-1/2 w-1/2 h-1/2 bg-accent/5 blur-[150px] rounded-full`}
      />
    </div>
  );
}

export default function CategoryShowcase() {
  return (
    <section className="bg-background">
      {categories.map((cat, idx) => (
        <CategoryRow key={cat.title} category={cat} index={idx} />
      ))}
    </section>
  );
}

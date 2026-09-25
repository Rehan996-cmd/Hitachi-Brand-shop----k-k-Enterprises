'use client';

import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { MapPin } from 'lucide-react';

export default function Navbar() {
  const pathname = usePathname();
  const isHome = pathname === '/';
  const isMenu = pathname.startsWith('/menu');

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50 px-6 py-6 transition-all duration-300 pointer-events-none"
      aria-label="Main navigation"
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between pointer-events-auto">
        <div className="glass !rounded-full px-6 py-3 flex items-center justify-between w-full border-white/5 shadow-2xl backdrop-blur-2xl">
          <Link
            className="flex items-center gap-3 group"
            aria-label="Coffee & Toast Café Home"
            href="/"
          >
            <div className="relative w-10 h-10 transform transition-transform duration-500 group-hover:rotate-[360deg]">
              <Image
                alt="Coffee & Toast Café"
                fill
                className="object-cover rounded-full border border-accent/20"
                sizes="(max-width: 768px) 100px, 200px"
                src="/logo.jpg"
                priority
              />
            </div>
            <span className="font-display font-medium text-xl tracking-tighter hidden sm:block text-text">
              Coffee &amp; Toast
            </span>
          </Link>

          <div className="flex gap-8 items-center">
            <Link
              className={`text-[10px] tracking-[0.3em] uppercase font-bold transition-all relative group ${
                isHome ? 'text-accent' : 'text-muted hover:text-text'
              }`}
              href="/"
            >
              Home
              <span
                className={`absolute -bottom-1 left-0 h-[1px] bg-accent transition-all duration-300 ${
                  isHome ? 'w-full' : 'w-0 group-hover:w-full'
                }`}
              />
            </Link>

            <Link
              className={`text-[10px] tracking-[0.3em] uppercase font-bold transition-all relative group ${
                isMenu ? 'text-accent' : 'text-muted hover:text-text'
              }`}
              href="/menu"
            >
              Menu
              <span
                className={`absolute -bottom-1 left-0 h-[1px] bg-accent transition-all duration-300 ${
                  isMenu ? 'w-full' : 'w-0 group-hover:w-full'
                }`}
              />
            </Link>

            <a
              href="https://www.google.com/maps/search/Coffee+and+Toast+Café+Sikar+Rajasthan"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-[10px] tracking-[0.3em] uppercase font-bold text-muted hover:text-accent transition-all bg-white/5 hover:bg-accent/10 px-4 py-2 rounded-full border border-white/5 hover:border-accent/20"
              aria-label="Find us on Google Maps"
            >
              <MapPin size={12} className="text-accent" />
              <span className="hidden md:inline">Find Us</span>
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
}

'use client';

import React from 'react';
import { useModal } from '@/context/ModalContext';
import { BedDouble, Check, Phone, MessageSquare, Sparkles, Star } from 'lucide-react';

export default function RoomsShowcaseSection() {
  const { openModal } = useModal();
  const rooms = [
    {
      id: 'deluxe',
      title: 'Deluxe AC Executive King Room',
      image: '/assets/room_deluxe.jpg',
      badge: 'Starts at ₹1,999/night (Justdial Featured)',
      price: '₹1,999',
      oldPrice: '₹2,500',
      description: 'Spacious royal room with plush King-size spring mattress, silent split air-conditioner, ambient warm lighting, 43" Smart TV, sanitized bathroom with hot geyser, and 24x7 in-room dining.',
      amenities: ['King Spring Bed', 'Split AC', 'Free High-Speed Wi-Fi', '24x7 Room Service', 'Hot Water Geyser', 'Electric Kettle'],
    },
    {
      id: 'standard',
      title: 'Standard Comfort AC Double Room',
      image: '/assets/room_standard.jpg',
      badge: 'Best Value Stay',
      price: '₹1,499',
      oldPrice: '₹1,999',
      description: 'Cozy and modern air-conditioned accommodation with queen bed, crisp fresh linens, sanitized private bathroom, high-speed WiFi, power backup, and direct priority room service.',
      amenities: ['Queen Bed', 'Split AC', 'Free Wi-Fi', 'Sanitized Linen', 'Room Service', 'Power Backup'],
    },
  ];

  const handleBookRoom = (roomTitle: string) => {
    const text = encodeURIComponent(
      `Hello Hotel Shivansh! I would like to inquire about booking a room:\n\n` +
      `Room Type: ${roomTitle}\n` +
      `Location: Opposite Roadways Bus Depot, Sikar\n` +
      `Check-in Date: \n` +
      `Number of Guests: \n\n` +
      `Please let me know room availability and best corporate/family tariff.`
    );
    window.open(`https://wa.me/919460624455?text=${text}`, '_blank');
  };

  return (
    <section className="py-16 sm:py-24 bg-[#080c14] border-t border-[#d4af37]/20 relative overflow-hidden" id="rooms">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <span className="inline-flex items-center gap-2 text-xs font-bold tracking-widest text-[#d4af37] bg-[#121c2e] border border-[#d4af37]/30 px-4 py-2 rounded-full uppercase mb-4 shadow-sm">
            <BedDouble className="w-3.5 h-3.5 text-[#d4af37]" />
            <span>Luxury AC Stay &amp; 24x7 Service</span>
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white mb-4 leading-tight">
            Hotel Shivansh Rooms &amp; Suites
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-transparent via-[#d4af37] to-transparent mx-auto mb-4" />
          <p className="text-slate-300 text-sm sm:text-base leading-relaxed max-w-2xl mx-auto">
            Rated 5.0 on Justdial. Located right opposite Roadways Bus Depot in Sikar. Experience sanitized AC rooms, high-speed Wi-Fi, and 24x7 hot kitchen food delivered straight to your bed.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-10 max-w-6xl mx-auto">
          {rooms.map(room => (
            <div
              key={room.id}
              className="bg-[#0d1522] border border-[#d4af37]/30 rounded-3xl overflow-hidden shadow-xl hover:border-[#d4af37] transition-all duration-300 flex flex-col group hover:shadow-2xl"
            >
              <div
                onClick={() => openModal('gallery', { photoIndex: room.id === 'deluxe' ? 6 : 7 })}
                className="relative h-64 sm:h-80 w-full overflow-hidden bg-slate-900 cursor-pointer"
                title="Click to zoom room photo"
              >
                <img
                  src={room.image}
                  alt={room.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <span className="absolute top-4 left-4 bg-gradient-to-r from-[#d4af37] to-[#aa771c] text-[#080c14] font-bold text-xs px-3.5 py-1.5 rounded-full shadow-lg flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-[#080c14]" />
                  {room.badge}
                </span>
                <div className="absolute bottom-4 right-4 bg-[#080c14]/90 backdrop-blur-md px-4 py-2 rounded-2xl border border-[#d4af37]/40 text-right shadow-lg">
                  <span className="text-[10px] text-slate-400 font-bold block leading-none">Starting From</span>
                  <div className="flex items-baseline gap-1.5 mt-1">
                    <span className="font-serif text-xl sm:text-2xl font-black text-[#d4af37]">{room.price}</span>
                    <span className="text-xs text-slate-400 font-medium">/ night</span>
                  </div>
                  <span className="text-[10px] text-slate-500 line-through">Regular {room.oldPrice}</span>
                </div>
              </div>

              <div className="p-6 sm:p-8 lg:p-9 flex flex-col flex-1">
                <div className="flex items-center justify-between gap-2 mb-3">
                  <h3 className="font-serif font-bold text-xl sm:text-2xl text-white group-hover:text-[#d4af37] transition">{room.title}</h3>
                </div>

                <p className="text-slate-300 text-xs sm:text-sm leading-relaxed mb-6 flex-1">
                  {room.description}
                </p>

                <div className="mb-8">
                  <span className="text-xs font-bold text-[#d4af37] uppercase tracking-wider block mb-3">
                    Included Amenities:
                  </span>
                  <div className="grid grid-cols-2 gap-2.5">
                    {room.amenities.map((amenity, idx) => (
                      <div key={idx} className="flex items-center gap-2 text-xs text-slate-200">
                        <div className="w-4 h-4 rounded-full bg-[#121c2e] border border-[#d4af37]/40 flex items-center justify-center shrink-0">
                          <Check size={10} className="text-[#d4af37]" />
                        </div>
                        <span>{amenity}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 mt-auto">
                  <div className="flex items-center gap-2 text-xs text-slate-400">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                    <span>Check-in 24/7 Available</span>
                  </div>

                  <div className="flex items-center gap-3 w-full sm:w-auto">
                    <button
                      onClick={() => handleBookRoom(room.title)}
                      className="flex-1 sm:flex-initial px-5 py-3 rounded-xl bg-gradient-to-r from-[#d4af37] to-[#aa771c] text-[#080c14] font-black text-xs flex items-center justify-center gap-2 shadow-md hover:brightness-110 transition cursor-pointer"
                    >
                      <MessageSquare size={14} />
                      <span>WhatsApp Book</span>
                    </button>
                    <a
                      href="tel:+919460624455"
                      className="px-4 py-3 rounded-xl bg-[#121c2e] hover:bg-[#1a2842] border border-[#d4af37]/40 text-slate-200 font-bold text-xs flex items-center justify-center gap-1.5 transition"
                      title="Direct Call Desk"
                    >
                      <Phone size={14} className="text-[#d4af37]" />
                      <span>Call Desk</span>
                    </a>
                  </div>
                </div>

              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}

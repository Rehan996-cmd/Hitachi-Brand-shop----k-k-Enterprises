'use client';

import React, { useState } from 'react';
import { useModal } from '@/context/ModalContext';
import { sound } from '@/lib/sound';
import {
  CalendarDays, Sparkles, PartyPopper, MessageSquare, CheckCircle2,
  Users, Clock, UtensilsCrossed, Check, Crown, QrCode
} from 'lucide-react';

export default function TableReservationSection() {
  const { showToast } = useModal();
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    guests: '4 Guests (Family)',
    date: new Date().toISOString().split('T')[0],
    time: '8:00 PM (Dinner)',
    section: 'Main Royal AC Dining Hall',
    occasion: 'Dinner with Family',
    notes: '',
  });

  const [isBooked, setIsBooked] = useState(false);
  const [bookingRef, setBookingRef] = useState('');

  const guestOptions = ['2 Guests (Couple)', '4 Guests (Family)', '6 Guests', '8-10 Guests', '15+ Grand Banquet'];
  const sections = ['Main Royal AC Dining Hall', 'Heritage Family Booth', 'Quiet Executive Corner', 'VIP Private Lounge'];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.phone.trim()) {
      showToast('Please enter your name and phone number.');
      return;
    }
    const ref = `RES-${Math.floor(1000 + Math.random() * 9000)}`;
    setBookingRef(ref);
    setIsBooked(true);
    sound.playSuccess();
    showToast(`Table booked successfully! Ref: ${ref}`);
  };

  const openWhatsApp = () => {
    const text = encodeURIComponent(
      `Hello Hotel Shivansh! I would like to confirm my table reservation:\n\n` +
      `Booking Ref: ${bookingRef}\n` +
      `Name: ${formData.name}\n` +
      `Phone: ${formData.phone}\n` +
      `Guests: ${formData.guests}\n` +
      `Date: ${formData.date} at ${formData.time}\n` +
      `Section: ${formData.section}\n` +
      `Occasion: ${formData.occasion}\n` +
      (formData.notes ? `Note: ${formData.notes}\n` : '') +
      `\nPlease confirm our table availability.`
    );
    window.open(`https://wa.me/919460624455?text=${text}`, '_blank');
  };

  return (
    <section className="py-16 sm:py-24 bg-[#080c14] border-t border-[#d4af37]/20 relative overflow-hidden" id="reservation">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
          
          {/* Left Column: Live VIP Pass Preview & Info */}
          <div className="lg:col-span-5 flex flex-col">
            <div className="inline-flex items-center gap-2 bg-[#121c2e] border border-[#d4af37]/30 text-[#d4af37] px-4 py-2 rounded-full text-xs font-bold uppercase tracking-widest mb-4 w-fit">
              <CalendarDays className="w-3.5 h-3.5 text-[#d4af37]" />
              <span>Royal Dining Concierge</span>
            </div>
            
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white mb-3 leading-tight">
              Reserve Your Table
            </h2>
            <div className="w-20 h-1 bg-gradient-to-r from-transparent via-[#d4af37] to-transparent mb-5" />
            
            <p className="text-slate-300 text-xs sm:text-sm leading-relaxed mb-6">
              Experience warm Rajasthani hospitality in our spacious air-conditioned restaurant in Sikar. Zero cover charge and guaranteed priority table upon arrival.
            </p>

            {/* Live Interactive VIP Seating Pass Ticket */}
            <div className="relative bg-gradient-to-br from-[#0f172a] via-[#131d33] to-[#0a0f1d] border-2 border-[#d4af37]/60 rounded-3xl p-6 shadow-[0_15px_40px_rgba(0,0,0,0.85)] mb-6 overflow-hidden group">
              {/* Gold decorative borders */}
              <div className="absolute top-2 left-2 right-2 bottom-2 border border-[#d4af37]/20 rounded-2xl pointer-events-none" />
              
              <div className="flex items-center justify-between pb-4 border-b border-[#d4af37]/30 mb-4">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-[#d4af37] to-[#aa771c] flex items-center justify-center text-[#080c14] shadow">
                    <Crown size={16} />
                  </div>
                  <div>
                    <span className="font-serif font-black text-xs sm:text-sm text-white block leading-tight">HOTEL SHIVANSH</span>
                    <span className="text-[9px] font-bold text-[#d4af37] tracking-widest uppercase">VIP SEATING PASS</span>
                  </div>
                </div>
                <span className="text-[10px] font-mono bg-[#d4af37]/20 border border-[#d4af37]/40 text-[#f3e8b1] px-2.5 py-1 rounded-md font-bold">
                  {bookingRef || 'PREVIEW PASS'}
                </span>
              </div>

              <div className="space-y-2.5 text-xs text-slate-300 relative z-10">
                <div className="flex justify-between">
                  <span className="text-slate-400">Patron Name:</span>
                  <strong className="text-white font-bold">{formData.name || 'Honorable Guest'}</strong>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Date &amp; Time:</span>
                  <strong className="text-[#d4af37]">{formData.date} · {formData.time}</strong>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Party Size:</span>
                  <strong className="text-white">{formData.guests}</strong>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Hall Section:</span>
                  <strong className="text-[#f3e8b1] text-right max-w-[200px] truncate">{formData.section}</strong>
                </div>
              </div>

              <div className="mt-4 pt-3.5 border-t border-[#d4af37]/25 flex items-center justify-between text-[11px] text-slate-400">
                <span className="flex items-center gap-1.5 text-emerald-400 font-bold">
                  <CheckCircle2 size={13} />
                  Zero Cover Charge
                </span>
                <span className="flex items-center gap-1 text-[#d4af37]">
                  <QrCode size={14} />
                  Instant Desk Scan
                </span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3 text-xs text-slate-300">
              <div className="bg-[#0d1522] rounded-2xl p-3.5 border border-[#d4af37]/30 shadow-md flex items-center gap-3">
                <div className="w-8 h-8 rounded-xl bg-amber-950/60 border border-amber-500/30 flex items-center justify-center shrink-0">
                  <Sparkles className="w-4 h-4 text-[#d4af37]" />
                </div>
                <div>
                  <strong className="block text-white font-bold text-xs">Priority Seating</strong>
                  <span className="text-slate-400 text-[10px]">No waiting upon arrival</span>
                </div>
              </div>
              
              <div className="bg-[#0d1522] rounded-2xl p-3.5 border border-[#d4af37]/30 shadow-md flex items-center gap-3">
                <div className="w-8 h-8 rounded-xl bg-rose-950/60 border border-rose-500/30 flex items-center justify-center shrink-0">
                  <PartyPopper className="w-4 h-4 text-rose-400" />
                </div>
                <div>
                  <strong className="block text-white font-bold text-xs">Celebrations</strong>
                  <span className="text-slate-400 text-[10px]">Special table setup</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Booking Form */}
          <div className="lg:col-span-7">
            <div className="bg-[#0d1522] border border-[#d4af37]/40 rounded-3xl p-6 sm:p-8 lg:p-9 shadow-2xl transition-colors">
              
              {!isBooked ? (
                <form onSubmit={handleSubmit} className="flex flex-col gap-4 sm:gap-5">
                  <div className="border-b border-[#d4af37]/20 pb-4 mb-1">
                    <h3 className="font-serif text-xl sm:text-2xl font-bold text-white flex items-center gap-2.5">
                      <UtensilsCrossed className="w-5 h-5 text-[#d4af37]" />
                      <span>Book Royal Table Online</span>
                    </h3>
                    <p className="text-slate-400 text-xs sm:text-sm mt-1">Instant confirmation &amp; priority seating upon arrival.</p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-300 mb-1.5">Your Full Name *</label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Vikram Singh Rathore"
                        value={formData.name}
                        onChange={e => setFormData({ ...formData, name: e.target.value })}
                        className="w-full bg-[#121c2e] border border-[#d4af37]/30 rounded-xl px-4 py-3 text-white text-base sm:text-sm focus:outline-none focus:border-[#d4af37] focus:ring-2 focus:ring-[#d4af37]/20 transition placeholder:text-slate-500"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-300 mb-1.5">Mobile Number *</label>
                      <input
                        type="tel"
                        required
                        placeholder="e.g. 98765 43210"
                        value={formData.phone}
                        onChange={e => setFormData({ ...formData, phone: e.target.value })}
                        className="w-full bg-[#121c2e] border border-[#d4af37]/30 rounded-xl px-4 py-3 text-white text-base sm:text-sm focus:outline-none focus:border-[#d4af37] focus:ring-2 focus:ring-[#d4af37]/20 transition placeholder:text-slate-500"
                      />
                    </div>
                  </div>

                  {/* 1-Tap Party Size Chips */}
                  <div>
                    <label className="block text-xs font-bold text-slate-300 mb-2 flex items-center gap-1.5">
                      <Users className="w-3.5 h-3.5 text-[#d4af37]" /> No. of Guests *
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {guestOptions.map(opt => {
                        const isSelected = formData.guests === opt;
                        return (
                          <button
                            type="button"
                            key={opt}
                            onClick={() => {
                              sound.playClick();
                              setFormData({ ...formData, guests: opt });
                            }}
                            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer border ${
                              isSelected
                                ? 'gold-btn text-[#080c14] border-amber-300 shadow-md scale-[1.02]'
                                : 'bg-[#121c2e] text-slate-300 border-[#d4af37]/20 hover:border-[#d4af37] hover:text-white'
                            }`}
                          >
                            {opt}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Date & 1-Tap Time Slots */}
                  <div className="grid grid-cols-1 sm:grid-cols-12 gap-4">
                    <div className="sm:col-span-5">
                      <label className="block text-xs font-bold text-slate-300 mb-1.5 flex items-center gap-1.5">
                        <CalendarDays className="w-3.5 h-3.5 text-[#d4af37]" /> Date *
                      </label>
                      <input
                        type="date"
                        value={formData.date}
                        onChange={e => setFormData({ ...formData, date: e.target.value })}
                        className="w-full bg-[#121c2e] border border-[#d4af37]/30 rounded-xl px-4 py-2.5 text-white text-base sm:text-sm focus:outline-none focus:border-[#d4af37] transition"
                      />
                    </div>

                    <div className="sm:col-span-7">
                      <label className="block text-xs font-bold text-slate-300 mb-1.5 flex items-center gap-1.5">
                        <Clock className="w-3.5 h-3.5 text-[#d4af37]" /> Preferred Time Slot *
                      </label>
                      <div className="flex flex-wrap gap-1.5">
                        {['1:00 PM', '7:30 PM', '8:15 PM', '9:00 PM', '9:45 PM'].map(slot => {
                          const isSelected = formData.time.startsWith(slot);
                          return (
                            <button
                              type="button"
                              key={slot}
                              onClick={() => {
                                sound.playClick();
                                setFormData({ ...formData, time: `${slot} (Dining)` });
                              }}
                              className={`px-2.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer border ${
                                isSelected
                                  ? 'gold-btn text-[#080c14] border-amber-300 shadow-xs'
                                  : 'bg-[#121c2e] text-slate-300 border-[#d4af37]/20 hover:border-[#d4af37] hover:text-white'
                              }`}
                            >
                              {slot}
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  </div>

                  {/* 1-Tap Dining Section Chips */}
                  <div>
                    <label className="block text-xs font-bold text-slate-300 mb-1.5">Dining Hall Section</label>
                    <div className="flex flex-wrap gap-2">
                      {sections.map(sec => {
                        const isSelected = formData.section === sec;
                        return (
                          <button
                            type="button"
                            key={sec}
                            onClick={() => {
                              sound.playClick();
                              setFormData({ ...formData, section: sec });
                            }}
                            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer border ${
                              isSelected
                                ? 'bg-[#be123c] text-white border-[#be123c] shadow-md'
                                : 'bg-[#121c2e] text-slate-300 border-[#d4af37]/20 hover:border-[#d4af37] hover:text-white'
                            }`}
                          >
                            {sec}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-300 mb-1.5">Special Notes / Occasion (Optional)</label>
                    <input
                      type="text"
                      placeholder="e.g. Birthday dinner, need quiet corner table, anniversary decoration..."
                      value={formData.notes}
                      onChange={e => setFormData({ ...formData, notes: e.target.value })}
                      className="w-full bg-[#121c2e] border border-[#d4af37]/30 rounded-xl px-4 py-2.5 text-white text-base sm:text-xs focus:outline-none focus:border-[#d4af37] transition placeholder:text-slate-500"
                    />
                  </div>

                  <button
                    type="submit"
                    className="mt-2 gold-btn py-3.5 px-6 rounded-2xl flex items-center justify-center gap-2 text-sm sm:text-base cursor-pointer shadow-xl hover:scale-[1.01] active:scale-[0.99]"
                  >
                    <span>Confirm Table Reservation</span>
                    <Check className="w-5 h-5 text-[#080c14] stroke-[3]" />
                  </button>
                </form>
              ) : (
                <div className="py-6 px-2 text-center flex flex-col items-center">
                  <div className="w-16 h-16 rounded-full bg-emerald-950/80 border-2 border-emerald-400 flex items-center justify-center text-emerald-400 mb-4 shadow-[0_0_20px_rgba(16,185,129,0.4)]">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <span className="text-xs font-black tracking-widest text-emerald-400 uppercase">Reservation Confirmed</span>
                  <h3 className="text-2xl font-black text-white mt-1 mb-2 font-serif">Table Reserved Successfully!</h3>
                  
                  <div className="bg-[#121c2e] border border-[#d4af37]/40 rounded-2xl p-5 my-5 w-full max-w-md text-left text-xs space-y-2 shadow-xl">
                    <div className="flex justify-between py-1 border-b border-[#d4af37]/20">
                      <span className="text-slate-400">Booking Reference:</span>
                      <strong className="text-[#d4af37] font-mono text-sm sm:text-base">{bookingRef}</strong>
                    </div>
                    <div className="flex justify-between py-1 border-b border-[#d4af37]/20">
                      <span className="text-slate-400">Guest Name:</span>
                      <strong className="text-white">{formData.name}</strong>
                    </div>
                    <div className="flex justify-between py-1 border-b border-[#d4af37]/20">
                      <span className="text-slate-400">Guests &amp; Time:</span>
                      <strong className="text-white">{formData.guests} • {formData.date} at {formData.time}</strong>
                    </div>
                    <div className="flex justify-between py-1">
                      <span className="text-slate-400">Dining Section:</span>
                      <strong className="text-[#d4af37] font-semibold">{formData.section}</strong>
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-3 justify-center w-full max-w-md">
                    <button
                      onClick={openWhatsApp}
                      className="flex-1 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs sm:text-sm py-3.5 px-5 rounded-xl transition flex items-center justify-center gap-2 shadow-md cursor-pointer"
                    >
                      <MessageSquare className="w-4 h-4" />
                      <span>Send Pass to WhatsApp</span>
                    </button>
                    <button
                      onClick={() => setIsBooked(false)}
                      className="bg-[#121c2e] hover:bg-[#18253d] text-slate-200 border border-[#d4af37]/30 text-xs sm:text-sm py-3.5 px-5 rounded-xl transition cursor-pointer"
                    >
                      Book Another Table
                    </button>
                  </div>
                </div>
              )}

            </div>
          </div>

        </div>

      </div>
    </section>
  );
}

'use client';

import React, { useState } from 'react';
import { useModal } from '@/context/ModalContext';
import { Star, X, CheckCircle2, MessageSquareQuote } from 'lucide-react';

export default function ReviewFormModal() {
  const { activeModal, closeModal, showToast } = useModal();
  const [name, setName] = useState('');
  const [city, setCity] = useState('');
  const [rating, setRating] = useState(5);
  const [favoriteDish, setFavoriteDish] = useState('');
  const [comment, setComment] = useState('');
  const [submitted, setSubmitted] = useState(false);

  if (activeModal !== 'reviewForm') return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !comment.trim()) {
      showToast('Please enter your name and feedback.');
      return;
    }

    const newReview = {
      id: `rev-${Date.now()}`,
      name: name.trim(),
      city: city.trim() || 'Sikar / Rajasthan',
      rating,
      date: 'Just now',
      favoriteDish: favoriteDish.trim() || 'Shivansh Maharaja Thali',
      comment: comment.trim(),
      verified: true,
    };

    try {
      const existing = localStorage.getItem('shivansh_user_reviews');
      const list = existing ? JSON.parse(existing) : [];
      list.unshift(newReview);
      localStorage.setItem('shivansh_user_reviews', JSON.stringify(list));
    } catch {}

    setSubmitted(true);
    showToast('Dhanyawad! Your review has been added.');
    setTimeout(() => {
      closeModal();
      setSubmitted(false);
      setName('');
      setCity('');
      setComment('');
      setFavoriteDish('');
    }, 2000);
  };

  return (
    <div
      className="fixed inset-0 z-[1000] bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6 animate-fadeIn"
      onClick={e => { if (e.target === e.currentTarget) closeModal(); }}
    >
      <div className="bg-[#0a0f1d] border border-[#d4af37]/35 w-full max-w-lg rounded-3xl overflow-hidden shadow-[0_25px_70px_rgba(0,0,0,0.95)] p-6 sm:p-8 animate-slideUp text-slate-100">
        
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-[#d4af37]/20 mb-5">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#d4af37]/10 border border-[#d4af37]/30 flex items-center justify-center text-[#d4af37]">
              <MessageSquareQuote className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-serif font-black text-lg sm:text-xl text-white">Share Your Dining Experience</h3>
              <span className="text-xs text-slate-400">Hotel Shivansh Guest Feedback</span>
            </div>
          </div>
          <button
            onClick={closeModal}
            className="w-9 h-9 rounded-full bg-slate-800/80 hover:bg-slate-700 text-slate-300 hover:text-white transition flex items-center justify-center cursor-pointer border border-slate-700"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {submitted ? (
          <div className="py-8 text-center space-y-3">
            <div className="w-16 h-16 rounded-full bg-emerald-950/80 border-2 border-emerald-400 flex items-center justify-center text-emerald-400 mx-auto shadow-[0_0_20px_rgba(16,185,129,0.4)]">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h4 className="text-xl font-serif font-bold text-white">Thank You, {name}!</h4>
            <p className="text-xs text-slate-300">
              Your feedback is deeply appreciated by the management and royal kitchen team at Hotel Shivansh.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4 text-xs sm:text-sm">
            {/* Rating Stars */}
            <div>
              <label className="block text-slate-300 text-xs font-bold mb-1.5">Your Overall Rating *</label>
              <div className="flex gap-2 items-center">
                {[1, 2, 3, 4, 5].map(star => (
                  <button
                    type="button"
                    key={star}
                    onClick={() => setRating(star)}
                    className="p-1 cursor-pointer transition-transform hover:scale-110"
                  >
                    <Star
                      className={`w-7 h-7 ${
                        star <= rating
                          ? 'text-[#d4af37] fill-[#d4af37] drop-shadow-[0_0_6px_#d4af37]'
                          : 'text-slate-600'
                      }`}
                    />
                  </button>
                ))}
                <span className="text-xs font-bold text-[#d4af37] ml-2 font-mono">
                  {rating === 5 ? '5.0 / 5.0 (Exceptional)' : `${rating}.0 / 5.0`}
                </span>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-slate-300 text-xs font-bold mb-1">Your Full Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Ramesh Chandra"
                  value={name}
                  onChange={e => setName(e.target.value)}
                  className="w-full bg-[#101728] border border-[#d4af37]/30 rounded-xl px-3.5 py-2.5 text-white text-base sm:text-xs placeholder:text-slate-500 focus:outline-none focus:border-[#d4af37]"
                />
              </div>

              <div>
                <label className="block text-slate-300 text-xs font-bold mb-1">Your City / Native Town</label>
                <input
                  type="text"
                  placeholder="e.g. Sikar, Jaipur, Delhi..."
                  value={city}
                  onChange={e => setCity(e.target.value)}
                  className="w-full bg-[#101728] border border-[#d4af37]/30 rounded-xl px-3.5 py-2.5 text-white text-base sm:text-xs placeholder:text-slate-500 focus:outline-none focus:border-[#d4af37]"
                />
              </div>
            </div>

            <div>
              <label className="block text-slate-300 text-xs font-bold mb-1">Favorite Dish Ordered</label>
              <input
                type="text"
                placeholder="e.g. Maharaja Royal Thali, Dal Baati, Paneer Tikka..."
                value={favoriteDish}
                onChange={e => setFavoriteDish(e.target.value)}
                className="w-full bg-[#101728] border border-[#d4af37]/30 rounded-xl px-3.5 py-2.5 text-white text-base sm:text-xs placeholder:text-slate-500 focus:outline-none focus:border-[#d4af37]"
              />
            </div>

            <div>
              <label className="block text-slate-300 text-xs font-bold mb-1">Your Review & Experience *</label>
              <textarea
                required
                rows={3}
                placeholder="Tell other guests about food quality, taste, room service speed, or dining ambiance..."
                value={comment}
                onChange={e => setComment(e.target.value)}
                className="w-full bg-[#101728] border border-[#d4af37]/30 rounded-xl px-3.5 py-2.5 text-white text-base sm:text-xs placeholder:text-slate-500 focus:outline-none focus:border-[#d4af37]"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-gradient-to-r from-[#d4af37] via-[#dfc17b] to-[#b38e44] text-[#080c14] font-extrabold py-3.5 px-5 rounded-xl shadow-lg transition text-xs sm:text-sm cursor-pointer hover:scale-[1.01] active:scale-[0.99]"
            >
              Submit Guest Review
            </button>
          </form>
        )}

      </div>
    </div>
  );
}

'use client';

import React, { useState } from 'react';
import { useModal } from '@/context/ModalContext';
import { useCart } from '@/context/CartContext';
import { getDishById } from '@/lib/products';
import { Crown, UtensilsCrossed, Flame, X, Plus, Minus, ArrowRight, Sparkles } from 'lucide-react';

export default function DishCustomModal() {
  const { activeModal, modalData, closeModal, showToast } = useModal();
  const { addItem } = useCart();

  const [portion, setPortion] = useState<'Full' | 'Half'>('Full');
  const [spice, setSpice] = useState<'mild' | 'medium' | 'spicy'>('medium');
  const [selectedAddOns, setSelectedAddOns] = useState<string[]>([]);
  const [instructions, setInstructions] = useState('');
  const [quantity, setQuantity] = useState(1);

  if (activeModal !== 'dish') return null;

  const dishId = modalData.dishId as string;
  const dish = getDishById(dishId);

  if (!dish) return null;

  const addOnOptions = [
    { name: 'Extra Desi Ghee / Butter Dollop', price: 25 },
    { name: 'Roasted Masala Papad (2 Pcs)', price: 30 },
    { name: 'Boondi Curd Raita Bowl', price: 45 },
    { name: 'Extra Green Salad & Mint Chutney', price: 20 },
  ];

  const handleToggleAddOn = (name: string) => {
    if (selectedAddOns.includes(name)) {
      setSelectedAddOns(selectedAddOns.filter(a => a !== name));
    } else {
      setSelectedAddOns([...selectedAddOns, name]);
    }
  };

  const basePrice = portion === 'Half' && dish.category !== 'breads' && dish.category !== 'beverages'
    ? Math.round(dish.price * 0.65)
    : dish.price;

  const addOnsTotal = selectedAddOns.reduce((sum, item) => {
    const opt = addOnOptions.find(o => o.name === item);
    return sum + (opt ? opt.price : 0);
  }, 0);

  const unitTotal = basePrice + addOnsTotal;
  const grandItemTotal = unitTotal * quantity;

  const handleAddToCart = () => {
    addItem({
      id: dish.id,
      quantity,
      portion,
      spice,
      addOns: selectedAddOns,
      instructions: instructions.trim() || undefined,
      unitPrice: unitTotal,
    });
    showToast(`Added ${quantity}x ${dish.name} to your plate!`);
    closeModal();
    setQuantity(1);
    setSelectedAddOns([]);
    setInstructions('');
  };

  return (
    <div
      className="fixed inset-0 z-[999] bg-black/80 backdrop-blur-sm flex items-end sm:items-center justify-center p-0 sm:p-6 animate-fadeIn"
      onClick={e => { if (e.target === e.currentTarget) closeModal(); }}
    >
      <div className="bg-[#0a0f1d] border-t sm:border border-[#d4af37]/35 w-full max-w-lg rounded-t-3xl sm:rounded-3xl overflow-hidden shadow-[0_20px_60px_rgba(0,0,0,0.9)] animate-slideUp max-h-[90vh] sm:max-h-[92vh] flex flex-col text-slate-100">
        
        {/* Mobile drag handle */}
        <div className="sm:hidden w-12 h-1 bg-slate-700 rounded-full mx-auto my-2.5 shrink-0" />

        {/* Modal Top Bar */}
        <div className="relative h-48 sm:h-56 w-full overflow-hidden shrink-0 bg-[#080c14]">
          <img
            src={dish.image || '/assets/restaurant_thali.jpg'}
            alt={dish.name}
            className="w-full h-full object-cover opacity-90"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0a0f1d] via-[#0a0f1d]/60 to-transparent" />
          
          <button
            onClick={closeModal}
            className="absolute top-4 right-4 w-9 h-9 rounded-full bg-[#080c14]/80 border border-[#d4af37]/40 text-slate-300 hover:text-white transition flex items-center justify-center cursor-pointer"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="absolute bottom-4 left-6 right-6">
            <div className="flex items-center gap-2 mb-1.5">
              <span className="w-3.5 h-3.5 border border-emerald-500 rounded-sm flex items-center justify-center bg-emerald-950">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
              </span>
              <span className="text-xs font-bold text-[#d4af37] uppercase tracking-widest">
                {dish.categoryName}
              </span>
              {dish.isChefSpecial && (
                <span className="text-[10px] font-bold bg-gradient-to-r from-[#d4af37] to-[#dfc17b] text-[#080c14] px-2.5 py-0.5 rounded-full flex items-center gap-1 shadow">
                  <Sparkles className="w-3 h-3 text-[#881337]" />
                  CHEF&apos;S SPECIAL
                </span>
              )}
            </div>
            <h3 className="text-xl sm:text-2xl font-serif font-black text-white">{dish.name}</h3>
          </div>
        </div>

        {/* Modal Body / Customizations */}
        <div className="p-6 sm:p-7 overflow-y-auto space-y-6 flex-1 text-xs sm:text-sm bg-[#0a0f1d]">
          
          <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
            {dish.description}
          </p>

          {/* Portion Size Option */}
          {dish.category !== 'breads' && dish.category !== 'beverages' && (
            <div>
              <span className="font-bold text-white uppercase tracking-wider block mb-3 text-xs">
                1. Select Portion Size
              </span>
              <div className="grid grid-cols-2 gap-3.5">
                <button
                  type="button"
                  onClick={() => setPortion('Full')}
                  className={`p-4 rounded-2xl border flex items-center justify-between transition font-bold cursor-pointer ${
                    portion === 'Full'
                      ? 'bg-[#161f36] border-[#d4af37] text-white shadow-[0_0_15px_rgba(212,175,55,0.2)]'
                      : 'bg-[#101728] border-slate-800 text-slate-400 hover:text-slate-200'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <Crown className="w-4 h-4 text-[#d4af37]" />
                    <span>Regular / Full</span>
                  </div>
                  <span className="text-[#d4af37] font-black text-sm">₹{dish.price}</span>
                </button>

                <button
                  type="button"
                  onClick={() => setPortion('Half')}
                  className={`p-4 rounded-2xl border flex items-center justify-between transition font-bold cursor-pointer ${
                    portion === 'Half'
                      ? 'bg-[#161f36] border-[#d4af37] text-white shadow-[0_0_15px_rgba(212,175,55,0.2)]'
                      : 'bg-[#101728] border-slate-800 text-slate-400 hover:text-slate-200'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <UtensilsCrossed className="w-4 h-4 text-emerald-400" />
                    <span>Half / Small</span>
                  </div>
                  <span className="text-[#d4af37] font-black text-sm">₹{Math.round(dish.price * 0.65)}</span>
                </button>
              </div>
            </div>
          )}

          {/* Spice Meter */}
          <div>
            <span className="font-bold text-white uppercase tracking-wider block mb-3 text-xs">
              2. Spice Preference
            </span>
            <div className="grid grid-cols-3 gap-3">
              {(['mild', 'medium', 'spicy'] as const).map(sp => (
                <button
                  key={sp}
                  type="button"
                  onClick={() => setSpice(sp)}
                  className={`p-3 rounded-2xl border font-bold capitalize text-center transition flex items-center justify-center gap-2 cursor-pointer ${
                    spice === sp
                      ? 'bg-gradient-to-r from-[#d4af37] to-[#dfc17b] text-[#080c14] border-[#d4af37] shadow-[0_0_12px_rgba(212,175,55,0.3)] font-black'
                      : 'bg-[#101728] border-slate-800 text-slate-300 hover:text-white hover:border-slate-700'
                  }`}
                >
                  {sp === 'mild' && (
                    <>
                      <span className="w-2.5 h-2.5 rounded-full bg-emerald-400"></span>
                      <span>Mild</span>
                    </>
                  )}
                  {sp === 'medium' && (
                    <>
                      <span className="w-2.5 h-2.5 rounded-full bg-amber-400"></span>
                      <span>Medium</span>
                    </>
                  )}
                  {sp === 'spicy' && (
                    <>
                      <Flame className="w-4 h-4 text-rose-500" />
                      <span>Desi Spicy</span>
                    </>
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Add-ons */}
          <div>
            <span className="font-bold text-white uppercase tracking-wider block mb-3 text-xs">
              3. Recommended Add-ons
            </span>
            <div className="space-y-2.5">
              {addOnOptions.map(opt => {
                const checked = selectedAddOns.includes(opt.name);
                return (
                  <div
                    key={opt.name}
                    onClick={() => handleToggleAddOn(opt.name)}
                    className={`cursor-pointer p-3.5 sm:p-4 rounded-2xl border flex items-center justify-between transition ${
                      checked
                        ? 'bg-[#161f36] border-[#d4af37] text-white shadow-xs'
                        : 'bg-[#101728] border-slate-800 text-slate-300 hover:border-slate-700'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <input
                        type="checkbox"
                        checked={checked}
                        onChange={() => {}}
                        className="w-4 h-4 rounded accent-[#d4af37] cursor-pointer"
                      />
                      <span className="text-xs sm:text-sm font-semibold text-slate-200">{opt.name}</span>
                    </div>
                    <span className="text-xs sm:text-sm font-black text-[#d4af37]">+₹{opt.price}</span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Cooking Instructions */}
          <div>
            <span className="font-bold text-white uppercase tracking-wider block mb-2 text-xs">
              4. Cooking Note for Chef
            </span>
            <input
              type="text"
              placeholder="e.g. Less oil, extra crispy, no onion/garlic..."
              value={instructions}
              onChange={e => setInstructions(e.target.value)}
              className="w-full bg-[#101728] border border-[#d4af37]/30 rounded-xl px-4 py-3 text-white text-base sm:text-sm placeholder:text-slate-500 focus:outline-none focus:border-[#d4af37] transition"
            />
          </div>

        </div>

        {/* Modal Footer / Add to Plate */}
        <div className="p-5 sm:p-6 bg-[#0c1222] border-t border-[#d4af37]/25 flex items-center justify-between gap-4 shrink-0">
          <div className="flex items-center gap-3 bg-[#101728] border border-[#d4af37]/30 rounded-xl px-3.5 py-2 shadow-sm">
            <button
              onClick={() => setQuantity(Math.max(1, quantity - 1))}
              className="w-8 h-8 rounded-lg bg-[#080c14] text-slate-300 font-black hover:text-[#d4af37] transition flex items-center justify-center text-sm cursor-pointer"
              aria-label="Decrease quantity"
            >
              <Minus className="w-4 h-4" />
            </button>
            <span className="font-extrabold text-[#d4af37] text-base w-5 text-center">{quantity}</span>
            <button
              onClick={() => setQuantity(quantity + 1)}
              className="w-8 h-8 rounded-lg bg-[#080c14] text-slate-300 font-black hover:text-[#d4af37] transition flex items-center justify-center text-sm cursor-pointer"
              aria-label="Increase quantity"
            >
              <Plus className="w-4 h-4" />
            </button>
          </div>

          <button
            onClick={handleAddToCart}
            className="flex-1 bg-gradient-to-r from-[#d4af37] via-[#dfc17b] to-[#b38e44] text-[#080c14] font-extrabold py-3.5 px-5 sm:px-6 rounded-2xl shadow-[0_4px_20px_rgba(212,175,55,0.3)] transition flex items-center justify-between text-sm sm:text-base cursor-pointer group hover:scale-[1.01] active:scale-[0.99]"
          >
            <span className="flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-[#080c14]/20 flex items-center justify-center shrink-0 group-hover:rotate-90 transition-transform duration-300">
                <Plus className="w-3.5 h-3.5 stroke-[3]" />
              </span>
              <span>Add to Plate</span>
            </span>
            <span className="bg-[#080c14]/20 px-3 py-1.5 rounded-xl flex items-center gap-1.5 text-xs sm:text-sm font-black">
              <span>₹{grandItemTotal}</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
            </span>
          </button>
        </div>

      </div>
    </div>
  );
}

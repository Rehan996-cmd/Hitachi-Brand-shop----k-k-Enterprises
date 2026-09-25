'use client';

import React, { useState } from 'react';
import { useCart } from '@/context/CartContext';
import { useModal } from '@/context/ModalContext';
import { getDishById } from '@/lib/products';
import { sound } from '@/lib/sound';
import {
  UtensilsCrossed, CookingPot, Trash2, Tag, X, Plus, Minus,
  ArrowRight, ShieldCheck, Sparkles, Heart
} from 'lucide-react';

export default function CartDrawer() {
  const {
    items,
    isCartOpen,
    setIsCartOpen,
    removeItem,
    updateQuantity,
    diningMode,
    selectedRoom,
    subtotal,
    discount,
    gst,
    deliveryFee,
    grandTotal,
    coupon,
    applyCoupon,
    removeCoupon,
    addItem,
  } = useCart();

  const { openModal, showToast } = useModal();
  const [couponCodeInput, setCouponCodeInput] = useState('');
  const [includeCutlery, setIncludeCutlery] = useState(true);
  const [tipAmount, setTipAmount] = useState<number>(0);

  if (!isCartOpen) return null;

  const handleApplyCoupon = (codeToApply?: string) => {
    const code = codeToApply || couponCodeInput;
    const res = applyCoupon(code);
    showToast(res.message);
    if (res.success) {
      setCouponCodeInput('');
    }
  };

  const handleProceedCheckout = () => {
    if (items.length === 0) {
      showToast('Your plate is empty! Add some dishes to proceed.');
      return;
    }
    setIsCartOpen(false);
    openModal('checkout');
  };

  const popularAddOns = [
    { id: 'starter-4', name: 'Roasted Masala Papad (2 Pcs)', price: 30 },
    { id: 'starter-5', name: 'Boondi Curd Raita Bowl', price: 45 },
    { id: 'dessert-1', name: 'Desi Ghee Gulab Jamun (2 Pcs)', price: 60 },
  ];

  const deliveryThreshold = 299;
  const deliveryProgress = Math.min(100, Math.round((subtotal / deliveryThreshold) * 100));

  return (
    <div
      className="fixed inset-0 z-[999] bg-black/80 backdrop-blur-sm flex justify-end animate-fadeIn"
      onClick={e => { if (e.target === e.currentTarget) setIsCartOpen(false); }}
    >
      <div className="w-full max-w-md bg-[#0a0f1d] border-l border-[#d4af37]/30 h-full flex flex-col shadow-2xl animate-slideDrawer text-slate-100">
        
        {/* Drawer Header */}
        <div className="p-5 sm:p-6 border-b border-[#d4af37]/20 flex items-center justify-between bg-[#0c1222] shrink-0">
          <div className="flex items-center gap-3.5">
            <div className="w-10 h-10 rounded-xl bg-[#d4af37]/10 border border-[#d4af37]/30 flex items-center justify-center text-[#d4af37] shrink-0">
              <UtensilsCrossed className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-serif font-extrabold text-base sm:text-lg text-white leading-none">Your Dining Plate</h3>
              <span className="text-xs text-[#d4af37] font-bold mt-1.5 block">
                {diningMode === 'room'
                  ? `In-Room Dining • Room #${selectedRoom}`
                  : diningMode === 'table'
                  ? 'Table Dine-In Service'
                  : 'Doorstep Delivery'}
              </span>
            </div>
          </div>
          <button
            onClick={() => setIsCartOpen(false)}
            className="w-9 h-9 rounded-full bg-slate-800/80 hover:bg-slate-700 text-slate-300 hover:text-white transition flex items-center justify-center cursor-pointer border border-slate-700"
            aria-label="Close Plate"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Free Delivery Bar */}
        {items.length > 0 && (
          <div className="bg-[#121c2e] border-b border-[#d4af37]/20 px-5 py-2.5 text-xs">
            {diningMode === 'room' ? (
              <div className="flex items-center justify-between text-[#d4af37] font-semibold">
                <span className="flex items-center gap-1.5">
                  <Sparkles size={13} className="text-[#d4af37]" />
                  <span>Complimentary 24x7 In-Room Delivery Active</span>
                </span>
                <span className="text-emerald-400 font-bold">₹0 FEE</span>
              </div>
            ) : deliveryProgress >= 100 ? (
              <div className="flex items-center justify-between text-emerald-400 font-bold">
                <span>🎉 Free Sikar Town Delivery Unlocked!</span>
                <span>₹0 FEE</span>
              </div>
            ) : (
              <div>
                <div className="flex justify-between text-slate-300 mb-1">
                  <span>Add ₹{deliveryThreshold - subtotal} more for Free Delivery</span>
                  <span className="font-mono text-[#d4af37] font-bold">{deliveryProgress}%</span>
                </div>
                <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-[#d4af37] to-[#dfc17b] rounded-full transition-all duration-300"
                    style={{ width: `${deliveryProgress}%` }}
                  />
                </div>
              </div>
            )}
          </div>
        )}

        {/* Drawer Items Body */}
        <div className="flex-1 overflow-y-auto p-5 sm:p-6 space-y-4">
          {items.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center p-6 text-slate-400">
              <div className="w-20 h-20 rounded-3xl bg-[#101728] border border-[#d4af37]/30 flex items-center justify-center mb-5 shadow-[0_0_25px_rgba(212,175,55,0.15)]">
                <CookingPot className="w-10 h-10 text-[#d4af37]" />
              </div>
              <h4 className="font-serif text-lg font-extrabold text-white mb-2">Your Plate is Empty</h4>
              <p className="text-xs sm:text-sm text-slate-400 max-w-xs mb-8 leading-relaxed">
                Explore our authentic Rajasthani Thalis, Tandoori Starters, and Paneer Curries to begin your royal feast.
              </p>
              <a
                href="#menu"
                onClick={() => setIsCartOpen(false)}
                className="bg-gradient-to-r from-[#d4af37] to-[#dfc17b] text-[#080c14] font-extrabold text-xs sm:text-sm px-7 py-3.5 rounded-xl transition shadow-[0_4px_20px_rgba(212,175,55,0.3)] hover:opacity-95 cursor-pointer"
              >
                Browse Royal Menu
              </a>
            </div>
          ) : (
            <>
              {items.map(item => {
                const dish = getDishById(item.id);
                if (!dish) return null;
                const unitPrice = item.unitPrice || dish.price;
                const itemTotal = unitPrice * item.quantity;

                return (
                  <div
                    key={item.id}
                    className="bg-[#101728] border border-[#d4af37]/25 rounded-2xl p-4 flex gap-3.5 items-center shadow-md hover:border-[#d4af37]/45 transition-colors"
                  >
                    <img
                      src={dish.image || '/assets/restaurant_thali.jpg'}
                      alt={dish.name}
                      className="w-16 h-16 sm:w-18 sm:h-18 rounded-xl object-cover shrink-0 border border-[#d4af37]/30"
                    />
                    
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-1.5 mb-1">
                        <span className="w-2 h-2 rounded-full bg-emerald-400 shadow-[0_0_6px_#10b981] shrink-0"></span>
                        <h4 className="text-xs sm:text-sm font-bold text-white truncate">{dish.name}</h4>
                      </div>
                      <div className="text-[11px] text-slate-400 flex items-center gap-1.5 flex-wrap">
                        <span className="font-bold text-[#d4af37]">₹{unitPrice}</span>
                        {item.portion && <span className="bg-slate-800/80 px-1.5 py-0.5 rounded text-[10px] text-slate-300">Portion: {item.portion}</span>}
                        {item.spice && <span className="bg-slate-800/80 px-1.5 py-0.5 rounded text-[10px] text-amber-300">Spice: {item.spice}</span>}
                      </div>
                      {item.instructions && (
                        <span className="text-[10px] text-amber-300/80 truncate block mt-0.5 font-medium">
                          Chef note: {item.instructions}
                        </span>
                      )}

                      <div className="flex items-center justify-between mt-3">
                        <div className="flex items-center gap-2.5 bg-[#080c14] border border-[#d4af37]/30 rounded-xl px-2.5 py-1">
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="text-slate-300 hover:text-white font-black text-xs px-1 cursor-pointer"
                            aria-label="Decrease quantity"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="text-xs font-extrabold text-[#d4af37] min-w-3 text-center">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="text-slate-300 hover:text-white font-black text-xs px-1 cursor-pointer"
                            aria-label="Increase quantity"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>

                        <div className="flex items-center gap-2.5">
                          <span className="text-sm font-black text-white font-serif">₹{itemTotal}</span>
                          <button
                            onClick={() => removeItem(item.id)}
                            className="text-slate-400 hover:text-rose-400 p-1.5 transition cursor-pointer"
                            title="Remove item"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}

              {/* Quick Complements Recommendations */}
              <div className="pt-2">
                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-2.5">
                  Popular Complements
                </span>
                <div className="space-y-2">
                  {popularAddOns.map(addOn => (
                    <div
                      key={addOn.id}
                      className="bg-[#121c2e] border border-slate-800 hover:border-[#d4af37]/30 rounded-xl p-2.5 flex items-center justify-between text-xs transition"
                    >
                      <span className="text-slate-200 truncate pr-2 font-medium">{addOn.name}</span>
                      <div className="flex items-center gap-2 shrink-0">
                        <span className="text-[#d4af37] font-bold">₹{addOn.price}</span>
                        <button
                          onClick={() => {
                            addItem({
                              id: addOn.id,
                              quantity: 1,
                              unitPrice: addOn.price,
                            });
                            showToast(`Added ${addOn.name} to plate!`);
                          }}
                          className="bg-[#18253d] hover:bg-[#d4af37] text-slate-200 hover:text-[#080c14] px-2.5 py-1 rounded-lg font-bold text-[11px] transition border border-[#d4af37]/30 cursor-pointer"
                        >
                          + Add
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Eco Cutlery Checkbox */}
              <div className="bg-[#101728] border border-slate-800 rounded-xl p-3 flex items-center justify-between text-xs">
                <div className="flex items-center gap-2.5">
                  <input
                    type="checkbox"
                    id="cutleryCheckbox"
                    checked={includeCutlery}
                    onChange={(e) => setIncludeCutlery(e.target.checked)}
                    className="w-4 h-4 rounded accent-[#d4af37] cursor-pointer"
                  />
                  <label htmlFor="cutleryCheckbox" className="text-slate-300 cursor-pointer">
                    Include disposable cutlery &amp; napkins
                  </label>
                </div>
                <span className="text-[10px] text-emerald-400 font-bold">Eco Packaging</span>
              </div>
            </>
          )}
        </div>

        {/* Drawer Footer & Billing */}
        {items.length > 0 && (
          <div className="p-5 sm:p-6 border-t border-[#d4af37]/25 bg-[#0c1222] space-y-4 shrink-0 shadow-2xl">
            
            {/* Coupon Application */}
            <div>
              {coupon ? (
                <div className="bg-emerald-950/60 border border-emerald-500/40 rounded-2xl p-3 flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2">
                    <Tag className="w-4 h-4 text-emerald-400" />
                    <span className="text-emerald-300 font-bold">{coupon.code}</span>
                    <span className="text-emerald-200 font-medium">Saved ₹{coupon.discount}</span>
                  </div>
                  <button
                    onClick={removeCoupon}
                    className="text-rose-400 hover:text-rose-300 text-xs font-bold cursor-pointer"
                  >
                    Remove
                  </button>
                </div>
              ) : (
                <div className="space-y-2">
                  <div className="flex gap-2">
                    <input
                      type="text"
                      placeholder="Enter Coupon (e.g. SHIVANSH10)"
                      value={couponCodeInput}
                      onChange={e => setCouponCodeInput(e.target.value.toUpperCase())}
                      className="flex-1 bg-[#101728] border border-[#d4af37]/30 rounded-xl px-3.5 py-2.5 text-base sm:text-xs text-white uppercase placeholder:text-slate-500 focus:outline-none focus:border-[#d4af37]"
                    />
                    <button
                      onClick={() => handleApplyCoupon()}
                      className="bg-gradient-to-r from-[#d4af37] to-[#dfc17b] hover:opacity-90 text-[#080c14] font-extrabold text-xs px-4 py-2.5 rounded-xl transition cursor-pointer shadow-md"
                    >
                      Apply
                    </button>
                  </div>
                  <div className="flex gap-2 text-[10px]">
                    <button
                      onClick={() => handleApplyCoupon('SHIVANSH10')}
                      className="text-[#d4af37] hover:underline bg-[#101728] px-2.5 py-1 rounded-lg border border-[#d4af37]/20 font-bold cursor-pointer"
                    >
                      SHIVANSH10 (10% OFF)
                    </button>
                    {diningMode === 'room' && (
                      <button
                        onClick={() => handleApplyCoupon('ROOMGUEST')}
                        className="text-[#f3e8b1] hover:underline bg-[#101728] px-2.5 py-1 rounded-lg border border-[#d4af37]/20 font-bold cursor-pointer"
                      >
                        ROOMGUEST (15% OFF)
                      </button>
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* Bill Breakdown */}
            <div className="space-y-2 text-xs text-slate-400 border-t border-slate-800 pt-3.5">
              <div className="flex justify-between">
                <span className="text-slate-400">Items Subtotal:</span>
                <span className="font-semibold text-white">₹{subtotal}</span>
              </div>
              {discount > 0 && (
                <div className="flex justify-between text-emerald-400 font-semibold">
                  <span>Coupon Discount:</span>
                  <span>−₹{discount}</span>
                </div>
              )}
              <div className="flex justify-between">
                <span className="text-slate-400">Restaurant GST (5%):</span>
                <span className="text-slate-300">₹{gst}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Delivery / Serving:</span>
                <span className={deliveryFee === 0 ? 'text-emerald-400 font-bold' : 'text-slate-300'}>
                  {deliveryFee === 0 ? 'FREE' : `₹${deliveryFee}`}
                </span>
              </div>
              <div className="flex justify-between text-base font-black text-white pt-2.5 border-t border-slate-800">
                <span>Grand Total:</span>
                <span className="text-[#d4af37] text-xl font-serif">₹{grandTotal}</span>
              </div>
            </div>

            {/* Checkout & Partner Buttons */}
            <div className="space-y-2.5">
              <button
                onClick={handleProceedCheckout}
                className="w-full bg-gradient-to-r from-[#d4af37] via-[#dfc17b] to-[#b38e44] text-[#080c14] font-extrabold py-3.5 px-6 rounded-2xl shadow-[0_6px_25px_rgba(212,175,55,0.35)] hover:opacity-95 transition-all duration-200 flex items-center justify-between text-sm sm:text-base cursor-pointer hover:scale-[1.01] active:scale-[0.99]"
              >
                <span>Proceed to Hotel Checkout</span>
                <span className="bg-[#080c14]/20 px-3 py-1 rounded-xl flex items-center gap-1.5 text-xs sm:text-sm font-sans font-black">
                  <span>₹{grandTotal}</span>
                  <ArrowRight className="w-4 h-4" />
                </span>
              </button>

              <a
                href="https://www.zomato.com/sikar/restaurants?q=Hotel+Shivansh"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full bg-[#160c0e] hover:bg-[#200e12] border border-red-500/40 text-white font-bold py-2.5 px-4 rounded-xl text-xs transition flex items-center justify-between shadow-sm cursor-pointer"
              >
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#e23744]"></span>
                  <span>Prefer Zomato? Order on Zomato Partner</span>
                </div>
                <span className="bg-[#e23744] text-white text-[10px] px-2 py-0.5 rounded font-black">
                  ZOMATO APP
                </span>
              </a>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}

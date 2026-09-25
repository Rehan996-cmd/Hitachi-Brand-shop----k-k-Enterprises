'use client';

import React, { useState, useMemo } from 'react';
import { DISHES_DATA } from '@/lib/products';
import { CategoryFilter, DietaryFilter } from '@/lib/types';
import { useModal } from '@/context/ModalContext';
import { useCart } from '@/context/CartContext';
import { sound } from '@/lib/sound';
import {
  Search, X, Star, Clock, Flame, Leaf, Sparkles, Crown,
  ChefHat, Cookie, Soup, IceCreamCone, ArrowRight,
  Minus, Plus, UtensilsCrossed, Camera
} from 'lucide-react';

interface CategoryTab {
  key: CategoryFilter;
  title: string;
  icon: React.ElementType;
  count: number;
}

type PriceFilter = 'all' | 'under150' | '150to250' | 'above250';

export default function MenuSection() {
  const { openModal, showToast } = useModal();
  const { items, updateQuantity, addItem } = useCart();

  const [activeCategory, setActiveCategory] = useState<CategoryFilter>('all');
  const [activeDietary, setActiveDietary] = useState<DietaryFilter>('all');
  const [activePrice, setActivePrice] = useState<PriceFilter>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const quickSuggestions = [
    'Maharaja Thali',
    'Dal Baati Churma',
    'Paneer Butter Masala',
    'Paneer Tikka',
    'Dum Biryani',
    'Kesar Pista Shake',
    'Butter Naan',
  ];

  const categories: CategoryTab[] = [
    { key: 'all', title: 'All Dishes', icon: Sparkles, count: DISHES_DATA.length },
    { key: 'thali', title: 'Royal Thalis', icon: Crown, count: DISHES_DATA.filter(d => d.category === 'thali').length },
    { key: 'mains', title: 'Paneer & Curries', icon: ChefHat, count: DISHES_DATA.filter(d => d.category === 'mains').length },
    { key: 'starters', title: 'Tandoor & Starters', icon: Flame, count: DISHES_DATA.filter(d => d.category === 'starters').length },
    { key: 'breads', title: 'Breads & Naan', icon: Cookie, count: DISHES_DATA.filter(d => d.category === 'breads').length },
    { key: 'biryani', title: 'Biryani & Rice', icon: Soup, count: DISHES_DATA.filter(d => d.category === 'biryani').length },
    { key: 'chinese', title: 'Chinese & Snacks', icon: UtensilsCrossed, count: DISHES_DATA.filter(d => d.category === 'chinese').length },
    { key: 'breakfast', title: 'Morning Breakfast', icon: UtensilsCrossed, count: DISHES_DATA.filter(d => d.category === 'breakfast').length },
    { key: 'desserts', title: 'Royal Sweets', icon: IceCreamCone, count: DISHES_DATA.filter(d => d.category === 'desserts').length },
    { key: 'beverages', title: 'Lassi & Beverages', icon: Sparkles, count: DISHES_DATA.filter(d => d.category === 'beverages').length },
  ];

  const dietaryFilters: { key: DietaryFilter; label: string; icon?: React.ElementType }[] = [
    { key: 'all', label: 'All Items' },
    { key: 'bestseller', label: 'Best Sellers', icon: Flame },
    { key: 'chef', label: "Chef's Special", icon: Crown },
    { key: 'spicy', label: 'Desi Spicy', icon: Flame },
    { key: 'mild', label: 'Mild / Kids', icon: Leaf },
  ];

  const priceFilters: { key: PriceFilter; label: string }[] = [
    { key: 'all', label: 'All Rates' },
    { key: 'under150', label: 'Under ₹150' },
    { key: '150to250', label: '₹150 – ₹250' },
    { key: 'above250', label: '₹250+ (Feasts)' },
  ];

  const filteredDishes = useMemo(() => {
    return DISHES_DATA.filter(dish => {
      if (activeCategory !== 'all' && dish.category !== activeCategory) return false;
      if (activeDietary === 'bestseller' && !dish.isBestSeller) return false;
      if (activeDietary === 'chef' && !dish.isChefSpecial) return false;
      if (activeDietary === 'spicy' && dish.spiceLevel !== 'spicy') return false;
      if (activeDietary === 'mild' && dish.spiceLevel !== 'mild') return false;

      if (activePrice === 'under150' && dish.price >= 150) return false;
      if (activePrice === '150to250' && (dish.price < 150 || dish.price > 250)) return false;
      if (activePrice === 'above250' && dish.price <= 250) return false;

      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase().trim();
        const matchName = dish.name.toLowerCase().includes(q);
        const matchDesc = dish.description.toLowerCase().includes(q);
        const matchCat = (dish.categoryName || '').toLowerCase().includes(q);
        if (!matchName && !matchDesc && !matchCat) return false;
      }
      return true;
    });
  }, [activeCategory, activeDietary, activePrice, searchQuery]);

  return (
    <section className="py-16 sm:py-24 bg-[#080c14] border-t border-[#d4af37]/20 relative" id="menu">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-12">
          <span className="inline-flex items-center gap-2 text-xs font-bold tracking-widest text-[#d4af37] uppercase mb-3 bg-[#121c2e] px-3.5 py-1.5 rounded-full border border-[#d4af37]/30 shadow-sm">
            <UtensilsCrossed size={14} className="text-[#d4af37]" />
            AUTHENTIC 100% PURE VEGETARIAN MENU
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white mb-3 leading-tight">
            Hotel Shivansh Royal Menu
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-transparent via-[#d4af37] to-transparent mx-auto mb-4" />
          <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
            Choose from 40+ royal dishes prepared fresh to order with pure desi ghee and hand-pounded spices.
          </p>
        </div>

        {/* Search Bar & Auto-Suggestions */}
        <div className="max-w-3xl mx-auto mb-8">
          <div className="relative">
            <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-[#d4af37]" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by dish name, spice, or ingredient (e.g. Maharaja Thali, Handi Paneer, Dum Biryani)..."
              className="w-full bg-[#0d1522] border border-[#d4af37]/35 rounded-2xl py-3.5 pl-12 pr-11 text-base sm:text-sm text-white placeholder-slate-400 focus:outline-none focus:border-[#d4af37] focus:ring-2 focus:ring-[#d4af37]/30 transition shadow-xl"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white p-1 rounded-full cursor-pointer"
              >
                <X size={16} />
              </button>
            )}
          </div>

          {/* Quick Suggestions Chips */}
          <div className="flex items-center gap-1.5 overflow-x-auto pt-3 pb-1 text-xs scrollbar-none">
            <span className="text-slate-400 text-[11px] font-bold shrink-0">Quick picks:</span>
            {quickSuggestions.map(s => (
              <button
                key={s}
                onClick={() => {
                  sound.playClick();
                  setSearchQuery(s);
                }}
                className={`px-2.5 py-1 rounded-lg border text-[11px] font-semibold whitespace-nowrap transition cursor-pointer ${
                  searchQuery === s
                    ? 'bg-[#d4af37] text-[#080c14] border-[#d4af37] font-bold'
                    : 'bg-[#101728] border-slate-800 text-slate-300 hover:border-[#d4af37]/50 hover:text-white'
                }`}
              >
                {s}
              </button>
            ))}
          </div>
        </div>

        {/* Filter Controls Row: Dietary & Price Filters */}
        <div className="flex flex-wrap items-center justify-between gap-3 mb-6 bg-[#0d1522] border border-[#d4af37]/25 p-3 rounded-2xl">
          {/* Dietary Filter Pills */}
          <div className="flex items-center gap-1.5 overflow-x-auto scrollbar-none">
            {dietaryFilters.map((df) => {
              const Icon = df.icon;
              const isActive = activeDietary === df.key;
              return (
                <button
                  key={df.key}
                  onClick={() => {
                    sound.playClick();
                    setActiveDietary(df.key);
                  }}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition cursor-pointer ${
                    isActive
                      ? 'bg-[#be123c] text-white border border-[#be123c] shadow-md'
                      : 'bg-[#121c2e] border border-slate-800 text-slate-300 hover:text-white hover:border-[#d4af37]/40'
                  }`}
                >
                  {Icon && <Icon size={12} className={isActive ? 'text-white' : 'text-[#d4af37]'} />}
                  <span>{df.label}</span>
                </button>
              );
            })}
          </div>

          {/* Price Range Filters */}
          <div className="flex items-center gap-1.5 overflow-x-auto scrollbar-none">
            {priceFilters.map((pf) => {
              const isActive = activePrice === pf.key;
              return (
                <button
                  key={pf.key}
                  onClick={() => {
                    sound.playClick();
                    setActivePrice(pf.key);
                  }}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition cursor-pointer border ${
                    isActive
                      ? 'bg-gradient-to-r from-[#d4af37] to-[#dfc17b] text-[#080c14] border-[#d4af37] shadow-sm font-black'
                      : 'bg-[#121c2e] border-slate-800 text-slate-300 hover:text-white hover:border-[#d4af37]/40'
                  }`}
                >
                  {pf.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Category Tabs Strip */}
        <div className="flex items-center gap-2 overflow-x-auto pb-3 mb-6 scrollbar-none">
          {categories.map((cat) => {
            const Icon = cat.icon;
            const isActive = activeCategory === cat.key;
            return (
              <button
                key={cat.key}
                onClick={() => {
                  sound.playClick();
                  setActiveCategory(cat.key);
                }}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-2xl text-xs sm:text-sm font-bold whitespace-nowrap transition cursor-pointer ${
                  isActive
                    ? 'gold-btn text-[#080c14] shadow-lg scale-105'
                    : 'bg-[#0d1522] border border-[#d4af37]/20 text-slate-300 hover:text-white hover:border-[#d4af37]/50 hover:bg-[#121c2e]'
                }`}
              >
                <Icon size={15} className={isActive ? 'text-[#080c14]' : 'text-[#d4af37]'} />
                <span>{cat.title}</span>
                <span className={`text-[10px] px-2 py-0.5 rounded-full ${
                  isActive ? 'bg-[#080c14]/20 text-[#080c14] font-black' : 'bg-[#18253d] text-slate-300'
                }`}>
                  {cat.count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Live Counter Strip */}
        <div className="flex items-center justify-between text-xs text-slate-400 mb-6 px-1">
          <span>Showing <strong className="text-white">{filteredDishes.length}</strong> Royal Delicacies</span>
          <span className="text-[#d4af37] font-semibold">100% Pure Desi Ghee Preparation</span>
        </div>

        {/* Dishes Grid */}
        {filteredDishes.length === 0 ? (
          <div className="text-center py-16 bg-[#0d1522] rounded-3xl border border-[#d4af37]/20 shadow-xl">
            <UtensilsCrossed size={40} className="text-[#d4af37] mx-auto mb-3 opacity-60" />
            <h3 className="font-serif text-xl font-bold text-white mb-1">No Dishes Found</h3>
            <p className="text-slate-400 text-sm mb-4">Try searching for something else or reset your filters.</p>
            <button
              onClick={() => {
                setSearchQuery('');
                setActiveCategory('all');
                setActiveDietary('all');
                setActivePrice('all');
              }}
              className="gold-btn px-5 py-2.5 rounded-xl text-xs font-bold"
            >
              Reset All Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredDishes.map((dish) => {
              const inCart = items.find(i => i.id === dish.id);
              const inCartQty = inCart ? inCart.quantity : 0;

              return (
                <div
                  key={dish.id}
                  className="bg-[#0d1522] border border-[#d4af37]/30 hover:border-[#d4af37] rounded-3xl p-6 transition-all duration-300 hover:-translate-y-1 shadow-lg hover:shadow-2xl flex flex-col justify-between group relative overflow-hidden"
                >
                  <div
                    onClick={() => openModal('dish', { dishId: dish.id })}
                    className="flex gap-4 sm:gap-5 mb-5 cursor-pointer"
                  >
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-2 flex-wrap">
                        <span className="w-4 h-4 border border-emerald-500 rounded flex items-center justify-center flex-shrink-0 bg-emerald-950/60" title="100% Pure Veg">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                        </span>
                        <span className="text-xs font-bold text-amber-400 flex items-center gap-1 bg-[#18253d] px-1.5 py-0.5 rounded border border-amber-500/30">
                          <Star size={11} fill="currentColor" /> {dish.rating}
                        </span>
                        <span className="text-slate-400 text-xs flex items-center gap-1">
                          <Clock size={11} /> {dish.prepTime}
                        </span>
                      </div>

                      <h3 className="font-serif font-bold text-base sm:text-lg text-white mb-1.5 leading-snug group-hover:text-[#d4af37] transition line-clamp-1">
                        {dish.name}
                      </h3>
                      <p className="text-slate-300 text-xs leading-relaxed line-clamp-2 mb-3">
                        {dish.description}
                      </p>
                      <span className="text-[11px] font-bold text-[#d4af37] inline-flex items-center gap-1 group-hover:underline">
                        Customize &amp; Portions <ArrowRight size={11} />
                      </span>
                    </div>

                    <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl overflow-hidden flex-shrink-0 bg-slate-900 relative border border-[#d4af37]/30 shadow-md">
                      <img
                        src={dish.image || '/assets/restaurant_thali.jpg'}
                        alt={dish.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        onError={(e) => { (e.target as HTMLImageElement).src = '/assets/restaurant_thali.jpg'; }}
                      />
                    </div>
                  </div>

                  {/* Bottom Row: Price & Actions */}
                  <div className="flex items-center justify-between pt-4 border-t border-[#d4af37]/20 mt-auto gap-3">
                    <div className="flex flex-col">
                      <div className="flex items-baseline gap-1.5">
                        <span className="font-serif text-xl sm:text-2xl font-black text-[#d4af37]">₹{dish.price}</span>
                        {dish.originalPrice && (
                          <span className="text-xs text-slate-500 line-through">₹{dish.originalPrice}</span>
                        )}
                      </div>
                      <span className="text-[11px] text-slate-400 font-medium">({dish.portion || 'Serving'})</span>
                    </div>

                    <div className="flex items-center gap-2">
                      {inCartQty > 0 ? (
                        <div className="flex items-center bg-[#121c2e] border border-[#d4af37] rounded-2xl overflow-hidden shadow-sm p-0.5">
                          <button
                            onClick={() => updateQuantity(dish.id, inCartQty - 1)}
                            className="w-8 h-8 flex items-center justify-center text-slate-200 hover:text-white hover:bg-[#be123c] rounded-xl transition cursor-pointer"
                            title="Decrease quantity"
                          >
                            <Minus size={13} />
                          </button>
                          <span className="px-2 text-xs font-black text-white min-w-5 text-center">
                            {inCartQty}
                          </span>
                          <button
                            onClick={() => updateQuantity(dish.id, inCartQty + 1)}
                            className="w-8 h-8 flex items-center justify-center text-slate-200 hover:text-[#080c14] hover:bg-[#d4af37] rounded-xl transition cursor-pointer"
                            title="Increase quantity"
                          >
                            <Plus size={13} />
                          </button>
                        </div>
                      ) : (
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => openModal('dish', { dishId: dish.id })}
                            className="hidden sm:inline-flex text-[11px] text-slate-300 hover:text-white font-bold px-2.5 py-1.5 rounded-lg border border-[#d4af37]/30 hover:border-[#d4af37] transition cursor-pointer bg-[#18253d]"
                          >
                            Custom
                          </button>
                          <button
                            onClick={() => {
                              addItem({
                                id: dish.id,
                                quantity: 1,
                                portion: 'Full',
                                spice: 'medium',
                                unitPrice: dish.price,
                              });
                              showToast(`Added ${dish.name} to plate!`);
                            }}
                            className="gold-btn px-4 sm:px-5 py-2.5 rounded-2xl text-xs sm:text-sm cursor-pointer shadow-md flex items-center gap-1.5 hover:scale-[1.02] active:scale-[0.98]"
                          >
                            <span className="w-4 h-4 rounded-full bg-[#080c14]/20 flex items-center justify-center shrink-0">
                              <Plus size={11} className="stroke-[3] text-[#080c14]" />
                            </span>
                            <span>Add</span>
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

      </div>
    </section>
  );
}

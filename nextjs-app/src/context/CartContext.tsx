'use client';

import React, { createContext, useContext, useReducer, useCallback, useEffect } from 'react';
import { CartItem, CouponInfo } from '@/lib/types';
import { getProductById } from '@/lib/products';

interface CartState {
  items: CartItem[];
  coupon: CouponInfo | null;
  isCartOpen: boolean;
}

type CartAction =
  | { type: 'ADD_ITEM'; payload: { id: string; quantity: number } }
  | { type: 'REMOVE_ITEM'; payload: string }
  | { type: 'UPDATE_QUANTITY'; payload: { id: string; quantity: number } }
  | { type: 'CLEAR_CART' }
  | { type: 'APPLY_COUPON'; payload: CouponInfo }
  | { type: 'REMOVE_COUPON' }
  | { type: 'TOGGLE_CART' }
  | { type: 'SET_CART_OPEN'; payload: boolean }
  | { type: 'LOAD_CART'; payload: { items: CartItem[]; coupon: CouponInfo | null } };

function cartReducer(state: CartState, action: CartAction): CartState {
  switch (action.type) {
    case 'ADD_ITEM': {
      const existing = state.items.find(i => i.id === action.payload.id);
      if (existing) {
        return {
          ...state,
          items: state.items.map(i =>
            i.id === action.payload.id
              ? { ...i, quantity: Math.min(10, i.quantity + action.payload.quantity) }
              : i
          ),
        };
      }
      return {
        ...state,
        items: [...state.items, { id: action.payload.id, quantity: action.payload.quantity }],
      };
    }
    case 'REMOVE_ITEM':
      return { ...state, items: state.items.filter(i => i.id !== action.payload) };
    case 'UPDATE_QUANTITY':
      return {
        ...state,
        items: state.items.map(i =>
          i.id === action.payload.id
            ? { ...i, quantity: Math.max(1, Math.min(10, action.payload.quantity)) }
            : i
        ),
      };
    case 'CLEAR_CART':
      return { ...state, items: [], coupon: null };
    case 'APPLY_COUPON':
      return { ...state, coupon: action.payload };
    case 'REMOVE_COUPON':
      return { ...state, coupon: null };
    case 'TOGGLE_CART':
      return { ...state, isCartOpen: !state.isCartOpen };
    case 'SET_CART_OPEN':
      return { ...state, isCartOpen: action.payload };
    case 'LOAD_CART':
      return { ...state, items: action.payload.items, coupon: action.payload.coupon };
    default:
      return state;
  }
}

interface CartContextType {
  items: CartItem[];
  coupon: CouponInfo | null;
  isCartOpen: boolean;
  addItem: (id: string, quantity?: number) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
  applyCoupon: (code: string) => string | null;
  removeCoupon: () => void;
  toggleCart: () => void;
  setCartOpen: (open: boolean) => void;
  totalItems: number;
  subtotal: number;
  discount: number;
  grandTotal: number;
  gstAmount: number;
  baseAmount: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(cartReducer, {
    items: [],
    coupon: null,
    isCartOpen: false,
  });

  useEffect(() => {
    try {
      const savedItems = localStorage.getItem('hitachi_cart');
      const savedCoupon = localStorage.getItem('hitachi_coupon');
      if (savedItems || savedCoupon) {
        dispatch({
          type: 'LOAD_CART',
          payload: {
            items: savedItems ? JSON.parse(savedItems) : [],
            coupon: savedCoupon ? JSON.parse(savedCoupon) : null,
          },
        });
      }
    } catch { /* ignore */ }
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem('hitachi_cart', JSON.stringify(state.items));
      if (state.coupon) {
        localStorage.setItem('hitachi_coupon', JSON.stringify(state.coupon));
      } else {
        localStorage.removeItem('hitachi_coupon');
      }
    } catch { /* ignore */ }
  }, [state.items, state.coupon]);

  const subtotal = state.items.reduce((sum, item) => {
    const product = getProductById(item.id);
    return sum + (product ? product.price * item.quantity : 0);
  }, 0);

  const discount = state.coupon ? state.coupon.discount : 0;
  const discountedSubtotal = Math.max(0, subtotal - discount);
  const baseAmount = Math.round(discountedSubtotal / 1.18);
  const gstAmount = discountedSubtotal - baseAmount;
  const grandTotal = discountedSubtotal;
  const totalItems = state.items.reduce((sum, item) => sum + item.quantity, 0);

  const addItem = useCallback((id: string, quantity = 1) => {
    dispatch({ type: 'ADD_ITEM', payload: { id, quantity } });
  }, []);

  const removeItem = useCallback((id: string) => {
    dispatch({ type: 'REMOVE_ITEM', payload: id });
  }, []);

  const updateQuantity = useCallback((id: string, quantity: number) => {
    dispatch({ type: 'UPDATE_QUANTITY', payload: { id, quantity } });
  }, []);

  const clearCart = useCallback(() => {
    dispatch({ type: 'CLEAR_CART' });
  }, []);

  const applyCoupon = useCallback((code: string): string | null => {
    const upperCode = code.toUpperCase().trim();
    if (upperCode === 'HITACHI5000' && subtotal >= 40000) {
      dispatch({ type: 'APPLY_COUPON', payload: { code: 'HITACHI5000', label: 'HITACHI5000 (Rs.5,000 Exclusive Brand Shop Instant Discount)', discount: 5000 } });
      return null;
    } else if (upperCode === 'FIRSTBUY') {
      const disc = Math.min(2000, Math.round(subtotal * 0.05));
      dispatch({ type: 'APPLY_COUPON', payload: { code: 'FIRSTBUY', label: 'FIRSTBUY (5% Welcome Discount)', discount: disc } });
      return null;
    } else if (upperCode === 'COOLSUMMER' && subtotal >= 30000) {
      dispatch({ type: 'APPLY_COUPON', payload: { code: 'COOLSUMMER', label: 'COOLSUMMER (Rs.2,500 Summer Cooling Offer)', discount: 2500 } });
      return null;
    }
    return 'Invalid coupon code or minimum cart value not met.';
  }, [subtotal]);

  const removeCoupon = useCallback(() => {
    dispatch({ type: 'REMOVE_COUPON' });
  }, []);

  const toggleCart = useCallback(() => {
    dispatch({ type: 'TOGGLE_CART' });
  }, []);

  const setCartOpen = useCallback((open: boolean) => {
    dispatch({ type: 'SET_CART_OPEN', payload: open });
  }, []);

  return (
    <CartContext.Provider
      value={{
        items: state.items,
        coupon: state.coupon,
        isCartOpen: state.isCartOpen,
        addItem,
        removeItem,
        updateQuantity,
        clearCart,
        applyCoupon,
        removeCoupon,
        toggleCart,
        setCartOpen,
        totalItems,
        subtotal,
        discount,
        grandTotal,
        gstAmount,
        baseAmount,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}

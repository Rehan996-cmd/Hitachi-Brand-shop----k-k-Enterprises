'use client';

import React, { createContext, useContext, useReducer, useCallback, useEffect } from 'react';
import { CartItem, CouponInfo, DiningMode, Order } from '@/lib/types';
import { DISH_MAP } from '@/lib/products';
import { sound } from '@/lib/sound';

interface CartState {
  items: CartItem[];
  diningMode: DiningMode;
  selectedRoom: string;
  selectedTable: string;
  coupon: CouponInfo | null;
  activeOrder: Order | null;
  isCartOpen: boolean;
}

type CartAction =
  | { type: 'ADD_ITEM'; payload: CartItem }
  | { type: 'REMOVE_ITEM'; payload: string }
  | { type: 'UPDATE_QUANTITY'; payload: { id: string; quantity: number } }
  | { type: 'CLEAR_CART' }
  | { type: 'SET_DINING_MODE'; payload: DiningMode }
  | { type: 'SET_ROOM'; payload: string }
  | { type: 'SET_TABLE'; payload: string }
  | { type: 'APPLY_COUPON'; payload: CouponInfo }
  | { type: 'REMOVE_COUPON' }
  | { type: 'SET_CART_OPEN'; payload: boolean }
  | { type: 'SET_ACTIVE_ORDER'; payload: Order | null }
  | { type: 'LOAD_CART'; payload: { items: CartItem[]; diningMode?: DiningMode; selectedRoom?: string } };

function cartReducer(state: CartState, action: CartAction): CartState {
  switch (action.type) {
    case 'ADD_ITEM': {
      const existing = state.items.find(i => i.id === action.payload.id);
      if (existing) {
        return {
          ...state,
          items: state.items.map(i =>
            i.id === action.payload.id
              ? { ...i, quantity: i.quantity + action.payload.quantity }
              : i
          ),
        };
      }
      return {
        ...state,
        items: [...state.items, action.payload],
      };
    }
    case 'REMOVE_ITEM':
      return { ...state, items: state.items.filter(i => i.id !== action.payload) };
    case 'UPDATE_QUANTITY':
      if (action.payload.quantity <= 0) {
        return { ...state, items: state.items.filter(i => i.id !== action.payload.id) };
      }
      return {
        ...state,
        items: state.items.map(i =>
          i.id === action.payload.id ? { ...i, quantity: action.payload.quantity } : i
        ),
      };
    case 'CLEAR_CART':
      return { ...state, items: [], coupon: null };
    case 'SET_DINING_MODE':
      return { ...state, diningMode: action.payload };
    case 'SET_ROOM':
      return { ...state, selectedRoom: action.payload };
    case 'SET_TABLE':
      return { ...state, selectedTable: action.payload };
    case 'APPLY_COUPON':
      return { ...state, coupon: action.payload };
    case 'REMOVE_COUPON':
      return { ...state, coupon: null };
    case 'SET_CART_OPEN':
      return { ...state, isCartOpen: action.payload };
    case 'SET_ACTIVE_ORDER':
      return { ...state, activeOrder: action.payload };
    case 'LOAD_CART':
      return {
        ...state,
        items: action.payload.items || [],
        diningMode: action.payload.diningMode || state.diningMode,
        selectedRoom: action.payload.selectedRoom || state.selectedRoom,
      };
    default:
      return state;
  }
}

interface CartContextType {
  items: CartItem[];
  diningMode: DiningMode;
  selectedRoom: string;
  selectedTable: string;
  coupon: CouponInfo | null;
  activeOrder: Order | null;
  isCartOpen: boolean;
  addItem: (item: CartItem) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
  setDiningMode: (mode: DiningMode) => void;
  setSelectedRoom: (room: string) => void;
  setSelectedTable: (table: string) => void;
  applyCoupon: (code: string) => { success: boolean; message: string };
  removeCoupon: () => void;
  setIsCartOpen: (open: boolean) => void;
  toggleCart: () => void;
  setActiveOrder: (order: Order | null) => void;
  subtotal: number;
  discount: number;
  gst: number;
  gstAmount: number;
  baseAmount: number;
  deliveryFee: number;
  grandTotal: number;
  itemCount: number;
  totalItems: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(cartReducer, {
    items: [],
    diningMode: 'delivery',
    selectedRoom: '204',
    selectedTable: 'Table 4',
    coupon: null,
    activeOrder: null,
    isCartOpen: false,
  });

  // Load from local storage
  useEffect(() => {
    try {
      const saved = localStorage.getItem('shivansh_next_cart');
      if (saved) {
        const parsed = JSON.parse(saved);
        dispatch({ type: 'LOAD_CART', payload: parsed });
      }
    } catch {}
  }, []);

  // Save to local storage
  useEffect(() => {
    try {
      localStorage.setItem('shivansh_next_cart', JSON.stringify({
        items: state.items,
        diningMode: state.diningMode,
        selectedRoom: state.selectedRoom,
      }));
    } catch {}
  }, [state.items, state.diningMode, state.selectedRoom]);

  const addItem = useCallback((item: CartItem) => {
    sound.playDishAdded();
    dispatch({ type: 'ADD_ITEM', payload: item });
  }, []);

  const removeItem = useCallback((id: string) => {
    sound.playClick();
    dispatch({ type: 'REMOVE_ITEM', payload: id });
  }, []);

  const updateQuantity = useCallback((id: string, quantity: number) => {
    sound.playClick();
    dispatch({ type: 'UPDATE_QUANTITY', payload: { id, quantity } });
  }, []);

  const clearCart = useCallback(() => {
    sound.playClick();
    dispatch({ type: 'CLEAR_CART' });
  }, []);

  const setDiningMode = useCallback((mode: DiningMode) => {
    if (mode === 'room') {
      sound.playRoomBell();
    } else {
      sound.playClick();
    }
    dispatch({ type: 'SET_DINING_MODE', payload: mode });
  }, []);

  const setSelectedRoom = useCallback((room: string) => {
    dispatch({ type: 'SET_ROOM', payload: room });
  }, []);

  const setSelectedTable = useCallback((table: string) => {
    dispatch({ type: 'SET_TABLE', payload: table });
  }, []);

  const setIsCartOpen = useCallback((open: boolean) => {
    sound.playClick();
    dispatch({ type: 'SET_CART_OPEN', payload: open });
  }, []);

  const toggleCart = useCallback(() => {
    sound.playClick();
    dispatch({ type: 'SET_CART_OPEN', payload: !state.isCartOpen });
  }, [state.isCartOpen]);

  const setActiveOrder = useCallback((order: Order | null) => {
    dispatch({ type: 'SET_ACTIVE_ORDER', payload: order });
  }, []);

  const removeCoupon = useCallback(() => {
    dispatch({ type: 'REMOVE_COUPON' });
  }, []);

  // Calculate pricing
  let subtotal = 0;
  state.items.forEach(item => {
    const dish = DISH_MAP[item.id];
    const unitPrice = item.unitPrice || (dish ? dish.price : 0);
    subtotal += unitPrice * item.quantity;
  });

  let discount = 0;
  if (state.coupon) {
    discount = state.coupon.discount;
  }

  const baseAmount = Math.max(0, subtotal - discount);
  const gst = Math.round(baseAmount * 0.05);

  let deliveryFee = 0;
  if (state.diningMode === 'delivery') {
    deliveryFee = baseAmount >= 500 || baseAmount === 0 ? 0 : 30;
  }

  const grandTotal = baseAmount + gst + deliveryFee;
  const itemCount = state.items.reduce((s, i) => s + i.quantity, 0);

  const applyCoupon = useCallback((codeRaw: string) => {
    const code = codeRaw.trim().toUpperCase();
    if (!code) return { success: false, message: 'Please enter a coupon code' };

    if (code === 'SHIVANSH10') {
      if (subtotal < 250) {
        return { success: false, message: 'Valid on orders of ₹250 or more.' };
      }
      const disc = Math.min(Math.round(subtotal * 0.10), 150);
      dispatch({ type: 'APPLY_COUPON', payload: { code, label: '10% OFF', discount: disc } });
      return { success: true, message: `Coupon applied! Saved ₹${disc}` };
    } else if (code === 'ROOMGUEST') {
      if (state.diningMode !== 'room') {
        return { success: false, message: 'Valid only for In-Room Dining orders.' };
      }
      const disc = Math.min(Math.round(subtotal * 0.15), 200);
      dispatch({ type: 'APPLY_COUPON', payload: { code, label: '15% Guest Special', discount: disc } });
      return { success: true, message: `Guest discount applied! Saved ₹${disc}` };
    } else if (code === 'FLAT50') {
      if (subtotal < 300) {
        return { success: false, message: 'Valid on orders of ₹300 or above.' };
      }
      dispatch({ type: 'APPLY_COUPON', payload: { code, label: 'Flat ₹50 OFF', discount: 50 } });
      return { success: true, message: 'Flat ₹50 OFF applied!' };
    }

    return { success: false, message: 'Invalid coupon. Try SHIVANSH10 or FLAT50.' };
  }, [subtotal, state.diningMode]);

  return (
    <CartContext.Provider
      value={{
        items: state.items,
        diningMode: state.diningMode,
        selectedRoom: state.selectedRoom,
        selectedTable: state.selectedTable,
        coupon: state.coupon,
        activeOrder: state.activeOrder,
        isCartOpen: state.isCartOpen,
        addItem,
        removeItem,
        updateQuantity,
        clearCart,
        setDiningMode,
        setSelectedRoom,
        setSelectedTable,
        applyCoupon,
        removeCoupon,
        setIsCartOpen,
        toggleCart,
        setActiveOrder,
        subtotal,
        discount,
        gst,
        gstAmount: gst,
        baseAmount,
        deliveryFee,
        grandTotal,
        itemCount,
        totalItems: itemCount,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) throw new Error('useCart must be used within a CartProvider');
  return context;
}

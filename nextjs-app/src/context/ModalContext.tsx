'use client';

import React, { createContext, useContext, useState, useCallback, useEffect } from 'react';
import { sound } from '@/lib/sound';

export type ModalName = 'dish' | 'checkout' | 'orderSuccess' | 'trackOrder' | 'roomInquiry' | 'gallery' | 'reviewForm' | 'kitchenTerminal' | 'riderTerminal' | null;

interface ToastOptions {
  message: string;
  type?: 'success' | 'info' | 'gold';
  icon?: string;
}

interface ModalContextType {
  activeModal: ModalName;
  modalData: Record<string, unknown>;
  openModal: (name: ModalName, data?: Record<string, unknown>) => void;
  closeModal: () => void;
  showToast: (message: string, options?: Omit<ToastOptions, 'message'>) => void;
  toast: ToastOptions | null;
  isSoundMuted: boolean;
  toggleSound: () => void;
}

const ModalContext = createContext<ModalContextType | undefined>(undefined);

export function ModalProvider({ children }: { children: React.ReactNode }) {
  const [activeModal, setActiveModal] = useState<ModalName>(null);
  const [modalData, setModalData] = useState<Record<string, unknown>>({});
  const [toast, setToast] = useState<ToastOptions | null>(null);
  const [isSoundMuted, setIsSoundMuted] = useState(false);

  useEffect(() => {
    setIsSoundMuted(sound.getIsMuted());
  }, []);

  const toggleSound = useCallback(() => {
    const muted = sound.toggleMute();
    setIsSoundMuted(muted);
    if (!muted) {
      sound.playRoomBell();
    }
  }, []);

  const openModal = useCallback((name: ModalName, data: Record<string, unknown> = {}) => {
    setActiveModal(name);
    setModalData(data);
    sound.playClick();
    if (typeof document !== 'undefined') {
      document.body.style.overflow = 'hidden';
    }
  }, []);

  const closeModal = useCallback(() => {
    setActiveModal(null);
    setModalData({});
    sound.playClick();
    if (typeof document !== 'undefined') {
      document.body.style.overflow = '';
    }
  }, []);

  const showToast = useCallback((message: string, options: Omit<ToastOptions, 'message'> = {}) => {
    setToast({
      message,
      type: options.type || 'gold',
      icon: options.icon || '🛎️',
    });
    sound.playDishAdded();
    setTimeout(() => setToast(null), 3200);
  }, []);

  return (
    <ModalContext.Provider value={{ activeModal, modalData, openModal, closeModal, showToast, toast, isSoundMuted, toggleSound }}>
      {children}
      
      {/* Luxury Obsidian Gold Toast Notification */}
      {toast && (
        <div className="fixed top-20 sm:top-24 left-1/2 -translate-x-1/2 z-[9999] pointer-events-none transition-all duration-300 animate-slideUp">
          <div className="bg-[#0c1220]/95 text-white font-bold px-5 py-3 rounded-2xl shadow-[0_12px_40px_rgba(0,0,0,0.85)] border border-[#d4af37]/50 backdrop-blur-xl flex items-center gap-3 text-xs sm:text-sm">
            <span className="text-base">{toast.icon}</span>
            <span className="text-slate-100">{toast.message}</span>
            <span className="w-2 h-2 rounded-full bg-[#d4af37] animate-pulse" />
          </div>
        </div>
      )}
    </ModalContext.Provider>
  );
}

export function useModal() {
  const context = useContext(ModalContext);
  if (!context) throw new Error('useModal must be used within a ModalProvider');
  return context;
}

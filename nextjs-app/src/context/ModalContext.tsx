'use client';

import React, { createContext, useContext, useState, useCallback } from 'react';

type ModalName = 'product' | 'compare' | 'quote' | 'checkout' | 'orderSuccess' | 'trackOrder' | 'invoice' | null;

interface ModalContextType {
  activeModal: ModalName;
  modalData: Record<string, unknown>;
  openModal: (name: ModalName, data?: Record<string, unknown>) => void;
  closeModal: () => void;
  showToast: (message: string) => void;
  toastMessage: string | null;
}

const ModalContext = createContext<ModalContextType | undefined>(undefined);

export function ModalProvider({ children }: { children: React.ReactNode }) {
  const [activeModal, setActiveModal] = useState<ModalName>(null);
  const [modalData, setModalData] = useState<Record<string, unknown>>({});
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const openModal = useCallback((name: ModalName, data: Record<string, unknown> = {}) => {
    setActiveModal(name);
    setModalData(data);
    document.body.style.overflow = 'hidden';
  }, []);

  const closeModal = useCallback(() => {
    setActiveModal(null);
    setModalData({});
    document.body.style.overflow = '';
  }, []);

  const showToast = useCallback((message: string) => {
    setToastMessage(message);
    setTimeout(() => setToastMessage(null), 3500);
  }, []);

  return (
    <ModalContext.Provider value={{ activeModal, modalData, openModal, closeModal, showToast, toastMessage }}>
      {children}
      {toastMessage && (
        <div className="toast-notification">
          {toastMessage}
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

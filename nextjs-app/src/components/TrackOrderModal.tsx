'use client';

import { useState } from 'react';
import { X, Search, Package, CheckCircle2, Truck, Home, Clock } from 'lucide-react';
import { useModal } from '@/context/ModalContext';

export default function TrackOrderModal() {
  const { activeModal, modalData, closeModal, showToast } = useModal();
  const [trackInput, setTrackInput] = useState((modalData.orderId as string) || '');
  const [orderFound, setOrderFound] = useState<boolean | null>(modalData.orderId ? true : null);

  if (activeModal !== 'trackOrder') return null;

  const handleTrack = () => {
    if (!trackInput.trim()) { showToast('Please enter an Order ID'); return; }
    try {
      const data = localStorage.getItem(`order_${trackInput.trim()}`);
      setOrderFound(!!data);
      if (!data) showToast('No order found with this ID. Please check and try again.');
    } catch { setOrderFound(false); }
  };

  const timeline = [
    { step: 'Order Placed & Confirmed', status: 'completed' as const, icon: <CheckCircle2 size={14} /> },
    { step: 'Payment Verification', status: 'completed' as const, icon: <CheckCircle2 size={14} /> },
    { step: 'Order Processing & Packaging', status: 'active' as const, icon: <Package size={14} /> },
    { step: 'Out for Delivery & Installation', status: 'pending' as const, icon: <Truck size={14} /> },
    { step: 'Delivered, Installed & Activated', status: 'pending' as const, icon: <Home size={14} /> },
  ];

  return (
    <div className="modal-backdrop open" onClick={(e) => { if (e.target === e.currentTarget) closeModal(); }}>
      <div className="modal-card order-tracking-card">
        <button className="modal-close-btn" onClick={closeModal}><X size={18} /></button>

        <div style={{ padding: 28 }}>
          <h3 style={{ fontSize: '1.2rem', fontWeight: 800, marginBottom: 16, fontFamily: 'var(--font-display)', display: 'flex', alignItems: 'center', gap: 10 }}>
            <Search size={20} /> Track Your Order
          </h3>

          <div style={{ display: 'flex', gap: 8, marginBottom: 20 }}>
            <input type="text" className="form-input" placeholder="Enter Order ID (e.g. KK-123456-789)" value={trackInput} onChange={(e) => setTrackInput(e.target.value)} style={{ flex: 1 }} />
            <button className="btn btn-primary" onClick={handleTrack}>Track</button>
          </div>

          {orderFound && (
            <div>
              <div style={{ padding: '12px 16px', background: '#dcfce7', borderRadius: 'var(--radius-md)', fontSize: '0.85rem', color: '#15803d', fontWeight: 600, marginBottom: 16 }}>
                <CheckCircle2 size={16} style={{ display: 'inline', verticalAlign: 'middle', marginRight: 6 }} />
                Order {trackInput} found! Current status: Processing.
              </div>

              <div className="track-timeline">
                {timeline.map((item, i) => (
                  <div className={`track-step ${item.status}`} key={i}>
                    <div className="track-dot">{item.icon}</div>
                    <div className="track-info">
                      <strong>{item.step}</strong>
                      <span>
                        {item.status === 'completed' ? 'Completed' : item.status === 'active' ? (
                          <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4 }}><Clock size={12} /> In Progress...</span>
                        ) : 'Pending'}
                      </span>
                    </div>
                  </div>
                ))}
              </div>

              <div style={{ padding: '14px 18px', background: '#eff6ff', borderRadius: 'var(--radius-md)', fontSize: '0.85rem', color: '#1e40af', marginTop: 16 }}>
                <strong>Need help?</strong> Contact our order team at <a href="tel:+919587111100" style={{ fontWeight: 800 }}>+91 95871 11100</a> or chat on WhatsApp.
              </div>
            </div>
          )}

          {orderFound === false && (
            <div style={{ textAlign: 'center', padding: '30px 0' }}>
              <Search size={40} color="var(--text-muted)" />
              <h4 style={{ marginTop: 12 }}>Order Not Found</h4>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>Please double-check the Order ID or contact us at +91 95871 11100.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

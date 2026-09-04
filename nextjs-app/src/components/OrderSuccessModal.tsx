'use client';

import { CheckCircle2, Package, Truck } from 'lucide-react';
import { useModal } from '@/context/ModalContext';

export default function OrderSuccessModal() {
  const { activeModal, modalData, closeModal, openModal } = useModal();

  if (activeModal !== 'orderSuccess') return null;

  const orderId = modalData.orderId as string;

  return (
    <div className="modal-backdrop open" onClick={(e) => { if (e.target === e.currentTarget) closeModal(); }}>
      <div className="modal-card order-success-card">
        <div className="success-check-circle">
          <CheckCircle2 size={32} />
        </div>

        <h2 style={{ fontSize: '1.5rem', fontWeight: 900, marginBottom: 8, fontFamily: 'var(--font-display)' }}>Order Placed Successfully!</h2>
        <p style={{ color: 'var(--text-secondary)', marginBottom: 16 }}>Thank you for choosing K.K. Enterprises Hitachi Brand Shop. Our team will contact you within 30 minutes to confirm delivery.</p>

        <div className="order-id-display">{orderId}</div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 12, textAlign: 'left', padding: '20px 0' }}>
          <div style={{ display: 'flex', gap: 12, padding: 14, background: 'var(--bg-alt)', borderRadius: 'var(--radius-md)' }}>
            <Package size={20} color="var(--hitachi-red)" style={{ flexShrink: 0, marginTop: 2 }} />
            <div>
              <strong style={{ fontSize: '0.88rem' }}>Order Confirmation</strong>
              <p style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', margin: 0 }}>You will receive an SMS and WhatsApp confirmation with full order details and invoice.</p>
            </div>
          </div>
          <div style={{ display: 'flex', gap: 12, padding: 14, background: 'var(--bg-alt)', borderRadius: 'var(--radius-md)' }}>
            <Truck size={20} color="var(--accent-green)" style={{ flexShrink: 0, marginTop: 2 }} />
            <div>
              <strong style={{ fontSize: '0.88rem' }}>Delivery & Installation</strong>
              <p style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', margin: 0 }}>Our certified technicians will deliver and install your product at your chosen time slot in Sikar.</p>
            </div>
          </div>
        </div>

        <div style={{ display: 'flex', gap: 10 }}>
          <button className="btn btn-primary" style={{ flex: 1, padding: 12 }} onClick={() => { closeModal(); openModal('trackOrder', { orderId }); }}>
            Track This Order
          </button>
          <a href={`https://wa.me/919587111100?text=${encodeURIComponent(`Hi K.K. Enterprises, I just placed order ${orderId}. Please confirm delivery schedule.`)}`} target="_blank" rel="noopener" className="btn btn-whatsapp" style={{ flex: 1, padding: 12 }}>
            WhatsApp Support
          </a>
        </div>

        <button onClick={closeModal} style={{ marginTop: 16, background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer', fontWeight: 600, fontSize: '0.85rem' }}>
          Continue Shopping
        </button>
      </div>
    </div>
  );
}

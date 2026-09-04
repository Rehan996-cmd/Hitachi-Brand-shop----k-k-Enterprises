'use client';

import { useState } from 'react';
import { X, Shield, CreditCard, Smartphone, Banknote, ArrowRight, Copy, ChevronRight, Wallet } from 'lucide-react';
import { useModal } from '@/context/ModalContext';
import { useCart } from '@/context/CartContext';
import { getProductById } from '@/lib/products';
import type { PaymentMethod } from '@/lib/types';

export default function CheckoutModal() {
  const { activeModal, closeModal, openModal, showToast } = useModal();
  const { items, subtotal, discount, grandTotal, gstAmount, baseAmount, coupon, clearCart } = useCart();
  const [step, setStep] = useState(1);
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('UPI_QR');

  const [customer, setCustomer] = useState({
    name: '', phone: '', email: '', address: '', landmark: '', city: 'Sikar', pincode: '', deliverySlot: 'morning', gstin: ''
  });

  if (activeModal !== 'checkout') return null;

  const handleCustomerChange = (field: string, value: string) => {
    setCustomer(prev => ({ ...prev, [field]: value }));
  };

  const validateStep1 = () => {
    if (!customer.name || !customer.phone || !customer.address || !customer.pincode) {
      showToast('Please fill all required delivery fields.');
      return false;
    }
    if (!/^[6-9]\d{9}$/.test(customer.phone.replace(/\s/g, ''))) {
      showToast('Please enter a valid 10-digit Indian phone number.');
      return false;
    }
    if (!/^\d{6}$/.test(customer.pincode)) {
      showToast('Please enter a valid 6-digit PIN code.');
      return false;
    }
    return true;
  };

  const handlePlaceOrder = () => {
    const orderId = `KK-${Date.now().toString().slice(-6)}-${Math.floor(Math.random() * 1000)}`;
    const orderData = {
      orderId,
      customer,
      items: items.map(i => {
        const p = getProductById(i.id);
        return { ...i, name: p?.name || '', price: p?.price || 0 };
      }),
      subtotal, discount, grandTotal, gstAmount, baseAmount,
      couponCode: coupon?.code || null,
      paymentMethod,
      createdAt: new Date().toISOString(),
    };

    try { localStorage.setItem(`order_${orderId}`, JSON.stringify(orderData)); } catch { /* ignore */ }

    clearCart();
    closeModal();
    openModal('orderSuccess', { orderId, orderData });
  };

  return (
    <div className="modal-backdrop open" onClick={(e) => { if (e.target === e.currentTarget) closeModal(); }}>
      <div className="modal-card checkout-modal-card">
        <div className="checkout-header">
          <h3><Shield size={20} /> Secure Checkout - K.K. Enterprises</h3>
          <button className="modal-close-btn" onClick={closeModal} style={{ position: 'static' }}><X size={18} /></button>
        </div>

        <div className="checkout-steps-nav">
          <div className={`step-indicator${step === 1 ? ' active' : step > 1 ? ' completed' : ''}`}>
            <span className="step-num">1</span>
            <span>Delivery Info</span>
          </div>
          <ChevronRight size={16} className="step-sep" />
          <div className={`step-indicator${step === 2 ? ' active' : step > 2 ? ' completed' : ''}`}>
            <span className="step-num">2</span>
            <span>Payment</span>
          </div>
          <ChevronRight size={16} className="step-sep" />
          <div className={`step-indicator${step === 3 ? ' active' : ''}`}>
            <span className="step-num">3</span>
            <span>Confirm</span>
          </div>
        </div>

        <div className="checkout-body">
          {/* Step 1: Customer Details */}
          {step === 1 && (
            <div>
              <h4 style={{ fontSize: '1.05rem', fontWeight: 800, marginBottom: 16 }}>Delivery Details - Sikar & Surrounding Areas</h4>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
                <div className="form-group"><label>Full Name *</label><input type="text" className="form-input" value={customer.name} onChange={e => handleCustomerChange('name', e.target.value)} placeholder="Rajesh Sharma" /></div>
                <div className="form-group"><label>Phone (WhatsApp) *</label><input type="tel" className="form-input" value={customer.phone} onChange={e => handleCustomerChange('phone', e.target.value)} placeholder="98290 12345" /></div>
                <div className="form-group" style={{ gridColumn: 'span 2' }}><label>Email (For Invoice)</label><input type="email" className="form-input" value={customer.email} onChange={e => handleCustomerChange('email', e.target.value)} placeholder="email@example.com" /></div>
                <div className="form-group" style={{ gridColumn: 'span 2' }}><label>Delivery Address in Sikar *</label><input type="text" className="form-input" value={customer.address} onChange={e => handleCustomerChange('address', e.target.value)} placeholder="House No, Street, Colony" /></div>
                <div className="form-group"><label>Landmark</label><input type="text" className="form-input" value={customer.landmark} onChange={e => handleCustomerChange('landmark', e.target.value)} placeholder="Near..." /></div>
                <div className="form-group"><label>PIN Code *</label><input type="text" className="form-input" value={customer.pincode} onChange={e => handleCustomerChange('pincode', e.target.value)} placeholder="332001" maxLength={6} /></div>
                <div className="form-group"><label>Delivery Slot</label>
                  <select className="form-select" value={customer.deliverySlot} onChange={e => handleCustomerChange('deliverySlot', e.target.value)}>
                    <option value="morning">Morning (10 AM - 1 PM)</option>
                    <option value="afternoon">Afternoon (2 PM - 5 PM)</option>
                    <option value="evening">Evening (5 PM - 8 PM)</option>
                  </select>
                </div>
                <div className="form-group"><label>GSTIN (For Business Invoice)</label><input type="text" className="form-input" value={customer.gstin} onChange={e => handleCustomerChange('gstin', e.target.value)} placeholder="Optional" /></div>
              </div>
              <button className="btn btn-primary" style={{ width: '100%', padding: 14, marginTop: 20 }} onClick={() => { if (validateStep1()) setStep(2); }}>
                Continue to Payment <ArrowRight size={16} />
              </button>
            </div>
          )}

          {/* Step 2: Payment */}
          {step === 2 && (
            <div>
              <h4 style={{ fontSize: '1.05rem', fontWeight: 800, marginBottom: 16 }}>Choose Payment Method</h4>

              <div className="payment-tabs-bar">
                {([
                  { key: 'UPI_QR' as PaymentMethod, icon: <Smartphone size={18} />, label: 'UPI / QR Code', badge: 'Instant' },
                  { key: 'CARD' as PaymentMethod, icon: <CreditCard size={18} />, label: 'Debit / Credit Card', badge: null },
                  { key: 'NETBANKING' as PaymentMethod, icon: <Wallet size={18} />, label: 'Net Banking', badge: null },
                  { key: 'EMI' as PaymentMethod, icon: <CreditCard size={18} />, label: '0% EMI (Bajaj / HDFC)', badge: '0% Interest' },
                  { key: 'COD' as PaymentMethod, icon: <Banknote size={18} />, label: 'Cash on Delivery (COD)', badge: null },
                ]).map(tab => (
                  <div key={tab.key} className={`pay-tab${paymentMethod === tab.key ? ' active' : ''}`} onClick={() => setPaymentMethod(tab.key)}>
                    {tab.icon}
                    <span>{tab.label}</span>
                    {tab.badge && <span className="pay-tab-badge">{tab.badge}</span>}
                  </div>
                ))}
              </div>

              {paymentMethod === 'UPI_QR' && (
                <div className="upi-qr-wrapper">
                  <div className="qr-timer-text">Scan with any UPI app to pay Rs.{grandTotal.toLocaleString('en-IN')}</div>
                  <div className="upi-qr-box">
                    <div style={{ textAlign: 'center', color: 'var(--text-muted)', fontSize: '0.82rem', padding: 20 }}>
                      <Smartphone size={40} color="var(--hitachi-red)" style={{ marginBottom: 8 }} />
                      <div>QR Code will appear after order confirmation</div>
                    </div>
                  </div>
                  <div className="upi-apps-row">
                    <span className="upi-app-pill">Google Pay</span>
                    <span className="upi-app-pill">PhonePe</span>
                    <span className="upi-app-pill">Paytm</span>
                    <span className="upi-app-pill">BHIM</span>
                  </div>
                  <div className="upi-id-copy-row">
                    <span>UPI ID: <strong>kkenterprises@upi</strong></span>
                    <button onClick={() => { navigator.clipboard.writeText('kkenterprises@upi'); showToast('UPI ID copied!'); }} style={{ background: 'none', border: '1px solid var(--border-light)', borderRadius: 4, padding: '4px 8px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 4, fontSize: '0.78rem' }}><Copy size={12} /> Copy</button>
                  </div>
                </div>
              )}

              {paymentMethod === 'EMI' && (
                <div className="emi-options-box">
                  <h5 style={{ marginBottom: 12, fontWeight: 700 }}>0% Interest EMI Plans</h5>
                  <table className="emi-table">
                    <thead><tr><th>Duration</th><th>Monthly EMI</th><th>Interest</th><th>Bank Partners</th></tr></thead>
                    <tbody>
                      <tr><td>3 Months</td><td>Rs.{Math.round(grandTotal / 3).toLocaleString('en-IN')}</td><td style={{ color: 'var(--accent-green)' }}>0%</td><td>Bajaj, HDFC, ICICI</td></tr>
                      <tr><td>6 Months</td><td>Rs.{Math.round(grandTotal / 6).toLocaleString('en-IN')}</td><td style={{ color: 'var(--accent-green)' }}>0%</td><td>Bajaj, HDFC, SBI</td></tr>
                      <tr><td>12 Months</td><td>Rs.{Math.round(grandTotal / 12).toLocaleString('en-IN')}</td><td style={{ color: 'var(--accent-green)' }}>0%</td><td>Bajaj Finance</td></tr>
                      <tr><td>18 Months</td><td>Rs.{Math.round(grandTotal / 18).toLocaleString('en-IN')}</td><td>2% Flat</td><td>Bajaj Finance</td></tr>
                    </tbody>
                  </table>
                </div>
              )}

              <div style={{ display: 'flex', gap: 10, marginTop: 20 }}>
                <button className="btn btn-outline" style={{ flex: 1, padding: 12 }} onClick={() => setStep(1)}>Back</button>
                <button className="btn btn-primary" style={{ flex: 2, padding: 14 }} onClick={() => setStep(3)}>
                  Review Order <ArrowRight size={16} />
                </button>
              </div>
            </div>
          )}

          {/* Step 3: Confirm */}
          {step === 3 && (
            <div>
              <h4 style={{ fontSize: '1.05rem', fontWeight: 800, marginBottom: 16 }}>Order Summary & Confirmation</h4>

              <div style={{ background: 'var(--bg-alt)', borderRadius: 'var(--radius-md)', padding: 16, marginBottom: 16 }}>
                <h5 style={{ fontSize: '0.82rem', fontWeight: 700, color: 'var(--text-muted)', marginBottom: 8 }}>DELIVERY TO</h5>
                <p style={{ fontWeight: 600 }}>{customer.name} | {customer.phone}</p>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem' }}>{customer.address}, {customer.landmark && `Near ${customer.landmark},`} {customer.city} - {customer.pincode}</p>
                <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)', marginTop: 6 }}>Slot: {customer.deliverySlot === 'morning' ? 'Morning (10 AM - 1 PM)' : customer.deliverySlot === 'afternoon' ? 'Afternoon (2 PM - 5 PM)' : 'Evening (5 PM - 8 PM)'}</p>
              </div>

              <div style={{ marginBottom: 16 }}>
                <h5 style={{ fontSize: '0.82rem', fontWeight: 700, color: 'var(--text-muted)', marginBottom: 8 }}>ORDER ITEMS ({items.length})</h5>
                {items.map(item => {
                  const p = getProductById(item.id);
                  if (!p) return null;
                  return (
                    <div key={item.id} style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0', borderBottom: '1px solid var(--border-light)', fontSize: '0.85rem' }}>
                      <span>{p.name} x{item.quantity}</span>
                      <strong>Rs.{(p.price * item.quantity).toLocaleString('en-IN')}</strong>
                    </div>
                  );
                })}
              </div>

              <div className="cart-breakdown">
                <div className="breakdown-row"><span>Subtotal</span><strong>Rs.{subtotal.toLocaleString('en-IN')}</strong></div>
                {discount > 0 && <div className="breakdown-row highlight-row"><span>Promo Discount ({coupon?.code})</span><strong>-Rs.{discount.toLocaleString('en-IN')}</strong></div>}
                <div className="breakdown-row"><span>Base Amount (Excl. GST)</span><span>Rs.{baseAmount.toLocaleString('en-IN')}</span></div>
                <div className="breakdown-row"><span>GST @18%</span><span>Rs.{gstAmount.toLocaleString('en-IN')}</span></div>
                <div className="breakdown-row highlight-row"><span>Delivery & Installation</span><span>FREE</span></div>
                <div className="breakdown-row total-row"><span>Grand Total</span><strong>Rs.{grandTotal.toLocaleString('en-IN')}</strong></div>
              </div>

              <div style={{ display: 'flex', gap: 10, marginTop: 20 }}>
                <button className="btn btn-outline" style={{ flex: 1, padding: 12 }} onClick={() => setStep(2)}>Back</button>
                <button className="cart-checkout-btn" style={{ flex: 2 }} onClick={handlePlaceOrder}>
                  <Shield size={16} style={{ display: 'inline', verticalAlign: 'middle', marginRight: 6 }} />
                  Place Order - Rs.{grandTotal.toLocaleString('en-IN')}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

'use client';

import { ShoppingCart, X, Minus, Plus, Trash2, Shield } from 'lucide-react';
import Image from 'next/image';
import { useCart } from '@/context/CartContext';
import { useModal } from '@/context/ModalContext';
import { getProductById } from '@/lib/products';
import { useState } from 'react';

export default function CartDrawer() {
  const { items, isCartOpen, toggleCart, removeItem, updateQuantity, subtotal, discount, grandTotal, gstAmount, coupon, applyCoupon, removeCoupon, totalItems } = useCart();
  const { openModal, showToast } = useModal();
  const [couponInput, setCouponInput] = useState('');

  const handleApplyCoupon = () => {
    const error = applyCoupon(couponInput);
    if (error) showToast(error);
    else { showToast('Coupon applied!'); setCouponInput(''); }
  };

  return (
    <>
      <div className={`cart-overlay${isCartOpen ? ' open' : ''}`} onClick={toggleCart} />
      <aside className={`cart-drawer${isCartOpen ? ' open' : ''}`}>
        <div className="cart-drawer-header">
          <h3><ShoppingCart size={20} /> Your Showroom Cart ({totalItems})</h3>
          <button className="cart-close-btn" onClick={toggleCart}><X size={18} /></button>
        </div>

        <div className="cart-drawer-body">
          {items.length === 0 ? (
            <div className="cart-empty-state">
              <ShoppingCart size={48} color="var(--text-muted)" />
              <h4>Your Cart is Empty</h4>
              <p>Explore our Hitachi Split ACs, Window ACs, Washing Machines, and Home Inverters with 0% EMI.</p>
              <button className="btn btn-primary" onClick={() => { toggleCart(); document.getElementById('catalog')?.scrollIntoView({ behavior: 'smooth' }); }}>Browse Catalog Models</button>
            </div>
          ) : (
            items.map(item => {
              const product = getProductById(item.id);
              if (!product) return null;
              return (
                <div className="cart-item-card" key={item.id}>
                  <Image src={product.image} alt={product.name} width={64} height={64} className="cart-item-img" />
                  <div className="cart-item-details">
                    <div className="cart-item-name">{product.name}</div>
                    <div className="cart-item-price">Rs.{(product.price * item.quantity).toLocaleString('en-IN')}</div>
                    <div className="cart-item-controls">
                      <button className="qty-btn" onClick={() => updateQuantity(item.id, item.quantity - 1)}><Minus size={14} /></button>
                      <span className="qty-display">{item.quantity}</span>
                      <button className="qty-btn" onClick={() => updateQuantity(item.id, item.quantity + 1)}><Plus size={14} /></button>
                      <button className="cart-item-remove" onClick={() => removeItem(item.id)}><Trash2 size={16} /></button>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {items.length > 0 && (
          <div className="cart-drawer-footer">
            {!coupon ? (
              <div className="cart-coupon-box">
                <input type="text" className="cart-coupon-input" placeholder="Promo Code (e.g. HITACHI5000)" value={couponInput} onChange={(e) => setCouponInput(e.target.value)} />
                <button className="cart-coupon-btn" onClick={handleApplyCoupon}>Apply</button>
              </div>
            ) : (
              <div className="cart-coupon-badge">
                <span>{coupon.label}</span>
                <button onClick={removeCoupon} style={{ background: 'transparent', border: 'none', color: '#16a34a', fontWeight: 800, cursor: 'pointer' }}>X</button>
              </div>
            )}

            <div className="cart-breakdown">
              <div className="breakdown-row"><span>Catalog Subtotal</span><strong>Rs.{subtotal.toLocaleString('en-IN')}</strong></div>
              {discount > 0 && <div className="breakdown-row highlight-row"><span>Instant Promo Discount</span><strong>-Rs.{discount.toLocaleString('en-IN')}</strong></div>}
              <div className="breakdown-row"><span>GST (18% Included)</span><span>Rs.{gstAmount.toLocaleString('en-IN')}</span></div>
              <div className="breakdown-row highlight-row"><span>Delivery & Installation (Sikar)</span><span>FREE PROMO</span></div>
              <div className="breakdown-row total-row"><span>Grand Total</span><strong>Rs.{grandTotal.toLocaleString('en-IN')}</strong></div>
            </div>

            <button className="cart-checkout-btn" onClick={() => { toggleCart(); openModal('checkout'); }}>Proceed to Secure Checkout</button>
            <div className="cart-assurance-pill"><Shield size={14} style={{ display: 'inline', verticalAlign: 'middle' }} /> 100% Genuine Box - Official Hitachi Warranty - Sikar Local Support</div>
          </div>
        )}
      </aside>
    </>
  );
}

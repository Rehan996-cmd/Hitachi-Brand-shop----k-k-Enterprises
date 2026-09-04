'use client';

import { X, ShoppingCart, Star, Check, Zap } from 'lucide-react';
import Image from 'next/image';
import { useModal } from '@/context/ModalContext';
import { useCart } from '@/context/CartContext';
import { getProductById } from '@/lib/products';

export default function ProductModal() {
  const { activeModal, modalData, closeModal, openModal, showToast } = useModal();
  const { addItem } = useCart();

  if (activeModal !== 'product') return null;
  const product = getProductById(modalData.productId as string);
  if (!product) return null;

  return (
    <div className="modal-backdrop open" onClick={(e) => { if (e.target === e.currentTarget) closeModal(); }}>
      <div className="modal-card modal-card-lg">
        <button className="modal-close-btn" onClick={closeModal}><X size={20} /></button>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.2fr', gap: 0 }}>
          <div style={{ background: '#f8fafc', padding: 32, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Image src={product.image} alt={product.name} width={280} height={280} style={{ objectFit: 'contain', maxHeight: 280 }} />
          </div>

          <div style={{ padding: 28, overflowY: 'auto', maxHeight: '80vh' }}>
            <span className="product-badge" style={{ marginBottom: 10 }}>{product.badge}</span>
            <h2 style={{ fontSize: '1.2rem', fontWeight: 800, marginBottom: 10, fontFamily: 'var(--font-display)' }}>{product.name}</h2>

            <div style={{ display: 'flex', gap: 4, marginBottom: 12 }}>
              {[...Array(product.starRating)].map((_, i) => <Star key={i} size={16} fill="#f59e0b" color="#f59e0b" />)}
              {[...Array(Math.max(0, 5 - product.starRating))].map((_, i) => <Star key={`e-${i}`} size={16} color="#e2e8f0" />)}
              <span style={{ marginLeft: 8, fontSize: '0.82rem', color: 'var(--text-muted)' }}>{product.starRating}-Star BEE Rated</span>
            </div>

            <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginBottom: 16 }}>{product.highlight}</p>

            <div style={{ display: 'flex', alignItems: 'baseline', gap: 12, marginBottom: 8 }}>
              <span style={{ fontFamily: 'var(--font-display)', fontSize: '1.6rem', fontWeight: 900, color: 'var(--hitachi-red)' }}>Rs.{product.price.toLocaleString('en-IN')}</span>
              <span style={{ textDecoration: 'line-through', color: 'var(--text-muted)', fontSize: '1rem' }}>Rs.{product.mrp.toLocaleString('en-IN')}</span>
              <span className="discount-pill" style={{ fontSize: '0.82rem' }}>{product.discount}</span>
            </div>
            <div style={{ fontSize: '0.82rem', color: 'var(--accent-blue)', fontWeight: 600, marginBottom: 20 }}>EMI from {product.emi}</div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, marginBottom: 20 }}>
              {[
                { label: 'Category', value: product.subCategory },
                { label: 'Capacity', value: product.tonnage },
                { label: 'Technology', value: product.technology },
                { label: 'Condenser', value: product.condenser },
                { label: 'ISEER', value: String(product.iseer) },
                { label: 'Power Usage', value: product.powerConsumption },
                { label: 'Cooling Capacity', value: product.coolingCapacity },
                { label: 'Noise Level', value: product.noiseLevel },
                { label: 'Refrigerant', value: product.refrigerant },
                { label: 'Warranty', value: product.warranty },
              ].map((spec, i) => (
                <div key={i} style={{ padding: '8px 10px', background: 'var(--bg-alt)', borderRadius: 'var(--radius-sm)' }}>
                  <div style={{ fontSize: '0.68rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: 0.5 }}>{spec.label}</div>
                  <div style={{ fontSize: '0.82rem', fontWeight: 600 }}>{spec.value}</div>
                </div>
              ))}
            </div>

            <h4 style={{ fontSize: '0.88rem', fontWeight: 800, marginBottom: 8 }}>Key Features</h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 6, marginBottom: 20 }}>
              {product.features.map((f, i) => (
                <li key={i} style={{ display: 'flex', gap: 8, fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
                  <Check size={16} color="var(--accent-green)" style={{ flexShrink: 0, marginTop: 2 }} /> {f}
                </li>
              ))}
            </ul>

            <div style={{ padding: '10px 14px', background: '#eff6ff', borderRadius: 'var(--radius-sm)', fontSize: '0.82rem', color: '#1e40af', marginBottom: 20 }}>
              <strong>Ideal For:</strong> {product.idealFor}
            </div>

            <div style={{ display: 'flex', gap: 10 }}>
              <button className="btn btn-add-cart" style={{ flex: 1, padding: 12 }} onClick={() => { addItem(product.id, 1); showToast('Added to cart!'); }}>
                <ShoppingCart size={16} /> Add to Cart
              </button>
              <button className="btn btn-buy-now" style={{ flex: 1, padding: 12 }} onClick={() => { addItem(product.id, 1); openModal('checkout'); }}>
                <Zap size={16} /> Buy Now
              </button>
              <a href={`https://wa.me/919587111100?text=${encodeURIComponent(`Hello K.K. Enterprises! I want to buy: ${product.name} (Rs.${product.price.toLocaleString('en-IN')}). Please share best price and delivery details.`)}`} target="_blank" rel="noopener" className="btn btn-whatsapp" style={{ flex: 1, padding: 12 }}>
                WhatsApp Quote
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

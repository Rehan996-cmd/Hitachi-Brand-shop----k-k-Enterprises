'use client';

import { useState } from 'react';
import { Search, ShoppingCart, Menu, X, MapPin, Phone } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { useModal } from '@/context/ModalContext';

export default function Header() {
  const { totalItems, toggleCart } = useCart();
  const { openModal } = useModal();
  const [mobileNavOpen, setMobileNavOpen] = useState(false);

  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    setMobileNavOpen(false);
  };

  return (
    <>
      {/* Top Notice Bar */}
      <div className="top-notice-bar">
        <div className="container top-notice-content">
          <div className="notice-left">
            <span className="notice-tag">EXCLUSIVE BRAND SHOP OFFER</span>
            <span>Get Up to Rs.5,000 Instant Cashback + 0% Interest EMI on Hitachi airHome 5-Star Inverter ACs!</span>
          </div>
          <div className="notice-right">
            <span className="notice-link" style={{ display: 'inline-flex', alignItems: 'center', gap: 5 }}>
              <MapPin size={13} /> Ganpati Tower, Sikar, Rajasthan
            </span>
            <a href="tel:+919587111100" className="notice-link" style={{ display: 'inline-flex', alignItems: 'center', gap: 5 }}>
              <Phone size={13} /> +91 95871 11100
            </a>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <header className="main-header">
        <div className="container header-container">
          <div className="brand-wrapper">
            <a href="#hero" onClick={(e) => { e.preventDefault(); scrollToSection('hero'); }} style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
              <span className="brand-hitachi">HITACHI</span>
              <div className="brand-tag-wrapper">
                <span className="brand-shop-label">Brand Shop</span>
                <span className="dealer-name">K.K. Enterprises</span>
                <span className="dealer-loc">Auth. Dealer - Sikar (Raj.)</span>
              </div>
            </a>
          </div>

          <ul className="nav-links" style={mobileNavOpen ? { display: 'flex', position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, flexDirection: 'column', background: '#fff', zIndex: 500, padding: '80px 24px 24px', gap: 8 } : undefined}>
            {mobileNavOpen && (
              <button onClick={() => setMobileNavOpen(false)} style={{ position: 'absolute', top: 20, right: 20, background: 'none', border: 'none', cursor: 'pointer' }}>
                <X size={28} />
              </button>
            )}
            <li><a href="#catalog" className="nav-link" onClick={(e) => { e.preventDefault(); scrollToSection('catalog'); setMobileNavOpen(false); }}>Split ACs</a></li>
            <li><a href="#catalog" className="nav-link" onClick={(e) => { e.preventDefault(); scrollToSection('catalog'); setMobileNavOpen(false); }}>Window ACs</a></li>
            <li><a href="#commercial" className="nav-link" onClick={(e) => { e.preventDefault(); scrollToSection('commercial'); setMobileNavOpen(false); }}>Commercial & VRF</a></li>
            <li><a href="#catalog" className="nav-link" onClick={(e) => { e.preventDefault(); scrollToSection('catalog'); setMobileNavOpen(false); }}>Washing Machines</a></li>
            <li><a href="#calculator" className="nav-link" onClick={(e) => { e.preventDefault(); scrollToSection('calculator'); setMobileNavOpen(false); }}>AC Size Calculator</a></li>
            <li><a href="#showroom" className="nav-link" onClick={(e) => { e.preventDefault(); scrollToSection('showroom'); setMobileNavOpen(false); }}>Our Showroom</a></li>
            <li><a href="#service" className="nav-link" onClick={(e) => { e.preventDefault(); scrollToSection('service'); setMobileNavOpen(false); }}>Service & AMC</a></li>
          </ul>

          <div className="header-actions">
            <button className="header-track-btn" onClick={() => openModal('trackOrder')} title="Track Your Order">
              <Search size={15} />
              Track Order
            </button>
            <button className="header-cart-btn" onClick={toggleCart} title="View Shopping Cart">
              <ShoppingCart size={18} />
              Cart <span className="cart-badge">{totalItems}</span>
            </button>
            <button className="mobile-toggle" onClick={() => setMobileNavOpen(true)} aria-label="Toggle navigation">
              <Menu size={22} />
            </button>
          </div>
        </div>
      </header>
    </>
  );
}

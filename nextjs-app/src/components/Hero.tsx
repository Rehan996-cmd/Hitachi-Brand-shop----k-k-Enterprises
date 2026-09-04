import { Snowflake } from 'lucide-react';
import Image from 'next/image';

export default function Hero() {
  return (
    <section className="hero-section" id="hero">
      <div className="hero-glow-blob" />
      <div className="container hero-grid">
        <div className="hero-content">
          <div className="hero-badge-pill">
            <span className="pulse-dot" />
            <span>Official Hitachi Brand Shop - Sikar, Rajasthan</span>
          </div>

          <h1 className="hero-title">
            Mastering Japanese Cooling For <span className="text-gradient-red">Extreme Desert Heat</span>
          </h1>

          <p className="hero-subtitle">
            Experience the latest <strong>airHome series</strong>, <strong>Hitachi Kaze Plus Window ACs</strong>, and <strong>Set-Free Commercial VRF Systems</strong> at K.K. Enterprises. 100% Inner Grooved Copper Condensers, FrostWash self-cleaning, and guaranteed cooling up to 52°C ambient temperatures.
          </p>

          <div className="hero-actions">
            <a href="#calculator" className="btn btn-primary" style={{ padding: '14px 26px', fontSize: '1rem' }}>
              <Snowflake size={18} /> Calculate Room AC Tonnage
            </a>
            <a href="#catalog" className="btn btn-outline" style={{ borderColor: 'rgba(255,255,255,0.3)', color: '#ffffff', padding: '14px 24px' }}>
              Explore All 2026 Models
            </a>
          </div>

          <div className="hero-stats-row">
            <div className="hero-stat-item">
              <strong>100% Copper</strong>
              <span>Inner Grooved Condensers</span>
            </div>
            <div className="hero-stat-item">
              <strong>Up to 52°C</strong>
              <span>Continuous Tropical Cooling</span>
            </div>
            <div className="hero-stat-item">
              <strong>10 Years</strong>
              <span>Inverter Compressor Warranty</span>
            </div>
          </div>
        </div>

        <div className="hero-visual-card">
          <div className="storefront-preview-box">
            <Image src="/assets/storefront.png" alt="Hitachi Brand Shop - K.K. Enterprises Storefront Sikar" className="storefront-img" width={600} height={340} style={{ objectFit: 'cover', width: '100%', height: 340 }} priority />
            <div className="storefront-tag">
              Official Hitachi Brand Shop Storefront - Sikar
            </div>
          </div>

          <div className="hero-ac-floating-card">
            <Image src="/assets/split_ac_airhome.jpg" alt="Hitachi airHome Inverter AC" className="hero-ac-thumb" width={56} height={56} />
            <div className="hero-ac-info">
              <strong>airHome 400 Inverter Split AC</strong>
              <span>1.5 Ton 5-Star - FrostWash - 100% Copper</span>
            </div>
            <div className="hero-ac-price">
              <span className="p-amt">Rs.44,990</span>
              <span className="p-badge">0% EMI Available</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

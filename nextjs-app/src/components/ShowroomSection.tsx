import { MapPin, Phone, Clock, Gift } from 'lucide-react';
import Image from 'next/image';

export default function ShowroomSection() {
  return (
    <section className="section" id="showroom">
      <div className="container">
        <div className="section-header">
          <span className="section-eyebrow">Visit Our Sikar Showroom</span>
          <h2 className="section-title">Hitachi Brand Shop - K.K. Enterprises</h2>
          <p className="section-desc">Step into our exclusive brand shop to experience live working demos, compare airflow noise, touch the materials, and get genuine advice from factory-trained Hitachi experts.</p>
        </div>

        <div className="showroom-grid">
          <div className="showroom-photo-card">
            <Image src="/assets/storefront.png" alt="Official Hitachi Brand Shop - K.K. Enterprises Front View" className="real-store-img" width={600} height={400} style={{ width: '100%', height: 400, objectFit: 'cover' }} />
            <div className="showroom-photo-caption">
              <h4>K.K. Enterprises - Authorized Hitachi Brand Shop</h4>
              <p>Ganpati Tower, Mohalla Qureshi / Sikar Roadlines Area, Sikar, Rajasthan</p>
            </div>
          </div>

          <div className="store-detail-box">
            <h3>Official Sales & Certified Service Centre</h3>

            {[
              { icon: <MapPin size={18} />, title: 'Store Showroom Address', content: 'Hitachi Brand Shop - K.K. Enterprises, Ganpati Tower, Mohalla Qureshi / Near Sikar Roadlines, Sikar, Rajasthan - 332001' },
              { icon: <Phone size={18} />, title: 'Showroom Hotlines', content: <><a href="tel:+919587111100">+91 95871 11100</a></> },
              { icon: <Clock size={18} />, title: 'Operating Hours', content: <>Monday to Sunday: <strong>10:00 AM to 8:30 PM</strong> (Open 7 Days a week)</> },
              { icon: <Gift size={18} />, title: 'In-Store Advantages', content: 'Live Working Demonstration of airHome & FrostWash. Ready In-Stock Inventory for Same-Day Sikar Delivery. Instant 0% EMI Approval. Free Site Survey booking for home & commercial HVAC.' },
            ].map((row, i) => (
              <div className="info-row" key={i}>
                <div className="info-icon">{row.icon}</div>
                <div className="info-text">
                  <strong>{row.title}</strong>
                  <p>{row.content}</p>
                </div>
              </div>
            ))}

            <div style={{ display: 'flex', gap: 14, marginTop: 24, flexWrap: 'wrap' }}>
              <a href="https://maps.google.com/?q=K.K.+Enterprises+Hitachi+Brand+Shop+Sikar" target="_blank" rel="noopener" className="btn btn-primary">
                <MapPin size={16} /> Open in Google Maps
              </a>
              <a href="https://wa.me/919587111100?text=Hi%20K.K.%20Enterprises%2C%20I%20am%20planning%20to%20visit%20your%20Hitachi%20Brand%20Shop." target="_blank" rel="noopener" className="btn btn-whatsapp">WhatsApp Store Manager</a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

import { MapPin, Phone, Clock } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="container">
        <div className="footer-grid">
          <div className="footer-col footer-brand">
            <div className="brand-hitachi" style={{ color: '#ffffff' }}>HITACHI</div>
            <h4 style={{ color: '#e60012', marginBottom: 8 }}>K.K. Enterprises</h4>
            <p className="footer-desc">
              Official Authorized Hitachi Brand Shop and Dealer in Sikar, Rajasthan. Specializing in Inverter Split ACs, Kaze Plus Window ACs, VRF Multi-Zone Air Conditioning, Washing Machines, and Home Inverters.
            </p>
            <div style={{ display: 'flex', gap: 10 }}>
              <span className="copper-badge">100% Copper Partner</span>
              <span className="product-badge">Authorized Sales & Service</span>
            </div>
          </div>

          <div className="footer-col">
            <h4>Cooling Range</h4>
            <ul className="footer-links">
              <li><a href="#catalog">airHome Inverter Split ACs</a></li>
              <li><a href="#catalog">5-Star & 3-Star Split ACs</a></li>
              <li><a href="#catalog">Hitachi Kaze Plus Window ACs</a></li>
              <li><a href="#commercial">4-Way Round Flow Cassette ACs</a></li>
              <li><a href="#commercial">Set-Free Commercial VRF Systems</a></li>
              <li><a href="#commercial">Central Concealed Ductable ACs</a></li>
            </ul>
          </div>

          <div className="footer-col">
            <h4>Appliances & Tools</h4>
            <ul className="footer-links">
              <li><a href="#catalog">Front Load Inverter Washers</a></li>
              <li><a href="#catalog">Top Load & Semi-Auto Washers</a></li>
              <li><a href="#catalog">Hitachi French Door Refrigerators</a></li>
              <li><a href="#catalog">Home Inverters & Tubular Batteries</a></li>
              <li><a href="#calculator">AC Room Size Calculator</a></li>
              <li><a href="#savings">Electricity Savings Calculator</a></li>
            </ul>
          </div>

          <div className="footer-col">
            <h4>Showroom Contact</h4>
            <div className="footer-contact-item">
              <MapPin size={16} style={{ flexShrink: 0, marginTop: 2 }} />
              <div>Ganpati Tower, Mohalla Qureshi / Sikar Roadlines Area, Sikar, Rajasthan - 332001</div>
            </div>
            <div className="footer-contact-item">
              <Phone size={16} style={{ flexShrink: 0, marginTop: 2 }} />
              <div>
                <a href="tel:+919587111100" style={{ color: '#ffffff', fontWeight: 'bold' }}>+91 95871 11100</a>
              </div>
            </div>
            <div className="footer-contact-item">
              <Clock size={16} style={{ flexShrink: 0, marginTop: 2 }} />
              <div>Mon - Sun: 10:00 AM - 8:30 PM</div>
            </div>
            <div style={{ marginTop: 14 }}>
              <a href="https://wa.me/919587111100" target="_blank" rel="noopener" className="btn btn-whatsapp" style={{ padding: '8px 16px' }}>
                Direct WhatsApp Chat
              </a>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <div>&copy; 2026 Hitachi Brand Shop - K.K. Enterprises. All Rights Reserved. Authorized Hitachi Dealer Sikar.</div>
          <div style={{ display: 'flex', gap: 20 }}>
            <a href="#hero">Back to Top</a>
            <a href="#showroom">Store Directions</a>
            <a href="#service">Book Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
}

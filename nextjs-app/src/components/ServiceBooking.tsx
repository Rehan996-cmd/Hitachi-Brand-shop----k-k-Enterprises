'use client';

import { Check } from 'lucide-react';

export default function ServiceBooking() {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const name = (form.elements.namedItem('srvName') as HTMLInputElement).value;
    const phone = (form.elements.namedItem('srvPhone') as HTMLInputElement).value;
    const type = (form.elements.namedItem('srvType') as HTMLSelectElement).value;
    const date = (form.elements.namedItem('srvDate') as HTMLInputElement).value;
    const notes = (form.elements.namedItem('srvNotes') as HTMLTextAreaElement).value;

    const msg = `Hi K.K. Enterprises Hitachi Service Team!\n\nCustomer: ${name}\nPhone: ${phone}\nService: ${type}\nPreferred Date: ${date || 'Flexible'}\nAddress/Notes: ${notes || 'N/A'}`;
    window.open(`https://wa.me/919587111100?text=${encodeURIComponent(msg)}`, '_blank');
  };

  return (
    <section className="section section-alt" id="service">
      <div className="container">
        <div className="section-header">
          <span className="section-eyebrow">Factory Authorized Support</span>
          <h2 className="section-title">Book AC Installation, Servicing & AMC</h2>
          <p className="section-desc">Protect your investment with authentic Hitachi certified technicians using 100% genuine copper pipes, vacuum pumps, and specialized jet-cleaning equipment.</p>
        </div>

        <div className="service-section-wrap">
          <div className="service-info-col">
            <h3 style={{ fontSize: '1.4rem', fontWeight: 800, marginBottom: 12 }}>Why Choose K.K. Enterprises Authorized Service?</h3>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', marginBottom: 20 }}>
              Improper installation by uncertified mechanics causes 80% of AC gas leaks and compressor burnouts in Rajasthan. Our certified team adheres strictly to Hitachi Japanese installation protocols.
            </p>

            <ul className="service-perks-list">
              {[
                '100% Pure Virgin Copper Connecting Kit & Heavy Wall Brackets',
                'Mandatory Vacuumization before refrigerant release (Prevents moisture corrosion)',
                'High-Pressure Jet Pump Foam & Coil Wash for maximum airflow',
                'Genuine Hitachi Spare Parts & Factory Refrigerant Top-Up',
                'Annual Maintenance Contracts (AMC) with emergency summer support',
              ].map((perk, i) => (
                <li key={i}><span><Check size={14} /></span> {perk}</li>
              ))}
            </ul>

            <div style={{ background: '#eff6ff', borderLeft: '4px solid #3b82f6', padding: '14px 18px', borderRadius: 4, marginTop: 24 }}>
              <strong style={{ color: '#1e40af', fontSize: '0.9rem' }}>Emergency Breakdown in Sikar?</strong>
              <p style={{ color: '#1e3a8a', fontSize: '0.85rem', marginTop: 2 }}>Call our priority service hotline directly at <strong>+91 95871 11100</strong> for prompt same-day dispatch.</p>
            </div>
          </div>

          <div className="service-form-col">
            <form className="booking-form" onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="srvName">Your Full Name *</label>
                <input type="text" id="srvName" name="srvName" className="form-input" placeholder="e.g. Rajesh Sharma" required />
              </div>
              <div className="form-group">
                <label htmlFor="srvPhone">Mobile / WhatsApp Number *</label>
                <input type="tel" id="srvPhone" name="srvPhone" className="form-input" placeholder="e.g. 98290 12345" required />
              </div>
              <div className="form-group">
                <label htmlFor="srvType">Select Service Required *</label>
                <select id="srvType" name="srvType" className="form-select" required>
                  <option value="New AC Installation">New AC Installation (Split / Window / Cassette)</option>
                  <option value="Jet-Pump Deep Servicing">Jet-Pump Foam & Deep Chemical Coil Wash</option>
                  <option value="Refrigerant Gas Refill">Gas Leak Detection & Eco R32 Top-Up</option>
                  <option value="AC Uninstallation & Shifting">AC Uninstallation & Re-installation / Shifting</option>
                  <option value="Annual Maintenance Contract (AMC)">Annual Maintenance Contract (AMC) Package</option>
                  <option value="Washing Machine / Refrigerator Repair">Washing Machine or Refrigerator Service</option>
                </select>
              </div>
              <div className="form-group">
                <label htmlFor="srvDate">Preferred Date for Technician Visit</label>
                <input type="date" id="srvDate" name="srvDate" className="form-input" />
              </div>
              <div className="form-group">
                <label htmlFor="srvNotes">Address in Sikar & Any Issue Details</label>
                <textarea id="srvNotes" name="srvNotes" className="form-textarea" placeholder="Enter your area and any symptoms like low cooling..." />
              </div>
              <button type="submit" className="btn btn-primary" style={{ padding: 12, fontSize: '1rem' }}>
                Confirm Service Booking via WhatsApp
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

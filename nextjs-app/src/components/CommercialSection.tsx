import { Check } from 'lucide-react';
import Image from 'next/image';

export default function CommercialSection() {
  return (
    <section className="section section-dark" id="commercial">
      <div className="container">
        <div className="section-header">
          <span className="section-eyebrow" style={{ color: '#38bdf8' }}>Enterprise & Architectural Cooling</span>
          <h2 className="section-title">Hitachi Set-Free VRF & Commercial HVAC Solutions</h2>
          <p className="section-desc">Designed for luxury bungalows, hospitals, hotels, multi-story offices, and large banquet halls across Rajasthan.</p>
        </div>

        <div className="vrf-grid">
          <div className="vrf-content-col">
            <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.8rem', marginBottom: 16 }}>
              One Master Outdoor Unit. Up to 64 Independently Controlled Rooms.
            </h3>
            <p style={{ color: '#cbd5e1', fontSize: '1rem', lineHeight: 1.6 }}>
              Hitachi <strong>Set-Free VRF (Variable Refrigerant Flow)</strong> systems deliver simultaneous cooling and heating with whisper-silent indoor units. Paired with 4-Way Round Flow Cassette ACs, Concealed Ceiling Ducts, and Floor Standing Tower ACs, K.K. Enterprises provides end-to-end HVAC engineering.
            </p>

            <ul className="vrf-features-list">
              {[
                { title: 'Patented DC Inverter Scroll Compressor:', desc: 'Ultra-high IPLV seasonal efficiency that cuts commercial power consumption by up to 40%.' },
                { title: 'Extreme Weather Resilience:', desc: 'Operates without tripping even in scorching 54°C desert ambient heat with anti-corrosive blue-fin coils.' },
                { title: 'Architectural Aesthetics:', desc: 'Zero bulky outdoor units cluttering your facade. Completely hidden ceiling ductwork and designer round-flow cassettes.' },
                { title: 'Turnkey Engineering by K.K. Enterprises:', desc: 'Heat-load estimation, duct layout CAD drafting, refrigerant copper piping, commissioning, and AMC.' },
              ].map((item, i) => (
                <li key={i}>
                  <span className="v-check"><Check size={16} /></span>
                  <div>
                    <strong style={{ color: '#ffffff' }}>{item.title}</strong> {item.desc}
                  </div>
                </li>
              ))}
            </ul>

            <div style={{ display: 'flex', gap: 14, flexWrap: 'wrap' }}>
              <a href="https://wa.me/919587111100?text=Hello%20K.K.%20Enterprises%2C%20I%20have%20a%20commercial%20VRF%20project%20inquiry." target="_blank" rel="noopener" className="btn btn-primary">Request Project Site Survey & Quote</a>
              <a href="https://wa.me/919587111100?text=Hello%20K.K.%20Enterprises%2C%20I%20have%20a%20commercial%20project%20inquiry%20for%20my%20building." target="_blank" rel="noopener" className="btn btn-whatsapp">WhatsApp Project Desk</a>
            </div>
          </div>

          <div className="vrf-card-wrap">
            <Image src="/assets/vrf_system.svg" alt="Hitachi Set-Free Commercial VRF Outdoor Unit" width={400} height={280} style={{ width: '100%', maxHeight: 280, objectFit: 'contain', marginBottom: 20 }} />
            <div className="commercial-type-chips">
              {[
                { title: '4-Way Round Flow Cassette', desc: 'Uniform 360° draft-free cooling with built-in 850mm high-head drain pump.' },
                { title: 'Floor Standing Tower AC', desc: 'Heavy air-throw up to 20 meters for banquets, restaurants, and showrooms.' },
                { title: 'Concealed Ductable Split', desc: 'Completely invisible high-static units with sleek architectural linear supply grilles.' },
                { title: 'Set-Free Mini & Top-Flow VRF', desc: 'From 4 HP to 96 HP modular configurations for luxury villas and multi-floor hospitals.' },
              ].map((chip, i) => (
                <div className="comm-chip" key={i}>
                  <strong>{chip.title}</strong>
                  <p>{chip.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

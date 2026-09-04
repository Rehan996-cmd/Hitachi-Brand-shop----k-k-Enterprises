'use client';

import { useState, useCallback } from 'react';

export default function Calculator() {
  const [length, setLength] = useState(14);
  const [width, setWidth] = useState(12);
  const [floor, setFloor] = useState('ground');
  const [sun, setSun] = useState('normal');
  const [people, setPeople] = useState('standard');

  const [savingsHours, setSavingsHours] = useState(8);
  const [savingsTariff, setSavingsTariff] = useState(8);

  const area = length * width;

  const calcRecommendation = useCallback(() => {
    let baseTonnage = 1.0;
    if (area <= 120) baseTonnage = 1.0;
    else if (area <= 170) baseTonnage = 1.5;
    else if (area <= 260) baseTonnage = 2.0;
    else baseTonnage = 2.5;

    let heatMultiplier = 1.0;
    if (floor === 'top') heatMultiplier += 0.2;
    if (sun === 'high') heatMultiplier += 0.15;
    if (people === 'many') heatMultiplier += 0.15;

    const finalTonnage = baseTonnage * heatMultiplier;

    if (finalTonnage < 1.25) {
      return { tonnage: '1.0 Ton (3-Star or 5-Star)', explanation: 'Ideal for your room size. A 1.0 Ton Hitachi Toushi / airHome AC will cool quickly without excessive power consumption.' };
    } else if (finalTonnage <= 1.8) {
      return { tonnage: '1.5 Ton (5-Star airHome Inverter)', explanation: "Optimal choice! The 1.5 Ton airHome 400 with 100% inner grooved copper and FrostWash will maintain icy comfort even in Rajasthan's 50°C+ summer." };
    } else if (finalTonnage <= 2.3) {
      return { tonnage: '2.0 Ton Inverter AC (Kiyora / 4-Way)', explanation: 'Recommended due to high room area or top-floor roof direct sunlight. A 2.0 Ton unit ensures swift, deep chill without overworking the compressor.' };
    } else {
      return { tonnage: 'Commercial Heavy Tonnage / Cassette AC (3.0T+)', explanation: 'Large open floor plan detected! A 3.0T / 4.0T Hitachi Round-Flow Cassette or Tower AC is recommended for uniform airflow.' };
    }
  }, [area, floor, sun, people]);

  const recommendation = calcRecommendation();

  // Savings calculator
  const days = 200;
  const oldUnits = Math.round(1.6 * savingsHours * days);
  const star3Units = Math.round(0.95 * savingsHours * days);
  const star5Units = Math.round(0.65 * savingsHours * days);
  const oldCost = Math.round(oldUnits * savingsTariff);
  const star3Cost = Math.round(star3Units * savingsTariff);
  const star5Cost = Math.round(star5Units * savingsTariff);
  const savingsVsOld = oldCost - star5Cost;

  return (
    <section className="section section-alt" id="calculator">
      <div className="container">
        <div className="section-header">
          <span className="section-eyebrow">Interactive Sizing Tool</span>
          <h2 className="section-title">Smart Room AC Tonnage Calculator</h2>
          <p className="section-desc">Ensure maximum cooling efficiency and minimum electricity bills by choosing the exact AC tonnage tailored to your room size and heat exposure.</p>
        </div>

        <div className="calc-card-wrapper">
          <div className="calc-inputs-pane">
            <h3 className="calc-title">Step 1: Enter Room Dimensions & Exposure</h3>
            <p className="calc-subtitle">Adjust the sliders to reflect your room&apos;s measurements.</p>

            <div className="calc-control-group">
              <div className="calc-label-row">
                <span>Room Length (Feet)</span>
                <span className="calc-val-badge">{length} ft</span>
              </div>
              <input type="range" className="calc-slider" min={8} max={30} value={length} step={1} onChange={(e) => setLength(Number(e.target.value))} />
            </div>

            <div className="calc-control-group">
              <div className="calc-label-row">
                <span>Room Width (Feet)</span>
                <span className="calc-val-badge">{width} ft</span>
              </div>
              <input type="range" className="calc-slider" min={8} max={25} value={width} step={1} onChange={(e) => setWidth(Number(e.target.value))} />
            </div>

            <div className="calc-control-group">
              <div className="calc-label-row"><span>Rajasthan Climate & Heat Factors</span></div>
              <div className="calc-factors-grid">
                <div>
                  <label style={{ fontSize: '0.78rem', fontWeight: 700, color: 'var(--text-muted)', display: 'block', marginBottom: 4 }}>FLOOR LEVEL</label>
                  <select className="calc-select" value={floor} onChange={(e) => setFloor(e.target.value)}>
                    <option value="ground">Ground / Middle Floor</option>
                    <option value="top">Top Floor (Direct Sun On Roof)</option>
                  </select>
                </div>
                <div>
                  <label style={{ fontSize: '0.78rem', fontWeight: 700, color: 'var(--text-muted)', display: 'block', marginBottom: 4 }}>SUNLIGHT EXPOSURE</label>
                  <select className="calc-select" value={sun} onChange={(e) => setSun(e.target.value)}>
                    <option value="normal">Normal / Shaded Windows</option>
                    <option value="high">High Direct Sun Facing</option>
                  </select>
                </div>
                <div>
                  <label style={{ fontSize: '0.78rem', fontWeight: 700, color: 'var(--text-muted)', display: 'block', marginBottom: 4 }}>TYPICAL OCCUPANCY</label>
                  <select className="calc-select" value={people} onChange={(e) => setPeople(e.target.value)}>
                    <option value="standard">1 to 2 People</option>
                    <option value="many">3+ People / Electronic Appliances</option>
                  </select>
                </div>
              </div>
            </div>
          </div>

          <div className="calc-results-pane">
            <div className="calc-area-indicator">
              <div>
                <span>Calculated Room Carpet Area</span>
                <p style={{ fontSize: '0.8rem', color: '#cbd5e1', margin: 0 }}>Length x Width Floor Footprint</p>
              </div>
              <strong style={{ fontFamily: 'var(--font-display)', fontSize: '1.6rem', fontWeight: 900, color: '#4ade80' }}>{area} sq.ft</strong>
            </div>

            <div className="rec-card">
              <div className="rec-badge">Recommended Cooling Size</div>
              <h4 className="rec-title">{recommendation.tonnage}</h4>
              <p className="rec-desc">{recommendation.explanation}</p>
              <div className="rec-action-row">
                <a href="#catalog" className="btn btn-primary">View Recommended Models</a>
                <a href={`https://wa.me/919587111100?text=${encodeURIComponent(`Hi K.K. Enterprises, my room size is ${area} sq.ft (${length}x${width} ft). The calculator recommended ${recommendation.tonnage}. Please guide me.`)}`} target="_blank" rel="noopener" className="btn btn-whatsapp">Chat With AC Expert</a>
              </div>
            </div>
          </div>
        </div>

        {/* Energy Savings Estimator */}
        <div className="savings-box" id="savings">
          <div style={{ textAlign: 'center', marginBottom: 24 }}>
            <span className="section-eyebrow">Electricity Bill Analysis</span>
            <h3 style={{ fontSize: '1.5rem', fontWeight: 800 }}>See How Much A 5-Star Hitachi Inverter Saves You in Sikar</h3>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem' }}>Compare actual power consumption against older non-inverter air conditioners.</p>
          </div>

          <div className="savings-inputs-row">
            <div>
              <div className="calc-label-row">
                <span>Average Daily Usage</span>
                <span className="calc-val-badge">{savingsHours} Hours / Day</span>
              </div>
              <input type="range" className="calc-slider" min={4} max={18} value={savingsHours} step={1} onChange={(e) => setSavingsHours(Number(e.target.value))} />
            </div>
            <div>
              <div className="calc-label-row">
                <span>Electricity Cost per Unit (kWh)</span>
                <span className="calc-val-badge">Rs.{savingsTariff} / Unit</span>
              </div>
              <input type="range" className="calc-slider" min={6} max={14} value={savingsTariff} step={0.5} onChange={(e) => setSavingsTariff(Number(e.target.value))} />
            </div>
          </div>

          <div className="savings-compare-grid">
            <div className="savings-card">
              <h5>10-Year-Old Non-Inverter AC</h5>
              <div className="savings-amt" style={{ color: '#ef4444' }}>Rs.{oldCost.toLocaleString('en-IN')}</div>
              <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginTop: 6 }}>Est. {oldUnits} units/yr</p>
            </div>
            <div className="savings-card">
              <h5>Hitachi 3-Star Inverter AC</h5>
              <div className="savings-amt" style={{ color: '#f59e0b' }}>Rs.{star3Cost.toLocaleString('en-IN')}</div>
              <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginTop: 6 }}>Est. {star3Units} units/yr</p>
            </div>
            <div className="savings-card card-5star">
              <h5>Hitachi 5-Star airHome AC</h5>
              <div className="savings-amt" style={{ color: '#059669' }}>Rs.{star5Cost.toLocaleString('en-IN')}</div>
              <p style={{ fontSize: '0.78rem', color: '#2563eb', marginTop: 6 }}>Est. {star5Units} units/yr</p>
            </div>
            <div className="savings-card card-savings">
              <h5>Your Annual Power Savings</h5>
              <div className="savings-amt">Rs.{savingsVsOld.toLocaleString('en-IN')} / yr</div>
              <p style={{ fontSize: '0.82rem', marginTop: 6, opacity: 0.9 }}>The 5-Star AC pays for itself within 3 summers!</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

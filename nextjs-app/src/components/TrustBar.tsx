import { Award, Zap, CreditCard, Wrench } from 'lucide-react';

export default function TrustBar() {
  const items = [
    { icon: <Award size={22} />, title: '100% Genuine Products', desc: 'Direct manufacturer supply with official brand warranty' },
    { icon: <Zap size={22} />, title: 'Same-Day Installation', desc: 'Certified Hitachi technicians across Sikar & surrounding areas' },
    { icon: <CreditCard size={22} />, title: '0% Interest EMI', desc: 'Bajaj Finserv, HDFC, ICICI, SBI on-the-spot approval' },
    { icon: <Wrench size={22} />, title: 'Lifetime Service Support', desc: 'Dedicated K.K. Enterprises customer care & AMC plans' },
  ];

  return (
    <section className="trust-bar-section">
      <div className="container trust-grid">
        {items.map((item, i) => (
          <div className="trust-item" key={i}>
            <div className="trust-icon-box">{item.icon}</div>
            <div className="trust-content">
              <strong>{item.title}</strong>
              <p>{item.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

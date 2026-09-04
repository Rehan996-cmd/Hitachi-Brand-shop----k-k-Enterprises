'use client';

import { useState } from 'react';
import { ChevronDown } from 'lucide-react';

const faqs = [
  { q: 'Why should I choose Hitachi airHome with 100% Inner Grooved Copper?', a: 'Inner grooved copper tubes increase the internal surface area by 3x, speeding up heat transfer and withstanding high refrigerant pressure. Unlike aluminum coils which suffer from pitting corrosion in dusty environments, 100% copper condensers can be easily serviced and repaired, ensuring a 10+ year lifespan.' },
  { q: 'What is the difference between 3-Star and 5-Star Inverter ACs?', a: 'A 5-Star Hitachi Inverter AC (such as the airHome 400 or 600) features an ISEER rating above 5.0, consuming roughly 25% to 30% less electricity than a 3-Star unit. If your AC runs more than 6 hours per day during the summer, the electricity savings will recover the price difference within 2 to 3 seasons.' },
  { q: 'How does Hitachi FrostWash technology work?', a: 'FrostWash freezes moisture from the air onto the cooling coil to trap dust particles, mold, and bacteria. It then melts rapidly, flushing the debris out through the drain pipe. This maintains peak cooling capacity and ensures fresh, hygienic indoor air.' },
  { q: 'Do you offer delivery and installation outside Sikar city?', a: 'Yes! K.K. Enterprises services all surrounding tehsils and towns including Laxmangarh, Dhod, Danta Ramgarh, Fatehpur, Nawalgarh, and Ringas. Contact our showroom hotline for dispatch timelines.' },
];

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className="section section-alt">
      <div className="container">
        <div className="section-header">
          <span className="section-eyebrow">Got Questions?</span>
          <h2 className="section-title">Frequently Asked Questions</h2>
        </div>

        <div className="faqs-wrap">
          {faqs.map((faq, i) => (
            <div className={`faq-item${openIndex === i ? ' open' : ''}`} key={i}>
              <div className="faq-question" onClick={() => setOpenIndex(openIndex === i ? null : i)}>
                <span>{faq.q}</span>
                <ChevronDown size={20} className="faq-chevron" />
              </div>
              <div className="faq-answer">{faq.a}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

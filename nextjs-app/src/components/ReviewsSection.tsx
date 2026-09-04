import { Star } from 'lucide-react';

const reviews = [
  {
    text: '"We installed two 1.5 Ton airHome 5-Star ACs on our top floor house on Piprali Road. Even in 48°C June heat, the room cools within 7 minutes. K.K. Enterprises delivered and installed on the exact same day."',
    name: 'Dr. M. K. Choudhary',
    location: 'Piprali Road, Sikar',
  },
  {
    text: '"For our garment showroom near Ganpati Tower, we bought 3.0 Ton Hitachi Round Flow Cassettes. The 360-degree airflow cools every corner uniformly and looks very premium in our false ceiling. Best authorized dealer in Sikar!"',
    name: 'Suresh Agarwal',
    location: 'Retail Store Owner, Sikar',
  },
  {
    text: '"Bought a Hitachi Kaze Plus Window AC for my mother\'s bedroom and a 8.0 kg Front Load washing machine. Got instant 0% Bajaj EMI with zero documentation hassle. Genuine showroom and courteous staff."',
    name: 'Imran Qureshi',
    location: 'Mohalla Qureshi, Sikar',
  },
];

export default function ReviewsSection() {
  return (
    <section className="section">
      <div className="container">
        <div className="section-header">
          <span className="section-eyebrow">Local Sikar Trust</span>
          <h2 className="section-title">What Our Customers Say</h2>
          <p className="section-desc">Real experiences from homeowners, doctors, and business owners who bought from K.K. Enterprises.</p>
        </div>

        <div className="reviews-grid">
          {reviews.map((review, i) => (
            <div className="review-card" key={i}>
              <div className="review-stars" style={{ display: 'flex', gap: 2, marginBottom: 12 }}>
                {[...Array(5)].map((_, j) => <Star key={j} size={18} fill="#f59e0b" color="#f59e0b" />)}
              </div>
              <p className="review-text">{review.text}</p>
              <div className="reviewer-meta">
                <strong>{review.name}</strong>
                <span>{review.location}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

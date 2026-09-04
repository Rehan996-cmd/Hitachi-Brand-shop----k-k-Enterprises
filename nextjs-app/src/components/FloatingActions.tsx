import { Phone, MessageCircle } from 'lucide-react';

export default function FloatingActions() {
  return (
    <div className="floating-actions-bar">
      <a href="https://wa.me/919587111100?text=Hello%20Hitachi%20Brand%20Shop%20K.K.%20Enterprises%2C%20I%20am%20visiting%20your%20website%20and%20need%20price%20and%20availability%20information." target="_blank" rel="noopener" className="fab-btn fab-wa" title="Chat on WhatsApp">
        <MessageCircle size={28} />
      </a>
      <a href="tel:+919587111100" className="fab-btn fab-phone" title="Call Showroom Hotline">
        <Phone size={24} />
      </a>
    </div>
  );
}

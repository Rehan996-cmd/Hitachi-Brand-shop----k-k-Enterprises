import Header from '@/components/Header';
import Hero from '@/components/Hero';
import TrustBar from '@/components/TrustBar';
import Calculator from '@/components/Calculator';
import ProductCatalog from '@/components/ProductCatalog';
import CommercialSection from '@/components/CommercialSection';
import ShowroomSection from '@/components/ShowroomSection';
import ServiceBooking from '@/components/ServiceBooking';
import ReviewsSection from '@/components/ReviewsSection';
import FAQSection from '@/components/FAQSection';
import Footer from '@/components/Footer';
import FloatingActions from '@/components/FloatingActions';
import CartDrawer from '@/components/CartDrawer';
import ProductModal from '@/components/ProductModal';
import CompareDrawer from '@/components/CompareDrawer';
import CheckoutModal from '@/components/CheckoutModal';
import TrackOrderModal from '@/components/TrackOrderModal';
import OrderSuccessModal from '@/components/OrderSuccessModal';
import QuoteModal from '@/components/QuoteModal';

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <TrustBar />
        <Calculator />
        <ProductCatalog />
        <CommercialSection />
        <ShowroomSection />
        <ServiceBooking />
        <ReviewsSection />
        <FAQSection />
      </main>
      <Footer />
      <FloatingActions />
      <CartDrawer />
      <CompareDrawer />
      <ProductModal />
      <CheckoutModal />
      <TrackOrderModal />
      <OrderSuccessModal />
      <QuoteModal />
    </>
  );
}

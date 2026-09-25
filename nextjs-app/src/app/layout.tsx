import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { CartProvider } from "@/context/CartContext";
import { ModalProvider } from "@/context/ModalContext";
import CartDrawer from "@/components/CartDrawer";
import CheckoutModal from "@/components/CheckoutModal";
import DishCustomModal from "@/components/DishCustomModal";
import OrderSuccessModal from "@/components/OrderSuccessModal";
import PhotoGalleryModal from "@/components/PhotoGalleryModal";
import ReviewFormModal from "@/components/ReviewFormModal";
import RiderModal from "@/components/RiderModal";
import TrackOrderModal from "@/components/TrackOrderModal";
import KitchenModal from "@/components/KitchenModal";
import FloatingCartBar from "@/components/FloatingCartBar";
import MobileBottomNav from "@/components/MobileBottomNav";
import ScrollToTopButton from "@/components/ScrollToTopButton";

export const metadata: Metadata = {
  metadataBase: new URL("https://hotelshivansh.com"),
  title: "HOTEL SHIVANSH | AC Luxury Stay & Pure Veg Dining, Sikar (Rated 5.0)",
  description: "Book HOTEL SHIVANSH in Sikar Roadlines, Sikar (Opposite Roadways Bus Depot). Starts at ₹1,999/night. Rated 5.0 on Justdial with 11 reviews & 55+ photos. 100% Pure Veg Royal Dining & AC Luxury Accommodation.",
  keywords: [
    "HOTEL SHIVANSH", "Hotel Shivansh Sikar", "Hotels in Sikar", "Sikar Roadlines",
    "Opposite Roadways Bus Depot", "Pure Veg Restaurant Sikar", "Maharaja Thali",
    "Khatu Shyam Ji Hotels", "Salasar Hotels", "Budget Luxury Hotel Sikar",
    "AC Rooms in Sikar", "Best Hotels near me in Sikar"
  ],
  authors: [{ name: "HOTEL SHIVANSH" }],
  creator: "HOTEL SHIVANSH",
  publisher: "HOTEL SHIVANSH",
  icons: {
    icon: "/assets/hotel_hero.jpg",
    apple: "/assets/hotel_hero.jpg",
  },
  openGraph: {
    title: "HOTEL SHIVANSH | Sikar Roadlines (Opp. Roadways Bus Depot)",
    description: "Rated 5.0 on Justdial. Starts at ₹1,999/night. 100% Pure Vegetarian Royal Dining & AC Luxury Accommodation.",
    url: "https://hotelshivansh.com",
    siteName: "HOTEL SHIVANSH",
    locale: "en_IN",
    type: "website",
    images: [
      {
        url: "/assets/hotel_hero.jpg",
        width: 1200,
        height: 630,
        alt: "HOTEL SHIVANSH Sikar",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "HOTEL SHIVANSH | Best Hotel in Sikar, Rajasthan",
    description: "Opposite Roadways Bus Depot. Starts at ₹1,999/night. 5.0 Star Rated on Justdial.",
    images: ["/assets/hotel_hero.jpg"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5, user-scalable=yes" />
        <meta name="theme-color" content="#080c14" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,100..1000;1,9..40,100..1000&family=Playfair+Display:ital,wght@0,400..900;1,400..900&display=swap"
          rel="stylesheet"
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              if (typeof window !== 'undefined') {
                if ('serviceWorker' in navigator) {
                  navigator.serviceWorker.getRegistrations().then(function(regs) {
                    for (var r of regs) { r.unregister(); }
                  });
                }
                if ('caches' in window) {
                  caches.keys().then(function(names) {
                    for (var name of names) { caches.delete(name); }
                  });
                }
              }
            `,
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": ["Hotel", "Restaurant"],
              name: "HOTEL SHIVANSH",
              description: "Book HOTEL SHIVANSH in Sikar Roadlines, Sikar (Opposite Roadways Bus Depot). Starts at ₹1,999/night. Rated 5.0 on Justdial.",
              address: {
                "@type": "PostalAddress",
                streetAddress: "Opposite Roadways Bus Depot",
                addressLocality: "Sikar Roadlines",
                postalCode: "332001",
                addressRegion: "Sikar",
                addressCountry: "IN",
              },
              geo: {
                "@type": "GeoCoordinates",
                latitude: "27.599932694444",
                longitude: "75.15214",
              },
              url: "https://www.justdial.com/Sikar/HOTEL-SHIVANSH-Opposite-Roadways-Bus-Depot-Sikar-Roadlines/9999P1572-1572-251202150053-X6V6_BZDET",
              telephone: "+919460624455",
              priceRange: "Starts at INR 1,999/Night",
              aggregateRating: {
                "@type": "AggregateRating",
                ratingValue: "5.0",
                ratingCount: "11",
                bestRating: "5",
                worstRating: "0",
              },
              servesCuisine: ["Rajasthani", "North Indian", "Pure Vegetarian", "Thali", "Chinese"],
              openingHoursSpecification: [
                {
                  "@type": "OpeningHoursSpecification",
                  dayOfWeek: [
                    "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"
                  ],
                  opens: "00:00",
                  closes: "23:59",
                },
              ],
              image: "https://hotelshivansh.com/assets/hotel_hero.jpg",
            }),
          }}
        />
      </head>
      <body className="bg-[#080c14] text-slate-100 font-sans min-h-screen flex flex-col selection:bg-[#d4af37] selection:text-[#080c14] antialiased">
        <CartProvider>
          <ModalProvider>
            <a
              href="#main-content"
              className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-[#d4af37] focus:text-[#080c14] rounded-md font-bold"
            >
              Skip to content
            </a>
            
            <Header />
            
            <main id="main-content" className="flex-1">
              {children}
            </main>
            
            <Footer />

            {/* Interactive Modals */}
            <CartDrawer />
            <CheckoutModal />
            <DishCustomModal />
            <OrderSuccessModal />
            <PhotoGalleryModal />
            <ReviewFormModal />
            <RiderModal />
            <TrackOrderModal />
            <KitchenModal />
            <FloatingCartBar />
            <MobileBottomNav />
            <ScrollToTopButton />

          </ModalProvider>
        </CartProvider>
      </body>
    </html>
  );
}

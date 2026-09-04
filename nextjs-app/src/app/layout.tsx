import type { Metadata } from "next";
import "./globals.css";
import { CartProvider } from "@/context/CartContext";
import { ModalProvider } from "@/context/ModalContext";

export const metadata: Metadata = {
  metadataBase: new URL("https://hitachi-sikar.com"),
  title: "Hitachi Brand Shop - K.K. Enterprises | Sikar, Rajasthan | Official Dealer for ACs & Home Appliances",
  description: "Official Hitachi Brand Shop in Sikar - K.K. Enterprises. Discover Hitachi Split ACs (airHome series 1.5 Ton 3-Star & 5-Star Copper), Window ACs (Kaze Plus), Commercial Cassette & Set-Free VRF ACs, Washing Machines, Home Inverters & Refrigerators. Best prices, 0% EMI & same-day installation.",
  keywords: ["Hitachi Brand Shop Sikar", "K.K. Enterprises Hitachi", "Hitachi AC Sikar", "airHome Split AC 1.5 Ton", "Hitachi Kaze Plus Window AC", "Hitachi Cassette AC", "Hitachi VRF Sikar"],
  openGraph: {
    title: "Hitachi Brand Shop - K.K. Enterprises | Sikar, Rajasthan",
    description: "Authorized Hitachi Brand Shop for Inverter Split ACs, Window ACs, VRF Systems, Washing Machines, and Home Appliances. Genuine Warranty & Expert Installation in Sikar.",
    type: "website",
    images: ["/assets/storefront.png"],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "HVACBusiness",
              name: "Hitachi Brand Shop - K.K. Enterprises",
              image: "/assets/storefront.png",
              description: "Authorized Dealer and Official Brand Shop of Hitachi Air Conditioning, Washing Machines, Refrigerators and Home Appliances in Sikar, Rajasthan.",
              address: {
                "@type": "PostalAddress",
                streetAddress: "Ganpati Tower, Mohalla Qureshi / Sikar Roadlines Area",
                addressLocality: "Sikar",
                addressRegion: "Rajasthan",
                postalCode: "332001",
                addressCountry: "IN",
              },
              telephone: "+919587111100",
              priceRange: "₹11,990 - ₹2,50,000",
              openingHoursSpecification: [
                {
                  "@type": "OpeningHoursSpecification",
                  dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
                  opens: "10:00",
                  closes: "20:30",
                },
              ],
              brand: "Hitachi",
            }),
          }}
        />
      </head>
      <body>
        <CartProvider>
          <ModalProvider>
            {children}
          </ModalProvider>
        </CartProvider>
      </body>
    </html>
  );
}

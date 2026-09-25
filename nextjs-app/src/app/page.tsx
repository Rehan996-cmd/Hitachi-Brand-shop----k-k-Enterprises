'use client';

import React from 'react';
import Hero from '@/components/Hero';
import WhyShivanshSection from '@/components/WhyShivanshSection';
import RoomsShowcaseSection from '@/components/RoomsShowcaseSection';
import SpecialsSection from '@/components/SpecialsSection';
import DiningModeSection from '@/components/DiningModeSection';
import MenuSection from '@/components/MenuSection';
import InRoomDiningSection from '@/components/InRoomDiningSection';
import TableReservationSection from '@/components/TableReservationSection';
import ReviewsSection from '@/components/ReviewsSection';
import FAQSection from '@/components/FAQSection';

export default function Home() {
  return (
    <div className="bg-[#080c14] text-slate-100 min-h-screen">
      <Hero />
      <div id="why-shivansh">
        <WhyShivanshSection />
      </div>
      <RoomsShowcaseSection />
      <SpecialsSection />
      <DiningModeSection />
      <MenuSection />
      <InRoomDiningSection />
      <TableReservationSection />
      <ReviewsSection />
      <FAQSection />
    </div>
  );
}

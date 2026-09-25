'use client';

import React, { useState, useEffect, useRef } from 'react';
import { useModal } from '@/context/ModalContext';
import { useCart } from '@/context/CartContext';
import { Order, ZomatoDeliveryStage } from '@/lib/types';
import { Search, Clock, MessageSquare, X, Check, Phone, Bike, ChefHat, Play, CheckCircle2 } from 'lucide-react';

export default function TrackOrderModal() {
  const { activeModal, modalData, openModal, closeModal, showToast } = useModal();
  const { activeOrder } = useCart();

  const [searchId, setSearchId] = useState<string>((modalData.orderId as string) || (activeOrder?.id || ''));
  const [searchedOrder, setSearchedOrder] = useState<Order | null>(activeOrder || null);
  const [isSimulating, setIsSimulating] = useState(false);
  const simTimerRef = useRef<any>(null);

  useEffect(() => {
    if (modalData.orderId) {
      setSearchId(modalData.orderId as string);
      fetchOrder(modalData.orderId as string);
    } else if (activeOrder) {
      setSearchId(activeOrder.id);
      setSearchedOrder(activeOrder);
    } else {
      const lastId = typeof window !== 'undefined' ? localStorage.getItem('shivansh_last_order_id') : null;
      if (lastId) {
        setSearchId(lastId);
        fetchOrder(lastId);
      }
    }
  }, [modalData.orderId, activeOrder]);

  useEffect(() => {
    return () => {
      if (simTimerRef.current) clearInterval(simTimerRef.current);
    };
  }, []);

  if (activeModal !== 'trackOrder') return null;

  async function fetchOrder(id: string) {
    try {
      const res = await fetch(`/api/orders/${encodeURIComponent(id)}`);
      if (res.ok) {
        const data = await res.json();
        if (data?.order) {
          setSearchedOrder(data.order);
          return;
        }
      }
    } catch {}

    // Check localStorage
    try {
      const saved = localStorage.getItem(`shivansh_order_${id}`);
      if (saved) {
        setSearchedOrder(JSON.parse(saved));
        return;
      }
    } catch {}

    // Realistic fallback for demonstration
    const fallback: Order = {
      id: id.toUpperCase(),
      orderNumber: 48291,
      createdAt: new Date().toISOString(),
      type: 'delivery',
      status: 'Zomato Rider Dispatched & Heading to Hotel Shivansh',
      customer: {
        name: 'Amit Shekhawat',
        phone: '+91 98290 12345',
        orderType: 'delivery',
        address: 'Piprali Road, Sikar (Near Silver Jublee Rd)',
      },
      items: [
        { id: 'thali-1', name: 'Shivansh Maharaja Special Royal Thali', unitPrice: 320, quantity: 2, total: 640 },
        { id: 'main-1', name: 'Paneer Butter Masala (Handi Special)', unitPrice: 280, quantity: 1, total: 280 },
      ],
      pricing: {
        subtotal: 920,
        discount: 0,
        couponCode: null,
        baseAmount: 920,
        gstRate: '5%',
        gstAmount: 46,
        deliveryFee: 0,
        grandTotal: 966,
      },
      payment: {
        method: 'UPI_QR',
        status: 'Confirmed',
        transactionRef: 'UPI-984210',
      },
      deliveryPartner: {
        provider: 'Zomato Express Logistics',
        brand: 'Zomato',
        riderName: 'Vikram Saini',
        riderPhone: '+91 98292 48110',
        vehicleNumber: 'RJ-23-SZ-4891',
        avatar: 'VS',
        stage: 'heading_to_hotel',
        statusText: 'Zomato Rider Assigned & Heading to Hotel Shivansh for Pickup',
        deliveryOtp: '2449',
        etaMinutes: 25,
        progressPercent: 35,
      },
      deliveryOtp: '2449',
      estimatedTime: '20-25 Mins',
      timeline: [
        { step: 'Order Placed & Confirmed', time: 'Just now', status: 'completed' },
        { step: 'Hotel Shivansh Kitchen Preparing Food', time: 'Active', status: 'active' },
        { step: 'Zomato Rider Dispatched & Heading to Hotel Shivansh', time: 'Est. 12 mins', status: 'pending' },
        { step: 'Food Picked Up from Hotel Shivansh Kitchen', time: 'Est. 18 mins', status: 'pending' },
        { step: 'Out for Doorstep Delivery across Sikar', time: 'Est. 22 mins', status: 'pending' },
        { step: 'Delivered to Customer (OTP Verified)', time: 'Est. 25 mins', status: 'pending' },
      ],
    };
    setSearchedOrder(fallback);
  }

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const id = searchId.trim().toUpperCase();
    if (!id) {
      showToast('Please enter an Order ID.');
      return;
    }
    fetchOrder(id);
  };

  const handleStepSimulation = async (step: number) => {
    if (!searchedOrder) return;
    const stages: ZomatoDeliveryStage[] = ['assigned', 'assigned', 'heading_to_hotel', 'at_hotel', 'picked_up', 'out_for_delivery', 'delivered'];
    const percents = [0, 15, 35, 50, 65, 85, 100];
    const statusTitles = [
      '',
      'Order Placed',
      'Hotel Shivansh Kitchen Preparing Food',
      'Zomato Rider at Hotel Shivansh Counter',
      'Order Picked Up from Hotel Shivansh Kitchen',
      'Out for Doorstep Delivery across Sikar',
      'Order Delivered to Customer (OTP Verified)',
    ];

    try {
      const res = await fetch('/api/delivery/auto-simulate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ orderId: searchedOrder.id, step }),
      });
      if (res.ok) {
        const data = await res.json();
        if (data?.order) {
          setSearchedOrder(data.order);
          showToast(`Stage updated: ${statusTitles[step] || data.order.status}`, { icon: '🛵' });
          return;
        }
      }
    } catch {}

    // Local fallback update
    const updated: Order = {
      ...searchedOrder,
      status: statusTitles[step] || searchedOrder.status,
      deliveryPartner: searchedOrder.deliveryPartner ? {
        ...searchedOrder.deliveryPartner,
        stage: stages[step] || 'assigned',
        progressPercent: percents[step] || 35,
        statusText: statusTitles[step],
      } : undefined,
      timeline: searchedOrder.timeline.map((t, idx) => ({
        ...t,
        status: idx + 1 < step ? 'completed' : idx + 1 === step ? 'active' : 'pending',
      })),
    };
    setSearchedOrder(updated);
    showToast(`Stage updated: ${statusTitles[step]}`, { icon: '🛵' });
  };

  const handleAutoSimulate = () => {
    if (isSimulating) return;
    setIsSimulating(true);
    showToast('Starting Live Delivery Simulation (Hotel Kitchen -> Doorstep)...', { icon: '🛵' });

    let cur = 2;
    handleStepSimulation(cur);

    simTimerRef.current = setInterval(() => {
      cur++;
      if (cur > 6) {
        if (simTimerRef.current) clearInterval(simTimerRef.current);
        setIsSimulating(false);
        showToast('🎉 Order Successfully Delivered by Zomato Rider with Verified OTP!', { icon: '👑' });
      } else {
        handleStepSimulation(cur);
      }
    }, 3500);
  };

  const isDelivery = searchedOrder?.type === 'delivery' || Boolean(searchedOrder?.deliveryPartner);
  const partner = searchedOrder?.deliveryPartner;
  const otpStr = String(searchedOrder?.deliveryOtp || partner?.deliveryOtp || '2449').padStart(4, '0');
  const stage = partner?.stage || 'assigned';
  const progressPercent = partner?.progressPercent || (stage === 'delivered' ? 100 : stage === 'out_for_delivery' ? 85 : stage === 'picked_up' ? 65 : stage === 'at_hotel' ? 50 : 35);

  return (
    <div
      className="fixed inset-0 z-[1000] bg-black/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-5 overflow-y-auto animate-fadeIn"
      onClick={e => { if (e.target === e.currentTarget) closeModal(); }}
    >
      <div className="bg-[#0a0f1d] border border-[#d4af37]/35 w-full max-w-xl rounded-3xl overflow-hidden shadow-[0_25px_70px_rgba(0,0,0,0.95)] p-5 sm:p-7 text-slate-100 my-auto">
        
        {/* Modal Top Header */}
        <div className="flex items-center justify-between pb-4 border-b border-[#d4af37]/20 mb-5">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-[#d4af37]/10 border border-[#d4af37]/30 flex items-center justify-center">
              <Search className="w-5 h-5 text-[#d4af37]" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-lg sm:text-xl font-serif font-black text-white">Track Food Order</h3>
                <span className="bg-[#e23744] text-white text-[10px] font-black px-2 py-0.5 rounded-full uppercase tracking-wider">
                  Zomato Fleet
                </span>
              </div>
              <span className="text-xs text-slate-400">Live Kitchen &amp; Rider GPS Dispatch in Sikar</span>
            </div>
          </div>
          <button
            onClick={closeModal}
            className="w-8 h-8 rounded-full bg-slate-800/80 hover:bg-slate-700 text-slate-300 hover:text-white transition flex items-center justify-center cursor-pointer border border-slate-700"
            aria-label="Close modal"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Search Bar */}
        <form onSubmit={handleSearch} className="flex gap-2 mb-5">
          <input
            type="text"
            placeholder="Enter Order ID (e.g. SHV-48291)"
            value={searchId}
            onChange={e => setSearchId(e.target.value)}
            className="flex-1 bg-[#101728] border border-[#d4af37]/30 rounded-xl px-4 py-2.5 text-sm text-white uppercase placeholder:text-slate-500 focus:outline-none focus:border-[#d4af37] transition font-mono font-bold"
          />
          <button
            type="submit"
            className="bg-gradient-to-r from-[#d4af37] to-[#dfc17b] text-[#080c14] font-extrabold px-5 py-2.5 rounded-xl text-xs sm:text-sm transition cursor-pointer shadow-md hover:opacity-95"
          >
            Track
          </button>
        </form>

        {searchedOrder && (
          <div className="space-y-4 max-h-[75vh] overflow-y-auto pr-1">
            
            {/* Summary Box */}
            <div className="bg-[#101728] border border-[#d4af37]/25 rounded-2xl p-4 text-xs sm:text-sm space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-slate-400">Order ID:</span>
                <span className="font-mono font-bold text-[#d4af37] text-sm sm:text-base">{searchedOrder.id}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-slate-400">Customer &amp; Location:</span>
                <span className="text-white font-bold truncate max-w-[260px]">
                  {searchedOrder.customer.name} • {searchedOrder.customer.address || `Room #${searchedOrder.customer.roomNumber}`}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-slate-400">Live Status:</span>
                <span className="text-emerald-400 font-extrabold flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-emerald-400" />
                  <span>{searchedOrder.status}</span>
                </span>
              </div>
            </div>

            {/* ZOMATO EXPRESS DISPATCH SECTION */}
            {isDelivery && (
              <div className="space-y-3.5">
                
                {/* Zomato Header Banner */}
                <div className="bg-gradient-to-r from-[#e23744]/25 to-slate-900 border border-[#e23744]/40 rounded-2xl p-3 flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <span className="bg-[#e23744] text-white font-black text-xs px-2.5 py-1 rounded-md tracking-wider">
                      zomato
                    </span>
                    <div>
                      <div className="text-xs font-bold text-white">Express Logistics Partner</div>
                      <div className="text-[11px] text-slate-300">Fast Food Delivery Fleet · Sikar</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-1.5 text-emerald-400 font-mono font-extrabold text-xs bg-emerald-950/60 border border-emerald-500/30 px-2.5 py-1 rounded-lg">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                    <span>ETA: {partner?.etaMinutes || 25} MINS</span>
                  </div>
                </div>

                {/* Secret 4-digit Delivery OTP Card */}
                <div className="bg-gradient-to-b from-[#161a29] to-[#0d121d] border-2 border-[#d4af37]/60 rounded-2xl p-4 text-center shadow-lg relative overflow-hidden">
                  <div className="text-xs font-extrabold text-[#d4af37] tracking-wider uppercase mb-2 flex items-center justify-center gap-1.5">
                    <span>🔐</span>
                    <span>Your Secret 4-Digit Delivery OTP</span>
                  </div>
                  <div className="flex items-center justify-center gap-3 my-2">
                    {otpStr.split('').map((digit, idx) => (
                      <div
                        key={idx}
                        className="w-12 h-14 rounded-xl bg-[#080c14] border-2 border-[#d4af37] flex items-center justify-center font-mono font-black text-2xl sm:text-3xl text-white shadow-[0_0_15px_rgba(212,175,55,0.35)] animate-pulse"
                      >
                        {digit}
                      </div>
                    ))}
                  </div>
                  <div className="bg-[#d4af37]/15 border border-[#d4af37]/40 rounded-xl p-2.5 text-xs text-amber-200 mt-2 max-w-md mx-auto leading-relaxed text-left flex items-start gap-2">
                    <span className="text-base flex-shrink-0">⚠️</span>
                    <span>
                      <strong>Customer Notice:</strong> Share this 4-digit OTP ONLY with the Zomato rider when they reach your doorstep. Never share OTP over the phone!
                    </span>
                  </div>
                </div>

                {/* Assigned Rider Card */}
                <div className="bg-[#101728] border border-slate-700/60 rounded-2xl p-3.5 flex items-center justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-red-500 to-[#e23744] flex items-center justify-center text-white font-extrabold text-sm shadow-md">
                      {partner?.avatar || 'VS'}
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-white text-sm">{partner?.riderName || 'Vikram Saini'}</span>
                        <span className="text-[10px] bg-emerald-950 text-emerald-300 border border-emerald-600/40 px-1.5 py-0.2 rounded font-bold">
                          Verified Rider
                        </span>
                      </div>
                      <div className="text-[11px] text-slate-400">
                        ★ 4.9 (1,840 Trips) • Hero Splendor ({partner?.vehicleNumber || 'RJ-23-SZ-4891'})
                      </div>
                      <div className="text-[11px] text-red-400 font-semibold mt-0.5 flex items-center gap-1">
                        <Bike className="w-3 h-3 text-red-400" />
                        <span>{partner?.statusText || 'Heading to Hotel Shivansh Kitchen'}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 shrink-0">
                    <a
                      href={`tel:${(partner?.riderPhone || '+919829248110').replace(/\s+/g, '')}`}
                      className="w-10 h-10 rounded-xl bg-emerald-950 hover:bg-emerald-900 border border-emerald-500/50 text-emerald-400 flex items-center justify-center transition shadow cursor-pointer shrink-0"
                      title="Call Delivery Rider"
                    >
                      <Phone className="w-4 h-4" />
                    </a>
                    <a
                      href="tel:+919460624455"
                      className="w-10 h-10 rounded-xl bg-[#d4af37] hover:bg-[#aa771c] text-[#080c14] flex items-center justify-center transition shadow cursor-pointer shrink-0 font-bold text-sm"
                      title="Call Hotel Shivansh Kitchen / Front Desk (+91 94606 24455)"
                    >
                      👨‍🍳
                    </a>
                  </div>
                </div>

                {/* Sikar Live Route GPS Visualizer */}
                <div className="bg-[#0c1220] border border-slate-800 rounded-2xl p-3.5 space-y-2">
                  <div className="flex justify-between items-center text-xs">
                    <span className="text-slate-400 flex items-center gap-1.5">
                      <span>📍</span>
                      <strong className="text-white">Live Sikar Transit Route</strong>
                    </span>
                    <span className="text-[#d4af37] font-semibold text-[11px]">
                      {stage === 'delivered'
                        ? '🎉 Delivered at Doorstep!'
                        : stage === 'out_for_delivery'
                        ? '🛵 En Route to Address (0.8 km)'
                        : stage === 'picked_up'
                        ? '📦 Food Picked Up from Kitchen'
                        : stage === 'at_hotel'
                        ? '🏨 Rider at Hotel Shivansh Counter'
                        : '🛵 Rider heading to Hotel Shivansh'}
                    </span>
                  </div>

                  {/* Route Canvas Bar */}
                  <div className="relative pt-6 pb-4 px-3">
                    <div className="h-2 bg-slate-800 rounded-full w-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-[#d4af37] via-[#e23744] to-emerald-400 transition-all duration-700 rounded-full"
                        style={{ width: `${progressPercent}%` }}
                      />
                    </div>

                    {/* Hotel Shivansh Pin */}
                    <div className="absolute top-0 left-2 -translate-x-1/2 flex flex-col items-center">
                      <span className="text-base">🏨</span>
                      <span className="text-[9px] font-bold text-[#d4af37] tracking-tight">Shivansh</span>
                    </div>

                    {/* Rider Moving Pin */}
                    <div
                      className="absolute top-0 -translate-x-1/2 flex flex-col items-center transition-all duration-700"
                      style={{ left: `${Math.min(94, Math.max(6, progressPercent))}%` }}
                    >
                      <span className="text-base animate-bounce">🛵</span>
                      <span className="text-[9px] font-black text-red-400 bg-black/60 px-1 rounded">Rider</span>
                    </div>

                    {/* Doorstep Drop Pin */}
                    <div className="absolute top-0 right-2 translate-x-1/2 flex flex-col items-center">
                      <span className="text-base">📍</span>
                      <span className="text-[9px] font-bold text-emerald-400 tracking-tight">Doorstep</span>
                    </div>
                  </div>
                </div>

              </div>
            )}

            {/* Stepper Timeline */}
            <div className="space-y-3 relative pl-5 border-l-2 border-[#d4af37]/30 ml-2 pt-1">
              {searchedOrder.timeline.map((stepItem, idx) => {
                const isCompleted = stepItem.status === 'completed';
                const isActive = stepItem.status === 'active';

                return (
                  <div key={idx} className="relative flex items-start justify-between gap-3 text-xs">
                    <div
                      className={`absolute -left-[27px] top-0.5 w-5 h-5 rounded-full border-2 flex items-center justify-center text-[9px] font-bold ${
                        isCompleted
                          ? 'bg-emerald-600 border-emerald-500 text-white'
                          : isActive
                          ? 'bg-[#d4af37] border-[#d4af37] text-[#080c14] animate-pulse shadow-[0_0_10px_#d4af37]'
                          : 'bg-[#101728] border-slate-700 text-slate-500'
                      }`}
                    >
                      {isCompleted ? <Check className="w-3 h-3 text-white stroke-[3]" /> : idx + 1}
                    </div>

                    <div>
                      <strong className={`block ${isActive ? 'text-[#d4af37] font-bold' : isCompleted ? 'text-white' : 'text-slate-500'}`}>
                        {stepItem.step}
                      </strong>
                      <span className="text-[11px] text-slate-400">{stepItem.time}</span>
                    </div>

                    {isActive && (
                      <span className="text-[9px] font-bold bg-[#d4af37]/20 text-[#f3e8b1] border border-[#d4af37]/40 px-2 py-0.5 rounded-full shrink-0">
                        LIVE NOW
                      </span>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Interactive Testing & Simulation Bar */}
            <div className="bg-[#101728] border border-slate-800 rounded-2xl p-3.5 space-y-2.5">
              <div className="flex justify-between items-center">
                <span className="text-[11px] font-bold text-amber-200/90 uppercase tracking-wider flex items-center gap-1.5">
                  <span>🎮</span>
                  <span>Interactive Delivery Showcase</span>
                </span>
                <span className="text-[10px] text-slate-400">Click to preview states</span>
              </div>

              {/* Step Buttons */}
              <div className="grid grid-cols-5 gap-1.5">
                <button
                  type="button"
                  onClick={() => handleStepSimulation(2)}
                  className="bg-slate-800 hover:bg-slate-700 text-slate-200 py-1.5 px-1 rounded-lg text-[10px] font-bold text-center border border-slate-700"
                >
                  🍳 Cooking
                </button>
                <button
                  type="button"
                  onClick={() => handleStepSimulation(3)}
                  className="bg-slate-800 hover:bg-slate-700 text-slate-200 py-1.5 px-1 rounded-lg text-[10px] font-bold text-center border border-slate-700"
                >
                  🏨 At Hotel
                </button>
                <button
                  type="button"
                  onClick={() => handleStepSimulation(4)}
                  className="bg-slate-800 hover:bg-slate-700 text-slate-200 py-1.5 px-1 rounded-lg text-[10px] font-bold text-center border border-slate-700"
                >
                  📦 Picked Up
                </button>
                <button
                  type="button"
                  onClick={() => handleStepSimulation(5)}
                  className="bg-slate-800 hover:bg-slate-700 text-slate-200 py-1.5 px-1 rounded-lg text-[10px] font-bold text-center border border-slate-700"
                >
                  🛵 Transit
                </button>
                <button
                  type="button"
                  onClick={() => handleStepSimulation(6)}
                  className="bg-emerald-950 hover:bg-emerald-900 text-emerald-300 py-1.5 px-1 rounded-lg text-[10px] font-bold text-center border border-emerald-500/40"
                >
                  🎉 Delivered
                </button>
              </div>

              {/* Full Simulation Button */}
              <button
                type="button"
                onClick={handleAutoSimulate}
                disabled={isSimulating}
                className="w-full bg-gradient-to-r from-[#d4af37] to-[#dfc17b] hover:opacity-95 text-[#080c14] font-black py-2.5 px-4 rounded-xl text-xs flex items-center justify-center gap-2 shadow-md transition disabled:opacity-50 cursor-pointer"
              >
                {isSimulating ? (
                  <>
                    <span className="w-2 h-2 rounded-full bg-[#080c14] animate-ping" />
                    <span>Simulating Real-Time Delivery (20s Live)...</span>
                  </>
                ) : (
                  <>
                    <Play className="w-3.5 h-3.5 fill-current" />
                    <span>▶️ Auto-Simulate Full Delivery (Kitchen &rarr; Doorstep)</span>
                  </>
                )}
              </button>

              {/* Terminal Switchers */}
              <div className="flex gap-2 pt-1">
                <button
                  type="button"
                  onClick={() => openModal('kitchenTerminal')}
                  className="flex-1 bg-slate-800 hover:bg-slate-700 border border-slate-600/60 text-slate-200 py-2 px-2 rounded-xl text-[11px] font-bold flex items-center justify-center gap-1.5 transition"
                >
                  <ChefHat className="w-3.5 h-3.5 text-[#d4af37]" />
                  <span>Open Kitchen Desk</span>
                </button>
                <button
                  type="button"
                  onClick={() => openModal('riderTerminal')}
                  className="flex-1 bg-[#e23744] hover:bg-[#cb202d] text-white py-2 px-2 rounded-xl text-[11px] font-bold flex items-center justify-center gap-1.5 transition shadow"
                >
                  <Bike className="w-3.5 h-3.5" />
                  <span>Open Rider Portal</span>
                </button>
              </div>
            </div>

            {/* Contact Kitchen Chef */}
            <div className="pt-1">
              <a
                href={`https://wa.me/919460624455?text=Hello%20Hotel%20Shivansh,%20I%20am%20checking%20status%20for%20Order%20${searchedOrder.id}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full bg-emerald-950/80 hover:bg-emerald-900/80 border border-emerald-500/40 text-emerald-300 py-3 px-4 rounded-xl transition flex items-center justify-center gap-2 text-xs font-bold cursor-pointer"
              >
                <MessageSquare className="w-4 h-4 text-emerald-400" />
                <span>Ask Hotel Shivansh Kitchen on WhatsApp</span>
              </a>
            </div>

          </div>
        )}

      </div>
    </div>
  );
}

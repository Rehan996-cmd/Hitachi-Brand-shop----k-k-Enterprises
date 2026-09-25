'use client';

import React, { useState, useEffect } from 'react';
import { useModal } from '@/context/ModalContext';
import { Order } from '@/lib/types';
import { X, Bike, Check, AlertCircle, Phone, MapPin, Building, CheckCircle2 } from 'lucide-react';

export default function RiderModal() {
  const { activeModal, closeModal, openModal, showToast } = useModal();
  const [order, setOrder] = useState<Order | null>(null);
  const [deliveryOrders, setDeliveryOrders] = useState<Order[]>([]);
  const [otpInput, setOtpInput] = useState('');
  const [isVerifying, setIsVerifying] = useState(false);
  const [statusMessage, setStatusMessage] = useState<string | null>(null);

  useEffect(() => {
    if (activeModal === 'riderTerminal') {
      loadTask();
    }
  }, [activeModal]);

  if (activeModal !== 'riderTerminal') return null;

  async function loadTask(targetId?: string) {
    try {
      const listRes = await fetch('/api/orders');
      if (listRes.ok) {
        const listData = await listRes.json();
        const delivs: Order[] = (listData?.orders || []).filter(
          (o: Order) => o.type === 'delivery' || Boolean(o.deliveryPartner)
        );
        setDeliveryOrders(delivs);

        const target = targetId || (typeof window !== 'undefined' ? localStorage.getItem('shivansh_last_order_id') : null);
        const match = delivs.find(o => o.id === target) || delivs[0];
        if (match) {
          setOrder(match);
          return;
        }
      }
    } catch {}

    const lastId = targetId || (typeof window !== 'undefined' ? localStorage.getItem('shivansh_last_order_id') || 'SHV-48291' : 'SHV-48291');
    try {
      const res = await fetch(`/api/orders/${encodeURIComponent(lastId)}`);
      if (res.ok) {
        const data = await res.json();
        if (data?.order) {
          setOrder(data.order);
          return;
        }
      }
    } catch {}

    // Fallback order
    setOrder({
      id: lastId,
      orderNumber: 48291,
      createdAt: new Date().toISOString(),
      type: 'delivery',
      status: 'Zomato Rider Assigned',
      customer: {
        name: 'Amit Shekhawat',
        phone: '+91 98290 12345',
        orderType: 'delivery',
        address: 'Piprali Road, Sikar (Near Silver Jublee Rd)',
        notes: 'Extra green chutney, pure desi ghee',
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
      payment: { method: 'CASH', status: 'Pending' },
      deliveryPartner: {
        provider: 'Zomato Express Logistics',
        riderName: 'Vikram Saini',
        vehicleNumber: 'RJ-23-SZ-4891',
        stage: 'heading_to_hotel',
        deliveryOtp: '2449',
        statusText: 'Heading to Hotel Shivansh Kitchen for Pickup',
      },
      deliveryOtp: '2449',
      estimatedTime: '20-25 Mins',
      timeline: [],
    });
  }

  const handleRiderAction = async (action: string) => {
    if (!order) return;
    try {
      const res = await fetch('/api/zomato/action', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ orderId: order.id, action }),
      });
      const data = await res.json();
      if (res.ok && data?.order) {
        setOrder(data.order);
        showToast(data.message || 'Updated', { icon: '🛵' });
      } else {
        showToast(data?.message || 'Action failed', { icon: '⚠️' });
      }
    } catch {
      // Local fallback
      const stages: Record<string, any> = {
        arrive_hotel: { stage: 'at_hotel', statusText: 'Arrived at Hotel Shivansh Counter' },
        pickup: { stage: 'picked_up', statusText: 'Food Picked Up from Hotel Kitchen' },
        out_for_delivery: { stage: 'out_for_delivery', statusText: 'Out for Doorstep Delivery in Sikar' },
      };
      if (stages[action]) {
        setOrder({
          ...order,
          deliveryPartner: {
            ...order.deliveryPartner!,
            stage: stages[action].stage,
            statusText: stages[action].statusText,
          },
        });
        showToast(stages[action].statusText, { icon: '🛵' });
      }
    }
  };

  const handleVerifyOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!order) return;
    const cleanOtp = otpInput.trim();
    if (!cleanOtp) {
      setStatusMessage('Please enter the 4-digit OTP provided by the customer.');
      return;
    }

    setIsVerifying(true);
    setStatusMessage(null);

    try {
      const res = await fetch('/api/zomato/action', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ orderId: order.id, action: 'deliver', otp: cleanOtp }),
      });
      const data = await res.json();
      setIsVerifying(false);

      if (res.ok && data?.order) {
        setOrder(data.order);
        showToast('🎉 OTP Verified! Order marked as DELIVERED.', { icon: '👑' });
      } else {
        setStatusMessage(data?.message || '❌ Invalid OTP! Ask customer for their 4-digit code.');
        showToast('Invalid OTP! Please check customer screen.', { icon: '❌' });
      }
    } catch {
      setIsVerifying(false);
      const expected = order.deliveryOtp || order.deliveryPartner?.deliveryOtp || '2449';
      if (cleanOtp === expected) {
        setOrder({
          ...order,
          status: 'Order Delivered to Customer (OTP Verified)',
          deliveryPartner: {
            ...order.deliveryPartner!,
            stage: 'delivered',
            statusText: 'Delivered at Doorstep',
          },
        });
        showToast('🎉 OTP Verified! Order DELIVERED.', { icon: '👑' });
      } else {
        setStatusMessage(`❌ Invalid OTP "${cleanOtp}". Expected: ${expected}`);
      }
    }
  };

  const stage = order?.deliveryPartner?.stage || 'assigned';

  return (
    <div
      className="fixed inset-0 z-[1000] bg-black/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-5 overflow-y-auto animate-fadeIn"
      onClick={e => { if (e.target === e.currentTarget) closeModal(); }}
    >
      <div className="bg-[#0a0f1d] border-2 border-[#e23744] w-full max-w-md rounded-3xl overflow-hidden shadow-[0_25px_70px_rgba(0,0,0,0.95)] text-slate-100 my-auto">
        
        {/* Rider App Top Bar */}
        <div className="bg-[#e23744] px-4 py-3 text-white flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="bg-white text-[#e23744] font-black text-xs px-2 py-0.5 rounded uppercase tracking-wider">
              zomato
            </span>
            <span className="font-bold text-xs sm:text-sm">Delivery Partner (Sikar Fleet)</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="bg-black/30 text-[11px] font-semibold px-2 py-0.5 rounded-full">
              Rider: Vikram Saini
            </span>
            <button
              onClick={closeModal}
              className="w-7 h-7 rounded-full bg-black/40 hover:bg-black/60 text-white transition flex items-center justify-center cursor-pointer"
              aria-label="Close modal"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Order Selector Bar if multiple deliveries exist */}
        {deliveryOrders.length > 1 && (
          <div className="bg-[#121929] px-4 py-2 border-b border-slate-800 flex items-center gap-1.5 overflow-x-auto text-xs">
            <span className="text-[10px] text-slate-400 font-bold whitespace-nowrap">Deliveries:</span>
            {deliveryOrders.map(deliv => (
              <button
                key={deliv.id}
                type="button"
                onClick={() => {
                  setOrder(deliv);
                  setOtpInput('');
                  setStatusMessage(null);
                }}
                className={`px-2.5 py-1 rounded-lg text-[11px] font-bold whitespace-nowrap transition cursor-pointer ${
                  order?.id === deliv.id
                    ? 'bg-[#e23744] text-white shadow'
                    : 'bg-slate-800/80 text-slate-300 hover:text-white border border-slate-700'
                }`}
              >
                {deliv.id} ({deliv.customer?.name ? deliv.customer.name.split(' ')[0] : 'Guest'})
              </button>
            ))}
          </div>
        )}

        {/* Rider Task Body */}
        {order && (
          <div className="p-4 sm:p-5 space-y-4">
            
            {/* Order Header */}
            <div className="flex justify-between items-center pb-3 border-b border-slate-800">
              <div>
                <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">ACTIVE TASK</span>
                <h4 className="font-mono font-black text-lg text-white">{order.id}</h4>
              </div>
              <span className={`text-[11px] font-extrabold px-2.5 py-1 rounded-full border ${
                stage === 'delivered'
                  ? 'bg-emerald-950 text-emerald-300 border-emerald-500/50'
                  : stage === 'out_for_delivery'
                  ? 'bg-amber-950 text-amber-300 border-amber-500/50'
                  : 'bg-red-950/80 text-red-300 border-red-500/50'
              }`}>
                {stage === 'delivered' ? '✓ Delivered' : stage === 'out_for_delivery' ? '🛵 On The Way' : stage === 'picked_up' ? '📦 Food Picked' : stage === 'at_hotel' ? '🏨 At Hotel' : 'Pickup Pending'}
              </span>
            </div>

            {/* Pickup & Drop Points */}
            <div className="space-y-2.5 bg-[#101728] p-3.5 rounded-2xl border border-slate-800 text-xs">
              <div className="flex items-start gap-2.5">
                <div className="w-6 h-6 rounded-lg bg-amber-500/15 border border-amber-500/30 flex items-center justify-center shrink-0 text-xs">
                  🏨
                </div>
                <div>
                  <strong className="text-white block">Pickup: Hotel Shivansh Kitchen</strong>
                  <span className="text-slate-400 text-[11px]">Salasar Road, Near Railway Station, Sikar</span>
                </div>
              </div>
              <div className="border-t border-slate-800/80 pt-2 flex items-start gap-2.5">
                <div className="w-6 h-6 rounded-lg bg-red-500/15 border border-red-500/30 flex items-center justify-center shrink-0 text-xs">
                  📍
                </div>
                <div>
                  <strong className="text-white block">Customer Drop: {order.customer.name}</strong>
                  <span className="text-slate-400 text-[11px]">{order.customer.address}</span>
                  <div className="text-[11px] text-emerald-400 mt-0.5">📞 {order.customer.phone}</div>
                </div>
              </div>
            </div>

            {/* Package Contents */}
            <div className="bg-[#0a0f1d] p-3 rounded-xl border border-slate-800/80 text-xs">
              <span className="text-[10px] text-amber-200/90 font-bold uppercase tracking-wider block mb-1">
                SEALED FOOD PACKAGE:
              </span>
              <div className="space-y-0.5 text-slate-300 text-[11px]">
                {order.items.map((i, idx) => (
                  <div key={idx}>• {i.quantity}x {i.name}</div>
                ))}
              </div>
            </div>

            {/* Rider Trip Earning Card (Vikram's Payout) */}
            <div className="bg-gradient-to-r from-emerald-950/60 to-slate-900 border border-emerald-500/40 rounded-2xl p-3.5 text-xs space-y-1.5 shadow-sm">
              <div className="flex justify-between items-center text-[11px] font-black text-emerald-400">
                <span>💵 RIDER TRIP EARNINGS (VIKRAM'S PAYOUT)</span>
                <span className="bg-emerald-900/80 text-emerald-200 border border-emerald-400/40 font-mono px-2 py-0.5 rounded text-[11px] font-bold">
                  Total: ₹{order.settlement?.totalRiderEarning || 45}
                </span>
              </div>
              <div className="flex justify-between text-slate-300 text-[11px] pt-1.5 border-t border-slate-800">
                <span>Base Trip Earning (Sikar Central Fleet):</span>
                <span className="font-mono text-white font-bold">₹{order.settlement?.riderTripPayout || 35}</span>
              </div>
              <div className="flex justify-between text-slate-300 text-[11px]">
                <span>Fast Kitchen Pickup &amp; OTP Bonus:</span>
                <span className="font-mono text-emerald-400 font-bold">+₹{order.settlement?.riderBonus || 10}</span>
              </div>
              <div className="text-[10px] text-amber-200/90 pt-0.5 flex items-center gap-1">
                <span>⚡</span>
                <span>Direct payout credited to Vikram's daily wallet upon OTP verification.</span>
              </div>
            </div>

            {/* Sequential Action Buttons Flow */}
            <div className="space-y-2 pt-1">
              
              {/* Step 1: Arrive at Hotel */}
              {stage === 'assigned' || stage === 'heading_to_hotel' ? (
                <button
                  type="button"
                  onClick={() => handleRiderAction('arrive_hotel')}
                  className="w-full bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-[#080c14] font-black py-3 px-4 rounded-xl text-xs flex items-center justify-center gap-2 shadow cursor-pointer"
                >
                  <Building className="w-4 h-4" />
                  <span>🏨 1. I Have Arrived at Hotel Shivansh Counter</span>
                </button>
              ) : null}

              {/* Step 2: Pick Up Order */}
              {stage === 'at_hotel' ? (
                <button
                  type="button"
                  onClick={() => handleRiderAction('pickup')}
                  className="w-full bg-gradient-to-r from-emerald-600 to-emerald-700 hover:opacity-95 text-white font-black py-3 px-4 rounded-xl text-xs flex items-center justify-center gap-2 shadow cursor-pointer"
                >
                  <CheckCircle2 className="w-4 h-4" />
                  <span>📦 2. Confirm Food Parcel Picked Up from Hotel</span>
                </button>
              ) : null}

              {/* Step 3: Start Transit to Customer */}
              {stage === 'picked_up' ? (
                <button
                  type="button"
                  onClick={() => handleRiderAction('out_for_delivery')}
                  className="w-full bg-gradient-to-r from-[#e23744] to-red-600 hover:opacity-95 text-white font-black py-3 px-4 rounded-xl text-xs flex items-center justify-center gap-2 shadow cursor-pointer"
                >
                  <Bike className="w-4 h-4" />
                  <span>🛵 3. Start Delivery to Customer Doorstep</span>
                </button>
              ) : null}

              {/* Step 4: OTP Verification at Doorstep */}
              {stage === 'out_for_delivery' ? (
                <form onSubmit={handleVerifyOtp} className="space-y-3 bg-[#101728] p-4 rounded-2xl border-2 border-[#d4af37]/60">
                  <div className="text-center">
                    <label className="text-xs font-black text-[#d4af37] tracking-wider uppercase block">
                      🔑 ENTER CUSTOMER 4-DIGIT DELIVERY OTP:
                    </label>
                    <span className="text-[11px] text-slate-400 block mt-0.5">
                      (Ask customer for the code displayed on their live tracking screen)
                    </span>
                  </div>

                  <input
                    type="text"
                    maxLength={4}
                    placeholder="e.g. 2449"
                    value={otpInput}
                    onChange={e => setOtpInput(e.target.value.replace(/\D/g, ''))}
                    className="w-full bg-[#080c14] border-2 border-[#d4af37] rounded-xl py-2.5 text-center text-2xl font-mono font-black text-white tracking-[0.5em] focus:outline-none focus:ring-2 focus:ring-[#d4af37]"
                  />

                  {statusMessage && (
                    <div className="text-xs font-bold text-red-400 text-center bg-red-950/40 p-2 rounded-lg border border-red-500/30">
                      {statusMessage}
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={isVerifying}
                    className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-black py-2.5 px-4 rounded-xl text-xs flex items-center justify-center gap-2 shadow cursor-pointer transition disabled:opacity-50"
                  >
                    <Check className="w-4 h-4 stroke-[3]" />
                    <span>{isVerifying ? 'Verifying...' : '✓ Verify OTP & Complete Delivery'}</span>
                  </button>
                </form>
              ) : null}

              {/* Delivered State */}
              {stage === 'delivered' ? (
                <div className="bg-emerald-950/70 border border-emerald-500/50 rounded-2xl p-4 text-center space-y-1">
                  <div className="text-2xl">🎉</div>
                  <strong className="text-emerald-300 text-sm block">Order Delivered Successfully!</strong>
                  <p className="text-[11px] text-slate-300">
                    OTP was verified and hot food parcel handed over to customer.
                  </p>
                </div>
              ) : null}

              {/* View Customer Tracking Screen */}
              <button
                type="button"
                onClick={() => {
                  closeModal();
                  openModal('trackOrder', { orderId: order.id });
                }}
                className="w-full bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 font-bold py-2 px-3 rounded-xl text-xs flex items-center justify-center gap-2 transition cursor-pointer mt-2"
              >
                <span>👁️ Switch to Customer Live Tracking Screen</span>
              </button>

            </div>

          </div>
        )}

      </div>
    </div>
  );
}

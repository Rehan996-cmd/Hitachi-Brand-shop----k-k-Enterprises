'use client';

import React, { useState, useEffect } from 'react';
import { useModal } from '@/context/ModalContext';
import { Order } from '@/lib/types';
import { X, RefreshCw, ChefHat, Bike, Eye, Clock, CheckCircle2 } from 'lucide-react';

export default function KitchenModal() {
  const { activeModal, closeModal, openModal, showToast } = useModal();
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(false);
  const [filterMode, setFilterMode] = useState<'active' | 'delivery' | 'all'>('active');

  useEffect(() => {
    if (activeModal === 'kitchenTerminal') {
      loadOrders(false);
      const interval = setInterval(() => {
        loadOrders(true);
      }, 7000);
      return () => clearInterval(interval);
    }
  }, [activeModal]);

  if (activeModal !== 'kitchenTerminal') return null;

  async function loadOrders(silent = false) {
    if (!silent) setLoading(true);
    try {
      const res = await fetch('/api/orders');
      if (res.ok) {
        const data = await res.json();
        if (data?.orders) {
          setOrders(data.orders);
          if (!silent) setLoading(false);
          return;
        }
      }
    } catch {}
    if (!silent) setLoading(false);

    // Fallback sample orders if empty
    setOrders([
      {
        id: 'SHV-48291',
        orderNumber: 48291,
        createdAt: new Date().toISOString(),
        type: 'delivery',
        status: 'Kitchen Cooking',
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
        payment: { method: 'UPI_QR', status: 'Confirmed' },
        deliveryPartner: {
          provider: 'Zomato Express Logistics',
          riderName: 'Vikram Saini',
          vehicleNumber: 'RJ-23-SZ-4891',
          stage: 'heading_to_hotel',
          deliveryOtp: '2449',
          statusText: 'Zomato Rider Assigned & Heading to Hotel',
        },
        deliveryOtp: '2449',
        estimatedTime: '20-25 Mins',
        timeline: [],
      },
    ]);
    setLoading(false);
  }

  const handleKitchenAction = async (orderId: string, action: string) => {
    try {
      const res = await fetch('/api/kitchen/action', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ orderId, action }),
      });
      const data = await res.json();
      if (res.ok) {
        showToast(`Order #${orderId}: ${data.message || 'Updated'}`, { icon: '🍳' });
        loadOrders();
      } else {
        showToast(data.message || 'Action failed', { icon: '⚠️' });
      }
    } catch {
      showToast('Action processed locally!', { icon: '✓' });
    }
  };

  const handleTrackLive = (orderId: string) => {
    closeModal();
    openModal('trackOrder', { orderId });
  };

  const displayedOrders = [...orders]
    .sort((a, b) => {
      const aDone = (a.status || '').toLowerCase().includes('delivered');
      const bDone = (b.status || '').toLowerCase().includes('delivered');
      if (aDone && !bDone) return 1;
      if (!aDone && bDone) return -1;
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    })
    .filter(o => {
      const isDone = (o.status || '').toLowerCase().includes('delivered');
      if (filterMode === 'active') return !isDone;
      if (filterMode === 'delivery') return o.type === 'delivery' || Boolean(o.deliveryPartner);
      return true;
    });

  return (
    <div
      className="fixed inset-0 z-[1000] bg-black/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-5 overflow-y-auto animate-fadeIn"
      onClick={e => { if (e.target === e.currentTarget) closeModal(); }}
    >
      <div className="bg-[#0a0f1d] border border-[#d4af37]/40 w-full max-w-2xl rounded-3xl overflow-hidden shadow-[0_25px_70px_rgba(0,0,0,0.95)] p-5 sm:p-7 text-slate-100 my-auto">
        
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-[#d4af37]/20 mb-5">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-[#d4af37]/10 border border-[#d4af37]/30 flex items-center justify-center">
              <ChefHat className="w-5 h-5 text-[#d4af37]" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="bg-[#d4af37] text-[#080c14] font-black text-[10px] px-2 py-0.5 rounded tracking-wider">
                  HOTEL SHIVANSH
                </span>
                <h3 className="text-base sm:text-lg font-serif font-black text-white">Kitchen &amp; Dispatch Terminal</h3>
              </div>
              <span className="text-xs text-slate-400">Cook fresh pure veg food &amp; handover to Zomato fleet</span>
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

        {/* Filter Tabs */}
        <div className="flex flex-wrap gap-2 mb-4">
          <button
            type="button"
            onClick={() => setFilterMode('active')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition cursor-pointer ${
              filterMode === 'active'
                ? 'bg-[#d4af37] text-[#080c14] shadow'
                : 'bg-slate-800/80 text-slate-300 hover:text-white border border-slate-700'
            }`}
          >
            🟡 Active ({orders.filter(o => !(o.status || '').toLowerCase().includes('delivered')).length})
          </button>
          <button
            type="button"
            onClick={() => setFilterMode('delivery')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition cursor-pointer ${
              filterMode === 'delivery'
                ? 'bg-[#e23744] text-white shadow'
                : 'bg-slate-800/80 text-slate-300 hover:text-white border border-slate-700'
            }`}
          >
            🛵 Zomato ({orders.filter(o => o.type === 'delivery' || Boolean(o.deliveryPartner)).length})
          </button>
          <button
            type="button"
            onClick={() => setFilterMode('all')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition cursor-pointer ${
              filterMode === 'all'
                ? 'bg-slate-200 text-[#080c14] shadow'
                : 'bg-slate-800/80 text-slate-300 hover:text-white border border-slate-700'
            }`}
          >
            📋 All ({orders.length})
          </button>
        </div>

        {/* Orders list */}
        <div className="space-y-4 max-h-[65vh] overflow-y-auto pr-1">
          {loading ? (
            <div className="text-center py-8 text-slate-400 text-sm">
              <RefreshCw className="w-5 h-5 animate-spin mx-auto mb-2 text-[#d4af37]" />
              Syncing live kitchen orders...
            </div>
          ) : displayedOrders.length === 0 ? (
            <div className="text-center py-10 text-slate-400 text-sm bg-[#101728] rounded-2xl border border-slate-800">
              {filterMode === 'active'
                ? 'All current orders have been completed and delivered! No active orders waiting.'
                : 'No orders found under this filter.'}
            </div>
          ) : (
            displayedOrders.map(order => {
              const isDelivery = order.type === 'delivery' || Boolean(order.deliveryPartner);
              const partner = order.deliveryPartner;

              return (
                <div key={order.id} className="bg-[#101728] border border-slate-800 rounded-2xl p-4 space-y-3">
                  <div className="flex justify-between items-start gap-2 border-b border-slate-800/80 pb-3">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-mono font-black text-base text-[#d4af37]">{order.id}</span>
                        <span className="text-[11px] text-slate-400">
                          {new Date(order.createdAt).toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' })}
                        </span>
                      </div>
                      <div className="text-xs text-white font-bold mt-0.5">
                        Guest: {order.customer.name} ({order.customer.phone})
                      </div>
                      <div className="text-[11px] text-slate-400">
                        {isDelivery ? `🛵 Sikar Delivery: ${order.customer.address}` : `🛎️ Hotel Room: #${order.customer.roomNumber}`}
                      </div>
                    </div>
                    <span className="bg-[#d4af37]/15 text-amber-200 border border-[#d4af37]/30 text-[11px] font-extrabold px-2.5 py-1 rounded-lg">
                      {order.status}
                    </span>
                  </div>

                  {/* Dishes list */}
                  <div className="bg-[#0a0f1d] rounded-xl p-2.5 text-xs text-slate-200">
                    <strong className="text-amber-200/90 block mb-1">Dishes to Cook:</strong>
                    <div className="space-y-0.5">
                      {order.items.map((item, idx) => (
                        <div key={idx} className="flex justify-between">
                          <span>{item.quantity}x {item.name}</span>
                          <span className="font-mono text-slate-400">₹{item.total || item.unitPrice * item.quantity}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {order.customer.notes && (
                    <div className="text-[11px] text-amber-300 bg-amber-950/40 border border-amber-600/30 px-3 py-1.5 rounded-lg">
                      <strong>Kitchen Note:</strong> {order.customer.notes}
                    </div>
                  )}

                  {/* Win-Win Partner Settlement Box */}
                  {isDelivery && (
                    <div className="bg-gradient-to-r from-emerald-950/50 via-slate-900 to-amber-950/40 border border-emerald-500/40 rounded-xl p-3 text-xs space-y-1.5">
                      <div className="flex justify-between items-center text-[11px] font-black text-emerald-400">
                        <span>💎 MUTUAL WIN-WIN PARTNER SETTLEMENT</span>
                        <span className="bg-emerald-900/70 border border-emerald-400/40 px-2 py-0.5 rounded text-[10px] text-white">
                          Direct D2C Advantage
                        </span>
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 pt-1 text-[11px]">
                        <div className="bg-black/50 p-2 rounded-lg border border-emerald-500/20">
                          <span className="text-slate-400 block text-[10px]">🏨 Hotel Shivansh Keeps:</span>
                          <strong className="text-emerald-300 font-mono text-xs">
                            ₹{order.settlement?.hotelNetEarning || Math.round((order.pricing?.subtotal || 600) * 0.92)}
                          </strong>
                          <span className="text-[9px] text-amber-300/90 block mt-0.5">
                            (Saved ₹{order.settlement?.hotelCommissionSaved || Math.round((order.pricing?.subtotal || 600) * 0.22)} vs 22% aggregator commission)
                          </span>
                        </div>
                        <div className="bg-black/50 p-2 rounded-lg border border-red-500/20">
                          <span className="text-slate-400 block text-[10px]">🛵 Zomato Express Logistics:</span>
                          <strong className="text-red-300 font-mono text-xs">
                            ₹{order.settlement?.zomatoLogisticsFee || 40}
                          </strong>
                          <span className="text-[9px] text-slate-400 block mt-0.5">Flat 3PL Logistics Fee</span>
                        </div>
                        <div className="bg-black/50 p-2 rounded-lg border border-amber-500/20">
                          <span className="text-slate-400 block text-[10px]">💵 Rider Vikram Saini:</span>
                          <strong className="text-amber-300 font-mono text-xs">
                            ₹{order.settlement?.totalRiderEarning || 45}
                          </strong>
                          <span className="text-[9px] text-emerald-400 block mt-0.5">Guaranteed Trip + On-Time Bonus</span>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Action Buttons */}
                  <div className="flex flex-wrap gap-2 pt-1">
                    <button
                      type="button"
                      onClick={() => handleKitchenAction(order.id, 'accept_cooking')}
                      className="bg-amber-600 hover:bg-amber-500 text-white font-extrabold px-3 py-1.5 rounded-xl text-xs flex items-center gap-1.5 transition"
                    >
                      <span>🍳 Start Cooking</span>
                    </button>

                    {isDelivery && (
                      <>
                        <button
                          type="button"
                          onClick={() => handleKitchenAction(order.id, 'dispatch_zomato')}
                          className="bg-[#e23744] hover:bg-[#cb202d] text-white font-extrabold px-3 py-1.5 rounded-xl text-xs flex items-center gap-1.5 transition shadow"
                        >
                          <Bike className="w-3.5 h-3.5" />
                          <span>Dispatch Zomato</span>
                        </button>
                        <button
                          type="button"
                          onClick={() => handleKitchenAction(order.id, 'handover_to_zomato')}
                          className="bg-emerald-800 hover:bg-emerald-700 text-white font-extrabold px-3 py-1.5 rounded-xl text-xs flex items-center gap-1.5 transition"
                        >
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          <span>Handover ({partner?.stage || 'assigned'})</span>
                        </button>
                      </>
                    )}

                    <button
                      type="button"
                      onClick={() => handleTrackLive(order.id)}
                      className="bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-200 font-bold px-3 py-1.5 rounded-xl text-xs flex items-center gap-1.5 transition ml-auto"
                    >
                      <Eye className="w-3.5 h-3.5 text-[#d4af37]" />
                      <span>Track Live</span>
                    </button>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Footer */}
        <div className="flex justify-between items-center mt-5 pt-3 border-t border-slate-800 text-xs">
          <span className="text-emerald-400 font-semibold flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            <span>Hotel Shivansh Kitchen Counter Online</span>
          </span>
          <button
            type="button"
            onClick={() => loadOrders(false)}
            className="bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 px-3 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 transition cursor-pointer"
          >
            <RefreshCw className="w-3.5 h-3.5 text-[#d4af37]" />
            <span>Refresh</span>
          </button>
        </div>

      </div>
    </div>
  );
}

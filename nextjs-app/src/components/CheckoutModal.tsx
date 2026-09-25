'use client';

import React, { useState } from 'react';
import { useModal } from '@/context/ModalContext';
import { useCart } from '@/context/CartContext';
import { PaymentMethod } from '@/lib/types';
import { getDishById } from '@/lib/products';
import {
  BellRing, UtensilsCrossed, Bike, QrCode, Banknote, CreditCard,
  X, Check, CheckCircle2, Copy, ArrowRight
} from 'lucide-react';

export default function CheckoutModal() {
  const { activeModal, closeModal, openModal, showToast } = useModal();
  const {
    items,
    diningMode,
    setDiningMode,
    selectedRoom,
    setSelectedRoom,
    selectedTable,
    setSelectedTable,
    subtotal,
    discount,
    gst,
    deliveryFee,
    grandTotal,
    coupon,
    clearCart,
    setActiveOrder,
  } = useCart();

  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [roomNum, setRoomNum] = useState(selectedRoom || '204');
  const [tableNum, setTableNum] = useState(selectedTable || 'Table 4');
  const [notes, setNotes] = useState('');
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('UPI_QR');
  const [copiedUpi, setCopiedUpi] = useState(false);

  if (activeModal !== 'checkout') return null;

  const upiId = '9460624455@upi';
  const upiPayUrl = `upi://pay?pa=${upiId}&pn=Hotel%20Shivansh&am=${grandTotal}&cu=INR&tn=Order%20Bill`;
  const qrCodeUrl = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(upiPayUrl)}`;

  const handleCopyUpi = () => {
    navigator.clipboard.writeText(upiId);
    setCopiedUpi(true);
    showToast('Hotel Shivansh UPI ID copied to clipboard!');
    setTimeout(() => setCopiedUpi(false), 2500);
  };

  const handlePlaceOrder = (e: React.FormEvent) => {
    e.preventDefault();

    if (!name.trim()) {
      showToast('Please enter your full name.');
      return;
    }
    if (!phone.trim() || phone.replace(/\D/g, '').length < 10) {
      showToast('Please enter a valid 10-digit mobile number.');
      return;
    }

    if (diningMode === 'delivery' && !address.trim()) {
      showToast('Please provide your complete delivery address.');
      return;
    }

    const orderId = `SHIV-${Math.floor(1000 + Math.random() * 9000)}`;
    const isDelivery = diningMode === 'delivery';
    const deliveryOtp = isDelivery ? Math.floor(1000 + Math.random() * 9000).toString() : null;

    const deliveryPartner = isDelivery ? {
      provider: 'Zomato Express Logistics',
      brand: 'Zomato',
      fleetType: 'Zomato Red Sikar Fleet',
      riderId: 'ZOM-SKR-' + Math.floor(100 + Math.random() * 900),
      riderName: 'Vikram Saini',
      riderPhone: '+91 98292 48110',
      vehicleNumber: 'RJ-23-SZ-4891',
      vehicleType: 'Hero Splendor (Thermal Bag)',
      rating: 4.9,
      tripsCount: 1840,
      avatar: 'VS',
      stage: 'assigned' as const,
      statusText: 'Zomato Rider Assigned & Heading to Hotel Shivansh for Pickup',
      deliveryOtp,
      pickupLocation: {
        name: 'Hotel Shivansh Kitchen & Restaurant',
        address: 'Near Railway Station, Salasar Road, Sikar (Raj.)',
        contact: '+91 94606 24455',
      },
      dropLocation: {
        name,
        address,
        phone,
      },
      etaMinutes: 28,
      progressPercent: 20,
    } : null;

    const timeline = isDelivery ? [
      { step: 'Order Placed & Confirmed', time: 'Just now', status: 'completed' as const },
      { step: 'Hotel Shivansh Kitchen Preparing Food', time: 'In Progress', status: 'active' as const },
      { step: 'Zomato Delivery Partner Assigned (Vikram Saini - RJ-23-SZ-4891)', time: 'En Route to Hotel', status: 'active' as const },
      { step: 'Food Picked Up from Hotel Shivansh Kitchen', time: 'Pending Handover', status: 'pending' as const },
      { step: 'Out for Doorstep Delivery across Sikar', time: 'Pending', status: 'pending' as const },
      { step: 'Order Delivered to Customer (OTP Verified)', time: 'Pending', status: 'pending' as const },
    ] : [
      { step: 'Order Placed & Confirmed', time: 'Just now', status: 'completed' as const },
      { step: 'Ingredients Prepped & Cooking in Kitchen', time: 'Underway', status: 'active' as const },
      { step: 'Quality Check & Packing', time: 'Pending', status: 'pending' as const },
      { step: diningMode === 'room' ? 'Delivered to Room' : 'Served at Table', time: 'Pending', status: 'pending' as const },
    ];

    const orderPayload = {
      id: orderId,
      orderNumber: Math.floor(100 + Math.random() * 900),
      createdAt: new Date().toISOString(),
      type: diningMode,
      status: isDelivery ? 'Confirmed - Zomato Rider Dispatched' : 'In Kitchen',
      customer: {
        name,
        phone,
        orderType: diningMode,
        roomNumber: diningMode === 'room' ? roomNum : null,
        tableNumber: diningMode === 'table' ? tableNum : null,
        address: diningMode === 'delivery' ? address : null,
        notes: notes || undefined,
      },
      items: items.map(item => {
        const d = getDishById(item.id);
        return {
          id: item.id,
          name: d ? d.name : item.id,
          unitPrice: item.unitPrice || (d ? d.price : 0),
          quantity: item.quantity,
          portion: item.portion,
          spice: item.spice,
          instructions: item.instructions,
          total: (item.unitPrice || (d ? d.price : 0)) * item.quantity,
        };
      }),
      pricing: {
        subtotal,
        discount,
        couponCode: coupon ? coupon.code : null,
        baseAmount: subtotal - discount,
        gstRate: '5%',
        gstAmount: gst,
        deliveryFee,
        grandTotal,
      },
      payment: {
        method: paymentMethod,
        status: paymentMethod === 'UPI_QR' ? 'Payment Initiated' : 'Pay on Delivery/Serving',
        transactionRef: `TXN-${Date.now().toString().slice(-6)}`,
      },
      estimatedTime: isDelivery ? '25-30 mins via Zomato Express' : (diningMode === 'room' ? '15-20 Mins' : '25-30 Mins'),
      deliveryPartner,
      timeline,
    };

    try {
      localStorage.setItem(`shivansh_order_${orderId}`, JSON.stringify(orderPayload));
      localStorage.setItem('shivansh_last_order_id', orderId);
      fetch('/api/order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(orderPayload),
      }).catch(() => {});
    } catch {}

    setActiveOrder(orderPayload);
    clearCart();
    closeModal();
    openModal('orderSuccess', { order: orderPayload });
  };

  return (
    <div
      className="fixed inset-0 z-[1000] bg-black/80 backdrop-blur-sm flex items-end sm:items-center justify-center p-0 sm:p-6 animate-fadeIn"
      onClick={e => { if (e.target === e.currentTarget) closeModal(); }}
    >
      <div className="bg-[#0a0f1d] border-t sm:border border-[#d4af37]/35 w-full max-w-2xl rounded-t-3xl sm:rounded-3xl overflow-hidden shadow-[0_20px_60px_rgba(0,0,0,0.9)] animate-slideUp max-h-[90vh] sm:max-h-[92vh] flex flex-col text-slate-100">
        
        {/* Mobile Drag Indicator */}
        <div className="sm:hidden w-12 h-1 bg-slate-700 rounded-full mx-auto my-2.5 shrink-0" />

        {/* Header */}
        <div className="p-5 sm:p-7 border-b border-[#d4af37]/20 bg-[#0c1222] flex items-center justify-between shrink-0">
          <div>
            <span className="text-xs font-bold tracking-widest text-[#d4af37] uppercase">FINAL STEP</span>
            <h3 className="text-xl sm:text-2xl font-serif font-black text-white mt-1">Complete Your Food Order</h3>
          </div>
          <button
            onClick={closeModal}
            className="w-9 h-9 rounded-full bg-slate-800/80 hover:bg-slate-700 text-slate-300 hover:text-white transition flex items-center justify-center cursor-pointer border border-slate-700"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Body */}
        <form onSubmit={handlePlaceOrder} className="overflow-y-auto p-6 sm:p-8 space-y-7 flex-1 text-xs sm:text-sm bg-[#0a0f1d]">
          
          {/* Service Mode Selector */}
          <div>
            <label className="block text-xs font-bold text-white uppercase tracking-wider mb-3">
              1. Choose Service Mode
            </label>
            <div className="grid grid-cols-3 gap-3 sm:gap-4">
              <button
                type="button"
                onClick={() => { setDiningMode('room'); setSelectedRoom(roomNum); }}
                className={`p-4 rounded-2xl border text-center transition font-bold cursor-pointer flex flex-col items-center justify-center ${
                  diningMode === 'room'
                    ? 'bg-[#161f36] border-[#d4af37] text-white shadow-[0_0_15px_rgba(212,175,55,0.25)]'
                    : 'bg-[#101728] border-slate-800 text-slate-400 hover:text-slate-200'
                }`}
              >
                <BellRing className="w-5 h-5 mb-1.5 text-[#d4af37]" />
                <span className="text-xs font-bold block">In-Room Dining</span>
                <span className="text-[10px] text-emerald-400 block font-semibold mt-0.5">Zero Delivery Fee</span>
              </button>

              <button
                type="button"
                onClick={() => { setDiningMode('table'); setSelectedTable(tableNum); }}
                className={`p-4 rounded-2xl border text-center transition font-bold cursor-pointer flex flex-col items-center justify-center ${
                  diningMode === 'table'
                    ? 'bg-[#161f36] border-[#d4af37] text-white shadow-[0_0_15px_rgba(212,175,55,0.25)]'
                    : 'bg-[#101728] border-slate-800 text-slate-400 hover:text-slate-200'
                }`}
              >
                <UtensilsCrossed className="w-5 h-5 mb-1.5 text-[#d4af37]" />
                <span className="text-xs font-bold block">Table Dine-In</span>
                <span className="text-[10px] text-[#f3e8b1] block font-semibold mt-0.5">Restaurant Seat</span>
              </button>

              <button
                type="button"
                onClick={() => setDiningMode('delivery')}
                className={`p-4 rounded-2xl border text-center transition font-bold cursor-pointer flex flex-col items-center justify-center ${
                  diningMode === 'delivery'
                    ? 'bg-[#161f36] border-[#d4af37] text-white shadow-[0_0_15px_rgba(212,175,55,0.25)]'
                    : 'bg-[#101728] border-slate-800 text-slate-400 hover:text-slate-200'
                }`}
              >
                <Bike className="w-5 h-5 mb-1.5 text-[#d4af37]" />
                <span className="text-xs font-bold block">Doorstep Delivery</span>
                <span className="text-[10px] text-slate-400 block font-semibold mt-0.5">Sikar City</span>
              </button>
            </div>
          </div>

          {/* Customer Details */}
          <div>
            <label className="block text-xs font-bold text-white uppercase tracking-wider mb-3">
              2. Guest Contact & Location
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
              <div>
                <label className="block text-slate-300 text-xs mb-1.5 font-bold">Your Full Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Rahul Verma"
                  value={name}
                  onChange={e => setName(e.target.value)}
                  className="w-full bg-[#101728] border border-[#d4af37]/30 rounded-xl px-4 py-3 text-white text-base sm:text-sm focus:outline-none focus:border-[#d4af37] transition placeholder:text-slate-500"
                />
              </div>

              <div>
                <label className="block text-slate-300 text-xs mb-1.5 font-bold">Mobile Number (WhatsApp Updates) *</label>
                <input
                  type="tel"
                  required
                  placeholder="e.g. 98765 43210"
                  value={phone}
                  onChange={e => setPhone(e.target.value)}
                  className="w-full bg-[#101728] border border-[#d4af37]/30 rounded-xl px-4 py-3 text-white text-base sm:text-sm focus:outline-none focus:border-[#d4af37] transition placeholder:text-slate-500"
                />
              </div>
            </div>

            {/* Dynamic location based on mode */}
            {diningMode === 'room' && (
              <div className="mt-5 bg-[#101728] border border-[#d4af37]/35 rounded-2xl p-5">
                <label className="block text-[#d4af37] font-bold text-xs mb-2">
                  Hotel Shivansh Room Number *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. 204 or Deluxe 301"
                  value={roomNum}
                  onChange={e => { setRoomNum(e.target.value); setSelectedRoom(e.target.value); }}
                  className="w-full bg-[#080c14] border border-[#d4af37] rounded-xl px-4 py-3 text-white text-base font-bold focus:outline-none focus:ring-2 focus:ring-[#d4af37]/30"
                />
                <span className="text-xs text-slate-400 mt-2 block">
                  Our service captain will deliver your hot order directly to this room door.
                </span>
              </div>
            )}

            {diningMode === 'table' && (
              <div className="mt-5 bg-[#101728] border border-[#d4af37]/35 rounded-2xl p-5">
                <label className="block text-[#d4af37] font-bold text-xs mb-2">
                  Restaurant Table Number (or Pre-Order)
                </label>
                <input
                  type="text"
                  placeholder="e.g. Table 4 or 'Arriving in 15 mins'"
                  value={tableNum}
                  onChange={e => { setTableNum(e.target.value); setSelectedTable(e.target.value); }}
                  className="w-full bg-[#080c14] border border-[#d4af37] rounded-xl px-4 py-3 text-white text-base sm:text-sm focus:outline-none focus:ring-2 focus:ring-[#d4af37]/30"
                />
              </div>
            )}

            {diningMode === 'delivery' && (
              <div className="mt-5 space-y-4">
                {/* Zomato Partner Banner Switch */}
                <div className="bg-[#180e12] border border-red-500/40 rounded-2xl p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 shadow-md">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-[#e23744] flex items-center justify-center text-white shrink-0 shadow">
                      <Bike className="w-5 h-5" />
                    </div>
                    <div>
                      <strong className="text-white text-xs sm:text-sm block">Zomato Delivery Partner Active in Sikar</strong>
                      <span className="text-[11px] text-red-300">Order via Zomato app or continue here for 0% commission</span>
                    </div>
                  </div>
                  <a
                    href="https://www.zomato.com/sikar/restaurants?q=Hotel+Shivansh"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-[#e23744] hover:bg-[#cb202d] text-white text-xs font-bold px-4 py-2 rounded-xl transition shadow-md whitespace-nowrap self-stretch sm:self-auto text-center"
                  >
                    Open on Zomato App
                  </a>
                </div>

                <div>
                  <label className="block text-slate-300 text-xs mb-1.5 font-bold">Complete Delivery Address in Sikar *</label>
                  <textarea
                    required
                    rows={2}
                    placeholder="House/Flat No., Colony / Street, Landmark in Sikar..."
                    value={address}
                    onChange={e => setAddress(e.target.value)}
                    className="w-full bg-[#101728] border border-[#d4af37]/30 rounded-xl px-4 py-3 text-white text-base sm:text-sm focus:outline-none focus:border-[#d4af37] placeholder:text-slate-500"
                  />
                  <div className="flex flex-wrap gap-1.5 mt-2">
                    {['Piprali Road, Sikar', 'Nawalgarh Road, Sikar', 'Near Railway Station, Sikar', 'Bajaj Gram, Sikar', 'Fatehpur Road, Sikar', 'Court Road, Sikar'].map((loc) => (
                      <button
                        key={loc}
                        type="button"
                        onClick={() => setAddress(loc)}
                        className="text-[11px] bg-slate-800 hover:bg-[#e23744]/20 border border-slate-700 hover:border-[#e23744] text-slate-300 hover:text-white px-2.5 py-1 rounded-full transition cursor-pointer"
                      >
                        📍 {loc.replace(', Sikar', '')}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}

            <div className="mt-4">
              <label className="block text-slate-400 text-xs mb-1.5 font-medium">Special Cooking / Delivery Note (Optional)</label>
              <input
                type="text"
                placeholder="e.g. Ring bell, extra disposable cutlery, etc."
                value={notes}
                onChange={e => setNotes(e.target.value)}
                className="w-full bg-[#101728] border border-[#d4af37]/30 rounded-xl px-4 py-2.5 text-white text-base sm:text-xs focus:outline-none focus:border-[#d4af37] placeholder:text-slate-500"
              />
            </div>
          </div>

          {/* Payment Method Selector */}
          <div>
            <label className="block text-xs font-bold text-white uppercase tracking-wider mb-3">
              3. Payment Option
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-5">
              <button
                type="button"
                onClick={() => setPaymentMethod('UPI_QR')}
                className={`p-3.5 rounded-2xl border text-center font-bold transition text-xs flex flex-col items-center justify-center gap-1.5 cursor-pointer ${
                  paymentMethod === 'UPI_QR'
                    ? 'bg-gradient-to-r from-[#d4af37] to-[#dfc17b] text-[#080c14] border-[#d4af37] shadow-[0_0_12px_rgba(212,175,55,0.3)] font-black'
                    : 'bg-[#101728] border-slate-800 text-slate-300 hover:text-white'
                }`}
              >
                <QrCode className="w-5 h-5" />
                <span>Dynamic UPI QR</span>
              </button>

              <button
                type="button"
                onClick={() => setPaymentMethod('CASH')}
                className={`p-3.5 rounded-2xl border text-center font-bold transition text-xs flex flex-col items-center justify-center gap-1.5 cursor-pointer ${
                  paymentMethod === 'CASH'
                    ? 'bg-gradient-to-r from-[#d4af37] to-[#dfc17b] text-[#080c14] border-[#d4af37] shadow-[0_0_12px_rgba(212,175,55,0.3)] font-black'
                    : 'bg-[#101728] border-slate-800 text-slate-300 hover:text-white'
                }`}
              >
                <Banknote className="w-5 h-5" />
                <span>Cash on Delivery</span>
              </button>

              {diningMode === 'room' && (
                <button
                  type="button"
                  onClick={() => setPaymentMethod('ROOM_BILL')}
                  className={`p-3.5 rounded-2xl border text-center font-bold transition text-xs flex flex-col items-center justify-center gap-1.5 cursor-pointer ${
                    paymentMethod === 'ROOM_BILL'
                      ? 'bg-gradient-to-r from-[#d4af37] to-[#dfc17b] text-[#080c14] border-[#d4af37] shadow-[0_0_12px_rgba(212,175,55,0.3)] font-black'
                      : 'bg-[#101728] border-slate-800 text-slate-300 hover:text-white'
                  }`}
                >
                  <BellRing className="w-5 h-5" />
                  <span>Add to Room Bill</span>
                </button>
              )}

              <button
                type="button"
                onClick={() => setPaymentMethod('CARD')}
                className={`p-3.5 rounded-2xl border text-center font-bold transition text-xs flex flex-col items-center justify-center gap-1.5 cursor-pointer ${
                  paymentMethod === 'CARD'
                    ? 'bg-gradient-to-r from-[#d4af37] to-[#dfc17b] text-[#080c14] border-[#d4af37] shadow-[0_0_12px_rgba(212,175,55,0.3)] font-black'
                    : 'bg-[#101728] border-slate-800 text-slate-300 hover:text-white'
                }`}
              >
                <CreditCard className="w-5 h-5" />
                <span>Card at Counter</span>
              </button>
            </div>

            {/* Dynamic UPI QR Display */}
            {paymentMethod === 'UPI_QR' && (
              <div className="bg-[#101728] border border-[#d4af37]/40 rounded-3xl p-6 flex flex-col sm:flex-row items-center gap-6 shadow-md">
                <div className="bg-white p-3 rounded-2xl shadow-lg border border-slate-200 shrink-0">
                  <img
                    src={qrCodeUrl}
                    alt="Scan UPI QR Code"
                    className="w-36 h-36 object-contain"
                  />
                  <div className="text-[10px] text-center font-bold text-slate-900 mt-1.5">
                    GPay / PhonePe / Paytm
                  </div>
                </div>

                <div className="flex-1 text-xs space-y-3">
                  <div className="text-slate-300">
                    <strong className="text-[#d4af37] text-base font-serif block mb-1">Scan & Pay ₹{grandTotal}</strong>
                    Scan this dynamic QR with any UPI app to pay directly to Hotel Shivansh.
                  </div>

                  <div className="bg-[#080c14] border border-[#d4af37]/30 rounded-xl p-3 flex items-center justify-between gap-2 shadow-inner">
                    <div className="font-mono text-[#d4af37] font-bold text-sm">{upiId}</div>
                    <button
                      type="button"
                      onClick={handleCopyUpi}
                      className="bg-[#161f36] hover:bg-[#202c4c] text-white px-3 py-1.5 rounded-lg text-xs font-bold transition flex items-center gap-1.5 cursor-pointer border border-[#d4af37]/30"
                    >
                      {copiedUpi ? (
                        <>
                          <Check className="w-3.5 h-3.5 text-emerald-400" />
                          <span>Copied</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5 text-[#d4af37]" />
                          <span>Copy ID</span>
                        </>
                      )}
                    </button>
                  </div>

                  <span className="text-xs text-emerald-400 font-semibold flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>Instant kitchen notification dispatched upon confirmation</span>
                  </span>
                </div>
              </div>
            )}
          </div>

          {/* Order Summary Strip */}
          <div className="bg-[#101728] border border-[#d4af37]/25 rounded-2xl p-4 sm:p-5 flex items-center justify-between">
            <div>
              <span className="text-xs text-slate-400 block mb-0.5">{items.length} items in plate</span>
              <span className="text-base sm:text-lg font-black text-white">Grand Total: ₹{grandTotal}</span>
            </div>
            <div className="text-right text-xs text-slate-400">
              <span>Incl. 5% GST</span>
              {deliveryFee === 0 && <span className="text-emerald-400 block font-bold">Free Delivery</span>}
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className={`w-full py-4 px-6 rounded-2xl font-extrabold transition flex items-center justify-center gap-2 text-base cursor-pointer hover:scale-[1.01] active:scale-[0.99] ${
              diningMode === 'delivery'
                ? 'bg-gradient-to-r from-[#e23744] via-[#ff4f5e] to-[#aa1a26] text-white shadow-[0_6px_25px_rgba(226,55,68,0.4)]'
                : 'bg-gradient-to-r from-[#d4af37] via-[#dfc17b] to-[#b38e44] text-[#080c14] shadow-[0_6px_25px_rgba(212,175,55,0.35)]'
            }`}
          >
            <span>{diningMode === 'delivery' ? '🛵 Place Order & Dispatch via Zomato' : 'Confirm & Place Order'}</span>
            <span className={`${diningMode === 'delivery' ? 'bg-black/30 text-white' : 'bg-[#080c14]/20 text-[#080c14]'} px-3 py-1 rounded-xl text-sm flex items-center gap-1.5 font-sans font-black`}>
              <span>₹{grandTotal}</span>
              <ArrowRight className="w-4 h-4" />
            </span>
          </button>
        </form>

      </div>
    </div>
  );
}

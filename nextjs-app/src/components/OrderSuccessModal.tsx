'use client';

import React, { useState } from 'react';
import { useModal } from '@/context/ModalContext';
import { useCart } from '@/context/CartContext';
import { Order } from '@/lib/types';
import { CheckCircle2, Clock, MessageSquare, Search, Receipt, Printer, ChevronDown, ChevronUp } from 'lucide-react';

export default function OrderSuccessModal() {
  const { activeModal, modalData, closeModal, openModal } = useModal();
  const { activeOrder } = useCart();
  const [showKotReceipt, setShowKotReceipt] = useState(false);

  if (activeModal !== 'orderSuccess') return null;

  const order = (modalData.order as Order) || activeOrder;
  if (!order) return null;

  const handleWhatsAppShare = () => {
    const itemsList = order.items
      .map(i => `• ${i.quantity}x ${i.name} (₹${i.total})${i.portion ? ` [${i.portion}]` : ''}`)
      .join('\n');

    const destination = order.type === 'room'
      ? `Hotel Room: #${order.customer.roomNumber || 'N/A'}`
      : order.type === 'table'
      ? `Restaurant Table: #${order.customer.tableNumber || 'N/A'}`
      : `Delivery Address: ${order.customer.address || 'N/A'}`;

    const text = encodeURIComponent(
      `*HOTEL SHIVANSH - NEW FOOD ORDER*\n` +
      `═════════════════════════\n` +
      `Order ID: ${order.id}\n` +
      `Customer: ${order.customer.name} (${order.customer.phone})\n` +
      `${destination}\n` +
      `Payment: ${order.payment.method} (${order.payment.status})\n` +
      `═════════════════════════\n` +
      `*ORDERED ITEMS:*\n${itemsList}\n` +
      `═════════════════════════\n` +
      `Grand Total: ₹${order.pricing.grandTotal}\n` +
      (order.customer.notes ? `Chef Note: ${order.customer.notes}\n` : '') +
      `\nPlease prepare our order quickly! Thank you.`
    );

    window.open(`https://wa.me/919460624455?text=${text}`, '_blank');
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div
      className="fixed inset-0 z-[1001] bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6 animate-fadeIn overflow-y-auto"
      onClick={e => { if (e.target === e.currentTarget) closeModal(); }}
    >
      <div className="bg-[#0a0f1d] border border-[#d4af37]/35 w-full max-w-lg rounded-3xl overflow-hidden shadow-[0_25px_70px_rgba(0,0,0,0.95)] p-6 sm:p-8 animate-slideUp text-center flex flex-col items-center text-slate-100 max-h-[92vh] overflow-y-auto">
        
        {/* Animated Celebration Icon */}
        <div className="w-18 h-18 rounded-full bg-emerald-950/80 border-2 border-emerald-400 flex items-center justify-center text-emerald-400 mb-4 shadow-[0_0_25px_rgba(16,185,129,0.35)]">
          <CheckCircle2 className="w-9 h-9 text-emerald-400" />
        </div>

        <span className="text-xs font-bold tracking-widest text-emerald-400 uppercase">
          Order Sent to Kitchen!
        </span>
        <h3 className="text-2xl sm:text-3xl font-serif font-black text-white mt-1 mb-1.5">
          Thank you, {order.customer.name}!
        </h3>
        <p className="text-xs sm:text-sm text-slate-300 max-w-xs mb-6 leading-relaxed">
          Our royal chefs have received your food order and started fresh preparation in 100% pure desi ghee.
        </p>

        {/* Order Details Card */}
        <div className="bg-[#101728] border border-[#d4af37]/25 rounded-2xl p-4 sm:p-5 w-full text-left text-xs sm:text-sm mb-4 space-y-2.5 shadow-md">
          <div className="flex justify-between items-center pb-2 border-b border-slate-800">
            <span className="text-slate-400">Order Reference:</span>
            <span className="font-mono text-[#d4af37] font-extrabold text-sm sm:text-base">{order.id}</span>
          </div>

          <div className="flex justify-between items-center pb-2 border-b border-slate-800">
            <span className="text-slate-400">Estimated Arrival:</span>
            <span className="font-bold text-white flex items-center gap-1.5">
              <Clock className="w-4 h-4 text-[#d4af37]" />
              <span>{order.estimatedTime || '18-22 mins'}</span>
            </span>
          </div>

          <div className="flex justify-between items-center pb-2 border-b border-slate-800">
            <span className="text-slate-400">Destination:</span>
            <span className="font-bold text-[#f3e8b1]">
              {order.type === 'room'
                ? `Hotel Room #${order.customer.roomNumber}`
                : order.type === 'table'
                ? `Restaurant Table #${order.customer.tableNumber}`
                : 'Doorstep Delivery'}
            </span>
          </div>

          <div className="flex justify-between items-center pt-1">
            <span className="text-slate-400">Total Amount:</span>
            <span className="font-black text-[#d4af37] text-lg font-serif">₹{order.pricing.grandTotal}</span>
          </div>
        </div>

        {/* Toggle KOT Receipt Button */}
        <button
          onClick={() => setShowKotReceipt(!showKotReceipt)}
          className="w-full mb-4 bg-[#121c2e] hover:bg-[#18253d] border border-[#d4af37]/30 text-slate-200 py-2.5 px-4 rounded-xl text-xs font-bold transition flex items-center justify-between cursor-pointer"
        >
          <span className="flex items-center gap-2">
            <Receipt className="w-4 h-4 text-[#d4af37]" />
            <span>Official Kitchen Order Ticket (KOT Slip)</span>
          </span>
          {showKotReceipt ? <ChevronUp className="w-4 h-4 text-slate-400" /> : <ChevronDown className="w-4 h-4 text-slate-400" />}
        </button>

        {/* Printable KOT Receipt Sheet */}
        {showKotReceipt && (
          <div className="w-full bg-[#080c14] border-2 border-[#d4af37]/40 rounded-2xl p-5 mb-5 text-left text-xs font-mono space-y-2 text-slate-300 shadow-inner">
            <div className="text-center border-b border-[#d4af37]/30 pb-2">
              <h4 className="font-serif font-black text-sm text-white">HOTEL SHIVANSH</h4>
              <p className="text-[10px] text-[#d4af37]">Royal Dining &amp; Room Service • Sikar, RJ</p>
              <p className="text-[10px] text-slate-400">GSTIN: 08AAACH1234F1Z5 • FSSAI: 12221026000123</p>
            </div>

            <div className="flex justify-between text-[11px] pt-1">
              <span>KOT #{order.orderNumber || '108'}</span>
              <span>{new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
            </div>
            <div className="text-[11px]">
              <span>Table/Room: </span>
              <strong className="text-white">
                {order.type === 'room' ? `Room ${order.customer.roomNumber}` : order.type === 'table' ? `Table ${order.customer.tableNumber}` : 'Takeaway'}
              </strong>
            </div>

            <div className="border-t border-b border-slate-800 py-2 space-y-1">
              {order.items.map((it, idx) => (
                <div key={idx} className="flex justify-between text-[11px]">
                  <span className="text-white truncate max-w-[240px]">{it.quantity}x {it.name} {it.portion ? `(${it.portion})` : ''}</span>
                  <span className="text-[#d4af37] font-bold">₹{it.total}</span>
                </div>
              ))}
            </div>

            <div className="space-y-1 text-[11px] pt-1">
              <div className="flex justify-between text-slate-400">
                <span>Subtotal</span>
                <span>₹{order.pricing.subtotal}</span>
              </div>
              {order.pricing.discount > 0 && (
                <div className="flex justify-between text-emerald-400">
                  <span>Coupon Discount</span>
                  <span>-₹{order.pricing.discount}</span>
                </div>
              )}
              <div className="flex justify-between text-slate-400">
                <span>GST (5%)</span>
                <span>₹{order.pricing.gstAmount}</span>
              </div>
              <div className="flex justify-between font-bold text-white text-xs pt-1 border-t border-slate-800">
                <span>Total Bill Amount</span>
                <span className="text-[#d4af37] text-sm">₹{order.pricing.grandTotal}</span>
              </div>
            </div>

            <button
              onClick={handlePrint}
              className="w-full mt-3 bg-[#121c2e] hover:bg-[#18253d] border border-slate-700 text-slate-300 py-2 rounded-lg text-[11px] font-bold flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <Printer className="w-3.5 h-3.5 text-[#d4af37]" />
              <span>Print KOT Slip</span>
            </button>
          </div>
        )}

        {/* Action Buttons */}
        <div className="w-full flex flex-col sm:flex-row gap-3">
          <button
            onClick={handleWhatsAppShare}
            className="flex-1 bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold py-3.5 px-4 rounded-2xl shadow-lg transition flex items-center justify-center gap-2 text-xs sm:text-sm cursor-pointer"
          >
            <MessageSquare className="w-4 h-4" />
            <span>Send Slip to WhatsApp</span>
          </button>

          <button
            onClick={() => {
              closeModal();
              openModal('trackOrder', { orderId: order.id });
            }}
            className="flex-1 bg-gradient-to-r from-[#d4af37] to-[#dfc17b] text-[#080c14] font-extrabold py-3.5 px-4 rounded-2xl transition text-xs sm:text-sm flex items-center justify-center gap-2 cursor-pointer shadow-md hover:opacity-95"
          >
            <Search className="w-4 h-4 text-[#080c14]" />
            <span>Track Order Live</span>
          </button>
        </div>

        <button
          onClick={closeModal}
          className="text-slate-400 hover:text-slate-200 text-xs mt-4 cursor-pointer py-1 transition font-medium"
        >
          Close and continue browsing
        </button>

      </div>
    </div>
  );
}

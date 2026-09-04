export interface Product {
  id: string;
  name: string;
  category: 'split_ac' | 'window_ac' | 'commercial_ac' | 'washing_machines' | 'appliances';
  subCategory: string;
  tonnage: string;
  tonnageVal: number;
  starRating: number;
  technology: string;
  condenser: string;
  iseer: number | string;
  powerConsumption: string;
  coolingCapacity: string;
  noiseLevel: string;
  refrigerant: string;
  warranty: string;
  price: number;
  mrp: number;
  discount: string;
  emi: string;
  image: string;
  badge: string;
  highlight: string;
  features: string[];
  idealFor: string;
}

export interface CartItem {
  id: string;
  quantity: number;
}

export interface CouponInfo {
  code: string;
  label: string;
  discount: number;
}

export interface OrderCustomer {
  name: string;
  phone: string;
  email: string;
  address: string;
  landmark: string;
  city: string;
  pincode: string;
  deliverySlot: string;
  gstin: string;
}

export interface OrderPricing {
  subtotal: number;
  discount: number;
  couponCode: string | null;
  baseAmount: number;
  gstRate: string;
  gstAmount: number;
  deliveryFee: number;
  installationFee: number;
  grandTotal: number;
}

export interface OrderPayment {
  method: string;
  status: string;
  transactionRef: string;
  utr?: string;
  verifiedAt: string;
}

export interface OrderTimeline {
  step: string;
  time: string;
  status: 'completed' | 'active' | 'pending';
}

export interface OrderItem {
  id: string;
  name: string;
  category: string;
  tonnage: string;
  price: number;
  mrp: number;
  quantity: number;
  total: number;
  image: string;
}

export interface Order {
  id: string;
  orderNumber: number;
  createdAt: string;
  status: string;
  customer: OrderCustomer;
  items: OrderItem[];
  pricing: OrderPricing;
  payment: OrderPayment;
  timeline: OrderTimeline[];
}

export type CategoryFilter = 'all' | 'split_ac' | 'window_ac' | 'commercial_ac' | 'washing_machines' | 'appliances';
export type TonnageFilter = 'all' | '1.0' | '1.5' | '2.0' | 'commercial';
export type StarFilter = 'all' | '3' | '5';
export type PaymentMethod = 'UPI_QR' | 'CARD' | 'NETBANKING' | 'EMI' | 'COD';

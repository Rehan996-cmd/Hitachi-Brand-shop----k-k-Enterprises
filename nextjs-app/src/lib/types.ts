export interface Dish {
  id: string;
  name: string;
  category: 'thali' | 'mains' | 'starters' | 'breads' | 'biryani' | 'chinese' | 'breakfast' | 'desserts' | 'beverages';
  categoryName: string;
  price: number;
  originalPrice?: number;
  rating: number;
  reviewCount?: number;
  image: string;
  description: string;
  prepTime: string;
  isVeg: boolean;
  isChefSpecial: boolean;
  isBestSeller: boolean;
  spiceLevel: 'mild' | 'medium' | 'spicy';
  portion?: string;
  calories?: string;
  tags?: string[];
}

export interface CartItem {
  id: string;
  quantity: number;
  portion?: string;
  spice?: 'mild' | 'medium' | 'spicy';
  addOns?: string[];
  instructions?: string;
  unitPrice?: number;
}

export type DiningMode = 'room' | 'table' | 'delivery';
export type PaymentMethod = 'UPI_QR' | 'CASH' | 'CARD' | 'ROOM_BILL';

export interface CouponInfo {
  code: string;
  label: string;
  discount: number;
}

export interface OrderCustomer {
  name: string;
  phone: string;
  orderType: DiningMode;
  roomNumber?: string | null;
  tableNumber?: string | null;
  address?: string | null;
  notes?: string;
}

export interface OrderPricing {
  subtotal: number;
  discount: number;
  couponCode: string | null;
  baseAmount: number;
  gstRate: string;
  gstAmount: number;
  deliveryFee: number;
  grandTotal: number;
}

export interface OrderPayment {
  method: PaymentMethod;
  status: string;
  transactionRef?: string;
  verifiedAt?: string;
}

export interface OrderItem {
  id: string;
  name: string;
  category?: string;
  categoryName?: string;
  portion?: string;
  unitPrice: number;
  quantity: number;
  total: number;
  image?: string;
  instructions?: string;
  spice?: string;
}

export type ZomatoDeliveryStage = 'assigned' | 'heading_to_hotel' | 'at_hotel' | 'picked_up' | 'out_for_delivery' | 'delivered';

export interface DeliveryPartnerInfo {
  provider: string;
  brand?: string;
  fleetType?: string;
  riderId?: string;
  riderName: string;
  riderPhone?: string;
  vehicleNumber?: string;
  vehicleType?: string;
  rating?: number;
  tripsCount?: number;
  avatar?: string;
  stage: ZomatoDeliveryStage;
  statusText: string;
  deliveryOtp?: string | null;
  pickupLocation?: {
    name: string;
    address: string;
    contact: string;
  };
  dropLocation?: {
    name: string;
    address: string;
    phone: string;
  };
  etaMinutes?: number;
  progressPercent?: number;
  pickupConfirmedAt?: string | null;
  deliveredAt?: string | null;
}

export interface OrderTimeline {
  step: string;
  time: string;
  status: 'completed' | 'active' | 'pending';
}

export interface OrderSettlement {
  foodRevenue: number;
  hotelNetEarning: number;
  hotelCommissionSaved: number;
  zomatoLogisticsFee: number;
  riderTripPayout: number;
  riderBonus: number;
  totalRiderEarning: number;
  model: string;
}

export interface Order {
  id: string;
  orderNumber: number;
  createdAt: string;
  type: DiningMode;
  status: string;
  customer: OrderCustomer;
  items: OrderItem[];
  pricing: OrderPricing;
  payment: OrderPayment;
  estimatedTime?: string;
  deliveryOtp?: string | null;
  deliveryPartner?: DeliveryPartnerInfo | null;
  settlement?: OrderSettlement | null;
  timeline: OrderTimeline[];
}

export interface TableReservation {
  id: string;
  createdAt: string;
  name: string;
  phone: string;
  guests: string;
  section: string;
  date: string;
  time: string;
  notes?: string;
  status: string;
}

export interface RoomInquiry {
  id: string;
  createdAt: string;
  name: string;
  phone: string;
  roomType: string;
  checkIn: string;
  checkOut: string;
  status: string;
}

export type CategoryFilter = 'all' | 'thali' | 'mains' | 'starters' | 'breads' | 'biryani' | 'chinese' | 'breakfast' | 'desserts' | 'beverages';
export type DietaryFilter = 'all' | 'bestseller' | 'chef' | 'spicy' | 'mild';

import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const orderId = `SHIV-${Math.floor(1000 + Math.random() * 9000)}`;
    const isDelivery = body.type === 'delivery' || (body.customer && body.customer.orderType === 'delivery');
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
      stage: 'assigned',
      statusText: 'Zomato Rider Assigned & Heading to Hotel Shivansh for Pickup',
      deliveryOtp,
      pickupLocation: {
        name: 'Hotel Shivansh Kitchen & Restaurant',
        address: 'Near Railway Station, Salasar Road, Sikar (Raj.)',
        contact: '+91 94606 24455'
      },
      dropLocation: {
        name: body.customer?.name || 'Customer',
        address: body.customer?.address || 'Sikar City',
        phone: body.customer?.phone || ''
      },
      etaMinutes: 28,
      progressPercent: 20
    } : null;

    const timeline = isDelivery ? [
      { step: 'Order Placed & Confirmed', time: 'Just now', status: 'completed' as const },
      { step: 'Hotel Shivansh Kitchen Preparing Food', time: 'In Progress', status: 'active' as const },
      { step: 'Zomato Delivery Partner Assigned (Vikram Saini - RJ-23-SZ-4891)', time: 'En Route to Hotel', status: 'active' as const },
      { step: 'Food Picked Up from Hotel Shivansh Kitchen', time: 'Pending Handover', status: 'pending' as const },
      { step: 'Out for Doorstep Delivery across Sikar', time: 'Pending', status: 'pending' as const },
      { step: 'Order Delivered to Customer (OTP Verified)', time: 'Pending', status: 'pending' as const }
    ] : (body.timeline || [
      { step: 'Order Placed & Confirmed', time: 'Just now', status: 'completed' as const },
      { step: 'Ingredients Prepped & Cooking in Kitchen', time: 'Underway', status: 'active' as const },
      { step: 'Quality Check & Packing', time: 'Pending', status: 'pending' as const },
      { step: 'Delivered', time: 'Pending', status: 'pending' as const }
    ]);

    const responseOrder = {
      ...body,
      id: orderId,
      status: isDelivery ? 'Confirmed - Zomato Rider Dispatched' : 'In Kitchen',
      createdAt: new Date().toISOString(),
      estimatedTime: isDelivery ? '25-30 mins via Zomato Express' : (body.estimatedTime || '20-25 mins'),
      deliveryPartner,
      settlement: isDelivery ? {
        foodRevenue: body.pricing?.subtotal || 600,
        hotelNetEarning: Math.round((body.pricing?.subtotal || 600) * 0.92),
        hotelCommissionSaved: Math.round((body.pricing?.subtotal || 600) * 0.22),
        zomatoLogisticsFee: 40,
        riderTripPayout: 35,
        riderBonus: 10,
        totalRiderEarning: 45,
        model: 'Win-Win Direct D2C Website + Zomato 3PL Express Logistics'
      } : null,
      timeline
    };

    return NextResponse.json(responseOrder, { status: 201 });
  } catch {
    return NextResponse.json(
      { error: 'Invalid order request payload' },
      { status: 400 }
    );
  }
}

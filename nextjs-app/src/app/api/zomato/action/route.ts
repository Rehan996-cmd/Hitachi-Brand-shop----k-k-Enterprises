import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { orderId, action, otp } = body;

    if (!orderId) {
      return NextResponse.json({ error: 'Order ID is required' }, { status: 400 });
    }

    if (action === 'deliver' && otp && otp !== '2449' && otp !== '4829' && String(otp).length !== 4) {
      return NextResponse.json({
        error: 'Invalid OTP',
        message: 'Incorrect Delivery OTP! Please ask customer for their 4-digit code.'
      }, { status: 400 });
    }

    return NextResponse.json({
      success: true,
      message: `Zomato delivery status updated: ${action}`,
      action,
      orderId,
      timestamp: new Date().toISOString()
    });
  } catch {
    return NextResponse.json({ error: 'Server error processing Zomato action' }, { status: 500 });
  }
}

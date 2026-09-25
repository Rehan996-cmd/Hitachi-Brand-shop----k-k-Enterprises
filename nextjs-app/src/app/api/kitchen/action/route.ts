import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { orderId, action } = body;

    if (!orderId) {
      return NextResponse.json({ error: 'Order ID is required' }, { status: 400 });
    }

    return NextResponse.json({
      success: true,
      message: `Kitchen action '${action}' recorded for Order #${orderId}`,
      action,
      orderId,
      timestamp: new Date().toISOString()
    });
  } catch {
    return NextResponse.json({ error: 'Server error processing Kitchen action' }, { status: 500 });
  }
}

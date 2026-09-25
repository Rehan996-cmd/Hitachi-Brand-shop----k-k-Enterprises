import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const reservationId = `RES-${Math.floor(1000 + Math.random() * 9000)}`;

    return NextResponse.json({
      ...body,
      id: reservationId,
      status: 'Confirmed',
      createdAt: new Date().toISOString(),
    }, { status: 201 });
  } catch {
    return NextResponse.json(
      { error: 'Invalid table reservation request' },
      { status: 400 }
    );
  }
}

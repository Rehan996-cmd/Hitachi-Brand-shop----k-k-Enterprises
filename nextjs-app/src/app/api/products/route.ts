import { NextResponse } from 'next/server';
import { DISHES_DATA } from '@/lib/products';

export async function GET() {
  return NextResponse.json(DISHES_DATA, {
    status: 200,
    headers: {
      'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=86400',
    },
  });
}

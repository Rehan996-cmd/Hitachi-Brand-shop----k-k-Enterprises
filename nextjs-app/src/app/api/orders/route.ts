import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function GET() {
  try {
    const ordersFilePath = path.join(process.cwd(), '..', 'data', 'orders.json');
    if (fs.existsSync(ordersFilePath)) {
      const data = JSON.parse(fs.readFileSync(ordersFilePath, 'utf8'));
      return NextResponse.json({ success: true, count: data.length, orders: data });
    }
  } catch {}
  return NextResponse.json({ success: true, count: 0, orders: [] });
}

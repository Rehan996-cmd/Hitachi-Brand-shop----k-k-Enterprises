import { NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json({ error: 'Not Found: Admin system has been removed.' }, { status: 404 });
}

export async function POST() {
  return NextResponse.json({ error: 'Not Found: Admin system has been removed.' }, { status: 404 });
}

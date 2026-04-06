import { NextRequest, NextResponse } from 'next/server';
import sql from '@/lib/db';
import { isAuthenticated } from '@/lib/auth';

export async function POST(request: NextRequest) {
  try {
    const { name, email, message } = await request.json();
    if (!name || !email || !message) {
      return NextResponse.json({ error: 'All fields required' }, { status: 400 });
    }
    await sql`INSERT INTO contact_messages (name, email, message) VALUES (${name}, ${email}, ${message})`;
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('POST /api/contact error:', error);
    return NextResponse.json({ error: 'Failed to send message' }, { status: 500 });
  }
}

export async function GET(request: NextRequest) {
  const user = isAuthenticated(request);
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  try {
    const messages = await sql`SELECT * FROM contact_messages ORDER BY created_at DESC`;
    return NextResponse.json({ messages });
  } catch (error) {
    console.error('GET /api/contact error:', error);
    return NextResponse.json({ error: 'Failed to fetch messages' }, { status: 500 });
  }
}

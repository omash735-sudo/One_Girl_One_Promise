import { NextRequest, NextResponse } from 'next/server';
import sql from '@/lib/db';
import { isAuthenticated } from '@/lib/auth';

export async function PUT(request: NextRequest) {
  const user = isAuthenticated(request);
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  const { id, read } = await request.json();
  await sql`UPDATE contact_messages SET read=${read} WHERE id=${id}`;
  return NextResponse.json({ success: true });
}

export async function DELETE(request: NextRequest) {
  const user = isAuthenticated(request);
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  const { id } = await request.json();
  await sql`DELETE FROM contact_messages WHERE id=${id}`;
  return NextResponse.json({ success: true });
}

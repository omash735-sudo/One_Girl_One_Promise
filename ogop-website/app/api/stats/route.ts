import { NextRequest, NextResponse } from 'next/server';
import sql from '@/lib/db';
import { isAuthenticated } from '@/lib/auth';

export async function GET() {
  const stats = await sql`SELECT * FROM impact_stats ORDER BY sort_order`;
  return NextResponse.json({ stats });
}

export async function PUT(request: NextRequest) {
  const user = isAuthenticated(request);
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  const { id, label, value, icon, sort_order } = await request.json();
  await sql`
    UPDATE impact_stats SET label=${label}, value=${value}, icon=${icon}, 
    sort_order=${sort_order}, updated_at=NOW() WHERE id=${id}`;
  return NextResponse.json({ success: true });
}

export async function POST(request: NextRequest) {
  const user = isAuthenticated(request);
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  const { label, value, icon, sort_order } = await request.json();
  const result = await sql`
    INSERT INTO impact_stats (label, value, icon, sort_order) 
    VALUES (${label}, ${value}, ${icon || 'Star'}, ${sort_order || 0}) RETURNING *`;
  return NextResponse.json({ stat: result[0] });
}

export async function DELETE(request: NextRequest) {
  const user = isAuthenticated(request);
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  const { id } = await request.json();
  await sql`DELETE FROM impact_stats WHERE id=${id}`;
  return NextResponse.json({ success: true });
}

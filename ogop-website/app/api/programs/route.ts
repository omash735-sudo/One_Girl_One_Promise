import { NextRequest, NextResponse } from 'next/server';
import sql from '@/lib/db';
import { isAuthenticated } from '@/lib/auth';

export async function GET() {
  const programs = await sql`SELECT * FROM programs ORDER BY sort_order`;
  return NextResponse.json({ programs });
}

export async function POST(request: NextRequest) {
  const user = isAuthenticated(request);
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  const { title, description, icon, sort_order } = await request.json();
  const result = await sql`
    INSERT INTO programs (title, description, icon, sort_order) 
    VALUES (${title}, ${description}, ${icon || 'Star'}, ${sort_order || 0})
    RETURNING *`;
  return NextResponse.json({ program: result[0] });
}

export async function PUT(request: NextRequest) {
  const user = isAuthenticated(request);
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  const { id, title, description, icon, active, sort_order } = await request.json();
  await sql`
    UPDATE programs SET title=${title}, description=${description}, icon=${icon}, 
    active=${active}, sort_order=${sort_order}, updated_at=NOW() WHERE id=${id}`;
  return NextResponse.json({ success: true });
}

export async function DELETE(request: NextRequest) {
  const user = isAuthenticated(request);
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  const { id } = await request.json();
  await sql`DELETE FROM programs WHERE id=${id}`;
  return NextResponse.json({ success: true });
}

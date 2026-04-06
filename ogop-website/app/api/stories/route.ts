import { NextRequest, NextResponse } from 'next/server';
import sql from '@/lib/db';
import { isAuthenticated } from '@/lib/auth';

export async function GET() {
  const stories = await sql`SELECT * FROM success_stories ORDER BY id DESC`;
  return NextResponse.json({ stories });
}

export async function POST(request: NextRequest) {
  const user = isAuthenticated(request);
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  const { name, story, year } = await request.json();
  const result = await sql`
    INSERT INTO success_stories (name, story, year) VALUES (${name}, ${story}, ${year}) RETURNING *`;
  return NextResponse.json({ story: result[0] });
}

export async function PUT(request: NextRequest) {
  const user = isAuthenticated(request);
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  const { id, name, story, year, active } = await request.json();
  await sql`UPDATE success_stories SET name=${name}, story=${story}, year=${year}, active=${active}, updated_at=NOW() WHERE id=${id}`;
  return NextResponse.json({ success: true });
}

export async function DELETE(request: NextRequest) {
  const user = isAuthenticated(request);
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  const { id } = await request.json();
  await sql`DELETE FROM success_stories WHERE id=${id}`;
  return NextResponse.json({ success: true });
}

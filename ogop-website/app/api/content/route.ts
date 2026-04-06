import { NextRequest, NextResponse } from 'next/server';
import sql from '@/lib/db';
import { isAuthenticated } from '@/lib/auth';

export async function GET() {
  try {
    const content = await sql`SELECT section, content FROM site_content`;
    const stats = await sql`SELECT * FROM impact_stats ORDER BY sort_order`;
    const programs = await sql`SELECT * FROM programs WHERE active = true ORDER BY sort_order`;
    const stories = await sql`SELECT * FROM success_stories WHERE active = true ORDER BY id DESC`;

    const contentMap: Record<string, unknown> = {};
    content.forEach((row: { section: string; content: unknown }) => { 
      contentMap[row.section] = row.content; 
    });

    return NextResponse.json({ content: contentMap, stats, programs, stories });
  } catch (error) {
    console.error('GET /api/content error:', error);
    return NextResponse.json({ error: 'Failed to fetch content' }, { status: 500 });
  }
}

export async function PUT(request: NextRequest) {
  const user = isAuthenticated(request);
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  try {
    const body = await request.json();
    const { section, content } = body;
    await sql`
      INSERT INTO site_content (section, content, updated_at)
      VALUES (${section}, ${JSON.stringify(content)}, NOW())
      ON CONFLICT (section) DO UPDATE SET content = ${JSON.stringify(content)}, updated_at = NOW()
    `;
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('PUT /api/content error:', error);
    return NextResponse.json({ error: 'Failed to update content' }, { status: 500 });
  }
}

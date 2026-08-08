import { NextResponse } from 'next/server'
import { sql } from '@/lib/db'

export async function GET() {
  try {
    const stats = await sql`
      SELECT * FROM stats 
      WHERE is_active = true 
      ORDER BY display_order
    `
    return NextResponse.json({ success: true, data: stats })
  } catch (error) {
    console.error('Stats GET error:', error)
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}

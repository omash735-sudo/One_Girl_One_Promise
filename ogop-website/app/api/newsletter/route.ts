import { NextRequest, NextResponse } from 'next/server'
import { sql } from '@/lib/db'

export async function POST(req: NextRequest) {
  try {
    const { email } = await req.json()
    
    await sql`
      INSERT INTO newsletter_subscribers (email)
      VALUES (${email})
      ON CONFLICT (email) DO NOTHING
    `
    
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Newsletter POST error:', error)
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}

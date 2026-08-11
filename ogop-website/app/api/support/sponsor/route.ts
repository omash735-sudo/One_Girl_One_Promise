import { NextRequest, NextResponse } from 'next/server'
import { sql } from '@/lib/db'

export async function POST(req: NextRequest) {
  try {
    const { name, email, phone, tier, message } = await req.json()
    
    const result = await sql`
      INSERT INTO sponsorship_inquiries (name, email, phone, sponsorship_tier, message)
      VALUES (${name}, ${email}, ${phone}, ${tier}, ${message})
      RETURNING *
    `
    
    return NextResponse.json({ success: true, inquiry: result[0] })
  } catch (error) {
    console.error('Sponsorship error:', error)
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}

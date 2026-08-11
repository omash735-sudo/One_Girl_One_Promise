import { NextRequest, NextResponse } from 'next/server'
import { sql } from '@/lib/db'

export async function POST(req: NextRequest) {
  try {
    const { donorName, donorEmail, amount, frequency, paymentMethod, isAnonymous } = await req.json()
    
    const result = await sql`
      INSERT INTO donations (donor_name, donor_email, amount, frequency, payment_method, is_anonymous)
      VALUES (${donorName}, ${donorEmail}, ${amount}, ${frequency}, ${paymentMethod}, ${isAnonymous})
      RETURNING *
    `
    
    return NextResponse.json({ success: true, donation: result[0] })
  } catch (error) {
    console.error('Donation error:', error)
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}

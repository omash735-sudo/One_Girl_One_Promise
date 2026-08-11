import { NextRequest, NextResponse } from 'next/server'
import { sql } from '@/lib/db'

export async function POST(req: NextRequest) {
  try {
    const { name, email, phone, location, itemType, quantity, condition, deliveryMethod, notes } = await req.json()
    
    const result = await sql`
      INSERT INTO supply_donations (donor_name, donor_email, donor_phone, donor_location, item_type, quantity, item_condition, delivery_method, notes)
      VALUES (${name}, ${email}, ${phone}, ${location}, ${itemType}, ${quantity}, ${condition}, ${deliveryMethod}, ${notes})
      RETURNING *
    `
    
    return NextResponse.json({ success: true, donation: result[0] })
  } catch (error) {
    console.error('Supply donation error:', error)
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}

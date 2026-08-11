import { NextRequest, NextResponse } from 'next/server'
import { sql } from '@/lib/db'

export async function POST(req: NextRequest) {
  try {
    const { organizationName, contactPerson, email, phone, partnerType, proposedPartnership, message } = await req.json()
    
    const result = await sql`
      INSERT INTO partnership_inquiries (organization_name, contact_person, email, phone, partner_type, proposed_partnership, message)
      VALUES (${organizationName}, ${contactPerson}, ${email}, ${phone}, ${partnerType}, ${proposedPartnership}, ${message})
      RETURNING *
    `
    
    return NextResponse.json({ success: true, inquiry: result[0] })
  } catch (error) {
    console.error('Partnership error:', error)
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}

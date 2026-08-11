import { NextRequest, NextResponse } from 'next/server'
import { sql } from '@/lib/db'

export async function POST(req: NextRequest) {
  try {
    const { fullName, email, phone, category, message } = await req.json()
    
    const result = await sql`
      INSERT INTO membership_applications (full_name, email, phone, category, message)
      VALUES (${fullName}, ${email}, ${phone}, ${category}, ${message})
      RETURNING *
    `
    
    return NextResponse.json({ success: true, application: result[0] })
  } catch (error) {
    console.error('Membership error:', error)
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}

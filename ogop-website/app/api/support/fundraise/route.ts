import { NextRequest, NextResponse } from 'next/server'
import { sql } from '@/lib/db'

export async function POST(req: NextRequest) {
  try {
    const { name, email, phone, fundraiserType, goal, date, location, description, notes } = await req.json()
    
    const result = await sql`
      INSERT INTO fundraiser_requests (name, email, phone, fundraiser_type, goal, event_date, location, description, notes)
      VALUES (${name}, ${email}, ${phone}, ${fundraiserType}, ${goal}, ${date}, ${location}, ${description}, ${notes})
      RETURNING *
    `
    
    return NextResponse.json({ success: true, request: result[0] })
  } catch (error) {
    console.error('Fundraiser error:', error)
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}

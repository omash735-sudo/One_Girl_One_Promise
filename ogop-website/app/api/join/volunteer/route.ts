import { NextRequest, NextResponse } from 'next/server'
import { sql } from '@/lib/db'

export async function POST(req: NextRequest) {
  try {
    const { fullName, email, phone, location, skills, availability, message } = await req.json()
    
    const result = await sql`
      INSERT INTO volunteer_applications (full_name, email, phone, location, skills, availability, message)
      VALUES (${fullName}, ${email}, ${phone}, ${location}, ${skills}, ${availability}, ${message})
      RETURNING *
    `
    
    return NextResponse.json({ success: true, application: result[0] })
  } catch (error) {
    console.error('Volunteer error:', error)
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}

import { NextRequest, NextResponse } from 'next/server'
import { sql } from '@/lib/db'

export async function POST(req: NextRequest) {
  try {
    const { fullName, email, phone, position, experience, message } = await req.json()
    
    const result = await sql`
      INSERT INTO work_applications (full_name, email, phone, position, experience, message)
      VALUES (${fullName}, ${email}, ${phone}, ${position}, ${experience}, ${message})
      RETURNING *
    `
    
    return NextResponse.json({ success: true, application: result[0] })
  } catch (error) {
    console.error('Work application error:', error)
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}

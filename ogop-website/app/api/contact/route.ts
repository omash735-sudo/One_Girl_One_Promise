import { NextRequest, NextResponse } from 'next/server'
import { sql } from '@/lib/db'
import { verifyToken } from '@/lib/auth'

// Submit contact form (public)
export async function POST(req: NextRequest) {
  try {
    const { name, email, subject, message } = await req.json()
    
    await sql`
      INSERT INTO contact_messages (name, email, subject, message)
      VALUES (${name}, ${email}, ${subject}, ${message})
    `
    
    // Optional: Send email notification
    // await sendEmailNotification({ name, email, subject, message })
    
    return NextResponse.json({ success: true })
  } catch (error) {
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}

// Get messages (admin only)
export async function GET(req: NextRequest) {
  try {
    const token = req.headers.get('authorization')?.replace('Bearer ', '')
    const decoded = verifyToken(token)
    
    if (!decoded) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }
    
    const messages = await sql`
      SELECT * FROM contact_messages 
      ORDER BY created_at DESC
    `
    
    return NextResponse.json(messages)
  } catch (error) {
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}

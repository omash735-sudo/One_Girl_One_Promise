import { NextRequest, NextResponse } from 'next/server'
import { sql } from '@/lib/db'
import { verifyToken } from '@/lib/auth'

export async function POST(req: NextRequest) {
  try {
    const { name, email, subject, message } = await req.json()
    
    await sql`
      INSERT INTO contact_messages (name, email, subject, message)
      VALUES (${name}, ${email}, ${subject}, ${message})
    `
    
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Contact POST error:', error)
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}

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
    console.error('Contact GET error:', error)
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}

export async function PUT(req: NextRequest) {
  try {
    const token = req.headers.get('authorization')?.replace('Bearer ', '')
    const decoded = verifyToken(token)
    
    if (!decoded) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }
    
    const { id, read } = await req.json()
    await sql`
      UPDATE contact_messages 
      SET is_read = ${read} 
      WHERE id = ${id}
    `
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Contact PUT error:', error)
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const token = req.headers.get('authorization')?.replace('Bearer ', '')
    const decoded = verifyToken(token)
    
    if (!decoded) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }
    
    const { id } = await req.json()
    await sql`DELETE FROM contact_messages WHERE id = ${id}`
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Contact DELETE error:', error)
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}

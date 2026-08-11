import { NextRequest, NextResponse } from 'next/server'
import { sql } from '@/lib/db'
import { verifyToken } from '@/lib/auth'

export async function GET(req: NextRequest) {
  try {
    const token = req.headers.get('authorization')?.replace('Bearer ', '')
    
    if (!token) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }
    
    const decoded = verifyToken(token)
    
    if (!decoded) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }
    
    const { searchParams } = new URL(req.url)
    const type = searchParams.get('type') || 'all'
    
    let data = {}
    
    if (type === 'membership' || type === 'all') {
      const memberships = await sql`
        SELECT * FROM membership_applications ORDER BY created_at DESC
      `
      data = { ...data, memberships }
    }
    
    if (type === 'volunteer' || type === 'all') {
      const volunteers = await sql`
        SELECT * FROM volunteer_applications ORDER BY created_at DESC
      `
      data = { ...data, volunteers }
    }
    
    if (type === 'partner' || type === 'all') {
      const partners = await sql`
        SELECT * FROM partnership_inquiries ORDER BY created_at DESC
      `
      data = { ...data, partners }
    }
    
    if (type === 'work' || type === 'all') {
      const work = await sql`
        SELECT * FROM work_applications ORDER BY created_at DESC
      `
      data = { ...data, work }
    }
    
    return NextResponse.json({ success: true, ...data })
  } catch (error) {
    console.error('Admin join error:', error)
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}

export async function PUT(req: NextRequest) {
  try {
    const token = req.headers.get('authorization')?.replace('Bearer ', '')
    
    if (!token) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }
    
    const decoded = verifyToken(token)
    
    if (!decoded) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }
    
    const { id, type, status } = await req.json()
    
    let tableName = ''
    
    switch(type) {
      case 'membership': tableName = 'membership_applications'; break
      case 'volunteer': tableName = 'volunteer_applications'; break
      case 'partner': tableName = 'partnership_inquiries'; break
      case 'work': tableName = 'work_applications'; break
      default: return NextResponse.json({ error: 'Invalid type' }, { status: 400 })
    }
    
    await sql`
      UPDATE ${sql(tableName)} 
      SET status = ${status}
      WHERE id = ${id}
    `
    
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Update status error:', error)
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}

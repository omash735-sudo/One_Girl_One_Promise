import { NextRequest, NextResponse } from 'next/server'
import { sql } from '@/lib/db'
import { verifyToken } from '@/lib/auth'

export async function GET() {
  try {
    const types = await sql`
      SELECT * FROM partner_types 
      WHERE is_active = true 
      ORDER BY display_order
    `
    return NextResponse.json(types)
  } catch (error) {
    console.error('GET partner types error:', error)
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}

export async function POST(req: NextRequest) {
  try {
    const token = req.headers.get('authorization')?.replace('Bearer ', '')
    
    if (!token) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }
    
    const decoded = verifyToken(token)
    
    if (!decoded) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }
    
    const { title, description, icon, displayOrder } = await req.json()
    
    const result = await sql`
      INSERT INTO partner_types (title, description, icon, display_order)
      VALUES (${title}, ${description}, ${icon}, ${displayOrder || 0})
      RETURNING *
    `
    
    return NextResponse.json({ success: true, type: result[0] })
  } catch (error) {
    console.error('POST partner type error:', error)
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
    
    const { id, title, description, icon, displayOrder, isActive } = await req.json()
    
    await sql`
      UPDATE partner_types 
      SET 
        title = COALESCE(${title}, title),
        description = COALESCE(${description}, description),
        icon = COALESCE(${icon}, icon),
        display_order = COALESCE(${displayOrder}, display_order),
        is_active = COALESCE(${isActive}, is_active)
      WHERE id = ${id}
    `
    
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('PUT partner type error:', error)
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}

export async function DELETE(req: NextRequest) {
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
    const id = searchParams.get('id')
    
    await sql`DELETE FROM partner_types WHERE id = ${id}`
    
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('DELETE partner type error:', error)
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}

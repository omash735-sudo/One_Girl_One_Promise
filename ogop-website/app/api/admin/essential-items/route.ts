import { NextRequest, NextResponse } from 'next/server'
import { sql } from '@/lib/db'
import { verifyToken } from '@/lib/auth'

export async function GET() {
  try {
    const items = await sql`
      SELECT * FROM essential_items 
      WHERE is_active = true 
      ORDER BY display_order
    `
    return NextResponse.json(items)
  } catch (error) {
    console.error('GET essential items error:', error)
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
    
    const { title, icon, displayOrder } = await req.json()
    
    const result = await sql`
      INSERT INTO essential_items (title, icon, display_order)
      VALUES (${title}, ${icon}, ${displayOrder || 0})
      RETURNING *
    `
    
    return NextResponse.json({ success: true, item: result[0] })
  } catch (error) {
    console.error('POST essential item error:', error)
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
    
    const { id, title, icon, displayOrder, isActive } = await req.json()
    
    await sql`
      UPDATE essential_items 
      SET 
        title = COALESCE(${title}, title),
        icon = COALESCE(${icon}, icon),
        display_order = COALESCE(${displayOrder}, display_order),
        is_active = COALESCE(${isActive}, is_active)
      WHERE id = ${id}
    `
    
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('PUT essential item error:', error)
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
    
    await sql`DELETE FROM essential_items WHERE id = ${id}`
    
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('DELETE essential item error:', error)
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}

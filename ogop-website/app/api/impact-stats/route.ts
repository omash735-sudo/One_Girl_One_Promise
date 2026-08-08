import { NextRequest, NextResponse } from 'next/server'
import { sql } from '@/lib/db'
import { verifyToken } from '@/lib/auth'

export async function GET() {
  try {
    const stats = await sql`
      SELECT * FROM stats 
      WHERE is_active = true 
      ORDER BY display_order
    `
    return NextResponse.json(stats)
  } catch (error) {
    console.error('Impact stats GET error:', error)
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const token = request.headers.get('authorization')?.replace('Bearer ', '')
    
    if (!token) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }
    
    const decoded = verifyToken(token)
    
    if (!decoded) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }
    
    const { number, label, suffix, displayOrder } = await request.json()
    
    const result = await sql`
      INSERT INTO stats (number, label, suffix, display_order) 
      VALUES (${number}, ${label}, ${suffix}, ${displayOrder || 0}) 
      RETURNING *
    `
    return NextResponse.json({ success: true, stat: result[0] })
  } catch (error) {
    console.error('Impact stats POST error:', error)
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}

export async function PUT(request: NextRequest) {
  try {
    const token = request.headers.get('authorization')?.replace('Bearer ', '')
    
    if (!token) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }
    
    const decoded = verifyToken(token)
    
    if (!decoded) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }
    
    const { id, number, label, suffix, displayOrder, isActive } = await request.json()
    
    await sql`
      UPDATE stats 
      SET 
        number = COALESCE(${number}, number),
        label = COALESCE(${label}, label),
        suffix = COALESCE(${suffix}, suffix),
        display_order = COALESCE(${displayOrder}, display_order),
        is_active = COALESCE(${isActive}, is_active)
      WHERE id = ${id}
    `
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Impact stats PUT error:', error)
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const token = request.headers.get('authorization')?.replace('Bearer ', '')
    
    if (!token) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }
    
    const decoded = verifyToken(token)
    
    if (!decoded) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }
    
    const { searchParams } = new URL(request.url)
    const id = searchParams.get('id')
    
    await sql`DELETE FROM stats WHERE id = ${id}`
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Impact stats DELETE error:', error)
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}

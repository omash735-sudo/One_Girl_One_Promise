import { NextRequest, NextResponse } from 'next/server'
import { sql } from '@/lib/db'
import { verifyToken } from '@/lib/auth'

export async function GET() {
  try {
    const tiers = await sql`
      SELECT * FROM membership_tiers 
      WHERE is_active = true 
      ORDER BY display_order
    `
    return NextResponse.json(tiers)
  } catch (error) {
    console.error('GET membership tiers error:', error)
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
    
    const { title, fee, whoFor, benefits, displayOrder } = await req.json()
    
    const result = await sql`
      INSERT INTO membership_tiers (title, fee, who_for, benefits, display_order)
      VALUES (${title}, ${fee}, ${whoFor}, ${benefits}, ${displayOrder || 0})
      RETURNING *
    `
    
    return NextResponse.json({ success: true, tier: result[0] })
  } catch (error) {
    console.error('POST membership tier error:', error)
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
    
    const { id, title, fee, whoFor, benefits, displayOrder, isActive } = await req.json()
    
    await sql`
      UPDATE membership_tiers 
      SET 
        title = COALESCE(${title}, title),
        fee = COALESCE(${fee}, fee),
        who_for = COALESCE(${whoFor}, who_for),
        benefits = COALESCE(${benefits}, benefits),
        display_order = COALESCE(${displayOrder}, display_order),
        is_active = COALESCE(${isActive}, is_active)
      WHERE id = ${id}
    `
    
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('PUT membership tier error:', error)
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
    
    await sql`DELETE FROM membership_tiers WHERE id = ${id}`
    
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('DELETE membership tier error:', error)
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}

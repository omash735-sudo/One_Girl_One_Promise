import { NextRequest, NextResponse } from 'next/server'
import { sql } from '@/lib/db'
import { verifyToken } from '@/lib/auth'

export async function GET() {
  try {
    const programs = await sql`
      SELECT * FROM programs 
      WHERE is_active = true 
      ORDER BY display_order
    `
    return NextResponse.json(programs)
  } catch (error) {
    console.error('Programs GET error:', error)
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}

export async function POST(req: NextRequest) {
  try {
    const token = req.headers.get('authorization')?.replace('Bearer ', '')
    const decoded = verifyToken(token)
    
    if (!decoded) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }
    
    const { icon, title, description, longDescription, image, displayOrder } = await req.json()
    
    const result = await sql`
      INSERT INTO programs (icon, title, description, long_description, image, display_order)
      VALUES (${icon}, ${title}, ${description}, ${longDescription}, ${image}, ${displayOrder})
      RETURNING *
    `
    
    return NextResponse.json({ success: true, program: result[0] })
  } catch (error) {
    console.error('Programs POST error:', error)
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
    
    const { id, icon, title, description, longDescription, image, displayOrder, isActive } = await req.json()
    
    await sql`
      UPDATE programs 
      SET 
        icon = COALESCE(${icon}, icon),
        title = COALESCE(${title}, title),
        description = COALESCE(${description}, description),
        long_description = COALESCE(${longDescription}, long_description),
        image = COALESCE(${image}, image),
        display_order = COALESCE(${displayOrder}, display_order),
        is_active = COALESCE(${isActive}, is_active),
        updated_at = CURRENT_TIMESTAMP
      WHERE id = ${id}
    `
    
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Programs PUT error:', error)
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
    
    const { searchParams } = new URL(req.url)
    const id = searchParams.get('id')
    
    await sql`DELETE FROM programs WHERE id = ${id}`
    
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Programs DELETE error:', error)
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}

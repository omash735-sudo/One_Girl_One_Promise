import { NextRequest, NextResponse } from 'next/server'
import { sql } from '@/lib/db'
import { verifyToken } from '@/lib/auth'

// GET all programs
export async function GET() {
  try {
    const programs = await sql`
      SELECT * FROM programs 
      WHERE is_active = true 
      ORDER BY display_order
    `
    return NextResponse.json(programs)
  } catch (error) {
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}

// CREATE program
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
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}

// UPDATE program
export async function PUT(req: NextRequest) {
  try {
    const token = req.headers.get('authorization')?.replace('Bearer ', '')
    const decoded = verifyToken(token)
    
    if (!decoded) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }
    
    const { id, ...data } = await req.json()
    
    await sql`
      UPDATE programs 
      SET 
        icon = COALESCE(${data.icon}, icon),
        title = COALESCE(${data.title}, title),
        description = COALESCE(${data.description}, description),
        long_description = COALESCE(${data.longDescription}, long_description),
        image = COALESCE(${data.image}, image),
        display_order = COALESCE(${data.displayOrder}, display_order),
        is_active = COALESCE(${data.isActive}, is_active),
        updated_at = CURRENT_TIMESTAMP
      WHERE id = ${id}
    `
    
    return NextResponse.json({ success: true })
  } catch (error) {
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}

// DELETE program
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
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}

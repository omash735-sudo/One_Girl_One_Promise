import { NextRequest, NextResponse } from 'next/server'
import { sql } from '@/lib/db'
import { verifyToken } from '@/lib/auth'

export async function GET() {
  try {
    const stories = await sql`
      SELECT * FROM success_stories 
      WHERE is_active = true 
      ORDER BY display_order, created_at DESC
    `
    return NextResponse.json(stories)
  } catch (error) {
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
    
    const { name, age, story, achievement, image, isFeatured, displayOrder } = await req.json()
    
    const result = await sql`
      INSERT INTO success_stories (name, age, story, achievement, image, is_featured, display_order)
      VALUES (${name}, ${age}, ${story}, ${achievement}, ${image}, ${isFeatured}, ${displayOrder})
      RETURNING *
    `
    
    return NextResponse.json({ success: true, story: result[0] })
  } catch (error) {
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
    
    const { id, ...data } = await req.json()
    
    await sql`
      UPDATE success_stories 
      SET 
        name = COALESCE(${data.name}, name),
        age = COALESCE(${data.age}, age),
        story = COALESCE(${data.story}, story),
        achievement = COALESCE(${data.achievement}, achievement),
        image = COALESCE(${data.image}, image),
        is_featured = COALESCE(${data.isFeatured}, is_featured),
        display_order = COALESCE(${data.displayOrder}, display_order),
        is_active = COALESCE(${data.isActive}, is_active)
      WHERE id = ${id}
    `
    
    return NextResponse.json({ success: true })
  } catch (error) {
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
    
    await sql`DELETE FROM success_stories WHERE id = ${id}`
    
    return NextResponse.json({ success: true })
  } catch (error) {
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}
